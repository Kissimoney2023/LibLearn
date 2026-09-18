/**
 * Curriculum integrity checker.
 *
 *   npx tsx scripts/validate-curriculum.ts
 *
 * Runs over the seed data and refuses to pass on anything that would reach a
 * student as a broken or dishonest record. It exists because the failure modes
 * here are quiet ones: a quiz referencing a question id that does not exist
 * renders as an empty quiz rather than an error, and a lesson claiming
 * `official` provenance with no source looks authoritative while being
 * unsupported.
 *
 * Wire this into CI before content is accepted from any bulk import.
 */
import {LESSONS, TOPICS} from '../src/data/seed/curriculum';
import {QUESTIONS, QUIZZES} from '../src/data/seed/questions';
import {SUBJECTS} from '../src/data/catalog';
import {QUESTION_ALIGNMENT} from '../src/data/seed/alignment';
import {noteForLesson} from '../src/lib/curriculum/notes';
import {CONTENT_SOURCES, CURRICULUM_VERSIONS} from '../src/data/sources';

const errors: string[] = [];
const warnings: string[] = [];

const err = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

const subjectIds = new Set(SUBJECTS.map((s) => s.id));
const topicIds = new Set(TOPICS.map((t) => t.id));
const lessonIds = new Set(LESSONS.map((l) => l.id));
const questionIds = new Set(QUESTIONS.map((q) => q.id));
const sourceIds = new Set(CONTENT_SOURCES.map((s) => s.id));
const versionIds = new Set(CURRICULUM_VERSIONS.map((v) => v.id));

/* ---------------------------------------------------- duplicate ids ---- */
const dupes = (name: string, ids: string[]) => {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) err(`${name}: duplicate id "${id}"`);
    seen.add(id);
  }
};
dupes('topics', TOPICS.map((t) => t.id));
dupes('lessons', LESSONS.map((l) => l.id));
dupes('questions', QUESTIONS.map((q) => q.id));
dupes('quizzes', QUIZZES.map((q) => q.id));

/* ---------------------------------------------------------- topics ---- */
for (const t of TOPICS) {
  if (!subjectIds.has(t.subjectId)) err(`topic ${t.id}: unknown subject "${t.subjectId}"`);
  const subject = SUBJECTS.find((s) => s.id === t.subjectId);
  if (subject && !subject.grades.includes(t.grade)) {
    err(`topic ${t.id}: subject "${t.subjectId}" is not offered at grade ${t.grade}`);
  }
  if (t.curriculumVersionId && !versionIds.has(t.curriculumVersionId)) {
    err(`topic ${t.id}: unknown curriculum version "${t.curriculumVersionId}"`);
  }
  if (!t.summary?.trim()) err(`topic ${t.id}: empty summary`);
}

/* --------------------------------------------------------- lessons ---- */
for (const l of LESSONS) {
  if (!topicIds.has(l.topicId)) err(`lesson ${l.id}: unknown topic "${l.topicId}"`);
  if (!subjectIds.has(l.subjectId)) err(`lesson ${l.id}: unknown subject "${l.subjectId}"`);

  const topic = TOPICS.find((t) => t.id === l.topicId);
  if (topic && topic.subjectId !== l.subjectId) {
    err(`lesson ${l.id}: subject "${l.subjectId}" disagrees with its topic's "${topic.subjectId}"`);
  }
  if (topic && topic.grade !== l.grade) {
    err(`lesson ${l.id}: grade ${l.grade} disagrees with its topic's grade ${topic.grade}`);
  }

  if (l.objectives.length === 0) err(`lesson ${l.id}: no learning objectives`);
  if (l.sections.length < 3) warn(`lesson ${l.id}: only ${l.sections.length} sections`);
  if (l.estimatedMinutes <= 0) err(`lesson ${l.id}: estimatedMinutes must be positive`);

  for (const s of l.sections) {
    if (!s.heading?.trim()) err(`lesson ${l.id}: a section has no heading`);
    if (!s.body?.trim()) err(`lesson ${l.id}: section "${s.heading}" has no body`);
  }

  // The provenance rule this project exists to enforce.
  if (l.provenance === 'official' || l.provenance === 'verified') {
    if (!l.sourceId) {
      err(
        `lesson ${l.id}: provenance "${l.provenance}" requires a sourceId. ` +
          'Content may not claim official or verified standing without a document behind it.',
      );
    } else if (!sourceIds.has(l.sourceId)) {
      err(`lesson ${l.id}: unknown sourceId "${l.sourceId}"`);
    } else {
      const src = CONTENT_SOURCES.find((s) => s.id === l.sourceId)!;
      if (src.verificationStatus !== 'reviewed' && src.verificationStatus !== 'verified') {
        err(
          `lesson ${l.id}: cites source "${src.id}" whose status is "${src.verificationStatus}". ` +
            'A source nobody has read cannot support an official claim.',
        );
      }
    }
  }
  if (l.curriculumVersionId && !versionIds.has(l.curriculumVersionId)) {
    err(`lesson ${l.id}: unknown curriculum version "${l.curriculumVersionId}"`);
  }
}

