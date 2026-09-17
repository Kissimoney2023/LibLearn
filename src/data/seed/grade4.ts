import type {Lesson, Topic, Unit} from '../../types/domain';

/**
 * GRADE 4 TEACHING CONTENT — LibLearn Teaching Sequence v1
 *
 * Provenance `liblearn`, same as every other grade: standard primary material,
 * not a reproduction of the Liberian national curriculum.
 *
 * Written for readers of about nine or ten, which changes how it has to be
 * written, not just what it says:
 *
 *   - Short sentences. One idea at a time.
 *   - Every abstract rule arrives AFTER a concrete example, never before.
 *   - Examples use things a child in Liberia handles: coins, rice, mangoes,
 *     market stalls. Not because a worked example must be local to be correct,
 *     but because a child who can picture the situation can check whether the
 *     answer is sensible - and that habit is most of primary mathematics.
 *
 * The Social Studies lesson teaches map-reading with an invented village,
 * deliberately. Naming real Liberian towns, counties or distances would be
 * asserting geography nobody here has verified, and a nine-year-old has no way
 * to tell a checked fact from a confident guess.
 */

const V = 'liblearn-v1';

export const GRADE4_UNITS: Unit[] = [
  {id: 'g4-math-u-numbers', subjectId: 'mathematics', grade: 4, order: 1,
   name: 'Numbers and Place Value',
   summary: 'What each digit in a number is worth, and how to compare numbers.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g4-math-u-operations', subjectId: 'mathematics', grade: 4, order: 2,
   name: 'Multiplication and Division',
   summary: 'Working with equal groups, and sharing things out fairly.',
   curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g4-eng-u-words', subjectId: 'english', grade: 4, order: 1,
   name: 'Words and Their Jobs',
   summary: 'The different jobs words do in a sentence.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g4-eng-u-sentences', subjectId: 'english', grade: 4, order: 2,
   name: 'Building Sentences',
   summary: 'Putting words together so they make complete sense.',
   curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g4-sci-u-living', subjectId: 'general-science', grade: 4, order: 1,
   name: 'Living Things',
   summary: 'What makes something alive, and how living things are grouped.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g4-sci-u-plants', subjectId: 'general-science', grade: 4, order: 2,
   name: 'Plants',
   summary: 'The parts of a plant and the job each part does.',
   curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g4-soc-u-community', subjectId: 'social-studies', grade: 4, order: 1,
   name: 'Maps and My Community',
   summary: 'Reading maps, and how people in a community depend on each other.',
   curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE4_TOPICS: Topic[] = [
  {id: 'g4-math-place-value', unitId: 'g4-math-u-numbers', subjectId: 'mathematics', grade: 4,
   name: 'Place Value to Thousands',
   summary: 'Why the 5 in 500 is worth more than the 5 in 50.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g4-math-multiplication', unitId: 'g4-math-u-operations', subjectId: 'mathematics', grade: 4,
   name: 'Multiplication',
   summary: 'A faster way to add the same number many times.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g4-eng-nouns-verbs', unitId: 'g4-eng-u-words', subjectId: 'english', grade: 4,
   name: 'Nouns and Verbs',
   summary: 'Naming words and doing words, and how to spot each one.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g4-eng-sentences', unitId: 'g4-eng-u-sentences', subjectId: 'english', grade: 4,
   name: 'Complete Sentences',
   summary: 'What every sentence needs before it is finished.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g4-sci-living', unitId: 'g4-sci-u-living', subjectId: 'general-science', grade: 4,
   name: 'Living and Non-Living Things',
   summary: 'How to tell what is alive from what has never been alive.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g4-sci-plants', unitId: 'g4-sci-u-plants', subjectId: 'general-science', grade: 4,
   name: 'Parts of a Plant',
   summary: 'Roots, stem, leaves, flower — and what each one does.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},

  {id: 'g4-soc-maps', unitId: 'g4-soc-u-community', subjectId: 'social-studies', grade: 4,
   name: 'Reading a Map',
   summary: 'Using a key, directions and symbols to find your way.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE4_LESSONS: Lesson[] = [
  /* ===================================================== MATHEMATICS ==== */
  {
    id: 'g4-math-place-value-l1',
    topicId: 'g4-math-place-value',
    subjectId: 'mathematics',
    grade: 4,
    title: 'Place Value to Thousands',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Say what each digit in a number is worth.'},
      {id: 'o2', text: 'Write a number in expanded form.'},
      {id: 'o3', text: 'Compare two numbers and say which is bigger.'},
    ],
    keyTerms: [
      {term: 'Digit', definition: 'One single number symbol: 0, 1, 2, 3, 4, 5, 6, 7, 8 or 9.'},
      {term: 'Place value', definition: 'What a digit is worth because of where it sits in the number.'},
      {term: 'Expanded form', definition: 'A number written as the sum of what each digit is worth.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'The same digit can be worth very different amounts. By the end of this lesson you will be able to look at any number up to 9999 and say exactly what each digit is worth.',
      },
      {
        heading: 'The same digit, different value',
        body: 'Look at these two numbers:\n\n    50        500\n\nBoth have a 5. But they are not the same.\n\nIn 50, the 5 means five tens. That is 50.\nIn 500, the 5 means five hundreds. That is 500.\n\nThe 5 did not change. Its POSITION changed. That is the whole idea of place value: where a digit sits tells you what it is worth.',
      },
      {
        heading: 'The four places',
        body: 'For numbers up to 9999 there are four places. Reading from the right:\n\n    Thousands | Hundreds | Tens | Ones\n\nTake the number 3472:\n\n    3 is in the thousands place → 3000\n    4 is in the hundreds place  → 400\n    7 is in the tens place      → 70\n    2 is in the ones place      → 2\n\nAdd them up: 3000 + 400 + 70 + 2 = 3472. That is where the number comes from.',
        example: 'Writing 2605 in expanded form.\n\nStart from the left and name each place:\n\n    2 thousands = 2000\n    6 hundreds  = 600\n    0 tens      = 0\n    5 ones      = 5\n\nSo 2605 = 2000 + 600 + 0 + 5\n\nThe zero matters. It is holding the tens place open. Without it you would write 265, which is a completely different number.',
      },
      {
        heading: 'Comparing numbers',
        body: 'To compare two numbers, do not look at the whole thing at once. Start from the LEFT and compare one place at a time.\n\nWhich is bigger, 4218 or 4231?\n\n    Thousands: 4 and 4. The same. Keep going.\n    Hundreds:  2 and 2. The same. Keep going.\n    Tens:      1 and 3. Different! 3 is bigger.\n\nSo 4231 is bigger. You can stop there — once you find a difference, the rest does not matter.',
      },
      {
        heading: 'Try it yourself',
        body: '1. What is the 7 worth in 4700?\n2. Write 5083 in expanded form. Be careful with the zero.\n3. Which is bigger, 3990 or 3909? Compare one place at a time.\n4. I am a number. I have 6 hundreds, 0 tens and 4 ones. What number am I?',
      },
      {
        heading: 'Summary',
        body: '• A digit is worth different amounts in different places.\n• The four places are thousands, hundreds, tens, ones.\n• Expanded form shows what each digit is worth, added together.\n• Zero holds a place open. Do not leave it out.\n• To compare, start from the left and stop at the first difference.',
      },
    ],
  },
  {
    id: 'g4-math-multiplication-l1',
    topicId: 'g4-math-multiplication',
    subjectId: 'mathematics',
    grade: 4,
    title: 'Multiplication as Equal Groups',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Explain multiplication as adding equal groups.'},
      {id: 'o2', text: 'Write a multiplication sentence from a picture or story.'},
      {id: 'o3', text: 'Use the fact that order does not change the answer.'},
    ],
    keyTerms: [
      {term: 'Multiply', definition: 'To add the same number a certain number of times.'},
      {term: 'Product', definition: 'The answer you get when you multiply.'},
      {term: 'Equal groups', definition: 'Groups that all have the same number in them.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Multiplication is not a new kind of maths. It is a faster way of doing addition you already know.',
      },
      {
        heading: 'Where multiplication comes from',
        body: 'A woman sells mangoes in piles. Each pile has 4 mangoes. She has 3 piles.\n\nHow many mangoes altogether?\n\nYou could add:\n\n    4 + 4 + 4 = 12\n\nThat works. But if she had 30 piles, adding 4 thirty times would take a long time.\n\nSo instead we write:\n\n    3 × 4 = 12\n\nRead it as "3 groups of 4". The × sign means "groups of". Multiplication is just a short way of writing repeated addition.',
      },
      {
        heading: 'Reading the two numbers',
        body: 'In 3 × 4 = 12:\n\n    3 tells you HOW MANY groups\n    4 tells you HOW MANY are in each group\n    12 is the answer, called the product\n\nEvery group must have the SAME amount. If one pile had 4 mangoes and another had 5, you could not multiply — you would have to add.',
        example: 'A story into a multiplication sentence.\n\n"Five children each carry 6 stones. How many stones altogether?"\n\nStep 1 — How many groups? There are 5 children, so 5 groups.\nStep 2 — How many in each group? 6 stones each.\nStep 3 — Write it:\n\n    5 × 6 = 30\n\nStep 4 — Check by adding:\n    6 + 6 + 6 + 6 + 6 = 30 ✓\n\nThirty stones.',
      },
      {
        heading: 'Order does not matter',
        body: 'Here is something useful:\n\n    3 × 4 = 12\n    4 × 3 = 12\n\nThe answer is the same both ways.\n\nPicture it. Three rows of four dots:\n\n    • • • •\n    • • • •\n    • • • •\n\nNow turn the picture on its side. It becomes four rows of three. The dots did not move — you only looked from a different direction. So the total cannot change.\n\nThis is genuinely useful. If you know 2 × 9, you already know 9 × 2. Learning one fact gives you two.',
      },
      {
        heading: 'Try it yourself',
        body: '1. Write 7 + 7 + 7 + 7 as a multiplication sentence, then find the answer.\n2. There are 8 desks. Each desk has 2 pupils. How many pupils?\n3. If you know 6 × 5 = 30, what is 5 × 6? How do you know without working it out?\n4. Draw 4 rows of 3 dots. How many dots? Now turn your paper sideways. What multiplication does it show?',
      },
      {
        heading: 'Summary',
        body: '• Multiplication is repeated addition of EQUAL groups.\n• In 3 × 4, the 3 is how many groups and the 4 is how many in each.\n• The answer is called the product.\n• Order does not change the answer: 3 × 4 = 4 × 3.\n• If the groups are not equal, you must add instead.',
      },
    ],
  },

  /* ========================================================= ENGLISH ==== */
  {
    id: 'g4-eng-nouns-verbs-l1',
    topicId: 'g4-eng-nouns-verbs',
    subjectId: 'english',
    grade: 4,
    title: 'Naming Words and Doing Words',
    estimatedMinutes: 11,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Find the nouns in a sentence.'},
      {id: 'o2', text: 'Find the verb in a sentence.'},
      {id: 'o3', text: 'Use a test to check whether a word is a noun or a verb.'},
    ],
    keyTerms: [
      {term: 'Noun', definition: 'A word that names a person, place, animal or thing.'},
      {term: 'Verb', definition: 'A word that tells what someone or something does.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Every word in a sentence has a job. Two of the most important jobs are naming and doing. Once you can spot those two, sentences make much more sense.',
      },
      {
        heading: 'Nouns name things',
        body: 'A NOUN names something. It can be:\n\n    a person — teacher, mother, Musu\n    a place  — market, school, river\n    an animal — goat, fish, bird\n    a thing  — book, rice, chair\n\nA quick test: can you put "a", "an" or "the" in front of it and does it still sound right?\n\n    the book ✓ — so "book" is a noun\n    the jump ✗ — "jump" is not usually a noun',
      },
      {
        heading: 'Verbs tell what happens',
        body: 'A VERB tells what someone or something does.\n\n    run, eat, write, sleep, carry, laugh\n\nIn this sentence:\n\n    The boy carries water.\n\n    "boy"   — names a person → noun\n    "water" — names a thing  → noun\n    "carries" — tells what he does → verb\n\nA quick test: can you put "I" or "she" in front of it?\n\n    she carries ✓ — so "carries" is a verb\n    she book ✗   — so "book" is not a verb',
        example: 'Finding both in one sentence.\n\n    The farmer plants cassava.\n\nAsk two questions, in order:\n\nWho or what is this about?\n    The farmer. That names a person → NOUN\n\nWhat does the farmer do?\n    Plants. That is the action → VERB\n\nIs anything else named?\n    Cassava. That names a thing → NOUN\n\nSo: farmer (noun), plants (verb), cassava (noun).',
      },
      {
        heading: 'One word, two jobs',
        body: 'Careful — some words can do either job. Look at what the word is DOING in that sentence, not just the word by itself.\n\n    I drink water.        Here "drink" is a verb. It tells the action.\n    Bring me a drink.     Here "drink" is a noun. It names a thing.\n\nSame word. Different job. This is why you test the word inside its sentence.',
      },
      {
        heading: 'Try it yourself',
        body: 'Find the nouns and the verb in each sentence:\n\n1. The goat eats grass.\n2. My sister sweeps the yard.\n3. Children play football.\n\nThen: write your own sentence with two nouns and one verb.',
      },
      {
        heading: 'Summary',
        body: '• A noun names a person, place, animal or thing.\n• A verb tells what someone or something does.\n• Noun test: does "the" fit in front of it?\n• Verb test: does "she" fit in front of it?\n• Some words can be either — check the job it does in THAT sentence.',
      },
    ],
  },
  {
    id: 'g4-eng-sentences-l1',
    topicId: 'g4-eng-sentences',
    subjectId: 'english',
    grade: 4,
    title: 'What Makes a Complete Sentence',
    estimatedMinutes: 11,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Say the two things every sentence must have.'},
      {id: 'o2', text: 'Tell a complete sentence from an incomplete one.'},
      {id: 'o3', text: 'Use a capital letter and a full stop correctly.'},
    ],
    keyTerms: [
      {term: 'Sentence', definition: 'A group of words that makes complete sense on its own.'},
      {term: 'Subject', definition: 'Who or what the sentence is about.'},
      {term: 'Full stop', definition: 'The dot (.) that shows a sentence has ended.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Some groups of words are finished. Others leave you waiting for more. This lesson shows you how to tell the difference, and how to fix the unfinished ones.',
      },
      {
        heading: 'Two things every sentence needs',
        body: 'A complete sentence needs:\n\n    1. A SUBJECT — who or what it is about\n    2. A VERB — what they do\n\nLook:\n\n    The dog barks.\n\n    Subject: the dog\n    Verb: barks\n\nIt is finished. You are not left waiting.\n\nNow look at this:\n\n    The dog in the yard.\n\nWho is it about? The dog. Good.\nWhat does the dog do? …nothing is said.\n\nYou are left waiting. It is not a sentence yet.',
      },
      {
        heading: 'The waiting test',
        body: 'Read the words out loud. When you stop, do you feel finished, or do you feel like something is missing?\n\n    Running to the market.        → Who is running? MISSING\n    Musu is running to the market. → Finished ✓\n\n    Because it rained.            → Because it rained, what? MISSING\n    We stayed inside because it rained. → Finished ✓\n\nThat feeling of waiting is real information. Trust it.',
        example: 'Fixing three incomplete groups.\n\n1. "The tall boy."\n   Has a subject, no verb. Add one:\n   → The tall boy waved.\n\n2. "Sings every morning."\n   Has a verb, no subject. Add one:\n   → My mother sings every morning.\n\n3. "After we ate."\n   Leaves you waiting. Finish the thought:\n   → After we ate, we washed the plates.\n\nEach fix adds the missing part. Nothing else changed.',
      },
      {
        heading: 'Capital letter and full stop',
        body: 'Every sentence starts with a CAPITAL letter and ends with a FULL STOP.\n\n    wrong:  the rain stopped\n    right:  The rain stopped.\n\nThink of them as a door. The capital opens the sentence, the full stop closes it. Without them the reader cannot tell where one idea ends and the next begins.',
      },
      {
        heading: 'Try it yourself',
        body: 'Which of these are complete sentences? Fix the ones that are not:\n\n1. The market is busy.\n2. Walking down the road.\n3. My brother.\n4. We carried the water home.\n5. When the sun set.',
      },
      {
        heading: 'Summary',
        body: '• Every sentence needs a subject and a verb.\n• Read it aloud: if you feel like you are waiting, it is not finished.\n• Missing subject → add who or what.\n• Missing verb → add what they do.\n• Start with a capital letter, end with a full stop.',
      },
    ],
  },

  /* ================================================ GENERAL SCIENCE ===== */
  {
    id: 'g4-sci-living-l1',
    topicId: 'g4-sci-living',
    subjectId: 'general-science',
    grade: 4,
    title: 'Living and Non-Living Things',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'List the things all living things do.'},
      {id: 'o2', text: 'Sort things into living and non-living.'},
      {id: 'o3', text: 'Explain why moving does not always mean alive.'},
    ],
    keyTerms: [
      {term: 'Living', definition: 'Something that grows, feeds, breathes, moves and produces young.'},
      {term: 'Non-living', definition: 'Something that has never been alive.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'It seems easy to say what is alive. But a river moves and is not alive, while a seed sits still and is. This lesson gives you a proper test instead of a guess.',
      },
      {
        heading: 'What all living things do',
        body: 'Living things all do these:\n\n    They GROW — they get bigger over time\n    They FEED — they take in food\n    They BREATHE — they take in air\n    They MOVE — even plants turn towards light\n    They MAKE YOUNG — they produce more of their own kind\n    They RESPOND — they react to what is around them\n\nA goat does all six. A tree does all six, just more slowly than you would notice by watching.\n\nA stone does none.',
      },
      {
        heading: 'Why "it moves" is not enough',
        body: 'This is the part people get wrong most often.\n\nA river moves. A car moves. Smoke moves. None of them is alive.\n\nWhy not? Because moving is only ONE of the six. A river does not grow, does not feed, does not make young rivers.\n\nA car is a good test case. It moves, and it even takes in fuel. But it does not grow, it cannot heal, and no car has ever produced a baby car. It fails most of the list, so it is not alive.\n\nSo do not use one sign. Check the whole list.',
        example: 'Sorting four things.\n\nMANGO TREE\n  Grows ✓  Feeds ✓  Breathes ✓  Makes seeds ✓\n  → LIVING\n\nRIVER\n  Moves ✓  Grows ✗  Feeds ✗  Makes young ✗\n  → NON-LIVING. Movement alone is not enough.\n\nCHICKEN\n  All six ✓\n  → LIVING\n\nWOODEN CHAIR\n  Does nothing on the list now.\n  → It is made from a tree that WAS alive, but the chair itself is not alive.',
      },
      {
        heading: 'A tricky group',
        body: 'Some things were once part of a living thing but are not alive now: a wooden chair, a leather shoe, dried rice.\n\nThey came from something living. They are not living now. The test is always what the thing does TODAY — not where it came from.',
      },
      {
        heading: 'Try it yourself',
        body: 'Living or non-living? Give your reason using the list:\n\n1. A cloud\n2. A seed in the ground\n3. A bicycle\n4. Grass\n5. A fire\n\nNumber 5 is worth thinking hard about. Fire moves, spreads and needs air — but does it grow the way a living thing grows? Does it make young?',
      },
      {
        heading: 'Summary',
        body: '• Living things grow, feed, breathe, move, make young and respond.\n• Check the WHOLE list, not one sign.\n• Moving does not mean alive — rivers, cars and smoke all move.\n• Something made from a living thing is not itself alive.',
      },
    ],
  },
  {
    id: 'g4-sci-plants-l1',
    topicId: 'g4-sci-plants',
    subjectId: 'general-science',
    grade: 4,
    title: 'Parts of a Plant and What They Do',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Name the main parts of a plant.'},
      {id: 'o2', text: 'Say what job each part does.'},
      {id: 'o3', text: 'Explain why a plant needs all its parts together.'},
    ],
    keyTerms: [
      {term: 'Roots', definition: 'The parts under the ground that hold the plant and take in water.'},
      {term: 'Stem', definition: 'The part that holds the plant up and carries water to the leaves.'},
      {term: 'Leaf', definition: 'The flat green part where the plant makes its food.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'A plant is not one lump. It is a set of parts, each doing a different job, and each needing the others.',
      },
      {
        heading: 'The four main parts',
        body: 'ROOTS — under the ground.\n  They hold the plant firm so wind does not blow it over,\n  and they take in water from the soil.\n\nSTEM — the upright part.\n  It holds the plant up towards the light,\n  and carries water from the roots to the leaves.\n\nLEAVES — the flat green parts.\n  This is where the plant makes its own food, using sunlight.\n\nFLOWER — where seeds are made.\n  Seeds grow into new plants.',
      },
      {
        heading: 'The parts need each other',
        body: 'Here is the important idea. No part can do its job alone.\n\nThe leaves make the food — but they cannot make it without water, and they cannot fetch water themselves.\nThe roots fetch the water — but they are underground in the dark and cannot make food.\nThe stem carries the water up — but it neither fetches nor makes anything.\n\nSo: roots fetch, stem carries, leaves make. Take away any one and the plant dies, even though the other two are unharmed.\n\nThis is why a cutting with no roots wilts, and why a plant kept in the dark dies even when it is watered every day.',
        example: 'Why a plant in a dark room dies.\n\nYou water it every morning. The soil is damp. Nothing is broken.\n\nRoots — working. Taking in water ✓\nStem — working. Carrying water up ✓\nLeaves — CANNOT WORK. They need sunlight to make food ✗\n\nTwo parts out of three are fine, and the plant still dies of hunger, standing in wet soil.\n\nWater and food are not the same thing. This catches people out.',
      },
      {
        heading: 'Try it yourself',
        body: '1. Which part takes in water from the soil?\n2. Why would a plant fall over if its roots were cut?\n3. A plant is in bright sun but has not been watered for a week. Which part cannot do its job, and why does that stop the leaves working too?\n4. Name a plant part people eat. (Cassava, potato, spinach — which part is each one?)',
      },
      {
        heading: 'Summary',
        body: '• Roots hold the plant and take in water.\n• The stem holds it up and carries water to the leaves.\n• Leaves make food using sunlight.\n• Flowers make seeds for new plants.\n• Every part depends on the others — remove one and the plant dies.',
      },
    ],
  },

  /* ================================================== SOCIAL STUDIES ==== */
  {
    id: 'g4-soc-maps-l1',
    topicId: 'g4-soc-maps',
    subjectId: 'social-studies',
    grade: 4,
    title: 'Reading a Map',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Use a map key to understand symbols.'},
      {id: 'o2', text: 'Name the four main directions.'},
      {id: 'o3', text: 'Describe where one place is compared to another.'},
    ],
    keyTerms: [
      {term: 'Map', definition: 'A drawing of a place as it would look from above.'},
      {term: 'Key', definition: 'The list that explains what each symbol on a map means.'},
      {term: 'Compass directions', definition: 'North, South, East and West.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'A map lets you understand a place you are standing in, or one you have never been to, by looking at it from above.\n\nThe map in this lesson shows an invented village, not a real one. It is for practising the skill — for real places, use a real map.',
      },
      {
        heading: 'A map is a view from above',
        body: 'Imagine standing on the roof of a tall building and looking straight down. Roads become lines. Houses become squares. The river becomes a winding band.\n\nThat is a map: everything drawn small, seen from above, in the right positions relative to each other.\n\nThings on a map are much smaller than in real life, but they keep their correct positions. If the school is north of the market in real life, it is north of the market on the map.',
      },
      {
        heading: 'The key explains the symbols',
        body: 'Maps use small pictures called symbols, because there is no room to write everything out. The KEY tells you what each one means:\n\n    ▲  = school\n    ●  = house\n    ═  = main road\n    ~  = river\n    +  = clinic\n\nAlways read the key FIRST. The same symbol can mean different things on different maps, so guessing is a mistake even when the guess seems obvious.',
      },
      {
        heading: 'The four directions',
        body: 'Maps almost always have North at the top. Then:\n\n           North\n             ↑\n    West ←       → East\n             ↓\n           South\n\nA sentence that helps people remember the order going clockwise from the top: **N**ever **E**at **S**our **W**orms — North, East, South, West.\n\nIf you know which way is North, you know all four.',
        example: 'Describing a position.\n\nOn a village map, the clinic is drawn ABOVE the market, and slightly to the RIGHT.\n\nAbove means North. Right means East.\n\nSo: "The clinic is north-east of the market."\n\nAnd the other way round: if the clinic is north-east of the market, then the market is SOUTH-WEST of the clinic — the exact opposite direction.\n\nDirection always depends on which place you start from. That is why we say "north of the market" and not just "north".',
      },
      {
        heading: 'Try it yourself',
        body: 'Draw a simple map of your school or your home area, seen from above.\n\n1. Draw at least four things: buildings, a road, a tree, a path.\n2. Use a symbol for each, and make a key explaining them.\n3. Mark North at the top.\n4. Then write two sentences: "The ___ is ___ of the ___."\n\nSwap with a friend. Can they read your map using only your key?',
      },
      {
        heading: 'Summary',
        body: '• A map shows a place from above, smaller but in the right positions.\n• The key explains the symbols — read it first, never guess.\n• North is usually at the top: North, East, South, West going clockwise.\n• Directions are always relative: if A is north of B, then B is south of A.',
      },
    ],
  },
];
