import {LESSONS} from '../data/seed/curriculum';
import type {
  ExamAttempt,
  LessonProgress,
  ProgressSummary,
  QuizAttempt,
  SubjectPerformance,
} from '../types/domain';

const DAY_MS = 86_400_000;

const dayKey = (iso: string): string => iso.slice(0, 10);

/**
 * Consecutive days with recorded activity, counting back from today.
 * A gap of one full day ends the streak; activity earlier today continues it.
 */
export function computeStreak(activityDates: string[]): number {
  if (activityDates.length === 0) return 0;
  const days = new Set(activityDates.map(dayKey));
  let streak = 0;
  const cursor = new Date();
  // Allow the streak to start either today or yesterday, so a student who has
  // not studied yet today does not see it reset to zero mid-morning.
  if (!days.has(dayKey(cursor.toISOString()))) {
    cursor.setTime(cursor.getTime() - DAY_MS);
    if (!days.has(dayKey(cursor.toISOString()))) return 0;
  }
  while (days.has(dayKey(cursor.toISOString()))) {
    streak += 1;
    cursor.setTime(cursor.getTime() - DAY_MS);
  }
  return streak;
}

const percent = (correct: number, total: number): number | null =>
  total === 0 ? null : Math.round((correct / total) * 100);

export function summarise(
  lessons: LessonProgress[],
  quizzes: QuizAttempt[],
  exams: ExamAttempt[],
  selectedSubjects: string[],
  grade: number | null,
): ProgressSummary {
  const completed = lessons.filter((l) => l.status === 'completed');

  // Denominator is the lessons actually available to this student, not the
  // whole seed - otherwise a Grade 8 student's bar is diluted by Grade 12 work.
  const available = LESSONS.filter(
    (l) =>
      (grade === null || l.grade === grade) &&
      (selectedSubjects.length === 0 || selectedSubjects.includes(l.subjectId)),
  );

  const bySubject: SubjectPerformance[] = selectedSubjects.map((subjectId) => {
    const subjectQuizzes = quizzes.filter((q) => q.subjectId === subjectId);
    const correct = subjectQuizzes.reduce((n, q) => n + q.score, 0);
    const asked = subjectQuizzes.reduce((n, q) => n + q.total, 0);
    return {
      subjectId,
      lessonsCompleted: completed.filter((l) => l.subjectId === subjectId).length,
      lessonsTotal: available.filter((l) => l.subjectId === subjectId).length,
      accuracy: percent(correct, asked),
    };
  });

  // Topic accuracy drives both weak-topic recommendations and the strengths
  // panel on the results screen.
  const byTopic = new Map<string, {correct: number; total: number}>();
  for (const attempt of [...quizzes, ...exams]) {
    if (!('topicId' in attempt)) continue;
    const acc = byTopic.get(attempt.topicId) ?? {correct: 0, total: 0};
    acc.correct += attempt.score;
    acc.total += attempt.total;
    byTopic.set(attempt.topicId, acc);
  }

  const weakTopics: string[] = [];
  const strongTopics: string[] = [];
  for (const [topicId, {correct, total}] of byTopic) {
    if (total < 3) continue; // too few answers to call it either way
    const pct = (correct / total) * 100;
    if (pct < 60) weakTopics.push(topicId);
    else if (pct >= 85) strongTopics.push(topicId);
  }

  const totalCorrect = quizzes.reduce((n, q) => n + q.score, 0);
  const totalAsked = quizzes.reduce((n, q) => n + q.total, 0);

  const activity = [
    ...completed.map((l) => l.completedAt ?? l.startedAt),
    ...quizzes.map((q) => q.submittedAt),
    ...exams.map((e) => e.submittedAt).filter((d): d is string => d !== null),
  ];

  return {
    lessonsCompleted: completed.length,
    lessonsTotal: available.length,
    quizzesTaken: quizzes.length,
    examAttempts: exams.filter((e) => e.submittedAt !== null).length,
    streakDays: computeStreak(activity),
    overallAccuracy: percent(totalCorrect, totalAsked),
    bySubject,
    weakTopics,
    strongTopics,
  };
}

/**
 * Exam readiness is an INTERNAL LibLearn learning metric, not a prediction of
 * any examination result. It blends lesson coverage with practice accuracy.
 * Callers must label it as LibLearn's own measure wherever it is displayed.
 */
export function examReadiness(summary: ProgressSummary): number {
  const coverage =
    summary.lessonsTotal === 0
      ? 0
      : summary.lessonsCompleted / summary.lessonsTotal;
  const accuracy = (summary.overallAccuracy ?? 0) / 100;
  // Accuracy weighs slightly heavier: getting questions right matters more
  // than having opened every lesson.
  return Math.round((coverage * 0.4 + accuracy * 0.6) * 100);
}
