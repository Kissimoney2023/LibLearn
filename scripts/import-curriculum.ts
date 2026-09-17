/**
 * Curriculum importer: JSON files -> Supabase.
 *
 *   npx tsx scripts/import-curriculum.ts --dry-run
 *   npx tsx scripts/import-curriculum.ts
 *   npx tsx scripts/import-curriculum.ts curriculum-data/grades/grade-11
 *
 * This is what makes adding curriculum a data operation. See
 * curriculum-data/README.md for the file format.
 *
 * Two rules shape everything below.
 *
 * 1. VALIDATE EVERYTHING BEFORE WRITING ANYTHING. A half-imported subject is
 *    worse than a failed import: it leaves topics whose lessons are missing and
 *    quizzes whose questions are absent, and those render as empty screens
 *    rather than errors, so nobody notices until a student does.
 *
 * 2. PROVENANCE IS NOT NEGOTIABLE. Content may not claim `official` or
 *    `verified` without citing a source a person has actually read. The
 *    database enforces this too; the check here exists to give a clear message
 *    at import time instead of a constraint violation.
 */
import {readdirSync, readFileSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';
import {createClient} from '@supabase/supabase-js';

/* ------------------------------------------------------------------ args */

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const roots = args.filter((a) => !a.startsWith('--'));
const ROOT = roots[0] ?? 'curriculum-data/grades';

/* ----------------------------------------------------------------- types */

interface SubjectFile {
  grade: number;
  subjectId: string;
  curriculumVersionId?: string;
  provenance?: string;
  sourceId?: string | null;
  units?: {id: string; name: string; summary?: string; order?: number}[];
  topics?: {id: string; unitId?: string; name: string; summary?: string; order?: number}[];
  lessons?: {
    id: string;
    topicId: string;
    title: string;
    estimatedMinutes?: number;
    order?: number;
    objectives?: {id: string; text: string}[];
    keyTerms?: {term: string; definition: string}[];
    sections?: {heading: string; body: string; example?: string}[];
  }[];
  questions?: {
    id: string;
    topicId: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty?: string;
    examGoal?: string;
  }[];
  quizzes?: {
    id: string;
    lessonId?: string;
    topicId: string;
    title: string;
    questionIds: string[];
  }[];
}

const errors: string[] = [];
const warnings: string[] = [];

/* ------------------------------------------------------------- discovery */

function findJson(dir: string): string[] {
  let out: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    console.error(`Cannot read directory: ${dir}`);
    process.exit(1);
  }
  for (const e of entries) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) out = out.concat(findJson(full));
    else if (e.endsWith('.json')) out.push(full);
  }
  return out;
}

const files = findJson(ROOT);
if (files.length === 0) {
  console.log(`No .json files under ${ROOT}. Nothing to import.`);
  process.exit(0);
}
console.log(`Found ${files.length} file(s) under ${ROOT}\n`);

/* ------------------------------------------------------------- load pass */

const parsed: {path: string; data: SubjectFile}[] = [];

for (const path of files) {
  const label = relative(process.cwd(), path);
  try {
    const data = JSON.parse(readFileSync(path, 'utf8')) as SubjectFile;
    if (typeof data.grade !== 'number' || data.grade < 1 || data.grade > 12) {
      errors.push(`${label}: "grade" must be a number 1-12`);
      continue;
    }
    if (!data.subjectId) {
      errors.push(`${label}: "subjectId" is required`);
      continue;
    }
    parsed.push({path: label, data});
  } catch (err) {
    errors.push(`${label}: invalid JSON — ${(err as Error).message}`);
  }
}

/* ------------------------------------------------- cross-file validation */

const allUnitIds = new Set<string>();
const allTopicIds = new Set<string>();
const allLessonIds = new Set<string>();
const allQuestionIds = new Set<string>();
const seenIds = new Map<string, string>();

const claimId = (kind: string, id: string, file: string) => {
  const prev = seenIds.get(id);
  if (prev) errors.push(`${file}: duplicate ${kind} id "${id}" (also in ${prev})`);
  else seenIds.set(id, file);
};

