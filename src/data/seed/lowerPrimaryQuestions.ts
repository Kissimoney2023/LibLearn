import type {Question, Quiz} from '../../types/domain';

/**
 * GRADES 1-3 QUESTION BANK — provenance `liblearn`.
 *
 * The questions are short because the readers are six to nine years old and
 * many are still decoding the question itself. A question a child cannot read
 * tests reading, not the thing it was meant to test.
 *
 * The explanations do most of the work here. A young child who gets one wrong
 * needs to be told WHAT THEY PROBABLY DID, in words they can follow - not a
 * restatement of the rule they have just failed to apply. So each explanation
 * names the likely mistake first, then shows the right way.
 *
 * The distractors are the real errors children make at this age:
 *   - adding when the question describes equal groups (3 + 4 instead of 3 x 4)
 *   - calling two unequal pieces "halves"
 *   - reading a digit's face value instead of its place value
 *   - choosing the body part rather than the sense, or the reverse
 * A wrong option nobody would ever pick teaches nothing.
 *
 * `examGoal` is absent on every question here, deliberately. LPSCE is a real
 * primary examination, but LibLearn holds no verified LPSCE syllabus, so
 * tagging these to it would imply a link nobody has checked.
 */
export const LOWER_PRIMARY_QUESTIONS: Question[] = [
  /* ======================================================== GRADE 1 ===== */
  /* --------------------------------------- Mathematics — counting ------ */
  {
    id: 'q1-cnt-1', subjectId: 'mathematics', grade: 1, topicId: 'g1-math-counting',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'You count some stones: 1, 2, 3, 4, 5, 6. How many stones are there?',
    options: ['1', '5', '6', '7'],
    correctAnswer: 2,
    explanation:
      'The last number you say is how many there are. You stopped at 6, so there are 6 stones. If you chose 1, that was the first number, not the last one.',
  },
  {
    id: 'q1-cnt-2', subjectId: 'mathematics', grade: 1, topicId: 'g1-math-counting',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which number is more, 8 or 5?',
    options: ['5', '8', 'They are the same', 'You cannot tell'],
    correctAnswer: 1,
    explanation:
      'Count up: 5, 6, 7, 8. You say 8 after 5, so 8 comes later. The number that comes later when you count is the bigger one. So 8 is more.',
  },
  {
    id: 'q1-cnt-3', subjectId: 'mathematics', grade: 1, topicId: 'g1-math-counting',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'How many fingers are on two hands?',
    options: ['5', '9', '10', '20'],
    correctAnswer: 2,
    explanation:
      'One hand has 5 fingers. Two hands is 5 and 5 more. Count on from 5: 6, 7, 8, 9, 10. So there are 10. If you chose 5, that was only one hand.',
  },

  /* --------------------------------------- English — letter sounds ----- */
  {
    id: 'q1-snd-1', subjectId: 'english', grade: 1, topicId: 'g1-eng-letter-sounds',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Say the word "map" slowly. What sound do you hear FIRST?',
    options: ['p', 'a', 'm', 't'],
    correctAnswer: 2,
    explanation:
      'Stretch the beginning: mmmmap. The first sound is mmm, which is the letter m. If you chose p, that is the sound at the END of the word, not the beginning.',
  },
  {
    id: 'q1-snd-2', subjectId: 'english', grade: 1, topicId: 'g1-eng-letter-sounds',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Join these sounds together: s ... i ... t. What is the word?',
    options: ['sat', 'sit', 'its', 'sip'],
    correctAnswer: 1,
    explanation:
      'Say them faster and faster: s-i-t, sit. Keep the sounds in the order they are given. "its" has the same letters but in a different order, so it is a different word.',
  },
  {
    id: 'q1-snd-3', subjectId: 'english', grade: 1, topicId: 'g1-eng-letter-sounds',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which word begins with the same sound as "sun"?',
    options: ['ten', 'sit', 'cup', 'man'],
    correctAnswer: 1,
    explanation:
      'Sun begins with sss. Say each choice slowly. Sit also begins with sss. Ten begins with t, cup with c, man with m. Only sit matches.',
  },

  /* --------------------------------------- Science — five senses ------- */
  {
    id: 'q1-sen-1', subjectId: 'general-science', grade: 1, topicId: 'g1-sci-senses',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which body part do you use to hear?',
    options: ['Eyes', 'Nose', 'Ears', 'Tongue'],
    correctAnswer: 2,
    explanation:
      'You hear with your ears. Eyes are for seeing, the nose is for smelling and the tongue is for tasting. Touch your ears and say "I hear with my ears".',
  },
  {
    id: 'q1-sen-2', subjectId: 'general-science', grade: 1, topicId: 'g1-sci-senses',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Someone is cooking rice in the next room. Which sense tells you?',
    options: ['Sight', 'Smell', 'Taste', 'Hearing'],
    correctAnswer: 1,
    explanation:
      'You cannot see it, because it is in another room. You have not eaten it, so it is not taste. You SMELL it with your nose. Smell can reach you from far away.',
  },
  {
    id: 'q1-sen-3', subjectId: 'general-science', grade: 1, topicId: 'g1-sci-senses',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'How many senses do you have?',
    options: ['Two', 'Three', 'Five', 'Ten'],
    correctAnswer: 2,
    explanation:
      'There are five: seeing, hearing, smelling, tasting and touching. Count them on your fingers — eyes, ears, nose, tongue, skin. Five parts, five senses.',
  },

  /* --------------------------------------- Social Studies — family ----- */
  {
    id: 'q1-fam-1', subjectId: 'social-studies', grade: 1, topicId: 'g1-soc-family',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which of these is a family?',
    options: [
      'Only a mother, a father and their children',
      'Any people who care for each other and live together',
      'Only people who have the same job',
      'Only families with many children',
    ],
    correctAnswer: 1,
    explanation:
      'Families come in many shapes. Some children live with one parent, some with a grandmother, some with an aunt. All of these are families. A family is the people who care for you.',
  },
  {
    id: 'q1-fam-2', subjectId: 'social-studies', grade: 1, topicId: 'g1-soc-family',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Why do people in a home share the work?',
    options: [
      'So one person does not have to do everything',
      'Because work is not important',
      'So the children never help',
      'Because everyone likes sweeping',
    ],
    correctAnswer: 0,
    explanation:
      'There is a lot to do every day — water, cooking, washing, sweeping. If one person did all of it they would be very tired, and some jobs would not get done. Sharing means everyone does a part.',
  },

  /* ======================================================== GRADE 2 ===== */
  /* --------------------------------------- Mathematics — tens and ones - */
  {
    id: 'q2-to-1', subjectId: 'mathematics', grade: 2, topicId: 'g2-math-tens-ones',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'How many tens are in the number 47?',
    options: ['7 tens', '4 tens', '47 tens', '11 tens'],
    correctAnswer: 1,
    explanation:
      'The figure on the LEFT counts the bundles of ten. In 47 that is the 4, so there are 4 tens. If you chose 7, you looked at the ones instead — the 7 counts the loose ones.',
  },
  {
    id: 'q2-to-2', subjectId: 'mathematics', grade: 2, topicId: 'g2-math-tens-ones',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'I have 6 bundles of ten and 3 loose seeds. What number do I have?',
    options: ['36', '63', '9', '630'],
    correctAnswer: 1,
    explanation:
      'The tens go on the left and the ones on the right. 6 tens and 3 ones is written 63. If you chose 36, you swapped them round — that would be 3 tens and 6 ones, a much smaller number.',
  },
  {
    id: 'q2-to-3', subjectId: 'mathematics', grade: 2, topicId: 'g2-math-tens-ones',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Which number is bigger, 52 or 49?',
    options: ['49', '52', 'They are the same', 'You need to count them all'],
    correctAnswer: 1,
    explanation:
      'Look at the tens first. 52 has 5 tens and 49 has 4 tens. 5 bundles is more than 4 bundles, so 52 is bigger. You did not even need to look at the ones. The 9 in 49 is bigger than the 2, but ones only matter when the tens are the same.',
  },

  /* --------------------------------------- Mathematics — addition ------ */
  {
    id: 'q2-add-1', subjectId: 'mathematics', grade: 2, topicId: 'g2-math-addition',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'What is 23 + 45?',
    options: ['68', '58', '78', '18'],
    correctAnswer: 0,
    explanation:
      'Add the tens: 2 + 4 = 6 tens, which is 60. Add the ones: 3 + 5 = 8. Put them together: 60 + 8 = 68.',
  },
  {
    id: 'q2-add-2', subjectId: 'mathematics', grade: 2, topicId: 'g2-math-addition',
    difficulty: 'core', provenance: 'liblearn',
    question: 'What is 28 + 15?',
    options: ['33', '43', '313', '45'],
    correctAnswer: 1,
    explanation:
      'The ones make more than ten here. Tens: 2 + 1 = 3 tens (30). Ones: 8 + 5 = 13, which is 1 more ten and 3 ones. So 30 + 10 = 40, plus 3 = 43. If you chose 313, you wrote the tens and the ones side by side instead of trading.',
  },
  {
    id: 'q2-add-3', subjectId: 'mathematics', grade: 2, topicId: 'g2-math-addition',
    difficulty: 'core', provenance: 'liblearn',
    question: 'A trader sells 31 oranges in the morning and 26 in the afternoon. How many altogether?',
    options: ['57', '47', '67', '5'],
    correctAnswer: 0,
    explanation:
      'Tens: 3 + 2 = 5 tens (50). Ones: 1 + 6 = 7. Together that is 57. Check it is sensible: about 30 plus about 26 should be a bit under 60, and 57 is.',
  },

  /* --------------------------------------- English — sentences --------- */
  {
    id: 'q2-sen-1', subjectId: 'english', grade: 2, topicId: 'g2-eng-sentences',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which one is a complete sentence?',
    options: ['under the big tree', 'The baby cried.', 'My three goats', 'running very fast'],
    correctAnswer: 1,
    explanation:
      'A sentence needs a WHO and a WHAT THEY DID. "The baby cried." has both — the baby, and what the baby did. The others leave you waiting: "My three goats" tells you who but never says what they did.',
  },
  {
    id: 'q2-sen-2', subjectId: 'english', grade: 2, topicId: 'g2-eng-sentences',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'What is missing from this: "ran to the river"?',
    options: ['The doing word', 'The who', 'Nothing is missing', 'The capital letter only'],
    correctAnswer: 1,
    explanation:
      'You know what happened — running. But WHO ran? A boy? A goat? The who is missing. Add it and you have a sentence: "The boy ran to the river."',
  },
  {
    id: 'q2-sen-3', subjectId: 'english', grade: 2, topicId: 'g2-eng-sentences',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'How should you write this properly:  the sun is hot',
    options: ['the sun is hot', 'The sun is hot', 'The sun is hot.', 'the Sun is hot.'],
    correctAnswer: 2,
    explanation:
      'A sentence needs BOTH things: a capital letter at the start and a full stop at the end. "The sun is hot" has the capital but no full stop, so it is not finished.',
  },

  /* --------------------------------------- Science — living needs ------ */
  {
    id: 'q2-liv-1', subjectId: 'general-science', grade: 2, topicId: 'g2-sci-living-needs',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which three things does every living thing need?',
    options: [
      'Food, water and air',
      'Food, money and shoes',
      'Water, sand and stones',
      'Air, sunlight and salt',
    ],
    correctAnswer: 0,
    explanation:
      'Every living thing — a goat, a mango tree, you — needs food, water and air. A stone needs none of these, because a stone is not alive.',
  },
  {
    id: 'q2-liv-2', subjectId: 'general-science', grade: 2, topicId: 'g2-sci-living-needs',
    difficulty: 'core', provenance: 'liblearn',
    question: 'A plant is watered every day but kept in a dark cupboard. What will happen?',
    options: [
      'It will grow well, because it has water',
      'It will turn pale and die, because it cannot make food',
      'Nothing will change at all',
      'It will grow faster than in the sun',
    ],
    correctAnswer: 1,
    explanation:
      'Water is not the only need. A plant makes its own food using SUNLIGHT. In the dark it cannot make food, so it grows pale and weak and dies — even though it has water and air.',
  },
  {
    id: 'q2-liv-3', subjectId: 'general-science', grade: 2, topicId: 'g2-sci-living-needs',
    difficulty: 'core', provenance: 'liblearn',
    question: 'What is the main difference between how a goat and a mango tree get food?',
    options: [
      'The goat makes its own food; the tree finds it',
      'The goat finds its food; the tree makes its own',
      'Neither of them needs food',
      'They both make their own food',
    ],
    correctAnswer: 1,
    explanation:
      'An animal has to go and find food — a goat eats grass. A plant cannot go anywhere, so it makes its own food in its leaves, using sunlight, water and air.',
  },

  /* --------------------------------------- Social Studies — helpers ---- */
  {
    id: 'q2-hlp-1', subjectId: 'social-studies', grade: 2, topicId: 'g2-soc-helpers',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Whose work grows the food that people eat?',
    options: ['A driver', 'A farmer', 'A builder', 'A teacher'],
    correctAnswer: 1,
    explanation:
      'A farmer grows the food. The driver may carry it and the shopkeeper may sell it, but it starts with the farmer growing it.',
  },
  {
    id: 'q2-hlp-2', subjectId: 'social-studies', grade: 2, topicId: 'g2-soc-helpers',
    difficulty: 'core', provenance: 'liblearn',
    question: 'What does it mean to say people in a community depend on each other?',
    options: [
      'Everyone does exactly the same job',
      'Nobody needs help from anyone',
      'Each person does one thing well and needs others for the rest',
      'Only some people are allowed to work',
    ],
    correctAnswer: 2,
    explanation:
      'Nobody can do everything. A nurse cannot also grow all her own food, and a farmer cannot treat his own illness. Each does one thing well and relies on others for the rest. That is what a community is.',
  },

  /* ======================================================== GRADE 3 ===== */
  /* --------------------------------------- Mathematics — equal groups -- */
  {
    id: 'q3-mul-1', subjectId: 'mathematics', grade: 3, topicId: 'g3-math-multiplication',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'There are 5 bags. Each bag has 3 oranges. How many oranges altogether?',
    options: ['8', '15', '53', '2'],
    correctAnswer: 1,
    explanation:
      'These are equal groups — every bag has the same number. So multiply: 5 groups of 3 is 5 x 3 = 15. If you chose 8, you added 5 + 3 instead. Adding would only be right if the bags held different amounts.',
  },
  {
    id: 'q3-mul-2', subjectId: 'mathematics', grade: 3, topicId: 'g3-math-multiplication',
    difficulty: 'core', provenance: 'liblearn',
    question: 'A farmer plants 6 rows of maize with 8 plants in each row. How many plants?',
    options: ['14', '48', '68', '2'],
    correctAnswer: 1,
    explanation:
      'Every row has the same number, so these are equal groups: 6 x 8 = 48. If you chose 14, you added 6 + 8. Look for the words "each row" — they tell you the groups are equal, so you multiply.',
  },
  {
    id: 'q3-mul-3', subjectId: 'mathematics', grade: 3, topicId: 'g3-math-multiplication',
    difficulty: 'core', provenance: 'liblearn',
    question: 'If 8 x 3 = 24, what is 3 x 8?',
    options: ['11', '24', '38', 'You must work it out again'],
    correctAnswer: 1,
    explanation:
      'It is 24 as well. Turning a multiplication around does not change the answer — 3 rows of 8 has exactly the same number of things as 8 rows of 3, just turned. This is worth remembering, because one way round is often easier to work out.',
  },

  /* --------------------------------------- Mathematics — fractions ----- */
  {
    id: 'q3-fr-1', subjectId: 'mathematics', grade: 3, topicId: 'g3-math-fractions',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'A bread is cut into 2 pieces, but one piece is much bigger. Are these halves?',
    options: [
      'Yes, because there are 2 pieces',
      'No, because halves must be equal in size',
      'Yes, because all cuts make halves',
      'Only the big piece is a half',
    ],
    correctAnswer: 1,
    explanation:
      'Cutting into two pieces is not enough. For them to be halves, the two pieces must be exactly the SAME SIZE. This is the mistake nearly everyone makes at first, so it is worth saying to yourself every time: two EQUAL pieces.',
  },
  {
    id: 'q3-fr-2', subjectId: 'mathematics', grade: 3, topicId: 'g3-math-fractions',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'A cassava is cut into 4 equal parts. What is each part called?',
    options: ['A half', 'A third', 'A quarter', 'A whole'],
    correctAnswer: 2,
    explanation:
      'Four equal parts means each one is a quarter, written 1/4. Two equal parts would be halves and three would be thirds. The number of equal parts gives the name.',
  },
  {
    id: 'q3-fr-3', subjectId: 'mathematics', grade: 3, topicId: 'g3-math-fractions',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Which is bigger, 1/2 or 1/4?',
    options: ['1/4, because 4 is bigger than 2', '1/2', 'They are the same', 'You cannot compare them'],
    correctAnswer: 1,
    explanation:
      'Think about sharing one mango. Between 2 people, the pieces are big. Between 4 people, the same mango gives smaller pieces. So 1/2 is bigger. The bottom number counts how many ways the whole was split, not how much you get — more parts means smaller parts.',
  },

  /* --------------------------------------- English — nouns and verbs --- */
  {
    id: 'q3-nv-1', subjectId: 'english', grade: 3, topicId: 'g3-eng-nouns-verbs',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'In "The dog barked loudly", which word is the verb?',
    options: ['dog', 'barked', 'loudly', 'The'],
    correctAnswer: 1,
    explanation:
      'The verb is the doing word — what is happening. The dog barked, so "barked" is the verb. "Dog" is a noun, a naming word. "Loudly" tells you HOW it barked, which is a different job again.',
  },
  {
    id: 'q3-nv-2', subjectId: 'english', grade: 3, topicId: 'g3-eng-nouns-verbs',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Is "market" a noun or a verb?',
    options: ['A verb', 'A noun', 'Both', 'Neither'],
    correctAnswer: 1,
    explanation:
      'Use the test. Can you say "the market"? Yes, that sounds right, so it is a noun — it names a place. Now try the verb test: "I market" does not sound right, so it is not a doing word.',
  },
  {
    id: 'q3-nv-3', subjectId: 'english', grade: 3, topicId: 'g3-eng-nouns-verbs',
    difficulty: 'core', provenance: 'liblearn',
    question: 'What is missing from this: "The big goat near the river."?',
    options: ['A noun', 'A verb', 'A capital letter', 'Nothing is missing'],
    correctAnswer: 1,
    explanation:
      'There are plenty of naming words — goat, river — but nothing is HAPPENING. The verb is missing, so the idea is not finished. Add one and it becomes a sentence: "The big goat drank near the river."',
  },

  /* --------------------------------------- Science — water cycle ------- */
  {
    id: 'q3-wat-1', subjectId: 'general-science', grade: 3, topicId: 'g3-sci-water-cycle',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'A puddle on a hard road dries up in the sun. Where did the water go?',
    options: [
      'It sank into the road',
      'It rose into the air as tiny pieces you cannot see',
      'It disappeared completely',
      'It turned into dust',
    ],
    correctAnswer: 1,
    explanation:
      'It went UP, not down — that is why a puddle on hard ground dries too. The sun warmed it and it evaporated into the air in pieces far too small to see. Nothing disappears; it just moves somewhere you cannot see it.',
  },
  {
    id: 'q3-wat-2', subjectId: 'general-science', grade: 3, topicId: 'g3-sci-water-cycle',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'What is a cloud made of?',
    options: ['Smoke', 'Cotton', 'Millions of tiny water drops', 'Dust from the ground'],
    correctAnswer: 2,
    explanation:
      'A cloud is millions of tiny drops of water floating high up. They formed when water that had risen met the cold air above and turned back into drops.',
  },
  {
    id: 'q3-wat-3', subjectId: 'general-science', grade: 3, topicId: 'g3-sci-water-cycle',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Why do the drops in a cloud eventually fall as rain?',
    options: [
      'The sun pushes them down',
      'They join together, get heavier, and become too heavy to float',
      'The wind makes new water',
      'Clouds run out of air',
    ],
    correctAnswer: 1,
    explanation:
      'The tiny drops bump into each other and join up. As they join they get bigger and heavier. When a drop is too heavy to float any longer, it falls — and that is rain.',
  },

  /* --------------------------------------- Social Studies — directions - */
  {
    id: 'q3-dir-1', subjectId: 'social-studies', grade: 3, topicId: 'g3-soc-directions',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'In which direction does the sun rise?',
    options: ['North', 'South', 'East', 'West'],
    correctAnswer: 2,
    explanation:
      'The sun rises in the east every morning and sets in the west every evening. This is why you can find your directions with nothing but the sun: face the rising sun and you are facing east.',
  },
  {
    id: 'q3-dir-2', subjectId: 'social-studies', grade: 3, topicId: 'g3-soc-directions',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'On a map, which direction is at the top?',
    options: ['North', 'South', 'East', 'West'],
    correctAnswer: 0,
    explanation:
      'North is drawn at the top of a map, south at the bottom, east on the right and west on the left. Knowing this lets you read any map the same way.',
  },
  {
    id: 'q3-dir-3', subjectId: 'social-studies', grade: 3, topicId: 'g3-soc-directions',
    difficulty: 'core', provenance: 'liblearn',
    question: 'You face the rising sun. Which direction is on your LEFT?',
    options: ['South', 'North', 'East', 'West'],
    correctAnswer: 1,
    explanation:
      'Facing the rising sun means facing east. When you face east, north is on your left, south is on your right and west is behind you. Try it outside one morning and you will remember it for good.',
  },
];

