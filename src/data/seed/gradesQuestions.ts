import type {Question, Quiz} from '../../types/domain';

/**
 * QUESTION BANK for Grades 5, 7, 9 and 12 — provenance `liblearn`.
 *
 * No question here carries an `examGoal`. LPSCE, LJHSCE and WASSCE are real
 * examinations associated with these stages, but LibLearn holds no verified
 * syllabus for any of them, so tagging a question to one would imply a link
 * nobody has checked. The Grade 12 questions are the ones where that restraint
 * matters most, since a WASSCE-year student is the likeliest to read a tag as a
 * promise about their paper.
 *
 * Distractors are the errors students actually make: dropping a minus sign,
 * reading "arteries carry oxygen" as a definition, quoting the mean of skewed
 * data. Each explanation names the probable mistake rather than restating the
 * rule the student just failed to apply.
 */
export const OTHER_GRADE_QUESTIONS: Question[] = [
  /* ================================================== GRADE 5 ========== */
  {
    id: 'q5-eq-1', subjectId: 'mathematics', grade: 5, topicId: 'g5-math-equivalent',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which fraction is equivalent to 1/2?',
    options: ['2/3', '3/6', '1/4', '2/5'],
    correctAnswer: 1,
    explanation:
      '3/6 is equivalent to 1/2: multiply both the top and the bottom of 1/2 by 3. Check the others by asking whether the same number takes the top to the top and the bottom to the bottom — for 2/3 it does not.',
  },
  {
    id: 'q5-eq-2', subjectId: 'mathematics', grade: 5, topicId: 'g5-math-equivalent',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Simplify 9/12 to its lowest terms.',
    options: ['3/4', '4/3', '9/12', '1/3'],
    correctAnswer: 0,
    explanation:
      'Both 9 and 12 divide by 3: 9÷3 = 3 and 12÷3 = 4, giving 3/4. Nothing except 1 divides both 3 and 4, so it is now in lowest terms. If you got 1/3 you probably divided 9 by 3 but not 12.',
  },
  {
    id: 'q5-eq-3', subjectId: 'mathematics', grade: 5, topicId: 'g5-math-equivalent',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Musu ate 4/8 of a cake. Her brother ate 1/2. Who ate more?',
    options: ['Musu', 'Her brother', 'They ate the same', 'You cannot tell'],
    correctAnswer: 2,
    explanation:
      'The same. 4/8 simplifies to 1/2 — divide top and bottom by 4. The numbers look bigger, but a bigger numerator does not mean a bigger fraction when the denominator grew too.',
  },
  {
    id: 'q5-par-1', subjectId: 'english', grade: 5, topicId: 'g5-eng-paragraph',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'What does a topic sentence do?',
    options: [
      'It ends the paragraph',
      'It tells the reader the main idea of the paragraph',
      'It gives an example',
      'It makes the paragraph longer',
    ],
    correctAnswer: 1,
    explanation:
      'The topic sentence, usually first, tells the reader what the paragraph is about. Every sentence after it should support that idea. Examples come after it — they are support, not the point itself.',
  },
  {
    id: 'q5-par-2', subjectId: 'english', grade: 5, topicId: 'g5-eng-paragraph',
    difficulty: 'core', provenance: 'liblearn',
    question:
      'A paragraph about cassava being useful contains: "My uncle has a motorbike." What should you do?',
    options: [
      'Keep it — it adds interest',
      'Remove it — it is not about the topic',
      'Move it to the start',
      'Add more about the motorbike',
    ],
    correctAnswer: 1,
    explanation:
      'Remove it. A paragraph holds sentences about ONE idea, and the motorbike is not about cassava. It may be true and even interesting, but it breaks the reader’s concentration. Test each sentence: does it support the topic sentence?',
  },
  {
    id: 'q5-wc-1', subjectId: 'general-science', grade: 5, topicId: 'g5-sci-water-cycle',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'What is it called when the sun heats water and it becomes an invisible gas?',
    options: ['Condensation', 'Precipitation', 'Evaporation', 'Collection'],
    correctAnswer: 2,
    explanation:
      'Evaporation — liquid water becoming water vapour, a gas. Condensation is the opposite change, when vapour cools back into liquid drops. Getting these two the wrong way round is the commonest mistake in this topic.',
  },
  {
    id: 'q5-wc-2', subjectId: 'general-science', grade: 5, topicId: 'g5-sci-water-cycle',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Why does the outside of a cold bottle become wet on a warm day?',
    options: [
      'Water leaks through the plastic',
      'Water vapour in the air cools on the bottle and condenses',
      'The bottle is melting',
      'The water inside evaporates through the sides',
    ],
    correctAnswer: 1,
    explanation:
      'There is always invisible water vapour in the air. Touching the cold bottle cools it, so it condenses into liquid you can see. Nothing came out of the bottle — the water came from the air, which is the same process that forms clouds.',
  },
  {
    id: 'q5-wc-3', subjectId: 'general-science', grade: 5, topicId: 'g5-sci-water-cycle',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'A puddle dries up in the sun. What happened to the water?',
    options: [
      'It was destroyed',
      'It evaporated into water vapour in the air',
      'It sank through the dry ground',
      'It turned into air',
    ],
    correctAnswer: 1,
    explanation:
      'It evaporated — it is still water, just in gas form and invisible. Saying it "disappeared" or "turned into air" is wrong: water vapour IS water, and it is not air. It will condense and fall again as rain.',
  },
  {
    id: 'q5-res-1', subjectId: 'social-studies', grade: 5, topicId: 'g5-soc-resources',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which of these is a natural resource?',
    options: ['A wooden chair', 'A forest', 'A shirt', 'A bicycle'],
    correctAnswer: 1,
    explanation:
      'A forest comes from nature and people did not make it. A chair and a shirt are things people MADE from resources — the tree and the cotton were the resources. Natural resources are the raw materials.',
  },
  {
    id: 'q5-res-2', subjectId: 'social-studies', grade: 5, topicId: 'g5-soc-resources',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'Fish are a renewable resource. Why can a river still run out of fish?',
    options: [
      'Renewable resources never run out',
      'If fish are caught faster than they can breed, the population collapses',
      'Fish are actually non-renewable',
      'Only minerals can run out',
    ],
    correctAnswer: 1,
    explanation:
      'Renewable means a resource CAN recover, not that it cannot run out. Fish recover only if enough are left to breed. Catch them faster than they reproduce and they disappear — which is why the rate of use matters as much as the type of resource.',
  },

  /* ================================================== GRADE 7 ========== */
  {
    id: 'q7-neg-1', subjectId: 'mathematics', grade: 7, topicId: 'g7-math-negatives',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'What is −3 + 5?',
    options: ['−8', '2', '−2', '8'],
    correctAnswer: 1,
    explanation:
      'Start at −3 on the number line and move 5 steps right, because adding moves right: −3 → −2 → −1 → 0 → 1 → 2. The answer is 2. Choosing −2 means you moved the right distance but kept the wrong sign.',
  },
  {
    id: 'q7-neg-2', subjectId: 'mathematics', grade: 7, topicId: 'g7-math-negatives',
    difficulty: 'core', provenance: 'liblearn',
    question: 'What is 6 − (−5)?',
    options: ['1', '11', '−11', '−1'],
    correctAnswer: 1,
    explanation:
      'Subtracting a negative is the same as adding a positive, so 6 − (−5) = 6 + 5 = 11. If you answered 1 you treated it as 6 − 5, ignoring one of the minus signs. Two minus signs next to each other become a plus.',
  },
  {
    id: 'q7-neg-3', subjectId: 'mathematics', grade: 7, topicId: 'g7-math-negatives',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'The temperature rises from −5°C to 4°C. By how many degrees did it rise?',
    options: ['1', '9', '−1', '20'],
    correctAnswer: 1,
    explanation:
      'The rise is the difference: 4 − (−5) = 4 + 5 = 9 degrees. Count it on the line to check — from −5 up to 0 is 5 steps, then 0 up to 4 is 4 more, so 9 in total. Answering 1 comes from doing 4 − 5 and losing a sign.',
  },
  {
    id: 'q7-ten-1', subjectId: 'english', grade: 7, topicId: 'g7-eng-tenses',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'What is the past tense of "go"?',
    options: ['goed', 'gone', 'went', 'going'],
    correctAnswer: 2,
    explanation:
      '"Went" — "go" is an irregular verb, so it does not add -ed. "Gone" is used with a helper verb ("has gone"), not on its own for simple past. Irregular verbs have to be learned; there is no rule to work them out.',
  },
  {
    id: 'q7-ten-2', subjectId: 'english', grade: 7, topicId: 'g7-eng-tenses',
    difficulty: 'core', provenance: 'liblearn',
    question: 'What is wrong with: "Yesterday I went to the market and buy rice"?',
    options: [
      'Nothing is wrong',
      '"Went" should be "go"',
      'The tenses do not match — "buy" should be "bought"',
      '"Yesterday" is in the wrong place',
    ],
    correctAnswer: 2,
    explanation:
      '"Went" is past but "buy" is present, so the tenses disagree. It should be "went... and bought". Read a finished piece looking ONLY at the verbs — tense mistakes hide easily inside sentences that otherwise sound fine.',
  },
  {
    id: 'q7-en-1', subjectId: 'general-science', grade: 7, topicId: 'g7-sci-energy',
    difficulty: 'core', provenance: 'liblearn',
    question: 'What energy change happens in a torch?',
    options: [
      'Light → electrical → chemical',
      'Chemical → electrical → light',
      'Heat → light → chemical',
      'Electrical → chemical → sound',
    ],
    correctAnswer: 1,
    explanation:
      'The battery holds chemical energy, which becomes electrical energy in the wires, which becomes light at the bulb. The torch does not create light — it changes energy that was already stored from one form into another.',
  },
  {
    id: 'q7-en-2', subjectId: 'general-science', grade: 7, topicId: 'g7-sci-energy',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'A battery "goes flat". What has actually happened to its energy?',
    options: [
      'It was destroyed',
      'It changed into light, sound and heat that spread into the surroundings',
      'It leaked out as liquid',
      'It turned into new matter',
    ],
    correctAnswer: 1,
    explanation:
      'Energy is never destroyed — this is conservation of energy. It became light, a little sound, and heat, and the heat spread into the air where it is too thinly spread to be useful. "Used up" means changed into a form you cannot use again, not gone.',
  },
  {
    id: 'q7-cli-1', subjectId: 'social-studies', grade: 7, topicId: 'g7-soc-climate',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which statement describes CLIMATE rather than weather?',
    options: [
      'It is raining heavily this afternoon',
      'This region is usually dry from November to March',
      'Yesterday was very hot',
      'There is a strong wind right now',
    ],
    correctAnswer: 1,
    explanation:
      'Climate is the usual pattern over many years, so "usually dry from November to March" is climate. The other three describe one day or one moment, which is weather. Weather tells you what to wear today; climate tells you what clothes to own.',
  },
  {
    id: 'q7-cli-2', subjectId: 'social-studies', grade: 7, topicId: 'g7-soc-climate',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'Why does one unusually cold week NOT show that a place’s climate is getting colder?',
    options: [
      'Because cold weeks do not count',
      'Because climate is an average over many years, and one week is a single measurement',
      'Because thermometers are unreliable',
      'Because climate never changes',
    ],
    correctAnswer: 1,
    explanation:
      'One week is weather — a single measurement. Judging a climate from it is like judging a student from one test they did badly on. You need many years of data. Note this cuts both ways: one hot week does not prove warming either.',
  },
  {
    id: 'q7-civ-1', subjectId: 'civics', grade: 7, topicId: 'g7-civ-rights',
    difficulty: 'core', provenance: 'liblearn',
    question: 'If a person has a right to learn, what follows for other people?',
    options: [
      'Nothing — rights concern only the person who has them',
      'Others have a duty not to prevent them from learning',
      'Others must pay for their education',
      'Others lose their own right to learn',
    ],
    correctAnswer: 1,
    explanation:
      'Every right places a duty on other people — that is what makes it a right rather than a wish. A right to learn means others must not prevent it. It also runs both ways: the duty you are owed, you owe to everyone else.',
  },
  {
    id: 'q7-civ-2', subjectId: 'civics', grade: 7, topicId: 'g7-civ-rights',
    difficulty: 'challenge', provenance: 'liblearn',
    question:
      'A student says: "I have the right to speak, so I can talk whenever I like during lessons." What has he misunderstood?',
    options: [
      'He is correct',
      'His right to speak ends where it cancels other students’ right to learn',
      'Students have no right to speak',
      'Rights only apply outside school',
    ],
    correctAnswer: 1,
    explanation:
      'He does have a right to speak, but constant talking stops others hearing the teacher — so exercising his right destroys theirs. That is where the limit comes from: your right runs up to the point where it would cancel someone else’s.',
  },

  /* ================================================== GRADE 9 ========== */
  {
    id: 'q9-gr-1', subjectId: 'mathematics', grade: 9, topicId: 'g9-math-graphs',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'In y = 3x + 4, what is the y-intercept?',
    options: ['3', '4', '7', '−4'],
    correctAnswer: 1,
    explanation:
      'In y = mx + c, c is the y-intercept, so it is 4 — the line crosses the y-axis at 4. The 3 is the gradient, telling you the line climbs 3 for every 1 across. Mixing up m and c is the usual error.',
  },
  {
    id: 'q9-gr-2', subjectId: 'mathematics', grade: 9, topicId: 'g9-math-graphs',
    difficulty: 'core', provenance: 'liblearn',
    question: 'A line passes through (0, 3) and (2, 7). What is its gradient?',
    options: ['2', '4', '0.5', '10'],
    correctAnswer: 0,
    explanation:
      'Gradient = up ÷ across. Up: 7 − 3 = 4. Across: 2 − 0 = 2. So 4 ÷ 2 = 2. Answering 4 means you found the rise but forgot to divide by the horizontal distance.',
  },
  {
    id: 'q9-gr-3', subjectId: 'mathematics', grade: 9, topicId: 'g9-math-graphs',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'What does a NEGATIVE gradient tell you about a line?',
    options: [
      'It is below the x-axis',
      'It falls as you move to the right',
      'It is steeper than a positive gradient',
      'It does not cross the y-axis',
    ],
    correctAnswer: 1,
    explanation:
      'A negative gradient means the line goes DOWN as x increases. The sign gives the direction and the size gives the steepness, so y = −5x is steep and falling while y = −0.5x is gentle and falling. A line with negative gradient can still sit above the x-axis.',
  },
  {
    id: 'q9-let-1', subjectId: 'english', grade: 9, topicId: 'g9-eng-letters',
    difficulty: 'core', provenance: 'liblearn',
    question: 'You begin a formal letter "Dear Sir". How should you end it?',
    options: ['Yours sincerely', 'Yours faithfully', 'Best wishes', 'Regards'],
    correctAnswer: 1,
    explanation:
      '"Dear Sir" or "Dear Madam" means you do not know the person’s name, so you close "Yours faithfully". Use "Yours sincerely" only when you addressed them by name, as in "Dear Mr Kollie". "Best wishes" is informal.',
  },
  {
    id: 'q9-let-2', subjectId: 'english', grade: 9, topicId: 'g9-eng-letters',
    difficulty: 'core', provenance: 'liblearn',
    question: 'What should the FIRST paragraph of a formal letter do?',
    options: [
      'Describe your background in detail',
      'State clearly why you are writing',
      'Thank the reader at length',
      'Explain how you found their address',
    ],
    correctAnswer: 1,
    explanation:
      'State the purpose immediately, in a sentence or two. The reader may have many letters to get through, and if your opening does not say what this one is, you have made their job harder. Detail belongs in paragraph two.',
  },
  {
    id: 'q9-mat-1', subjectId: 'general-science', grade: 9, topicId: 'g9-sci-matter',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which of these is a compound?',
    options: ['Oxygen', 'Air', 'Water', 'Iron'],
    correctAnswer: 2,
    explanation:
      'Water (H₂O) is hydrogen and oxygen chemically joined in fixed proportions — always 2 to 1. Oxygen and iron are elements, one kind of atom each. Air is a mixture of gases that are not chemically joined.',
  },
  {
    id: 'q9-mat-2', subjectId: 'general-science', grade: 9, topicId: 'g9-sci-matter',
    difficulty: 'challenge', provenance: 'liblearn',
    question:
      'Sodium reacts violently with water and chlorine is a poisonous gas, yet sodium chloride is safe to eat. Why?',
    options: [
      'The dangerous parts are removed during the reaction',
      'A compound is a new substance with its own properties, not a mixture of its elements',
      'Salt contains only a tiny amount of each',
      'Sodium and chlorine are not really dangerous',
    ],
    correctAnswer: 1,
    explanation:
      'When elements bond chemically they form a NEW substance whose properties need not resemble theirs at all. Nothing is removed and no element is present in its free form. This is the clearest difference from a mixture, where each part keeps its own behaviour.',
  },
  {
    id: 'q9-mat-3', subjectId: 'general-science', grade: 9, topicId: 'g9-sci-matter',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Which is the best evidence that sea water is a MIXTURE rather than a compound?',
    options: [
      'It tastes salty',
      'The salt can be separated out by evaporating the water',
      'It is a liquid',
      'It contains more than one element',
    ],
    correctAnswer: 1,
    explanation:
      'A mixture can be separated by physical means such as evaporation; a compound needs a chemical reaction. Containing several elements is not enough on its own — water itself contains two and is a compound.',
  },
  {
    id: 'q9-tr-1', subjectId: 'social-studies', grade: 9, topicId: 'g9-soc-trade',
    difficulty: 'core', provenance: 'liblearn',
    question: 'How can both people gain from a single trade?',
    options: [
      'One must always lose for the other to gain',
      'Each values what they receive more than what they give up',
      'The trader with more goods always gains',
      'Only if money is used',
    ],
    correctAnswer: 1,
    explanation:
      'A farmer with surplus rice values some fish more than her tenth bag of rice, and the fisherman feels the same in reverse. Both end up better off although nothing new was produced. Trade creates value; it does not just move it.',
  },
  {
    id: 'q9-tr-2', subjectId: 'social-studies', grade: 9, topicId: 'g9-soc-trade',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'What problem with barter does money solve?',
    options: [
      'Barter is illegal',
      'Barter needs both people to want what the other has, at the same time',
      'Barter is slower to carry',
      'Barter cannot be used for food',
    ],
    correctAnswer: 1,
    explanation:
      'This is the double coincidence of wants. With barter you must find someone who has what you want AND wants what you have. Money removes that: you sell to anyone who wants your goods and buy from anyone selling what you need.',
  },
  {
    id: 'q9-dem-1', subjectId: 'civics', grade: 9, topicId: 'g9-civ-democracy',
    difficulty: 'core', provenance: 'liblearn',
    question:
      'A country holds elections, but newspapers may not criticise the government and opposition candidates are arrested. Is this democratic?',
    options: [
      'Yes — an election was held',
      'No — voting alone is not enough without free expression and real choice',
      'Yes, if many people voted',
      'Only if the count was accurate',
    ],
    correctAnswer: 1,
    explanation:
      'A vote expresses the people’s will only if they can find out what is happening, choose freely, and have the choice counted honestly. Without free expression and genuine alternatives, the election is a ceremony rather than a decision.',
  },
  {
    id: 'q9-dem-2', subjectId: 'civics', grade: 9, topicId: 'g9-civ-democracy',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'Why do democracies limit what a majority may vote to do?',
    options: [
      'Because majorities are usually wrong',
      'Because a majority removing others’ basic rights would leave those people with no rights at all',
      'Because voting is unreliable',
      'They do not — a majority may decide anything',
    ],
    correctAnswer: 1,
    explanation:
      'If 60% could vote away the rights of the other 40%, those 40% would hold only permissions that could be withdrawn. A majority is not fixed either — today’s majority may be tomorrow’s minority. Such limits protect democracy rather than weaken it.',
  },

  /* ================================================= GRADE 12 ========== */
  {
    id: 'q12-av-1', subjectId: 'mathematics', grade: 12, topicId: 'g12-math-averages',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Find the median of: 12, 15, 15, 18, 20, 100',
    options: ['15', '16.5', '30', '18'],
    correctAnswer: 1,
    explanation:
      'With six values there is no single middle, so take the mean of the middle two: (15 + 18) ÷ 2 = 16.5. Answering 15 takes only the third value; with an even count you must average the pair.',
  },
  {
    id: 'q12-av-2', subjectId: 'mathematics', grade: 12, topicId: 'g12-math-averages',
    difficulty: 'challenge', provenance: 'liblearn',
    question:
      'Seven workers earn 50, 55, 60, 60, 65, 70 and 700. Which average best describes a typical wage?',
    options: [
      'The mean, because it uses every value',
      'The median, because the 700 distorts the mean',
      'The mode, because it is easiest',
      'They all describe it equally well',
    ],
    correctAnswer: 1,
    explanation:
      'The mean is about 151, yet six of the seven earn less than that and nobody earns near it — the outlier of 700 drags it up. The median of 60 describes a typical worker properly. Using every value is a weakness, not a strength, when one value is extreme.',
  },
  {
    id: 'q12-av-3', subjectId: 'mathematics', grade: 12, topicId: 'g12-math-averages',
    difficulty: 'core', provenance: 'liblearn',
    question: 'A shop records the colours of shirts sold. Which average can be used?',
    options: ['Mean', 'Median', 'Mode', 'All three'],
    correctAnswer: 2,
    explanation:
      'Only the mode. Colours are categories, not numbers — you cannot add them or put them in a meaningful order, so mean and median have no meaning. The mode gives the most frequent colour, which is exactly what a shop needs to know.',
  },
  {
    id: 'q12-sum-1', subjectId: 'english', grade: 12, topicId: 'g12-eng-summary',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Which is the most serious fault in summary writing?',
    options: [
      'Writing fewer words than the limit',
      'Copying whole sentences from the passage',
      'Using short sentences',
      'Putting points in a different order',
    ],
    correctAnswer: 1,
    explanation:
      'Copying shows nothing about whether you understood — that is precisely what a summary tests. Paraphrase in your own words. Being under the limit is fine, and reordering points is acceptable if the meaning is preserved.',
  },
  {
    id: 'q12-sum-2', subjectId: 'english', grade: 12, topicId: 'g12-eng-summary',
    difficulty: 'core', provenance: 'liblearn',
    question:
      '"Deforestation harms communities. In one district, 200 families lost firewood access." In a summary, what happens to the second sentence?',
    options: [
      'Keep it — statistics are important',
      'Cut it — it is an example supporting the main point',
      'Keep it and cut the first',
      'Rewrite it as the topic sentence',
    ],
    correctAnswer: 1,
    explanation:
      'The first sentence is the main idea; the second illustrates it. Specific numbers and named examples are almost always supporting detail, and they are the first thing to cut when reducing a passage.',
  },
  {
    id: 'q12-cir-1', subjectId: 'biology', grade: 12, topicId: 'g12-bio-circulation',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Why is the wall of the left ventricle thicker than the right?',
    options: [
      'It holds more blood',
      'It must pump blood to the whole body, not just to the lungs',
      'It beats more often',
      'It contains more valves',
    ],
    correctAnswer: 1,
    explanation:
      'The right ventricle pumps only to the lungs, which are close by. The left pumps to the entire body, so it must generate far greater pressure and needs more muscle. Both hold a similar volume and beat together — the difference is distance, not capacity.',
  },
  {
    id: 'q12-cir-2', subjectId: 'biology', grade: 12, topicId: 'g12-bio-circulation',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'The pulmonary artery carries DEOXYGENATED blood. Why is it still called an artery?',
    options: [
      'It is a mistake in naming',
      'Because arteries are defined by carrying blood away from the heart, not by oxygen',
      'Because it becomes oxygenated later',
      'Because it has thin walls',
    ],
    correctAnswer: 1,
    explanation:
      'Artery means AWAY from the heart; vein means TOWARD it. Oxygen is not part of the definition. The pulmonary artery carries deoxygenated blood to the lungs, and the pulmonary vein carries oxygenated blood back — the two standard exceptions, and the ones most often asked.',
  },
  {
    id: 'q12-cir-3', subjectId: 'biology', grade: 12, topicId: 'g12-bio-circulation',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Why must capillary walls be only one cell thick?',
    options: [
      'To let blood travel faster',
      'So substances can be exchanged easily between blood and cells',
      'To save space in the body',
      'So they can carry more blood',
    ],
    correctAnswer: 1,
    explanation:
      'Capillaries are where exchange happens — oxygen and nutrients out to cells, carbon dioxide and waste in. A thin wall means a short diffusion distance. Thin walls actually slow blood down, which gives more time for that exchange.',
  },
  {
    id: 'q12-hc-1', subjectId: 'chemistry', grade: 12, topicId: 'g12-chem-hydrocarbons',
    difficulty: 'core', provenance: 'liblearn',
    question: 'C₃H₆ — is this an alkane or an alkene?',
    options: ['Alkane', 'Alkene', 'Neither', 'Both'],
    correctAnswer: 1,
    explanation:
      'Alkenes follow CₙH₂ₙ. With n = 3, 2n = 6, so C₃H₆ fits — it is propene. An alkane with 3 carbons would be CₙH₂ₙ₊₂ = C₃H₈. Test the formula against both patterns rather than guessing from the name.',
  },
  {
    id: 'q12-hc-2', subjectId: 'chemistry', grade: 12, topicId: 'g12-chem-hydrocarbons',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'What happens when bromine water is shaken with an alkene?',
    options: [
      'It stays orange-brown',
      'It is decolourised',
      'It turns blue',
      'It gives off a gas',
    ],
    correctAnswer: 1,
    explanation:
      'The C=C double bond opens and bromine adds across it, forming a colourless product, so the orange-brown colour disappears. An alkane has no double bond to open and leaves the colour unchanged. Use "decolourised" — not "turns white" or "goes clear".',
  },
  {
    id: 'q12-hc-3', subjectId: 'chemistry', grade: 12, topicId: 'g12-chem-hydrocarbons',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Why does carbon form so many different compounds?',
    options: [
      'It is the most common element',
      'It forms four bonds and bonds strongly to other carbon atoms, building chains and rings',
      'It is a metal',
      'It reacts with everything',
    ],
    correctAnswer: 1,
    explanation:
      'Four bonds per atom plus strong carbon-to-carbon bonding lets carbon build chains, branches and rings of almost any size. Very few elements do this, which is why carbon compounds number in the millions while most elements form comparatively few.',
  },
  {
    id: 'q12-wav-1', subjectId: 'physics', grade: 12, topicId: 'g12-phys-waves',
    difficulty: 'core', provenance: 'liblearn',
    question: 'A wave has frequency 170 Hz and speed 340 m/s. What is its wavelength?',
    options: ['0.5 m', '2 m', '510 m', '57800 m'],
    correctAnswer: 1,
    explanation:
      'Use v = fλ, so λ = v ÷ f = 340 ÷ 170 = 2 m. Choosing 57800 means you multiplied instead of dividing — check the units: metres per second divided by per-second leaves metres.',
  },
  {
    id: 'q12-wav-2', subjectId: 'physics', grade: 12, topicId: 'g12-phys-waves',
    difficulty: 'challenge', provenance: 'liblearn',
    question:
      'A sound’s frequency doubles while it travels through the same air. What happens to its wavelength?',
    options: [
      'It doubles',
      'It halves',
      'It stays the same',
      'It becomes four times larger',
    ],
    correctAnswer: 1,
    explanation:
      'Speed depends on the medium, not the source, so v is unchanged. In v = fλ, if f doubles then λ must halve for the product to stay constant. A higher-pitched sound has a shorter wavelength but travels at exactly the same speed.',
  },
  {
    id: 'q12-wav-3', subjectId: 'physics', grade: 12, topicId: 'g12-phys-waves',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'Why can light travel through a vacuum but sound cannot?',
    options: [
      'Light is faster',
      'Sound is longitudinal and needs particles to compress; light does not need a medium',
      'A vacuum absorbs sound',
      'Sound is too weak',
    ],
    correctAnswer: 1,
    explanation:
      'Sound is a longitudinal wave — it travels by squeezing and stretching the particles of a medium. With no particles there is nothing to compress, so no sound. Light needs no medium at all. Speed is irrelevant to whether a wave can cross a vacuum.',
  },
  {
    id: 'q12-par-1', subjectId: 'civics', grade: 12, topicId: 'g12-civ-participation',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Why does participation between elections matter?',
    options: [
      'It does not — voting is enough',
      'Government acts every day, while elections happen only every few years',
      'Because voting is optional',
      'To make elections unnecessary',
    ],
    correctAnswer: 1,
    explanation:
      'Budgets are set, contracts awarded and services run continuously. If citizens engage only on polling day, all of that goes unexamined for years. A vote judges the past and chooses the future; it does not influence the years in between.',
  },
  {
    id: 'q12-par-2', subjectId: 'civics', grade: 12, topicId: 'g12-civ-participation',
    difficulty: 'challenge', provenance: 'liblearn',
    question:
      'A message circulates claiming an official stole funds. What is the best first step before sharing it?',
    options: [
      'Share it quickly so people are warned',
      'Check whether there is a primary source, and ask who benefits if it is believed',
      'Ignore it entirely',
      'Share it only with friends',
    ],
    correctAnswer: 1,
    explanation:
      'Participation helps only when it rests on accurate information; spreading an unchecked claim degrades the decision and outlives the correction. Ask where it came from, whether a document or record supports it, and who gains if you believe it — especially when it matches what you already think.',
  },
];

