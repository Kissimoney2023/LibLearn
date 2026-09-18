import type {Question, Quiz} from '../../types/domain';
import {QUESTION_ALIGNMENT} from './alignment';
import {GRADE4_QUESTIONS, GRADE4_QUIZZES} from './grade4Questions';
import {LOWER_PRIMARY_QUESTIONS, LOWER_PRIMARY_QUIZZES} from './lowerPrimaryQuestions';
import {GRADE11_QUESTIONS, GRADE11_QUIZZES} from './grade11Questions';
import {OTHER_GRADE_QUESTIONS, OTHER_GRADE_QUIZZES} from './gradesQuestions';

/**
 * LIBLEARN QUESTION BANK. provenance: 'liblearn' throughout.
 *
 * Questions tagged with an `examGoal` are written in the general style of that
 * examination. They are NOT past papers and carry no official standing.
 */

const BASE_QUESTIONS: Question[] = [
  // ---- Grade 8 Mathematics / Algebra ----
  {
    id: 'q-alg-1', subjectId: 'mathematics', grade: 8, topicId: 'g8-math-algebra',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'ljhsce',
    question: 'What is the coefficient of x in the expression 7x + 4?',
    options: ['7', '4', 'x', '11'],
    correctAnswer: 0,
    explanation: 'The coefficient is the number multiplying the variable. In 7x, the 7 multiplies x, so the coefficient is 7. The 4 is a constant.',
  },
  {
    id: 'q-alg-2', subjectId: 'mathematics', grade: 8, topicId: 'g8-math-algebra',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'ljhsce',
    question: 'Solve for x:  x + 9 = 16',
    options: ['x = 25', 'x = 7', 'x = 9', 'x = 16'],
    correctAnswer: 1,
    explanation: 'Nine has been added to x, so subtract 9 from both sides: x + 9 - 9 = 16 - 9, giving x = 7. Check: 7 + 9 = 16.',
  },
  {
    id: 'q-alg-3', subjectId: 'mathematics', grade: 8, topicId: 'g8-math-algebra',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'ljhsce',
    question: 'Solve for x:  3x + 4 = 19',
    options: ['x = 5', 'x = 7', 'x = 15', 'x = 23'],
    correctAnswer: 0,
    explanation: 'Undo in reverse order. Subtract 4 from both sides: 3x = 15. Then divide both sides by 3: x = 5. Check: 3 x 5 + 4 = 19.',
  },
  {
    id: 'q-alg-4', subjectId: 'mathematics', grade: 8, topicId: 'g8-math-algebra',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'ljhsce',
    question: 'Expand:  4(x + 3)',
    options: ['4x + 3', '4x + 12', 'x + 12', '7x'],
    correctAnswer: 1,
    explanation: 'The 4 multiplies every term inside the bracket, not just the first: 4 times x is 4x, and 4 times 3 is 12. So the answer is 4x + 12.',
  },
  {
    id: 'q-alg-5', subjectId: 'mathematics', grade: 8, topicId: 'g8-math-algebra',
    difficulty: 'challenge', provenance: 'liblearn', examGoal: 'ljhsce',
    question: 'Solve for x:  2(x - 5) = 14',
    options: ['x = 2', 'x = 9', 'x = 12', 'x = 24'],
    correctAnswer: 2,
    explanation: 'Expand first: 2x - 10 = 14. Add 10 to both sides: 2x = 24. Divide by 2: x = 12. Check: 2(12 - 5) = 2 x 7 = 14.',
  },
  {
    id: 'q-alg-6', subjectId: 'mathematics', grade: 8, topicId: 'g8-math-algebra',
    difficulty: 'core', provenance: 'liblearn',
    question: 'A taxi charges 40 dollars to start plus 15 dollars per kilometre. Which expression gives the cost of a journey of k kilometres?',
    options: ['40k + 15', '55k', '40 + 15k', '15 + 40k'],
    correctAnswer: 2,
    explanation: 'The 40 is paid once, so it stands alone. The 15 is paid for each kilometre, so it multiplies k. That gives 40 + 15k.',
  },
  {
    id: 'q-alg-7', subjectId: 'mathematics', grade: 8, topicId: 'g8-math-algebra',
    difficulty: 'challenge', provenance: 'liblearn', examGoal: 'ljhsce',
    question: 'Solve for x:  5x - 3 = 2x + 12',
    options: ['x = 3', 'x = 5', 'x = 9', 'x = 15'],
    correctAnswer: 1,
    explanation: 'Collect the x terms on one side: subtract 2x from both sides to get 3x - 3 = 12. Add 3: 3x = 15. Divide by 3: x = 5.',
  },

  // ---- Grade 8 Mathematics / Fractions ----
  {
    id: 'q-fr8-1', subjectId: 'mathematics', grade: 8, topicId: 'g8-math-fractions',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Write 3/4 as a decimal.',
    options: ['0.34', '0.75', '0.43', '1.33'],
    correctAnswer: 1,
    explanation: 'A fraction means divide. 3 divided by 4 is 0.75.',
  },
  {
    id: 'q-fr8-2', subjectId: 'mathematics', grade: 8, topicId: 'g8-math-fractions',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Write 0.35 as a fraction in its lowest terms.',
    options: ['35/10', '7/20', '3/5', '35/1000'],
    correctAnswer: 1,
    explanation: '0.35 is thirty-five hundredths, so 35/100. Divide top and bottom by 5 to get 7/20.',
  },
  {
    id: 'q-fr8-3', subjectId: 'mathematics', grade: 8, topicId: 'g8-math-fractions',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Which is larger: 0.6 or 5/8?',
    options: ['0.6', '5/8', 'They are equal', 'Cannot be compared'],
    correctAnswer: 1,
    explanation: 'Convert 5/8 to a decimal: 5 divided by 8 is 0.625. Since 0.625 is greater than 0.6, the fraction 5/8 is larger.',
  },

  // ---- Grade 6 Mathematics / Fractions ----
  {
    id: 'q-fr6-1', subjectId: 'mathematics', grade: 6, topicId: 'g6-math-fractions',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'lpsce',
    question: 'In the fraction 3/8, which number is the denominator?',
    options: ['3', '8', 'Both', 'Neither'],
    correctAnswer: 1,
    explanation: 'The denominator is the bottom number. It tells you how many equal parts the whole was cut into - here, 8.',
  },
  {
    id: 'q-fr6-2', subjectId: 'mathematics', grade: 6, topicId: 'g6-math-fractions',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'lpsce',
    question: 'Which fraction is larger: 5/8 or 3/8?',
    options: ['5/8', '3/8', 'They are equal', 'It depends'],
    correctAnswer: 0,
    explanation: 'The denominators match, so the pieces are the same size. Five pieces is more than three, so 5/8 is larger.',
  },
  {
    id: 'q-fr6-3', subjectId: 'mathematics', grade: 6, topicId: 'g6-math-fractions',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'lpsce',
    question: 'A loaf is cut into 8 equal slices. You take 3. What fraction of the loaf is left?',
    options: ['3/8', '5/8', '8/3', '1/8'],
    correctAnswer: 1,
    explanation: 'Eight slices in total, three taken, so five remain. That is 5/8 of the loaf.',
  },

  // ---- Grade 8 General Science / Matter ----
  {
    id: 'q-mat-1', subjectId: 'general-science', grade: 8, topicId: 'g8-science-matter',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'ljhsce',
    question: 'In which state of matter are the particles packed closely in a fixed pattern?',
    options: ['Solid', 'Liquid', 'Gas', 'All three'],
    correctAnswer: 0,
    explanation: 'In a solid the particles hold fixed positions and can only vibrate. That is why a solid keeps its own shape.',
  },
  {
    id: 'q-mat-2', subjectId: 'general-science', grade: 8, topicId: 'g8-science-matter',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'ljhsce',
    question: 'Why does a gas fill its whole container?',
    options: [
      'Its particles are heavier than liquid particles',
      'Its particles are far apart and move freely in all directions',
      'Its particles are joined in a fixed pattern',
      'Gases have no particles',
    ],
    correctAnswer: 1,
    explanation: 'Gas particles are widely spaced and move quickly in every direction, so they spread out until they occupy the whole space available.',
  },
  {
    id: 'q-mat-3', subjectId: 'general-science', grade: 8, topicId: 'g8-science-matter',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Which state keeps its volume but takes the shape of its container?',
    options: ['Solid', 'Liquid', 'Gas', 'None of them'],
    correctAnswer: 1,
    explanation: 'Liquid particles stay close together, so the volume is fixed, but they slide past one another, so the shape changes to fit the container.',
  },

  // ---- Grade 8 English ----
  {
    id: 'q-eng-1', subjectId: 'english', grade: 8, topicId: 'g8-english-speech',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'ljhsce',
    question: 'In "The clever student answered quickly", which word is the adjective?',
    options: ['student', 'answered', 'clever', 'quickly'],
    correctAnswer: 2,
    explanation: 'An adjective describes a noun. "Clever" describes the student, so it is the adjective. "Quickly" describes the verb, which makes it an adverb.',
  },
  {
    id: 'q-eng-2', subjectId: 'english', grade: 8, topicId: 'g8-english-speech',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'ljhsce',
    question: 'Identify the verb in "The farmer harvested the rice before the rain."',
    options: ['farmer', 'harvested', 'rice', 'rain'],
    correctAnswer: 1,
    explanation: 'The verb tells you what is being done. The farmer harvested - that action is the verb.',
  },

  // ---- Grade 10 Biology / Cells ----
  {
    id: 'q-cell-1', subjectId: 'biology', grade: 10, topicId: 'g10-bio-cells',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'wassce',
    question: 'Which organelle controls the activities of the cell?',
    options: ['Mitochondrion', 'Nucleus', 'Cell membrane', 'Vacuole'],
    correctAnswer: 1,
    explanation: 'The nucleus holds the genetic information and directs the cell’s activities.',
  },
  {
    id: 'q-cell-2', subjectId: 'biology', grade: 10, topicId: 'g10-bio-cells',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'Which THREE structures are found in plant cells but not animal cells?',
    options: [
      'Nucleus, cytoplasm, membrane',
      'Cell wall, chloroplast, permanent vacuole',
      'Mitochondria, ribosomes, nucleus',
      'Chloroplast, nucleus, mitochondria',
    ],
    correctAnswer: 1,
    explanation: 'Plant cells have a cellulose cell wall, chloroplasts for photosynthesis, and a large permanent vacuole. Animal cells have none of these three.',
  },
  {
    id: 'q-cell-3', subjectId: 'biology', grade: 10, topicId: 'g10-bio-cells',
    difficulty: 'challenge', provenance: 'liblearn', examGoal: 'wassce',
    question: 'Muscle cells contain unusually large numbers of mitochondria. Why?',
    options: [
      'They need to store more genetic material',
      'They require a great deal of energy to contract',
      'They carry out photosynthesis',
      'They must keep their shape rigid',
    ],
    correctAnswer: 1,
    explanation: 'Mitochondria release energy through respiration. Contracting a muscle demands much energy, so muscle cells carry many of them.',
  },
];

