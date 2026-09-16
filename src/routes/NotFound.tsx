import {ButtonLink} from '../components/ui';

export default function NotFound() {
  return (
    <div className="shell flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-display text-2xl font-bold">Page not found</h1>
      <p className="max-w-sm text-sm text-on-surface-variant">
        That page does not exist. It may have moved, or the link may be wrong.
      </p>
      <ButtonLink to="/dashboard">Go to dashboard</ButtonLink>
    </div>
  );
}
