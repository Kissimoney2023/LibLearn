import type {Lesson, Topic, Unit} from '../../types/domain';
import {GRADE1_LESSONS, GRADE1_TOPICS, GRADE1_UNITS} from './grade1';
import {GRADE2_LESSONS, GRADE2_TOPICS, GRADE2_UNITS} from './grade2';
import {GRADE3_LESSONS, GRADE3_TOPICS, GRADE3_UNITS} from './grade3';
import {GRADE4_LESSONS, GRADE4_TOPICS, GRADE4_UNITS} from './grade4';
import {GRADE5_LESSONS, GRADE5_TOPICS, GRADE5_UNITS} from './grade5';
import {GRADE7_LESSONS, GRADE7_TOPICS, GRADE7_UNITS} from './grade7';
import {GRADE9_LESSONS, GRADE9_TOPICS, GRADE9_UNITS} from './grade9';
import {GRADE11_LESSONS, GRADE11_TOPICS, GRADE11_UNITS} from './grade11';
import {GRADE12_LESSONS, GRADE12_TOPICS, GRADE12_UNITS} from './grade12';

/**
 * LIBLEARN CURRICULUM SEED.
 *
 * Every record here is provenance: 'liblearn'. It is academically standard
 * teaching material written for LibLearn. It is NOT the official Liberian
 * curriculum and must never be presented as such - see src/data/sources.ts for
 * why nothing may currently claim `official`.
 *
 * Replacing it with verified material is a data-layer change only: no component
 * reads these objects by literal id.
 */

