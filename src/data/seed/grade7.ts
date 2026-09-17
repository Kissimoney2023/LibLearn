import type {Lesson, Topic, Unit} from '../../types/domain';

/**
 * GRADE 7 TEACHING CONTENT — LibLearn Teaching Sequence v1
 *
 * Provenance `liblearn`. Standard junior-secondary material, not a
 * reproduction of the Liberian national curriculum.
 *
 * Grade 7 is the first year of junior secondary, where several subjects stop
 * describing things and start reasoning about them. Negative numbers, in
 * particular, are the first point in mathematics where the answer cannot be
 * checked by counting objects — so that lesson spends its effort on building a
 * mental picture that still works when the objects run out.
 */

const V = 'liblearn-v1';

export const GRADE7_UNITS: Unit[] = [
  {id: 'g7-math-u-integers', subjectId: 'mathematics', grade: 7, order: 1,
   name: 'Integers', summary: 'Positive and negative whole numbers, and how to calculate with them.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g7-eng-u-grammar', subjectId: 'english', grade: 7, order: 1,
   name: 'Verbs and Tense', summary: 'Showing when something happened.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g7-sci-u-energy', subjectId: 'general-science', grade: 7, order: 1,
   name: 'Energy', summary: 'The forms energy takes and how it moves between them.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g7-soc-u-geography', subjectId: 'social-studies', grade: 7, order: 1,
   name: 'Weather and Climate', summary: 'The difference between today’s weather and a place’s climate.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g7-civ-u-citizenship', subjectId: 'civics', grade: 7, order: 1,
   name: 'Citizenship', summary: 'What citizens are entitled to, and what they owe in return.',
   curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE7_TOPICS: Topic[] = [
  {id: 'g7-math-negatives', unitId: 'g7-math-u-integers', subjectId: 'mathematics', grade: 7,
   name: 'Negative Numbers', summary: 'Numbers below zero, and how adding and subtracting works with them.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g7-eng-tenses', unitId: 'g7-eng-u-grammar', subjectId: 'english', grade: 7,
   name: 'Verb Tenses', summary: 'Past, present and future, and keeping them consistent.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g7-sci-energy', unitId: 'g7-sci-u-energy', subjectId: 'general-science', grade: 7,
   name: 'Forms of Energy', summary: 'Energy is never used up — it changes form.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g7-soc-climate', unitId: 'g7-soc-u-geography', subjectId: 'social-studies', grade: 7,
   name: 'Weather and Climate', summary: 'Why one rainy day tells you nothing about a climate.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g7-civ-rights', unitId: 'g7-civ-u-citizenship', subjectId: 'civics', grade: 7,
   name: 'Rights and Responsibilities', summary: 'Why every right carries a duty on somebody.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE7_LESSONS: Lesson[] = [
  {
    id: 'g7-math-negatives-l1', topicId: 'g7-math-negatives', subjectId: 'mathematics', grade: 7,
    title: 'Adding and Subtracting Negative Numbers', estimatedMinutes: 15, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Place positive and negative numbers on a number line.'},
      {id: 'o2', text: 'Add and subtract with negative numbers.'},
      {id: 'o3', text: 'Explain why subtracting a negative gives a bigger answer.'},
    ],
    keyTerms: [
      {term: 'Integer', definition: 'Any whole number, positive, negative or zero.'},
      {term: 'Negative number', definition: 'A number less than zero, written with a minus sign.'},
      {term: 'Number line', definition: 'A line with numbers in order, negatives to the left of zero.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Until now every number counted something you could hold. Negative numbers do not, so counting objects will not help you check your answer. Instead you will use a number line — a picture that keeps working when the objects run out.'},
      {heading: 'The number line',
       body: 'Draw a line with zero in the middle. Positives go right, negatives go left:\n\n    −5  −4  −3  −2  −1   0   1   2   3   4   5\n     ←──────────────────  │  ──────────────────→\n\nTwo rules that come straight from the picture:\n\n    ADDING moves you RIGHT.\n    SUBTRACTING moves you LEFT.\n\nThat is all. Every question below is just deciding where to start and which way to walk.'},
      {heading: 'Adding and subtracting',
       body: 'Work out −3 + 5.\n\n    Start at −3. Add 5, so move 5 steps RIGHT:\n    −3 → −2 → −1 → 0 → 1 → 2\n\n    So −3 + 5 = 2\n\nNow 2 − 6.\n\n    Start at 2. Subtract 6, so move 6 steps LEFT:\n    2 → 1 → 0 → −1 → −2 → −3 → −4\n\n    So 2 − 6 = −4\n\nNotice you can subtract a bigger number from a smaller one now. Before Grade 7 that question had no answer. It has one — it is just below zero.'},
      {heading: 'Subtracting a negative',
       body: 'This is the part that confuses people, so here it is slowly.\n\n    5 − (−3) = ?\n\nSubtracting means "move left". But the thing you are moving is itself negative, which reverses the direction. Two reversals cancel, so you move RIGHT.\n\n    5 − (−3) = 5 + 3 = 8\n\nThe rule: **subtracting a negative is the same as adding a positive.**\n\nIf that feels like a trick, try it in words. "Take away a debt of 3" leaves you better off by 3. Removing something bad is the same as gaining something good.\n\nTwo minus signs next to each other become a plus:\n\n    7 − (−2) = 7 + 2 = 9\n    −4 − (−6) = −4 + 6 = 2',
       example: 'Temperature, worked through.\n\nAt night the temperature is −2°C. By midday it has risen 9 degrees. What is it at midday?\n\n    Start at −2, rise means add:\n    −2 + 9 = 7\n\n    Midday is 7°C.\n\nNow the harder version. The temperature is 3°C. It falls to −4°C. By how many degrees did it fall?\n\nThe fall is the DIFFERENCE between the two:\n\n    3 − (−4) = 3 + 4 = 7\n\n    It fell by 7 degrees.\n\nCheck it on the line: from 3 down to 0 is 3 steps, then 0 down to −4 is 4 more. 3 + 4 = 7 ✓\n\nThis is a good habit — when the rule feels strange, count the steps on the line and confirm the rule gave the same answer.'},
      {heading: 'Try it yourself',
       body: '1. −7 + 4\n2. 3 − 9\n3. 6 − (−5)\n4. −2 − (−8)\n5. A well’s water level is 2 m below ground, written −2. It drops another 3 m. What is the new level?\n6. The temperature rises from −5°C to 4°C. By how much did it rise? (Careful — it is not 1.)'},
      {heading: 'Summary',
       body: '• Negatives sit left of zero on the number line.\n• Adding moves right; subtracting moves left.\n• You can subtract a bigger number from a smaller one; the answer is negative.\n• Subtracting a negative is adding a positive: 5 − (−3) = 8.\n• When unsure, count steps on the line and check the rule agrees.'},
    ],
  },
  {
    id: 'g7-eng-tenses-l1', topicId: 'g7-eng-tenses', subjectId: 'english', grade: 7,
    title: 'Past, Present and Future Tense', estimatedMinutes: 12, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Identify the tense of a verb.'},
      {id: 'o2', text: 'Change a sentence from one tense to another.'},
      {id: 'o3', text: 'Keep tense consistent within a piece of writing.'},
    ],
    keyTerms: [
      {term: 'Tense', definition: 'The form of a verb that shows when something happens.'},
      {term: 'Irregular verb', definition: 'A verb whose past form does not simply add -ed, such as go → went.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'The same action can happen yesterday, now, or tomorrow, and the verb changes to show which. This lesson is about making that choice deliberately instead of by accident.'},
      {heading: 'The three tenses',
       body: 'PRESENT — happening now, or happening regularly.\n    I walk to school.\n    She walks to school.\n\nPAST — already happened.\n    I walked to school.\n\nFUTURE — has not happened yet.\n    I will walk to school.\n\nMost verbs form the past by adding -ed, and the future by putting "will" in front. Only the verb changes — the rest of the sentence can stay the same.'},
      {heading: 'Irregular verbs',
       body: 'Some common verbs do not follow the -ed rule, and these are the ones people get wrong:\n\n    go   → went    (not "goed")\n    eat  → ate     (not "eated")\n    see  → saw\n    take → took\n    come → came\n    write → wrote\n\nThere is no rule to work these out — they have to be learned. They are also the most common verbs in the language, which is why they are worth learning properly.'},
      {heading: 'Keep the tense consistent',
       body: 'This is the mistake that costs marks most often. Once you choose a tense, stay in it unless the time genuinely changes.\n\n    Wrong: Yesterday I went to the market and buy rice.\n           "went" is past, "buy" is present. They disagree.\n\n    Right:  Yesterday I went to the market and bought rice.\n\nWhen you finish a piece of writing, read it once looking ONLY at the verbs. Ignore everything else. Tense mistakes hide easily inside a sentence that otherwise sounds fine.',
       example: 'Changing one sentence through all three tenses.\n\n    Present: The farmer plants cassava.\n    Past:    The farmer planted cassava.\n    Future:  The farmer will plant cassava.\n\nNow one with an irregular verb:\n\n    Present: She writes a letter.\n    Past:    She wrote a letter.      (not "writed")\n    Future:  She will write a letter.\n\nNotice that after "will", the verb goes back to its plain form — "will write", never "will wrote".'},
      {heading: 'Try it yourself',
       body: 'Change each into the past tense:\n1. We eat rice every evening.\n2. He goes to the farm.\n3. They see the river.\n\nThen fix this: "Last week my sister travel to town and buys new shoes."'},
      {heading: 'Summary',
       body: '• Present = now, past = already happened, future = not yet.\n• Most verbs add -ed for past and "will" for future.\n• Irregular verbs (go/went, eat/ate) must be learned.\n• After "will", use the plain verb form.\n• Stay in one tense; check by reading only the verbs.'},
    ],
  },
  {
    id: 'g7-sci-energy-l1', topicId: 'g7-sci-energy', subjectId: 'general-science', grade: 7,
    title: 'Forms of Energy and How It Changes', estimatedMinutes: 13, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Name the main forms of energy.'},
      {id: 'o2', text: 'Describe an energy change in a everyday device.'},
      {id: 'o3', text: 'Explain what "energy is conserved" means.'},
    ],
    keyTerms: [
      {term: 'Energy', definition: 'What is needed to make something happen — to move, heat or light.'},
      {term: 'Energy transfer', definition: 'Energy changing from one form to another.'},
      {term: 'Conservation of energy', definition: 'Energy is never created or destroyed, only changed in form.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'People say energy is "used up". It never is. This lesson is about what actually happens to it.'},
      {heading: 'Forms of energy',
       body: 'Energy comes in several forms:\n\n    LIGHT — from the sun, a lamp, a fire\n    HEAT (thermal) — from a stove, the sun, your body\n    SOUND — from a drum, a voice, an engine\n    MOVEMENT (kinetic) — anything that is moving\n    ELECTRICAL — flowing through wires\n    CHEMICAL — stored in food, fuel, a battery\n\nStored energy is still energy. A battery sitting in a drawer doing nothing holds chemical energy the whole time.'},
      {heading: 'Energy changes form',
       body: 'Devices do not make energy. They CHANGE it from one form to another.\n\n    Torch:     chemical (battery) → electrical → light\n    Radio:     chemical → electrical → sound\n    Cooking fire: chemical (wood) → heat and light\n    Your body: chemical (food) → movement and heat\n\nFollow the arrows in the torch. The battery does not create light. It holds chemical energy, which becomes electrical energy in the wire, which becomes light in the bulb. Same energy, three forms.'},
      {heading: 'Nothing is used up',
       body: 'When a battery "goes flat", the energy did not vanish. It left as light, a little sound, and heat — and heat spreads into the air where it is too thinly spread to be useful.\n\nThat is what "used up" really means: not destroyed, but changed into a form too spread out to use again.\n\nThis is the CONSERVATION OF ENERGY: energy is never created or destroyed, only changed in form. Add up all the energy before and after, and the totals match.',
       example: 'Where the energy goes in a torch.\n\nStart: 100 units of chemical energy in the battery.\n\nAfter running:\n    about 10 units left as light\n    about 90 units left as heat\n\nTotal out: 100 units. Nothing missing.\n\nMost of it became heat, which is why a torch that has been on feels warm. The heat was not wasted in the sense of vanishing — it was wasted in the sense of not being the form you wanted.\n\nA good device is one where most of the energy becomes the form you actually want.'},
      {heading: 'Try it yourself',
       body: '1. Name the energy changes when a phone is charged, then used to play music.\n2. A child slides down a slide. What energy change happens, and where did the energy come from before they slid?\n3. Explain why "the battery used up its energy" is not strictly correct.\n4. Why does a lamp that has been on for an hour feel warm?'},
      {heading: 'Summary',
       body: '• Forms include light, heat, sound, movement, electrical and chemical.\n• Devices change energy from one form to another; they do not create it.\n• Energy is never created or destroyed — conservation of energy.\n• "Used up" means changed into heat spread too thin to use.'},
    ],
  },
  {
    id: 'g7-soc-climate-l1', topicId: 'g7-soc-climate', subjectId: 'social-studies', grade: 7,
    title: 'Weather and Climate Are Not the Same', estimatedMinutes: 12, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Define weather and climate.'},
      {id: 'o2', text: 'Explain the difference using time.'},
      {id: 'o3', text: 'Say why one unusual day proves nothing about climate.'},
    ],
    keyTerms: [
      {term: 'Weather', definition: 'What the air is doing at one place at one time.'},
      {term: 'Climate', definition: 'The usual pattern of weather in a place over many years.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'These two words are often used as if they mean the same thing. They do not, and the difference is entirely about time.'},
      {heading: 'Weather is now',
       body: 'WEATHER is what the air is doing at one place, right now or over a few days.\n\n    "It is raining."\n    "It was hot yesterday."\n    "There is wind this morning."\n\nWeather changes quickly. It can be sunny in the morning and raining by afternoon.'},
      {heading: 'Climate is the pattern',
       body: 'CLIMATE is what the weather is USUALLY like in a place, measured over many years — normally thirty or more.\n\n    "This region has a rainy season and a dry season."\n\nClimate changes slowly, over decades.\n\nA useful way to hold the difference:\n\n    **Weather tells you what to wear today.\n    Climate tells you what clothes to own.**\n\nOne day of weather is one measurement. Climate is thousands of measurements averaged together.',
       example: 'Why one cold day proves nothing.\n\nSomeone says: "It was unusually cold last week, so the climate must be getting colder."\n\nThat does not follow. One week is weather — a single measurement.\n\nThink of a student\'s marks. They score 40 on one test. Is that student weak? You cannot say from one test. They might average 80 and have had a bad day.\n\nTo judge the student you need many tests. To judge climate you need many years.\n\nThe reverse is also a mistake: one very hot week does not by itself prove the climate is warming either. Single measurements never settle questions about averages.'},
      {heading: 'Why the difference matters',
       body: 'Farmers plan around CLIMATE — which months are usually wet decides when to plant.\n\nThey react to WEATHER — today\'s rain decides whether to work in the field this afternoon.\n\nConfusing the two leads to bad decisions in both directions: planting by a single warm week, or abandoning a plan because of one unusual day.'},
      {heading: 'Try it yourself',
       body: 'Weather or climate?\n1. "It will rain this afternoon."\n2. "This area is usually dry between November and March."\n3. "Yesterday was the hottest day this year."\n4. "This region has had heavy rains most years for the last fifty."\n\nThen: explain in your own words why one dry month does not mean a place has a dry climate.'},
      {heading: 'Summary',
       body: '• Weather is now or a few days; climate is the pattern over many years.\n• Weather changes fast; climate changes slowly.\n• Weather = what to wear today. Climate = what clothes to own.\n• A single unusual day or week proves nothing about climate.'},
    ],
  },
  {
    id: 'g7-civ-rights-l1', topicId: 'g7-civ-rights', subjectId: 'civics', grade: 7,
    title: 'Rights and Responsibilities', estimatedMinutes: 12, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Explain what a right is.'},
      {id: 'o2', text: 'Explain why every right places a duty on someone.'},
      {id: 'o3', text: 'Give examples of responsibilities citizens hold.'},
    ],
    keyTerms: [
      {term: 'Right', definition: 'Something a person is entitled to, which others must not take away.'},
      {term: 'Responsibility', definition: 'Something a person is expected to do.'},
      {term: 'Citizen', definition: 'A recognised member of a country, with rights and responsibilities in it.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Rights and responsibilities are usually taught as two lists to memorise. They are better understood as two sides of one thing — which this lesson shows.\n\nA note on scope: this lesson teaches the general idea of rights and duties. It does not set out the specific rights guaranteed by Liberian law. For those, use the Constitution itself or your teacher’s materials — LibLearn will not state them from memory.'},
      {heading: 'What a right is',
       body: 'A RIGHT is something a person is entitled to simply because they are a person or a citizen — not a favour someone grants them, and not something that can be withdrawn because it is inconvenient.\n\nCommonly recognised rights include being treated equally before the law, being able to say what you think, and being able to learn.'},
      {heading: 'Every right places a duty on someone',
       body: 'This is the idea worth taking from the lesson.\n\nA right is not just a possession. It is a claim on other people\'s behaviour.\n\n    If you have a right to be safe, then others have a duty not to harm you.\n    If you have a right to learn, then others have a duty not to prevent you.\n    If you have a right to speak, then others have a duty not to silence you.\n\nA right nobody has any duty to respect is not really a right. It is only a wish.\n\nAnd it runs both ways. The same duties others owe you, you owe them. Your right to speak means you must let others speak, including when you disagree — which is exactly when it is hard.',
       example: 'Two students, one classroom.\n\nStudent A says: "I have the right to speak, so I will talk whenever I want during the lesson."\n\nBut Student B also has the right to learn. If A talks constantly, B cannot hear the teacher — so A exercising a right destroys B\'s.\n\nThis is what people mean when they say rights have limits. The limit is not arbitrary: your right runs up to the point where it would cancel someone else\'s.\n\nA is free to speak. A is not free to prevent B from learning.'},
      {heading: 'Responsibilities',
       body: 'Responsibilities are what citizens are expected to do so that everyone\'s rights hold:\n\n    obeying the law\n    respecting other people and their property\n    taking part — voting when old enough, serving the community\n    caring for shared things: schools, roads, water sources\n\nThese are not a price charged for rights. They are how rights are kept working for everybody, including you.'},
      {heading: 'Try it yourself',
       body: '1. For "the right to be safe at school", say what duty it places on other students.\n2. Someone says "I have my rights, so nobody can tell me anything." What have they misunderstood?\n3. Name two responsibilities of a student, and say whose rights each one protects.\n4. Using your Constitution or class materials, find how rights are set out in Liberian law — and note anything that differs from the general picture here.'},
      {heading: 'Summary',
       body: '• A right is an entitlement, not a favour.\n• Every right places a duty on other people.\n• A right nobody must respect is only a wish.\n• Your right ends where it would cancel someone else’s.\n• Responsibilities are how rights are kept working for everyone.\n• Country-specific rights must come from the law itself, not memory.'},
    ],
  },
];
