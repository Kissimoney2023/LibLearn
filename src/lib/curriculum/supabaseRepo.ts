import type {
  ContentProvenance,
  Difficulty,
  ExamGoal,
  GradeLevel,
  Lesson,
  Question,
  Quiz,
  Subject,
  Topic,
  Unit,
} from '../../types/domain';
import {supabase} from '../supabase';
import {toError} from '../errors';
import type {CurriculumRepository, GradeCurriculum} from './types';

/**
 * Curriculum from Postgres, via the tables in supabase/migrations/0002.
 *
 * This is what makes adding curriculum a data operation. Load a new grade into
 * the database and it appears in the app - no rebuild, no deploy, no code
 * change. That property is the whole point of this file.
 *
 * THE COLUMN NAMING TRAP. Postgres columns are snake_case; the domain model is
 * camelCase. Supabase returns columns exactly as named, so `row.subjectId` is
 * silently `undefined` rather than an error, and the failure surfaces much
 * later as an empty screen. Every mapper below is explicit for that reason -
 * the same mistake already cost this project a debugging cycle in store.ts.
 */

/* ------------------------------------------------------------- row types */

interface UnitRow {
  id: string;
  subject_id: string;
  grade: number;
  name: string;
  summary: string | null;
  sort_order: number;
  curriculum_version_id: string | null;
}

interface TopicRow {
  id: string;
  subject_id: string;
  unit_id: string | null;
  grade: number;
  name: string;
  summary: string | null;
  sort_order: number;
  curriculum_version_id: string | null;
  provenance: string;
  source_id: string | null;
}

interface LessonRow {
  id: string;
  topic_id: string;
  subject_id: string;
  grade: number;
  title: string;
  estimated_minutes: number;
  objectives: unknown;
  sections: unknown;
  key_terms: unknown;
  provenance: string;
  source_id: string | null;
  review_status: string;
  curriculum_version_id: string | null;
  sort_order: number;
}

interface QuestionRow {
  id: string;
  topic_id: string;
  subject_id: string;
  grade: number;
  question_text: string;
  options: unknown;
  correct_answer: number | null;
  explanation: string | null;
  difficulty: string;
  exam_goal: string | null;
  provenance: string;
}

interface QuizRow {
  id: string;
  lesson_id: string | null;
  topic_id: string;
  subject_id: string;
  grade: number;
  title: string;
}

interface SubjectRow {
  id: string;
  name: string;
  icon: string | null;
}

/* --------------------------------------------------------------- mappers */

/**
 * An unrecognised provenance value becomes 'liblearn', never 'official'.
 * Defaulting the other way would let a typo or a future tier promote content
 * to Ministry standing, which is the one direction that must never happen by
 * accident.
 */
const toProvenance = (v: string): ContentProvenance =>
  v === 'official' || v === 'verified' || v === 'ai-generated' ? v : 'liblearn';

const toDifficulty = (v: string): Difficulty =>
  v === 'foundation' || v === 'challenge' ? v : 'core';

const asArray = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const toUnit = (r: UnitRow): Unit => ({
  id: r.id,
  subjectId: r.subject_id,
  grade: r.grade as GradeLevel,
  name: r.name,
  summary: r.summary ?? '',
  order: r.sort_order,
  curriculumVersionId: r.curriculum_version_id ?? undefined,
});

const toTopic = (r: TopicRow): Topic => ({
  id: r.id,
  subjectId: r.subject_id,
  unitId: r.unit_id ?? undefined,
  grade: r.grade as GradeLevel,
  name: r.name,
  summary: r.summary ?? '',
  order: r.sort_order,
  curriculumVersionId: r.curriculum_version_id ?? undefined,
  provenance: toProvenance(r.provenance),
  sourceId: r.source_id ?? undefined,
});

const toLesson = (r: LessonRow): Lesson => ({
  id: r.id,
  topicId: r.topic_id,
  subjectId: r.subject_id,
  grade: r.grade as GradeLevel,
  title: r.title,
  estimatedMinutes: r.estimated_minutes,
  objectives: asArray(r.objectives),
  sections: asArray(r.sections),
  keyTerms: asArray(r.key_terms),
  provenance: toProvenance(r.provenance),
  sourceId: r.source_id ?? undefined,
  reviewStatus: (r.review_status as Lesson['reviewStatus']) ?? 'draft',
  curriculumVersionId: r.curriculum_version_id ?? undefined,
  order: r.sort_order,
});

