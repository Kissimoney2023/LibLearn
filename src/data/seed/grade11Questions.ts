import type {Question, Quiz} from '../../types/domain';

/**
 * GRADE 11 QUESTION BANK — provenance: 'liblearn' throughout.
 *
 * Written to match the Grade 11 lessons in ./grade11.ts. These are LibLearn
 * practice questions, NOT past papers, and they carry no official standing with
 * WAEC or the Ministry of Education.
 *
 * Every question targets a misconception the matching lesson calls out, rather
 * than testing recall of a definition. The explanation is written to teach the
 * student who got it wrong, since that is the only moment they are certain to
 * read it.
 */
export const GRADE11_QUESTIONS: Question[] = [
  /* -------------------------------------- Mathematics — Quadratics ---- */
  {
    id: 'q11-quad-1', subjectId: 'mathematics', grade: 11, topicId: 'g11-math-quadratics',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'wassce',
    question: 'Which of these is a quadratic equation in standard form?',
    options: ['3x + 5 = 0', 'x² + 2x − 8 = 0', 'x³ − 1 = 0', '2/x = 4'],
    correctAnswer: 1,
    explanation:
      'Standard form is ax² + bx + c = 0: the highest power of x must be exactly 2, and everything must be on one side. 3x + 5 = 0 is linear (highest power 1), x³ − 1 = 0 is cubic, and 2/x = 4 has x in the denominator, so it is not a polynomial equation at all.',
  },
  {
    id: 'q11-quad-2', subjectId: 'mathematics', grade: 11, topicId: 'g11-math-quadratics',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'Factorise:  x² + 5x + 6',
    options: ['(x + 1)(x + 6)', '(x + 2)(x + 3)', '(x − 2)(x − 3)', '(x + 5)(x + 6)'],
    correctAnswer: 1,
    explanation:
      'You need two numbers that multiply to 6 and add to 5. Check the pairs: 1 and 6 multiply to 6 but add to 7. 2 and 3 multiply to 6 and add to 5 — correct. So the factors are (x + 2)(x + 3). Expanding back gives x² + 3x + 2x + 6 = x² + 5x + 6.',
  },
  {
    id: 'q11-quad-3', subjectId: 'mathematics', grade: 11, topicId: 'g11-math-quadratics',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'The equation (x + 4)(x − 2) = 0 has which solutions?',
    options: ['x = 4 or x = −2', 'x = −4 or x = 2', 'x = 4 or x = 2', 'x = −4 or x = −2'],
    correctAnswer: 1,
    explanation:
      'Set each bracket to zero separately. From x + 4 = 0 you get x = −4. From x − 2 = 0 you get x = 2. Note the sign flips: the bracket (x + 4) gives the root −4, not +4. Reading the numbers straight out of the brackets is the most common error here.',
  },
  {
    id: 'q11-quad-4', subjectId: 'mathematics', grade: 11, topicId: 'g11-math-quadratics',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'For 2x² − 7x + 3 = 0, what is the value of the discriminant b² − 4ac?',
    options: ['25', '73', '−25', '49'],
    correctAnswer: 0,
    explanation:
      'Here a = 2, b = −7 and c = 3. So b² − 4ac = (−7)² − 4(2)(3) = 49 − 24 = 25. Keeping the minus sign on b matters, though in this case squaring removes it. Since 25 is positive, the equation has two different real roots.',
  },
  {
    id: 'q11-quad-5', subjectId: 'mathematics', grade: 11, topicId: 'g11-math-quadratics',
    difficulty: 'challenge', provenance: 'liblearn', examGoal: 'wassce',
    question: 'How many real roots does x² + 2x + 5 = 0 have?',
    options: ['Two', 'One', 'None', 'Cannot be determined'],
    correctAnswer: 2,
    explanation:
      'Find the discriminant: b² − 4ac = 2² − 4(1)(5) = 4 − 20 = −16. It is negative, and a negative number has no real square root, so the formula produces no real answer. The equation has no real roots — its graph never crosses the x-axis. You can answer this without solving anything.',
  },

  /* ------------------------------------ Mathematics — Trigonometry ---- */
  {
    id: 'q11-trig-1', subjectId: 'mathematics', grade: 11, topicId: 'g11-math-trigonometry',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'wassce',
    question: 'In a right-angled triangle, which side is always the hypotenuse?',
    options: [
      'The side opposite the right angle',
      'The side adjacent to the chosen angle',
      'The shortest side',
      'The vertical side',
    ],
    correctAnswer: 0,
    explanation:
      'The hypotenuse is always opposite the right angle, and it is always the longest side. Unlike "opposite" and "adjacent", which swap depending on which angle you are working from, the hypotenuse never changes.',
  },
  {
    id: 'q11-trig-2', subjectId: 'mathematics', grade: 11, topicId: 'g11-math-trigonometry',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question:
      'You know the hypotenuse and want the side opposite a given angle. Which ratio should you use?',
    options: ['Cosine', 'Sine', 'Tangent', 'Pythagoras'],
    correctAnswer: 1,
    explanation:
      'SOH-CAH-TOA: sine links Opposite and Hypotenuse, which are exactly the two sides involved. Cosine uses adjacent and hypotenuse; tangent uses opposite and adjacent. Pick the ratio containing the side you know and the side you want.',
  },
  {
    id: 'q11-trig-3', subjectId: 'mathematics', grade: 11, topicId: 'g11-math-trigonometry',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'A ramp rises 3 m over a horizontal distance of 4 m. What is tan of the angle it makes with the ground?',
    options: ['0.75', '1.33', '0.6', '0.8'],
    correctAnswer: 0,
    explanation:
      'tan = opposite / adjacent. The rise (3 m) is opposite the angle and the horizontal distance (4 m) is adjacent, so tan θ = 3/4 = 0.75. Dividing the wrong way round gives 1.33, which is the tangent of the other angle in the triangle.',
  },

  /* ---------------------------------------- Biology — Photosynthesis -- */
  {
    id: 'q11-photo-1', subjectId: 'biology', grade: 11, topicId: 'g11-bio-photosynthesis',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'wassce',
    question: 'Which are the raw materials for photosynthesis?',
    options: [
      'Glucose and oxygen',
      'Carbon dioxide and water',
      'Oxygen and water',
      'Glucose and carbon dioxide',
    ],
    correctAnswer: 1,
    explanation:
      'The equation is 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Carbon dioxide and water go in; glucose and oxygen come out. Glucose and oxygen are the PRODUCTS — reversing them is the most common slip, and it describes respiration instead.',
  },
  {
    id: 'q11-photo-2', subjectId: 'biology', grade: 11, topicId: 'g11-bio-photosynthesis',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'Why is chlorophyll written above the arrow in the equation rather than as a reactant?',
    options: [
      'It is used up during the reaction',
      'It absorbs light energy but is not consumed',
      'It is a product of the reaction',
      'It only acts at night',
    ],
    correctAnswer: 1,
    explanation:
      'Chlorophyll captures light energy so the reaction can proceed, but it is not used up and does not end up in the glucose. The same is true of light itself. Substances written above the arrow enable the reaction without being consumed by it.',
  },
  {
    id: 'q11-photo-3', subjectId: 'biology', grade: 11, topicId: 'g11-bio-photosynthesis',
    difficulty: 'challenge', provenance: 'liblearn', examGoal: 'wassce',
    question:
      'A graph of photosynthesis rate against light intensity rises then levels off. What does the flat section show?',
    options: [
      'The plant has stopped photosynthesising',
      'Light is still the limiting factor',
      'Another factor, such as CO₂ or temperature, has become limiting',
      'The chlorophyll has been used up',
    ],
    correctAnswer: 2,
    explanation:
      'While the line rises, light is limiting — more light gives more rate. Once it plateaus, adding light changes nothing, so something else is now the constraint, usually CO₂ concentration or temperature. The plant is still photosynthesising, just capped by a different factor. Answering "it has enough light" does not name the limiting factor and loses marks.',
  },
  {
    id: 'q11-photo-4', subjectId: 'biology', grade: 11, topicId: 'g11-bio-photosynthesis',
    difficulty: 'challenge', provenance: 'liblearn', examGoal: 'wassce',
    question:
      'Unlike light intensity, raising temperature well past the optimum makes the rate FALL. Why?',
    options: [
      'Carbon dioxide dissolves less readily',
      'Enzymes denature and lose their shape',
      'Chlorophyll changes colour',
      'The stomata close permanently',
    ],
    correctAnswer: 1,
    explanation:
      'Photosynthesis is enzyme-controlled, and enzymes are proteins. Excess heat changes the shape of the active site permanently, so reactions slow sharply. This is why the temperature curve peaks and falls, while light and CO₂ curves simply level off — a distinction examiners test often.',
  },

  /* -------------------------------------------- Biology — Genetics ---- */
  {
    id: 'q11-gen-1', subjectId: 'biology', grade: 11, topicId: 'g11-bio-genetics',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'wassce',
    question: 'What is the difference between genotype and phenotype?',
    options: [
      'Genotype is the alleles carried; phenotype is the characteristic shown',
      'Genotype is what you see; phenotype is the DNA',
      'They mean the same thing',
      'Genotype applies to plants, phenotype to animals',
    ],
    correctAnswer: 0,
    explanation:
      'Genotype is the pair of alleles an organism carries, such as Tt. Phenotype is the characteristic that results, such as "tall". The distinction matters because TT and Tt give the same phenotype but behave differently when bred.',
  },
  {
    id: 'q11-gen-2', subjectId: 'biology', grade: 11, topicId: 'g11-bio-genetics',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'Crossing two heterozygous plants (Tt × Tt) gives what phenotype ratio?',
    options: ['1 tall : 1 short', '3 tall : 1 short', 'All tall', '1 tall : 3 short'],
    correctAnswer: 1,
    explanation:
      'The Punnett square gives TT, Tt, Tt and tt. The first three all contain at least one dominant T, so they are tall; only tt is short. That is 3 tall : 1 short. The genotype ratio is different — 1 TT : 2 Tt : 1 tt — so read carefully which ratio the question wants.',
  },
  {
    id: 'q11-gen-3', subjectId: 'biology', grade: 11, topicId: 'g11-bio-genetics',
    difficulty: 'challenge', provenance: 'liblearn', examGoal: 'wassce',
    question:
      'A tall plant crossed with a short plant (tt) produces about half tall and half short offspring. What is the tall parent’s genotype?',
    options: ['TT', 'Tt', 'tt', 'Impossible to tell'],
    correctAnswer: 1,
    explanation:
      'If the tall parent were TT, every offspring would inherit a T and all would be tall. Getting roughly half short means the tall parent must carry a recessive allele to pass on, so it is Tt. Tt × tt gives a 1:1 ratio, which is exactly what was observed.',
  },

  /* ------------------------------------------- Chemistry — The Mole --- */
  {
    id: 'q11-mole-1', subjectId: 'chemistry', grade: 11, topicId: 'g11-chem-mole',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'wassce',
    question: 'How many particles are in one mole of a substance?',
    options: ['6.02 × 10²³', '6.02 × 10²²', '1 × 10²³', '3.01 × 10²³'],
    correctAnswer: 0,
    explanation:
      'One mole contains 6.02 × 10²³ particles — Avogadro’s constant. It is a counting unit for very large numbers, in the same way a dozen is a counting unit for twelve.',
  },
  {
    id: 'q11-mole-2', subjectId: 'chemistry', grade: 11, topicId: 'g11-chem-mole',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'What is the molar mass of CO₂?  (C = 12, O = 16)',
    options: ['28 g/mol', '44 g/mol', '32 g/mol', '56 g/mol'],
    correctAnswer: 1,
    explanation:
      'Add the atomic masses in the formula: carbon contributes 12, and there are two oxygens contributing 2 × 16 = 32. So 12 + 32 = 44 g/mol. Choosing 28 means only one oxygen was counted.',
  },
  {
    id: 'q11-mole-3', subjectId: 'chemistry', grade: 11, topicId: 'g11-chem-mole',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'How many moles are in 36 g of water, H₂O?  (H = 1, O = 16)',
    options: ['1 mol', '2 mol', '0.5 mol', '18 mol'],
    correctAnswer: 1,
    explanation:
      'Molar mass of H₂O = (2 × 1) + 16 = 18 g/mol. Then moles = mass / molar mass = 36 / 18 = 2 mol. A quick sanity check: 36 g is twice 18 g, so 2 moles.',
  },
  {
    id: 'q11-mole-4', subjectId: 'chemistry', grade: 11, topicId: 'g11-chem-mole',
    difficulty: 'challenge', provenance: 'liblearn', examGoal: 'wassce',
    question: 'A sample of 0.1 mol of a gas has a mass of 4.4 g. What is its molar mass?',
    options: ['4.4 g/mol', '44 g/mol', '0.44 g/mol', '440 g/mol'],
    correctAnswer: 1,
    explanation:
      'Rearrange the key equation: molar mass = mass / moles = 4.4 / 0.1 = 44 g/mol. Dividing by 0.1 multiplies by 10, which trips people up. A molar mass of 44 g/mol suggests the gas is carbon dioxide.',
  },

  /* ------------------------------------------ Chemistry — Bonding ----- */
  {
    id: 'q11-bond-1', subjectId: 'chemistry', grade: 11, topicId: 'g11-chem-bonding',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'wassce',
    question: 'What type of bonding forms between a metal and a non-metal?',
    options: ['Covalent', 'Ionic', 'Metallic', 'No bond forms'],
    correctAnswer: 1,
    explanation:
      'A metal loses electrons to form a positive ion and a non-metal gains them to form a negative ion. The opposite charges attract, which is ionic bonding. Covalent bonding is sharing, and happens between two non-metals.',
  },
  {
    id: 'q11-bond-2', subjectId: 'chemistry', grade: 11, topicId: 'g11-chem-bonding',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'Why does solid sodium chloride not conduct electricity, while molten sodium chloride does?',
    options: [
      'The ions are destroyed when solid',
      'The ions are fixed in the lattice when solid and free to move when molten',
      'Solid NaCl contains no ions',
      'Melting converts the bonding to covalent',
    ],
    correctAnswer: 1,
    explanation:
      'Conduction needs charged particles that are free to move. The ions exist in both states, but in the solid lattice they are locked in position. Melting frees them, so the liquid conducts. The ions are neither destroyed nor changed — only their mobility changes.',
  },
  {
    id: 'q11-bond-3', subjectId: 'chemistry', grade: 11, topicId: 'g11-chem-bonding',
    difficulty: 'challenge', provenance: 'liblearn', examGoal: 'wassce',
    question: 'When water boils, what is actually broken?',
    options: [
      'The O–H covalent bonds inside each molecule',
      'The forces of attraction between separate water molecules',
      'Both equally',
      'The oxygen atoms split apart',
    ],
    correctAnswer: 1,
    explanation:
      'Boiling separates whole molecules from one another by overcoming the weak forces between them. The strong covalent O–H bonds inside each molecule survive, which is why steam is still H₂O rather than hydrogen and oxygen gas. Melting and boiling points tell you about forces BETWEEN particles, not bonds within them.',
  },

  /* --------------------------------------------- Physics — Motion ----- */
  {
    id: 'q11-motion-1', subjectId: 'physics', grade: 11, topicId: 'g11-phys-motion',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'wassce',
    question: 'A book rests on a table without moving. What is the resultant force on it?',
    options: ['Equal to its weight', 'Zero', 'Upward', 'Downward'],
    correctAnswer: 1,
    explanation:
      'Gravity pulls the book down and the table pushes up with an equal force, so the two cancel and the resultant is zero. By Newton’s first law, zero resultant force means no change in motion — the book stays at rest. Forces acting does not mean a resultant force.',
  },
  {
    id: 'q11-motion-2', subjectId: 'physics', grade: 11, topicId: 'g11-phys-motion',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'A 1200 kg car has a 3600 N driving force and 600 N of resistance. What is its acceleration?',
    options: ['3.0 m/s²', '2.5 m/s²', '0.5 m/s²', '3.5 m/s²'],
    correctAnswer: 1,
    explanation:
      'Find the RESULTANT force first: 3600 − 600 = 3000 N. Then a = F/m = 3000/1200 = 2.5 m/s². Using the 3600 N driving force alone gives 3.0 m/s² — a wrong answer that looks plausible, which is why the resultant step must be written down explicitly.',
  },
  {
    id: 'q11-motion-3', subjectId: 'physics', grade: 11, topicId: 'g11-phys-motion',
    difficulty: 'challenge', provenance: 'liblearn', examGoal: 'wassce',
    question:
      'A book rests on a table. Are "gravity pulling the book down" and "the table pushing the book up" an action–reaction pair?',
    options: [
      'Yes, they are equal and opposite',
      'No, because they both act on the same object',
      'Yes, because the book is not moving',
      'No, because gravity is not a real force',
    ],
    correctAnswer: 1,
    explanation:
      'Action–reaction pairs act on DIFFERENT objects. Both of these forces act on the book, so they are balanced forces under the first law, not a third-law pair. The genuine partner to "the table pushes up on the book" is "the book pushes down on the table". Being equal and opposite is not sufficient.',
  },

  /* ---------------------------------------- Physics — Electricity ----- */
  {
    id: 'q11-elec-1', subjectId: 'physics', grade: 11, topicId: 'g11-phys-electricity',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'wassce',
    question: 'A 12 V supply drives current through a 4 Ω resistor. What is the current?',
    options: ['48 A', '3 A', '0.33 A', '16 A'],
    correctAnswer: 1,
    explanation:
      'Rearrange V = IR to I = V/R = 12/4 = 3 A. Multiplying instead of dividing gives 48 A, which should look obviously too large for a 12 V supply — checking whether an answer is physically sensible catches this immediately.',
  },
  {
    id: 'q11-elec-2', subjectId: 'physics', grade: 11, topicId: 'g11-phys-electricity',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'In a series circuit, which quantity is the same at every point?',
    options: ['Voltage', 'Current', 'Resistance', 'Power'],
    correctAnswer: 1,
    explanation:
      'A series circuit has one single path, so charge has nowhere else to go and the current is identical everywhere. Voltage is what divides between the components, adding up to the supply voltage. In a PARALLEL circuit the opposite holds: voltage is shared, current divides.',
  },
  {
    id: 'q11-elec-3', subjectId: 'physics', grade: 11, topicId: 'g11-phys-electricity',
    difficulty: 'challenge', provenance: 'liblearn', examGoal: 'wassce',
    question: 'Adding a second resistor in PARALLEL to a circuit has what effect on total resistance?',
    options: [
      'It increases, because there is more resistance in total',
      'It decreases, because current has an additional path',
      'It stays the same',
      'It doubles',
    ],
    correctAnswer: 1,
    explanation:
      'This is counter-intuitive but important: an extra parallel branch gives current another route, so more total current flows for the same voltage, which means total resistance has fallen. The total is always LESS than the smallest individual resistance. Resistances only add in series.',
  },

  /* ---------------------------------------- English — Essay Writing --- */
  {
    id: 'q11-essay-1', subjectId: 'english', grade: 11, topicId: 'g11-eng-essay',
    difficulty: 'foundation', provenance: 'liblearn', examGoal: 'wassce',
    question: 'Which is the strongest thesis statement?',
    options: [
      'This essay will discuss school uniforms.',
      'School uniforms are an interesting topic with many opinions.',
      'School uniforms should be required because they reduce visible inequality, lower family costs and cut distraction.',
      'There are advantages and disadvantages to school uniforms.',
    ],
    correctAnswer: 2,
    explanation:
      'A thesis must take a POSITION, not announce a subject. Only the third option states what the writer will argue and previews the three supporting reasons, which then become the three body paragraphs. The others describe the topic without committing to a view.',
  },
  {
    id: 'q11-essay-2', subjectId: 'english', grade: 11, topicId: 'g11-eng-essay',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'In the P–E–E structure, which part do students most often leave out, losing marks?',
    options: ['Point', 'Evidence', 'Explanation', 'The topic sentence'],
    correctAnswer: 2,
    explanation:
      'Students commonly state a point and give an example, then move on — leaving the reader to work out how the evidence proves the argument. The explanation is where the reasoning is actually demonstrated, so it is where most marks are awarded. Make the link explicit and connect it back to the thesis.',
  },
  {
    id: 'q11-essay-3', subjectId: 'english', grade: 11, topicId: 'g11-eng-essay',
    difficulty: 'core', provenance: 'liblearn', examGoal: 'wassce',
    question: 'What is the correct way to handle a counter-argument?',
    options: [
      'Ignore it so your argument looks stronger',
      'State it and leave it, to appear balanced',
      'Acknowledge it genuinely, then answer it',
      'Put it in the conclusion',
    ],
    correctAnswer: 2,
    explanation:
      'Acknowledging an opposing view shows you have considered the whole question, which strengthens your case — but only if you then ANSWER it. Conceding without answering argues against yourself, and ignoring it leaves an obvious gap. Present the opposing view fairly rather than as a weak version.',
  },

  /* ---------------------------------------------- Civics — Government - */
  {
    id: 'q11-civ-1', subjectId: 'civics', grade: 11, topicId: 'g11-civics-government',
    difficulty: 'foundation', provenance: 'liblearn',
    question: 'Which branch of government is responsible for interpreting the law?',
    options: ['The legislature', 'The executive', 'The judiciary', 'The civil service'],
    correctAnswer: 2,
    explanation:
      'The judiciary interprets law and resolves disputes about what it means. The legislature makes law and the executive enforces it. Separating these three functions prevents any one body from making a law, enforcing it, and judging disputes about it.',
  },
  {
    id: 'q11-civ-2', subjectId: 'civics', grade: 11, topicId: 'g11-civics-government',
    difficulty: 'core', provenance: 'liblearn',
    question: 'Why is a constitution usually harder to amend than an ordinary law?',
    options: [
      'Because it is a longer document',
      'To stop a temporary majority rewriting fundamental rules for short-term advantage',
      'Because only judges may amend it',
      'Because it never needs changing',
    ],
    correctAnswer: 1,
    explanation:
      'A constitution sets the fundamental rules and limits on government power. Requiring a heightened procedure to change it means those rules cannot be swept aside by whoever happens to hold a majority at one moment. Constitutions can and do change — the process is simply made deliberately demanding.',
  },
  {
    id: 'q11-civ-3', subjectId: 'civics', grade: 11, topicId: 'g11-civics-government',
    difficulty: 'challenge', provenance: 'liblearn',
    question: 'Why is legislative control over public spending considered such a powerful check on the executive?',
    options: [
      'Because the legislature can arrest officials',
      'Because the executive cannot act on plans it has no funds for',
      'Because it allows the legislature to appoint judges',
      'Because it transfers executive powers to the legislature',
    ],
    correctAnswer: 1,
    explanation:
      'The legislature need not command the executive directly. By approving, refusing or attaching conditions to funding, it controls what the executive can actually carry out — since a plan without money cannot be implemented. This is why the power to approve spending is among the oldest and most significant legislative powers.',
  },
];

