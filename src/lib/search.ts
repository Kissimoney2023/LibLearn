import {LESSONS, TOPICS, UNITS} from '../data/seed/curriculum';
import {QUESTIONS, QUIZZES} from '../data/seed/questions';
import {SUBJECTS} from '../data/catalog';
import type {GradeLevel} from '../types/domain';

/**
 * Global search over the content catalog.
 *
 * The index is built once at module load from the seed data and held in
 * memory - the whole catalog is small enough that this costs nothing and
 * avoids a network round trip on every keystroke, which matters on an
 * intermittent connection.
 *
 * Ranking is deliberately simple and explainable: a title match outranks a
 * body match, a whole-word match outranks a prefix, and ties break towards
 * the student's own grade.
 */

export type ResultKind = 'lesson' | 'topic' | 'subject' | 'quiz' | 'unit' | 'question';

export interface SearchResult {
  id: string;
  kind: ResultKind;
  title: string;
  /** Where it sits, e.g. "Grade 8 · Mathematics". */
  context: string;
  href: string;
  grade?: GradeLevel;
  score: number;
}

interface IndexEntry {
  id: string;
  kind: ResultKind;
  title: string;
  context: string;
  href: string;
  grade?: GradeLevel;
  /** Lower-cased haystack of everything searchable except the title. */
  body: string;
}

const subjectName = (id: string) =>
  SUBJECTS.find((s) => s.id === id)?.name ?? id;

const INDEX: IndexEntry[] = [
  ...SUBJECTS.map<IndexEntry>((s) => ({
    id: s.id,
    kind: 'subject',
    title: s.name,
    context: `Grades ${s.grades[0]}–${s.grades[s.grades.length - 1]}`,
    href: `/learn/${s.grades[0]}/${s.id}`,
    body: s.name.toLowerCase(),
  })),

  ...TOPICS.map<IndexEntry>((t) => ({
    id: t.id,
    kind: 'topic',
    title: t.name,
    context: `Grade ${t.grade} · ${subjectName(t.subjectId)}`,
    href: `/learn/${t.grade}/${t.subjectId}/${t.id}`,
    grade: t.grade,
    body: `${t.name} ${t.summary}`.toLowerCase(),
  })),

  ...LESSONS.map<IndexEntry>((l) => ({
    id: l.id,
    kind: 'lesson',
    title: l.title,
    context: `Grade ${l.grade} · ${subjectName(l.subjectId)}`,
    href: `/learn/${l.grade}/${l.subjectId}/${l.topicId}?lesson=${l.id}`,
    grade: l.grade,
    body: [
      l.title,
      ...l.objectives.map((o) => o.text),
      ...l.sections.map((s) => `${s.heading} ${s.body} ${s.example ?? ''}`),
    ]
      .join(' ')
      .toLowerCase(),
  })),

  ...UNITS.map<IndexEntry>((u) => ({
    id: u.id,
    kind: 'unit',
    title: u.name,
    context: `Grade ${u.grade} · ${subjectName(u.subjectId)}`,
    href: `/learn/${u.grade}/${u.subjectId}`,
    grade: u.grade,
    body: `${u.name} ${u.summary}`.toLowerCase(),
  })),

  // Questions are indexed on their text and explanation, but NOT on their
  // options. Indexing the options would let a student search a question and see
  // the correct answer highlighted in the result snippet, which turns search
  // into an answer key.
  ...QUESTIONS.map<IndexEntry>((q) => ({
    id: q.id,
    kind: 'question',
    title: q.question,
    context: `Grade ${q.grade} · ${subjectName(q.subjectId)} · Practice question`,
    href: `/learn/${q.grade}/${q.subjectId}/${q.topicId}`,
    grade: q.grade,
    body: q.question.toLowerCase(),
  })),

  ...QUIZZES.map<IndexEntry>((q) => ({
    id: q.id,
    kind: 'quiz',
    title: q.title,
    context: `Grade ${q.grade} · ${subjectName(q.subjectId)}`,
    href: `/quiz/${q.id}`,
    grade: q.grade,
    body: q.title.toLowerCase(),
  })),
];

const KIND_WEIGHT: Record<ResultKind, number> = {
  lesson: 3,
  unit: 2,
  question: 1,
  topic: 2,
  quiz: 2,
  subject: 1,
};

function scoreEntry(entry: IndexEntry, terms: string[]): number {
  const title = entry.title.toLowerCase();
  let score = 0;

  for (const term of terms) {
    const inTitle = title.includes(term);
    const inBody = entry.body.includes(term);
    if (!inTitle && !inBody) return 0; // every term must appear somewhere

    if (inTitle) {
      // Whole-word title hits are the strongest signal a student can give us.
      score += new RegExp(`\\b${term}`, 'i').test(title) ? 10 : 6;
    }
    if (inBody) score += 2;
  }

  return score + KIND_WEIGHT[entry.kind];
}

export function search(
  query: string,
  preferredGrade: GradeLevel | null = null,
  limit = 20,
): SearchResult[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1);

  if (terms.length === 0) return [];

  return INDEX.map((entry) => ({entry, score: scoreEntry(entry, terms)}))
    .filter((r) => r.score > 0)
    .map(({entry, score}) => ({
      ...entry,
      // Nudge the student's own grade up, without hiding other grades.
      score: preferredGrade !== null && entry.grade === preferredGrade ? score + 4 : score,
    }))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit)
    .map(({body: _body, ...rest}) => rest);
}

export const KIND_LABELS: Record<ResultKind, string> = {
  lesson: 'Lesson',
  unit: 'Unit',
  topic: 'Topic',
  subject: 'Subject',
  question: 'Question',
  quiz: 'Practice',
};