const toQuestion = (r: QuestionRow): Question => ({
  id: r.id,
  topicId: r.topic_id,
  subjectId: r.subject_id,
  grade: r.grade as GradeLevel,
  question: r.question_text,
  options: asArray<string>(r.options),
  correctAnswer: r.correct_answer ?? 0,
  explanation: r.explanation ?? '',
  difficulty: toDifficulty(r.difficulty),
  examGoal: (r.exam_goal as ExamGoal | null) ?? undefined,
  provenance: toProvenance(r.provenance),
});

const toSubject = (r: SubjectRow, grades: GradeLevel[]): Subject => ({
  id: r.id,
  name: r.name,
  icon: r.icon ?? 'book',
  grades,
});

/* ------------------------------------------------------------ repository */

export const supabaseRepository: CurriculumRepository = {
  name: 'supabase',

  async load(grade: GradeLevel): Promise<GradeCurriculum> {
    if (!supabase) throw new Error('Supabase is not configured.');

    // Only published lessons reach students. Draft and in-review content is
    // visible to whoever is editing it, not to a child revising for an exam.
    const [unitsRes, topicsRes, lessonsRes, quizzesRes, questionsRes, subjectsRes] =
      await Promise.all([
        supabase.from('units').select('*').eq('grade', grade).order('sort_order'),
        supabase.from('topics').select('*').eq('grade', grade).order('sort_order'),
        supabase
          .from('lessons')
          .select('*')
          .eq('grade', grade)
          .eq('review_status', 'published')
          .order('sort_order'),
        supabase.from('quizzes').select('*').eq('grade', grade),
        supabase.from('questions').select('*').eq('grade', grade),
        supabase.from('subjects').select('*').eq('active', true).order('name'),
      ]);

    for (const res of [unitsRes, topicsRes, lessonsRes, quizzesRes, questionsRes, subjectsRes]) {
      if (res.error) throw toError(res.error);
    }

    const topics = (topicsRes.data as TopicRow[] | null ?? []).map(toTopic);
    const lessons = (lessonsRes.data as LessonRow[] | null ?? []).map(toLesson);
    const questions = (questionsRes.data as QuestionRow[] | null ?? []).map(toQuestion);

    // Quiz membership lives in the join table, so it needs its own read.
    const quizRows = (quizzesRes.data as QuizRow[] | null ?? []);
    let quizzes: Quiz[] = [];
    if (quizRows.length) {
      const {data: links, error} = await supabase
        .from('quiz_questions')
        .select('quiz_id, question_id, sort_order')
        .in('quiz_id', quizRows.map((q) => q.id))
        .order('sort_order');
      if (error) throw toError(error);

      const byQuiz = new Map<string, string[]>();
      for (const l of (links ?? []) as {quiz_id: string; question_id: string}[]) {
        const arr = byQuiz.get(l.quiz_id) ?? [];
        arr.push(l.question_id);
        byQuiz.set(l.quiz_id, arr);
      }

      quizzes = quizRows.map((r) => ({
        id: r.id,
        lessonId: r.lesson_id ?? undefined,
        topicId: r.topic_id,
        subjectId: r.subject_id,
        grade: r.grade as GradeLevel,
        title: r.title,
        questionIds: byQuiz.get(r.id) ?? [],
      }));
    }

    // A subject is only offered at this grade if it has content here. Listing
    // every subject in the table would recreate the empty-card problem that
    // made Grade 11 look broken.
    const subjectsWithContent = new Set(topics.map((t) => t.subjectId));
    const subjects = (subjectsRes.data as SubjectRow[] | null ?? [])
      .filter((r) => subjectsWithContent.has(r.id))
      .map((r) => toSubject(r, [grade]));

    return {
      grade,
      subjects,
      units: (unitsRes.data as UnitRow[] | null ?? []).map(toUnit),
      topics,
      lessons,
      quizzes,
      questions,
    };
  },
};
