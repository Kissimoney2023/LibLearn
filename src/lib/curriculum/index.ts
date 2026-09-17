import type {
  GradeLevel,
  Lesson,
  Question,
  Quiz,
  Subject,
  Topic,
  Unit,
} from '../../types/domain';
import {isSupabaseConfigured} from '../supabase';
import {bundledRepository} from './bundled';
import {supabaseRepository} from './supabaseRepo';
import {emptyCurriculum, type GradeCurriculum} from './types';

export type {GradeCurriculum} from './types';
export {emptyCurriculum} from './types';

/**
 * CURRICULUM ACCESS — the single seam between the app and its content.
 *
 * Routes import selectors from here and never from a data module, so the
 * question "where does curriculum live?" is answered in exactly one place.
 * Moving from the bundle to Postgres touched no route.
 *
 * Source selection:
 *   Supabase configured  -> read the database, fall back to the bundle on failure
 *   otherwise            -> read the bundle
 */

export type CurriculumSource = 'bundled' | 'supabase' | 'bundled-fallback';

export interface LoadResult {
  curriculum: GradeCurriculum;
  source: CurriculumSource;
  /** Set when the database was tried and failed. Surface this, never swallow it. */
  warning?: string;
}

const cache = new Map<GradeLevel, LoadResult>();

/**
 * Load one grade's curriculum.
 *
 * On a database failure this falls back to bundled content rather than showing
 * an error page, because a student on a dropping connection is better served by
 * the lessons we already shipped than by a retry button. The fallback is NOT
 * silent: `warning` carries the reason so the UI can say the app is showing
 * offline content. Degrading quietly would leave someone studying a stale
 * corpus with no idea they were.
 */
export async function loadGrade(
  grade: GradeLevel,
  opts: {force?: boolean} = {},
): Promise<LoadResult> {
  if (!opts.force) {
    const hit = cache.get(grade);
    if (hit) return hit;
  }

  let result: LoadResult;

  if (isSupabaseConfigured) {
    try {
      const curriculum = await supabaseRepository.load(grade);

      // An empty result is not automatically a failure - a grade may genuinely
      // have no content loaded yet. But if the database has nothing and the
      // bundle does, showing the bundle is strictly better for the student.
      if (curriculum.topics.length === 0) {
        const fallback = await bundledRepository.load(grade);
        if (fallback.topics.length > 0) {
          result = {
            curriculum: fallback,
            source: 'bundled-fallback',
            warning:
              'No curriculum has been loaded into the database for this grade yet. ' +
              'Showing the lessons included with the app.',
          };
          cache.set(grade, result);
          return result;
        }
      }

      result = {curriculum, source: 'supabase'};
    } catch (err) {
      const fallback = await bundledRepository.load(grade);
      result = {
        curriculum: fallback,
        source: 'bundled-fallback',
        warning:
          'Could not reach the learning database, so LibLearn is showing the ' +
          'lessons included with the app. Your progress is still being saved.',
      };
      // Not cached: a transient network failure should not pin the app to
      // offline content for the rest of the session.
      console.warn('[curriculum] falling back to bundled content:', err);
      return result;
    }
  } else {
    result = {curriculum: await bundledRepository.load(grade), source: 'bundled'};
  }

  cache.set(grade, result);
  return result;
}

/** Drop cached curriculum, e.g. after content is edited. */
export function invalidate(grade?: GradeLevel): void {
  if (grade === undefined) cache.clear();
  else cache.delete(grade);
}

/* ------------------------------------------------------------- selectors */
/* Pure functions over a loaded GradeCurriculum. Synchronous by design: once a
 * grade is in hand, navigating within it must not touch the network. */

export const subjectsForGrade = (c: GradeCurriculum): Subject[] =>
  [...c.subjects].sort((a, b) => a.name.localeCompare(b.name));

export const unitsForSubject = (c: GradeCurriculum, subjectId: string): Unit[] =>
  c.units.filter((u) => u.subjectId === subjectId).sort((a, b) => a.order - b.order);

export const topicsForSubject = (c: GradeCurriculum, subjectId: string): Topic[] =>
  c.topics.filter((t) => t.subjectId === subjectId).sort((a, b) => a.order - b.order);

export const topicsForUnit = (c: GradeCurriculum, unitId: string): Topic[] =>
  c.topics.filter((t) => t.unitId === unitId).sort((a, b) => a.order - b.order);

/**
 * Topics in a subject that no unit claims.
 *
 * Without this they would vanish from the UI the moment units exist, which is
 * exactly when curriculum is being imported and half-filed. Content that is
 * awkward to categorise must still be reachable.
 */
export const unfiledTopics = (c: GradeCurriculum, subjectId: string): Topic[] => {
  const unitIds = new Set(c.units.map((u) => u.id));
  return c.topics
    .filter((t) => t.subjectId === subjectId && (!t.unitId || !unitIds.has(t.unitId)))
    .sort((a, b) => a.order - b.order);
};

export const lessonsForTopic = (c: GradeCurriculum, topicId: string): Lesson[] =>
  c.lessons.filter((l) => l.topicId === topicId).sort((a, b) => a.order - b.order);

export const topicById = (c: GradeCurriculum, id: string): Topic | undefined =>
  c.topics.find((t) => t.id === id);

export const unitById = (c: GradeCurriculum, id: string): Unit | undefined =>
  c.units.find((u) => u.id === id);

export const lessonById = (c: GradeCurriculum, id: string): Lesson | undefined =>
  c.lessons.find((l) => l.id === id);

export const quizForLesson = (c: GradeCurriculum, lessonId: string): Quiz | undefined =>
  c.quizzes.find((q) => q.lessonId === lessonId);

export const quizById = (c: GradeCurriculum, id: string): Quiz | undefined =>
  c.quizzes.find((q) => q.id === id);

export const questionById = (c: GradeCurriculum, id: string): Question | undefined =>
  c.questions.find((q) => q.id === id);

/** Topic count per subject, for the subject cards. */
export const topicCounts = (c: GradeCurriculum): Map<string, number> => {
  const counts = new Map<string, number>();
  for (const t of c.topics) counts.set(t.subjectId, (counts.get(t.subjectId) ?? 0) + 1);
  return counts;
};

export const emptyFor = emptyCurriculum;
