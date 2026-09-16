import {isSupabaseConfigured, supabase} from './supabase';
import {readJSON, writeJSON, clearAll} from './storage';
import type {
  AiSession,
  EarnedAchievement,
  ExamAttempt,
  LessonProgress,
  Profile,
  QuizAttempt,
} from '../types/domain';

/**
 * One repository for every piece of student state.
 *
 * Two backends sit behind it:
 *   - Supabase, when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.
 *   - This browser's localStorage otherwise.
 *
 * The local backend is a real, working fallback - not a stub. What it cannot
 * do is carry a student's work to another device, and the UI says so plainly
 * rather than implying the data is safe on a server.
 */

export type Backend = 'supabase' | 'local';

export const backend: Backend = isSupabaseConfigured ? 'supabase' : 'local';

const K = {
  profile: 'profile',
  lessons: 'lesson-progress',
  quizzes: 'quiz-attempts',
  exams: 'exam-attempts',
  achievements: 'achievements',
  sessions: 'ai-sessions',
} as const;

/* ---------------- Profile ---------------- */

export async function loadProfile(userId: string): Promise<Profile | null> {
  if (supabase) {
    const {data, error} = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (error) throw error;
    return (data as Profile | null) ?? null;
  }
  return readJSON<Profile | null>(K.profile, null);
}

export async function saveProfile(profile: Profile): Promise<Profile> {
  const next = {...profile, updatedAt: new Date().toISOString()};
  if (supabase) {
    const {data, error} = await supabase
      .from('profiles')
      .upsert(next)
      .select()
      .single();
    if (error) throw error;
    return data as Profile;
  }
  writeJSON(K.profile, next);
  return next;
}

/* ---------------- Lesson progress ---------------- */

export async function loadLessonProgress(userId: string): Promise<LessonProgress[]> {
  if (supabase) {
    const {data, error} = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return (data ?? []) as LessonProgress[];
  }
  return readJSON<LessonProgress[]>(K.lessons, []);
}

export async function upsertLessonProgress(
  userId: string,
  entry: LessonProgress,
): Promise<LessonProgress[]> {
  const all = await loadLessonProgress(userId);
  const next = [...all.filter((l) => l.lessonId !== entry.lessonId), entry];
  if (supabase) {
    const {error} = await supabase
      .from('lesson_progress')
      .upsert({...entry, user_id: userId});
    if (error) throw error;
    return next;
  }
  writeJSON(K.lessons, next);
  return next;
}

/* ---------------- Attempts ---------------- */

export async function loadQuizAttempts(userId: string): Promise<QuizAttempt[]> {
  if (supabase) {
    const {data, error} = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return (data ?? []) as QuizAttempt[];
  }
  return readJSON<QuizAttempt[]>(K.quizzes, []);
}

export async function addQuizAttempt(
  userId: string,
  attempt: QuizAttempt,
): Promise<QuizAttempt[]> {
  const all = await loadQuizAttempts(userId);
  const next = [...all, attempt];
  if (supabase) {
    const {error} = await supabase
      .from('quiz_attempts')
      .insert({...attempt, user_id: userId});
    if (error) throw error;
    return next;
  }
  writeJSON(K.quizzes, next);
  return next;
}

export async function loadExamAttempts(userId: string): Promise<ExamAttempt[]> {
  if (supabase) {
    const {data, error} = await supabase
      .from('exam_attempts')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return (data ?? []) as ExamAttempt[];
  }
  return readJSON<ExamAttempt[]>(K.exams, []);
}

export async function saveExamAttempt(
  userId: string,
  attempt: ExamAttempt,
): Promise<ExamAttempt[]> {
  const all = await loadExamAttempts(userId);
  const next = [...all.filter((e) => e.id !== attempt.id), attempt];
  if (supabase) {
    const {error} = await supabase
      .from('exam_attempts')
      .upsert({...attempt, user_id: userId});
    if (error) throw error;
    return next;
  }
  writeJSON(K.exams, next);
  return next;
}

/* ---------------- Achievements & AI sessions ---------------- */

export async function loadAchievements(userId: string): Promise<EarnedAchievement[]> {
  if (supabase) {
    const {data, error} = await supabase
      .from('student_achievements')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return (data ?? []) as EarnedAchievement[];
  }
  return readJSON<EarnedAchievement[]>(K.achievements, []);
}

export async function saveAchievements(
  userId: string,
  earned: EarnedAchievement[],
): Promise<void> {
  if (supabase) {
    if (earned.length === 0) return;
    const {error} = await supabase
      .from('student_achievements')
      .upsert(earned.map((e) => ({...e, user_id: userId})));
    if (error) throw error;
    return;
  }
  writeJSON(K.achievements, earned);
}

export function loadSessions(): AiSession[] {
  return readJSON<AiSession[]>(K.sessions, []);
}

export function saveSessions(sessions: AiSession[]): void {
  // Capped so a long-running conversation cannot fill the storage quota.
  writeJSON(K.sessions, sessions.slice(-20));
}

export function clearLocalState(): void {
  clearAll();
}
