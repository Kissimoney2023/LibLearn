import type {Lesson, Topic, Unit} from '../../types/domain';

/**
 * GRADE 2 TEACHING CONTENT — LibLearn Teaching Sequence v1
 *
 * Provenance `liblearn`: standard early-primary material written for LibLearn,
 * not a reproduction of the Liberian national curriculum.
 *
 * Written for seven and eight year olds. They can read short sentences on their
 * own now, which is the main change from Grade 1 - but only short ones, and
 * only if each one carries a single idea.
 *
 * The mathematics here is the year where counting stops being enough. A child
 * who can count to 100 one by one still cannot add 30 and 40 quickly, and the
 * thing that unlocks it is seeing a two-digit number as tens AND ones rather
 * than as a long line of single things. That idea is the spine of this grade,
 * so it is taught with objects that really do come in tens before it is taught
 * with symbols.
 *
 * The Social Studies lesson is about the child's own school and the people who
 * help in a community. It describes roles - a nurse, a teacher, a shopkeeper -
 * and names no real place, office or institution, because nothing in this
 * corpus about Liberia has been verified against an official source.
 */

const V = 'liblearn-v1';

export const GRADE2_UNITS: Unit[] = [
  {id: 'g2-math-u-tensones', subjectId: 'mathematics', grade: 2, order: 1,
   name: 'Tens and Ones',
   summary: 'Seeing a two-digit number as bundles of ten, plus some left over.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g2-math-u-addsub', subjectId: 'mathematics', grade: 2, order: 2,
   name: 'Adding and Taking Away',
   summary: 'Putting groups together, and finding what is left.',
   curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g2-eng-u-sentences', subjectId: 'english', grade: 2, order: 1,
   name: 'Making Sentences',
   summary: 'What makes a sentence complete, and how to start and end it.',
   curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g2-sci-u-livingthings', subjectId: 'general-science', grade: 2, order: 1,
   name: 'What Living Things Need',
   summary: 'What plants and animals must have to stay alive.',
   curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g2-soc-u-community', subjectId: 'social-studies', grade: 2, order: 1,
   name: 'My School and My Community',
   summary: 'The people who help in a community, and the work they do.',
   curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE2_TOPICS: Topic[] = [
  {id: 'g2-math-tens-ones', unitId: 'g2-math-u-tensones', subjectId: 'mathematics', grade: 2,
   name: 'Tens and Ones',
   summary: 'Why 34 means three tens and four ones.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g2-math-addition', unitId: 'g2-math-u-addsub', subjectId: 'mathematics', grade: 2,
   name: 'Adding Two-Digit Numbers',
   summary: 'Adding the tens, adding the ones, and putting them together.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g2-eng-sentences', unitId: 'g2-eng-u-sentences', subjectId: 'english', grade: 2,
   name: 'Complete Sentences',
   summary: 'Every sentence needs a who and a what-they-did.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g2-sci-living-needs', unitId: 'g2-sci-u-livingthings', subjectId: 'general-science', grade: 2,
   name: 'What Living Things Need',
   summary: 'Food, water, air — and what happens without them.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g2-soc-helpers', unitId: 'g2-soc-u-community', subjectId: 'social-studies', grade: 2,
   name: 'People Who Help Us',
   summary: 'The jobs people do that keep a community working.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE2_LESSONS: Lesson[] = [
  /* ===================================================== MATHEMATICS ==== */
  {
    id: 'g2-math-tens-ones-l1',
    topicId: 'g2-math-tens-ones',
    subjectId: 'mathematics',
    grade: 2,
    title: 'Tens and Ones',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Say how many tens and how many ones are in a number.'},
      {id: 'o2', text: 'Build a number from bundles of ten and single ones.'},
      {id: 'o3', text: 'Say which of two numbers is bigger by looking at the tens first.'},
    ],
    keyTerms: [
      {term: 'Ten', definition: 'A bundle of ten single things, held together as one group.'},
      {term: 'One', definition: 'A single thing, not in a bundle.'},
      {term: 'Two-digit number', definition: 'A number written with two figures, like 34 or 70.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'You will learn why 34 is not just "three and four".\n\nYou will learn to see numbers as tens and ones.\n\nThis makes big numbers much easier.',
      },
      {
        heading: 'Counting one by one is slow',
        body: 'Imagine 34 seeds on the ground.\n\nYou could count them one by one. 1, 2, 3, 4 ... 34.\n\nThat works. But it takes a long time. And it is easy to lose your place.\n\nThere is a faster way.\n\nPut the seeds into bundles of ten.',
      },
      {
        heading: 'Bundles of ten',
        body: 'Count out ten seeds. Tie them together. That is one bundle.\n\nDo it again. And again.\n\nWith 34 seeds you get:\n\n    bundle   bundle   bundle      and  4 loose seeds\n      10   +   10   +   10     +         4      = 34\n\nSo 34 is three tens and four ones.\n\nNow look at how we write it:\n\n    3 4\n    | |\n    | └── the ones: 4\n    └──── the tens: 3\n\nThe left figure counts the bundles. The right figure counts the loose ones.',
        example: 'What is 58 made of?\n\nLook at the two figures.\n\n    5 is on the left → 5 bundles of ten → 50\n    8 is on the right → 8 loose ones → 8\n\nSo 58 is five tens and eight ones.\n\n    50 + 8 = 58\n\nNow the other way round. Build 70.\n\n    7 bundles of ten = 70\n    0 loose ones = 0\n\nSo 70 is seven tens and NO ones. The 0 is not nothing — it is telling you there are no loose ones left over.',
      },
      {
        heading: 'Comparing is faster with tens',
        body: 'Which is bigger, 43 or 38?\n\nDo not count them all. Look at the tens first.\n\n    43 has 4 tens.\n    38 has 3 tens.\n\n4 bundles is more than 3 bundles.\n\nSo 43 is bigger. You did not even need to look at the ones.\n\nOnly if the tens are the SAME do you look at the ones. Like 45 and 42: both have 4 tens, so compare 5 and 2. 45 is bigger.',
      },
      {
        heading: 'Try it yourself',
        body: '1. How many tens and how many ones are in 26?\n\n2. How many tens and how many ones are in 90?\n\n3. I have 6 bundles of ten and 3 loose seeds. What number do I have?\n\n4. Which is bigger, 52 or 49? Look at the tens first.\n\n5. Which is bigger, 61 or 67? Careful — the tens are the same.',
      },
      {
        heading: 'Summary',
        body: '• Ten single things make one bundle of ten.\n• In a two-digit number, the left figure counts tens and the right figure counts ones.\n• 34 means three tens and four ones.\n• A 0 in the ones place means no loose ones left over.\n• To compare, look at the tens first.',
      },
    ],
  },
  {
    id: 'g2-math-addition-l1',
    topicId: 'g2-math-addition',
    subjectId: 'mathematics',
    grade: 2,
    title: 'Adding Two-Digit Numbers',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Add two two-digit numbers by adding tens and ones separately.'},
      {id: 'o2', text: 'Know when ten ones must be traded for one ten.'},
      {id: 'o3', text: 'Check whether an answer is sensible.'},
    ],
    keyTerms: [
      {term: 'Add', definition: 'To put two groups together and find how many there are altogether.'},
      {term: 'Altogether', definition: 'The whole amount after you put the groups together.'},
      {term: 'Trade', definition: 'To swap ten loose ones for one bundle of ten.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'You will learn to add numbers like 23 + 45.\n\nThe trick is to add the tens and the ones separately.\n\nThen you put the two answers together.',
      },
      {
        heading: 'Add the tens, add the ones',
        body: 'Take 23 + 45.\n\nBreak each number into tens and ones:\n\n    23  is  2 tens  and  3 ones\n    45  is  4 tens  and  5 ones\n\nNow add the tens:   2 tens + 4 tens = 6 tens = 60\nNow add the ones:   3 ones + 5 ones = 8 ones = 8\n\nPut them together:  60 + 8 = 68\n\nSo 23 + 45 = 68.\n\nYou never had to count past ten. You just added 2 and 4, then 3 and 5.',
        example: 'A market stall.\n\nA trader sells 31 oranges in the morning and 26 oranges in the afternoon. How many did she sell altogether?\n\nBreak them up:\n\n    31  is  3 tens and 1 one\n    26  is  2 tens and 6 ones\n\nTens:  3 + 2 = 5 tens = 50\nOnes:  1 + 6 = 7 ones = 7\n\nAltogether: 50 + 7 = 57 oranges.\n\nIs that sensible? She sold about 30 and about 26. Together that should be a bit under 60. 57 is a bit under 60. Good.',
      },
      {
        heading: 'When the ones make ten or more',
        body: 'Sometimes the ones add up to ten or more.\n\nTake 28 + 15.\n\n    Tens:  2 + 1 = 3 tens = 30\n    Ones:  8 + 5 = 13 ones\n\n13 ones is too many to leave loose. Ten of them make a bundle.\n\n    13 ones = 1 ten and 3 ones\n\nSo now you have:\n\n    3 tens + 1 more ten = 4 tens = 40\n    and 3 ones left over\n\n    40 + 3 = 43\n\nSo 28 + 15 = 43.\n\nThat swap — ten loose ones becoming one bundle — is called trading.',
      },
      {
        heading: 'Check if your answer is sensible',
        body: 'Always look at your answer and ask: could that be right?\n\nIf you add 28 + 15 and get 33, something is wrong. 28 + 15 must be more than 28 + 10, which is 38. So 33 is too small.\n\nIf you get 413, that is far too big. You were adding two numbers smaller than 30 each.\n\nA sensible answer for 28 + 15 is somewhere in the forties. 43 fits.',
      },
      {
        heading: 'Try it yourself',
        body: '1. 14 + 23\n\n2. 40 + 35\n\n3. 26 + 12\n\n4. 17 + 15  (careful — the ones make more than ten)\n\n5. A boy picks 22 mangoes on Monday and 19 on Tuesday. How many altogether?',
      },
      {
        heading: 'Summary',
        body: '• Break each number into tens and ones.\n• Add the tens. Add the ones. Put them together.\n• If the ones reach ten or more, trade ten ones for one ten.\n• Always check that your answer looks sensible.',
      },
    ],
  },

  /* ========================================================= ENGLISH ==== */
  {
    id: 'g2-eng-sentences-l1',
    topicId: 'g2-eng-sentences',
    subjectId: 'english',
    grade: 2,
    title: 'Complete Sentences',
    estimatedMinutes: 10,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Tell a complete sentence from an incomplete one.'},
      {id: 'o2', text: 'Start a sentence with a capital letter.'},
      {id: 'o3', text: 'End a sentence with a full stop or a question mark.'},
    ],
    keyTerms: [
      {term: 'Sentence', definition: 'A group of words that tells a whole idea.'},
      {term: 'Capital letter', definition: 'A big letter, like A or B, used to start a sentence.'},
      {term: 'Full stop', definition: 'The dot at the end of a sentence. It tells the reader to stop.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'A sentence must tell a whole idea.\n\nYou will learn what a sentence needs.\n\nYou will learn how to start it and how to end it.',
      },
      {
        heading: 'A sentence needs two things',
        body: 'Every sentence needs a WHO and a WHAT THEY DID.\n\nLook at this:\n\n    The dog\n\nThat is not a sentence. You know who. But what did the dog do? You are still waiting.\n\nNow look at this:\n\n    The dog barked.\n\nNow it is a sentence. There is a who — the dog. There is what it did — barked.\n\nThe idea is whole. You are not left waiting.',
        example: 'Finding what is missing.\n\n    ran to the river\n\nWhat did? A boy? A goat? You do not know. The WHO is missing.\n\nAdd it:\n\n    The boy ran to the river.\n\nNow it is a sentence.\n\nAnother one:\n\n    My little sister\n\nYou know who. But she did what? The WHAT is missing.\n\nAdd it:\n\n    My little sister sang a song.\n\nNow it is a sentence.',
      },
      {
        heading: 'Start big, end with a dot',
        body: 'Every sentence starts with a capital letter.\n\n    the rain fell        ← wrong. Small t.\n    The rain fell.       ← right. Big T.\n\nEvery sentence ends with a mark.\n\nIf you are telling something, use a full stop:\n\n    The rain fell.\n\nIf you are asking something, use a question mark:\n\n    Did the rain fall?\n\nThe capital letter tells the reader "a sentence starts here". The mark at the end tells them "it stops here".',
      },
      {
        heading: 'Try it yourself',
        body: 'Say whether each one is a complete sentence. If it is not, say what is missing.\n\n1. The baby cried.\n\n2. under the big tree\n\n3. My mother cooks rice.\n\n4. The three goats\n\n5. Now write this properly, with a capital letter and a full stop:  the sun is hot',
      },
      {
        heading: 'Summary',
        body: '• A sentence tells a whole idea.\n• It needs a who and a what-they-did.\n• Start it with a capital letter.\n• End it with a full stop, or a question mark if you are asking.',
      },
    ],
  },

  /* ================================================= GENERAL SCIENCE ==== */
  {
    id: 'g2-sci-living-needs-l1',
    topicId: 'g2-sci-living-needs',
    subjectId: 'general-science',
    grade: 2,
    title: 'What Living Things Need',
    estimatedMinutes: 10,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Name the things every living thing needs.'},
      {id: 'o2', text: 'Say what a plant needs that an animal does not get the same way.'},
      {id: 'o3', text: 'Explain why a living thing dies without these needs.'},
    ],
    keyTerms: [
      {term: 'Living thing', definition: 'Something that is alive. It grows, and it needs food, water and air.'},
      {term: 'Need', definition: 'Something you must have to stay alive. Not something you just want.'},
      {term: 'Sunlight', definition: 'Light from the sun. Plants use it to make their own food.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Living things need certain things to stay alive.\n\nYou will learn what those are.\n\nYou will learn what happens without them.',
      },
      {
        heading: 'Three things everything alive needs',
        body: 'Every living thing needs three things:\n\n    FOOD    — to grow and have strength\n    WATER   — every living body needs it\n    AIR     — to breathe\n\nA goat needs all three.\n\nA mango tree needs all three.\n\nYou need all three.\n\nA stone needs none of them. A stone is not alive.',
      },
      {
        heading: 'Plants make their own food',
        body: 'Here is the difference between a plant and an animal.\n\nAn animal has to FIND its food. A goat eats grass. A child eats rice.\n\nA plant does not go anywhere. It MAKES its own food.\n\nTo do that, a plant needs one extra thing:\n\n    SUNLIGHT\n\nA plant uses sunlight, water and air to make its own food, right there in its leaves.\n\nThat is why a plant in a dark room turns pale and dies, even if you water it. It has water. It has air. But with no sunlight it cannot make food.',
        example: 'Two bean plants.\n\nA girl grows two bean plants in two cups.\n\nShe puts the first cup on the windowsill. Sun, water, air. It grows tall and green.\n\nShe puts the second cup inside a dark cupboard. She still gives it water. It still has air.\n\nAfter two weeks she opens the cupboard.\n\nThe second plant is thin, pale and bent. It is dying.\n\nWhat was missing? Only the sunlight. Without sunlight it could not make food, and without food it could not live.',
      },
      {
        heading: 'What happens without them',
        body: 'Take away any one of the needs, and a living thing will die.\n\nNo water — a plant dries up. An animal gets weak.\n\nNo food — a body has no strength to grow or move.\n\nNo air — nothing alive lasts long at all.\n\nThis is why we water crops in dry weather, and why we feed animals we keep. We are giving them what they cannot live without.',
      },
      {
        heading: 'Try it yourself',
        body: '1. Name the three things every living thing needs.\n\n2. What extra thing does a plant need, that lets it make its own food?\n\n3. A goat and a mango tree. Which one has to find its food?\n\n4. A plant is watered every day but kept in a dark room. Will it live? Why?\n\n5. Is a stone a living thing? How do you know?',
      },
      {
        heading: 'Summary',
        body: '• Every living thing needs food, water and air.\n• Animals find their food.\n• Plants make their own food, and need sunlight to do it.\n• Take away a need and the living thing dies.',
      },
    ],
  },

  /* ================================================== SOCIAL STUDIES ==== */
  {
    id: 'g2-soc-helpers-l1',
    topicId: 'g2-soc-helpers',
    subjectId: 'social-studies',
    grade: 2,
    title: 'People Who Help Us',
    estimatedMinutes: 10,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Name some jobs people do that help a community.'},
      {id: 'o2', text: 'Say what would happen if one of those jobs was not done.'},
      {id: 'o3', text: 'Say how people in a community depend on each other.'},
    ],
    keyTerms: [
      {term: 'Community', definition: 'All the people who live near each other in one place.'},
      {term: 'Job', definition: 'The work a person does, often to earn money or to help others.'},
      {term: 'Depend on', definition: 'To need someone else for something you cannot do yourself.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Many people do work that helps everyone.\n\nYou will learn about some of those jobs.\n\nYou will learn why they matter.',
      },
      {
        heading: 'Jobs that help everyone',
        body: 'Think about the people around where you live.\n\n    A TEACHER helps children learn to read and count.\n\n    A NURSE helps people who are sick or hurt.\n\n    A FARMER grows the food that people eat.\n\n    A SHOPKEEPER sells things people need.\n\n    A DRIVER takes people and goods from place to place.\n\n    A BUILDER makes the houses people live in.\n\nNone of these people works only for themselves. Their work reaches other people too.',
      },
      {
        heading: 'What if the job was not done?',
        body: 'This is the best way to see why a job matters. Take it away and look.\n\nIf no farmer grew food, the shopkeeper would have nothing to sell, and nobody would eat.\n\nIf no driver carried goods, the food would stay on the farm and rot.\n\nIf no teacher taught, children would not learn to read.\n\nIf no nurse worked, a sick person would have nowhere to go.\n\nEvery job is holding something up. You notice it most when it stops.',
        example: 'One loaf of bread.\n\nThink about bread on a table.\n\nA farmer grew the grain.\n\nA driver carried it to town.\n\nA baker turned it into bread.\n\nA shopkeeper sold it.\n\nSomeone in the family carried it home.\n\nFive people. One loaf of bread.\n\nNot one of them could have done it alone. The farmer cannot bake. The baker cannot grow grain. They each did one part, and together the bread reached the table.',
      },
      {
        heading: 'Depending on each other',
        body: 'Nobody can do everything.\n\nThe nurse cannot also grow all her own food.\n\nThe farmer cannot also treat his own illness.\n\nSo the nurse depends on the farmer for food. The farmer depends on the nurse when he is sick.\n\nThat is what a community is: people who each do one thing well, and depend on each other for the rest.',
      },
      {
        heading: 'Try it yourself',
        body: 'Think about where you live. Answer out loud.\n\n1. Name three people who do work that helps others.\n\n2. What does a nurse do?\n\n3. What would happen if nobody grew food?\n\n4. Who helps you learn?\n\n5. Name one job you would like to do when you are older. Who would it help?',
      },
      {
        heading: 'Summary',
        body: '• Many people do work that helps the whole community.\n• Take a job away and you see what it was holding up.\n• Nobody can do everything alone.\n• People in a community depend on each other.',
      },
    ],
  },
];
