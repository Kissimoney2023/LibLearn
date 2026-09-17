import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {supabase} from '../lib/supabase';
import {backend, clearLocalState, loadProfile, saveProfile} from '../lib/store';
import {readJSON, writeJSON} from '../lib/storage';
import type {ExamGoal, GradeLevel, Profile} from '../types/domain';

interface AuthState {
  status: 'loading' | 'signed_in' | 'signed_out';
  profile: Profile | null;
  backend: typeof backend;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  completeOnboarding: (
    grade: GradeLevel,
    subjects: string[],
    examGoal: ExamGoal,
  ) => Promise<void>;
  updateProfile: (patch: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

const LOCAL_SESSION = 'local-session';

/** Local-mode accounts are identified by a stable synthetic id. */
interface LocalSession {
  userId: string;
  email: string;
}

const newProfile = (id: string, name: string, email: string): Profile => ({
  id,
  name,
  email,
  role: 'student',
  grade: null,
  selectedSubjects: [],
  examGoal: null,
  preferredLanguage: 'standard',
  onboardedAt: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export function AuthProvider({children}: {children: ReactNode}) {
  const [status, setStatus] = useState<AuthState['status']>('loading');
  const [profile, setProfile] = useState<Profile | null>(null);

  // Restore an existing session on first paint, from whichever backend is live.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (supabase) {
          const {data} = await supabase.auth.getSession();
          const user = data.session?.user;
          if (!user) {
            if (!cancelled) setStatus('signed_out');
            return;
          }
          const p = await loadProfile(user.id);
          if (cancelled) return;
          setProfile(p ?? newProfile(user.id, user.email ?? 'Student', user.email ?? ''));
          setStatus('signed_in');
          return;
        }

        const session = readJSON<LocalSession | null>(LOCAL_SESSION, null);
        if (!session) {
          if (!cancelled) setStatus('signed_out');
          return;
        }
        const p = await loadProfile(session.userId);
        if (cancelled) return;
        setProfile(p);
        setStatus(p ? 'signed_in' : 'signed_out');
      } catch {
        if (!cancelled) setStatus('signed_out');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Supabase refreshes tokens and can sign out from another tab. Without this
  // the UI would keep rendering a session that no longer exists.
  useEffect(() => {
    if (!supabase) return;
    const {data} = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setProfile(null);
        setStatus('signed_out');
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    if (supabase) {
      // `name` rides along in user metadata so the on_auth_user_created
      // trigger can write the profile row server-side. The client never races
      // the session to insert it.
      const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {data: {name}},
      });
      if (error) throw new Error(error.message);

      // With email confirmation enabled there is a user but no session yet, so
      // nothing can be written under RLS until they confirm.
      if (!data.session || !data.user) {
        throw new Error(
          'Account created. Check your email to confirm it, then sign in.',
        );
      }

      const existing = await loadProfile(data.user.id);
      setProfile(existing ?? (await saveProfile(newProfile(data.user.id, name, email))));
      setStatus('signed_in');
      return;
    }
    const userId = `local-${Date.now().toString(36)}`;
    writeJSON(LOCAL_SESSION, {userId, email} satisfies LocalSession);
    const p = await saveProfile(newProfile(userId, name, email));
    setProfile(p);
    setStatus('signed_in');
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (supabase) {
      const {data, error} = await supabase.auth.signInWithPassword({email, password});
      if (error) throw new Error(error.message);
      const user = data.user;
      if (!user) throw new Error('Could not sign in. Please try again.');
      const p = await loadProfile(user.id);
      setProfile(p ?? newProfile(user.id, email, email));
      setStatus('signed_in');
      return;
    }
    // Local mode has no credential store: any existing local profile is signed
    // back in. This is why local mode is labelled as this-device-only.
    const existing = await loadProfile('local');
    if (!existing) {
      throw new Error('No account on this device yet. Create one to get started.');
    }
    writeJSON(LOCAL_SESSION, {userId: existing.id, email: existing.email});
    setProfile(existing);
    setStatus('signed_in');
  }, []);

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    else clearLocalState();
    setProfile(null);
    setStatus('signed_out');
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    if (!supabase) {
      throw new Error(
        'Password reset needs a connected account. This device is running in local mode.',
      );
    }
    const {error} = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) throw new Error(error.message);
  }, []);

  const updateProfile = useCallback(
    async (patch: Partial<Profile>) => {
      if (!profile) return;
      const next = await saveProfile({...profile, ...patch});
      setProfile(next);
    },
    [profile],
  );

  const completeOnboarding = useCallback(
    async (grade: GradeLevel, subjects: string[], examGoal: ExamGoal) => {
      if (!profile) return;
      const next = await saveProfile({
        ...profile,
        grade,
        selectedSubjects: subjects,
        examGoal,
        onboardedAt: new Date().toISOString(),
      });
      setProfile(next);
    },
    [profile],
  );

  const value = useMemo<AuthState>(
    () => ({
      status,
      profile,
      backend,
      signUp,
      signIn,
      signOut,
      resetPassword,
      completeOnboarding,
      updateProfile,
    }),
    [status, profile, signUp, signIn, signOut, resetPassword, completeOnboarding, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
