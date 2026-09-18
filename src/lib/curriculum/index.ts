import type {
  LessonNote,
  GradeLevel,
  Lesson,
  Question,
  Quiz,
  Subject,
  Topic,
  Unit,
} from '../../types/domain';
import {isSupabaseConfigured} from '../supabase';
import {bundledQuizGrade, bundledRepository} from './bundled';
import {supabaseRepository} from './supabaseRepo';
import {resolveAvailableGrades} from './availability';
import {noteForLesson as noteFor} from './notes';
import {createBreaker, DATABASE_COOLDOWN_MS} from './breaker';
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
 * Failures open a breaker so repeated navigation during an outage makes no
 * doomed requests. Logic and its boundary behaviour are tested in
 * breaker.test.ts.
 */
const databaseBreaker = createBreaker(DATABASE_COOLDOWN_MS);

/** Lets the UI say the database is unreachable rather than merely slow. */
export const databaseUnreachable = (): boolean => databaseBreaker.isOpen();

/** Cached grade availability; cleared by invalidate() alongside the corpus. */
let availableGradesCache: GradeLevel[] | null = null;

/* -------------------------------------------------- loaded corpus ------- */

/**
 * Everything the app has actually loaded, across grades.
 *
 * Progress is a fraction, and its DENOMINATOR has to come from the same corpus
 * the student is reading. Computing "3 of 11 lessons" from bundled content
 * while the screen shows lessons from the database is how a progress bar ends
 * up quietly wrong - the same class of bug that made "Mark complete" a no-op
 * for database lessons.
 *
 * Subscribers are notified when a grade lands so derived figures recompute.
 */
let corpusVersion = 0;
const corpusListeners = new Set<() => void>();

const notifyCorpus = () => {
  corpusVersion += 1;
  for (const l of corpusListeners) l();
};

export function subscribeCorpus(cb: () => void): () => void {
  corpusListeners.add(cb);
  return () => corpusListeners.delete(cb);
}

export const getCorpusVersion = (): number => corpusVersion;

/**
 * Lessons from every loaded grade, or the bundled corpus before anything has
 * loaded. Never empty, so callers never divide by zero on first paint.
 */
export function loadedLessons(): Lesson[] {
  const out: Lesson[] = [];
  for (const {curriculum} of cache.values()) out.push(...curriculum.lessons);
  return out;
}

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

  if (isSupabaseConfigured && databaseBreaker.isOpen()) {
    // Breaker open: do not spend the student's bandwidth on a call we expect
    // to fail. Say so plainly rather than presenting stale content as current.
    const fallback = await bundledRepository.load(grade);
    return {
      curriculum: fallback,
      source: 'bundled-fallback',
      warning:
        'Could not reach the learning database, so LibLearn is showing the ' +
        'lessons included with the app. Your progress is still being saved.',
    };
  }

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
          notifyCorpus();
          return result;
        }
      }

      databaseBreaker.reset();
      result = {curriculum, source: 'supabase'};
    } catch (err) {
      databaseBreaker.trip();
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
  notifyCorpus();
  return result;
}

/**
 * Which grades have lessons to study.
 *
 * The UNION of the database and the bundle, deliberately. `loadGrade` falls
 * back to bundled content when the database has nothing for a grade, so a
 * grade in the bundle but not the database still opens and still teaches -
 * marking it "Coming soon" would be a lie the student can disprove in one tap.
 * Taking the union also means this can only ever offer more grades than the
 * old bundled-only check, never fewer.
 *
 * Never throws. A grade picker that fails closed would tell a student their
 * grade does not exist because of a dropped connection.
 */
export async function loadAvailableGrades(
  opts: {force?: boolean} = {},
): Promise<GradeLevel[]> {
  const bundled = await bundledRepository.availableGrades();

  if (!opts.force && availableGradesCache) return availableGradesCache;

  // Breaker open: skip the call we expect to fail and show what we can.
  if (!isSupabaseConfigured || databaseBreaker.isOpen()) return bundled;

  const merged = await resolveAvailableGrades(
    bundled,
    () => supabaseRepository.availableGrades(),
    databaseBreaker,
  );
  if (merged !== bundled) availableGradesCache = merged;
  return merged;
}


/**
 * Which grade a quiz belongs to, so the quiz screen can load that grade.
 *
 * The bundle answers first and the database only has to be asked for quizzes
 * the bundle does not know - which is exactly the content loaded into Postgres
 * after the app was built. Never throws: a quiz screen that fails closed tells
 * a student their quiz does not exist because of a dropped connection.
 */
export async function loadQuizGrade(quizId: string): Promise<GradeLevel | null> {
  const local = bundledQuizGrade(quizId);
  if (local !== null) return local;

  if (!isSupabaseConfigured || databaseBreaker.isOpen()) return null;

  try {
    const grade = await supabaseRepository.gradeForQuiz(quizId);
    databaseBreaker.reset();
    return grade;
  } catch (err) {
    databaseBreaker.trip();
    console.warn('[curriculum] could not resolve the grade for quiz', quizId, err);
    return null;
  }
}

/** Drop cached curriculum, e.g. after content is edited. */
export function invalidate(grade?: GradeLevel): void {
  if (grade === undefined) cache.clear();
  else cache.delete(grade);
  availableGradesCache = null;
  databaseBreaker.reset(); // an explicit refresh should retry immediately
  notifyCorpus();
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

/* Re-exported so routes take the bundled answer from the seam rather than
 * importing a data module directly. */
export {bundledQuizGrade} from './bundled';

/* The Note engine. The Note is the source of truth for what a lesson teaches;
 * every question cites a section of it. */
export {noteForLesson, noteSectionOf, sectionKey, noteId} from './notes';

/** The Note for a lesson in a loaded curriculum. */
export const noteForLessonId = (c: GradeCurriculum, lessonId: string): LessonNote | undefined => {
  const lesson = c.lessons.find((l) => l.id === lessonId);
  return lesson ? noteFor(lesson) : undefined;
};
