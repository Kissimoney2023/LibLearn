import type {Lesson, Topic} from '../../types/domain';

/**
 * DEMO CURRICULUM SEED.
 *
 * Every record below is provenance: 'demo'. This is sample teaching material
 * written to exercise the application. It is NOT the official Liberian
 * curriculum and must never be presented as such. Replacing it with verified
 * material is a data-layer change only - no component reads these objects by
 * literal id.
 */

export const TOPICS: Topic[] = [
  {
    id: 'g8-math-algebra',
    subjectId: 'mathematics',
    grade: 8,
    name: 'Algebra',
    summary: 'Working with unknowns: expressions, equations and how to solve them.',
    order: 1,
  },
  {
    id: 'g8-math-fractions',
    subjectId: 'mathematics',
    grade: 8,
    name: 'Fractions & Decimals',
    summary: 'Converting between forms and calculating confidently with both.',
    order: 2,
  },
  {
    id: 'g6-math-fractions',
    subjectId: 'mathematics',
    grade: 6,
    name: 'Fractions',
    summary: 'Parts of a whole: naming, comparing and adding fractions.',
    order: 1,
  },
  {
    id: 'g8-science-matter',
    subjectId: 'general-science',
    grade: 8,
    name: 'Matter and its States',
    summary: 'Solids, liquids and gases, and what happens at the changes between them.',
    order: 1,
  },
  {
    id: 'g8-english-speech',
    subjectId: 'english',
    grade: 8,
    name: 'Parts of Speech',
    summary: 'The jobs words do in a sentence, and how to identify each one.',
    order: 1,
  },
  {
    id: 'g10-bio-cells',
    subjectId: 'biology',
    grade: 10,
    name: 'Cell Biology',
    summary: 'The structures inside plant and animal cells, and what each one does.',
    order: 1,
  },
];

