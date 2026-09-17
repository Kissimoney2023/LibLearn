import type {Lesson, Topic, Unit} from '../../types/domain';

/**
 * GRADE 3 TEACHING CONTENT — LibLearn Teaching Sequence v1
 *
 * Provenance `liblearn`: standard primary material written for LibLearn, not a
 * reproduction of the Liberian national curriculum.
 *
 * Written for eight and nine year olds. This is the grade where a child stops
 * only doing sums and starts being asked WHY a method works, so each lesson
 * gives the reason before the rule.
 *
 * Two things are taught here that children very often half-learn and carry
 * wrong for years:
 *
 *   - Multiplication is equal groups, not "a bigger kind of adding". A child
 *     who never sees the groups will later be unable to tell 3 x 4 from 3 + 4
 *     in a word problem.
 *   - A fraction is only fair if the parts are EQUAL. Children cut a shape in
 *     two uneven pieces and call both of them halves. The lesson attacks that
 *     directly rather than assuming it away.
 *
 * The Social Studies lesson teaches directions and simple maps using an
 * invented village, deliberately. Naming real Liberian towns, counties or
 * distances would assert geography nobody here has verified, and a child this
 * age cannot tell a checked fact from a confident guess.
 */

const V = 'liblearn-v1';

export const GRADE3_UNITS: Unit[] = [
  {id: 'g3-math-u-multiply', subjectId: 'mathematics', grade: 3, order: 1,
   name: 'Multiplication',
   summary: 'Counting equal groups quickly instead of adding again and again.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g3-math-u-fractions', subjectId: 'mathematics', grade: 3, order: 2,
   name: 'Halves, Thirds and Quarters',
   summary: 'Splitting one whole thing into equal parts.',
   curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g3-eng-u-wordjobs', subjectId: 'english', grade: 3, order: 1,
   name: 'Naming Words and Doing Words',
   summary: 'Nouns and verbs, and how to find them in a sentence.',
   curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g3-sci-u-water', subjectId: 'general-science', grade: 3, order: 1,
   name: 'Water and Weather',
   summary: 'Where rain comes from, and where puddles go.',
   curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g3-soc-u-maps', subjectId: 'social-studies', grade: 3, order: 1,
   name: 'Directions and Maps',
   summary: 'North, south, east and west, and reading a simple map.',
   curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE3_TOPICS: Topic[] = [
  {id: 'g3-math-multiplication', unitId: 'g3-math-u-multiply', subjectId: 'mathematics', grade: 3,
   name: 'Equal Groups',
   summary: 'What 3 x 4 really means, and why it is not 3 + 4.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g3-math-fractions', unitId: 'g3-math-u-fractions', subjectId: 'mathematics', grade: 3,
   name: 'Equal Parts',
   summary: 'Why a half is only a half when both pieces are the same size.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g3-eng-nouns-verbs', unitId: 'g3-eng-u-wordjobs', subjectId: 'english', grade: 3,
   name: 'Nouns and Verbs',
   summary: 'Finding the naming word and the doing word in a sentence.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g3-sci-water-cycle', unitId: 'g3-sci-u-water', subjectId: 'general-science', grade: 3,
   name: 'Where Rain Comes From',
   summary: 'Water going up, water coming down, over and over.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g3-soc-directions', unitId: 'g3-soc-u-maps', subjectId: 'social-studies', grade: 3,
   name: 'Directions and Simple Maps',
   summary: 'Using north, south, east and west to describe where things are.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE3_LESSONS: Lesson[] = [
  /* ===================================================== MATHEMATICS ==== */
  {
    id: 'g3-math-multiplication-l1',
    topicId: 'g3-math-multiplication',
    subjectId: 'mathematics',
    grade: 3,
    title: 'Equal Groups',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Say what a multiplication like 4 x 5 means.'},
      {id: 'o2', text: 'Write a multiplication for a picture of equal groups.'},
      {id: 'o3', text: 'Tell a multiplication problem from an addition problem.'},
    ],
    keyTerms: [
      {term: 'Equal groups', definition: 'Groups that all have the same number of things in them.'},
      {term: 'Multiply', definition: 'To find how many altogether when you have equal groups.'},
      {term: 'Times', definition: 'The word we say for the x sign. 4 x 5 is read "four times five".'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Multiplication is about EQUAL GROUPS.\n\nYou will learn what 4 x 5 really means.\n\nYou will learn how to tell when a problem needs multiplying.',
      },
      {
        heading: 'Equal groups',
        body: 'Look at these four baskets. Each basket has 5 mangoes.\n\n    [5]  [5]  [5]  [5]\n\nHow many mangoes altogether?\n\nYou could add:  5 + 5 + 5 + 5 = 20\n\nThat works. But writing 5 four times is slow. And with twenty baskets it would be very slow.\n\nSo we write it a shorter way:\n\n    4 x 5 = 20\n\nRead it as "four groups of five".\n\nThe 4 is how many groups. The 5 is how many in each group.',
      },
      {
        heading: 'The groups must be EQUAL',
        body: 'This only works if every group is the same size.\n\nLook at these baskets:\n\n    [5]  [3]  [5]  [6]\n\nYou cannot write a multiplication for this. The groups are not equal.\n\nHere you have to add: 5 + 3 + 5 + 6 = 19.\n\nMultiplication is a shortcut, but it is only a shortcut for EQUAL groups. If the groups are different sizes, the shortcut does not work.',
        example: 'A word problem.\n\n"A farmer plants 6 rows of maize. Each row has 8 plants. How many plants altogether?"\n\nAsk yourself: are there equal groups?\n\nYes. There are 6 rows, and every row has the same number: 8.\n\nSo it is multiplication:\n\n    6 x 8 = 48\n\nThere are 48 plants.\n\nNow a different problem.\n\n"A farmer plants 6 plants on Monday and 8 plants on Tuesday. How many altogether?"\n\nAre these equal groups? No. One day is 6, the other is 8. They are just two amounts.\n\nSo this is addition:\n\n    6 + 8 = 14\n\nSame two numbers. Completely different answer. The words tell you which one to use.',
      },
      {
        heading: 'Turning it around',
        body: 'Here is something useful.\n\n    3 x 4 = 12\n    4 x 3 = 12\n\nThe answer is the same both ways.\n\nWhy? Picture it.\n\n    3 rows of 4:        4 rows of 3:\n      * * * *              * * *\n      * * * *              * * *\n      * * * *              * * *\n                           * * *\n\nBoth have 12 stars. It is the same stars, just turned.\n\nThis helps you. If you know 2 x 9, then you also know 9 x 2 — and 2 x 9 is much easier to work out.',
      },
      {
        heading: 'Try it yourself',
        body: '1. There are 5 bags. Each bag has 3 oranges. Write the multiplication and the answer.\n\n2. What does 7 x 2 mean? Say it in words.\n\n3. A shop has 4 shelves. Each shelf has 6 tins. How many tins?\n\n4. Musu has 4 sweets. Her brother has 7 sweets. Is this multiplication or addition? Why?\n\n5. If 8 x 3 = 24, what is 3 x 8? How do you know without working it out?',
      },
      {
        heading: 'Summary',
        body: '• Multiplication means equal groups.\n• 4 x 5 means four groups of five.\n• The groups must all be the same size, or you must add instead.\n• Read the words carefully: equal groups means multiply, two different amounts means add.\n• You can turn a multiplication around and the answer stays the same.',
      },
    ],
  },
  {
    id: 'g3-math-fractions-l1',
    topicId: 'g3-math-fractions',
    subjectId: 'mathematics',
    grade: 3,
    title: 'Equal Parts',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Say why parts must be equal to be halves, thirds or quarters.'},
      {id: 'o2', text: 'Name the fraction when a whole is split into equal parts.'},
      {id: 'o3', text: 'Say which is bigger, a half or a quarter, and why.'},
    ],
    keyTerms: [
      {term: 'Whole', definition: 'One complete thing before you cut it up.'},
      {term: 'Equal parts', definition: 'Pieces that are exactly the same size as each other.'},
      {term: 'Half', definition: 'One of two equal parts of a whole.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'A fraction is a part of one whole thing.\n\nYou will learn what halves, thirds and quarters are.\n\nMost of all you will learn one word: EQUAL.',
      },
      {
        heading: 'Equal is the whole idea',
        body: 'Two children share one loaf of bread.\n\nOne child cuts it like this:\n\n    |=======|==|\n      big     small\n\nIs that fair? No.\n\nAre those two pieces halves? NO.\n\nCutting something into two pieces does not make halves. The two pieces must be the SAME SIZE.\n\n    |=====|=====|\n      same   same\n\nNow they are halves.\n\nThis is the mistake almost everyone makes at first. Remember it: two pieces is not enough. Two EQUAL pieces.',
      },
      {
        heading: 'Naming the parts',
        body: 'The name depends on how many equal parts you make.\n\n    Cut a whole into 2 equal parts → each part is a HALF\n    Cut a whole into 3 equal parts → each part is a THIRD\n    Cut a whole into 4 equal parts → each part is a QUARTER\n\nWe write them like this:\n\n    one half     = 1/2\n    one third    = 1/3\n    one quarter  = 1/4\n\nThe bottom number tells you how many equal parts the whole was cut into.\n\nThe top number tells you how many of those parts you have.\n\nSo 3/4 means: the whole was cut into 4 equal parts, and you have 3 of them.',
        example: 'Sharing a cassava.\n\nThree children share one cassava equally.\n\nHow many equal parts? Three.\n\nSo each child gets one third. We write it 1/3.\n\nNow four children share one cassava equally.\n\nHow many equal parts? Four.\n\nEach child gets one quarter, 1/4.\n\nHere is the important question. Which child gets more — one of the three, or one of the four?\n\nThe same cassava was shared among MORE children the second time. So each piece must be smaller.\n\n1/3 is bigger than 1/4.\n\nMore people sharing, smaller pieces. That is true every time.',
      },
      {
        heading: 'More parts means smaller parts',
        body: 'This surprises people, so look at it carefully.\n\n4 is a bigger number than 2.\n\nBut 1/4 is SMALLER than 1/2.\n\nWhy? Because the bottom number is not counting how much you have. It is counting how many ways the whole was split.\n\nSplit a mango between 2 people — big pieces.\n\nSplit the same mango between 4 people — small pieces.\n\nSplit it between 8 people — very small pieces.\n\nThe bigger the bottom number, the more people are sharing, and the smaller each share becomes.',
      },
      {
        heading: 'Try it yourself',
        body: '1. A cake is cut into 2 pieces, but one piece is much bigger. Are these halves? Why not?\n\n2. A bread is cut into 4 equal parts. What is each part called?\n\n3. Write "one third" using numbers.\n\n4. What does 3/4 mean? Say it in words.\n\n5. Which is bigger, 1/2 or 1/4? Explain why, using sharing.',
      },
      {
        heading: 'Summary',
        body: '• A fraction is a part of one whole.\n• The parts must be EQUAL, or they have no fraction name.\n• 2 equal parts are halves, 3 are thirds, 4 are quarters.\n• The bottom number says how many equal parts the whole was cut into.\n• The more parts, the smaller each part is.',
      },
    ],
  },

  /* ========================================================= ENGLISH ==== */
  {
    id: 'g3-eng-nouns-verbs-l1',
    topicId: 'g3-eng-nouns-verbs',
    subjectId: 'english',
    grade: 3,
    title: 'Nouns and Verbs',
    estimatedMinutes: 10,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Find the naming words in a sentence.'},
      {id: 'o2', text: 'Find the doing word in a sentence.'},
      {id: 'o3', text: 'Use a test to check whether a word is a noun or a verb.'},
    ],
    keyTerms: [
      {term: 'Noun', definition: 'A naming word. A person, a place, an animal or a thing.'},
      {term: 'Verb', definition: 'A doing word. It tells what someone or something does.'},
      {term: 'Sentence', definition: 'A group of words that tells a whole idea.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Words do different jobs in a sentence.\n\nYou will learn about naming words and doing words.\n\nYou will learn a test for telling them apart.',
      },
      {
        heading: 'Naming words',
        body: 'A NOUN is a naming word.\n\nIt names a person, a place, an animal or a thing.\n\n    person:  boy, teacher, mother, nurse\n    place:   school, market, river, village\n    animal:  goat, bird, fish, dog\n    thing:   cup, book, chair, mango\n\nHere is a test. Can you put "a" or "the" in front of it and does it still sound right?\n\n    the goat    ✓ works → goat is a noun\n    the run     ✗ does not work → run is not a noun\n\nThat test is not perfect, but for words like these it works well.',
      },
      {
        heading: 'Doing words',
        body: 'A VERB is a doing word. It tells what someone or something DOES.\n\n    run, eat, sing, write, sleep, carry, laugh\n\nHere is a test. Can you put "I" in front of it?\n\n    I run     ✓ works → run is a verb\n    I sing    ✓ works → sing is a verb\n    I goat    ✗ does not work → goat is not a verb\n\nEvery sentence needs a verb. Without one, nothing is happening and the sentence is not finished.',
        example: 'Finding both in a sentence.\n\n    The farmer carries a heavy basket.\n\nFirst find the naming words. Who or what is this about?\n\n    farmer  — a person → noun\n    basket  — a thing → noun\n\nNow find the doing word. What is happening?\n\n    carries — that is what the farmer does → verb\n\nSo: farmer and basket are nouns. Carries is the verb.\n\nTry another:\n\n    My sister sings in the market.\n\n    Nouns: sister, market\n    Verb: sings\n\nNotice "heavy" and "my" are neither. Not every word is a noun or a verb — those two do other jobs.',
      },
      {
        heading: 'Why this helps you',
        body: 'This is not just naming things for the sake of it.\n\nWhen you write a sentence and it feels wrong, it is very often because the verb is missing.\n\n    The boy under the tree.        ← no verb. Not finished.\n    The boy sat under the tree.    ← verb added. Now it is a sentence.\n\nIf you can find the verb, you can check your own writing.',
      },
      {
        heading: 'Try it yourself',
        body: 'For each sentence, name the nouns and the verb.\n\n1. The dog barked loudly.\n\n2. My mother cooks rice.\n\n3. The children walked to school.\n\n4. Is "market" a noun or a verb? Use the test.\n\n5. This is not a sentence: "The big goat near the river." What is missing?',
      },
      {
        heading: 'Summary',
        body: '• A noun is a naming word: person, place, animal or thing.\n• A verb is a doing word.\n• Test a noun by putting "a" or "the" in front.\n• Test a verb by putting "I" in front.\n• Every sentence needs a verb.',
      },
    ],
  },

  /* ================================================= GENERAL SCIENCE ==== */
  {
    id: 'g3-sci-water-cycle-l1',
    topicId: 'g3-sci-water-cycle',
    subjectId: 'general-science',
    grade: 3,
    title: 'Where Rain Comes From',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Explain where a puddle goes when it dries up.'},
      {id: 'o2', text: 'Describe how clouds form.'},
      {id: 'o3', text: 'Explain why water is never used up.'},
    ],
    keyTerms: [
      {term: 'Evaporate', definition: 'When water gets warm and rises into the air as tiny pieces you cannot see.'},
      {term: 'Cloud', definition: 'Many tiny drops of water floating high in the sky.'},
      {term: 'Cycle', definition: 'Something that goes round and round, and starts again.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Rain does not come from nowhere.\n\nYou will learn where it comes from.\n\nYou will learn where puddles go when they dry.\n\nThey are the same story.',
      },
      {
        heading: 'Where does the puddle go?',
        body: 'After rain, there are puddles on the ground.\n\nThe sun comes out. Hours later, the puddles are gone.\n\nWhere did the water go?\n\nIt did not sink into the ground — a puddle on a hard road dries up too.\n\nIt went UP.\n\nThe sun warmed the water. Warm water rises into the air in tiny pieces, far too small to see. This is called EVAPORATING.\n\nThe puddle did not disappear. It went into the air.',
      },
      {
        heading: 'Up, then down again',
        body: 'Here is the whole journey.\n\n    1. The sun warms water in rivers, lakes and the sea.\n\n    2. The water evaporates. It rises as invisible tiny pieces.\n\n    3. High up, the air is cold. The cold turns those pieces back into tiny drops.\n\n    4. Millions of tiny drops together make a CLOUD.\n\n    5. The drops bump into each other and join up. They get bigger and heavier.\n\n    6. When they are too heavy to float, they fall. That is RAIN.\n\n    7. The rain lands in rivers, lakes and the sea.\n\nAnd then the sun warms it again, and it all starts over.\n\nRound and round. That is why it is called a cycle.',
        example: 'You can see step 3 at home.\n\nHold a cold spoon over a pot of boiling water. Keep your hand well back from the steam.\n\nSteam rises from the pot. That is water going up.\n\nWhen the steam touches the cold spoon, it turns back into water. Drops form on the spoon and run down.\n\nThat is exactly what happens in the sky. Warm water goes up, meets cold air high above, and turns back into drops.\n\nThe spoon is the cold sky. The drops on it are a small cloud.',
      },
      {
        heading: 'Water is never used up',
        body: 'Here is something worth knowing.\n\nThe water is not made new each time it rains. It is the SAME water, going round again.\n\nIt was in a river. It went up. It became a cloud. It fell as rain. It ran back to the river.\n\nThe world does not get more water or less water. It moves the same water around, over and over.\n\nThat is also why it matters if water is dirtied. It does not go away and get replaced. It comes back round.',
      },
      {
        heading: 'Try it yourself',
        body: '1. A puddle on a hard road dries up in the sun. Where did the water go?\n\n2. What is a cloud made of?\n\n3. Why do drops in a cloud eventually fall as rain?\n\n4. Why does the water on a cold spoon appear, when the spoon was dry before?\n\n5. Is the rain that falls today new water? Explain.',
      },
      {
        heading: 'Summary',
        body: '• The sun warms water and it evaporates into the air.\n• High up, cold air turns it back into tiny drops.\n• Many tiny drops together make a cloud.\n• When the drops get heavy enough, they fall as rain.\n• The same water goes round and round. It is never used up.',
      },
    ],
  },

  /* ================================================== SOCIAL STUDIES ==== */
  {
    id: 'g3-soc-directions-l1',
    topicId: 'g3-soc-directions',
    subjectId: 'social-studies',
    grade: 3,
    title: 'Directions and Simple Maps',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Name the four main directions.'},
      {id: 'o2', text: 'Use the sun to work out which way is east and west.'},
      {id: 'o3', text: 'Describe where something is on a simple map.'},
    ],
    keyTerms: [
      {term: 'Direction', definition: 'The way you face or travel: north, south, east or west.'},
      {term: 'Map', definition: 'A drawing of a place, seen from above.'},
      {term: 'Key', definition: 'The part of a map that explains what each symbol means.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'There are four main directions.\n\nYou will learn their names and their order.\n\nYou will learn to find them using the sun.\n\nYou will learn to read a simple map.',
      },
      {
        heading: 'The four directions',
        body: 'The four main directions are:\n\n    NORTH, EAST, SOUTH, WEST\n\nOn a map they are drawn like this:\n\n              N\n              |\n        W  ---+---  E\n              |\n              S\n\nNorth is at the top. South at the bottom. East on the right. West on the left.\n\nGoing round clockwise from the top, the order is North, East, South, West.\n\nMany people remember it with a sentence: Never Eat Slimy Worms. N, E, S, W.',
      },
      {
        heading: 'Using the sun',
        body: 'You do not need anything to find the directions. You only need the sun.\n\nThe sun rises in the EAST every morning.\n\nThe sun sets in the WEST every evening.\n\nSo in the morning, stand and face the rising sun. You are now facing east.\n\nWhen you face east:\n\n    north is on your LEFT\n    south is on your RIGHT\n    west is BEHIND you\n\nTry it tomorrow morning. Then you will never be lost about which way is which.',
        example: 'A map of a village.\n\nThis village is not a real place. It is drawn to practise on.\n\n                    N\n                    |\n         [school]   |\n                    |\n     W ------- [market] ------- E\n                    |\n                    |\n         [river]    |\n                    S\n\nNow read it.\n\nThe school is NORTH of the market. It is above it on the map.\n\nThe river is SOUTH of the market. It is below it.\n\nIf you stand at the market and walk north, you reach the school.\n\nIf you stand at the school and want to reach the river, you walk south — straight past the market and on.\n\nNotice that direction works both ways. The school is north of the market, so the market is south of the school.',
      },
      {
        heading: 'What a map is',
        body: 'A map is a picture of a place seen from ABOVE, as a bird would see it.\n\nThat is why a house on a map looks like a small square, not like a house from the front.\n\nMaps use symbols — small pictures that stand for real things. A blue line might mean a river. A small square might mean a building.\n\nThe KEY tells you what each symbol means. Always read the key first, or you will guess wrong.',
      },
      {
        heading: 'Try it yourself',
        body: 'Use the village map above.\n\n1. Name the four main directions in order, starting from north.\n\n2. In which direction does the sun rise?\n\n3. Is the school north or south of the market?\n\n4. You are at the river. In which direction do you walk to reach the market?\n\n5. Face the rising sun. Which direction is behind you?',
      },
      {
        heading: 'Summary',
        body: '• The four main directions are north, east, south and west.\n• On a map, north is at the top.\n• The sun rises in the east and sets in the west.\n• Face east and north is on your left.\n• A map shows a place from above, and the key explains its symbols.',
      },
    ],
  },
];