/* ------------------------------------------------------- questions ---- */
for (const q of QUESTIONS) {
  if (!topicIds.has(q.topicId)) err(`question ${q.id}: unknown topic "${q.topicId}"`);
  if (!subjectIds.has(q.subjectId)) err(`question ${q.id}: unknown subject "${q.subjectId}"`);
  if (q.options.length < 2) err(`question ${q.id}: needs at least 2 options`);
  if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
    err(`question ${q.id}: correctAnswer ${q.correctAnswer} is out of range`);
  }
  if (new Set(q.options).size !== q.options.length) {
    err(`question ${q.id}: duplicate options`);
  }
  if (!q.explanation?.trim()) {
    err(`question ${q.id}: no explanation. Students see this after answering; it is the teaching.`);
  } else if (q.explanation.trim().length < 40) {
    warn(`question ${q.id}: very short explanation`);
  }
}

/* --------------------------------------------------------- quizzes ---- */
for (const quiz of QUIZZES) {
  if (!topicIds.has(quiz.topicId)) err(`quiz ${quiz.id}: unknown topic "${quiz.topicId}"`);
  if (quiz.lessonId && !lessonIds.has(quiz.lessonId)) {
    err(`quiz ${quiz.id}: unknown lesson "${quiz.lessonId}"`);
  }
  if (quiz.questionIds.length === 0) err(`quiz ${quiz.id}: has no questions`);
  for (const qid of quiz.questionIds) {
    if (!questionIds.has(qid)) {
      err(`quiz ${quiz.id}: references missing question "${qid}" (renders as an empty quiz)`);
    }
  }
}

/* ---------------------------------- dead ends a student would notice --- */
for (const l of LESSONS) {
  if (!QUIZZES.some((q) => q.lessonId === l.id)) {
    warn(`lesson ${l.id}: no quiz attached`);
  }
}
for (const t of TOPICS) {
  if (!LESSONS.some((l) => l.topicId === t.id)) {
    warn(`topic ${t.id}: no lessons, will render as an empty topic`);
  }
}

/* ------------------------------------------------ coverage reporting -- */
const grades = [...new Set(TOPICS.map((t) => t.grade))].sort((a, b) => a - b);
console.log('Curriculum coverage');
for (const g of grades) {
  const ts = TOPICS.filter((t) => t.grade === g);
  const ls = LESSONS.filter((l) => l.grade === g);
  const qs = QUESTIONS.filter((q) => q.grade === g);
  const subs = [...new Set(ts.map((t) => t.subjectId))].sort();
  console.log(
    `  Grade ${String(g).padStart(2)}  ${String(ts.length).padStart(2)} topics  ` +
      `${String(ls.length).padStart(2)} lessons  ${String(qs.length).padStart(3)} questions   ${subs.join(', ')}`,
  );
}

const byProvenance = LESSONS.reduce<Record<string, number>>((acc, l) => {
  acc[l.provenance] = (acc[l.provenance] ?? 0) + 1;
  return acc;
}, {});
console.log('\nLesson provenance:', byProvenance);
const unreviewed = CONTENT_SOURCES.filter(
  (s) => s.verificationStatus === 'located' || s.verificationStatus === 'verification-required',
);
console.log(`Sources awaiting human review: ${unreviewed.length}/${CONTENT_SOURCES.length}`);


/* ------------------------------------------- NOTE -> QUESTION ALIGNMENT --- */
/*
 * The rule: a question may only assess something its lesson's Note teaches.
 *
 * A question that cannot be traced to a section of a real Note is not assessed
 * learning - it is a guess dressed as assessment - so it is reported as
 * NEEDS_VERIFICATION rather than quietly passing.
 */
const NOTES = new Map(LESSONS.map((l) => [l.id, noteForLesson(l)]));
const needsVerification: string[] = [];
const objectiveGaps: string[] = [];

