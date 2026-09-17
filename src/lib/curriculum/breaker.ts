/**
 * A circuit breaker for the curriculum database.
 *
 * When a read fails, the app falls back to bundled content. Without a brake it
 * would retry on every navigation — six queries per screen, all expected to
 * fail, competing for bandwidth with the content the student is trying to read.
 * On the connections this app is built for that is the difference between a
 * degraded app and an unusable one.
 *
 * So a failure opens the breaker for a cooling-off period. While open, bundled
 * content is served immediately with no network call at all. The first attempt
 * after the window closes restores normal behaviour, and a success resets it —
 * recovery needs no restart and no user action.
 *
 * Kept in its own module because it is the part with real timing behaviour, and
 * timing behaviour that is never executed is timing behaviour that is wrong.
 * See breaker.test.ts.
 */
export interface Breaker {
  /** True while failures should be assumed and the network left alone. */
  isOpen(now?: number): boolean;
  /** Record a failure and start the cooling-off period. */
  trip(now?: number): void;
  /** Record a success: close immediately. */
  reset(): void;
  /** When the breaker will next allow an attempt (0 when closed). */
  openUntil(): number;
}

export function createBreaker(cooldownMs: number): Breaker {
  let until = 0;
  return {
    isOpen: (now = Date.now()) => now < until,
    trip: (now = Date.now()) => {
      until = now + cooldownMs;
    },
    reset: () => {
      until = 0;
    },
    openUntil: () => until,
  };
}

/**
 * 30 seconds: long enough that a student tapping through several screens during
 * an outage makes no doomed requests, short enough that they are not stuck on
 * offline content for long after the connection returns.
 */
export const DATABASE_COOLDOWN_MS = 30_000;
