import type {Lesson, Topic, Unit} from '../../types/domain';

/**
 * GRADE 5 TEACHING CONTENT — LibLearn Teaching Sequence v1
 *
 * Provenance `liblearn`: standard upper-primary material, not a reproduction
 * of the Liberian national curriculum.
 *
 * Grade 5 sits between the concrete work of Grade 4 and the abstraction of
 * junior secondary, so each lesson here starts from something physical — a
 * cut fruit, a puddle drying — and only then names the rule.
 */

const V = 'liblearn-v1';

export const GRADE5_UNITS: Unit[] = [
  {id: 'g5-math-u-fractions', subjectId: 'mathematics', grade: 5, order: 1,
   name: 'Fractions', summary: 'Parts of a whole, and when two different fractions are the same size.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g5-eng-u-writing', subjectId: 'english', grade: 5, order: 1,
   name: 'Writing Clearly', summary: 'Organising your ideas so a reader can follow them.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g5-sci-u-earth', subjectId: 'general-science', grade: 5, order: 1,
   name: 'Water and Weather', summary: 'How water moves around the Earth and returns as rain.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g5-soc-u-resources', subjectId: 'social-studies', grade: 5, order: 1,
   name: 'Resources and Work', summary: 'What a country has, and how people use it to live.',
   curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE5_TOPICS: Topic[] = [
  {id: 'g5-math-equivalent', unitId: 'g5-math-u-fractions', subjectId: 'mathematics', grade: 5,
   name: 'Equivalent Fractions', summary: 'Why 1/2 and 2/4 are the same amount written two ways.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g5-eng-paragraph', unitId: 'g5-eng-u-writing', subjectId: 'english', grade: 5,
   name: 'Paragraphs', summary: 'Grouping sentences so each paragraph makes one point.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g5-sci-water-cycle', unitId: 'g5-sci-u-earth', subjectId: 'general-science', grade: 5,
   name: 'The Water Cycle', summary: 'Evaporation, condensation and rainfall, and why water never runs out.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g5-soc-resources', unitId: 'g5-soc-u-resources', subjectId: 'social-studies', grade: 5,
   name: 'Natural Resources', summary: 'What natural resources are, and why some can run out.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE5_LESSONS: Lesson[] = [
  {
    id: 'g5-math-equivalent-l1', topicId: 'g5-math-equivalent', subjectId: 'mathematics', grade: 5,
    title: 'Equivalent Fractions', estimatedMinutes: 13, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Explain what makes two fractions equivalent.'},
      {id: 'o2', text: 'Make equivalent fractions by multiplying or dividing.'},
      {id: 'o3', text: 'Simplify a fraction to its lowest terms.'},
    ],
    keyTerms: [
      {term: 'Numerator', definition: 'The top number — how many parts you have.'},
      {term: 'Denominator', definition: 'The bottom number — how many equal parts the whole was cut into.'},
      {term: 'Equivalent fractions', definition: 'Different fractions that are the same amount.'},
      {term: 'Simplify', definition: 'To write a fraction with the smallest numbers possible.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Two fractions can look completely different and still be exactly the same amount. By the end of this lesson you will be able to make equivalent fractions and simplify them.'},
      {heading: 'Start with something you can see',
       body: 'Take an orange and cut it into 2 equal pieces. Eat 1 piece. You ate 1/2.\n\nTake the same size orange and cut it into 4 equal pieces. Eat 2 pieces. You ate 2/4.\n\nDid you eat more the second time?\n\nNo. You ate exactly the same amount. The orange was just cut differently.\n\n    1/2 = 2/4\n\nThat is what EQUIVALENT means: different numbers, same amount.'},
      {heading: 'Making equivalent fractions',
       body: 'To make an equivalent fraction, multiply the top AND the bottom by the same number.\n\n    1/2 → multiply both by 2 → 2/4\n    1/2 → multiply both by 3 → 3/6\n    1/2 → multiply both by 5 → 5/10\n\nAll of these are one half.\n\nWhy does this work? Multiplying top and bottom by the same number is the same as cutting every piece into smaller pieces. You have more pieces, but each piece is smaller, so the total is unchanged.\n\nThe rule that matters: whatever you do to the top, you must do to the bottom. Change only one and you change the amount.',
       example: 'Is 3/4 the same as 6/8?\n\nLook at the bottoms: 4 and 8. To get from 4 to 8, multiply by 2.\n\nNow do the same to the top:\n    3 × 2 = 6\n\nSo 3/4 = 6/8 ✓ They are equivalent.\n\nNow check a different pair: is 3/4 the same as 6/9?\n\nBottom: 4 → 9. That is not multiplying by a whole number.\nAnd 3 × 2 = 6 but 4 × 2 = 8, not 9.\n\nSo 3/4 and 6/9 are NOT equivalent.'},
      {heading: 'Simplifying',
       body: 'Simplifying goes the other way: you DIVIDE top and bottom by the same number.\n\n    6/8 → divide both by 2 → 3/4\n\n3/4 is simpler. You cannot divide 3 and 4 by any whole number except 1, so 3/4 is in its LOWEST TERMS.\n\nTo simplify, find a number that divides into both:\n\n    8/12 → both divide by 4 → 2/3\n    10/15 → both divide by 5 → 2/3\n\nNotice 8/12 and 10/15 both simplify to 2/3, so they are equivalent to each other too.'},
      {heading: 'Try it yourself',
       body: '1. Write two fractions equivalent to 1/3.\n2. Is 2/5 equivalent to 6/15? Show how you checked.\n3. Simplify 9/12 to its lowest terms.\n4. Musu ate 4/8 of a cake. Her brother ate 1/2. Who ate more?'},
      {heading: 'Summary',
       body: '• Equivalent fractions are different numbers for the same amount.\n• Multiply top AND bottom by the same number to make an equivalent fraction.\n• Divide top AND bottom by the same number to simplify.\n• Whatever you do to the top, do to the bottom.\n• Lowest terms means no number except 1 divides both.'},
    ],
  },
  {
    id: 'g5-eng-paragraph-l1', topicId: 'g5-eng-paragraph', subjectId: 'english', grade: 5,
    title: 'Writing a Clear Paragraph', estimatedMinutes: 12, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Say what a paragraph is and what it is for.'},
      {id: 'o2', text: 'Write a topic sentence that tells the reader the main idea.'},
      {id: 'o3', text: 'Keep one paragraph to one idea.'},
    ],
    keyTerms: [
      {term: 'Paragraph', definition: 'A group of sentences about one main idea.'},
      {term: 'Topic sentence', definition: 'The sentence that tells the reader what the paragraph is about.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Writing is easier to read when ideas are grouped. This lesson shows you how to build one clear paragraph, which is the building block of every longer piece of writing.'},
      {heading: 'One paragraph, one idea',
       body: 'A paragraph is a group of sentences that all belong together because they are about the SAME idea.\n\nWhen you change to a new idea, you start a new paragraph.\n\nThink of it like packing. You do not put rice, soap and schoolbooks in one bag and hope the person sorts it out. You group things that belong together. A paragraph is that bag.'},
      {heading: 'The topic sentence comes first',
       body: 'The first sentence of a paragraph usually tells the reader what it is about. That is the TOPIC SENTENCE.\n\n    "Cassava is an important crop in many homes."\n\nNow the reader knows: this paragraph is about cassava being important. Every sentence after it should support that.\n\n    Cassava is an important crop in many homes. It grows well even\n    when there is little rain. The roots can be pounded into fufu,\n    and the leaves are cooked as a vegetable. Because of this, one\n    plant can feed a family in more than one way.\n\nEvery sentence is about cassava being important. Nothing wanders off.',
       example: 'Spotting a sentence that does not belong.\n\n    Cassava is an important crop in many homes. It grows well even\n    when there is little rain. My uncle has a motorbike. The roots\n    can be pounded into fufu.\n\nWhich sentence does not belong?\n\n"My uncle has a motorbike." It may be true, but it is not about cassava. It breaks the reader\'s concentration and belongs in a different paragraph — or nowhere.\n\nTest every sentence: does this support the topic sentence? If not, take it out.'},
      {heading: 'How long should a paragraph be?',
       body: 'There is no fixed number of sentences. A paragraph is finished when the idea is finished.\n\nBut if a paragraph fills a whole page, you are probably covering more than one idea — look for the place where the subject changes and split it there.\n\nAnd if a paragraph is one short sentence, ask whether you have explained enough.'},
      {heading: 'Try it yourself',
       body: 'Write one paragraph about your school.\n\n1. Start with a topic sentence saying one thing about it.\n2. Add three sentences that support it.\n3. Read it back. Does every sentence belong? Cross out any that wander.'},
      {heading: 'Summary',
       body: '• A paragraph holds sentences about ONE idea.\n• The topic sentence tells the reader what that idea is.\n• Every other sentence should support it.\n• Start a new paragraph when the idea changes.\n• Test each sentence: does it belong in this bag?'},
    ],
  },
  {
    id: 'g5-sci-water-cycle-l1', topicId: 'g5-sci-water-cycle', subjectId: 'general-science', grade: 5,
    title: 'The Water Cycle', estimatedMinutes: 13, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Name the main stages of the water cycle.'},
      {id: 'o2', text: 'Explain what evaporation and condensation are.'},
      {id: 'o3', text: 'Explain why the Earth never runs out of water.'},
    ],
    keyTerms: [
      {term: 'Evaporation', definition: 'When liquid water is heated and becomes water vapour, a gas.'},
      {term: 'Condensation', definition: 'When water vapour cools and turns back into tiny drops of liquid.'},
      {term: 'Precipitation', definition: 'Water falling from clouds as rain.'},
      {term: 'Water vapour', definition: 'Water in gas form. You cannot see it.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Rain falls, puddles dry up, and rain falls again. This lesson explains where the water goes and why it comes back.'},
      {heading: 'Start with a puddle',
       body: 'After rain there is a puddle in the yard. By afternoon it is gone.\n\nWhere did the water go? It did not sink — the ground underneath is dry. Nobody carried it away.\n\nThe sun heated it, and the water turned into a gas called WATER VAPOUR. Vapour is invisible, so the water did not disappear — it just stopped being something you can see.\n\nThat change, liquid → gas, is EVAPORATION.'},
      {heading: 'Up, cool, and back down',
       body: 'The vapour rises into the sky. High up it is much colder.\n\nWhen vapour cools, it turns back into tiny drops of liquid water. That change, gas → liquid, is CONDENSATION. Millions of those tiny drops together are what a CLOUD is.\n\nAs more vapour condenses, the drops join and grow heavier. When they are too heavy for the air to hold, they fall as rain. That is PRECIPITATION.\n\nThe rain lands, collects in rivers and the sea, and the sun heats it again. Round it goes.\n\n    Evaporation → Condensation → Precipitation → back to the start',
       example: 'Seeing condensation at home.\n\nTake a cold bottle of water out on a warm day. In a few minutes the outside is wet.\n\nWhere did that water come from? Not from inside — the bottle is sealed.\n\nThere is always invisible water vapour in the air. When it touches the cold bottle it cools, condenses, and becomes liquid you can see and feel.\n\nThis is the same thing that makes clouds. The only difference is where the cooling happens.'},
      {heading: 'Why water never runs out',
       body: 'The water in today\'s rain is not new. It is the same water that has been going round this cycle for a very long time.\n\nWater is not created or destroyed by the cycle — only moved and changed between liquid and gas.\n\nBut be careful with what this does NOT mean. It does not mean water is always available where people need it, or that it is always clean enough to drink. The cycle keeps the total amount steady; it does not deliver it to your village, and it does not remove what pollutes it.'},
      {heading: 'Try it yourself',
       body: '1. Name the three main stages in order.\n2. Wet clothes on a line dry faster on a sunny day than a cloudy one. Which stage does this show, and why does sun speed it up?\n3. Why does a cold bottle get wet on the outside?\n4. A friend says "the puddle water disappeared". Is that right? Explain what really happened.'},
      {heading: 'Summary',
       body: '• Evaporation: the sun heats liquid water into invisible vapour.\n• Condensation: vapour cools high up and becomes tiny drops — clouds.\n• Precipitation: the drops grow heavy and fall as rain.\n• The cycle repeats; water is moved and changed, never lost.\n• Steady total does not mean available or clean where people need it.'},
    ],
  },
  {
    id: 'g5-soc-resources-l1', topicId: 'g5-soc-resources', subjectId: 'social-studies', grade: 5,
    title: 'Natural Resources and How We Use Them', estimatedMinutes: 12, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Say what a natural resource is.'},
      {id: 'o2', text: 'Tell renewable from non-renewable resources.'},
      {id: 'o3', text: 'Explain why resources need to be looked after.'},
    ],
    keyTerms: [
      {term: 'Natural resource', definition: 'Something useful that comes from nature, not made by people.'},
      {term: 'Renewable', definition: 'A resource that can be replaced within a person’s lifetime.'},
      {term: 'Non-renewable', definition: 'A resource that takes so long to form that once used it is gone.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Everything people use starts as something from nature. This lesson is about what those things are, and why some can run out while others do not.'},
      {heading: 'What counts as a natural resource',
       body: 'A NATURAL RESOURCE is something useful that comes from nature. People did not make it — they found it and used it.\n\n    water — for drinking, washing, farming\n    soil — for growing food\n    trees — for timber, firewood, shade, fruit\n    fish — for food\n    minerals from the ground — for building and tools\n\nA wooden chair is NOT a natural resource. The tree was. The chair is what people made from it. Resources are the raw materials.'},
      {heading: 'Renewable and non-renewable',
       body: 'RENEWABLE resources can be replaced within a person\'s lifetime.\n\n    Trees — cut one, plant one, it grows back.\n    Fish — they breed and the population recovers.\n    Water — the water cycle keeps returning it.\n\nNON-RENEWABLE resources take so long to form that, once used, they are gone for practical purposes.\n\n    Minerals and metals in the ground took millions of years to form.\n\nHere is the part worth understanding properly: renewable does NOT mean unlimited.\n\nA forest recovers only if trees are replanted and given time. Catch fish faster than they breed and the fish disappear, even though fish are renewable. Renewable means "can recover", not "cannot run out".',
       example: 'Two villages, one river.\n\nVillage A catches fish, and each year leaves the young fish to grow and breed. The river still has fish twenty years later.\n\nVillage B catches every fish it can find, including the young ones. The catch is huge for two years. In the third year there is almost nothing, because no fish were left to breed.\n\nSame resource. Same river. The difference is the rate of use.\n\nThis is why people talk about using resources SUSTAINABLY — at a speed that lets them recover.'},
      {heading: 'Why it matters',
       body: 'Resources are where jobs, food and building materials come from. When a resource is used up, the people who depended on it lose their living, not only the resource.\n\nLooking after resources is not only about nature. It is about whether the next group of people has anything left to use.'},
      {heading: 'Try it yourself',
       body: '1. Give three natural resources used where you live.\n2. Is soil renewable? Think carefully — it recovers, but very slowly if it washes away.\n3. Explain why a renewable resource can still run out.\n4. Suggest one thing a community could do to protect its trees.'},
      {heading: 'Summary',
       body: '• Natural resources come from nature, not from people.\n• Renewable resources can recover within a lifetime; non-renewable ones cannot.\n• Renewable does not mean unlimited — the rate of use decides.\n• Using a resource sustainably means at a speed that lets it recover.'},
    ],
  },
];
