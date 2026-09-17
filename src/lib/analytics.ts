/**
 * Replaceable analytics seam.
 *
 * No third-party SDK, no identifiers beyond the event payload the caller
 * passes. Swapping in a real sink means changing `sinks` only - call sites
 * never move.
 */
export type AnalyticsEvent =
  | 'lesson_started'
  | 'lesson_completed'
  | 'quiz_started'
  | 'quiz_completed'
  | 'exam_started'
  | 'exam_completed'
  | 'ai_question_asked'
  | 'recommendation_clicked'
  | 'continue_learning_clicked'
  | 'bookmark_created'
  | 'search_performed'
  | 'onboarding_completed';

type Payload = Record<string, string | number | boolean | null | undefined>;

type Sink = (event: AnalyticsEvent, payload: Payload) => void;

const consoleSink: Sink = (event, payload) => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, payload);
  }
};

const sinks: Sink[] = [consoleSink];

export function track(event: AnalyticsEvent, payload: Payload = {}): void {
  for (const sink of sinks) {
    try {
      sink(event, payload);
    } catch {
      /* analytics must never break a user flow */
    }
  }
}

export function registerSink(sink: Sink): void {
  sinks.push(sink);
}
