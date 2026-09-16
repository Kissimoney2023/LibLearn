import {ACHIEVEMENTS} from '../data/catalog';
import type {
  EarnedAchievement,
  ExamAttempt,
  LessonProgress,
  ProgressSummary,
  QuizAttempt,
} from '../types/domain';

/**
 * Achievements are derived from recorded events, never awarded at random.
 * `evaluate` is pure: given the same activity it returns the same set, so
 * re-running it after a reload cannot mint a duplicate.
 */
export function evaluate(
  lessons: LessonProgress[],
  quizzes: QuizAttempt[],
  exams: ExamAttempt[],
  summary: ProgressSummary,
  already: EarnedAchievement[],
): EarnedAchievement[] {
  const held = new Set(already.map((a) => a.achievementId));
  const now = new Date().toISOString();
  const earned: EarnedAchievement[] = [...already];

  const award = (id: string) => {
    if (held.has(id)) return;
    if (!ACHIEVEMENTS.some((a) => a.id === id)) return;
    earned.push({achievementId: id, earnedAt: now});
    held.add(id);
  };

  const completed = lessons.filter((l) => l.status === 'completed');
  const submittedExams = exams.filter((e) => e.submittedAt !== null);

  if (completed.length >= 1) award('first-lesson');
  if (quizzes.length >= 1) award('quiz-starter');
  if (summary.streakDays >= 7) award('seven-day-learner');
  if (completed.filter((l) => l.subjectId === 'mathematics').length >= 5) {
    award('math-explorer');
  }
  if (submittedExams.length >= 3) award('exam-practice-pro');
  if (quizzes.some((q) => q.total > 0 && q.score === q.total)) {
    award('sharp-shooter');
  }

  return earned;
}
