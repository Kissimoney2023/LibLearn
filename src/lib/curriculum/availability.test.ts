/**
 * Grade-availability tests. Run with: npx tsx src/lib/curriculum/availability.test.ts
 *
 * These cover the path that broke in production: curriculum loaded into
 * Supabase did not reach the grade picker, because the picker answered from
 * the bundled corpus and never asked the database.
 *
 * The database itself is faked. What is under test is the decision - union,
 * fallback, breaker - not the SQL, which is exercised against real PostgreSQL
 * in the seed verification.
 */
import type {GradeLevel} from '../../types/domain';
import {bundledRepository} from './bundled';
import {resolveAvailableGrades} from './availability';

let failures = 0;
const eq = (name: string, actual: unknown, expected: unknown) => {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) console.log(`  ok   ${name}`);
  else {
    failures++;
    console.log(`  FAIL ${name}\n         expected ${e}\n         actual   ${a}`);
  }
};

const spyBreaker = () => {
  const calls: string[] = [];
  return {calls, trip: () => calls.push('trip'), reset: () => calls.push('reset')};
};

console.log('grade availability');

// A grade present only in the database must appear. This is the production bug.
{
  const b = spyBreaker();
  const got = await resolveAvailableGrades([11], async () => [4, 5, 11] as GradeLevel[], b);
  eq('a grade only in the database is offered', got, [4, 5, 11]);
  eq('a successful read closes the breaker', b.calls, ['reset']);
}

// A grade present only in the bundle must also appear: loadGrade falls back to
// bundled content, so the grade really does open and teach.
{
  const b = spyBreaker();
  const got = await resolveAvailableGrades([6, 8] as GradeLevel[], async () => [11] as GradeLevel[], b);
  eq('a grade only in the bundle is still offered', got, [6, 8, 11]);
}

// Duplicates and ordering.
{
  const b = spyBreaker();
  const got = await resolveAvailableGrades([11, 4] as GradeLevel[], async () => [4, 12, 4] as GradeLevel[], b);
  eq('grades are deduplicated and sorted', got, [4, 11, 12]);
}

// An empty database must not empty the picker.
{
  const b = spyBreaker();
  const got = await resolveAvailableGrades([4, 11] as GradeLevel[], async () => [], b);
  eq('an empty database leaves the bundled grades offered', got, [4, 11]);
}

// The failure path: the picker must degrade to the bundle, not to nothing.
{
  const b = spyBreaker();
  const bundled = [4, 11] as GradeLevel[];
  const got = await resolveAvailableGrades(bundled, async () => {
    throw new Error('network down');
  }, b);
  eq('a failed read falls back to the bundle', got, [4, 11]);
  eq('a failed read opens the breaker', b.calls, ['trip']);
  eq('the fallback is the bundled array itself, so it is not cached', got === bundled, true);
}

// A successful read returns a new array, which the caller may cache.
{
  const b = spyBreaker();
  const bundled = [4] as GradeLevel[];
  const got = await resolveAvailableGrades(bundled, async () => [11] as GradeLevel[], b);
  eq('a successful read returns a new array, so it is cached', got === bundled, false);
}

// The bundled backend must agree with the corpus that ships in the app.
{
  const grades = await bundledRepository.availableGrades();
  eq('the bundle offers all nine grades', grades, [4, 5, 6, 7, 8, 9, 10, 11, 12]);
}

console.log(failures === 0 ? '\nAll availability checks passed.' : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