export const OTHER_GRADE_QUIZZES: Quiz[] = [
  {id: 'quiz-g5-equivalent', topicId: 'g5-math-equivalent', subjectId: 'mathematics', grade: 5,
   title: 'Equivalent Fractions Check', lessonId: 'g5-math-equivalent-l1',
   questionIds: ['q5-eq-1', 'q5-eq-2', 'q5-eq-3']},
  {id: 'quiz-g5-paragraph', topicId: 'g5-eng-paragraph', subjectId: 'english', grade: 5,
   title: 'Paragraphs Check', lessonId: 'g5-eng-paragraph-l1',
   questionIds: ['q5-par-1', 'q5-par-2']},
  {id: 'quiz-g5-water', topicId: 'g5-sci-water-cycle', subjectId: 'general-science', grade: 5,
   title: 'Water Cycle Check', lessonId: 'g5-sci-water-cycle-l1',
   questionIds: ['q5-wc-1', 'q5-wc-2', 'q5-wc-3']},
  {id: 'quiz-g5-resources', topicId: 'g5-soc-resources', subjectId: 'social-studies', grade: 5,
   title: 'Natural Resources Check', lessonId: 'g5-soc-resources-l1',
   questionIds: ['q5-res-1', 'q5-res-2']},

  {id: 'quiz-g7-negatives', topicId: 'g7-math-negatives', subjectId: 'mathematics', grade: 7,
   title: 'Negative Numbers Check', lessonId: 'g7-math-negatives-l1',
   questionIds: ['q7-neg-1', 'q7-neg-2', 'q7-neg-3']},
  {id: 'quiz-g7-tenses', topicId: 'g7-eng-tenses', subjectId: 'english', grade: 7,
   title: 'Verb Tenses Check', lessonId: 'g7-eng-tenses-l1',
   questionIds: ['q7-ten-1', 'q7-ten-2']},
  {id: 'quiz-g7-energy', topicId: 'g7-sci-energy', subjectId: 'general-science', grade: 7,
   title: 'Energy Check', lessonId: 'g7-sci-energy-l1',
   questionIds: ['q7-en-1', 'q7-en-2']},
  {id: 'quiz-g7-climate', topicId: 'g7-soc-climate', subjectId: 'social-studies', grade: 7,
   title: 'Weather and Climate Check', lessonId: 'g7-soc-climate-l1',
   questionIds: ['q7-cli-1', 'q7-cli-2']},
  {id: 'quiz-g7-rights', topicId: 'g7-civ-rights', subjectId: 'civics', grade: 7,
   title: 'Rights and Responsibilities Check', lessonId: 'g7-civ-rights-l1',
   questionIds: ['q7-civ-1', 'q7-civ-2']},

  {id: 'quiz-g9-graphs', topicId: 'g9-math-graphs', subjectId: 'mathematics', grade: 9,
   title: 'Straight Line Graphs Check', lessonId: 'g9-math-graphs-l1',
   questionIds: ['q9-gr-1', 'q9-gr-2', 'q9-gr-3']},
  {id: 'quiz-g9-letters', topicId: 'g9-eng-letters', subjectId: 'english', grade: 9,
   title: 'Formal Letters Check', lessonId: 'g9-eng-letters-l1',
   questionIds: ['q9-let-1', 'q9-let-2']},
  {id: 'quiz-g9-matter', topicId: 'g9-sci-matter', subjectId: 'general-science', grade: 9,
   title: 'Elements and Compounds Check', lessonId: 'g9-sci-matter-l1',
   questionIds: ['q9-mat-1', 'q9-mat-2', 'q9-mat-3']},
  {id: 'quiz-g9-trade', topicId: 'g9-soc-trade', subjectId: 'social-studies', grade: 9,
   title: 'Why People Trade Check', lessonId: 'g9-soc-trade-l1',
   questionIds: ['q9-tr-1', 'q9-tr-2']},
  {id: 'quiz-g9-democracy', topicId: 'g9-civ-democracy', subjectId: 'civics', grade: 9,
   title: 'Democracy Check', lessonId: 'g9-civ-democracy-l1',
   questionIds: ['q9-dem-1', 'q9-dem-2']},

  {id: 'quiz-g12-averages', topicId: 'g12-math-averages', subjectId: 'mathematics', grade: 12,
   title: 'Mean, Median and Mode Check', lessonId: 'g12-math-averages-l1',
   questionIds: ['q12-av-1', 'q12-av-2', 'q12-av-3']},
  {id: 'quiz-g12-summary', topicId: 'g12-eng-summary', subjectId: 'english', grade: 12,
   title: 'Summary Writing Check', lessonId: 'g12-eng-summary-l1',
   questionIds: ['q12-sum-1', 'q12-sum-2']},
  {id: 'quiz-g12-circulation', topicId: 'g12-bio-circulation', subjectId: 'biology', grade: 12,
   title: 'Circulatory System Check', lessonId: 'g12-bio-circulation-l1',
   questionIds: ['q12-cir-1', 'q12-cir-2', 'q12-cir-3']},
  {id: 'quiz-g12-hydrocarbons', topicId: 'g12-chem-hydrocarbons', subjectId: 'chemistry', grade: 12,
   title: 'Hydrocarbons Check', lessonId: 'g12-chem-hydrocarbons-l1',
   questionIds: ['q12-hc-1', 'q12-hc-2', 'q12-hc-3']},
  {id: 'quiz-g12-waves', topicId: 'g12-phys-waves', subjectId: 'physics', grade: 12,
   title: 'Properties of Waves Check', lessonId: 'g12-phys-waves-l1',
   questionIds: ['q12-wav-1', 'q12-wav-2', 'q12-wav-3']},
  {id: 'quiz-g12-participation', topicId: 'g12-civ-participation', subjectId: 'civics', grade: 12,
   title: 'Citizen Participation Check', lessonId: 'g12-civ-participation-l1',
   questionIds: ['q12-par-1', 'q12-par-2']},
];
