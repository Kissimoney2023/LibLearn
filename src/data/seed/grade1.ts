import type {Lesson, Topic, Unit} from '../../types/domain';

/**
 * GRADE 1 TEACHING CONTENT — LibLearn Teaching Sequence v1
 *
 * Provenance `liblearn`: standard early-primary material written for LibLearn,
 * not a reproduction of the Liberian national curriculum.
 *
 * Written for six and seven year olds, many of whom are still learning to read
 * the words that are teaching them. That constrains the writing more than any
 * other grade in this corpus:
 *
 *   - Very short sentences. One idea each.
 *   - Numbers are shown as objects to count before they are shown as symbols.
 *   - No instruction depends on reading a long paragraph first.
 *   - Everything countable is something a child can actually hold: stones,
 *     mangoes, fingers, cups.
 *
 * A Grade 1 pupil will often be reading this WITH someone - an older sibling,
 * a parent, a teacher. The "Try it yourself" sections are written so that they
 * work read aloud, because that is how they will most often be used.
 *
 * The Social Studies lesson is about the child's own family and home, which
 * every child can answer from life. It names no towns, counties or institutions:
 * a six-year-old cannot tell a checked fact from a confident guess, and nothing
 * in this corpus about Liberia has been verified against an official source.
 */

const V = 'liblearn-v1';

