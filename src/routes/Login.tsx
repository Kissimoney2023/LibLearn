import {useState, type FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {Button, Field} from '../components/ui';

export default function Login() {
  const {signIn, resetPassword, backend} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.');
    } finally {
      setBusy(false);
    }
  }

  async function onReset() {
    setError(null);
    setNotice(null);
    if (!email) {
      setError('Enter your email address first, then choose Reset password.');
      return;
    }
    try {
      await resetPassword(email);
      setNotice('Check your email for a link to set a new password.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the reset email.');
    }
  }

  return (
    <div className="shell flex min-h-dvh max-w-md flex-col justify-center py-10">
      <h1 className="mb-1 font-display text-2xl font-bold">Welcome back</h1>
      <p className="mb-6 text-sm text-on-surface-variant">
        Sign in to pick up where you left off.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Field
          label="Email"
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Field
          label="Password"
          id="login-password"
          type="password"
          autoComplete="current-password"
          required={backend === 'supabase'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          error={error ?? undefined}
        />
        {notice && <p className="text-sm text-on-primary-surface">{notice}</p>}
        <Button type="submit" fullWidth disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 min-h-12 text-sm font-medium text-secondary underline underline-offset-4">
        Reset password
      </button>

      <p className="mt-6 text-sm text-on-surface-variant">
        New to LibLearn?{' '}
        <Link to="/signup" className="font-medium text-secondary underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </div>
  );
}
