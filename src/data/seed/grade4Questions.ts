import type {Question, Quiz} from '../../types/domain';

/**
 * GRADE 4 QUESTION BANK — provenance `liblearn`.
 *
 * Written for nine and ten year olds, which changes the explanations more than
 * the questions. A primary-age reader who gets one wrong needs to be told what
 * they probably did, in words they can follow, not given a restatement of the
 * rule they just failed to apply.
 *
 * Distractors are the real mistakes children make - reading a digit's face
 * value instead of its place value, adding when the question says multiply,
 * calling a river alive because it moves. A wrong option nobody would pick
 * teaches nothing.
 *
 * `examGoal` is deliberately absent on every question here. LPSCE is a primary
 * examination, but LibLearn holds no verified LPSCE syllabus, so tagging these
 * to it would imply a link nobody has checked.
 */
export const GRADE4_QUESTIONS: Question[] = [
  /* --------------------------------------- Mathematics — place value --- */
  {
    id: 'q4-pv-1', subjectId: 'mathematics', grade: 4, topicId: 'g4-math-place-value',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'In the number 4700, what is the 7 worth?',
    options: ['7', '70', '700', '7000'],
    correctAnswer: 2,
    explanation:
      'The 7 sits in the hundreds place, so it is worth 7 hundreds, which is 700. If you chose 7, you read the digit on its own instead of looking at where it sits. Where a digit sits is what gives it its value.',
  },
  {
    id: 'q4-pv-2', subjectId: 'mathematics', grade: 4, topicId: 'g4-math-place-value',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Which of these is 2605 written in expanded form?',
    options: ['2000 + 600 + 5', '200 + 60 + 5', '2000 + 600 + 50', '26 + 05'],
    correctAnswer: 0,
    explanation:
      '2605 has 2 thousands, 6 hundreds, 0 tens and 5 ones, so it is 2000 + 600 + 0 + 5, which we write as 2000 + 600 + 5. The zero adds nothing, but it still holds the tens place open — without it in the original number you would have 265, which is far smaller.',
  },
  {
    id: 'q4-pv-3', subjectId: 'mathematics', grade: 4, topicId: 'g4-math-place-value',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Which number is bigger: 3990 or 3909?',
    options: ['3990', '3909', 'They are equal', 'You cannot tell'],
    correctAnswer: 0,
    explanation:
      'Compare from the left, one place at a time. Thousands: 3 and 3, the same. Hundreds: 9 and 9, the same. Tens: 9 and 0 — different, and 9 is bigger. So 3990 is bigger. Once you find a difference you can stop; the ones place cannot change the answer.',
  },

  /* ------------------------------------ Mathematics — multiplication --- */
  {
    id: 'q4-mul-1', subjectId: 'mathematics', grade: 4, topicId: 'g4-math-multiplication',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which multiplication sentence means the same as 7 + 7 + 7 + 7?',
    options: ['7 × 7', '4 × 7', '7 + 4', '4 + 7'],
    correctAnswer: 1,
    explanation:
      'There are four 7s being added, so it is 4 groups of 7, written 4 × 7 = 28. Choosing 7 × 7 counts seven groups, but only four are written down. Count how many times the number appears — that is the first number.',
  },
  {
    id: 'q4-mul-2', subjectId: 'mathematics', grade: 4, topicId: 'g4-math-multiplication',
    difficulty: 'core', provenance: 'liblearn',
    question: 'There are 8 desks. Each desk has 2 pupils. How many pupils altogether?',
    options: ['10', '16', '6', '82'],
    correctAnswer: 1,
    explanation:
      '8 groups of 2 is 8 × 2 = 16 pupils. Choosing 10 means you added 8 + 2 instead of multiplying. The words "each desk has" tell you the groups are equal, and equal groups mean multiply.',
  },
  {
    id: 'q4-mul-3', subjectId: 'mathematics', grade: 4, topicId: 'g4-math-multiplication',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'You know that 6 × 5 = 30. Without working it out, what is 5 × 6?',
    options: ['11', '30', '36', 'You must work it out'],
    correctAnswer: 1,
    explanation:
      'It is 30. Order does not change the answer in multiplication. Picture 6 rows of 5 dots, then turn the paper sideways — it becomes 5 rows of 6, and no dots were added or taken away. This is useful: every fact you learn gives you a second one free.',
  },

  /* ------------------------------------------ English — nouns & verbs -- */
  {
    id: 'q4-nv-1', subjectId: 'english', grade: 4, topicId: 'g4-eng-nouns-verbs',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'In the sentence "The goat eats grass", which word is the verb?',
    options: ['goat', 'eats', 'grass', 'The'],
    correctAnswer: 1,
    explanation:
      '"Eats" tells you what the goat does, so it is the verb. "Goat" and "grass" are both nouns — they name an animal and a thing. Try the test: "she eats" sounds right, but "she goat" does not.',
  },
  {
    id: 'q4-nv-2', subjectId: 'english', grade: 4, topicId: 'g4-eng-nouns-verbs',
    difficulty: 'core', provenance: 'liblearn',
    question: 'How many nouns are in "My sister sweeps the yard"?',
    options: ['One', 'Two', 'Three', 'None'],
    correctAnswer: 1,
    explanation:
      'Two: "sister" names a person and "yard" names a place. "Sweeps" is the verb, and "my" and "the" are neither. Check each word with the test — "the sister" and "the yard" both sound right, but "the sweeps" does not.',
  },
  {
    id: 'q4-nv-3', subjectId: 'english', grade: 4, topicId: 'g4-eng-nouns-verbs',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'In "Bring me a drink", what job does the word "drink" do?',
    options: ['It is a verb', 'It is a noun', 'It is both at once', 'It is neither'],
    correctAnswer: 1,
    explanation:
      'Here "drink" names a thing you can bring, so it is a noun — notice "a drink" sounds right. In "I drink water" the same word is a verb, because there it tells the action. Always check the job the word does in that particular sentence.',
  },

  /* --------------------------------------------- English — sentences --- */
  {
    id: 'q4-sen-1', subjectId: 'english', grade: 4, topicId: 'g4-eng-sentences',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which of these is a complete sentence?',
    options: ['Walking down the road.', 'The market is busy.', 'My brother.', 'When the sun set.'],
    correctAnswer: 1,
    explanation:
      '"The market is busy" has a subject (the market) and a verb (is), and nothing is left hanging. The others leave you waiting: walking — who? my brother — did what? when the sun set — then what happened?',
  },
  {
    id: 'q4-sen-2', subjectId: 'english', grade: 4, topicId: 'g4-eng-sentences',
    difficulty: 'core', provenance: 'liblearn',
    question: 'What is missing from "Sings every morning"?',
    options: ['A verb', 'A subject', 'A full stop only', 'Nothing is missing'],
    correctAnswer: 1,
    explanation:
      'It has a verb — "sings" — but never says WHO sings, so the subject is missing. Add one and it is finished: "My mother sings every morning." Ask "who or what?" and if there is no answer, the subject is what is missing.',
  },

  /* ------------------------------------- Science — living things ------- */
  {
    id: 'q4-liv-1', subjectId: 'general-science', grade: 4, topicId: 'g4-sci-living',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which of these is a living thing?',
    options: ['A stone', 'A mango tree', 'A bicycle', 'A cloud'],
    correctAnswer: 1,
    explanation:
      'A mango tree grows, takes in water, breathes and makes seeds, so it does everything on the list. The others do none of it. A cloud changes shape and moves, but changing is not the same as growing.',
  },
  {
    id: 'q4-liv-2', subjectId: 'general-science', grade: 4, topicId: 'g4-sci-living',
    difficulty: 'core', provenance: 'liblearn',
    question: 'A river moves and never stops. Why is it still not a living thing?',
    options: [
      'Because it is made of water',
      'Because it does not grow, feed or make young',
      'Because it is cold',
      'Because it is outside',
    ],
    correctAnswer: 1,
    explanation:
      'Moving is only one sign out of six. A river never grows, never feeds and never makes young rivers, so it fails almost the whole list. This is the mistake to avoid: check every sign, not just movement.',
  },
  {
    id: 'q4-liv-3', subjectId: 'general-science', grade: 4, topicId: 'g4-sci-living',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'Is a wooden chair a living thing?',
    options: [
      'Yes, because wood comes from a tree',
      'No, because it does not do any of the things living things do',
      'Yes, because it can last many years',
      'Only when it is new',
    ],
    correctAnswer: 1,
    explanation:
      'The chair came from a tree that WAS alive, but the chair itself does not grow, feed or breathe now. What matters is what the thing does today, not where it came from. Leather shoes and dried rice are the same — once part of something living, not living now.',
  },

  /* ----------------------------------------------- Science — plants ---- */
  {
    id: 'q4-pl-1', subjectId: 'general-science', grade: 4, topicId: 'g4-sci-plants',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which part of a plant takes in water from the soil?',
    options: ['The leaves', 'The flower', 'The roots', 'The stem'],
    correctAnswer: 2,
    explanation:
      'The roots are under the ground, where the water is. They also grip the soil so the plant does not fall over. The stem carries that water upward, but it does not collect it.',
  },
  {
    id: 'q4-pl-2', subjectId: 'general-science', grade: 4, topicId: 'g4-sci-plants',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Where does a plant make its food?',
    options: ['In the roots', 'In the leaves', 'In the soil', 'In the flower'],
    correctAnswer: 1,
    explanation:
      'The leaves make the food, using sunlight. Plants do not take food from the soil — they take WATER from the soil and make food themselves. Mixing up water and food is the most common mistake in this topic.',
  },
  {
    id: 'q4-pl-3', subjectId: 'general-science', grade: 4, topicId: 'g4-sci-plants',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'A plant is watered every day but kept in a dark room. Why does it still die?',
    options: [
      'The roots stop working',
      'The leaves cannot make food without sunlight',
      'It gets too much water',
      'The stem breaks',
    ],
    correctAnswer: 1,
    explanation:
      'The roots and stem are working perfectly — water is coming in and going up. But leaves need sunlight to make food, and in the dark they cannot. The plant starves while standing in wet soil, because water and food are not the same thing.',
  },

  /* ------------------------------------------ Social Studies — maps ---- */
  {
    id: 'q4-map-1', subjectId: 'social-studies', grade: 4, topicId: 'g4-soc-maps',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'What does the key on a map tell you?',
    options: [
      'How far away places are',
      'What each symbol on the map means',
      'Who drew the map',
      'The name of the country',
    ],
    correctAnswer: 1,
    explanation:
      'The key explains the symbols, so you know a triangle means a school and a wavy line means a river. Read it first — the same symbol can mean different things on different maps, so guessing is unreliable even when it feels obvious.',
  },
  {
    id: 'q4-map-2', subjectId: 'social-studies', grade: 4, topicId: 'g4-soc-maps',
    difficulty: 'core', provenance: 'liblearn',
    question: 'On most maps, which direction is at the top?',
    options: ['South', 'East', 'North', 'West'],
    correctAnswer: 2,
    explanation:
      'North is at the top on almost every map. Once you know that, the rest follow going clockwise: North, East, South, West — "Never Eat Sour Worms".',
  },
  {
    id: 'q4-map-3', subjectId: 'social-studies', grade: 4, topicId: 'g4-soc-maps',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'The clinic is north-east of the market. Where is the market compared to the clinic?',
    options: [
      'Also north-east',
      'South-west',
      'North-west',
      'You cannot tell',
    ],
    correctAnswer: 1,
    explanation:
      'South-west — the exact opposite. Direction always depends on where you start from. If you walked north-east to get from the market to the clinic, you must walk south-west to come back. This is why we say "north of the market" rather than just "north".',
  },
];

