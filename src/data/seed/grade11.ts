import type {Lesson, Topic} from '../../types/domain';

/**
 * GRADE 11 TEACHING CONTENT — LibLearn Teaching Sequence v1
 *
 * Provenance for everything in this file is `liblearn`. Read that literally:
 *
 *   This is academically standard senior-secondary material. Quadratic
 *   equations, photosynthesis and Newton's laws are the same in Monrovia as
 *   anywhere else, so teaching them is safe and useful.
 *
 *   The SELECTION and ORDERING are LibLearn's editorial judgement. They are
 *   not a reproduction of the Liberian national curriculum, and nothing here
 *   may be presented as telling a student what is on their examination.
 *
 * When the Ministry curriculum volumes in src/data/sources.ts have actually
 * been read, topics can be re-sequenced to match and re-labelled `official`
 * with a `sourceId`. Until then the honest claim is "this is good material to
 * study", not "this is your syllabus".
 *
 * Civics note: this file deliberately teaches civic CONCEPTS (what a
 * constitution does, how separated powers work) rather than asserting specific
 * provisions of Liberian law. Getting a constitutional detail wrong in a civics
 * lesson is exactly the kind of error students would carry into an exam.
 */

const V = 'liblearn-v1';

export const GRADE11_TOPICS: Topic[] = [
  // ---------------------------------------------------------- Mathematics
  {
    id: 'g11-math-quadratics',
    subjectId: 'mathematics',
    grade: 11,
    name: 'Quadratic Equations',
    summary:
      'Equations where the unknown is squared: how to solve them by factorising, ' +
      'completing the square and formula, and what the graph tells you.',
    order: 1,
    curriculumVersionId: V,
    provenance: 'liblearn',
  },
  {
    id: 'g11-math-trigonometry',
    subjectId: 'mathematics',
    grade: 11,
    name: 'Trigonometry',
    summary:
      'Using ratios of sides in right-angled triangles to find lengths and angles ' +
      'you cannot measure directly.',
    order: 2,
    curriculumVersionId: V,
    provenance: 'liblearn',
  },

  // ------------------------------------------------------------- Biology
  {
    id: 'g11-bio-photosynthesis',
    subjectId: 'biology',
    grade: 11,
    name: 'Photosynthesis',
    summary:
      'How green plants build their own food from light, water and carbon dioxide, ' +
      'and what limits the rate.',
    order: 1,
    curriculumVersionId: V,
    provenance: 'liblearn',
  },
  {
    id: 'g11-bio-genetics',
    subjectId: 'biology',
    grade: 11,
    name: 'Genetics and Inheritance',
    summary:
      'Why offspring resemble their parents: genes, alleles, and predicting the ' +
      'outcome of a cross.',
    order: 2,
    curriculumVersionId: V,
    provenance: 'liblearn',
  },

  // ----------------------------------------------------------- Chemistry
  {
    id: 'g11-chem-mole',
    subjectId: 'chemistry',
    grade: 11,
    name: 'The Mole and Stoichiometry',
    summary:
      'Counting particles by weighing: the mole, molar mass, and calculating how ' +
      'much product a reaction gives.',
    order: 1,
    curriculumVersionId: V,
    provenance: 'liblearn',
  },
  {
    id: 'g11-chem-bonding',
    subjectId: 'chemistry',
    grade: 11,
    name: 'Chemical Bonding',
    summary:
      'Why atoms join together, and how ionic and covalent bonding explain the ' +
      'properties of the substances they form.',
    order: 2,
    curriculumVersionId: V,
    provenance: 'liblearn',
  },

  // ------------------------------------------------------------- Physics
  {
    id: 'g11-phys-motion',
    subjectId: 'physics',
    grade: 11,
    name: 'Forces and Motion',
    summary:
      "Newton's three laws, and using them to explain and calculate how objects move.",
    order: 1,
    curriculumVersionId: V,
    provenance: 'liblearn',
  },
  {
    id: 'g11-phys-electricity',
    subjectId: 'physics',
    grade: 11,
    name: 'Current Electricity',
    summary:
      'Current, voltage and resistance, how they relate, and how to work with ' +
      'series and parallel circuits.',
    order: 2,
    curriculumVersionId: V,
    provenance: 'liblearn',
  },

  // ------------------------------------------------------ English Language
  {
    id: 'g11-eng-essay',
    subjectId: 'english',
    grade: 11,
    name: 'Essay Writing',
    summary:
      'Building an argument that holds together: thesis, paragraph structure, ' +
      'evidence and conclusion.',
    order: 1,
    curriculumVersionId: V,
    provenance: 'liblearn',
  },

  // -------------------------------------------------------------- Civics
  {
    id: 'g11-civics-government',
    subjectId: 'civics',
    grade: 11,
    name: 'How Government Is Structured',
    summary:
      'What a constitution does, why power is separated into branches, and how ' +
      'those branches check one another.',
    order: 1,
    curriculumVersionId: V,
    provenance: 'liblearn',
  },
];

/*
 * Removed before shipping: 'Comprehension and Summary' (English) and
 * 'Citizenship, Rights and Duties' (Civics). Both were sequenced but had no
 * lessons written yet, and a topic card that opens onto an empty page is a
 * dead end rather than a promise. They belong back here the moment their
 * lessons exist; scripts/validate-curriculum.ts warns about any topic that
 * regresses to this state.
 */
