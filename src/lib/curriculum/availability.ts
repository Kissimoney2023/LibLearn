import type {GradeLevel} from '../../types/domain';

/**
 * The decision behind the grade picker, kept apart from where curriculum
 * actually comes from.
 *
 * Separate module rather than a helper in index.ts so it can be tested without
 * a database: index.ts reaches the Supabase client, which needs Vite's env and
 * a network. The SQL is verified separately against real PostgreSQL; what
 * lives here is the union-and-fallback rule.
 */
export async function resolveAvailableGrades(
  bundled: GradeLevel[],
  fetchRemote: () => Promise<GradeLevel[]>,
  breaker: {trip: () => void; reset: () => void},
): Promise<GradeLevel[]> {
  try {
    const remote = await fetchRemote();
    breaker.reset();
    // UNION, deliberately. `loadGrade` falls back to bundled content when the
    // database has nothing for a grade, so a grade in the bundle but not the
    // database still opens and still teaches - marking it "Coming soon" would
    // be a lie the student can disprove in one tap. The union also means this
    // can only ever offer more grades than the old bundled-only check.
    return [...new Set([...bundled, ...remote])].sort((a, b) => a - b);
  } catch (err) {
    breaker.trip();
    // Returns `bundled` BY IDENTITY, which is how the caller knows not to
    // cache: a transient failure must not pin the picker to the bundle for the
    // rest of the session.
    console.warn('[curriculum] grade availability fell back to the bundle:', err);
    return bundled;
  }
}
