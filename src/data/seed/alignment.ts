/**
 * QUESTION -> NOTE ALIGNMENT.
 *
 * The rule this file exists to enforce:
 *
 *     A question may only assess something its lesson's Note actually teaches.
 *
 * For every question it records the lesson that teaches it, the SECTION of that
 * lesson's Note which supports the answer, and the learning objective it
 * assesses. `scripts/validate-curriculum.ts` checks each `noteSection` against
 * the real section keys of that lesson's Note, so an entry here cannot silently
 * rot when a lesson is rewritten - a renamed heading changes the key and the
 * validator fails.
 *
 * NULL IS A REAL ANSWER. `noteSection: null` means nobody has established which
 * part of the Note supports the question, and it is reported as
 * NEEDS_VERIFICATION rather than guessed at. `objectiveId: null` means the
 * question tests something true and taught that no learning objective covers -
 * which is a finding about the objectives, not about the question.
 *
 * Writing this file found a real defect. The Grade 8 algebra quiz asked about
 * coefficients and about expanding brackets, but both sat on lesson 2, which
 * teaches neither: coefficients are lesson 1 and brackets are lesson 3. A
 * student who read lesson 2 and took its quiz was assessed on two things they
 * had not been shown. Those questions are re-homed below, which also gives
 * lessons 1 and 3 the quizzes they had been missing.
 */

export interface QuestionAlignment {
  /** The lesson whose Note teaches this. Authored, never inferred. */
  lessonId: string;
  /** Section key within that lesson's Note. null = NEEDS_VERIFICATION. */
  noteSection: string | null;
  /** Objective assessed. null = taught, but no objective covers it. */
  objectiveId: string | null;
  /** Required when either field above is null: why. */
  gap?: string;
}