const BASE_QUIZZES: Quiz[] = [
  {
    // One quiz per lesson. This used to be a single "Algebra Check" on lesson 2
    // that also asked about coefficients (lesson 1) and expanding brackets
    // (lesson 3), assessing students on two things that lesson had not taught.
    id: 'quiz-g8-algebra-l1', topicId: 'g8-math-algebra', subjectId: 'mathematics', grade: 8,
    title: 'Variables and Expressions Check', lessonId: 'g8-math-algebra-l1',
    questionIds: ['q-alg-1', 'q-alg-6'],
  },
  {
    id: 'quiz-g8-algebra', topicId: 'g8-math-algebra', subjectId: 'mathematics', grade: 8,
    title: 'Solving Equations Check', lessonId: 'g8-math-algebra-l2',
    questionIds: ['q-alg-2', 'q-alg-3', 'q-alg-7'],
  },
  {
    id: 'quiz-g8-algebra-l3', topicId: 'g8-math-algebra', subjectId: 'mathematics', grade: 8,
    title: 'Equations with Brackets Check', lessonId: 'g8-math-algebra-l3',
    questionIds: ['q-alg-4', 'q-alg-5'],
  },
  {
    id: 'quiz-g8-fractions', topicId: 'g8-math-fractions', subjectId: 'mathematics', grade: 8,
    title: 'Fractions & Decimals Check', lessonId: 'g8-math-fractions-l1',
    questionIds: ['q-fr8-1', 'q-fr8-2', 'q-fr8-3'],
  },
  {
    id: 'quiz-g6-fractions', topicId: 'g6-math-fractions', subjectId: 'mathematics', grade: 6,
    title: 'Fractions Check', lessonId: 'g6-math-fractions-l1',
    questionIds: ['q-fr6-1', 'q-fr6-2', 'q-fr6-3'],
  },
  {
    id: 'quiz-g8-matter', topicId: 'g8-science-matter', subjectId: 'general-science', grade: 8,
    title: 'States of Matter Check', lessonId: 'g8-science-matter-l1',
    questionIds: ['q-mat-1', 'q-mat-2', 'q-mat-3'],
  },
  {
    id: 'quiz-g8-english', topicId: 'g8-english-speech', subjectId: 'english', grade: 8,
    title: 'Parts of Speech Check', lessonId: 'g8-english-speech-l1',
    questionIds: ['q-eng-1', 'q-eng-2'],
  },
  {
    id: 'quiz-g10-cells', topicId: 'g10-bio-cells', subjectId: 'biology', grade: 10,
    title: 'Cell Biology Check', lessonId: 'g10-bio-cells-l1',
    questionIds: ['q-cell-1', 'q-cell-2', 'q-cell-3'],
  },
];

