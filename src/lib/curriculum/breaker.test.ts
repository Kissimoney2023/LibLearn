/**
 * Runnable with: npx tsx src/lib/curriculum/breaker.test.ts
 *
 * No test framework is installed, so this is a plain script that exits non-zero
 * on failure and can gate CI as-is. Time is injected rather than slept on, so
 * the 30-second window is verified in milliseconds.
 */
import {createBreaker, DATABASE_COOLDOWN_MS} from './breaker';

let failures = 0;
const check = (name: string, actual: unknown, expected: unknown) => {
  const ok = actual === expected;
  if (!ok) failures++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name}${ok ? '' : `  (got ${actual}, want ${expected})`}`);
};

console.log('\ncircuit breaker');

const t0 = 1_000_000;
const b = createBreaker(DATABASE_COOLDOWN_MS);

check('starts closed', b.isOpen(t0), false);

b.trip(t0);
check('open immediately after a failure', b.isOpen(t0), true);
check('still open one second later', b.isOpen(t0 + 1_000), true);
check('still open just before the window ends', b.isOpen(t0 + DATABASE_COOLDOWN_MS - 1), true);

// The boundary is the case worth pinning: off by one here means either one
// wasted request per outage or a breaker that never reopens.
check('closed exactly at the window end', b.isOpen(t0 + DATABASE_COOLDOWN_MS), false);
check('closed after the window', b.isOpen(t0 + DATABASE_COOLDOWN_MS + 1), false);

// A success must restore service immediately - a student whose connection comes
// back should not wait out the remainder of a cooldown.
b.trip(t0);
check('open again after a second failure', b.isOpen(t0), true);
b.reset();
check('a success closes it immediately', b.isOpen(t0), false);
check('openUntil is 0 once closed', b.openUntil(), 0);

// Repeated failures extend from the latest one, not the first.
b.trip(t0);
b.trip(t0 + 10_000);
check('a later failure extends the window', b.isOpen(t0 + DATABASE_COOLDOWN_MS + 1), true);
check('and it ends relative to the later failure',
  b.isOpen(t0 + 10_000 + DATABASE_COOLDOWN_MS), false);

console.log(failures === 0 ? '\nAll breaker checks passed.' : `\n${failures} FAILED`);
process.exit(failures ? 1 : 0);