for (const {path, data} of parsed) {
  for (const u of data.units ?? []) {
    claimId('unit', u.id, path);
    allUnitIds.add(u.id);
  }
  for (const t of data.topics ?? []) {
    claimId('topic', t.id, path);
    allTopicIds.add(t.id);
  }
  for (const l of data.lessons ?? []) {
    claimId('lesson', l.id, path);
    allLessonIds.add(l.id);
  }
  for (const q of data.questions ?? []) {
    claimId('question', q.id, path);
    allQuestionIds.add(q.id);
  }
}

for (const {path, data} of parsed) {
  const prov = data.provenance ?? 'liblearn';

  if (!['official', 'verified', 'liblearn', 'ai-generated'].includes(prov)) {
    errors.push(`${path}: unknown provenance "${prov}"`);
  }
  if ((prov === 'official' || prov === 'verified') && !data.sourceId) {
    errors.push(
      `${path}: provenance "${prov}" requires "sourceId". Content cannot claim ` +
        'official or verified standing without a document behind it.',
    );
  }

  for (const t of data.topics ?? []) {
    if (!t.name?.trim()) errors.push(`${path}: topic ${t.id} has no name`);
    if (t.unitId && !allUnitIds.has(t.unitId)) {
      errors.push(`${path}: topic ${t.id} references unknown unit "${t.unitId}"`);
    }
  }

  for (const l of data.lessons ?? []) {
    if (!allTopicIds.has(l.topicId)) {
      errors.push(`${path}: lesson ${l.id} references unknown topic "${l.topicId}"`);
    }
    if (!l.objectives?.length) errors.push(`${path}: lesson ${l.id} has no objectives`);
    if (!l.sections?.length) errors.push(`${path}: lesson ${l.id} has no sections`);
    for (const s of l.sections ?? []) {
      if (!s.heading?.trim() || !s.body?.trim()) {
        errors.push(`${path}: lesson ${l.id} has a section with no heading or body`);
      }
    }
  }

  for (const q of data.questions ?? []) {
    if (!allTopicIds.has(q.topicId)) {
      errors.push(`${path}: question ${q.id} references unknown topic "${q.topicId}"`);
    }
    if (!Array.isArray(q.options) || q.options.length < 2) {
      errors.push(`${path}: question ${q.id} needs at least 2 options`);
    } else if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
      errors.push(
        `${path}: question ${q.id} correctAnswer ${q.correctAnswer} is out of range`,
      );
    } else if (new Set(q.options).size !== q.options.length) {
      errors.push(`${path}: question ${q.id} has duplicate options`);
    }
    if (!q.explanation?.trim()) {
      errors.push(
        `${path}: question ${q.id} has no explanation. Students read it after ` +
          'answering — it is the teaching, not metadata.',
      );
    }
  }

  for (const quiz of data.quizzes ?? []) {
    if (!allTopicIds.has(quiz.topicId)) {
      errors.push(`${path}: quiz ${quiz.id} references unknown topic "${quiz.topicId}"`);
    }
    if (quiz.lessonId && !allLessonIds.has(quiz.lessonId)) {
      errors.push(`${path}: quiz ${quiz.id} references unknown lesson "${quiz.lessonId}"`);
    }
    if (!quiz.questionIds?.length) errors.push(`${path}: quiz ${quiz.id} has no questions`);
    for (const qid of quiz.questionIds ?? []) {
      if (!allQuestionIds.has(qid)) {
        errors.push(
          `${path}: quiz ${quiz.id} references missing question "${qid}" ` +
            '(this renders as an empty quiz, not an error)',
        );
      }
    }
  }

  for (const t of data.topics ?? []) {
    if (!(data.lessons ?? []).some((l) => l.topicId === t.id)) {
      warnings.push(`${path}: topic ${t.id} has no lessons and will render empty`);
    }
  }
}

/* ------------------------------------------------------------- reporting */

console.log(
  `Parsed: ${allUnitIds.size} units, ${allTopicIds.size} topics, ` +
    `${allLessonIds.size} lessons, ${allQuestionIds.size} questions`,
);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

if (errors.length) {
  console.error(`\n${errors.length} ERROR(S) — nothing was written:`);
  for (const e of errors) console.error(`  x ${e}`);
  process.exit(1);
}

