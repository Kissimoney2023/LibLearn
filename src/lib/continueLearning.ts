import type {ContinueLearning, LessonProgress, Subject} from '../types/domain';
import type {GradeCurriculum} from './curriculum';
import {lessonsForTopic, topicById} from './curriculum';

/**
 * Works out where the student left off.
 *
 * DERIVED, never stored. A stored "current lesson" is a second source of truth
 * for something progress already knows, and the two drift the moment a lesson
 * is completed from somewhere that forgets to update it. Deriving it costs one
 * pass over records already in memory.
 *
 * The rule, in order:
 *   1. The most recently started lesson that is not yet complete — resume it.
 *   2. Otherwise the next unstarted lesson in the most recently active topic —
 *      finished a lesson, so offer the next one in the same topic.
 *   3. Otherwise nothing, and the caller shows a "start learning" prompt rather
 *      than inventing a suggestion.
 *
 * The percentage reported is TOPIC completion, not a guess at how far through
 * the lesson text the student scrolled. We do not measure reading position, so
 * claiming "45% through this lesson" would be a fabricated number of exactly
 * the kind this project refuses elsewhere.
 */
export function continueLearning(
  curriculum: GradeCurriculum,
  progress: LessonProgress[],
  subjects: Subject[],
): ContinueLearning | null {
  if (progress.length === 0) return null;

  const byRecency = [...progress].sort(
    (a, b) =>
      new Date(b.completedAt ?? b.startedAt).getTime() -
      new Date(a.completedAt ?? a.startedAt).getTime(),
  );

  const completedIds = new Set(
    progress.filter((p) => p.status === 'completed').map((p) => p.lessonId),
  );

  const build = (lessonId: string): ContinueLearning | null => {
    const lesson = curriculum.lessons.find((l) => l.id === lessonId);
    if (!lesson) return null; // lesson from another grade, or removed content
    const topic = topicById(curriculum, lesson.topicId);
    if (!topic) return null;

    const topicLessons = lessonsForTopic(curriculum, topic.id);
    const doneInTopic = topicLessons.filter((l) => completedIds.has(l.id)).length;
    const subject = subjects.find((s) => s.id === lesson.subjectId);

    return {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      topicId: topic.id,
      topicName: topic.name,
      subjectId: lesson.subjectId,
      subjectName: subject?.name ?? lesson.subjectId,
      grade: lesson.grade,
      topicCompleted: doneInTopic,
      topicTotal: topicLessons.length,
      percent:
        topicLessons.length === 0
          ? 0
          : Math.round((doneInTopic / topicLessons.length) * 100),
      href: `/learn/${lesson.grade}/${lesson.subjectId}/${topic.id}?lesson=${lesson.id}`,
    };
  };

  // 1. Resume an unfinished lesson.
  const unfinished = byRecency.find((p) => p.status !== 'completed');
  if (unfinished) {
    const card = build(unfinished.lessonId);
    if (card) return card;
  }

  // 2. Next unstarted lesson in the most recently active topic.
  for (const entry of byRecency) {
    const topicLessons = lessonsForTopic(curriculum, entry.topicId);
    const next = topicLessons.find((l) => !completedIds.has(l.id));
    if (next) {
      const card = build(next.id);
      if (card) return card;
    }
  }

  return null;
}
