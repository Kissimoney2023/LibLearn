import type {GradeLevel} from '../../types/domain';
import {subjectsForGrade} from '../../data/catalog';
import {LESSONS, TOPICS, UNITS} from '../../data/seed/curriculum';
import {QUESTIONS, QUIZZES} from '../../data/seed/questions';
import type {CurriculumRepository, GradeCurriculum} from './types';

/**
 * Curriculum from the JavaScript bundle.
 *
 * This is the offline floor. It always works: no network, no Supabase project,
 * no configuration. A student who has opened LibLearn once can study on a bus
 * with no signal, which is a requirement here rather than a nicety.
 *
 * Its limitation is the reason the Supabase backend exists alongside it:
 * changing content means rebuilding and redeploying the app. That is fine for
 * a starter corpus and wrong as a way to run a national curriculum.
 */
export const bundledRepository: CurriculumRepository = {
  name: 'bundled',

  async load(grade: GradeLevel): Promise<GradeCurriculum> {
    const topics = TOPICS.filter((t) => t.grade === grade);
    const topicIds = new Set(topics.map((t) => t.id));
    const lessons = LESSONS.filter((l) => topicIds.has(l.topicId));
    const lessonIds = new Set(lessons.map((l) => l.id));

    const quizzes = QUIZZES.filter(
      (q) => topicIds.has(q.topicId) || (q.lessonId && lessonIds.has(q.lessonId)),
    );
    const usedQuestionIds = new Set(quizzes.flatMap((q) => q.questionIds));

    return {
      grade,
      subjects: subjectsForGrade(grade),
      units: UNITS.filter((u) => u.grade === grade),
      topics,
      lessons,
      quizzes,
      // Questions reachable through a quiz, plus any tagged to this grade so
      // exam practice can draw on them even without a quiz.
      questions: QUESTIONS.filter(
        (q) => usedQuestionIds.has(q.id) || q.grade === grade,
      ),
    };
  },
};