/**
 * One quiz per lesson, so every lesson in ./grade11.ts ends somewhere real.
 * A lesson whose "Take the quiz" button led nowhere would be exactly the kind
 * of dead control this project is not allowed to ship.
 */
export const GRADE11_QUIZZES: Quiz[] = [
  {
    id: 'quiz-g11-quadratics', topicId: 'g11-math-quadratics', subjectId: 'mathematics', grade: 11,
    title: 'Quadratic Equations Check', lessonId: 'g11-math-quadratics-l1',
    questionIds: ['q11-quad-1', 'q11-quad-2', 'q11-quad-3'],
  },
  {
    id: 'quiz-g11-quadratics-2', topicId: 'g11-math-quadratics', subjectId: 'mathematics', grade: 11,
    title: 'Formula & Discriminant Check', lessonId: 'g11-math-quadratics-l2',
    questionIds: ['q11-quad-4', 'q11-quad-5'],
  },
  {
    id: 'quiz-g11-trigonometry', topicId: 'g11-math-trigonometry', subjectId: 'mathematics', grade: 11,
    title: 'Trigonometry Check', lessonId: 'g11-math-trigonometry-l1',
    questionIds: ['q11-trig-1', 'q11-trig-2', 'q11-trig-3'],
  },
  {
    id: 'quiz-g11-photosynthesis', topicId: 'g11-bio-photosynthesis', subjectId: 'biology', grade: 11,
    title: 'Photosynthesis Check', lessonId: 'g11-bio-photosynthesis-l1',
    questionIds: ['q11-photo-1', 'q11-photo-2', 'q11-photo-3', 'q11-photo-4'],
  },
  {
    id: 'quiz-g11-genetics', topicId: 'g11-bio-genetics', subjectId: 'biology', grade: 11,
    title: 'Genetics Check', lessonId: 'g11-bio-genetics-l1',
    questionIds: ['q11-gen-1', 'q11-gen-2', 'q11-gen-3'],
  },
  {
    id: 'quiz-g11-mole', topicId: 'g11-chem-mole', subjectId: 'chemistry', grade: 11,
    title: 'The Mole Check', lessonId: 'g11-chem-mole-l1',
    questionIds: ['q11-mole-1', 'q11-mole-2', 'q11-mole-3', 'q11-mole-4'],
  },
  {
    id: 'quiz-g11-bonding', topicId: 'g11-chem-bonding', subjectId: 'chemistry', grade: 11,
    title: 'Chemical Bonding Check', lessonId: 'g11-chem-bonding-l1',
    questionIds: ['q11-bond-1', 'q11-bond-2', 'q11-bond-3'],
  },
  {
    id: 'quiz-g11-motion', topicId: 'g11-phys-motion', subjectId: 'physics', grade: 11,
    title: "Newton's Laws Check", lessonId: 'g11-phys-motion-l1',
    questionIds: ['q11-motion-1', 'q11-motion-2', 'q11-motion-3'],
  },
  {
    id: 'quiz-g11-electricity', topicId: 'g11-phys-electricity', subjectId: 'physics', grade: 11,
    title: 'Current Electricity Check', lessonId: 'g11-phys-electricity-l1',
    questionIds: ['q11-elec-1', 'q11-elec-2', 'q11-elec-3'],
  },
  {
    id: 'quiz-g11-essay', topicId: 'g11-eng-essay', subjectId: 'english', grade: 11,
    title: 'Essay Structure Check', lessonId: 'g11-eng-essay-l1',
    questionIds: ['q11-essay-1', 'q11-essay-2', 'q11-essay-3'],
  },
  {
    id: 'quiz-g11-civics', topicId: 'g11-civics-government', subjectId: 'civics', grade: 11,
    title: 'Government Structure Check', lessonId: 'g11-civics-government-l1',
    questionIds: ['q11-civ-1', 'q11-civ-2', 'q11-civ-3'],
  },
];
