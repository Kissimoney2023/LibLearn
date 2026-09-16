/**
 * Error normalisation.
 *
 * Supabase throws two different shapes. `AuthError` extends Error, but
 * `PostgrestError` is a PLAIN OBJECT - it has `message`, `code`, `details` and
 * `hint`, and fails `instanceof Error`. Any UI branching on `instanceof Error`
 * therefore discards the real database error and shows a generic fallback,
 * which is exactly how a missing table looks identical to a wrong password.
 *
 * Everything that leaves the store passes through `toError` so callers can rely
 * on a real Error with a message worth reading.
 */

interface PostgrestLike {
  message?: unknown;
  code?: unknown;
  details?: unknown;
  hint?: unknown;
}

/**
 * Codes worth translating. A raw Postgres code tells a student nothing, and
 * tells a developer the wrong thing if they have never seen it.
 */
const CODE_HELP: Record<string, string> = {
  // The migration has not been run. Most likely cause on a fresh project.
  '42P01':
    'The database tables have not been created yet. Run supabase/migrations/0001_init.sql in the Supabase SQL Editor.',
  // RLS rejected the write - policy missing, or no session.
  '42501':
    'The database rejected this write. Check that row-level security policies from supabase/migrations/0001_init.sql are applied.',
  '23505': 'That record already exists.',
  '23503': 'A related record is missing.',
  // PostgREST could not find the table in its schema cache.
  PGRST205:
    'The database tables have not been created yet, or PostgREST has not reloaded its schema cache. Run supabase/migrations/0001_init.sql.',
};

export function toError(err: unknown): Error {
  if (err instanceof Error) return err;

  if (typeof err === 'object' && err !== null) {
    const e = err as PostgrestLike;
    const code = typeof e.code === 'string' ? e.code : undefined;
    const base =
      typeof e.message === 'string' && e.message.trim().length > 0
        ? e.message.trim()
        : 'The database returned an error.';
    const help = code ? CODE_HELP[code] : undefined;
    const detail = typeof e.details === 'string' ? e.details : undefined;

    const parts = [help ?? base];
    if (help && base !== help) parts.push(`(${base})`);
    else if (detail) parts.push(`(${detail})`);
    if (code) parts.push(`[${code}]`);

    const out = new Error(parts.join(' '));
    out.name = code ? `SupabaseError(${code})` : 'SupabaseError';
    return out;
  }

  if (typeof err === 'string' && err.trim().length > 0) return new Error(err);

  return new Error('Something went wrong. Please try again.');
}

/** Message safe to render to a student. Never empty. */
export function toMessage(err: unknown, fallback = 'Something went wrong. Please try again.'): string {
  const msg = toError(err).message.trim();
  return msg.length > 0 ? msg : fallback;
}
