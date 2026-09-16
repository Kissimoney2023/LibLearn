import {useState, type FormEvent} from 'react';
import {toMessage} from '../lib/errors';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {Button, Field} from '../components/ui';

export default function SignUp() {
  const {signUp} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError('Use at least 8 characters so your account stays secure.');
      return;
    }
    setBusy(true);
    try {
      await signUp(name.trim(), email.trim(), password);
    } catch (err) {
      setError(toMessage(err, 'Could not create your account.'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="shell flex min-h-dvh max-w-md flex-col justify-center py-10">
      <h1 className="mb-1 font-display text-2xl font-bold">Create your account</h1>
      <p className="mb-6 text-sm text-on-surface-variant">
        Three short questions after this, then you are learning.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Field
          label="Your name" id="signup-name" required autoComplete="name"
          value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Musu Kollie"
        />
        <Field
          label="Email" id="signup-email" type="email" required autoComplete="email"
          value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
        />
        <Field
          label="Password" id="signup-password" type="password" required
          autoComplete="new-password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters" error={error ?? undefined}
        />
        <Button type="submit" fullWidth disabled={busy}>
          {busy ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-sm text-on-surface-variant">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-secondary underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
}
