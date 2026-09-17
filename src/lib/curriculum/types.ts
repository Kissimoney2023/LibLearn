import type {
  GradeLevel,
  Lesson,
  Question,
  Quiz,
  Subject,
  Topic,
  Unit,
} from '../../types/domain';

/**
 * Everything the app knows about one grade's curriculum.
 *
 * Loaded as a unit and cached, rather than fetched per screen. Two reasons,
 * both about Liberia rather than about tidiness:
 *
 *  - On an intermittent connection, one request that either succeeds or fails
 *    is far easier to reason about (and to retry) than six that can fail
 *    independently, leaving a screen half-populated.
 *  - Once a grade is loaded, moving subject -> unit -> topic -> lesson costs
 *    nothing. Browsing works with the network off.
 *
 * Scoped to ONE grade deliberately. Loading grades 1-12 at once would be the
 * obvious shortcut and the wrong one: a student uses a single grade, and
 * downloading the other eleven wastes data they are paying for.
 */
export interface GradeCurriculum {
  grade: GradeLevel;
  subjects: Subject[];
  units: Unit[];
  topics: Topic[];
  lessons: Lesson[];
  quizzes: Quiz[];
  questions: Question[];
}

/**
 * The seam between the app and wherever curriculum lives.
 *
 * The UI imports selectors from ../curriculum, never a data module. That is
 * what lets curriculum move from the bundle to Postgres without touching a
 * single route, and what stops content additions from becoming code changes.
 */
export interface CurriculumRepository {
  /** Name shown in diagnostics so it is obvious which backend answered. */
  readonly name: string;
  load(grade: GradeLevel): Promise<GradeCurriculum>;
}

/** Empty curriculum for a grade, so callers never handle undefined. */
export const emptyCurriculum = (grade: GradeLevel): GradeCurriculum => ({
  grade,
  subjects: [],
  units: [],
  topics: [],
  lessons: [],
  quizzes: [],
  questions: [],
});