for (const q of QUESTIONS) {
  const a = QUESTION_ALIGNMENT[q.id];

  if (!a) {
    needsVerification.push(`${q.id}: no alignment entry — not traceable to any Note`);
    continue;
  }

  const lesson = LESSONS.find((l) => l.id === a.lessonId);
  if (!lesson) {
    errors.push(`question ${q.id}: aligned to lesson ${a.lessonId}, which does not exist`);
    continue;
  }
  if (lesson.grade !== q.grade) {
    errors.push(`question ${q.id}: grade ${q.grade} but its lesson ${lesson.id} is grade ${lesson.grade}`);
  }
  if (lesson.subjectId !== q.subjectId) {
    errors.push(`question ${q.id}: subject ${q.subjectId} but its lesson ${lesson.id} is ${lesson.subjectId}`);
  }

  const note = NOTES.get(a.lessonId)!;

  if (a.noteSection === null) {
    if (!a.gap) errors.push(`question ${q.id}: unaligned but gives no reason (gap is required)`);
    needsVerification.push(`${q.id}: ${a.gap ?? 'no reason given'}`);
  } else if (!note.sections.some((sec) => sec.key === a.noteSection)) {
    // The citation points at a section that is not in the Note. Either the
    // heading was renamed or the citation was wrong; both need a human.
    errors.push(
      `question ${q.id}: cites note section "${a.noteSection}" which ${note.lessonId} does not have ` +
        `(has: ${note.sections.map((x) => x.key).join(', ')})`,
    );
  }

  if (a.objectiveId === null) {
    if (!a.gap) errors.push(`question ${q.id}: no objective and no reason given`);
    objectiveGaps.push(`${q.id}: ${a.gap ?? ''}`);
  } else if (!lesson.objectives.some((o) => o.id === a.objectiveId)) {
    errors.push(`question ${q.id}: cites objective ${a.objectiveId}, absent from ${lesson.id}`);
  }
}

/* A quiz may only contain questions aligned to ITS OWN lesson. This is the
 * check that caught the Grade 8 algebra quiz testing two other lessons. */
for (const qz of QUIZZES) {
  if (!qz.lessonId) {
    errors.push(`quiz ${qz.id}: has no lessonId, so it has no Note to be built from`);
    continue;
  }
  const note = NOTES.get(qz.lessonId);
  if (!note) {
    errors.push(`quiz ${qz.id}: lesson ${qz.lessonId} does not exist`);
    continue;
  }
  if (note.status !== 'published') {
    errors.push(`quiz ${qz.id}: built on a Note that is ${note.status}, not published`);
  }
  for (const qid of qz.questionIds) {
    const a = QUESTION_ALIGNMENT[qid];
    if (!a) {
      errors.push(`quiz ${qz.id}: question ${qid} has no Note alignment`);
    } else if (a.lessonId !== qz.lessonId) {
      errors.push(
        `quiz ${qz.id} (lesson ${qz.lessonId}): question ${qid} is taught by ${a.lessonId}. ` +
          `A quiz must not assess a lesson the student did not open.`,
      );
    } else if (a.noteSection === null) {
      errors.push(`quiz ${qz.id}: question ${qid} is NEEDS_VERIFICATION and must not be in a quiz`);
    }
  }
}

/* Every published lesson must have a Note with objectives, and every objective
 * should be assessed by something. */
for (const l of LESSONS) {
  const note = NOTES.get(l.id)!;
  if (note.sections.length === 0) errors.push(`lesson ${l.id}: Note has no sections`);
  if (note.objectives.length === 0) errors.push(`lesson ${l.id}: Note has no learning objectives`);

  const assessed = new Set(
    QUESTIONS.filter((q) => QUESTION_ALIGNMENT[q.id]?.lessonId === l.id)
      .map((q) => QUESTION_ALIGNMENT[q.id]?.objectiveId)
      .filter(Boolean),
  );
  for (const o of note.objectives) {
    if (!assessed.has(o.id)) {
      warnings.push(`lesson ${l.id}: objective ${o.id} is taught but never assessed`);
    }
  }
}

console.log('\nNote alignment');
console.log(`  Notes built:            ${NOTES.size}`);
console.log(`  Questions traced:       ${QUESTIONS.length - needsVerification.length}/${QUESTIONS.length}`);
console.log(`  NEEDS_VERIFICATION:     ${needsVerification.length}`);
console.log(`  Taught but no objective: ${objectiveGaps.length}`);
if (needsVerification.length) {
  console.log('\n  NEEDS_VERIFICATION (kept out of quizzes, never guessed):');
  for (const n of needsVerification) console.log(`    ? ${n}`);
}
if (objectiveGaps.length) {
  console.log('\n  Taught, but no learning objective covers it:');
  for (const n of objectiveGaps) console.log(`    ? ${n}`);
}

/* ----------------------------------------------------------- result --- */
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}
if (errors.length) {
  console.error(`\n${errors.length} ERROR(S):`);
  for (const e of errors) console.error(`  x ${e}`);
  process.exit(1);
}
console.log('\nAll integrity checks passed.');
