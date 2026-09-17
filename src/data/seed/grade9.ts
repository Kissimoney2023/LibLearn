import type {Lesson, Topic, Unit} from '../../types/domain';

/**
 * GRADE 9 TEACHING CONTENT — LibLearn Teaching Sequence v1
 *
 * Provenance `liblearn`. Standard junior-secondary material, not a
 * reproduction of the Liberian national curriculum.
 *
 * Grade 9 is the final junior-secondary year. LJHSCE is the examination
 * associated with the end of this stage, but LibLearn holds NO verified LJHSCE
 * syllabus, so no lesson or question here is tagged to it and nothing claims
 * to cover what that examination asks.
 */

const V = 'liblearn-v1';

export const GRADE9_UNITS: Unit[] = [
  {id: 'g9-math-u-graphs', subjectId: 'mathematics', grade: 9, order: 1,
   name: 'Algebra and Graphs', summary: 'Turning equations into pictures you can read.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g9-eng-u-formal', subjectId: 'english', grade: 9, order: 1,
   name: 'Formal Writing', summary: 'Writing to people you do not know, for a purpose.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g9-sci-u-matter', subjectId: 'general-science', grade: 9, order: 1,
   name: 'Classifying Matter', summary: 'Elements, compounds and mixtures, and how they differ.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g9-soc-u-economics', subjectId: 'social-studies', grade: 9, order: 1,
   name: 'Basic Economics', summary: 'Why people trade, and what money is for.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g9-civ-u-democracy', subjectId: 'civics', grade: 9, order: 1,
   name: 'Democracy', summary: 'What democracy requires beyond simply holding a vote.',
   curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE9_TOPICS: Topic[] = [
  {id: 'g9-math-graphs', unitId: 'g9-math-u-graphs', subjectId: 'mathematics', grade: 9,
   name: 'Straight Line Graphs', summary: 'Plotting y = mx + c, and what the numbers mean on the picture.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g9-eng-letters', unitId: 'g9-eng-u-formal', subjectId: 'english', grade: 9,
   name: 'Formal Letters', summary: 'Structure, tone and the difference from writing to a friend.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g9-sci-matter', unitId: 'g9-sci-u-matter', subjectId: 'general-science', grade: 9,
   name: 'Elements, Compounds and Mixtures', summary: 'Three kinds of substance, and how to tell them apart.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g9-soc-trade', unitId: 'g9-soc-u-economics', subjectId: 'social-studies', grade: 9,
   name: 'Why People Trade', summary: 'How trade leaves both sides better off, and what money solves.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g9-civ-democracy', unitId: 'g9-civ-u-democracy', subjectId: 'civics', grade: 9,
   name: 'What Democracy Requires', summary: 'Voting is necessary but not sufficient.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE9_LESSONS: Lesson[] = [
  {
    id: 'g9-math-graphs-l1', topicId: 'g9-math-graphs', subjectId: 'mathematics', grade: 9,
    title: 'Straight Line Graphs and y = mx + c', estimatedMinutes: 16, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Plot a straight line from its equation.'},
      {id: 'o2', text: 'Identify the gradient and y-intercept from an equation.'},
      {id: 'o3', text: 'Read the gradient and intercept off a drawn graph.'},
    ],
    keyTerms: [
      {term: 'Gradient', definition: 'How steep the line is: how far up it goes for each step right.'},
      {term: 'y-intercept', definition: 'Where the line crosses the y-axis.'},
      {term: 'Coordinates', definition: 'A pair (x, y) giving a point\u2019s position.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'An equation and a graph are the same information in two forms. By the end of this lesson you will be able to move between them in both directions.'},
      {heading: 'Plotting from an equation',
       body: 'Take y = 2x + 1.\n\nChoose some values of x, work out y, and you get points to plot:\n\n    x = 0 →  y = 2(0) + 1 = 1   →  (0, 1)\n    x = 1 →  y = 2(1) + 1 = 3   →  (1, 3)\n    x = 2 →  y = 2(2) + 1 = 5   →  (2, 5)\n    x = 3 →  y = 2(3) + 1 = 7   →  (3, 7)\n\nPlot those four points and they fall in a straight line. Join them and extend.\n\nThree points is enough, and the third is a CHECK: if one point is off the line, you made an arithmetic slip, and you would never notice with only two.'},
      {heading: 'What m and c mean',
       body: 'Every straight line can be written:\n\n    y = mx + c\n\n    m is the GRADIENT — how steep\n    c is the Y-INTERCEPT — where it crosses the y-axis\n\nIn y = 2x + 1: m = 2 and c = 1. The line crosses the y-axis at 1, and for every 1 step right it climbs 2 up.\n\nThe gradient is a rate. m = 2 means "2 up for every 1 across".\n\n    Large m → steep\n    Small m → gentle\n    NEGATIVE m → the line goes DOWN as you move right\n\nc is easy to find from the equation and easy to read off a graph, so it is usually the first thing to identify.',
       example: 'Reading a line off a graph.\n\nA line crosses the y-axis at 3. From the point (0, 3) it passes through (2, 7).\n\nFind c:\n    It crosses the y-axis at 3, so c = 3.\n\nFind m:\n    From (0, 3) to (2, 7):\n    across:  2 − 0 = 2\n    up:      7 − 3 = 4\n    gradient = up ÷ across = 4 ÷ 2 = 2\n\nSo the equation is y = 2x + 3.\n\nCheck with a point you did not use. Try x = 1:\n    y = 2(1) + 3 = 5, so (1, 5) should be on the line. It is ✓\n\nAlways check with a point you did not use to build the answer. Checking with one you already used proves nothing.'},
      {heading: 'Negative gradients',
       body: 'If m is negative, the line falls as you go right.\n\n    y = −3x + 6\n\n    c = 6, so it crosses the y-axis at 6.\n    m = −3, so every 1 step right goes 3 DOWN.\n\n    x = 0 → y = 6\n    x = 1 → y = 3\n    x = 2 → y = 0\n\nThe sign of m tells you the direction; the size tells you the steepness. Reading only the number and ignoring the sign is the most common error here.'},
      {heading: 'Try it yourself',
       body: '1. Plot y = x + 2 for x = 0, 1, 2, 3.\n2. For y = 4x − 5, write down m and c.\n3. A line crosses the y-axis at −1 and passes through (3, 5). Find its equation.\n4. Without plotting, say which is steeper: y = 2x + 9 or y = 5x − 1. Why?\n5. Describe the shape of y = −2x + 4 before plotting it.'},
      {heading: 'Summary',
       body: '• Choose x values, calculate y, plot the points, join them.\n• Use three points so the third checks the other two.\n• y = mx + c: m is gradient, c is y-intercept.\n• Gradient = up ÷ across, measured between two points.\n• Negative m means the line falls to the right.\n• Check your equation with a point you did not use.'},
    ],
  },
  {
    id: 'g9-eng-letters-l1', topicId: 'g9-eng-letters', subjectId: 'english', grade: 9,
    title: 'Writing a Formal Letter', estimatedMinutes: 14, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Lay out a formal letter correctly.'},
      {id: 'o2', text: 'Use formal tone instead of conversational language.'},
      {id: 'o3', text: 'State a purpose clearly in the opening.'},
    ],
    keyTerms: [
      {term: 'Formal', definition: 'Serious and respectful in tone, used with people you do not know personally.'},
      {term: 'Salutation', definition: 'The greeting: Dear Sir, Dear Madam, Dear Mr Kollie.'},
      {term: 'Subscription', definition: 'The closing: Yours faithfully, Yours sincerely.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'A formal letter is written to someone in their official role — a principal, an employer, an office — rather than as a friend. Its layout and tone are fixed, and getting them right is part of being taken seriously.'},
      {heading: 'The layout',
       body: 'In order, down the page:\n\n    1. YOUR ADDRESS — top right\n    2. THE DATE — under your address\n    3. RECIPIENT\u2019S ADDRESS — left, below the date\n    4. SALUTATION — Dear Sir / Dear Madam / Dear Mr Kollie\n    5. SUBJECT LINE — a short heading saying what it is about\n    6. BODY — usually three paragraphs\n    7. SUBSCRIPTION — Yours faithfully or Yours sincerely\n    8. YOUR SIGNATURE, then your name printed below\n\nThe rule for the ending catches people out:\n\n    Dear Sir / Dear Madam  → Yours faithfully   (you do not know their name)\n    Dear Mr Kollie         → Yours sincerely    (you do know their name)'},
      {heading: 'The three paragraphs',
       body: 'PARAGRAPH 1 — why you are writing. One or two sentences. Do not warm up.\n\n    "I am writing to apply for the post of library assistant,\n     advertised in the school notice of 3 May."\n\nPARAGRAPH 2 — the detail. Your reasons, evidence, or the facts of the matter.\n\nPARAGRAPH 3 — what you want to happen, and a courteous close.\n\n    "I should be grateful if you would consider my application.\n     I am available for interview at any time."\n\nThe reader may have many letters to get through. If your first sentence does not say what this is, you have already made their job harder.',
       example: 'Conversational rewritten as formal.\n\nToo conversational:\n\n    "Hi, I really want that library job, it sounds great and I\n     think I\'d be perfect for it! Let me know."\n\nFormal:\n\n    "I am writing to apply for the post of library assistant,\n     advertised on the school notice board on 3 May.\n\n     I have helped to organise the class reading corner for two\n     years, and I am familiar with sorting and recording books.\n\n     I should be grateful if you would consider my application."\n\nWhat changed: no contractions (I\'d → I would), no exclamation marks, no vague praise, and a specific reference to when and where the post was advertised. The formal version is not colder — it is more useful, because it gives the reader facts they can act on.'},
      {heading: 'Tone',
       body: 'In formal writing:\n\n    avoid contractions — write "I would", not "I\'d"\n    avoid slang and casual phrases\n    avoid exclamation marks\n    be specific — dates, names, places\n    be brief; a formal letter is rarely more than one page\n\nBeing formal does not mean using long words to sound impressive. Clear and plain is formal. Complicated and vague is not.'},
      {heading: 'Try it yourself',
       body: 'Write a formal letter to your principal requesting permission for your class to visit a local workplace.\n\nInclude all eight layout parts. Check:\n1. Does paragraph 1 say why you are writing, in one sentence?\n2. Did you use "Yours faithfully" or "Yours sincerely" — and does it match your salutation?\n3. Are there any contractions left?'},
      {heading: 'Summary',
       body: '• Eight parts, in a fixed order.\n• Dear Sir/Madam → Yours faithfully. Dear + name → Yours sincerely.\n• Paragraph 1 states the purpose immediately.\n• No contractions, no slang, no exclamation marks.\n• Clear and plain IS formal; complicated is not.'},
    ],
  },
  {
    id: 'g9-sci-matter-l1', topicId: 'g9-sci-matter', subjectId: 'general-science', grade: 9,
    title: 'Elements, Compounds and Mixtures', estimatedMinutes: 14, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Define element, compound and mixture.'},
      {id: 'o2', text: 'Classify a substance into one of the three.'},
      {id: 'o3', text: 'Explain why a compound differs from a mixture of the same elements.'},
    ],
    keyTerms: [
      {term: 'Element', definition: 'A substance made of only one kind of atom.'},
      {term: 'Compound', definition: 'Two or more elements chemically joined in fixed proportions.'},
      {term: 'Mixture', definition: 'Substances together but not chemically joined.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Everything around you is one of three kinds of substance. Telling them apart is the foundation of chemistry, and the compound-versus-mixture distinction is the one that does the most work later.'},
      {heading: 'The three kinds',
       body: 'ELEMENT — made of only ONE kind of atom. It cannot be broken into anything simpler by chemical means.\n\n    oxygen, iron, carbon, gold\n\nCOMPOUND — two or more elements CHEMICALLY JOINED, always in the same proportions.\n\n    water (H₂O) — hydrogen and oxygen, always 2 to 1\n    salt (NaCl) — sodium and chlorine, always 1 to 1\n\nMIXTURE — substances together but NOT chemically joined. The proportions can be anything.\n\n    air, sea water, soil, rice mixed with beans'},
      {heading: 'Compound versus mixture',
       body: 'This is the distinction that matters, so take it slowly. There are three differences.\n\n**1. Are they joined?**\nIn a compound the atoms are chemically bonded. In a mixture they are only sitting together.\n\n**2. Fixed proportions?**\nWater is ALWAYS 2 hydrogen to 1 oxygen. Never 3 to 1. A mixture has no fixed recipe — tea can be weak or strong and is still tea.\n\n**3. Can you separate it easily?**\nA mixture can be separated physically — filtering, evaporating, picking out by hand. A compound needs a chemical reaction.\n\nAnd the consequence that surprises people: **a compound has completely different properties from the elements in it.**',
       example: 'Sodium, chlorine, and salt.\n\nSODIUM on its own is a soft metal that reacts violently with water.\nCHLORINE on its own is a poisonous green gas.\n\nJoin them chemically and you get SODIUM CHLORIDE — ordinary table salt, which you eat every day.\n\nA dangerous metal plus a poisonous gas makes something safe and necessary. That is not a mixture behaving like its parts; it is a new substance.\n\nNow compare with a MIXTURE. Mix iron filings with sulfur powder. It still looks like iron filings and sulfur, and a magnet pulls the iron straight back out — because nothing joined.\n\nHeat that same mixture, and the elements react to form iron sulfide. Now the magnet does nothing. A compound has formed, and the properties changed.'},
      {heading: 'Classifying quickly',
       body: 'Ask in this order:\n\n1. Is it one kind of atom only? → ELEMENT\n2. Are different elements chemically joined in fixed proportions? → COMPOUND\n3. Are different substances just together, separable physically? → MIXTURE\n\nA warning: a chemical FORMULA tells you it is a compound, not a mixture. H₂O is a compound. "Salt water" has no single formula — it is salt (a compound) mixed with water (a compound), so the whole thing is a mixture.'},
      {heading: 'Try it yourself',
       body: 'Element, compound or mixture?\n1. Copper\n2. Carbon dioxide (CO₂)\n3. Sea water\n4. Air\n5. Sugar (C₁₂H₂₂O₁₁)\n\nThen: explain why salt is safe to eat although sodium and chlorine are both dangerous.\nAnd: how could you separate salt from sea water? Does that tell you it is a mixture?'},
      {heading: 'Summary',
       body: '• Element: one kind of atom.\n• Compound: elements chemically joined, fixed proportions, new properties.\n• Mixture: substances together, any proportions, physically separable.\n• A compound behaves nothing like the elements it contains.\n• A formula means compound; no single formula usually means mixture.'},
    ],
  },
  {
    id: 'g9-soc-trade-l1', topicId: 'g9-soc-trade', subjectId: 'social-studies', grade: 9,
    title: 'Why People Trade', estimatedMinutes: 13, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Explain why trade can leave both sides better off.'},
      {id: 'o2', text: 'Describe the problem with barter that money solves.'},
      {id: 'o3', text: 'Explain specialisation and why it increases what is produced.'},
    ],
    keyTerms: [
      {term: 'Trade', definition: 'Exchanging goods or services with someone else.'},
      {term: 'Barter', definition: 'Trading goods directly for other goods, without money.'},
      {term: 'Specialisation', definition: 'Concentrating on producing one thing and trading for the rest.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Trade looks like one person\'s gain being another\'s loss. It usually is not, and understanding why explains a great deal about how economies work.'},
      {heading: 'Both sides can gain',
       body: 'A farmer has more rice than she can eat. A fisherman has more fish than he can eat.\n\nThey trade some rice for some fish. Now both have rice AND fish.\n\nNobody lost. Both gained, because each valued what they received more than what they gave up. The farmer had rice going spare; a portion of fish was worth more to her than the tenth bag of rice.\n\nThis is the central point: **trade creates value, it does not merely move it.** Nothing new was grown or caught, yet both people are better off than before.'},
      {heading: 'Specialisation',
       body: 'If people can trade, they do not each have to produce everything.\n\nThe farmer can spend all her time farming and get good at it. The fisherman can spend all his time fishing. Each produces far more of their one thing than if both split their time between farming and fishing badly.\n\nThat is SPECIALISATION, and it is why trade increases the total amount produced, not just who holds it.\n\nIt also explains why specialisation depends on trade. Nobody can specialise in fishing alone on an island — they would have fish and nothing else. Specialisation is only safe when you can reliably exchange.',
       example: 'The problem barter cannot solve.\n\nYou have rice. You want a shirt. So you find the tailor.\n\nBut the tailor does not want rice. He wants shoes.\n\nNow you must find a shoemaker who wants rice, trade rice for shoes, then take the shoes to the tailor. And only if the shoemaker happens to want rice today.\n\nEconomists call this the DOUBLE COINCIDENCE OF WANTS: barter needs both people to want what the other has, at the same time.\n\nMoney removes the problem entirely. You sell rice to anyone who wants rice, and buy a shirt from the tailor. Neither transaction needs the other person to want what you happen to be holding.\n\nThis is what money IS — not wealth in itself, but a thing everyone accepts, so trades no longer have to be matched up in pairs.'},
      {heading: 'What money does',
       body: 'Money does three jobs:\n\n    A MEDIUM OF EXCHANGE — everyone accepts it, so trades need not match.\n    A MEASURE OF VALUE — prices let you compare unlike things.\n    A STORE OF VALUE — you can sell now and buy later; rice would rot.\n\nThe third is why a fisherman can sell a large catch and still eat next month.'},
      {heading: 'Try it yourself',
       body: '1. Explain how two people can both gain from one trade.\n2. Give an example of the double coincidence of wants failing.\n3. Why can people specialise only if they can trade?\n4. Which job of money matters most to a farmer who harvests once a year? Explain.'},
      {heading: 'Summary',
       body: '• Trade can leave both sides better off; it creates value, not just moves it.\n• Specialisation raises total production, and depends on being able to trade.\n• Barter needs a double coincidence of wants.\n• Money is a medium of exchange, measure of value and store of value.'},
    ],
  },
  {
    id: 'g9-civ-democracy-l1', topicId: 'g9-civ-democracy', subjectId: 'civics', grade: 9,
    title: 'What Democracy Requires', estimatedMinutes: 13, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Explain what democracy means.'},
      {id: 'o2', text: 'Say why elections alone are not sufficient.'},
      {id: 'o3', text: 'Describe what protects a minority from a majority.'},
    ],
    keyTerms: [
      {term: 'Democracy', definition: 'A system where political power comes from the people.'},
      {term: 'Franchise', definition: 'The right to vote.'},
      {term: 'Accountability', definition: 'Those in power having to answer for what they do.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Democracy is often summarised as "the people vote". Voting is necessary, but a vote on its own does not make a system democratic. This lesson is about what else is required.\n\nScope note: this teaches the general principles, which are shared across democracies. It does not describe Liberia\u2019s specific electoral arrangements — for those, use the Constitution or your teacher\u2019s materials.'},
      {heading: 'The basic idea',
       body: 'In a DEMOCRACY, political power comes from the people. Those who govern do so because the people chose them, and they can be removed the same way.\n\nThe contrast is with a system where rulers hold power by force, by inheritance, or by their own say-so, and the governed have no means of changing them.'},
      {heading: 'Why voting is not enough',
       body: 'Imagine a country that holds an election, but:\n\n    newspapers may not criticise the government\n    opposition candidates are arrested\n    voters are told who to choose and watched while voting\n    the people counting the votes work for one candidate\n\nAn election happened. Was it democratic?\n\nNo. A vote only expresses the people\'s will if people can find out what is going on, choose freely, and have their choice counted honestly.\n\nSo democracy also requires:\n\n    FREE EXPRESSION — you can criticise those in power without punishment\n    REAL CHOICE — genuine alternatives are allowed to stand\n    A SECRET BALLOT — nobody can punish you for how you voted\n    AN HONEST COUNT — results reflect the votes cast\n    ACCOUNTABILITY — those in power must answer for what they do\n    RULE OF LAW — leaders are subject to the law like everyone else\n\nRemove any one and the election becomes a ceremony rather than a decision.'},
      {heading: 'The majority does not get everything',
       body: 'Democracy means the majority decides — but not that the majority may do anything at all.\n\nIf 60% could vote to remove the rights of the other 40%, then those 40% have no rights, only permissions that can be withdrawn. And a majority is not fixed: today\'s majority can be tomorrow\'s minority.\n\nThis is why constitutions put certain things beyond an ordinary vote, and why courts can strike down a law even when it was passed by a majority. Those limits are not undemocratic. They are what stops democracy consuming itself.',
       example: 'Two decisions, one town.\n\nA town votes on where to build a new well. The majority chooses the east side. That is democracy working — a shared decision, made by the most people, and next year they could choose differently.\n\nNow the town votes that families from one clan may not use the well at all.\n\nThe same procedure was followed. The majority still won. But this decision removes a basic entitlement from a group because they are outnumbered — and no vote count makes that legitimate.\n\nThe difference is not how the decision was made. It is what the decision does.'},
      {heading: 'Try it yourself',
       body: '1. Give two conditions besides voting that democracy requires, and explain what each protects.\n2. Why is a secret ballot important? What could happen without it?\n3. Explain why "the majority voted for it" does not always make something acceptable.\n4. Using your Constitution or class materials, find how elections are arranged in Liberia, and note anything that differs from the general picture here.'},
      {heading: 'Summary',
       body: '• Democracy means power comes from the people and rulers can be replaced.\n• Voting alone is not enough: free expression, real choice, a secret ballot, an honest count, accountability and rule of law are all required.\n• Majorities decide, but may not remove others\u2019 basic rights.\n• Limits on the majority protect democracy rather than weaken it.'},
    ],
  },
];
