/**
 * Exports bundled seed content into the curriculum-data/ JSON format.
 *
 *   npx tsx scripts/export-curriculum.ts
 *
 * Its job is to make the bundled corpus and the importable format the same
 * thing, so the files under curriculum-data/ are a real working example rather
 * than documentation that drifts from the code.
 */
import {mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {LESSONS, TOPICS, UNITS} from '../src/data/seed/curriculum';
import {QUESTIONS, QUIZZES} from '../src/data/seed/questions';

const grades = [...new Set(TOPICS.map((t) => t.grade))].sort((a, b) => a - b);
let written = 0;

for (const grade of grades) {
  const subjects = [...new Set(TOPICS.filter((t) => t.grade === grade).map((t) => t.subjectId))];

  for (const subjectId of subjects) {
    const topics = TOPICS.filter((t) => t.grade === grade && t.subjectId === subjectId);
    const topicIds = new Set(topics.map((t) => t.id));
    const lessons = LESSONS.filter((l) => topicIds.has(l.topicId));
    const lessonIds = new Set(lessons.map((l) => l.id));
    const questions = QUESTIONS.filter((q) => topicIds.has(q.topicId));
    const quizzes = QUIZZES.filter((q) => topicIds.has(q.topicId) || (q.lessonId && lessonIds.has(q.lessonId)));
    const unitIds = new Set(topics.map((t) => t.unitId).filter(Boolean));

    const out = {
      grade,
      subjectId,
      curriculumVersionId: topics[0]?.curriculumVersionId ?? 'liblearn-v1',
      provenance: lessons[0]?.provenance ?? 'liblearn',
      sourceId: lessons[0]?.sourceId ?? null,
      units: UNITS.filter((u) => unitIds.has(u.id)).map((u) => ({
        id: u.id, name: u.name, summary: u.summary, order: u.order,
      })),
      topics: topics.map((t) => ({
        id: t.id, unitId: t.unitId, name: t.name, summary: t.summary, order: t.order,
      })),
      lessons: lessons.map((l) => ({
        id: l.id, topicId: l.topicId, title: l.title,
        estimatedMinutes: l.estimatedMinutes, order: l.order,
        objectives: l.objectives, keyTerms: l.keyTerms ?? [], sections: l.sections,
      })),
      questions: questions.map((q) => ({
        id: q.id, topicId: q.topicId, question: q.question, options: q.options,
        correctAnswer: q.correctAnswer, explanation: q.explanation,
        difficulty: q.difficulty, examGoal: q.examGoal,
      })),
      quizzes: quizzes.map((q) => ({
        id: q.id, lessonId: q.lessonId, topicId: q.topicId,
        title: q.title, questionIds: q.questionIds,
      })),
    };

    const dir = join('curriculum-data', 'grades', `grade-${String(grade).padStart(2, '0')}`);
    mkdirSync(dir, {recursive: true});
    writeFileSync(join(dir, `${subjectId}.json`), JSON.stringify(out, null, 2) + '\n');
    written++;
  }
}
console.log(`Wrote ${written} subject file(s) under curriculum-data/grades/`);