const ALL_QUESTIONS: Question[] = [
  ...BASE_QUESTIONS,
  ...LOWER_PRIMARY_QUESTIONS,
  ...GRADE4_QUESTIONS,
  ...OTHER_GRADE_QUESTIONS,
  ...GRADE11_QUESTIONS,
];

/**
 * Questions carry their trace back to the Note that supports them.
 *
 * Applied here rather than written into each question file so that the trace is
 * maintained in ONE place and a new question cannot quietly ship without one:
 * anything missing from QUESTION_ALIGNMENT arrives with no lessonId and is
 * reported by the validator as NEEDS_VERIFICATION.
 */
export const QUESTIONS: Question[] = ALL_QUESTIONS.map((q) => {
  const a = QUESTION_ALIGNMENT[q.id];
  if (!a) return q;
  return {
    ...q,
    lessonId: a.lessonId,
    noteSection: a.noteSection ?? undefined,
    objectiveId: a.objectiveId ?? undefined,
  };
});
export const QUIZZES: Quiz[] = [
  ...BASE_QUIZZES,
  ...LOWER_PRIMARY_QUIZZES,
  ...GRADE4_QUIZZES,
  ...OTHER_GRADE_QUIZZES,
  ...GRADE11_QUIZZES,
];

export const questionById = (id: string): Question | undefined =>
  QUESTIONS.find((q) => q.id === id);

export const quizById = (id: string): Quiz | undefined =>
  QUIZZES.find((q) => q.id === id);

export const quizForLesson = (lessonId: string): Quiz | undefined =>
  QUIZZES.find((q) => q.lessonId === lessonId);

/** Public shape of a question during an active attempt - correctAnswer removed. */
export type MaskedQuestion = Omit<Question, 'correctAnswer' | 'explanation'>;

export const maskQuestion = (q: Question): MaskedQuestion => {
  const {correctAnswer: _c, explanation: _e, ...rest} = q;
  return rest;
};