/** One quiz per lesson, so no Grade 4 lesson ends in a dead end. */
export const GRADE4_QUIZZES: Quiz[] = [
  {
    id: 'quiz-g4-place-value', topicId: 'g4-math-place-value', subjectId: 'mathematics', grade: 4,
    title: 'Place Value Check', lessonId: 'g4-math-place-value-l1',
    questionIds: ['q4-pv-1', 'q4-pv-2', 'q4-pv-3'],
  },
  {
    id: 'quiz-g4-multiplication', topicId: 'g4-math-multiplication', subjectId: 'mathematics', grade: 4,
    title: 'Multiplication Check', lessonId: 'g4-math-multiplication-l1',
    questionIds: ['q4-mul-1', 'q4-mul-2', 'q4-mul-3'],
  },
  {
    id: 'quiz-g4-nouns-verbs', topicId: 'g4-eng-nouns-verbs', subjectId: 'english', grade: 4,
    title: 'Nouns and Verbs Check', lessonId: 'g4-eng-nouns-verbs-l1',
    questionIds: ['q4-nv-1', 'q4-nv-2', 'q4-nv-3'],
  },
  {
    id: 'quiz-g4-sentences', topicId: 'g4-eng-sentences', subjectId: 'english', grade: 4,
    title: 'Complete Sentences Check', lessonId: 'g4-eng-sentences-l1',
    questionIds: ['q4-sen-1', 'q4-sen-2'],
  },
  {
    id: 'quiz-g4-living', topicId: 'g4-sci-living', subjectId: 'general-science', grade: 4,
    title: 'Living Things Check', lessonId: 'g4-sci-living-l1',
    questionIds: ['q4-liv-1', 'q4-liv-2', 'q4-liv-3'],
  },
  {
    id: 'quiz-g4-plants', topicId: 'g4-sci-plants', subjectId: 'general-science', grade: 4,
    title: 'Parts of a Plant Check', lessonId: 'g4-sci-plants-l1',
    questionIds: ['q4-pl-1', 'q4-pl-2', 'q4-pl-3'],
  },
  {
    id: 'quiz-g4-maps', topicId: 'g4-soc-maps', subjectId: 'social-studies', grade: 4,
    title: 'Reading a Map Check', lessonId: 'g4-soc-maps-l1',
    questionIds: ['q4-map-1', 'q4-map-2', 'q4-map-3'],
  },
];