export const GRADE1_UNITS: Unit[] = [
  {id: 'g1-math-u-counting', subjectId: 'mathematics', grade: 1, order: 1,
   name: 'Counting and Numbers to 20',
   summary: 'Counting things, and writing the number that says how many.',
   curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g1-eng-u-sounds', subjectId: 'english', grade: 1, order: 1,
   name: 'Letters and Sounds',
   summary: 'The sounds letters make, and how they join to build words.',
   curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g1-sci-u-mybody', subjectId: 'general-science', grade: 1, order: 1,
   name: 'My Body and My Senses',
   summary: 'The five senses, and the body part that does each one.',
   curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g1-soc-u-family', subjectId: 'social-studies', grade: 1, order: 1,
   name: 'My Family and My Home',
   summary: 'Who lives in a home, and how people in a family help each other.',
   curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE1_TOPICS: Topic[] = [
  {id: 'g1-math-counting', unitId: 'g1-math-u-counting', subjectId: 'mathematics', grade: 1,
   name: 'Counting to 20',
   summary: 'Counting one by one, and knowing which number is more.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g1-eng-letter-sounds', unitId: 'g1-eng-u-sounds', subjectId: 'english', grade: 1,
   name: 'Letter Sounds',
   summary: 'Hearing the first sound in a word, and finding its letter.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g1-sci-senses', unitId: 'g1-sci-u-mybody', subjectId: 'general-science', grade: 1,
   name: 'The Five Senses',
   summary: 'See, hear, smell, taste, touch — and the body part for each.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g1-soc-family', unitId: 'g1-soc-u-family', subjectId: 'social-studies', grade: 1,
   name: 'My Family',
   summary: 'The people in a family, and the jobs they share at home.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE1_LESSONS: Lesson[] = [
  /* ===================================================== MATHEMATICS ==== */
  {
    id: 'g1-math-counting-l1',
    topicId: 'g1-math-counting',
    subjectId: 'mathematics',
    grade: 1,
    title: 'Counting to 20',
    estimatedMinutes: 10,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Count up to 20 things, one at a time.'},
      {id: 'o2', text: 'Write the number that says how many.'},
      {id: 'o3', text: 'Say which of two groups has more.'},
    ],
    keyTerms: [
      {term: 'Count', definition: 'To say the numbers in order while you point at things, one by one.'},
      {term: 'How many', definition: 'The number you say last when you finish counting.'},
      {term: 'More', definition: 'A bigger amount. The group you would rather have if you like mangoes.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'You will learn to count things up to 20.\n\nYou will learn to write the number.\n\nYou will learn to say which group has more.',
      },
      {
        heading: 'Counting means pointing',
        body: 'Counting is not just saying numbers fast.\n\nTouch one thing. Say one number.\n\nLike this, with five stones:\n\n    stone   stone   stone   stone   stone\n      1       2       3       4       5\n\nOne stone, one number. Never two numbers for one stone. Never two stones for one number.\n\nThe last number you say is how many. Here it is 5. There are 5 stones.',
      },
      {
        heading: 'The numbers to 20',
        body: 'Say them out loud:\n\n    1  2  3  4  5\n    6  7  8  9  10\n\n    11  12  13  14  15\n    16  17  18  19  20\n\nSay them again. Point at each one as you say it.\n\nThe hard ones are 11, 12, 13. They do not sound like the others. You just have to learn them.',
        example: 'Counting mangoes in a basket.\n\nA basket has some mangoes. You want to know how many.\n\nTake them out one at a time. Say a number each time you take one out:\n\n    1 ... 2 ... 3 ... 4 ... 5 ... 6 ... 7\n\nYou stop. There are no more mangoes.\n\nThe last number you said was 7.\n\nSo there are 7 mangoes.',
      },
      {
        heading: 'Which group has more?',
        body: 'You have 4 stones. Your friend has 7 stones.\n\nWho has more?\n\nCount up. 4 comes first. Then 5, 6, 7.\n\n7 comes later than 4.\n\nThe number that comes later is more.\n\nSo your friend has more.',
      },
      {
        heading: 'Try it yourself',
        body: 'Use real things. Stones, seeds, bottle tops — anything you can hold.\n\n1. Put out 6 stones. Count them by pointing. What number do you say last?\n\n2. Put out 9 stones. Now put out 3 more. Count them all. How many now?\n\n3. One hand has 5 fingers. Two hands have how many?\n\n4. You have 8 seeds. Your friend has 5 seeds. Who has more?',
      },
      {
        heading: 'Summary',
        body: '• Touch one thing, say one number.\n• The last number you say is how many.\n• Count in order: 1 to 20.\n• The number that comes later is more.',
      },
    ],
  },

  /* ========================================================= ENGLISH ==== */
  {
    id: 'g1-eng-letter-sounds-l1',
    topicId: 'g1-eng-letter-sounds',
    subjectId: 'english',
    grade: 1,
    title: 'Letter Sounds',
    estimatedMinutes: 10,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Hear the first sound in a spoken word.'},
      {id: 'o2', text: 'Name the letter that makes that sound.'},
      {id: 'o3', text: 'Say the sounds in a short word and join them together.'},
    ],
    keyTerms: [
      {term: 'Letter', definition: 'A mark we write, like a, b or c.'},
      {term: 'Sound', definition: 'What you hear when you say a letter out loud.'},
      {term: 'Word', definition: 'Sounds joined together that mean something, like cat.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Letters have sounds.\n\nYou will learn to hear the first sound in a word.\n\nYou will learn to join sounds to make a word.',
      },
      {
        heading: 'A letter has a name and a sound',
        body: 'The letter m has a name. We call it "em".\n\nBut it makes a different noise: mmmmm.\n\nThat noise is its SOUND.\n\nWhen you read, you use the sound, not the name.\n\nTry these. Say the sound out loud:\n\n    m  says  mmmm\n    s  says  sssss\n    t  says  t\n    a  says  a  (like in cat)',
      },
      {
        heading: 'The first sound',
        body: 'Say this word slowly: mmmmat.\n\nWhat did you hear first?\n\nYou heard mmmm.\n\nThat is the letter m.\n\nSo mat begins with m.\n\nTry it with your own name. Say it slowly. What sound comes first?',
        example: 'Finding the first sound in sun.\n\nSay it slowly. Stretch the beginning:\n\n    sssssun\n\nThe first sound is sss.\n\nWhich letter says sss?\n\nThe letter s.\n\nSo sun begins with s.\n\nNow try pot. Say it slowly: p-ot. The first sound is p. So pot begins with p.',
      },
      {
        heading: 'Joining sounds to read a word',
        body: 'A short word is just a few sounds stuck together.\n\nTake the word cat. It has three sounds:\n\n    c ... a ... t\n\nSay them one at a time. Slowly.\n\nNow say them faster. And faster.\n\n    c-a-t ... cat\n\nYou read the word.\n\nThat is all reading is. Sounds, joined up.',
      },
      {
        heading: 'Try it yourself',
        body: 'Say every word out loud. Slowly first.\n\n1. What is the first sound in map?\n\n2. What is the first sound in ten?\n\n3. Join these sounds and say the word: s ... i ... t\n\n4. Join these sounds and say the word: p ... e ... n\n\n5. Say your own name slowly. What is the first sound?',
      },
      {
        heading: 'Summary',
        body: '• A letter has a name and a sound.\n• When you read, you use the sound.\n• Say a word slowly to hear its first sound.\n• Join the sounds together and you have read the word.',
      },
    ],
  },

  /* ================================================= GENERAL SCIENCE ==== */
  {
    id: 'g1-sci-senses-l1',
    topicId: 'g1-sci-senses',
    subjectId: 'general-science',
    grade: 1,
    title: 'The Five Senses',
    estimatedMinutes: 10,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Name the five senses.'},
      {id: 'o2', text: 'Say which body part does each sense.'},
      {id: 'o3', text: 'Say which sense you would use to find something out.'},
    ],
    keyTerms: [
      {term: 'Sense', definition: 'A way your body finds out about the world around you.'},
      {term: 'Sight', definition: 'Seeing. You do it with your eyes.'},
      {term: 'Hearing', definition: 'Hearing sounds. You do it with your ears.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Your body has five senses.\n\nEach one uses a different body part.\n\nYou will learn all five.',
      },
      {
        heading: 'The five senses',
        body: 'Here they are:\n\n    I see    with my  EYES\n    I hear   with my  EARS\n    I smell  with my  NOSE\n    I taste  with my  TONGUE\n    I touch  with my  SKIN\n\nFive senses. Five body parts.\n\nTouch each part as you say it. Eyes. Ears. Nose. Tongue. Skin.',
      },
      {
        heading: 'Senses work together',
        body: 'Think about a mango.\n\nYou SEE that it is yellow. That is your eyes.\n\nYou SMELL that it is sweet. That is your nose.\n\nYou TOUCH it and feel that it is soft. That is your skin.\n\nYou TASTE it. That is your tongue.\n\nFour senses, one mango.\n\nYour senses work together to tell you about one thing.',
        example: 'Which sense tells you the rain has started?\n\nYou are inside the house. You cannot see outside.\n\nYou HEAR it. Drops hitting the roof.\n\nThat is your ears. Hearing.\n\nNow you go outside. You FEEL the drops on your arm.\n\nThat is your skin. Touch.\n\nTwo different senses told you about the same rain.',
      },
      {
        heading: 'Try it yourself',
        body: 'Answer out loud.\n\n1. Which body part do you use to hear a bird?\n\n2. Close your eyes. Which sense can you not use now?\n\n3. Which sense tells you that food is salty?\n\n4. Someone is cooking rice in the next room. Which sense tells you?\n\n5. Name all five senses without looking.',
      },
      {
        heading: 'Summary',
        body: '• You have five senses.\n• Eyes see. Ears hear. Nose smells. Tongue tastes. Skin touches.\n• Your senses tell you about the world.\n• More than one sense can tell you about the same thing.',
      },
    ],
  },

  /* ================================================== SOCIAL STUDIES ==== */
  {
    id: 'g1-soc-family-l1',
    topicId: 'g1-soc-family',
    subjectId: 'social-studies',
    grade: 1,
    title: 'My Family',
    estimatedMinutes: 10,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Name the people who live in a home.'},
      {id: 'o2', text: 'Say one job that people share at home.'},
      {id: 'o3', text: 'Say why families help each other.'},
    ],
    keyTerms: [
      {term: 'Family', definition: 'The people who care for you and who you belong to.'},
      {term: 'Home', definition: 'The place where you live and sleep.'},
      {term: 'Share', definition: 'To do something together, or give some to someone else.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'You will learn who is in a family.\n\nYou will learn about jobs at home.\n\nYou will learn why families help each other.',
      },
      {
        heading: 'Families are not all the same',
        body: 'Some children live with a mother and a father.\n\nSome live with one parent.\n\nSome live with a grandmother, or an aunt, or an older sister.\n\nSome homes have many children. Some have one.\n\nAll of these are families.\n\nA family is not one shape. A family is the people who care for you.',
      },
      {
        heading: 'Jobs at home',
        body: 'A home has work to do every day.\n\nSomeone fetches water.\n\nSomeone cooks the food.\n\nSomeone washes the clothes.\n\nSomeone sweeps the floor.\n\nSomeone looks after the small children.\n\nIf one person did all of it, that person would be very tired. So the work is shared.\n\nEven a small child can help. Carrying a cup. Holding a baby\'s hand.',
        example: 'One evening in a home.\n\nThe sun is going down. There is a lot to do before dark.\n\nThe older brother fetches the water.\n\nThe mother starts the fire and cooks.\n\nThe small sister sweeps the step. It takes her a long time, but she does it.\n\nThe grandmother holds the baby so the mother can cook.\n\nFour people. Four jobs. Everyone eats.\n\nIf nobody had fetched water, nobody would have eaten. Every job mattered.',
      },
      {
        heading: 'Why families help each other',
        body: 'Nobody can do everything alone.\n\nA baby cannot cook.\n\nA small child cannot carry a heavy bucket.\n\nSomeone who is sick cannot sweep.\n\nSo people do what they can, and others do the rest.\n\nThat is what helping means. You do your part. Someone else does theirs.',
      },
      {
        heading: 'Try it yourself',
        body: 'Think about your own home. Answer out loud.\n\n1. Who lives in your home?\n\n2. Name one job that gets done at your home every day.\n\n3. Who does that job?\n\n4. What is one job you could help with?\n\n5. Why is it better when the work is shared?',
      },
      {
        heading: 'Summary',
        body: '• A family is the people who care for you.\n• Families come in many shapes.\n• A home has work to do every day.\n• The work is shared, so nobody is too tired.\n• Everyone can help with something.',
      },
    ],
  },
];