console.log('\nValidation passed.');

if (dryRun) {
  console.log('--dry-run: stopping before any write.');
  process.exit(0);
}

/* ---------------------------------------------------------------- import */

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    '\nSUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set to write.\n' +
      'The service-role key bypasses row-level security, which is why it can write\n' +
      'curriculum — and why it must never be committed or given a VITE_ prefix.\n' +
      'Re-run with --dry-run to validate without writing.',
  );
  process.exit(1);
}

const db = createClient(url, serviceKey, {auth: {persistSession: false}});

/** Upsert in chunks; a single oversized request is the usual failure here. */
async function upsert(table: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const SIZE = 200;
  for (let i = 0; i < rows.length; i += SIZE) {
    const chunk = rows.slice(i, i + SIZE);
    const {error} = await db.from(table).upsert(chunk, {onConflict: 'id'});
    if (error) {
      console.error(`\nFailed writing ${table}: ${error.message}`);
      if (error.message.includes('nobody has read')) {
        console.error(
          'The database rejected a provenance claim. A source stays `located` ' +
            'until a person reads the document and marks it `reviewed`.',
        );
      }
      process.exit(1);
    }
  }
  console.log(`  ${table}: ${rows.length}`);
}

console.log('\nWriting to Supabase…');

for (const {data} of parsed) {
  const prov = data.provenance ?? 'liblearn';
  const version = data.curriculumVersionId ?? 'liblearn-v1';
  const sourceId = data.sourceId ?? null;

  await upsert(
    'units',
    (data.units ?? []).map((u, i) => ({
      id: u.id,
      subject_id: data.subjectId,
      curriculum_version_id: version,
      grade: data.grade,
      name: u.name,
      summary: u.summary ?? '',
      sort_order: u.order ?? i + 1,
    })),
  );

  await upsert(
    'topics',
    (data.topics ?? []).map((t, i) => ({
      id: t.id,
      unit_id: t.unitId ?? null,
      subject_id: data.subjectId,
      curriculum_version_id: version,
      grade: data.grade,
      name: t.name,
      summary: t.summary ?? '',
      provenance: prov,
      source_id: sourceId,
      sort_order: t.order ?? i + 1,
    })),
  );

  await upsert(
    'lessons',
    (data.lessons ?? []).map((l, i) => ({
      id: l.id,
      topic_id: l.topicId,
      subject_id: data.subjectId,
      curriculum_version_id: version,
      grade: data.grade,
      title: l.title,
      estimated_minutes: l.estimatedMinutes ?? 10,
      objectives: l.objectives ?? [],
      sections: l.sections ?? [],
      key_terms: l.keyTerms ?? [],
      provenance: prov,
      source_id: sourceId,
      review_status: 'published',
      sort_order: l.order ?? i + 1,
    })),
  );

  await upsert(
    'questions',
    (data.questions ?? []).map((q) => ({
      id: q.id,
      topic_id: q.topicId,
      subject_id: data.subjectId,
      curriculum_version_id: version,
      grade: data.grade,
      question_type: 'multiple_choice',
      question_text: q.question,
      options: q.options,
      correct_answer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty ?? 'core',
      exam_goal: q.examGoal ?? null,
      provenance: prov,
      source_id: sourceId,
      review_status: 'published',
    })),
  );

  await upsert(
    'quizzes',
    (data.quizzes ?? []).map((q) => ({
      id: q.id,
      lesson_id: q.lessonId ?? null,
      topic_id: q.topicId,
      subject_id: data.subjectId,
      grade: data.grade,
      title: q.title,
    })),
  );

  const links = (data.quizzes ?? []).flatMap((q) =>
    q.questionIds.map((qid, i) => ({quiz_id: q.id, question_id: qid, sort_order: i + 1})),
  );
  if (links.length) {
    const {error} = await db
      .from('quiz_questions')
      .upsert(links, {onConflict: 'quiz_id,question_id'});
    if (error) {
      console.error(`\nFailed writing quiz_questions: ${error.message}`);
      process.exit(1);
    }
    console.log(`  quiz_questions: ${links.length}`);
  }
}

console.log('\nImport complete.');