export const LOWER_PRIMARY_QUIZZES: Quiz[] = [
  /* Grade 1 */
  {
    id: 'quiz-g1-counting', topicId: 'g1-math-counting', subjectId: 'mathematics', grade: 1,
    title: 'Counting Check', lessonId: 'g1-math-counting-l1',
    questionIds: ['q1-cnt-1', 'q1-cnt-2', 'q1-cnt-3'],
  },
  {
    id: 'quiz-g1-sounds', topicId: 'g1-eng-letter-sounds', subjectId: 'english', grade: 1,
    title: 'Letter Sounds Check', lessonId: 'g1-eng-letter-sounds-l1',
    questionIds: ['q1-snd-1', 'q1-snd-2', 'q1-snd-3'],
  },
  {
    id: 'quiz-g1-senses', topicId: 'g1-sci-senses', subjectId: 'general-science', grade: 1,
    title: 'Five Senses Check', lessonId: 'g1-sci-senses-l1',
    questionIds: ['q1-sen-1', 'q1-sen-2', 'q1-sen-3'],
  },
  {
    id: 'quiz-g1-family', topicId: 'g1-soc-family', subjectId: 'social-studies', grade: 1,
    title: 'My Family Check', lessonId: 'g1-soc-family-l1',
    questionIds: ['q1-fam-1', 'q1-fam-2'],
  },

  /* Grade 2 */
  {
    id: 'quiz-g2-tens-ones', topicId: 'g2-math-tens-ones', subjectId: 'mathematics', grade: 2,
    title: 'Tens and Ones Check', lessonId: 'g2-math-tens-ones-l1',
    questionIds: ['q2-to-1', 'q2-to-2', 'q2-to-3'],
  },
  {
    id: 'quiz-g2-addition', topicId: 'g2-math-addition', subjectId: 'mathematics', grade: 2,
    title: 'Adding Check', lessonId: 'g2-math-addition-l1',
    questionIds: ['q2-add-1', 'q2-add-2', 'q2-add-3'],
  },
  {
    id: 'quiz-g2-sentences', topicId: 'g2-eng-sentences', subjectId: 'english', grade: 2,
    title: 'Sentences Check', lessonId: 'g2-eng-sentences-l1',
    questionIds: ['q2-sen-1', 'q2-sen-2', 'q2-sen-3'],
  },
  {
    id: 'quiz-g2-living', topicId: 'g2-sci-living-needs', subjectId: 'general-science', grade: 2,
    title: 'Living Things Check', lessonId: 'g2-sci-living-needs-l1',
    questionIds: ['q2-liv-1', 'q2-liv-2', 'q2-liv-3'],
  },
  {
    id: 'quiz-g2-helpers', topicId: 'g2-soc-helpers', subjectId: 'social-studies', grade: 2,
    title: 'People Who Help Us Check', lessonId: 'g2-soc-helpers-l1',
    questionIds: ['q2-hlp-1', 'q2-hlp-2'],
  },

  /* Grade 3 */
  {
    id: 'quiz-g3-multiplication', topicId: 'g3-math-multiplication', subjectId: 'mathematics', grade: 3,
    title: 'Equal Groups Check', lessonId: 'g3-math-multiplication-l1',
    questionIds: ['q3-mul-1', 'q3-mul-2', 'q3-mul-3'],
  },
  {
    id: 'quiz-g3-fractions', topicId: 'g3-math-fractions', subjectId: 'mathematics', grade: 3,
    title: 'Equal Parts Check', lessonId: 'g3-math-fractions-l1',
    questionIds: ['q3-fr-1', 'q3-fr-2', 'q3-fr-3'],
  },
  {
    id: 'quiz-g3-nouns-verbs', topicId: 'g3-eng-nouns-verbs', subjectId: 'english', grade: 3,
    title: 'Nouns and Verbs Check', lessonId: 'g3-eng-nouns-verbs-l1',
    questionIds: ['q3-nv-1', 'q3-nv-2', 'q3-nv-3'],
  },
  {
    id: 'quiz-g3-water', topicId: 'g3-sci-water-cycle', subjectId: 'general-science', grade: 3,
    title: 'Where Rain Comes From Check', lessonId: 'g3-sci-water-cycle-l1',
    questionIds: ['q3-wat-1', 'q3-wat-2', 'q3-wat-3'],
  },
  {
    id: 'quiz-g3-directions', topicId: 'g3-soc-directions', subjectId: 'social-studies', grade: 3,
    title: 'Directions Check', lessonId: 'g3-soc-directions-l1',
    questionIds: ['q3-dir-1', 'q3-dir-2', 'q3-dir-3'],
  },
];