const BASE_TOPICS: Topic[] = [
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

const BASE_LESSONS: Lesson[] = [
  {
    id: 'g8-math-algebra-l1',
    topicId: 'g8-math-algebra',
    subjectId: 'mathematics',
    grade: 8,
    title: 'Understanding Variables and Expressions',
    estimatedMinutes: 14,
    order: 1,
    provenance: 'liblearn',
    reviewStatus: 'published',
    curriculumVersionId: 'liblearn-v1',
    objectives: [
      {id: 'o1', text: 'Explain what a variable stands for in an expression.'},
      {id: 'o2', text: 'Write a word problem as an algebraic expression.'},
      {id: 'o3', text: 'Identify the terms and coefficients in an expression.'},
    ],
    keyTerms: [
      {term: 'Variable', definition: 'A letter standing in for a number you do not know yet.'},
      {term: 'Coefficient', definition: 'The number multiplying a variable. In 3x the coefficient is 3.'},
      {term: 'Term', definition: 'One piece of an expression, separated from the next by + or −.'},
      {term: 'Constant', definition: 'A term with no variable, so its value never changes.'},
      {term: 'Expression', definition: 'A collection of terms with no equals sign. It has a value, not a solution.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Algebra begins when you stop needing to know a number in order to work with it.\n\nBy the end of this lesson you will be able to:\n\n• say what a letter in an expression stands for\n• name the terms and coefficients in an expression\n• turn a sentence in words into an algebraic expression',
      },
      {
        heading: 'What a variable is',
        body: 'A variable is a letter that stands in for a number you do not know yet. In the expression 3x + 5, the letter x is the variable. It has no fixed value — it waits for you to find out what it is. The number 3 in front of it is called the coefficient, and it means "three lots of x".\n\nThis is the idea that makes algebra useful. You can describe a situation, and do arithmetic on that description, before you know any of the numbers. The price of cassava can change every week; the rule "three bundles cost 3x" stays true whatever x turns out to be.\n\nNotice that 3x is a multiplication with the sign left out. Algebra drops the × because it looks too much like the letter x.',
        example: 'If a bundle of cassava costs x dollars, then 3 bundles cost 3x dollars. When x turns out to be 25, the three bundles cost 3 × 25 = 75 dollars.',
      },
      {
        heading: 'Terms and coefficients',
        body: 'An expression is built from terms separated by plus or minus signs. In 4a + 7b − 2, there are three terms: 4a, 7b and −2. The coefficient of a is 4 and the coefficient of b is 7. The term −2 has no variable at all, so it is called a constant — its value never changes.\n\nThe sign belongs to the term that follows it. In 4a + 7b − 2 the third term is −2, not 2. Getting this right matters the moment you start moving terms around.\n\nA letter written on its own has a coefficient of 1. In x + 5, the coefficient of x is 1, even though nothing is written in front of it.',
        example: 'In 9m − n + 6:\n\n    terms        → 9m, −n, 6\n    coefficients → 9 for m, −1 for n\n    constant     → 6',
      },
      {
        heading: 'Turning words into algebra',
        body: 'Most of algebra is translation. "Five more than a number" becomes n + 5. "Twice a number, less three" becomes 2n − 3. Read the sentence slowly and write down each piece in the order it appears, then check that your expression says the same thing as the words.\n\nOne warning about order. "Five more than a number" and "five less than a number" do not translate the same way round: the first is n + 5, but the second is n − 5, not 5 − n. Subtraction cares about order; addition does not.\n\nThe safest check is to invent a number. Pick n = 10 and read both the words and your expression. If they give different answers, the translation is wrong.',
        example: 'A taxi charges 40 dollars to start plus 15 dollars for each kilometre. The cost of a journey of k kilometres is 40 + 15k.\n\nCheck with k = 3: the words say 40 + three lots of 15 = 40 + 45 = 85. The expression gives 40 + 15 × 3 = 85. They agree.',
      },
      {
        heading: 'Worked example',
        body: 'A market woman buys n crates of tomatoes at 250 dollars each. She also pays 600 dollars to transport the whole load. Write an expression for her total cost, then find the cost when she buys 7 crates.\n\nStep 1 — name what is unknown.\n    n is the number of crates.\n\nStep 2 — write each cost as a term.\n    crates: 250 each, n of them → 250n\n    transport: a flat 600, however many crates → 600\n\nStep 3 — combine.\n    total cost = 250n + 600\n\nThe 250 is a coefficient because it multiplies the variable. The 600 is a constant because it does not change with n.\n\nStep 4 — use it. For 7 crates, substitute n = 7:\n    250 × 7 + 600 = 1750 + 600 = 2350 dollars.',
      },
      {
        heading: 'Common mistakes',
        body: '**Writing 3x when you mean 3 + x.** 3x means three lots of x. If the words say "three more than x", the expression is x + 3.\n\n**Losing the sign in front of a term.** In 4a − 7b the second term is −7b. Students who record it as 7b get the right answer to the wrong question later on.\n\n**Thinking x always means the same number.** x is whatever the problem makes it. In one question it is 5, in the next it is 200.\n\n**Translating "five less than n" as 5 − n.** It is n − 5. Test it with a number: five less than 12 is 7, and 12 − 5 = 7, while 5 − 12 = −7.',
      },
      {
        heading: 'Try it yourself',
        body: '1. In 6y − 4, name the coefficient, the variable and the constant.\n\n2. Write an expression for "eight more than twice a number p".\n\n3. A phone costs 45 dollars plus 12 dollars per month. Write the cost after m months.\n\n4. In 5a + b − 9, how many terms are there, and what is the coefficient of b?\n\n5. Sia is x years old. Her brother is 4 years younger. Write his age, then check it with x = 15.',
      },
      {
        heading: 'Summary',
        body: '• A variable is a letter standing in for an unknown number.\n• A coefficient is the number multiplying a variable; a letter alone has coefficient 1.\n• Terms are separated by + and −, and the sign belongs to the term after it.\n• A constant has no variable and never changes.\n• To translate words, write the pieces in order, then test with a number you choose.',
      },
    ],
  },
  {
    id: 'g8-math-algebra-l2',
    topicId: 'g8-math-algebra',
    subjectId: 'mathematics',
    grade: 8,
    title: 'Solving Linear Equations',
    estimatedMinutes: 16,
    order: 2,
    provenance: 'liblearn',
    reviewStatus: 'published',
    curriculumVersionId: 'liblearn-v1',
    objectives: [
      {id: 'o1', text: 'Solve a one-step linear equation.'},
      {id: 'o2', text: 'Solve a two-step linear equation.'},
      {id: 'o3', text: 'Check a solution by substituting it back.'},
      {id: 'o4', text: 'Solve an equation with the variable on both sides.'},
    ],
    keyTerms: [
      {term: 'Equation', definition: 'A statement that two expressions are equal. It has an equals sign and a solution.'},
      {term: 'Solution', definition: 'The value of the variable that makes both sides equal.'},
      {term: 'Inverse operation', definition: 'The operation that undoes another: subtraction undoes addition, division undoes multiplication.'},
      {term: 'Substitute', definition: 'To put a number in place of a letter.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'An expression has a value. An equation has a solution. This lesson is about finding it.\n\nBy the end you will be able to:\n\n• solve equations in one step and in two steps\n• solve an equation where the letter appears on both sides\n• check any answer for yourself, so you never have to wonder whether it is right',
      },
      {
        heading: 'The balance rule',
        body: 'An equation says two things are equal. Picture a balance scale: whatever you do to one side, you must do to the other, or the scale tips. That single rule is the whole of equation solving. To get x by itself, undo whatever has been done to it — and do the same undoing on both sides.\n\nEvery operation has an inverse. Addition is undone by subtraction. Multiplication is undone by division. You are not moving numbers across the equals sign by magic; you are doing the same thing to both sides and letting one side simplify.',
        example: 'x + 7 = 12. Seven has been added to x, so subtract 7 from both sides:\n\n    x + 7 − 7 = 12 − 7\n    x = 5',
      },
      {
        heading: 'Two-step equations',
        body: 'When x has been multiplied and then added to, undo in reverse order: deal with the addition or subtraction first, then the multiplication. This is the opposite of the order you would use to build the expression up.\n\nThink of it as unwrapping a parcel. The last layer put on is the first layer taken off. In 3x + 4, the 4 was added last, so the 4 comes off first.',
        example: '3x + 4 = 19.\n\n    subtract 4 from both sides → 3x = 15\n    divide both sides by 3     → x = 5',
      },
      {
        heading: 'Variables on both sides',
        body: 'Sometimes the letter appears on both sides, as in 5x − 3 = 2x + 12. The balance rule still does all the work: collect the variable terms on one side and the numbers on the other.\n\nSubtract the smaller variable term from both sides. Here 2x is smaller than 5x, so subtract 2x from each side. That removes x from the right entirely and leaves an ordinary two-step equation.\n\nChoosing the smaller term keeps the coefficient positive, which is easier to work with and gives fewer sign errors.',
        example: '5x − 3 = 2x + 12.\n\n    subtract 2x from both sides → 3x − 3 = 12\n    add 3 to both sides         → 3x = 15\n    divide both sides by 3      → x = 5\n\nCheck: left 5 × 5 − 3 = 22. Right 2 × 5 + 12 = 22. They match.',
      },
      {
        heading: 'Always check your answer',
        body: 'Substituting your answer back into the original equation costs ten seconds and catches almost every mistake. Put the number in place of the letter and work out both sides separately. If they match, you are right.\n\nThis is the part most students skip and the part that most reliably turns a lost mark into a gained one. You do not need the teacher, the answer sheet or anyone else: the equation itself tells you whether you are correct.',
        example: 'Check x = 5 in 3x + 4 = 19.\n\n    Left side:  3 × 5 + 4 = 15 + 4 = 19\n    Right side: 19\n\nThey match, so x = 5 is correct.',
      },
      {
        heading: 'Worked example',
        body: 'Solve 4(x − 1) + 2x = 26 and check the answer.\n\nStep 1 — expand the bracket.\n    4x − 4 + 2x = 26\n\nStep 2 — collect like terms on the left.\n    6x − 4 = 26\n\nStep 3 — undo the subtraction.\n    add 4 to both sides → 6x = 30\n\nStep 4 — undo the multiplication.\n    divide both sides by 6 → x = 5\n\nStep 5 — check in the ORIGINAL equation, not the tidied one. Checking in your own working would hide a mistake made in step 1.\n\n    4(5 − 1) + 2 × 5 = 4 × 4 + 10 = 16 + 10 = 26 ✓',
      },
      {
        heading: 'Common mistakes',
        body: '**Doing something to one side only.** 3x = 15 becomes x = 5, not x = 12. Divide both sides.\n\n**Undoing in the wrong order.** In 3x + 4 = 19, dividing by 3 first gives x + 4/3, which is correct but far harder. Take the +4 off first.\n\n**Checking in your own working.** Always substitute into the original equation. If you copied it down wrongly, only the original will reveal it.\n\n**Sign errors with the variable on both sides.** Subtracting the larger variable term leaves a negative coefficient, which is legal but invites mistakes. Subtract the smaller one.',
      },
      {
        heading: 'Try it yourself',
        body: '1. x − 6 = 11\n\n2. 5x = 40\n\n3. 2x + 9 = 23\n\n4. 7x − 5 = 3x + 15\n\n5. Check your answer to question 4 by substituting it into both sides.\n\n6. A number is doubled and then 7 is added, giving 31. Write the equation and solve it.',
      },
      {
        heading: 'Summary',
        body: '• An equation is a balance: do the same thing to both sides.\n• Undo operations with their inverses, in reverse order.\n• With the letter on both sides, subtract the smaller variable term first.\n• Always substitute your answer back into the original equation.\n• A checked answer needs no one else to confirm it.',
      },
    ],
  },
  {
    id: 'g8-math-algebra-l3',
    topicId: 'g8-math-algebra',
    subjectId: 'mathematics',
    grade: 8,
    title: 'Equations with Brackets',
    estimatedMinutes: 15,
    order: 3,
    provenance: 'liblearn',
    reviewStatus: 'published',
    curriculumVersionId: 'liblearn-v1',
    objectives: [
      {id: 'o1', text: 'Expand a bracket using the distributive law.'},
      {id: 'o2', text: 'Solve an equation that contains brackets.'},
    ],
    keyTerms: [
      {term: 'Distributive law', definition: 'The rule that a(b + c) = ab + ac: the outside number multiplies every term inside.'},
      {term: 'Expand', definition: 'To remove a bracket by multiplying it out.'},
      {term: 'Like terms', definition: 'Terms with exactly the same variable part, which can be added together.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Brackets group a whole expression so it can be multiplied in one go. Removing them correctly is the skill this lesson builds.\n\nBy the end you will be able to:\n\n• expand a bracket using the distributive law\n• handle a minus sign in front of a bracket without losing marks\n• solve an equation that contains brackets',
      },
      {
        heading: 'Expanding brackets',
        body: 'The number outside a bracket multiplies everything inside it — every term, not just the first. This is the distributive law. Missing the second term is the single most common slip in this topic, so write the multiplication out in full until it becomes automatic.\n\nIt helps to draw two arrows, one from the outside number to each term inside, and to say the multiplication aloud as you write it.\n\nA minus sign outside the bracket belongs to the multiplier. In −3(x + 2), you are multiplying by −3, so BOTH terms change sign: −3x − 6.',
        example: '4(x + 3) means 4 times x plus 4 times 3, which is 4x + 12. It does not mean 4x + 3.\n\nAnd −3(x + 2) = −3x − 6, not −3x + 6.',
      },
      {
        heading: 'Solving with brackets',
        body: 'Expand the bracket first, then solve the equation the ordinary way with the balance rule. Take care with a minus sign outside a bracket: it changes the sign of every term inside.\n\nIf the same variable appears more than once after expanding, collect the like terms before you start undoing. 2x + 3x is 5x; 2x + 3 is not 5x, because those are not like terms.',
        example: '2(x − 5) = 14.\n\n    expand              → 2x − 10 = 14\n    add 10 to both sides → 2x = 24\n    divide by 2          → x = 12\n\nCheck: 2(12 − 5) = 2 × 7 = 14 ✓',
      },
      {
        heading: 'Worked example',
        body: 'Solve 5(x + 2) − 3(x − 1) = 21.\n\nStep 1 — expand the first bracket.\n    5(x + 2) = 5x + 10\n\nStep 2 — expand the second. The multiplier is −3, so both signs flip.\n    −3(x − 1) = −3x + 3\n\nThat +3 is where most marks are lost. Minus times minus gives plus.\n\nStep 3 — write the whole left side and collect like terms.\n    5x + 10 − 3x + 3 = 21\n    2x + 13 = 21\n\nStep 4 — solve.\n    subtract 13 → 2x = 8\n    divide by 2 → x = 4\n\nStep 5 — check in the original.\n    5(4 + 2) − 3(4 − 1) = 5 × 6 − 3 × 3 = 30 − 9 = 21 ✓',
      },
      {
        heading: 'Common mistakes',
        body: '**Multiplying only the first term.** 4(x + 3) is 4x + 12, never 4x + 3. Arrows to both terms.\n\n**Forgetting the sign flip.** −3(x − 1) is −3x + 3. A minus outside changes every sign inside.\n\n**Adding unlike terms.** 2x + 3 cannot be simplified to 5x. Only terms with the same variable part combine.\n\n**Solving before expanding.** Deal with the brackets first; the balance rule comes afterwards.',
      },
      {
        heading: 'Try it yourself',
        body: '1. Expand 6(x + 4).\n\n2. Expand −2(x − 7).\n\n3. Solve 3(x + 1) = 18.\n\n4. Solve 4(x − 2) = 20.\n\n5. Solve 2(x + 3) + 3(x − 1) = 23.\n\n6. Check your answer to question 5 in the original equation.',
      },
      {
        heading: 'Summary',
        body: '• The number outside a bracket multiplies every term inside.\n• A minus outside the bracket flips the sign of every term inside.\n• Expand first, collect like terms, then use the balance rule.\n• Only like terms can be added together.\n• Check the answer in the original equation.',
      },
    ],
  },
  {
    id: 'g8-math-fractions-l1',
    topicId: 'g8-math-fractions',
    subjectId: 'mathematics',
    grade: 8,
    title: 'Converting Fractions and Decimals',
    estimatedMinutes: 13,
    order: 1,
    provenance: 'liblearn',
    reviewStatus: 'published',
    curriculumVersionId: 'liblearn-v1',
    objectives: [
      {id: 'o1', text: 'Convert a fraction to a decimal by division.'},
      {id: 'o2', text: 'Convert a terminating decimal to a fraction in lowest terms.'},
    ],
    keyTerms: [
      {term: 'Numerator', definition: 'The top number of a fraction: how many parts you have.'},
      {term: 'Denominator', definition: 'The bottom number: how many equal parts the whole was cut into.'},
      {term: 'Terminating decimal', definition: 'A decimal that stops, such as 0.75.'},
      {term: 'Lowest terms', definition: 'A fraction where numerator and denominator share no common factor above 1.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Fractions and decimals are two ways of writing the same quantity. Being able to move between them lets you compare numbers that are written differently.\n\nBy the end you will be able to:\n\n• turn any fraction into a decimal\n• turn a terminating decimal into a fraction in lowest terms\n• compare a fraction with a decimal and say which is larger',
      },
      {
        heading: 'Fraction to decimal',
        body: 'A fraction is a division waiting to happen. The line between the numbers means "divide". So to turn a fraction into a decimal, divide the top number by the bottom number.\n\nThe order matters: it is always top ÷ bottom. For 3/4 that is 3 ÷ 4, which is less than 1 — as it should be, since three quarters is less than a whole.\n\nThis is also how you compare a fraction with a decimal. Put both into the same form first, then compare.',
        example: '3/4 means 3 divided by 4, which is 0.75. And 1/8 means 1 divided by 8, which is 0.125.\n\nTo compare 0.6 and 5/8: 5 ÷ 8 = 0.625, and 0.625 > 0.6, so 5/8 is larger.',
      },
      {
        heading: 'Decimal to fraction',
        body: 'Read the decimal aloud and the fraction is usually in the words. 0.7 is "seven tenths", so it is 7/10. 0.35 is "thirty-five hundredths", so it is 35/100 — then cancel down to 7/20 by dividing top and bottom by 5.\n\nThe number of decimal places tells you the denominator: one place is tenths, two places is hundredths, three is thousandths. Then simplify.\n\nAn answer is in lowest terms when no number above 1 divides both top and bottom.',
        example: '0.35 → 35/100.\n\n    both divide by 5 → 7/20\n    7 and 20 share no factor, so 7/20 is in lowest terms.',
      },
      {
        heading: 'Worked example',
        body: 'Put these in order, smallest first: 0.6, 5/8, 0.58, 3/5.\n\nStep 1 — convert every fraction to a decimal so they are all in one form.\n    5/8 = 5 ÷ 8 = 0.625\n    3/5 = 3 ÷ 5 = 0.6\n\nStep 2 — list them all as decimals.\n    0.6, 0.625, 0.58, 0.6\n\nStep 3 — compare place by place from the left. Writing them to the same number of places makes this easier:\n    0.600, 0.625, 0.580, 0.600\n\nStep 4 — order them.\n    0.580 < 0.600 = 0.600 < 0.625\n\nSo: 0.58, then 0.6 and 3/5 (equal), then 5/8.\n\nNotice that 3/5 and 0.6 are the same number written two ways.',
      },
      {
        heading: 'Common mistakes',
        body: '**Dividing bottom by top.** 3/4 is 3 ÷ 4 = 0.75, not 4 ÷ 3. The fraction is less than 1, so the decimal must be too.\n\n**Comparing decimals by length.** 0.58 is not bigger than 0.6 because it has more digits. Line up the places: 0.580 against 0.600.\n\n**Stopping before lowest terms.** 35/100 is correct but not finished. Cancel to 7/20.\n\n**Forgetting the place value.** 0.35 is thirty-five hundredths, so 35/100 — not 35/10.',
      },
      {
        heading: 'Try it yourself',
        body: '1. Write 1/4 as a decimal.\n\n2. Write 2/5 as a decimal.\n\n3. Write 0.8 as a fraction in lowest terms.\n\n4. Write 0.45 as a fraction in lowest terms.\n\n5. Which is larger, 0.7 or 3/4?\n\n6. Put in order, smallest first: 1/2, 0.45, 3/5.',
      },
      {
        heading: 'Summary',
        body: '• A fraction line means divide: top ÷ bottom.\n• Decimal places give the denominator: tenths, hundredths, thousandths.\n• Always cancel down to lowest terms.\n• To compare, convert everything to one form first.\n• Writing decimals to the same number of places makes comparing safe.',
      },
    ],
  },
  {
    id: 'g6-math-fractions-l1',
    topicId: 'g6-math-fractions',
    subjectId: 'mathematics',
    grade: 6,
    title: 'Naming and Comparing Fractions',
    estimatedMinutes: 13,
    order: 1,
    provenance: 'liblearn',
    reviewStatus: 'published',
    curriculumVersionId: 'liblearn-v1',
    objectives: [
      {id: 'o1', text: 'Name the numerator and denominator of a fraction.'},
      {id: 'o2', text: 'Compare two fractions with the same denominator.'},
    ],
    keyTerms: [
      {term: 'Fraction', definition: 'A number describing part of a whole that has been cut into equal parts.'},
      {term: 'Numerator', definition: 'The top number: how many parts you have.'},
      {term: 'Denominator', definition: 'The bottom number: how many equal parts the whole was cut into.'},
      {term: 'Equal parts', definition: 'Pieces of exactly the same size. Without this, a fraction has no meaning.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'A fraction is not one number — it is two numbers doing two different jobs.\n\nBy the end of this lesson you will be able to:\n\n• name the numerator and the denominator, and say what each one tells you\n• work out what fraction of a whole is left over\n• compare two fractions that have the same denominator, and explain why',
      },
      {
        heading: 'The two numbers',
        body: 'A fraction has a top number and a bottom number. The bottom number — the denominator — tells you how many equal parts the whole has been cut into. The top number — the numerator — tells you how many of those parts you have.\n\nThe word EQUAL is doing a lot of work here. If a loaf is cut into 8 pieces of different sizes, taking 3 of them is not 3/8 of the loaf. A fraction only means something when the parts are the same size.\n\nOne way to hold the two words apart: the Denominator is Down, and it tells you how many pieces the whole was Divided into.',
        example: 'If a loaf is cut into 8 equal slices and you take 3, you have 3/8 of the loaf. The 8 is the denominator, the 3 is the numerator.\n\nThe rest of the loaf is the other 5 slices, which is 5/8. Notice that 3/8 and 5/8 together make 8/8 — one whole loaf.',
      },
      {
        heading: 'Comparing fractions',
        body: 'When two fractions have the same denominator, the pieces are the same size, so the one with the bigger numerator is bigger. 5/8 is greater than 3/8 because five equal pieces beat three of the same size.\n\nThis only works when the denominators match. Comparing 3/8 with 1/2 by looking at the top numbers would tell you 3/8 is bigger, and that is wrong: 1/2 is 4/8.\n\nSo before you compare, check the bottoms. Same denominator — compare the tops. Different denominators — you cannot compare them directly yet.',
        example: 'Which is bigger, 7/10 or 4/10?\n\nBoth wholes were cut into 10 equal parts, so every piece is the same size. Seven pieces is more than four.\n\n    7/10 > 4/10',
      },
      {
        heading: 'Worked example',
        body: 'A cassava is cut into 12 equal pieces. Musu takes 5 pieces and Sia takes 4.\n\n(a) What fraction does each girl have?\n\n    The whole was cut into 12 equal parts, so 12 is the denominator for both.\n    Musu: 5 pieces → 5/12\n    Sia:  4 pieces → 4/12\n\n(b) Who has more?\n\n    The denominators are the same, so the pieces are the same size.\n    Compare the numerators: 5 > 4.\n    Musu has more.\n\n(c) What fraction is left?\n\n    Taken altogether: 5 + 4 = 9 pieces.\n    Left: 12 − 9 = 3 pieces → 3/12\n\n(d) Check.\n\n    5/12 + 4/12 + 3/12 = 12/12, which is the whole cassava. ✓',
      },
      {
        heading: 'Common mistakes',
        body: '**Reading the fraction upside down.** In 3/8 you have 3 pieces out of 8, not 8 pieces out of 3. Denominator is Down.\n\n**Forgetting that the parts must be equal.** Three of eight uneven pieces is not 3/8.\n\n**Comparing tops when the bottoms differ.** 3/8 looks bigger than 1/2 if you only read the numerators, but 1/2 is the same as 4/8, so 1/2 wins.\n\n**Thinking a bigger denominator means a bigger fraction.** More pieces means SMALLER pieces. 1/12 is less than 1/4.',
      },
      {
        heading: 'Try it yourself',
        body: '1. In the fraction 5/9, name the numerator and the denominator.\n\n2. A pizza is cut into 6 equal slices and you eat 2. What fraction did you eat? What fraction is left?\n\n3. Which is bigger, 4/7 or 6/7? Say why.\n\n4. Can you tell straight away which is bigger, 2/3 or 2/5? What is different about this question?\n\n5. A rope is cut into 10 equal pieces. Three are used. Write the fraction used and the fraction left, and check they add to 10/10.',
      },
      {
        heading: 'Summary',
        body: '• The denominator (bottom) says how many equal parts the whole was cut into.\n• The numerator (top) says how many of those parts you have.\n• The parts must be EQUAL or the fraction means nothing.\n• With the same denominator, the bigger numerator is the bigger fraction.\n• With different denominators, you cannot compare the tops directly.',
      },
    ],
  },
  {
    id: 'g8-science-matter-l1',
    topicId: 'g8-science-matter',
    subjectId: 'general-science',
    grade: 8,
    title: 'The Three States of Matter',
    estimatedMinutes: 14,
    order: 1,
    provenance: 'liblearn',
    reviewStatus: 'published',
    curriculumVersionId: 'liblearn-v1',
    objectives: [
      {id: 'o1', text: 'Describe the arrangement of particles in solids, liquids and gases.'},
      {id: 'o2', text: 'Explain why a gas fills its container but a solid does not.'},
    ],
    keyTerms: [
      {term: 'Particle', definition: 'The tiny unit all matter is made of, far too small to see.'},
      {term: 'State of matter', definition: 'Solid, liquid or gas — determined by how the particles are arranged and how they move.'},
      {term: 'Volume', definition: 'The amount of space something takes up.'},
      {term: 'Compress', definition: 'To squeeze into a smaller volume. Possible for gases, barely possible for solids and liquids.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Ice, water and steam are the same substance. What makes them behave so differently is not what they are made of, but how their particles are arranged.\n\nBy the end you will be able to:\n\n• describe how particles sit and move in a solid, a liquid and a gas\n• explain why each state keeps or loses its shape and volume\n• use the particle model to predict how a substance will behave',
      },
      {
        heading: 'Particles and arrangement',
        body: 'All matter is made of tiny particles. What makes a solid different from a liquid or a gas is not the particles themselves but how they are arranged and how freely they move. In a solid they are packed closely in a fixed pattern and can only vibrate. In a liquid they are still close together but can slide past one another. In a gas they are far apart and move quickly in all directions.\n\nThis is the key idea of the whole topic: the particles in ice, water and steam are identical. Heating does not change the particles. It gives them more energy, so they move more and hold their arrangement less.\n\n    SOLID   ●●●●   fixed pattern, vibrating on the spot\n    LIQUID  ●● ●●  close but sliding past each other\n    GAS     ●   ●  far apart, moving fast in all directions',
      },
      {
        heading: 'Shape and volume',
        body: 'Because solid particles hold their positions, a solid keeps its own shape and volume. A liquid keeps its volume but takes the shape of its container, since its particles can flow. A gas keeps neither — its particles spread out until they fill whatever space they are given.\n\nThat last point is what makes a gas fill its container. There is nothing holding the particles together, so they simply keep moving until the walls stop them.\n\nIt also explains compression. A gas has large gaps between particles, so it can be squeezed into a smaller volume. A solid or liquid has almost no gaps, which is why you cannot squash a bottle of water.',
        example: 'Water shows all three. Ice holds its shape. Liquid water takes the shape of the cup. Steam spreads through the whole kitchen.\n\n                shape?      volume?\n    solid       keeps       keeps\n    liquid      takes       keeps\n    gas         takes       takes',
      },
      {
        heading: 'Worked example',
        body: 'A sealed syringe contains air. You push the plunger in. Then you fill the same syringe with water and try again.\n\n(a) What happens with the air?\n\n    The plunger moves in a long way. Gas particles are far apart, so there is\n    space for them to be pushed closer together.\n\n(b) What happens with the water?\n\n    The plunger barely moves. Liquid particles are already touching, so there\n    is almost no space to remove.\n\n(c) What does this tell you?\n\n    The difference is not the particles but the GAPS between them. Gases\n    compress because they are mostly empty space; liquids do not because they\n    are not.\n\n(d) Predict: would a block of wood compress?\n\n    No. Its particles are packed in a fixed pattern with no gaps to close —\n    even less free space than a liquid.',
      },
      {
        heading: 'Common mistakes',
        body: '**Thinking the particles themselves change.** The particles in ice and steam are exactly the same. Only their arrangement and energy differ.\n\n**Saying a gas has no volume.** A gas takes the volume of its container. It does not lack volume; it lacks a fixed one.\n\n**Confusing "takes the shape" with "keeps the volume".** A liquid does both at once: it takes the container\'s shape while keeping its own volume.\n\n**Thinking particles in a solid are still.** They vibrate. They simply cannot leave their positions.',
      },
      {
        heading: 'Try it yourself',
        body: '1. In which state are particles packed in a fixed pattern?\n\n2. Why does a gas fill its whole container?\n\n3. Which state keeps its volume but takes the shape of its container?\n\n4. Explain why air can be compressed in a syringe but water cannot.\n\n5. A substance keeps its volume but flows into the shape of its jar. Which state is it?\n\n6. Ice, water and steam are the same substance. What is different about them?',
      },
      {
        heading: 'Summary',
        body: '• All matter is made of particles; the state depends on their arrangement and movement.\n• Solid: fixed pattern, vibrating. Keeps shape and volume.\n• Liquid: close but sliding. Takes shape, keeps volume.\n• Gas: far apart, fast. Takes both shape and volume.\n• Gases compress because of the gaps between particles; solids and liquids have almost none.',
      },
    ],
  },
  {
    id: 'g8-english-speech-l1',
    topicId: 'g8-english-speech',
    subjectId: 'english',
    grade: 8,
    title: 'Nouns, Verbs and Adjectives',
    estimatedMinutes: 12,
    order: 1,
    provenance: 'liblearn',
    reviewStatus: 'published',
    curriculumVersionId: 'liblearn-v1',
    objectives: [
      {id: 'o1', text: 'Identify nouns, verbs and adjectives in a sentence.'},
      {id: 'o2', text: 'Explain the job each does.'},
    ],
    keyTerms: [
      {term: 'Noun', definition: 'A naming word: a person, place, thing or idea.'},
      {term: 'Verb', definition: 'A doing or being word: what is happening.'},
      {term: 'Adjective', definition: 'A describing word that tells you more about a noun.'},
      {term: 'Adverb', definition: 'A word describing a verb — often how, when or where something was done.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'Words are sorted by the JOB they do in a sentence, not by what they look like. The same word can do different jobs on different days.\n\nBy the end you will be able to:\n\n• identify the nouns, verbs and adjectives in a sentence\n• say what job each one is doing\n• use a reliable test rather than guessing',
      },
      {
        heading: 'The three workhorses',
        body: 'A noun names something — a person, place, thing or idea. A verb tells you what is happening or what something is. An adjective describes a noun, adding detail about which one, what kind or how many.\n\nThese three carry most of the meaning in any sentence. Strip a sentence down to its noun and verb and you still have an idea; remove them and you have nothing.\n\nIdeas count as nouns too, even though you cannot touch them: freedom, hunger, courage. If you can put "the" in front of it, it is very likely a noun.',
        example: 'In "The clever student answered quickly", student is the noun, answered is the verb, and clever is the adjective describing the student.\n\nNote that "quickly" is none of the three — it describes HOW the student answered, which makes it an adverb.',
      },
      {
        heading: 'Finding them reliably',
        body: 'To find the verb, ask what is being done. To find the noun, ask who or what is doing it. To find adjectives, look at the words sitting just before a noun and ask whether they describe it.\n\nWork in that order — verb first, then noun, then adjective. The verb is usually the easiest to spot, and once you have it, asking "who or what did this?" hands you the noun immediately.\n\nBe careful: the same word can change job. In "I drink water", drink is a verb. In "Bring me a drink", drink is a noun. The word did not change; the job did. Always test the word in the sentence in front of you.',
        example: 'Take "The tired farmer harvested the rice."\n\n    What is being done?        harvested → VERB\n    Who or what did it?        farmer    → NOUN\n    What else is named?        rice      → NOUN\n    What describes the farmer? tired     → ADJECTIVE',
      },
      {
        heading: 'Worked example',
        body: 'Label every noun, verb and adjective in this sentence:\n\n    "The young teacher wrote three difficult questions on the old board."\n\nStep 1 — find the verb. What is being done? Someone wrote.\n    wrote → VERB\n\nStep 2 — find who or what did it.\n    teacher → NOUN\n\nStep 3 — find the other naming words. Use the "the" test.\n    questions → NOUN (the questions ✓)\n    board     → NOUN (the board ✓)\n\nStep 4 — find the describing words. Look just before each noun.\n    young     describes teacher   → ADJECTIVE\n    three     describes questions → ADJECTIVE (how many)\n    difficult describes questions → ADJECTIVE (what kind)\n    old       describes board     → ADJECTIVE\n\nFinal answer:\n    Nouns: teacher, questions, board\n    Verb: wrote\n    Adjectives: young, three, difficult, old\n\nNumber words like "three" are adjectives when they tell you how many of a noun there are.',
      },
      {
        heading: 'Common mistakes',
        body: '**Calling an adverb an adjective.** "Quickly" describes the verb, not a noun, so it is an adverb. Adjectives describe nouns only.\n\n**Deciding a word\'s job without reading the sentence.** "Drink" is a verb in one sentence and a noun in another. The sentence decides.\n\n**Missing nouns that are ideas.** Freedom, hunger and courage are nouns even though you cannot hold them.\n\n**Forgetting number words.** In "three difficult questions", both "three" and "difficult" are adjectives.',
      },
      {
        heading: 'Try it yourself',
        body: 'For each sentence, list the nouns, the verb and the adjectives.\n\n1. The old man carried a heavy bucket.\n\n2. My younger sister sells fresh bread.\n\n3. The clever student answered quickly. (Careful — one word is none of the three.)\n\n4. In "Bring me a cold drink", what job does "drink" do?\n\n5. Write your own sentence with two nouns, one verb and two adjectives, then label them.',
      },
      {
        heading: 'Summary',
        body: '• A noun names a person, place, thing or idea.\n• A verb says what is happening.\n• An adjective describes a noun.\n• Find the verb first, then the noun, then the adjectives.\n• The same word can do different jobs — the sentence decides, not the word.',
      },
    ],
  },
  {
    id: 'g10-bio-cells-l1',
    topicId: 'g10-bio-cells',
    subjectId: 'biology',
    grade: 10,
    title: 'Cell Structure and Organelles',
    estimatedMinutes: 18,
    order: 1,
    provenance: 'liblearn',
    reviewStatus: 'published',
    curriculumVersionId: 'liblearn-v1',
    objectives: [
      {id: 'o1', text: 'Name the main organelles of a plant and an animal cell.'},
      {id: 'o2', text: 'State the function of the nucleus, mitochondria and chloroplast.'},
      {id: 'o3', text: 'Describe two differences between plant and animal cells.'},
    ],
    keyTerms: [
      {term: 'Cell', definition: 'The smallest unit of a living thing that can carry out the processes of life.'},
      {term: 'Organelle', definition: 'A structure inside a cell with a particular job.'},
      {term: 'Nucleus', definition: 'The organelle holding genetic information and controlling the cell.'},
      {term: 'Mitochondrion', definition: 'The organelle that releases energy from food by respiration. Plural: mitochondria.'},
      {term: 'Chloroplast', definition: 'The organelle in plant cells that captures light for photosynthesis.'},
    ],
    sections: [
      {
        heading: 'What you will learn',
        body: 'A cell is not a bag of jelly. It is an organised structure in which each part has a job, and the arrangement explains what the cell can do.\n\nBy the end you will be able to:\n\n• name the main organelles in plant and animal cells\n• state what the nucleus, mitochondria and chloroplast each do\n• explain a cell’s structure from the job it has to perform',
      },
      {
        heading: 'The cell as a working unit',
        body: 'Every living thing is built from cells, and each cell is a small working unit with parts called organelles. Each organelle has a job, and the cell stays alive because they work together.\n\nThe useful habit in this topic is to read structure as evidence of function. A cell that needs a great deal of energy will have many mitochondria. A cell that must capture light will be packed with chloroplasts and sit near the surface of a leaf.\n\nSo when an exam question describes an unfamiliar cell, look at what it contains and ask what job would require that.',
      },
      {
        heading: 'The main organelles',
        body: 'The nucleus holds the cell’s genetic information and controls its activities. The mitochondria release energy from food through respiration. The cell membrane controls what enters and leaves. The cytoplasm is the jelly where most reactions happen.\n\nThese four are in BOTH plant and animal cells. Learning them as the shared set makes the plant-only extras easy to remember afterwards.\n\n    nucleus        → control centre, holds DNA\n    mitochondria   → release energy by respiration\n    cell membrane  → controls what goes in and out\n    cytoplasm      → where most reactions happen',
        example: 'Muscle cells contain very many mitochondria, because contracting a muscle demands a great deal of energy.',
      },
      {
        heading: 'Plant cells are different',
        body: 'A plant cell has everything an animal cell has, plus three structures an animal cell never has: a cell wall, chloroplasts and a large permanent vacuole.\n\nThe cell wall is made of cellulose and gives the cell a rigid shape and support — which is why a plant can stand up without a skeleton. Chloroplasts contain chlorophyll and carry out photosynthesis. The large vacuole is filled with cell sap and helps keep the cell firm.\n\nBe precise about the membrane. A plant cell has a cell wall AND a cell membrane; the wall does not replace the membrane. The wall gives shape; the membrane controls what passes through.',
        example: 'The three plant-only structures:\n\n    cell wall      → rigid support, made of cellulose\n    chloroplasts   → photosynthesis\n    large vacuole  → cell sap, keeps the cell firm\n\nRoot cells are an exception worth knowing: they have a cell wall and vacuole but few or no chloroplasts, because underground there is no light to capture.',
      },
      {
        heading: 'Worked example',
        body: 'A student examines an unknown cell under a microscope and records: a nucleus, a cell membrane, cytoplasm, a rigid outer wall, a large central vacuole, and no chloroplasts.\n\n(a) Is it a plant or an animal cell?\n\n    A rigid wall and a large permanent vacuole are plant features. An animal\n    cell has neither. So: a plant cell.\n\n(b) Why might it have no chloroplasts?\n\n    Chloroplasts capture light. A plant cell with none is probably not exposed\n    to light — a root cell, for example.\n\n(c) The cell also has unusually many mitochondria. What does that suggest?\n\n    Mitochondria release energy. Many of them means the cell needs a lot of\n    energy — consistent with a root hair cell actively taking up minerals.\n\n(d) What does this show about reading cells?\n\n    Structure is evidence of function. You did not need to be told what the\n    cell was; what it contains told you what it does.',
      },
      {
        heading: 'Common mistakes',
        body: '**Saying plant cells have a wall instead of a membrane.** They have both. The wall supports; the membrane controls what enters and leaves.\n\n**Assuming every plant cell has chloroplasts.** Root cells generally do not — there is no light underground.\n\n**Confusing the vacuole.** Animal cells may have small temporary vacuoles; the LARGE PERMANENT vacuole is the plant feature.\n\n**Saying mitochondria "make" energy.** Energy is not created. Mitochondria RELEASE it from food during respiration.',
      },
      {
        heading: 'Try it yourself',
        body: '1. Which organelle controls the activities of the cell?\n\n2. Name the three structures found in plant cells but not animal cells.\n\n3. What is the function of mitochondria?\n\n4. A cell has a nucleus, membrane and cytoplasm but no wall and no chloroplasts. Plant or animal?\n\n5. Why do muscle cells contain so many mitochondria?\n\n6. Explain why a root cell has a cell wall but few chloroplasts.',
      },
      {
        heading: 'Summary',
        body: '• All cells share a nucleus, cell membrane, cytoplasm and mitochondria.\n• Plant cells add a cell wall, chloroplasts and a large permanent vacuole.\n• The nucleus controls; mitochondria release energy; chloroplasts photosynthesise.\n• A plant cell has a wall AND a membrane — the wall does not replace it.\n• Read structure as evidence of function: what a cell contains tells you what it does.',
      },
    ],
  },
];

/**
 * Grade 11 lives in its own module purely for file size; it is part of the same
 * LibLearn Teaching Sequence v1 and carries the same provenance.
 */
/**
 * Units exist only for Grade 11 so far. Grades 6, 8 and 10 have topics filed
 * under no unit, which the UI handles explicitly (see `unfiledTopics`) rather
 * than hiding them. Content mid-import must stay reachable.
 */
export const UNITS: Unit[] = [
  ...GRADE1_UNITS,
  ...GRADE2_UNITS,
  ...GRADE3_UNITS,
  ...GRADE4_UNITS,
  ...GRADE5_UNITS,
  ...GRADE7_UNITS,
  ...GRADE9_UNITS,
  ...GRADE11_UNITS,
  ...GRADE12_UNITS,
];

export const TOPICS: Topic[] = [
  ...BASE_TOPICS,
  ...GRADE1_TOPICS,
  ...GRADE2_TOPICS,
  ...GRADE3_TOPICS,
  ...GRADE4_TOPICS,
  ...GRADE5_TOPICS,
  ...GRADE7_TOPICS,
  ...GRADE9_TOPICS,
  ...GRADE11_TOPICS,
  ...GRADE12_TOPICS,
];
export const LESSONS: Lesson[] = [
  ...BASE_LESSONS,
  ...GRADE1_LESSONS,
  ...GRADE2_LESSONS,
  ...GRADE3_LESSONS,
  ...GRADE4_LESSONS,
  ...GRADE5_LESSONS,
  ...GRADE7_LESSONS,
  ...GRADE9_LESSONS,
  ...GRADE11_LESSONS,
  ...GRADE12_LESSONS,
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
