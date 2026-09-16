import {LESSONS, lessonById, topicById} from '../data/seed/curriculum';
import {QUIZZES} from '../data/seed/questions';
import {examById} from '../data/catalog';
import type {
  ExamGoal,
  LessonProgress,
  ProgressSummary,
  Recommendation,
} from '../types/domain';

/**
 * Deterministic recommendation engine.
 *
 * Every suggestion is derived from recorded activity and carries a plain
 * reason the student can read. Nothing here is random - running it twice on
 * the same inputs gives the same output, which is what makes it testable and
 * what lets it be swapped for a model later without changing call sites.
 *
 * Priority order: unfinished work, then demonstrated weakness, then exam goal,
 * then the natural next lesson.
 */
export function recommend(
  summary: ProgressSummary,
  lessons: LessonProgress[],
  grade: number | null,
  selectedSubjects: string[],
  examGoal: ExamGoal | null,
): Recommendation[] {
  const out: Recommendation[] = [];
  const completedIds = new Set(
    lessons.filter((l) => l.status === 'completed').map((l) => l.lessonId),
  );

  // 1. An unfinished lesson always comes first - finishing beats starting.
  const openLesson = lessons.find((l) => l.status === 'in_progress');
  if (openLesson) {
    const lesson = lessonById(openLesson.lessonId);
    if (lesson) {
      out.push({
        id: `rec-continue-${lesson.id}`,
        kind: 'continue_lesson',
        title: lesson.title,
        reason: 'You started this and have not finished it yet.',
        href: `/learn/${lesson.grade}/${lesson.subjectId}/${lesson.topicId}?lesson=${lesson.id}`,
        subjectId: lesson.subjectId,
        topicId: lesson.topicId,
      });
    }
  }

  // 2. Topics scored under 60% across at least three answers.
  for (const topicId of summary.weakTopics.slice(0, 2)) {
    const topic = topicById(topicId);
    const quiz = QUIZZES.find((q) => q.topicId === topicId);
    if (!topic || !quiz) continue;
    out.push({
      id: `rec-weak-${topicId}`,
      kind: 'practice_weak_topic',
      title: `Practise ${topic.name}`,
      reason: `Your recent answers in ${topic.name} were below 60%. Another pass should lift it.`,
      href: `/quiz/${quiz.id}`,
      subjectId: topic.subjectId,
      topicId,
    });
  }

  // 3. Exam practice, once a goal has been chosen.
  if (examGoal && examGoal !== 'general') {
    const exam = examById(examGoal);
    if (exam) {
      out.push({
        id: `rec-exam-${examGoal}`,
        kind: 'exam_practice',
        title: `${exam.name} practice`,
        reason: `You set ${exam.name} as your goal. Regular practice sets keep it within reach.`,
        href: `/exam-coach/${examGoal}`,
      });
    }
  }

  // 4. The next untouched lesson in the student's own grade and subjects.
  const next = LESSONS.filter(
    (l) =>
      !completedIds.has(l.id) &&
      (grade === null || l.grade === grade) &&
      (selectedSubjects.length === 0 || selectedSubjects.includes(l.subjectId)),
  ).sort((a, b) => a.order - b.order)[0];

  if (next && !out.some((r) => r.topicId === next.topicId)) {
    out.push({
      id: `rec-next-${next.id}`,
      kind: 'next_lesson',
      title: next.title,
      reason: 'This is the next lesson in your plan.',
      href: `/learn/${next.grade}/${next.subjectId}/${next.topicId}?lesson=${next.id}`,
      subjectId: next.subjectId,
      topicId: next.topicId,
    });
  }

  return out.slice(0, 4);
}
