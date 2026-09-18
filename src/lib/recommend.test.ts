/**
 * Recommendation and standing tests.
 *   npx tsx src/lib/recommend.test.ts
 *
 * The boundaries are the whole point: a student on exactly 60% or exactly 80%
 * must land on the documented side of the rule, every time.
 */
import type {QuizAttempt} from '../types/domain';
import {DEFAULT_THRESHOLDS, recommendAfterQuiz, standingFor, weakObjectives} from './recommend';

let failures = 0;
const eq = (name: string, actual: unknown, expected: unknown) => {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) console.log(`  ok   ${name}`);
  else {
    failures++;
    console.log(`  FAIL ${name}\n         expected ${e}\n         actual   ${a}`);
  }
};

const attempt = (score: number, total: number, answers: QuizAttempt['answers'] = []): QuizAttempt => ({
  id: 'a', quizId: 'q', subjectId: 'mathematics', topicId: 't', grade: 11,
  answers, score, total, startedAt: '', submittedAt: '',
});

console.log('recommendations');
eq('0% sends the student back to the Note', recommendAfterQuiz(0, 'Algebra').action, 'review');
eq('59% is still review', recommendAfterQuiz(59, 'Algebra').action, 'review');
eq('exactly 60% is practice, not review', recommendAfterQuiz(60, 'Algebra').action, 'practice');
eq('79% is practice', recommendAfterQuiz(79, 'Algebra').action, 'practice');
eq('exactly 80% advances', recommendAfterQuiz(80, 'Algebra').action, 'advance');
eq('100% advances', recommendAfterQuiz(100, 'Algebra').action, 'advance');
eq('the reason names the score and the topic',
   recommendAfterQuiz(45, 'Quadratics').detail.includes('45%') &&
   recommendAfterQuiz(45, 'Quadratics').detail.includes('Quadratics'), true);
eq('thresholds are configurable',
   recommendAfterQuiz(65, 'Algebra', {review: 70, practice: 90}).action, 'review');
eq('defaults are 60 and 80', [DEFAULT_THRESHOLDS.review, DEFAULT_THRESHOLDS.practice], [60, 80]);

console.log('\ncompletion is not mastery');
{
  // The case the rule exists to prevent: lots of reading, no evidence of
  // understanding. Learning progress is high; quiz average must not inherit it.
  const s = standingFor(10, 8, []);
  eq('8 of 10 lessons read is 80% learning progress', s.learningProgress, 80);
  eq('...and NOT an 80% quiz average', s.quizAverage, null);
  eq('...with no attempts claimed', s.attempts, 0);
}
{
  const s = standingFor(10, 8, [attempt(1, 2), attempt(4, 4)]);
  eq('quiz average is the mean of attempt percentages', s.quizAverage, 75);
  eq('learning progress is unaffected by scores', s.learningProgress, 80);
}
{
  // A long quiz and a short quiz each count once, so one long quiz cannot
  // dominate the average.
  const s = standingFor(1, 1, [attempt(1, 1), attempt(0, 20)]);
  eq('attempts are weighted equally, not by question count', s.quizAverage, 50);
}
eq('no lessons is 0%, not a divide by zero', standingFor(0, 0, []).learningProgress, 0);

console.log('\nweak objectives');
{
  const answers = (ids: [string, boolean][]) =>
    ids.map(([questionId, correct]) => ({questionId, selected: 0, correct}));
  const objectiveOf = (id: string) => ({q1: 'o1', q2: 'o1', q3: 'o2', q4: 'o3'})[id];
  const weak = weakObjectives(
    [attempt(1, 4, answers([['q1', false], ['q2', false], ['q3', false], ['q4', true]]))],
    objectiveOf,
  );
  eq('objectives answered wrong are surfaced worst-first', weak.map((w) => w.objectiveId), ['o1', 'o2']);
  eq('o1 counts both wrong answers', weak[0], {objectiveId: 'o1', wrong: 2, asked: 2});
  eq('objectives answered correctly are not listed', weak.some((w) => w.objectiveId === 'o3'), false);
}
eq('questions with no objective are ignored rather than guessed',
   weakObjectives([attempt(0, 1, [{questionId: 'x', selected: 0, correct: false}])], () => undefined), []);

console.log(failures === 0 ? '\nAll recommendation checks passed.' : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