export const LESSONS: Lesson[] = [
  {
    id: 'g8-math-algebra-l1',
    topicId: 'g8-math-algebra',
    subjectId: 'mathematics',
    grade: 8,
    title: 'Understanding Variables and Expressions',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'demo',
    objectives: [
      {id: 'o1', text: 'Explain what a variable stands for in an expression.'},
      {id: 'o2', text: 'Write a word problem as an algebraic expression.'},
      {id: 'o3', text: 'Identify the terms and coefficients in an expression.'},
    ],
    sections: [
      {
        heading: 'What a variable is',
        body: 'A variable is a letter that stands in for a number you do not know yet. In the expression 3x + 5, the letter x is the variable. It has no fixed value - it waits for you to find out what it is. The number 3 in front of it is called the coefficient, and it means "three lots of x".',
        example: 'If a bundle of cassava costs x dollars, then 3 bundles cost 3x dollars. When x turns out to be 25, the three bundles cost 3 x 25 = 75 dollars.',
      },
      {
        heading: 'Terms and coefficients',
        body: 'An expression is built from terms separated by plus or minus signs. In 4a + 7b - 2, there are three terms: 4a, 7b and -2. The coefficient of a is 4 and the coefficient of b is 7. The term -2 has no variable at all, so it is called a constant - its value never changes.',
      },
      {
        heading: 'Turning words into algebra',
        body: 'Most of algebra is translation. "Five more than a number" becomes n + 5. "Twice a number, less three" becomes 2n - 3. Read the sentence slowly and write down each piece in the order it appears, then check that your expression says the same thing as the words.',
        example: 'A taxi charges 40 dollars to start plus 15 dollars for each kilometre. The cost of a journey of k kilometres is 40 + 15k.',
      },
    ],
  },
  {
    id: 'g8-math-algebra-l2',
    topicId: 'g8-math-algebra',
    subjectId: 'mathematics',
    grade: 8,
    title: 'Solving Linear Equations',
    estimatedMinutes: 15,
    order: 2,
    provenance: 'demo',
    objectives: [
      {id: 'o1', text: 'Solve a one-step linear equation.'},
      {id: 'o2', text: 'Solve a two-step linear equation.'},
      {id: 'o3', text: 'Check a solution by substituting it back.'},
    ],
    sections: [
      {
        heading: 'The balance rule',
        body: 'An equation says two things are equal. Picture a balance scale: whatever you do to one side, you must do to the other, or the scale tips. That single rule is the whole of equation solving. To get x by itself, undo whatever has been done to it - and do the same undoing on both sides.',
        example: 'x + 7 = 12. Seven has been added to x, so subtract 7 from both sides: x + 7 - 7 = 12 - 7, giving x = 5.',
      },
      {
        heading: 'Two-step equations',
        body: 'When x has been multiplied and then added to, undo in reverse order: deal with the addition or subtraction first, then the multiplication. This is the opposite of the order you would use to build the expression up.',
        example: '3x + 4 = 19. First subtract 4 from both sides: 3x = 15. Then divide both sides by 3: x = 5.',
      },
      {
        heading: 'Always check your answer',
        body: 'Substituting your answer back into the original equation costs ten seconds and catches almost every mistake. Put the number in place of the letter and work out both sides separately. If they match, you are right.',
        example: 'Check x = 5 in 3x + 4 = 19. Left side: 3 x 5 + 4 = 15 + 4 = 19. Right side: 19. They match, so x = 5 is correct.',
      },
    ],
  },
  {
    id: 'g8-math-algebra-l3',
    topicId: 'g8-math-algebra',
    subjectId: 'mathematics',
    grade: 8,
    title: 'Equations with Brackets',
    estimatedMinutes: 14,
    order: 3,
    provenance: 'demo',
    objectives: [
      {id: 'o1', text: 'Expand a bracket using the distributive law.'},
      {id: 'o2', text: 'Solve an equation that contains brackets.'},
    ],
    sections: [
      {
        heading: 'Expanding brackets',
        body: 'The number outside a bracket multiplies everything inside it - every term, not just the first. This is the distributive law. Missing the second term is the single most common slip in this topic, so write the multiplication out in full until it becomes automatic.',
        example: '4(x + 3) means 4 times x plus 4 times 3, which is 4x + 12. It does not mean 4x + 3.',
      },
      {
        heading: 'Solving with brackets',
        body: 'Expand the bracket first, then solve the equation the ordinary way with the balance rule. Take care with a minus sign outside a bracket: it changes the sign of every term inside.',
        example: '2(x - 5) = 14. Expand: 2x - 10 = 14. Add 10 to both sides: 2x = 24. Divide by 2: x = 12.',
      },
    ],
  },
  {
    id: 'g8-math-fractions-l1',
    topicId: 'g8-math-fractions',
    subjectId: 'mathematics',
    grade: 8,
    title: 'Converting Fractions and Decimals',
    estimatedMinutes: 11,
    order: 1,
    provenance: 'demo',
    objectives: [
      {id: 'o1', text: 'Convert a fraction to a decimal by division.'},
      {id: 'o2', text: 'Convert a terminating decimal to a fraction in lowest terms.'},
    ],
    sections: [
      {
        heading: 'Fraction to decimal',
        body: 'A fraction is a division waiting to happen. The line between the numbers means "divide". So to turn a fraction into a decimal, divide the top number by the bottom number.',
        example: '3/4 means 3 divided by 4, which is 0.75. And 1/8 means 1 divided by 8, which is 0.125.',
      },
      {
        heading: 'Decimal to fraction',
        body: 'Read the decimal aloud and the fraction is usually in the words. 0.7 is "seven tenths", so it is 7/10. 0.35 is "thirty-five hundredths", so it is 35/100 - then cancel down to 7/20 by dividing top and bottom by 5.',
      },
    ],
  },
  {
    id: 'g6-math-fractions-l1',
    topicId: 'g6-math-fractions',
    subjectId: 'mathematics',
    grade: 6,
    title: 'Naming and Comparing Fractions',
    estimatedMinutes: 10,
    order: 1,
    provenance: 'demo',
    objectives: [
      {id: 'o1', text: 'Name the numerator and denominator of a fraction.'},
      {id: 'o2', text: 'Compare two fractions with the same denominator.'},
    ],
    sections: [
      {
        heading: 'The two numbers',
        body: 'A fraction has a top number and a bottom number. The bottom number - the denominator - tells you how many equal parts the whole has been cut into. The top number - the numerator - tells you how many of those parts you have.',
        example: 'If a loaf is cut into 8 equal slices and you take 3, you have 3/8 of the loaf. The 8 is the denominator, the 3 is the numerator.',
      },
      {
        heading: 'Comparing fractions',
        body: 'When two fractions have the same denominator, the pieces are the same size, so the one with the bigger numerator is bigger. 5/8 is greater than 3/8 because five equal pieces beat three of the same size.',
      },
    ],
  },
  {
    id: 'g8-science-matter-l1',
    topicId: 'g8-science-matter',
    subjectId: 'general-science',
    grade: 8,
    title: 'The Three States of Matter',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'demo',
    objectives: [
      {id: 'o1', text: 'Describe the arrangement of particles in solids, liquids and gases.'},
      {id: 'o2', text: 'Explain why a gas fills its container but a solid does not.'},
    ],
    sections: [
      {
        heading: 'Particles and arrangement',
        body: 'All matter is made of tiny particles. What makes a solid different from a liquid or a gas is not the particles themselves but how they are arranged and how freely they move. In a solid they are packed closely in a fixed pattern and can only vibrate. In a liquid they are still close together but can slide past one another. In a gas they are far apart and move quickly in all directions.',
      },
      {
        heading: 'Shape and volume',
        body: 'Because solid particles hold their positions, a solid keeps its own shape and volume. A liquid keeps its volume but takes the shape of its container, since its particles can flow. A gas keeps neither - its particles spread out until they fill whatever space they are given.',
        example: 'Water shows all three. Ice holds its shape. Liquid water takes the shape of the cup. Steam spreads through the whole kitchen.',
      },
    ],
  },
  {
    id: 'g8-english-speech-l1',
    topicId: 'g8-english-speech',
    subjectId: 'english',
    grade: 8,
    title: 'Nouns, Verbs and Adjectives',
    estimatedMinutes: 10,
    order: 1,
    provenance: 'demo',
    objectives: [
      {id: 'o1', text: 'Identify nouns, verbs and adjectives in a sentence.'},
      {id: 'o2', text: 'Explain the job each does.'},
    ],
    sections: [
      {
        heading: 'The three workhorses',
        body: 'A noun names something - a person, place, thing or idea. A verb tells you what is happening or what something is. An adjective describes a noun, adding detail about which one, what kind or how many.',
        example: 'In "The clever student answered quickly", student is the noun, answered is the verb, and clever is the adjective describing the student.',
      },
      {
        heading: 'Finding them reliably',
        body: 'To find the verb, ask what is being done. To find the noun, ask who or what is doing it. To find adjectives, look at the words sitting just before a noun and ask whether they describe it.',
      },
    ],
  },
  {
    id: 'g10-bio-cells-l1',
    topicId: 'g10-bio-cells',
    subjectId: 'biology',
    grade: 10,
    title: 'Cell Structure and Organelles',
    estimatedMinutes: 16,
    order: 1,
    provenance: 'demo',
    objectives: [
      {id: 'o1', text: 'Name the main organelles of a plant and an animal cell.'},
      {id: 'o2', text: 'State the function of the nucleus, mitochondria and chloroplast.'},
      {id: 'o3', text: 'Describe two differences between plant and animal cells.'},
    ],
    sections: [
      {
        heading: 'The cell as a working unit',
        body: 'Every living thing is built from cells, and each cell is a small working unit with parts called organelles. Each organelle has a job, and the cell stays alive because they work together.',
      },
      {
        heading: 'The main organelles',
        body: 'The nucleus holds the cell’s genetic information and controls its activities. The mitochondria release energy from food through respiration. The cell membrane controls what enters and leaves. The cytoplasm is the jelly where most reactions happen.',
        example: 'Muscle cells contain very many mitochondria, because contracting a muscle demands a great deal of energy.',
      },
      {
        heading: 'Plant cells are different',
        body: 'Plant cells have three parts animal cells do not: a rigid cell wall made of cellulose that gives the cell its shape, chloroplasts containing chlorophyll where photosynthesis takes place, and a large permanent vacuole filled with cell sap that helps keep the cell firm.',
      },
    ],
  },
];

export const topicsForSubjectGrade = (subjectId: string, grade: number): Topic[] =>
  TOPICS.filter((t) => t.subjectId === subjectId && t.grade === grade).sort(
    (a, b) => a.order - b.order,
  );

export const lessonsForTopic = (topicId: string): Lesson[] =>
  LESSONS.filter((l) => l.topicId === topicId).sort((a, b) => a.order - b.order);

export const lessonById = (id: string): Lesson | undefined =>
  LESSONS.find((l) => l.id === id);

export const topicById = (id: string): Topic | undefined =>
  TOPICS.find((t) => t.id === id);