export const GRADE11_LESSONS: Lesson[] = [
  /* =================================================== MATHEMATICS ===== */
  {
    id: 'g11-math-quadratics-l1',
    topicId: 'g11-math-quadratics',
    subjectId: 'mathematics',
    grade: 11,
    title: 'Solving Quadratic Equations by Factorising',
    estimatedMinutes: 15,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Recognise a quadratic equation and write it in standard form.'},
      {id: 'o2', text: 'Factorise a quadratic expression into two brackets.'},
      {id: 'o3', text: 'Use the zero-product rule to find both solutions.'},
    ],
    keyTerms: [
      {term: 'Quadratic equation', definition: 'An equation in which the highest power of the unknown is 2.'},
      {term: 'Standard form', definition: 'A quadratic written as ax² + bx + c = 0, with everything on one side.'},
      {term: 'Root', definition: 'A value of x that makes the equation true. A quadratic has at most two.'},
      {term: 'Zero-product rule', definition: 'If two things multiply to give 0, at least one of them must be 0.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'By the end of this lesson you will be able to take a quadratic equation, rearrange it into standard form, factorise it, and read off both of its roots. Factorising is the fastest method when it works, so it is worth trying first.',
      },
      {
        heading: 'Introduction',
        body: 'A linear equation like 3x + 4 = 19 has exactly one solution. A quadratic is different: because the unknown is squared, there are usually two values of x that satisfy it.\n\nThink about x² = 9. It is tempting to answer 3 and stop. But (−3)² = 9 as well, so x = 3 and x = −3 both work. Losing the second solution is the single most common mistake with quadratics, and factorising is a method that hands you both.',
      },
      {
        heading: 'Getting to standard form',
        body: 'Before you can factorise, every term must be on one side with zero on the other:\n\n    ax² + bx + c = 0\n\nIf you are given x² + 5x = −6, add 6 to both sides to get x² + 5x + 6 = 0. Only now is it ready.\n\nThis step is not a formality. The method that follows depends on one side being exactly zero, and it gives wrong answers if it is not.',
      },
      {
        heading: 'Factorising',
        body: 'To factorise x² + bx + c, look for two numbers that MULTIPLY to give c and ADD to give b.\n\nFor x² + 5x + 6: you need two numbers multiplying to 6 and adding to 5.\n\n    1 × 6 = 6, but 1 + 6 = 7   ✗\n    2 × 3 = 6, and 2 + 3 = 5   ✓\n\nSo the numbers are 2 and 3, and the expression factorises as (x + 2)(x + 3).\n\nWatch the signs. If c is positive and b is negative, both numbers are negative: x² − 5x + 6 = (x − 2)(x − 3). If c is negative, one number is positive and the other negative.',
        example: 'Factorise x² − x − 12.\n\nTwo numbers multiplying to −12, adding to −1.\nSince −12 is negative, one is positive and one negative.\n\n    3 and −4:  3 × (−4) = −12 ✓   3 + (−4) = −1 ✓\n\nSo x² − x − 12 = (x + 3)(x − 4).',
      },
      {
        heading: 'From factors to roots',
        body: 'Here is the step that makes the whole method work. If two quantities multiply to give zero, then at least one of them MUST be zero — there is no other way to get a product of zero.\n\nSo from (x + 2)(x + 3) = 0 we get:\n\n    x + 2 = 0   →   x = −2\n    x + 3 = 0   →   x = −3\n\nBoth are solutions. Notice the sign flip: the bracket (x + 2) gives the root −2, not +2. Students lose marks on this more often than on the factorising itself.',
      },
      {
        heading: 'Worked example',
        body: 'Solve x² + 2x − 15 = 0 completely.',
        example: 'Step 1 — Already in standard form.\n\nStep 2 — Two numbers multiplying to −15, adding to +2.\n    5 × (−3) = −15 ✓    5 + (−3) = 2 ✓\n\nStep 3 — Factorise:\n    (x + 5)(x − 3) = 0\n\nStep 4 — Set each bracket to zero:\n    x + 5 = 0  →  x = −5\n    x − 3 = 0  →  x = 3\n\nStep 5 — Check by substituting back:\n    x = −5:  25 − 10 − 15 = 0 ✓\n    x = 3:   9 + 6 − 15 = 0 ✓\n\nAnswer: x = −5 or x = 3',
      },
      {
        heading: 'Try it yourself',
        body: 'Solve these, and check each answer by substituting it back in:\n\n  1. x² + 7x + 10 = 0\n  2. x² − 9x + 20 = 0\n  3. x² − 16 = 0   (hint: what is b here?)\n\nIf you get stuck, ask the AI Tutor for a hint rather than the answer — you will remember the method far better for having worked it out.',
      },
      {
        heading: 'Summary',
        body: '• Rearrange into ax² + bx + c = 0 first — always.\n• Find two numbers multiplying to c and adding to b.\n• Write the two brackets, set each to zero, solve each.\n• The bracket (x + k) gives the root x = −k. Mind the sign.\n• Expect two solutions, and check both.\n\nNot every quadratic factorises neatly. When no whole numbers work, use the quadratic formula instead — that is the next lesson.',
      },
    ],
  },
  {
    id: 'g11-math-quadratics-l2',
    topicId: 'g11-math-quadratics',
    subjectId: 'mathematics',
    grade: 11,
    title: 'The Quadratic Formula and the Discriminant',
    estimatedMinutes: 15,
    order: 2,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Apply the quadratic formula to any quadratic equation.'},
      {id: 'o2', text: 'Calculate the discriminant and say how many roots exist.'},
      {id: 'o3', text: 'Choose sensibly between factorising and the formula.'},
    ],
    keyTerms: [
      {term: 'Quadratic formula', definition: 'x = (−b ± √(b² − 4ac)) / 2a — solves any quadratic in standard form.'},
      {term: 'Discriminant', definition: 'The quantity b² − 4ac, which reveals how many real roots an equation has.'},
      {term: 'Coefficient', definition: 'The number multiplying a term: in 3x², the coefficient a is 3.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Factorising is quick but only works when the numbers are friendly. The quadratic formula works every time, on every quadratic, without exception. You will also learn to tell in advance — before solving anything — how many solutions an equation has.',
      },
      {
        heading: 'The formula',
        body: 'For any equation in the form ax² + bx + c = 0:\n\n    x = ( −b ± √(b² − 4ac) ) / 2a\n\nThe ± is doing important work: it is what produces the two roots. Take the + once, the − once, and you have both.\n\nTo use it, first identify a, b and c including their signs. For 2x² − 7x + 3 = 0: a = 2, b = −7, c = 3. Note that b is −7, not 7. Dropping that minus sign is the most frequent source of wrong answers here.',
      },
      {
        heading: 'Worked example',
        body: 'Solve 2x² − 7x + 3 = 0 using the formula.',
        example: 'a = 2,  b = −7,  c = 3\n\nDiscriminant first:\n    b² − 4ac = (−7)² − 4(2)(3)\n             = 49 − 24\n             = 25\n\n√25 = 5, a whole number, so this one would have factorised too.\n\nNow the formula:\n    x = ( −(−7) ± 5 ) / (2 × 2)\n    x = ( 7 ± 5 ) / 4\n\nTaking + :  x = 12/4 = 3\nTaking − :  x = 2/4 = 0.5\n\nAnswer: x = 3 or x = 0.5\n\nCheck x = 3:  2(9) − 7(3) + 3 = 18 − 21 + 3 = 0 ✓',
      },
      {
        heading: 'The discriminant',
        body: 'The part under the square root, b² − 4ac, is called the discriminant. Calculate it on its own and it tells you what to expect:\n\n    b² − 4ac > 0  →  two different real roots\n    b² − 4ac = 0  →  one repeated root\n    b² − 4ac < 0  →  no real roots\n\nThe reason is the square root. A positive number has two square roots, so ± gives two answers. Zero has one, so both branches collapse to the same value. A negative number has no real square root at all, which is why the graph never crosses the x-axis.\n\nThis is worth a moment on its own: it lets you answer "how many solutions does this have?" without solving anything.',
      },
      {
        heading: 'Which method should you use?',
        body: 'Try factorising first. If you spot the two numbers within about fifteen seconds, factorising is faster and less error-prone.\n\nUse the formula when the numbers do not cooperate, when a ≠ 1, or when the question asks for answers to a number of decimal places — that is a strong hint the roots are not whole numbers.\n\nThe formula is never wrong, only sometimes slower. If you are unsure, use it.',
      },
      {
        heading: 'Try it yourself',
        body: '1. Solve x² + 4x + 1 = 0 to 2 decimal places.\n2. How many real roots does x² + 2x + 5 = 0 have? Find the discriminant — you should not need to solve it.\n3. Solve 3x² − 5x − 2 = 0.',
      },
      {
        heading: 'Summary',
        body: '• x = (−b ± √(b² − 4ac)) / 2a works for every quadratic.\n• Identify a, b, c carefully, keeping negative signs attached.\n• The discriminant b² − 4ac tells you the number of real roots before you solve.\n• Factorise when it is quick; use the formula whenever it is not.',
      },
    ],
  },
  {
    id: 'g11-math-trigonometry-l1',
    topicId: 'g11-math-trigonometry',
    subjectId: 'mathematics',
    grade: 11,
    title: 'Sine, Cosine and Tangent in Right-Angled Triangles',
    estimatedMinutes: 14,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Label the hypotenuse, opposite and adjacent sides correctly.'},
      {id: 'o2', text: 'Use SOH-CAH-TOA to choose the right ratio.'},
      {id: 'o3', text: 'Find an unknown side or angle in a right-angled triangle.'},
    ],
    keyTerms: [
      {term: 'Hypotenuse', definition: 'The longest side, always opposite the right angle.'},
      {term: 'Opposite', definition: 'The side facing the angle you are working with.'},
      {term: 'Adjacent', definition: 'The side next to your angle that is not the hypotenuse.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Trigonometry lets you find a distance or an angle you cannot physically measure — the height of a tree, the width of a river, the angle of a roof — using only a triangle and a calculator.',
      },
      {
        heading: 'Labelling the sides',
        body: 'Every right-angled triangle has three sides, and which name each one takes depends on the angle you are working from.\n\n• The HYPOTENUSE is the longest side, opposite the right angle. It never changes.\n• The OPPOSITE is the side directly facing your chosen angle.\n• The ADJACENT is the remaining side, touching your angle.\n\nOnly the hypotenuse is fixed. If you switch to the other non-right angle, opposite and adjacent swap places. Label the sides for the angle in the question before doing anything else.',
      },
      {
        heading: 'SOH-CAH-TOA',
        body: 'Three ratios connect an angle to two sides:\n\n    sin θ = Opposite / Hypotenuse      (SOH)\n    cos θ = Adjacent / Hypotenuse      (CAH)\n    tan θ = Opposite / Adjacent        (TOA)\n\nTo choose: identify which two sides the question involves — the one you know and the one you want — and pick the ratio containing exactly those two.',
      },
      {
        heading: 'Worked example — finding a side',
        body: 'A ladder leans against a wall at 65° to the ground. The ladder is 4 m long. How high up the wall does it reach?',
        example: 'The angle is 65°. The height up the wall is OPPOSITE that angle.\nThe ladder is the HYPOTENUSE (4 m).\n\nOpposite and hypotenuse → sine.\n\n    sin 65° = opposite / 4\n    opposite = 4 × sin 65°\n    opposite = 4 × 0.9063\n    opposite = 3.63 m (2 d.p.)\n\nSanity check: 3.63 m is less than the 4 m ladder, which it must be.',
      },
      {
        heading: 'Worked example — finding an angle',
        body: 'A ramp rises 1.5 m over a horizontal distance of 6 m. What angle does it make with the ground?',
        example: 'Rise = 1.5 m is OPPOSITE the angle.\nHorizontal 6 m is ADJACENT.\n\nOpposite and adjacent → tangent.\n\n    tan θ = 1.5 / 6 = 0.25\n\nTo get θ from tan θ, use the inverse (tan⁻¹ on your calculator):\n\n    θ = tan⁻¹(0.25) = 14.0°\n\nA gentle slope, which matches a ramp.',
      },
      {
        heading: 'Try it yourself',
        body: '1. A triangle has hypotenuse 10 cm and an angle of 30°. Find the side opposite that angle.\n2. A tree casts a 12 m shadow when the sun is 40° above the horizon. How tall is the tree?\n3. A right-angled triangle has opposite 5 and adjacent 12. Find the angle.',
      },
      {
        heading: 'Summary',
        body: '• Label opposite, adjacent and hypotenuse relative to the angle in the question.\n• Pick the ratio containing the side you know and the side you want.\n• Multiply when finding a side; use sin⁻¹, cos⁻¹ or tan⁻¹ when finding an angle.\n• Check your answer is physically sensible — the hypotenuse is always longest.',
      },
    ],
  },

  /* ======================================================= BIOLOGY ===== */
  {
    id: 'g11-bio-photosynthesis-l1',
    topicId: 'g11-bio-photosynthesis',
    subjectId: 'biology',
    grade: 11,
    title: 'How Photosynthesis Works',
    estimatedMinutes: 14,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'State the word and balanced equations for photosynthesis.'},
      {id: 'o2', text: 'Explain the role of chlorophyll, light, water and carbon dioxide.'},
      {id: 'o3', text: 'Describe the limiting factors that control the rate.'},
    ],
    keyTerms: [
      {term: 'Photosynthesis', definition: 'The process by which green plants make glucose from carbon dioxide and water using light energy.'},
      {term: 'Chlorophyll', definition: 'The green pigment in chloroplasts that absorbs light energy.'},
      {term: 'Chloroplast', definition: 'The organelle in plant cells where photosynthesis takes place.'},
      {term: 'Stomata', definition: 'Small pores, mostly on the underside of a leaf, that let gases in and out.'},
      {term: 'Limiting factor', definition: 'The factor in shortest supply, which alone caps the rate of a process.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Photosynthesis is how nearly all food on Earth begins. You will learn what goes in, what comes out, where in the leaf it happens, and what controls how fast it runs.',
      },
      {
        heading: 'Introduction',
        body: 'Animals eat. Plants cannot — so they build their own food instead, out of air, water and sunlight.\n\nThis matters beyond botany. Every animal either eats plants or eats something that ate plants, and the oxygen you are breathing right now was released by photosynthesis. It is the entry point of energy into almost every food chain.',
      },
      {
        heading: 'The equation',
        body: 'In words:\n\n    carbon dioxide + water → glucose + oxygen\n                (in the presence of light and chlorophyll)\n\nBalanced:\n\n    6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂\n\nRead what this says. The plant takes two low-energy substances and builds one high-energy one. Light supplies the energy for that; chlorophyll captures the light. Neither is consumed as a raw material, which is why both are written above the arrow rather than in it.\n\nOxygen is a by-product. The plant does not make it deliberately — it is simply left over.',
      },
      {
        heading: 'Where it happens',
        body: 'Photosynthesis occurs in CHLOROPLASTS, concentrated in the palisade layer near the upper surface of the leaf where light is strongest.\n\nA leaf is well built for the job:\n• Broad and flat — large surface area for catching light.\n• Thin — gases diffuse across a short distance.\n• Stomata on the underside — let CO₂ in and O₂ out.\n• Veins — deliver water from the roots, carry glucose away.\n\nEach feature is a solution to a supply problem: light, gas, water or transport.',
      },
      {
        heading: 'Limiting factors',
        body: 'Three things control the rate, and at any moment ONE of them is holding the process back — whichever is in shortest supply. That one is the limiting factor.\n\n• LIGHT INTENSITY — more light, faster rate, until another factor takes over.\n• CARBON DIOXIDE CONCENTRATION — usually the limiting factor outdoors, since air is only about 0.04% CO₂.\n• TEMPERATURE — raises the rate up to an optimum, then the rate falls sharply as enzymes denature.\n\nThe temperature curve behaves differently from the other two, and examiners like this point. Light and CO₂ level off at a plateau. Temperature rises, peaks, then DROPS — because enzymes are proteins and heat destroys their shape permanently.',
        example: 'Interpreting a rate-against-light-intensity graph:\n\nThe steep early section — light is limiting. Adding light adds rate.\n\nThe flat plateau — light is no longer limiting. Something else (CO₂ or temperature) has become the cap, so extra light changes nothing.\n\nExam technique: if a graph plateaus, do not answer "the plant has enough light". Say which factor has BECOME limiting instead.',
      },
      {
        heading: 'Try it yourself',
        body: '1. Write the balanced equation from memory, then check it.\n2. A farmer grows tomatoes in a greenhouse and adds CO₂ to the air. Why might this increase yield — and when would it make no difference at all?\n3. Explain why a plant kept in constant darkness dies even though it still has water and CO₂.',
      },
      {
        heading: 'Summary',
        body: '• 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂, requiring light and chlorophyll.\n• It happens in chloroplasts, mainly in the palisade layer.\n• Leaf structure solves the supply problems of light, gas and water.\n• Light, CO₂ and temperature can each limit the rate.\n• Only temperature causes the rate to FALL past the optimum, because enzymes denature.',
      },
    ],
  },
  {
    id: 'g11-bio-genetics-l1',
    topicId: 'g11-bio-genetics',
    subjectId: 'biology',
    grade: 11,
    title: 'Genes, Alleles and Monohybrid Crosses',
    estimatedMinutes: 16,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Distinguish gene, allele, genotype and phenotype.'},
      {id: 'o2', text: 'Explain dominant and recessive inheritance.'},
      {id: 'o3', text: 'Complete a Punnett square and state the expected ratio.'},
    ],
    keyTerms: [
      {term: 'Gene', definition: 'A length of DNA coding for one characteristic.'},
      {term: 'Allele', definition: 'A version of a gene. You inherit one from each parent.'},
      {term: 'Genotype', definition: 'The alleles an organism carries, e.g. Tt.'},
      {term: 'Phenotype', definition: 'The characteristic actually shown, e.g. tall.'},
      {term: 'Homozygous', definition: 'Two identical alleles (TT or tt).'},
      {term: 'Heterozygous', definition: 'Two different alleles (Tt).'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Why children resemble their parents without being identical to them — and how to predict, with real numbers, what a cross will produce.',
      },
      {
        heading: 'The vocabulary matters',
        body: 'Genetics questions are lost on vocabulary more than on reasoning, so be precise:\n\nA GENE is the instruction for a characteristic — say, height in a pea plant.\nAn ALLELE is a version of that instruction — tall, or short.\n\nYou carry two alleles for each gene: one from each parent. Together they are your GENOTYPE. What you actually look like is your PHENOTYPE.\n\nThe distinction is the whole subject in miniature: two organisms can look identical and carry different alleles. TT and Tt are both tall, but they do not breed the same way.',
      },
      {
        heading: 'Dominant and recessive',
        body: 'A DOMINANT allele shows in the phenotype whenever it is present, even in a single copy. Capital letter: T.\n\nA RECESSIVE allele shows ONLY when no dominant allele is present — so both must be recessive. Lower case: t.\n\n    TT → tall\n    Tt → tall   (the T masks the t)\n    tt → short\n\nSo short plants have exactly one possible genotype, tt. A tall plant could be TT or Tt, and you cannot tell by looking. Use the SAME letter in both cases — T and t, never T and s.',
      },
      {
        heading: 'The Punnett square',
        body: 'A Punnett square sets out every way the parents\u2019 alleles can combine.\n\nCross two heterozygous tall plants (Tt × Tt). Each parent passes on either T or t:\n\n            T       t\n        ┌───────┬───────┐\n    T   │  TT   │  Tt   │\n        ├───────┼───────┤\n    t   │  Tt   │  tt   │\n        └───────┴───────┘\n\nFour equally likely outcomes: TT, Tt, Tt, tt.\n\nGenotype ratio  1 TT : 2 Tt : 1 tt\nPhenotype ratio 3 tall : 1 short\n\nThat 3:1 is the signature of a monohybrid cross between two heterozygotes. Recognising it in a question is often the fastest route to the answer.',
        example: 'A different cross: Tt × tt.\n\n            t       t\n        ┌───────┬───────┐\n    T   │  Tt   │  Tt   │\n        ├───────┼───────┤\n    t   │  tt   │  tt   │\n        └───────┴───────┘\n\nGenotype ratio  2 Tt : 2 tt  →  1 : 1\nPhenotype ratio 1 tall : 1 short\n\nHalf the offspring are short here, where the Tt × Tt cross gave only a quarter. Same alleles, different ratio — which is why you must draw the square rather than recall "3:1" by reflex.',
      },
      {
        heading: 'Probability, not prophecy',
        body: 'A 3:1 ratio does NOT promise that four offspring will be exactly three tall and one short. It is a probability: each offspring independently has a 3-in-4 chance of being tall.\n\nWith four seeds you might well get four tall ones. With four hundred, the proportion will sit close to 3:1. Large numbers are what make the ratio visible — a point worth stating explicitly when a question asks you to interpret unexpected results.',
      },
      {
        heading: 'Try it yourself',
        body: '1. In pea plants, purple flowers (P) are dominant to white (p). Cross Pp × Pp. Give both ratios.\n2. A white-flowered plant is crossed with a purple one and half the offspring are white. What was the purple parent\u2019s genotype?\n3. Explain why two brown-eyed parents can have a blue-eyed child.',
      },
      {
        heading: 'Summary',
        body: '• Gene = instruction, allele = version, genotype = alleles carried, phenotype = appearance.\n• Dominant shows with one copy; recessive needs two.\n• Use one letter, capital for dominant and lower case for recessive.\n• Tt × Tt gives 3:1; Tt × tt gives 1:1. Draw the square rather than recalling a ratio.\n• Ratios are probabilities and show themselves reliably only in large numbers.',
      },
    ],
  },

  /* ===================================================== CHEMISTRY ===== */
  {
    id: 'g11-chem-mole-l1',
    topicId: 'g11-chem-mole',
    subjectId: 'chemistry',
    grade: 11,
    title: 'The Mole: Counting Atoms by Weighing',
    estimatedMinutes: 16,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Define the mole and state Avogadro\u2019s constant.'},
      {id: 'o2', text: 'Convert between mass, moles and number of particles.'},
      {id: 'o3', text: 'Calculate molar mass from a chemical formula.'},
    ],
    keyTerms: [
      {term: 'Mole', definition: 'The amount of substance containing 6.02 × 10²³ particles.'},
      {term: 'Avogadro\u2019s constant', definition: '6.02 × 10²³ — the number of particles in one mole.'},
      {term: 'Molar mass', definition: 'The mass of one mole of a substance, in g/mol.'},
      {term: 'Relative atomic mass', definition: 'The mass of an atom relative to 1/12 of a carbon-12 atom.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Chemical reactions happen between individual particles, but no one can count particles. The mole is the bridge: it converts a mass you can weigh into a number of particles you can reason about.',
      },
      {
        heading: 'Why chemists need the mole',
        body: 'An equation like 2H₂ + O₂ → 2H₂O is a statement about COUNTS: two hydrogen molecules for every one oxygen molecule.\n\nBut you cannot count molecules in a laboratory. You can only weigh things. And weighing equal masses does not give equal counts, because atoms have different masses — 1 g of hydrogen contains far more atoms than 1 g of lead.\n\nThe mole solves this. It is simply a counting unit for very large numbers, the way "a dozen" is a counting unit for twelve.\n\n    1 mole = 6.02 × 10²³ particles\n\nThat number, Avogadro\u2019s constant, is enormous because atoms are tiny. One mole of water is about a mouthful.',
      },
      {
        heading: 'Molar mass',
        body: 'Here is the elegant part. The mass of one mole of a substance, in grams, equals its relative atomic or formula mass.\n\n    Carbon:  relative atomic mass 12  →  1 mol weighs 12 g\n    Water:   relative formula mass 18  →  1 mol weighs 18 g\n\nTo find the relative formula mass, add up the atomic masses in the formula:\n\n    H₂O = (2 × 1) + 16 = 18\n    CO₂ = 12 + (2 × 16) = 44\n    CaCO₃ = 40 + 12 + (3 × 16) = 100\n\nSo weighing out 100 g of calcium carbonate gives you exactly one mole of it — 6.02 × 10²³ formula units — without counting anything.',
      },
      {
        heading: 'The key equation',
        body: 'Everything in this topic rests on one relationship:\n\n    moles = mass (g) / molar mass (g/mol)\n\nRearranged as needed:\n\n    mass = moles × molar mass\n    molar mass = mass / moles\n\nAnd to reach particles:\n\n    number of particles = moles × 6.02 × 10²³\n\nA reliable habit: write down what you are given, what you want, and which equation connects them, BEFORE substituting numbers.',
      },
      {
        heading: 'Worked example',
        body: 'Calculate the number of moles in 25 g of calcium carbonate, CaCO₃, and how many formula units that is.',
        example: 'Step 1 — Molar mass of CaCO₃:\n    Ca = 40\n    C  = 12\n    O₃ = 3 × 16 = 48\n    Total = 100 g/mol\n\nStep 2 — Moles:\n    moles = mass / molar mass\n          = 25 / 100\n          = 0.25 mol\n\nStep 3 — Particles:\n    = 0.25 × 6.02 × 10²³\n    = 1.505 × 10²³ formula units\n\nSanity check: 25 g is a quarter of 100 g, so 0.25 mol. If your answer had come out greater than 1 mol, something went wrong.',
      },
      {
        heading: 'Try it yourself',
        body: '1. How many moles are in 36 g of water (H₂O)?\n2. What is the mass of 2 moles of CO₂?\n3. How many atoms are in 0.5 mol of sodium?\n4. 4.4 g of a gas turns out to be 0.1 mol. What is its molar mass — and can you name the gas?',
      },
      {
        heading: 'Summary',
        body: '• 1 mole = 6.02 × 10²³ particles.\n• Molar mass in g/mol equals relative formula mass — add the atomic masses.\n• moles = mass / molar mass, rearranged as required.\n• particles = moles × 6.02 × 10²³.\n• Always sanity-check the size of your answer against the molar mass.',
      },
    ],
  },
  {
    id: 'g11-chem-bonding-l1',
    topicId: 'g11-chem-bonding',
    subjectId: 'chemistry',
    grade: 11,
    title: 'Ionic and Covalent Bonding',
    estimatedMinutes: 15,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Explain why atoms form bonds at all.'},
      {id: 'o2', text: 'Describe ionic bonding as transfer and covalent as sharing.'},
      {id: 'o3', text: 'Link bonding type to melting point, conductivity and solubility.'},
    ],
    keyTerms: [
      {term: 'Ion', definition: 'An atom that has gained or lost electrons and so carries a charge.'},
      {term: 'Ionic bond', definition: 'Electrostatic attraction between oppositely charged ions.'},
      {term: 'Covalent bond', definition: 'A shared pair of electrons between two atoms.'},
      {term: 'Lattice', definition: 'A regular repeating 3-D arrangement of ions.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Why atoms bond, the two main ways they do it, and how the bonding explains properties you can observe — why salt melts at 801°C but candle wax melts in your hand.',
      },
      {
        heading: 'Why atoms bond',
        body: 'Atoms bond to reach a full outer shell of electrons, which is a more stable, lower-energy arrangement.\n\nThe noble gases already have full outer shells, which is precisely why they are famously unreactive. Every other element achieves the same thing by losing, gaining or sharing electrons.\n\nThat gives two routes:\n• Metal + non-metal → electrons are TRANSFERRED → ionic bonding\n• Non-metal + non-metal → electrons are SHARED → covalent bonding',
      },
      {
        heading: 'Ionic bonding',
        body: 'A metal atom loses its outer electrons; a non-metal gains them. Both end up with full shells, and both are now charged.\n\nSodium chloride:\n    Na has 1 outer electron → loses it → Na⁺\n    Cl has 7 outer electrons → gains 1 → Cl⁻\n\nThe opposite charges attract strongly. Crucially, this is not a bond between one Na⁺ and one particular Cl⁻ — each ion attracts every oppositely charged neighbour, building a giant LATTICE extending in all directions.\n\nThat structure explains the properties:\n• HIGH MELTING POINT — melting means overcoming attractions throughout the whole lattice.\n• CONDUCTS ONLY WHEN MOLTEN OR DISSOLVED — charged ions must be free to move. In a solid they are locked in place, so solid salt does not conduct.\n• BRITTLE — knock the lattice out of alignment and like charges meet, forcing it apart.',
      },
      {
        heading: 'Covalent bonding',
        body: 'Two non-metals cannot both gain electrons, so they share instead. A shared PAIR of electrons counts towards the full shell of both atoms.\n\n    H₂  — one shared pair (single bond)\n    O₂  — two shared pairs (double bond)\n    H₂O — oxygen shares with two hydrogens\n\nThe shared pair itself is a strong bond. But most covalent substances exist as small separate MOLECULES, and the forces BETWEEN those molecules are weak.\n\nThis distinction is the most misunderstood point in the topic. When water boils, you are not breaking O–H bonds — you are separating whole water molecules from one another. The bonds inside survive, which is why steam is still H₂O.\n\nHence: low melting and boiling points, and no conductivity, because there are no free charged particles.',
        example: 'Why does sodium chloride melt at 801°C while chlorine gas boils at −34°C, when both involve chlorine?\n\nNaCl — a giant ionic lattice. Melting requires breaking strong attractions between millions of ions. Enormous energy.\n\nCl₂ — small molecules. The Cl–Cl covalent bond is strong, but boiling only has to separate molecules from each other, and the forces between them are weak. Very little energy.\n\nThe lesson: melting and boiling points tell you about the forces BETWEEN particles, not the bonds within them.',
      },
      {
        heading: 'Try it yourself',
        body: '1. Magnesium oxide (MgO) melts at 2852°C. What bonding does it have, and why is its melting point even higher than NaCl\u2019s?\n2. Explain why solid NaCl does not conduct electricity but molten NaCl does.\n3. Predict the bonding in CH₄ and give two expected properties.',
      },
      {
        heading: 'Summary',
        body: '• Atoms bond to achieve full outer shells.\n• Metal + non-metal → transfer → ions → giant lattice.\n• Non-metal + non-metal → sharing → covalent bonds → usually small molecules.\n• Ionic: high melting point, conducts when molten or dissolved, brittle.\n• Covalent molecular: low melting point, does not conduct.\n• Melting point reflects forces BETWEEN particles, not bond strength within them.',
      },
    ],
  },

  /* ======================================================= PHYSICS ===== */
  {
    id: 'g11-phys-motion-l1',
    topicId: 'g11-phys-motion',
    subjectId: 'physics',
    grade: 11,
    title: "Newton's Three Laws of Motion",
    estimatedMinutes: 15,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: "State all three of Newton's laws correctly."},
      {id: 'o2', text: 'Apply F = ma to calculate force, mass or acceleration.'},
      {id: 'o3', text: 'Identify action–reaction pairs correctly.'},
    ],
    keyTerms: [
      {term: 'Force', definition: 'A push or pull, measured in newtons (N).'},
      {term: 'Inertia', definition: 'The tendency of an object to resist a change in its motion.'},
      {term: 'Resultant force', definition: 'The single force equivalent to all forces acting combined.'},
      {term: 'Acceleration', definition: 'Rate of change of velocity, in m/s².'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: "Three laws that between them describe the motion of essentially everything you will meet at this level — from a dropped stone to a moving vehicle.",
      },
      {
        heading: 'First law — inertia',
        body: 'An object stays at rest, or continues moving at constant velocity in a straight line, UNLESS a resultant force acts on it.\n\nThis contradicts everyday intuition, which says moving things naturally slow down. They do — but only because friction and air resistance are acting. Remove those and motion simply continues.\n\nNote "resultant". Forces can act and still cancel. A book on a table has gravity pulling down and the table pushing up equally, so the resultant is zero and the book stays put.\n\nThis is why passengers lurch forward when a vehicle brakes sharply: the vehicle decelerates, but nothing has yet acted on the passenger, who continues at the original speed. That is inertia, and it is the argument for seat belts.',
      },
      {
        heading: 'Second law — F = ma',
        body: 'A resultant force produces acceleration in the direction of that force:\n\n    F = m × a\n\n    F in newtons (N), m in kilograms (kg), a in m/s²\n\nOne newton is the force that accelerates 1 kg at 1 m/s².\n\nTwo consequences worth holding onto:\n• The same force on a heavier object gives less acceleration.\n• Acceleration means any change in velocity — speeding up, slowing down, or changing direction.\n\nAlways use the RESULTANT force. If a 1000 N driving force meets 200 N of friction, the resultant is 800 N, and that is what goes into the equation.',
        example: 'A 1200 kg car experiences a 3600 N driving force and 600 N of resistance. Find its acceleration.\n\nResultant force:\n    F = 3600 − 600 = 3000 N\n\nApply F = ma:\n    3000 = 1200 × a\n    a = 3000 / 1200\n    a = 2.5 m/s²\n\nUsing 3600 N instead of the resultant would have given 3 m/s² — a wrong answer that looks perfectly reasonable, which is why the resultant step must be explicit.',
      },
      {
        heading: 'Third law — action and reaction',
        body: 'For every action there is an equal and opposite reaction.\n\nStated carefully: if object A exerts a force on object B, then B exerts an equal force on A in the opposite direction.\n\nThe condition students most often miss is that the two forces act on DIFFERENT OBJECTS. That is why they never cancel out — cancelling requires both forces on the same object.\n\nWalking: your foot pushes backward on the ground; the ground pushes forward on you. The forward push on you is what moves you.\n\nA common trap: "A book rests on a table. Gravity pulls it down, the table pushes it up — are these an action–reaction pair?" No. Both act on the BOOK. They are balanced forces under the first law. The true partner to the table pushing up on the book is the book pushing down on the table.',
      },
      {
        heading: 'Try it yourself',
        body: '1. A 5 kg object accelerates at 4 m/s². What resultant force acts on it?\n2. A 70 kg person in a lift accelerating upward at 2 m/s² — is the floor\u2019s push greater or less than their weight? Explain.\n3. A rocket works in the vacuum of space with nothing to push against. Use the third law to explain how.',
      },
      {
        heading: 'Summary',
        body: '• First law: no resultant force → velocity unchanged. Inertia.\n• Second law: F = ma, always using the RESULTANT force.\n• Third law: forces come in equal, opposite pairs acting on DIFFERENT objects.\n• Balanced forces on one object ≠ an action–reaction pair.',
      },
    ],
  },
  {
    id: 'g11-phys-electricity-l1',
    topicId: 'g11-phys-electricity',
    subjectId: 'physics',
    grade: 11,
    title: "Current, Voltage, Resistance and Ohm's Law",
    estimatedMinutes: 15,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Define current, potential difference and resistance with units.'},
      {id: 'o2', text: "Apply Ohm's law V = IR."},
      {id: 'o3', text: 'Compare current and voltage in series and parallel circuits.'},
    ],
    keyTerms: [
      {term: 'Current', definition: 'Rate of flow of charge, measured in amperes (A).'},
      {term: 'Potential difference', definition: 'Energy transferred per unit charge, measured in volts (V).'},
      {term: 'Resistance', definition: 'Opposition to current flow, measured in ohms (Ω).'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'The three quantities that describe every circuit, the equation linking them, and how they behave differently in series and parallel arrangements.',
      },
      {
        heading: 'The three quantities',
        body: 'CURRENT (I) is the rate at which charge flows, in amperes. Measured with an ammeter connected IN SERIES, so the current passes through it.\n\nPOTENTIAL DIFFERENCE (V), or voltage, is the energy given to each unit of charge, in volts. Measured with a voltmeter connected IN PARALLEL, across the component.\n\nRESISTANCE (R) opposes the flow of current, in ohms. A thin wire has more resistance than a thick one; a long wire more than a short one.\n\nIf an analogy helps: voltage is the pressure pushing water along a pipe, current is how much water flows per second, resistance is how narrow the pipe is. Like all analogies it has limits, but it gets the relationships right.',
      },
      {
        heading: "Ohm's law",
        body: 'For a component at constant temperature:\n\n    V = I × R\n\nRearranged:\n\n    I = V / R        R = V / I\n\nRead what it says: for a fixed resistance, doubling the voltage doubles the current. For a fixed voltage, doubling the resistance halves it.\n\nThe temperature condition is real. A filament lamp heats up as current flows, its resistance rises, and a V–I graph for it curves instead of staying straight. A component that does keep a straight-line graph is called ohmic — a fixed resistor at steady temperature is the standard example.',
        example: 'A 12 V supply drives current through a 4 Ω resistor. Find the current.\n\n    I = V / R\n    I = 12 / 4\n    I = 3 A\n\nNow add a second 4 Ω resistor in series.\n\n    Total resistance = 4 + 4 = 8 Ω\n    I = 12 / 8 = 1.5 A\n\nThe current halves, because the same voltage now pushes against twice the resistance.',
      },
      {
        heading: 'Series and parallel',
        body: 'SERIES — one single path.\n• Current is the SAME everywhere. Charge has nowhere else to go.\n• Voltage DIVIDES between components, adding up to the supply voltage.\n• Resistances add: R = R₁ + R₂\n\nPARALLEL — multiple branches.\n• Voltage is the SAME across each branch, equal to the supply.\n• Current DIVIDES between branches, adding up to the total.\n• Total resistance is LESS than the smallest single resistance.\n\nThat last point surprises people. Adding another parallel branch gives current an additional route, so more current flows in total — which means less overall resistance.\n\nIt is also why house wiring is parallel: every appliance gets the full supply voltage, and switching one off leaves the rest unaffected. In series, one failed bulb would break the only path and everything would go out.',
      },
      {
        heading: 'Try it yourself',
        body: '1. A 9 V battery drives 0.3 A through a lamp. What is its resistance?\n2. Two 6 Ω resistors in series across 12 V — find total resistance and current.\n3. Explain why the V–I graph of a filament lamp curves while that of a fixed resistor is straight.',
      },
      {
        heading: 'Summary',
        body: '• Current (A) = rate of charge flow; ammeter in series.\n• Potential difference (V) = energy per unit charge; voltmeter in parallel.\n• Resistance (Ω) opposes current.\n• V = IR, for constant temperature.\n• Series: current constant, voltage divides, resistances add.\n• Parallel: voltage constant, current divides, total resistance falls.',
      },
    ],
  },

  /* ============================================== ENGLISH LANGUAGE ===== */
  {
    id: 'g11-eng-essay-l1',
    topicId: 'g11-eng-essay',
    subjectId: 'english',
    grade: 11,
    title: 'Structuring an Argumentative Essay',
    estimatedMinutes: 14,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Write a thesis statement that takes a clear position.'},
      {id: 'o2', text: 'Build body paragraphs using point, evidence and explanation.'},
      {id: 'o3', text: 'Address a counter-argument without weakening your case.'},
    ],
    keyTerms: [
      {term: 'Thesis statement', definition: 'One sentence stating the position the essay will argue.'},
      {term: 'Topic sentence', definition: 'The opening sentence of a paragraph, naming its single main point.'},
      {term: 'Counter-argument', definition: 'An opposing view, acknowledged and then answered.'},
      {term: 'Cohesion', definition: 'The linking of ideas so writing flows logically.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'How to turn an opinion into a structured argument a reader can follow — and how markers actually award credit for it.',
      },
      {
        heading: 'Start with a position',
        body: 'An argumentative essay must ARGUE something. The most common weakness is an essay that describes a topic without ever committing to a view.\n\nYour THESIS STATEMENT, usually the final sentence of the introduction, states your position in one sentence.\n\nWeak:  "This essay will discuss school uniforms."\n       — announces a subject, takes no position.\n\nStrong: "School uniforms should be required because they reduce visible inequality between students, lower costs for families, and cut daily distraction."\n       — states a position AND previews three reasons.\n\nThe strong version also does structural work: those three reasons become your three body paragraphs, in that order.',
      },
      {
        heading: 'Body paragraphs: P–E–E',
        body: 'Each body paragraph makes ONE point, in three moves:\n\nPOINT — a topic sentence naming the paragraph\u2019s argument.\nEVIDENCE — an example, fact, statistic or quotation supporting it.\nEXPLANATION — how that evidence proves your point and supports the thesis.\n\nThe explanation is where most marks are won and lost. Students frequently state a point, give an example, and stop — leaving the reader to infer the connection. Never make the reader do that work. Spell it out.\n\nOne point per paragraph. If a paragraph needs "also" or "another thing", it is two paragraphs.',
        example: 'A complete P–E–E paragraph:\n\n[POINT] Uniforms reduce the visible gap between students from different economic backgrounds.\n\n[EVIDENCE] Where ordinary clothes are worn, brand and condition of clothing are immediately visible, and students from poorer households are readily identified by what they can afford.\n\n[EXPLANATION] By removing that signal, a uniform takes one obvious marker of family income out of daily school life. Students are less easily sorted by wealth before they have spoken a word, which supports the argument that uniforms create fairer conditions for learning.\n\nNotice the explanation is the longest part, and that it returns to the thesis.',
      },
      {
        heading: 'Handling the other side',
        body: 'A strong essay acknowledges the opposing view. This feels risky but strengthens your case: it shows you have considered the question rather than only one half of it.\n\nThe pattern is concede, then answer:\n\n"Critics argue that uniforms suppress individual expression. This concern is understandable, but students express identity through many channels beyond clothing, and the fairness gained outweighs a restriction that applies only during school hours."\n\nConcede genuinely — do not set up a weak version of the opposing argument to knock over. Then answer it. Never concede without answering, or you have argued against yourself.',
      },
      {
        heading: 'The conclusion',
        body: 'A conclusion restates your position in fresh words and draws the argument together. It must not introduce new evidence.\n\nAvoid "In conclusion, I have discussed…" — summarising your own structure wastes the most memorable position in the essay. Instead, state what the argument has established and why it matters.',
      },
      {
        heading: 'Try it yourself',
        body: 'Write a thesis statement and ONE full P–E–E paragraph for:\n\n"Should secondary students be required to study a second language?"\n\nCheck your paragraph: does the explanation connect the evidence back to the thesis explicitly, or does it stop at the example?',
      },
      {
        heading: 'Summary',
        body: '• Take a clear position in a one-sentence thesis, and preview your reasons.\n• One point per paragraph: Point, Evidence, Explanation.\n• The explanation earns the marks — never leave the link implicit.\n• Concede a counter-argument honestly, then answer it.\n• Conclude by restating the position freshly; add no new evidence.',
      },
    ],
  },

  /* ======================================================== CIVICS ===== */
  {
    id: 'g11-civics-government-l1',
    topicId: 'g11-civics-government',
    subjectId: 'civics',
    grade: 11,
    title: 'Constitutions and the Separation of Powers',
    estimatedMinutes: 14,
    order: 1,
    provenance: 'liblearn',
    curriculumVersionId: V,
    reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Explain what a constitution is and what it does.'},
      {id: 'o2', text: 'Describe the three branches of government and their functions.'},
      {id: 'o3', text: 'Explain how checks and balances limit the abuse of power.'},
    ],
    keyTerms: [
      {term: 'Constitution', definition: 'The fundamental law setting out how a state is governed and limiting the power of government.'},
      {term: 'Separation of powers', definition: 'Dividing government functions among separate branches so no one body holds all power.'},
      {term: 'Checks and balances', definition: 'Powers each branch holds to restrain the others.'},
      {term: 'Rule of law', definition: 'The principle that everyone, including those who govern, is subject to the law.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'What a constitution is for, why governmental power is deliberately divided, and how the branches restrain one another.\n\nA note on scope: this lesson teaches these CONCEPTS, which are shared across constitutional democracies. It does not set out the specific provisions of the Liberian Constitution. For those — the exact composition of the Legislature, terms of office, or particular articles — use the Constitution itself or your teacher\u2019s materials. LibLearn will not state them from memory, because a detail misremembered here is a detail you would carry into an examination.',
      },
      {
        heading: 'What a constitution does',
        body: 'A constitution is the highest law of a state. Ordinary laws must conform to it, and where a law conflicts with the constitution, the constitution prevails.\n\nIt generally does four things:\n\n1. ESTABLISHES the institutions of government and their powers.\n2. LIMITS those powers, saying what government may NOT do.\n3. PROTECTS the rights of citizens.\n4. SETS THE PROCEDURE for its own amendment — usually a harder process than passing an ordinary law.\n\nPoint 2 deserves emphasis. A constitution is not only a description of how government works; it is a restraint upon it. The provisions protecting citizens are binding on those in office, which is the essence of the RULE OF LAW: those who govern are themselves subject to the law.\n\nPoint 4 matters too. Making amendment deliberately difficult stops a temporary majority from rewriting fundamental rules for short-term advantage.',
      },
      {
        heading: 'The three branches',
        body: 'Most constitutional democracies divide government into three branches, each with a distinct function:\n\nThe LEGISLATURE makes law. It debates and passes bills, approves taxation and public spending, and scrutinises the executive.\n\nThe EXECUTIVE carries out and enforces law. It runs government departments, conducts foreign relations, and administers public services day to day.\n\nThe JUDICIARY interprets law and resolves disputes. It applies law to particular cases and determines what the law means when that is contested.\n\nThe division is the point. If one body could make a law, enforce it, and judge disputes about it, there would be no protection against it acting arbitrarily — it would be judge in its own cause.',
      },
      {
        heading: 'Checks and balances',
        body: 'Separation alone is not enough; the branches also need power over one another. Typical checks include:\n\n• The legislature controls public money, so the executive cannot spend without approval.\n• The legislature can investigate and question the executive.\n• The executive may have a role in appointing judges, often requiring legislative confirmation.\n• Courts can rule that an action of government is unlawful or unconstitutional.\n• Amending the constitution requires a heightened procedure beyond one branch\u2019s control.\n\nThe design principle: ambition is set against ambition. Rather than relying on officials to restrain themselves, the structure gives each branch both the means and the motive to resist overreach by the others.\n\nThis also explains why these arrangements can look slow. Deliberate friction is the mechanism working, not failing.',
        example: 'Why control of money is such a powerful check:\n\nSuppose an executive wishes to create a new agency. It can propose it — but it cannot fund it without the legislature voting the money.\n\nSo the legislature can decline, or attach conditions, or demand reporting. Without ever directly commanding the executive, it constrains what the executive can actually do.\n\nThis is why the power to approve spending is among the oldest and most significant legislative powers: control of funding is control of action.',
      },
      {
        heading: 'Try it yourself',
        body: '1. Explain in your own words why a constitution is harder to amend than an ordinary law.\n2. A government department spends money the legislature never approved. Which principle is breached, and which branch would you expect to respond?\n3. Give one argument FOR and one AGAINST the slowness that checks and balances produce.\n\nThen, using your Constitution or class materials, identify how these three branches are actually constituted in Liberia — and note anything that differs from the general pattern above.',
      },
      {
        heading: 'Summary',
        body: '• A constitution is the highest law: it establishes, limits, protects and sets amendment procedure.\n• Rule of law means those who govern are also governed by law.\n• Legislature makes law, executive enforces it, judiciary interprets it.\n• Checks and balances give each branch the means to restrain the others.\n• Control of public money is among the strongest checks available.\n• Country-specific constitutional detail must come from the constitution itself, not from memory.',
      },
    ],
  },
];
