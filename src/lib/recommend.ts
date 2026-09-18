import type {QuizAttempt} from '../types/domain';

/**
 * DETERMINISTIC LEARNING RECOMMENDATIONS.
 *
 * This is not AI and must never be described as AI. It is a rule the student
 * could check themselves, which is the point: a recommendation a learner cannot
 * interrogate is one they cannot trust or argue with.
 *
 * The thresholds live here as data rather than as numbers buried in a
 * component, so changing the policy is one edit in one place and the tests can
 * exercise the boundaries directly.
 */
export interface RecommendationThresholds {
  /** Below this, the lesson was not understood. Send them back to the Note. */
  review: number;
  /** Below this, it was understood but is not secure. More practice. */
  practice: number;
}

export const DEFAULT_THRESHOLDS: RecommendationThresholds = {
  review: 60,
  practice: 80,
};

export type RecommendationAction = 'review' | 'practice' | 'advance';

export interface QuizRecommendation {
  action: RecommendationAction;
  /** Shown to the student. States the reason, not just the verdict. */
  headline: string;
  detail: string;
}

/**
 * What to do after a quiz.
 *
 * Boundaries are inclusive-below: exactly 60% is "practice", not "review", and
 * exactly 80% is "advance". Stating that here rather than leaving it to the
 * reader is deliberate - off-by-one at a boundary is the classic way a rule
 * like this quietly misbehaves for the students sitting right on it.
 */
export function recommendAfterQuiz(
  scorePercent: number,
  topicName: string,
  thresholds: RecommendationThresholds = DEFAULT_THRESHOLDS,
): QuizRecommendation {
  if (scorePercent < thresholds.review) {
    return {
      action: 'review',
      headline: 'Review this lesson',
      detail:
        `You scored ${scorePercent}% on ${topicName}, below ${thresholds.review}%. ` +
        'Go back to the Note and read the sections your wrong answers came from before moving on.',
    };
  }
  if (scorePercent < thresholds.practice) {
    return {
      action: 'practice',
      headline: 'Practise this lesson',
      detail:
        `You scored ${scorePercent}% on ${topicName}. You have the idea, but it is not secure yet. ` +
        'Practise the questions again before moving to the next lesson.',
    };
  }
  return {
    action: 'advance',
    headline: 'Move on to the next lesson',
    detail: `You scored ${scorePercent}% on ${topicName}. This one is solid.`,
  };
}

/**
 * COMPLETION IS NOT MASTERY.
 *
 * Reading eight of ten lessons is not "80% mastery" - it is 80% of the reading
 * done, and says nothing about whether any of it was understood. Reporting one
 * as the other flatters the student and hides exactly the gap this app exists
 * to find, so the two numbers are computed separately and must be displayed
 * separately.
 */
export interface SubjectStanding {
  /** Share of this subject's lessons marked complete. Effort, not attainment. */
  learningProgress: number;
  /** Mean quiz score across attempts in this subject. Attainment. */
  quizAverage: number | null;
  attempts: number;
}

export function standingFor(
  lessonsTotal: number,
  lessonsComplete: number,
  attempts: QuizAttempt[],
): SubjectStanding {
  const learningProgress =
    lessonsTotal === 0 ? 0 : Math.round((lessonsComplete / lessonsTotal) * 100);

  if (attempts.length === 0) {
    return {learningProgress, quizAverage: null, attempts: 0};
  }

  // Mean of percentages per attempt, not total-correct over total-asked: a
  // five-question quiz and a twenty-question quiz are each one assessment of
  // one lesson, and weighting by length would let one long quiz dominate.
  const mean =
    attempts.reduce((sum, a) => sum + (a.total === 0 ? 0 : (a.score / a.total) * 100), 0) /
    attempts.length;

  return {learningProgress, quizAverage: Math.round(mean), attempts: attempts.length};
}

/** Objectives the student keeps getting wrong, worst first. */
export function weakObjectives(
  attempts: QuizAttempt[],
  objectiveOf: (questionId: string) => string | undefined,
  limit = 3,
): {objectiveId: string; wrong: number; asked: number}[] {
  const tally = new Map<string, {wrong: number; asked: number}>();

  for (const attempt of attempts) {
    for (const answer of attempt.answers) {
      const objective = objectiveOf(answer.questionId);
      if (!objective) continue;
      const t = tally.get(objective) ?? {wrong: 0, asked: 0};
      t.asked += 1;
      if (!answer.correct) t.wrong += 1;
      tally.set(objective, t);
    }
  }

  return [...tally.entries()]
    .filter(([, t]) => t.wrong > 0)
    .map(([objectiveId, t]) => ({objectiveId, ...t}))
    .sort((a, b) => b.wrong / b.asked - a.wrong / a.asked || b.wrong - a.wrong)
    .slice(0, limit);
}