export const QUESTION_ALIGNMENT: Record<string, QuestionAlignment> = {
  /* ------------------------------------------------------------ GRADE 1 */
  'q1-cnt-1': {lessonId: 'g1-math-counting-l1', noteSection: 'counting-means-pointing', objectiveId: 'o1'},
  'q1-cnt-2': {lessonId: 'g1-math-counting-l1', noteSection: 'which-group-has-more', objectiveId: 'o3'},
  'q1-cnt-3': {lessonId: 'g1-math-counting-l1', noteSection: 'the-numbers-to-20', objectiveId: 'o1'},
  'q1-snd-1': {lessonId: 'g1-eng-letter-sounds-l1', noteSection: 'the-first-sound', objectiveId: 'o1'},
  'q1-snd-2': {lessonId: 'g1-eng-letter-sounds-l1', noteSection: 'joining-sounds-to-read-a-word', objectiveId: 'o3'},
  'q1-snd-3': {lessonId: 'g1-eng-letter-sounds-l1', noteSection: 'the-first-sound', objectiveId: 'o1'},
  'q1-sen-1': {lessonId: 'g1-sci-senses-l1', noteSection: 'the-five-senses', objectiveId: 'o2'},
  'q1-sen-2': {lessonId: 'g1-sci-senses-l1', noteSection: 'senses-work-together', objectiveId: 'o3'},
  'q1-sen-3': {lessonId: 'g1-sci-senses-l1', noteSection: 'the-five-senses', objectiveId: 'o1'},
  'q1-fam-1': {lessonId: 'g1-soc-family-l1', noteSection: 'families-are-not-all-the-same', objectiveId: 'o1'},
  'q1-fam-2': {lessonId: 'g1-soc-family-l1', noteSection: 'why-families-help-each-other', objectiveId: 'o3'},

  /* ------------------------------------------------------------ GRADE 2 */
  'q2-to-1': {lessonId: 'g2-math-tens-ones-l1', noteSection: 'bundles-of-ten', objectiveId: 'o1'},
  'q2-to-2': {lessonId: 'g2-math-tens-ones-l1', noteSection: 'bundles-of-ten', objectiveId: 'o2'},
  'q2-to-3': {lessonId: 'g2-math-tens-ones-l1', noteSection: 'comparing-is-faster-with-tens', objectiveId: 'o3'},
  'q2-add-1': {lessonId: 'g2-math-addition-l1', noteSection: 'add-the-tens-add-the-ones', objectiveId: 'o1'},
  'q2-add-2': {lessonId: 'g2-math-addition-l1', noteSection: 'when-the-ones-make-ten-or-more', objectiveId: 'o2'},
  'q2-add-3': {lessonId: 'g2-math-addition-l1', noteSection: 'add-the-tens-add-the-ones', objectiveId: 'o1'},
  'q2-sen-1': {lessonId: 'g2-eng-sentences-l1', noteSection: 'a-sentence-needs-two-things', objectiveId: 'o1'},
  'q2-sen-2': {lessonId: 'g2-eng-sentences-l1', noteSection: 'a-sentence-needs-two-things', objectiveId: 'o1'},
  'q2-sen-3': {lessonId: 'g2-eng-sentences-l1', noteSection: 'start-big-end-with-a-dot', objectiveId: 'o2'},
  'q2-liv-1': {lessonId: 'g2-sci-living-needs-l1', noteSection: 'three-things-everything-alive-needs', objectiveId: 'o1'},
  'q2-liv-2': {lessonId: 'g2-sci-living-needs-l1', noteSection: 'plants-make-their-own-food', objectiveId: 'o2'},
  'q2-liv-3': {lessonId: 'g2-sci-living-needs-l1', noteSection: 'plants-make-their-own-food', objectiveId: 'o2'},
  'q2-hlp-1': {lessonId: 'g2-soc-helpers-l1', noteSection: 'jobs-that-help-everyone', objectiveId: 'o1'},
  'q2-hlp-2': {lessonId: 'g2-soc-helpers-l1', noteSection: 'depending-on-each-other', objectiveId: 'o3'},

  /* ------------------------------------------------------------ GRADE 3 */
  'q3-mul-1': {lessonId: 'g3-math-multiplication-l1', noteSection: 'equal-groups', objectiveId: 'o2'},
  'q3-mul-2': {lessonId: 'g3-math-multiplication-l1', noteSection: 'the-groups-must-be-equal', objectiveId: 'o3'},
  // Commutativity is taught in the Note but is not one of this lesson's stated
  // objectives. The objectives are incomplete, not the question.
  'q3-mul-3': {lessonId: 'g3-math-multiplication-l1', noteSection: 'turning-it-around', objectiveId: null,
    gap: 'Taught in "Turning it around" but no learning objective covers commutativity.'},
  'q3-fr-1': {lessonId: 'g3-math-fractions-l1', noteSection: 'equal-is-the-whole-idea', objectiveId: 'o1'},
  'q3-fr-2': {lessonId: 'g3-math-fractions-l1', noteSection: 'naming-the-parts', objectiveId: 'o2'},
  'q3-fr-3': {lessonId: 'g3-math-fractions-l1', noteSection: 'more-parts-means-smaller-parts', objectiveId: 'o3'},
  'q3-nv-1': {lessonId: 'g3-eng-nouns-verbs-l1', noteSection: 'doing-words', objectiveId: 'o2'},
  'q3-nv-2': {lessonId: 'g3-eng-nouns-verbs-l1', noteSection: 'naming-words', objectiveId: 'o3'},
  'q3-nv-3': {lessonId: 'g3-eng-nouns-verbs-l1', noteSection: 'why-this-helps-you', objectiveId: 'o2'},
  'q3-wat-1': {lessonId: 'g3-sci-water-cycle-l1', noteSection: 'where-does-the-puddle-go', objectiveId: 'o1'},
  'q3-wat-2': {lessonId: 'g3-sci-water-cycle-l1', noteSection: 'up-then-down-again', objectiveId: 'o2'},
  'q3-wat-3': {lessonId: 'g3-sci-water-cycle-l1', noteSection: 'up-then-down-again', objectiveId: 'o2'},
  'q3-dir-1': {lessonId: 'g3-soc-directions-l1', noteSection: 'using-the-sun', objectiveId: 'o2'},
  'q3-dir-2': {lessonId: 'g3-soc-directions-l1', noteSection: 'the-four-directions', objectiveId: 'o1'},
  'q3-dir-3': {lessonId: 'g3-soc-directions-l1', noteSection: 'using-the-sun', objectiveId: 'o2'},

  /* ------------------------------------------------------------ GRADE 4 */
  'q4-pv-1': {lessonId: 'g4-math-place-value-l1', noteSection: 'the-four-places', objectiveId: 'o1'},
  'q4-pv-2': {lessonId: 'g4-math-place-value-l1', noteSection: 'the-four-places', objectiveId: 'o2'},
  'q4-pv-3': {lessonId: 'g4-math-place-value-l1', noteSection: 'comparing-numbers', objectiveId: 'o3'},
  'q4-mul-1': {lessonId: 'g4-math-multiplication-l1', noteSection: 'where-multiplication-comes-from', objectiveId: 'o1'},
  'q4-mul-2': {lessonId: 'g4-math-multiplication-l1', noteSection: 'reading-the-two-numbers', objectiveId: 'o2'},
  'q4-mul-3': {lessonId: 'g4-math-multiplication-l1', noteSection: 'order-does-not-matter', objectiveId: 'o3'},
  'q4-nv-1': {lessonId: 'g4-eng-nouns-verbs-l1', noteSection: 'verbs-tell-what-happens', objectiveId: 'o2'},
  'q4-nv-2': {lessonId: 'g4-eng-nouns-verbs-l1', noteSection: 'nouns-name-things', objectiveId: 'o1'},
  'q4-nv-3': {lessonId: 'g4-eng-nouns-verbs-l1', noteSection: 'one-word-two-jobs', objectiveId: 'o3'},
  'q4-sen-1': {lessonId: 'g4-eng-sentences-l1', noteSection: 'two-things-every-sentence-needs', objectiveId: 'o2'},
  'q4-sen-2': {lessonId: 'g4-eng-sentences-l1', noteSection: 'the-waiting-test', objectiveId: 'o2'},
  'q4-liv-1': {lessonId: 'g4-sci-living-l1', noteSection: 'what-all-living-things-do', objectiveId: 'o2'},
  'q4-liv-2': {lessonId: 'g4-sci-living-l1', noteSection: 'why-it-moves-is-not-enough', objectiveId: 'o3'},
  'q4-liv-3': {lessonId: 'g4-sci-living-l1', noteSection: 'a-tricky-group', objectiveId: 'o2'},
  'q4-pl-1': {lessonId: 'g4-sci-plants-l1', noteSection: 'the-four-main-parts', objectiveId: 'o2'},
  'q4-pl-2': {lessonId: 'g4-sci-plants-l1', noteSection: 'the-four-main-parts', objectiveId: 'o2'},
  'q4-pl-3': {lessonId: 'g4-sci-plants-l1', noteSection: 'the-parts-need-each-other', objectiveId: 'o3'},
  'q4-map-1': {lessonId: 'g4-soc-maps-l1', noteSection: 'the-key-explains-the-symbols', objectiveId: 'o1'},
  'q4-map-2': {lessonId: 'g4-soc-maps-l1', noteSection: 'the-four-directions', objectiveId: 'o2'},
  'q4-map-3': {lessonId: 'g4-soc-maps-l1', noteSection: 'the-four-directions', objectiveId: 'o3'},

  /* ------------------------------------------------------------ GRADE 5 */
  'q5-eq-1': {lessonId: 'g5-math-equivalent-l1', noteSection: 'making-equivalent-fractions', objectiveId: 'o2'},
  'q5-eq-2': {lessonId: 'g5-math-equivalent-l1', noteSection: 'simplifying', objectiveId: 'o3'},
  'q5-eq-3': {lessonId: 'g5-math-equivalent-l1', noteSection: 'start-with-something-you-can-see', objectiveId: 'o1'},
  'q5-par-1': {lessonId: 'g5-eng-paragraph-l1', noteSection: 'the-topic-sentence-comes-first', objectiveId: 'o2'},
  'q5-par-2': {lessonId: 'g5-eng-paragraph-l1', noteSection: 'one-paragraph-one-idea', objectiveId: 'o3'},
  'q5-wc-1': {lessonId: 'g5-sci-water-cycle-l1', noteSection: 'up-cool-and-back-down', objectiveId: 'o2'},
  'q5-wc-2': {lessonId: 'g5-sci-water-cycle-l1', noteSection: 'up-cool-and-back-down', objectiveId: 'o2'},
  'q5-wc-3': {lessonId: 'g5-sci-water-cycle-l1', noteSection: 'start-with-a-puddle', objectiveId: 'o1'},
  'q5-res-1': {lessonId: 'g5-soc-resources-l1', noteSection: 'what-counts-as-a-natural-resource', objectiveId: 'o1'},
  'q5-res-2': {lessonId: 'g5-soc-resources-l1', noteSection: 'renewable-and-non-renewable', objectiveId: 'o2'},

  /* ------------------------------------------------------------ GRADE 6 */
  'q-fr6-1': {lessonId: 'g6-math-fractions-l1', noteSection: 'the-two-numbers', objectiveId: 'o1'},
  'q-fr6-2': {lessonId: 'g6-math-fractions-l1', noteSection: 'comparing-fractions', objectiveId: 'o2'},
  'q-fr6-3': {lessonId: 'g6-math-fractions-l1', noteSection: 'the-two-numbers', objectiveId: 'o1'},

  /* ------------------------------------------------------------ GRADE 7 */
  'q7-neg-1': {lessonId: 'g7-math-negatives-l1', noteSection: 'adding-and-subtracting', objectiveId: 'o2'},
  'q7-neg-2': {lessonId: 'g7-math-negatives-l1', noteSection: 'subtracting-a-negative', objectiveId: 'o3'},
  'q7-neg-3': {lessonId: 'g7-math-negatives-l1', noteSection: 'the-number-line', objectiveId: 'o1'},
  'q7-ten-1': {lessonId: 'g7-eng-tenses-l1', noteSection: 'irregular-verbs', objectiveId: 'o1'},
  'q7-ten-2': {lessonId: 'g7-eng-tenses-l1', noteSection: 'keep-the-tense-consistent', objectiveId: 'o3'},
  'q7-en-1': {lessonId: 'g7-sci-energy-l1', noteSection: 'energy-changes-form', objectiveId: 'o2'},
  'q7-en-2': {lessonId: 'g7-sci-energy-l1', noteSection: 'nothing-is-used-up', objectiveId: 'o3'},
  'q7-cli-1': {lessonId: 'g7-soc-climate-l1', noteSection: 'climate-is-the-pattern', objectiveId: 'o2'},
  'q7-cli-2': {lessonId: 'g7-soc-climate-l1', noteSection: 'why-the-difference-matters', objectiveId: 'o3'},
  'q7-civ-1': {lessonId: 'g7-civ-rights-l1', noteSection: 'every-right-places-a-duty-on-someone', objectiveId: 'o2'},
  'q7-civ-2': {lessonId: 'g7-civ-rights-l1', noteSection: 'responsibilities', objectiveId: 'o3'},

  /* ------------------------------------------------------------ GRADE 8 */
  // Re-homed: coefficients are taught in lesson 1, not lesson 2.
  'q-alg-1': {lessonId: 'g8-math-algebra-l1', noteSection: 'terms-and-coefficients', objectiveId: 'o3'},
  'q-alg-2': {lessonId: 'g8-math-algebra-l2', noteSection: 'the-balance-rule', objectiveId: 'o1'},
  'q-alg-3': {lessonId: 'g8-math-algebra-l2', noteSection: 'two-step-equations', objectiveId: 'o2'},
  // Re-homed: expanding brackets is lesson 3.
  'q-alg-4': {lessonId: 'g8-math-algebra-l3', noteSection: 'expanding-brackets', objectiveId: 'o1'},
  'q-alg-5': {lessonId: 'g8-math-algebra-l3', noteSection: 'solving-with-brackets', objectiveId: 'o2'},
  // Re-homed: writing a word problem as an expression is lesson 1.
  'q-alg-6': {lessonId: 'g8-math-algebra-l1', noteSection: 'turning-words-into-algebra', objectiveId: 'o2'},
  // Was NEEDS_VERIFICATION: no lesson taught variables on both sides. Lesson 2
  // now teaches it in its own section, with objective o4, so the question is
  // assessed learning and joins the lesson 2 quiz.
  'q-alg-7': {lessonId: 'g8-math-algebra-l2', noteSection: 'variables-on-both-sides', objectiveId: 'o4'},
  'q-fr8-1': {lessonId: 'g8-math-fractions-l1', noteSection: 'fraction-to-decimal', objectiveId: 'o1'},
  'q-fr8-2': {lessonId: 'g8-math-fractions-l1', noteSection: 'decimal-to-fraction', objectiveId: 'o2'},
  'q-fr8-3': {lessonId: 'g8-math-fractions-l1', noteSection: 'fraction-to-decimal', objectiveId: 'o1'},
  'q-mat-1': {lessonId: 'g8-science-matter-l1', noteSection: 'particles-and-arrangement', objectiveId: 'o1'},
  'q-mat-2': {lessonId: 'g8-science-matter-l1', noteSection: 'shape-and-volume', objectiveId: 'o2'},
  'q-mat-3': {lessonId: 'g8-science-matter-l1', noteSection: 'shape-and-volume', objectiveId: 'o2'},
  'q-eng-1': {lessonId: 'g8-english-speech-l1', noteSection: 'the-three-workhorses', objectiveId: 'o1'},
  'q-eng-2': {lessonId: 'g8-english-speech-l1', noteSection: 'finding-them-reliably', objectiveId: 'o1'},

  /* ------------------------------------------------------------ GRADE 9 */
  'q9-gr-1': {lessonId: 'g9-math-graphs-l1', noteSection: 'what-m-and-c-mean', objectiveId: 'o2'},
  'q9-gr-2': {lessonId: 'g9-math-graphs-l1', noteSection: 'what-m-and-c-mean', objectiveId: 'o3'},
  'q9-gr-3': {lessonId: 'g9-math-graphs-l1', noteSection: 'negative-gradients', objectiveId: 'o3'},
  'q9-let-1': {lessonId: 'g9-eng-letters-l1', noteSection: 'the-layout', objectiveId: 'o1'},
  'q9-let-2': {lessonId: 'g9-eng-letters-l1', noteSection: 'the-three-paragraphs', objectiveId: 'o3'},
  'q9-mat-1': {lessonId: 'g9-sci-matter-l1', noteSection: 'the-three-kinds', objectiveId: 'o2'},
  'q9-mat-2': {lessonId: 'g9-sci-matter-l1', noteSection: 'compound-versus-mixture', objectiveId: 'o3'},
  'q9-mat-3': {lessonId: 'g9-sci-matter-l1', noteSection: 'classifying-quickly', objectiveId: 'o2'},
  'q9-tr-1': {lessonId: 'g9-soc-trade-l1', noteSection: 'both-sides-can-gain', objectiveId: 'o1'},
  'q9-tr-2': {lessonId: 'g9-soc-trade-l1', noteSection: 'what-money-does', objectiveId: 'o2'},
  'q9-dem-1': {lessonId: 'g9-civ-democracy-l1', noteSection: 'why-voting-is-not-enough', objectiveId: 'o2'},
  'q9-dem-2': {lessonId: 'g9-civ-democracy-l1', noteSection: 'the-majority-does-not-get-everything', objectiveId: 'o3'},

  /* ----------------------------------------------------------- GRADE 10 */
  'q-cell-1': {lessonId: 'g10-bio-cells-l1', noteSection: 'the-main-organelles', objectiveId: 'o2'},
  'q-cell-2': {lessonId: 'g10-bio-cells-l1', noteSection: 'plant-cells-are-different', objectiveId: 'o3'},
  'q-cell-3': {lessonId: 'g10-bio-cells-l1', noteSection: 'the-main-organelles', objectiveId: 'o2'},

  /* ----------------------------------------------------------- GRADE 11 */
  'q11-quad-1': {lessonId: 'g11-math-quadratics-l1', noteSection: 'getting-to-standard-form', objectiveId: 'o1'},
  'q11-quad-2': {lessonId: 'g11-math-quadratics-l1', noteSection: 'factorising', objectiveId: 'o2'},
  'q11-quad-3': {lessonId: 'g11-math-quadratics-l1', noteSection: 'from-factors-to-roots', objectiveId: 'o3'},
  'q11-quad-4': {lessonId: 'g11-math-quadratics-l2', noteSection: 'the-discriminant', objectiveId: 'o2'},
  'q11-quad-5': {lessonId: 'g11-math-quadratics-l2', noteSection: 'the-discriminant', objectiveId: 'o2'},
  'q11-trig-1': {lessonId: 'g11-math-trigonometry-l1', noteSection: 'labelling-the-sides', objectiveId: 'o1'},
  'q11-trig-2': {lessonId: 'g11-math-trigonometry-l1', noteSection: 'soh-cah-toa', objectiveId: 'o2'},
  'q11-trig-3': {lessonId: 'g11-math-trigonometry-l1', noteSection: 'worked-example-finding-an-angle', objectiveId: 'o3'},
  'q11-photo-1': {lessonId: 'g11-bio-photosynthesis-l1', noteSection: 'the-equation', objectiveId: 'o1'},
  'q11-photo-2': {lessonId: 'g11-bio-photosynthesis-l1', noteSection: 'the-equation', objectiveId: 'o2'},
  'q11-photo-3': {lessonId: 'g11-bio-photosynthesis-l1', noteSection: 'limiting-factors', objectiveId: 'o3'},
  'q11-photo-4': {lessonId: 'g11-bio-photosynthesis-l1', noteSection: 'limiting-factors', objectiveId: 'o3'},
  'q11-gen-1': {lessonId: 'g11-bio-genetics-l1', noteSection: 'the-vocabulary-matters', objectiveId: 'o1'},
  'q11-gen-2': {lessonId: 'g11-bio-genetics-l1', noteSection: 'the-punnett-square', objectiveId: 'o3'},
  'q11-gen-3': {lessonId: 'g11-bio-genetics-l1', noteSection: 'the-punnett-square', objectiveId: 'o3'},
  'q11-mole-1': {lessonId: 'g11-chem-mole-l1', noteSection: 'why-chemists-need-the-mole', objectiveId: 'o1'},
  'q11-mole-2': {lessonId: 'g11-chem-mole-l1', noteSection: 'molar-mass', objectiveId: 'o3'},
  'q11-mole-3': {lessonId: 'g11-chem-mole-l1', noteSection: 'the-key-equation', objectiveId: 'o2'},
  'q11-mole-4': {lessonId: 'g11-chem-mole-l1', noteSection: 'worked-example', objectiveId: 'o2'},
  'q11-bond-1': {lessonId: 'g11-chem-bonding-l1', noteSection: 'ionic-bonding', objectiveId: 'o2'},
  'q11-bond-2': {lessonId: 'g11-chem-bonding-l1', noteSection: 'ionic-bonding', objectiveId: 'o3'},
  'q11-bond-3': {lessonId: 'g11-chem-bonding-l1', noteSection: 'covalent-bonding', objectiveId: 'o3'},
  'q11-motion-1': {lessonId: 'g11-phys-motion-l1', noteSection: 'first-law-inertia', objectiveId: 'o1'},
  'q11-motion-2': {lessonId: 'g11-phys-motion-l1', noteSection: 'second-law-f-ma', objectiveId: 'o2'},
  'q11-motion-3': {lessonId: 'g11-phys-motion-l1', noteSection: 'third-law-action-and-reaction', objectiveId: 'o3'},
  'q11-elec-1': {lessonId: 'g11-phys-electricity-l1', noteSection: 'ohm-s-law', objectiveId: 'o2'},
  'q11-elec-2': {lessonId: 'g11-phys-electricity-l1', noteSection: 'series-and-parallel', objectiveId: 'o3'},
  'q11-elec-3': {lessonId: 'g11-phys-electricity-l1', noteSection: 'series-and-parallel', objectiveId: 'o3'},
  'q11-essay-1': {lessonId: 'g11-eng-essay-l1', noteSection: 'start-with-a-position', objectiveId: 'o1'},
  'q11-essay-2': {lessonId: 'g11-eng-essay-l1', noteSection: 'body-paragraphs-p-e-e', objectiveId: 'o2'},
  'q11-essay-3': {lessonId: 'g11-eng-essay-l1', noteSection: 'handling-the-other-side', objectiveId: 'o3'},
  'q11-civ-1': {lessonId: 'g11-civics-government-l1', noteSection: 'the-three-branches', objectiveId: 'o2'},
  'q11-civ-2': {lessonId: 'g11-civics-government-l1', noteSection: 'what-a-constitution-does', objectiveId: 'o1'},
  'q11-civ-3': {lessonId: 'g11-civics-government-l1', noteSection: 'checks-and-balances', objectiveId: 'o3'},

  /* ----------------------------------------------------------- GRADE 12 */
  'q12-av-1': {lessonId: 'g12-math-averages-l1', noteSection: 'the-three-averages', objectiveId: 'o1'},
  'q12-av-2': {lessonId: 'g12-math-averages-l1', noteSection: 'when-one-value-distorts-everything', objectiveId: 'o3'},
  'q12-av-3': {lessonId: 'g12-math-averages-l1', noteSection: 'choosing', objectiveId: 'o2'},
  'q12-sum-1': {lessonId: 'g12-eng-summary-l1', noteSection: 'the-four-faults', objectiveId: 'o3'},
  'q12-sum-2': {lessonId: 'g12-eng-summary-l1', noteSection: 'main-idea-or-detail', objectiveId: 'o1'},
  'q12-cir-1': {lessonId: 'g12-bio-circulation-l1', noteSection: 'four-chambers', objectiveId: 'o1'},
  'q12-cir-2': {lessonId: 'g12-bio-circulation-l1', noteSection: 'arteries-veins-capillaries', objectiveId: 'o3'},
  'q12-cir-3': {lessonId: 'g12-bio-circulation-l1', noteSection: 'arteries-veins-capillaries', objectiveId: 'o3'},
  'q12-hc-1': {lessonId: 'g12-chem-hydrocarbons-l1', noteSection: 'alkenes', objectiveId: 'o2'},
  'q12-hc-2': {lessonId: 'g12-chem-hydrocarbons-l1', noteSection: 'alkenes', objectiveId: 'o3'},
  'q12-hc-3': {lessonId: 'g12-chem-hydrocarbons-l1', noteSection: 'why-carbon', objectiveId: 'o1'},
  'q12-wav-1': {lessonId: 'g12-phys-waves-l1', noteSection: 'the-wave-equation', objectiveId: 'o2'},
  'q12-wav-2': {lessonId: 'g12-phys-waves-l1', noteSection: 'the-wave-equation', objectiveId: 'o2'},
  'q12-wav-3': {lessonId: 'g12-phys-waves-l1', noteSection: 'transverse-and-longitudinal', objectiveId: 'o3'},
  'q12-par-1': {lessonId: 'g12-civ-participation-l1', noteSection: 'why-voting-is-a-small-part', objectiveId: 'o2'},
  'q12-par-2': {lessonId: 'g12-civ-participation-l1', noteSection: 'informed-participation', objectiveId: 'o3'},
};
