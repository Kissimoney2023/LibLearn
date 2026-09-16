import type {ButtonHTMLAttributes, InputHTMLAttributes, ReactNode} from 'react';
import {Link} from 'react-router-dom';

/* ---------------- Button ----------------
 * Primary uses `primary` (#006E24) as its ground, not the brand green
 * #00B140: white on #00B140 measures 2.85:1 and fails AA. The brand green
 * lives on as `primary-container`, used for fills that carry no text. */

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover',
  secondary:
    'bg-surface-lowest text-secondary border-[1.5px] border-secondary hover:bg-secondary-container',
  ghost: 'bg-transparent text-secondary hover:underline underline-offset-4',
  danger: 'bg-error text-on-error hover:brightness-90',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  fullWidth,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 font-display text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  variant = 'primary',
  fullWidth,
  children,
}: {
  to: string;
  variant?: Variant;
  fullWidth?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 font-display text-base font-semibold transition-colors ${VARIANTS[variant]} ${fullWidth ? 'w-full' : ''}`}>
      {children}
    </Link>
  );
}

/* ---------------- Card ---------------- */

export function Card({
  children,
  className = '',
  rail,
}: {
  children: ReactNode;
  className?: string;
  /** Status rail. Always paired with a visible label - never the only cue. */
  rail?: 'complete' | 'progress' | 'locked';
}) {
  const railColor =
    rail === 'complete'
      ? 'bg-primary-container'
      : rail === 'progress'
        ? 'bg-tertiary-container'
        : 'bg-outline';
  return (
    <div
      className={`overflow-hidden rounded-lg border border-outline-variant bg-surface-lowest shadow-[0_1px_3px_0_rgb(10_37_64_/_0.05),0_1px_2px_-1px_rgb(10_37_64_/_0.05)] ${className}`}>
      {rail && <div className={`h-1 ${railColor}`} aria-hidden="true" />}
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ---------------- Chips ---------------- */

export function SubjectChip({children}: {children: ReactNode}) {
  return (
    <span className="inline-flex h-7 items-center rounded-full bg-primary-surface px-3 text-xs font-medium text-on-primary-surface">
      {children}
    </span>
  );
}

export function GradeBadge({children}: {children: ReactNode}) {
  return (
    <span className="inline-flex h-7 items-center rounded-full bg-tertiary-surface px-3 text-xs font-medium text-on-tertiary-surface">
      {children}
    </span>
  );
}

/** Marks content that is LibLearn sample material, not official curriculum. */
export function DemoBadge() {
  return (
    <span
      className="inline-flex h-7 items-center rounded-full border border-outline px-3 text-xs font-medium text-on-surface-variant"
      title="Sample teaching material written for LibLearn. Not official Liberian curriculum.">
      Sample content
    </span>
  );
}

/* ---------------- Progress ---------------- */

export function ProgressBar({
  value,
  label,
}: {
  value: number;
  /** Accessible name. The numeric readout is always rendered beside the bar. */
  label: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-2 flex-1 overflow-hidden rounded-full bg-outline-variant"
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}>
        <div
          className="h-full rounded-full bg-primary-container transition-[width] duration-500"
          style={{width: `${pct}%`}}
        />
      </div>
      <span className="text-sm font-medium tabular-nums">{pct}%</span>
    </div>
  );
}

/* ---------------- Input ---------------- */

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Field({label, error, id, ...rest}: FieldProps) {
  const fieldId = id ?? `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-on-surface-variant">
        {label}
      </label>
      <input
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className="h-12 rounded-lg border-[1.5px] border-outline bg-surface-lowest px-3.5 text-on-surface placeholder:text-outline focus:border-secondary"
        {...rest}
      />
      {error && (
        <p id={`${fieldId}-error`} className="flex items-center gap-1.5 text-xs text-error">
          <span aria-hidden="true">&#9888;</span>
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------------- States ---------------- */

export function Skeleton({className = ''}: {className?: string}) {
  return <div className={`animate-pulse rounded-lg bg-surface-container ${className}`} />;
}

export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon?: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-outline-variant bg-surface-lowest px-6 py-12 text-center">
      {icon && <div className="text-on-surface-variant">{icon}</div>}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-sm text-sm text-on-surface-variant">{body}</p>
      {action}
    </div>
  );
}

export function ErrorState({
  message = 'Something went wrong.',
  hint = 'Please check your connection and try again.',
  onRetry,
}: {
  message?: string;
  hint?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-lg border border-error-container bg-error-container p-5">
      <p className="font-semibold text-on-error-container">{message}</p>
      <p className="text-sm text-on-error-container">{hint}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export function SectionHeading({children, action}: {children: ReactNode; action?: ReactNode}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-xl font-semibold">{children}</h2>
      {action}
    </div>
  );
}
