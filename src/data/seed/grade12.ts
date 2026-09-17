import type {Lesson, Topic, Unit} from '../../types/domain';

/**
 * GRADE 12 TEACHING CONTENT — LibLearn Teaching Sequence v1
 *
 * Provenance `liblearn`. Standard senior-secondary material, NOT a
 * reproduction of the Liberian national curriculum.
 *
 * This grade needs the clearest warning of any in the corpus. Grade 12 is the
 * WASSCE year, so a student here is most likely to treat LibLearn as a guide to
 * what their examination covers. It is not one. LibLearn holds no verified
 * WASSCE syllabus, no subject list and no grading rule, and a reported 2026
 * expansion of WASSCE subjects remains unverified in src/data/sources.ts.
 *
 * So: these topics are standard senior-secondary material worth knowing. They
 * are not a syllabus, not a prediction, and not a substitute for the WAEC
 * syllabus or a teacher. Nothing here carries an examGoal tag for that reason.
 */

const V = 'liblearn-v1';

export const GRADE12_UNITS: Unit[] = [
  {id: 'g12-math-u-stats', subjectId: 'mathematics', grade: 12, order: 1,
   name: 'Statistics', summary: 'Summarising a set of data, and choosing the right average.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g12-eng-u-summary', subjectId: 'english', grade: 12, order: 1,
   name: 'Summary Writing', summary: 'Reducing a passage to its essentials without distorting it.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g12-bio-u-transport', subjectId: 'biology', grade: 12, order: 1,
   name: 'Transport in Humans', summary: 'How blood moves and what it carries.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g12-chem-u-organic', subjectId: 'chemistry', grade: 12, order: 1,
   name: 'Organic Chemistry', summary: 'Carbon compounds, and why carbon is special.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g12-phys-u-waves', subjectId: 'physics', grade: 12, order: 1,
   name: 'Waves', summary: 'How energy travels without matter travelling with it.',
   curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g12-civ-u-participation', subjectId: 'civics', grade: 12, order: 1,
   name: 'Elections and Participation', summary: 'How citizens take part beyond voting day.',
   curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE12_TOPICS: Topic[] = [
  {id: 'g12-math-averages', unitId: 'g12-math-u-stats', subjectId: 'mathematics', grade: 12,
   name: 'Mean, Median and Mode', summary: 'Three averages, and when each one misleads.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g12-eng-summary', unitId: 'g12-eng-u-summary', subjectId: 'english', grade: 12,
   name: 'Summary Writing', summary: 'Finding main ideas and rewriting them in your own words.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g12-bio-circulation', unitId: 'g12-bio-u-transport', subjectId: 'biology', grade: 12,
   name: 'The Circulatory System', summary: 'The heart, the vessels, and the double circuit.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g12-chem-hydrocarbons', unitId: 'g12-chem-u-organic', subjectId: 'chemistry', grade: 12,
   name: 'Hydrocarbons', summary: 'Alkanes and alkenes, and how to tell them apart.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g12-phys-waves', unitId: 'g12-phys-u-waves', subjectId: 'physics', grade: 12,
   name: 'Properties of Waves', summary: 'Wavelength, frequency, amplitude, and the wave equation.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
  {id: 'g12-civ-participation', unitId: 'g12-civ-u-participation', subjectId: 'civics', grade: 12,
   name: 'Citizen Participation', summary: 'Why democracy needs more from citizens than a vote every few years.',
   order: 1, curriculumVersionId: V, provenance: 'liblearn'},
];

export const GRADE12_LESSONS: Lesson[] = [
  {
    id: 'g12-math-averages-l1', topicId: 'g12-math-averages', subjectId: 'mathematics', grade: 12,
    title: 'Mean, Median and Mode', estimatedMinutes: 15, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Calculate the mean, median and mode of a data set.'},
      {id: 'o2', text: 'Choose the most appropriate average for a given set.'},
      {id: 'o3', text: 'Explain how an outlier affects each one.'},
    ],
    keyTerms: [
      {term: 'Mean', definition: 'Add all values and divide by how many there are.'},
      {term: 'Median', definition: 'The middle value when the data is put in order.'},
      {term: 'Mode', definition: 'The value that appears most often.'},
      {term: 'Outlier', definition: 'A value far away from the rest of the data.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: '"The average" is not one thing. There are three, they can give very different answers for the same data, and choosing the wrong one is how statistics mislead.'},
      {heading: 'The three averages',
       body: 'Data: 3, 7, 7, 8, 10\n\nMEAN — add and divide:\n    (3 + 7 + 7 + 8 + 10) ÷ 5 = 35 ÷ 5 = 7\n\nMEDIAN — order the data, take the middle:\n    3, 7, 7, 8, 10 → the middle value is 7\n\n    (With an EVEN count, take the mean of the middle two.)\n\nMODE — the most frequent value:\n    7 appears twice, everything else once → mode = 7\n\nHere all three are 7, because the data is evenly spread. That is exactly why this example teaches nothing about choosing between them — for that you need data with an outlier.'},
      {heading: 'When one value distorts everything',
       body: 'Seven workers earn, per week:\n\n    50, 55, 60, 60, 65, 70, 700\n\nThe last one is the owner. It is an OUTLIER — far from the rest.\n\nMEAN:\n    (50+55+60+60+65+70+700) ÷ 7 = 1060 ÷ 7 ≈ 151\n\nMEDIAN:\n    ordered already; the 4th of 7 values = 60\n\nMODE:\n    60 appears twice = 60\n\nThe mean says 151. But SIX of the seven workers earn less than that, and nobody earns anything near it. As a description of what a typical worker earns, 151 is simply wrong.\n\nThe median, 60, describes the group far better.\n\nThe mean is pulled towards outliers because every value enters the sum. The median only cares about position, so one extreme value moves it barely at all.',
       example: 'Where this matters outside the classroom.\n\nA company advertises "average wage 151 per week". True — that is the mean. Also deeply misleading, because one owner\'s pay lifts a figure that six of seven employees never see.\n\nIf the company reported the MEDIAN, 60, you would know what a typical worker actually earns.\n\nNeither number is a lie. They answer different questions:\n\n    MEAN   — what would everyone get if the total were shared equally?\n    MEDIAN — what does the person in the middle get?\n\nWhen you meet "the average" in a news report, ask which one it is. If it is not stated and the data could have outliers, be suspicious — including of a number that supports something you already believe.'},
      {heading: 'Choosing',
       body: 'MEAN — use when data is fairly even and you want every value to count.\nMEDIAN — use when there are outliers, or with data like income or house prices.\nMODE — use for categories, where mean and median make no sense.\n\nThat last one matters. If you record the most common shoe size sold, the mean shoe size is a number nobody wears. Only the mode answers "which should I stock most of?"'},
      {heading: 'Try it yourself',
       body: 'Data: 12, 15, 15, 18, 20, 100\n\n1. Find the mean, median and mode.\n2. Which best describes a typical value here? Say why.\n3. Remove the 100 and recalculate all three. Which changed most, and why?\n4. A shop records colours of shirts sold. Which average can be used at all?'},
      {heading: 'Summary',
       body: '• Mean = total ÷ count. Median = middle when ordered. Mode = most frequent.\n• Outliers pull the mean strongly and the median hardly at all.\n• Use the median for skewed data such as incomes.\n• Use the mode for categories, where the others are meaningless.\n• When you see "average", ask which one — and why that one was chosen.'},
    ],
  },
  {
    id: 'g12-eng-summary-l1', topicId: 'g12-eng-summary', subjectId: 'english', grade: 12,
    title: 'Summary Writing', estimatedMinutes: 14, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Identify the main ideas in a passage.'},
      {id: 'o2', text: 'Rewrite them concisely in your own words.'},
      {id: 'o3', text: 'Avoid the common faults that lose marks.'},
    ],
    keyTerms: [
      {term: 'Summary', definition: 'A short version keeping only the essential ideas.'},
      {term: 'Paraphrase', definition: 'Saying the same thing in different words.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Summary tests whether you understood a passage, not whether you can copy it. This lesson covers the method and the four faults that cost the most marks.'},
      {heading: 'The method',
       body: 'STEP 1 — Read the whole passage once, without writing. You cannot judge what matters until you know where it goes.\n\nSTEP 2 — Read again, marking main points. Each paragraph usually carries one.\n\nSTEP 3 — Separate MAIN IDEAS from SUPPORTING DETAIL. Examples, statistics and repetitions are detail — they illustrate a point rather than being one.\n\nSTEP 4 — Write the main points in your own words, in your own sentences.\n\nSTEP 5 — Check the word limit and count. Then check you have not changed the author\'s meaning.'},
      {heading: 'Main idea or detail?',
       body: 'A reliable test: if you removed this sentence, would a main point disappear, or would the passage just be less colourful?\n\n    "Deforestation harms communities. In one district, 200 families\n     lost access to firewood within two years."\n\nMain idea: deforestation harms communities.\nDetail: the 200 families. It illustrates the harm; it is not a separate point.\n\nIn a summary, keep the first and drop the second. Specific numbers and named examples are almost always detail.',
       example: 'A passage reduced.\n\nOriginal (about 60 words):\n\n    "Many students struggle to study at home in the evening. Some\n     have no electric light, so reading becomes impossible after\n     dark. Others share a small room with several relatives and\n     cannot concentrate. A few must work in the evening to help\n     their families. These difficulties mean ability alone does not\n     decide results."\n\nMain points:\n    1. Students find evening study hard at home\n    2. Reasons: no light, no quiet space, evening work\n    3. Therefore results do not depend on ability alone\n\nSummary (about 25 words):\n\n    "Evening study at home is difficult for many students, who may\n     lack lighting, quiet space or free time. Results therefore\n     reflect circumstances as well as ability."\n\nNotice: three reasons compressed into one list, and "ability alone does not decide results" reworded rather than copied.'},
      {heading: 'The four faults',
       body: '**1. Copying whole sentences.** The commonest and most costly. If a phrase is lifted unchanged, you have not shown understanding. Technical terms with no synonym are the only exception.\n\n**2. Adding your own opinion.** A summary reports what the author said. "I think this is unfair" does not belong, however reasonable.\n\n**3. Keeping examples.** They are the first thing to cut.\n\n**4. Exceeding the word limit.** If a limit is given, it is part of the task. Going over loses marks even when the content is right.'},
      {heading: 'Try it yourself',
       body: 'Summarise in no more than 30 words:\n\n    "Rivers provide water for drinking and farming, and fish for\n     food. When factories release waste into them, the water can\n     become unsafe. Fish die or become dangerous to eat, and\n     families who depend on the river lose both a food source and\n     an income."\n\nThen check: any copied phrases? Any opinion? Any examples left? Within 30 words?'},
      {heading: 'Summary',
       body: '• Read once whole, then again marking main points.\n• Keep main ideas; cut examples, statistics and repetition.\n• Use your own words — copying shows nothing.\n• No opinions; report only what the author said.\n• Respect the word limit; it is part of the task.'},
    ],
  },
  {
    id: 'g12-bio-circulation-l1', topicId: 'g12-bio-circulation', subjectId: 'biology', grade: 12,
    title: 'The Heart and Blood Circulation', estimatedMinutes: 15, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Describe the structure of the heart.'},
      {id: 'o2', text: 'Trace the path of blood through the double circulation.'},
      {id: 'o3', text: 'Explain how arteries, veins and capillaries differ.'},
    ],
    keyTerms: [
      {term: 'Atrium', definition: 'An upper chamber of the heart; receives blood.'},
      {term: 'Ventricle', definition: 'A lower chamber; pumps blood out.'},
      {term: 'Artery', definition: 'A vessel carrying blood AWAY from the heart.'},
      {term: 'Vein', definition: 'A vessel carrying blood TO the heart.'},
      {term: 'Capillary', definition: 'A microscopic vessel where exchange with cells happens.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Blood must reach every cell, deliver oxygen, collect waste, and return. This lesson covers the pump, the pipes, and the route.'},
      {heading: 'Four chambers',
       body: 'The heart has four chambers:\n\n    RIGHT ATRIUM   | LEFT ATRIUM     ← upper, receive blood\n    RIGHT VENTRICLE| LEFT VENTRICLE  ← lower, pump blood out\n\nAtria receive; ventricles pump. Valves between them stop blood flowing backwards.\n\nThe LEFT VENTRICLE has a much thicker muscular wall than the right. The reason is the distance each must cover: the right ventricle pumps only to the lungs, next door. The left pumps to the entire rest of the body, so it must generate far more pressure.\n\nThat asymmetry is not a flaw. It is the structure matching the job — and it is a favourite examination question.'},
      {heading: 'Arteries, veins, capillaries',
       body: 'ARTERIES carry blood AWAY from the heart. Thick muscular walls, narrow lumen, because they take blood at high pressure.\n\nVEINS carry blood TO the heart. Thinner walls, wider lumen, and VALVES — pressure is low by then, so valves stop backflow.\n\nCAPILLARIES are one cell thick. This is where the actual exchange happens: oxygen and nutrients out to cells, carbon dioxide and waste in.\n\nThe memory aid: **A**rteries **A**way. Everything else follows.\n\nBut notice what the definition does NOT mention: oxygen. Arteries are defined by DIRECTION, not by what they carry — which matters in the next section.'},
      {heading: 'Double circulation',
       body: 'Human blood passes through the heart TWICE per complete circuit. Two loops:\n\n**PULMONARY (heart → lungs → heart)**\n\n    Right atrium → right ventricle → pulmonary artery → lungs\n    (picks up oxygen, drops carbon dioxide)\n    → pulmonary vein → left atrium\n\n**SYSTEMIC (heart → body → heart)**\n\n    Left atrium → left ventricle → aorta → body\n    (delivers oxygen, collects carbon dioxide)\n    → vena cava → right atrium\n\nWhy two loops? Blood loses pressure passing through the lungs. Returning it to the heart lets it be re-pressurised before the long journey round the body. A single circuit would deliver blood to your feet far too slowly.',
       example: 'The exception that catches everyone.\n\n"Arteries carry oxygenated blood." This is usually true and is NOT the definition — and there are two exceptions.\n\nThe PULMONARY ARTERY carries DEOXYGENATED blood, from the heart to the lungs. It is an artery because it leads away from the heart.\n\nThe PULMONARY VEIN carries OXYGENATED blood, from the lungs back to the heart. It is a vein because it leads toward the heart.\n\nSo the rule is direction, never oxygen:\n\n    Artery = away from the heart\n    Vein   = toward the heart\n\nIf you memorise "arteries carry oxygen", you will get the pulmonary vessels wrong every time — and they are exactly what gets asked.'},
      {heading: 'Try it yourself',
       body: '1. Name the four chambers and say which two pump.\n2. Why is the left ventricle wall thicker than the right?\n3. Trace a drop of blood from the right atrium back to the right atrium, naming every vessel and chamber.\n4. Why does the pulmonary artery carry deoxygenated blood though arteries "usually" carry oxygenated blood?\n5. Why must capillaries be one cell thick?'},
      {heading: 'Summary',
       body: '• Four chambers: atria receive, ventricles pump.\n• The left ventricle is thicker because it supplies the whole body.\n• Arteries away, veins toward — defined by DIRECTION, not oxygen.\n• Capillaries are one cell thick, for exchange.\n• Double circulation: pulmonary and systemic, re-pressurised between.\n• The pulmonary artery and vein are the exceptions to remember.'},
    ],
  },
  {
    id: 'g12-chem-hydrocarbons-l1', topicId: 'g12-chem-hydrocarbons', subjectId: 'chemistry', grade: 12,
    title: 'Hydrocarbons: Alkanes and Alkenes', estimatedMinutes: 15, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Explain why carbon forms so many compounds.'},
      {id: 'o2', text: 'Distinguish alkanes from alkenes by structure and formula.'},
      {id: 'o3', text: 'Describe a test that tells them apart.'},
    ],
    keyTerms: [
      {term: 'Hydrocarbon', definition: 'A compound of hydrogen and carbon only.'},
      {term: 'Alkane', definition: 'A hydrocarbon with only single C–C bonds. Saturated.'},
      {term: 'Alkene', definition: 'A hydrocarbon with at least one C=C double bond. Unsaturated.'},
      {term: 'Saturated', definition: 'Holding as many hydrogen atoms as possible.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Organic chemistry is the chemistry of carbon compounds, and there are millions of them. This lesson explains why carbon is unusual, and covers the two simplest families.'},
      {heading: 'Why carbon',
       body: 'A carbon atom forms FOUR bonds, and — unusually — it bonds strongly to other carbon atoms.\n\nThat means carbon can build chains, branches and rings of almost any length, with hydrogen filling the remaining bonds.\n\nNo other element does this to nearly the same extent, which is why there are millions of carbon compounds and comparatively few of most other elements.'},
      {heading: 'Alkanes',
       body: 'ALKANES have only SINGLE bonds between carbons. Every carbon holds as many hydrogens as it can, so they are SATURATED.\n\nGeneral formula: **CₙH₂ₙ₊₂**\n\n    methane  CH₄     (n=1: 2×1+2 = 4) ✓\n    ethane   C₂H₆    (n=2: 2×2+2 = 6) ✓\n    propane  C₃H₈    (n=3: 2×3+2 = 8) ✓\n    butane   C₄H₁₀   (n=4: 2×4+2 = 10) ✓\n\nNames end in **-ane**. They are fairly unreactive, because a single C–C bond is strong and there is no room to add anything.'},
      {heading: 'Alkenes',
       body: 'ALKENES have at least one DOUBLE bond between carbons (C=C). The double bond uses bonds that would otherwise hold hydrogen, so alkenes carry FEWER hydrogens — they are UNSATURATED.\n\nGeneral formula: **CₙH₂ₙ**\n\n    ethene   C₂H₄    (n=2: 2×2 = 4) ✓\n    propene  C₃H₆    (n=3: 2×3 = 6) ✓\n    butene   C₄H₈    (n=4: 2×4 = 8) ✓\n\nNames end in **-ene**. Compare directly:\n\n    ethane C₂H₆  vs  ethene C₂H₄\n\nSame two carbons, two fewer hydrogens, because one pair of bonds went into the C=C.\n\nAlkenes are MORE reactive than alkanes. The double bond can open up and let other atoms add across it — which is exactly what the test below detects.',
       example: 'The bromine water test.\n\nBromine water is orange-brown. Shake a hydrocarbon with it:\n\n    ALKANE  → stays orange-brown. No reaction.\n    ALKENE  → turns COLOURLESS, quickly.\n\nWhy? The alkene\'s double bond opens and bromine adds across it, forming a colourless product. The alkane has no double bond to open, so nothing happens.\n\nThis is a genuinely useful test: a clear, immediate, visible difference from one property — unsaturation.\n\nExam wording matters here. "Decolourised" is the correct term, not "turns white" or "goes clear". The solution becomes colourless.'},
      {heading: 'Try it yourself',
       body: '1. Why can carbon form so many compounds?\n2. Give the molecular formula of the alkane with 5 carbons, using CₙH₂ₙ₊₂.\n3. C₃H₆ — alkane or alkene? How do you know from the formula alone?\n4. Describe what you would see when bromine water is shaken with ethene, and with ethane.\n5. Explain why an alkene is called unsaturated.'},
      {heading: 'Summary',
       body: '• Carbon forms four bonds and bonds to itself, so it builds chains and rings.\n• Alkanes: single bonds only, saturated, CₙH₂ₙ₊₂, names end -ane.\n• Alkenes: at least one C=C, unsaturated, CₙH₂ₙ, names end -ene.\n• Alkenes are more reactive; the double bond can open and add atoms.\n• Bromine water is decolourised by an alkene, unchanged by an alkane.'},
    ],
  },
  {
    id: 'g12-phys-waves-l1', topicId: 'g12-phys-waves', subjectId: 'physics', grade: 12,
    title: 'Properties of Waves', estimatedMinutes: 15, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Define wavelength, frequency, amplitude and period.'},
      {id: 'o2', text: 'Use the wave equation v = fλ.'},
      {id: 'o3', text: 'Distinguish transverse from longitudinal waves.'},
    ],
    keyTerms: [
      {term: 'Wavelength (λ)', definition: 'The distance between two matching points on consecutive waves, in metres.'},
      {term: 'Frequency (f)', definition: 'How many complete waves pass a point per second, in hertz.'},
      {term: 'Amplitude', definition: 'The maximum displacement from the rest position.'},
      {term: 'Period (T)', definition: 'The time for one complete wave to pass. T = 1/f.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'A wave carries ENERGY from place to place without carrying matter with it. That distinction is the foundation of the whole topic.'},
      {heading: 'Energy moves; matter does not',
       body: 'Drop a stone in water. Ripples spread outward. Put a leaf on the surface and watch it: the leaf bobs UP AND DOWN. It does not travel outward with the ripple.\n\nThe wave moved across the pond. The water did not. Each bit of water moved up and down and stayed roughly where it was, passing the energy to its neighbour.\n\nThis is what a wave is: **a travelling disturbance that carries energy while the medium stays put.**\n\nA crowd doing a "wave" in a stadium is the same idea — the wave travels round the stands while every person stays in their seat.'},
      {heading: 'Measuring a wave',
       body: 'WAVELENGTH (λ) — distance from one crest to the next, in metres.\n\nFREQUENCY (f) — complete waves passing a point each second, in hertz (Hz). 50 Hz means 50 waves per second.\n\nAMPLITUDE — maximum displacement from the rest position. Bigger amplitude means more energy: a louder sound, a brighter light.\n\nPERIOD (T) — time for one wave to pass, in seconds.\n\nFrequency and period are inverses:\n\n    T = 1/f     and     f = 1/T\n\nIf 5 waves pass each second (f = 5 Hz), each takes 1/5 = 0.2 s.'},
      {heading: 'The wave equation',
       body: '    **v = f λ**\n\n    v = speed (m/s), f = frequency (Hz), λ = wavelength (m)\n\nIt makes sense from the units: if 5 waves pass per second and each is 2 m long, then 10 m of wave passes per second.\n\nRearranged:\n\n    f = v / λ        λ = v / f\n\nOne consequence worth holding onto: in a given medium, the SPEED is fixed. So frequency and wavelength are inversely related — a higher frequency must mean a shorter wavelength, and vice versa.',
       example: 'A worked calculation.\n\nA sound wave has frequency 170 Hz and travels at 340 m/s. Find its wavelength.\n\n    v = f λ\n    340 = 170 × λ\n    λ = 340 ÷ 170\n    λ = 2 m\n\nNow a second question on the same sound: what is its period?\n\n    T = 1/f = 1/170 ≈ 0.0059 s\n\nAnd a check on understanding: if the frequency doubled to 340 Hz, what happens to the wavelength?\n\nSpeed is unchanged — it depends on the medium, not the source. So:\n\n    λ = 340 ÷ 340 = 1 m\n\nDouble the frequency, halve the wavelength. A higher-pitched sound has a shorter wavelength but travels at the same speed.'},
      {heading: 'Transverse and longitudinal',
       body: 'TRANSVERSE — the medium moves at RIGHT ANGLES to the wave direction.\n\n    Water ripples, light, waves on a rope.\n    The leaf moves up and down; the wave goes sideways.\n\nLONGITUDINAL — the medium moves ALONG the same line as the wave.\n\n    Sound. Air is squeezed and stretched in the direction of travel,\n    making compressions and rarefactions.\n\nThis is why sound needs a medium and light does not. Sound is a squeezing of something; with no air there is nothing to squeeze, so sound cannot cross a vacuum. Light can.'},
      {heading: 'Try it yourself',
       body: '1. A wave has f = 25 Hz and λ = 4 m. Find its speed.\n2. Light travels at 3 × 10⁸ m/s. Find the frequency of light with λ = 6 × 10⁻⁷ m.\n3. A wave has a period of 0.02 s. What is its frequency?\n4. If wavelength doubles and speed is unchanged, what happens to frequency?\n5. Explain why sound cannot travel through a vacuum but light can.'},
      {heading: 'Summary',
       body: '• A wave carries energy; the medium oscillates but does not travel.\n• λ = wavelength (m), f = frequency (Hz), T = period (s), T = 1/f.\n• Amplitude relates to energy — louder, brighter.\n• v = f λ. At fixed speed, frequency and wavelength are inversely related.\n• Transverse: motion at right angles. Longitudinal: motion along the line.\n• Sound needs a medium; light does not.'},
    ],
  },
  {
    id: 'g12-civ-participation-l1', topicId: 'g12-civ-participation', subjectId: 'civics', grade: 12,
    title: 'Citizen Participation Beyond Voting', estimatedMinutes: 13, order: 1,
    provenance: 'liblearn', curriculumVersionId: V, reviewStatus: 'published',
    objectives: [
      {id: 'o1', text: 'Describe ways citizens participate besides voting.'},
      {id: 'o2', text: 'Explain why participation between elections matters.'},
      {id: 'o3', text: 'Explain how informed participation differs from mere opinion.'},
    ],
    keyTerms: [
      {term: 'Participation', definition: 'Taking an active part in public life.'},
      {term: 'Civil society', definition: 'Groups outside government through which citizens organise.'},
      {term: 'Scrutiny', definition: 'Examining what those in power are doing.'},
    ],
    sections: [
      {heading: 'What you will learn',
       body: 'Most students meet citizenship as "vote when you are old enough". Voting is the minimum, not the whole of it. This lesson is about the rest.\n\nScope note: general principles of participation, shared across democracies — not a description of Liberian institutions or electoral procedures. For those, use the Constitution or your teacher’s materials.'},
      {heading: 'Why voting is a small part',
       body: 'Elections happen every few years. Government happens every day.\n\nBetween elections, decisions are taken continuously — budgets set, contracts awarded, services run well or badly. If citizens only engage on polling day, all of that goes unexamined for years at a time.\n\nA vote is a judgement on the past and a choice about the future. It is not a mechanism for influencing what happens in between.'},
      {heading: 'Ways to participate',
       body: 'ATTENDING PUBLIC MEETINGS — where local decisions are explained and can be questioned.\n\nJOINING ASSOCIATIONS — community groups, cooperatives, unions, school committees. Organised voices are heard where individual ones are not.\n\nCONTACTING REPRESENTATIVES — writing to the person elected for your area about a specific problem.\n\nSCRUTINY — following what public bodies do and asking about it. Journalists do this professionally; citizens can too.\n\nVOLUNTEERING — tutoring, clean-ups, helping run local services.\n\nPEACEFUL ASSEMBLY — gathering lawfully to express a shared view.\n\nSERVING — standing for a school, community or local body.'},
      {heading: 'Informed participation',
       body: 'Participation is only useful if it rests on accurate information. A strongly held view built on a rumour does not improve a decision — it degrades it, and it spreads.\n\nBefore acting on a claim about public affairs, it is worth asking:\n\n    Where did this come from?\n    Is there a primary source — a document, a record, an official statement?\n    Who benefits if I believe it?\n    Have I checked, or does it simply match what I already thought?\n\nThat last question is the hard one. Claims that flatter what we already believe get far less scrutiny than claims that challenge it, and that asymmetry is exactly what misinformation exploits.',
       example: 'Two responses to the same problem.\n\nA community\'s water pump has been broken for months.\n\nRESPONSE A: Individuals complain to each other. Everyone agrees it is bad. A rumour spreads about who is to blame. Nothing reaches anyone who could act, and the rumour outlives the repair.\n\nRESPONSE B: Residents find out which body is responsible. They check what was budgeted and what was spent. They write jointly, with dates and facts, and request a response. They attend the next public meeting and ask directly. If nothing happens, they keep a record and raise it publicly.\n\nBoth groups are equally angry. Only one is participating.\n\nThe difference is not effort or sincerity — it is whether the energy is directed at someone who can act, and backed by something checkable.'},
      {heading: 'Try it yourself',
       body: '1. Name four ways to participate other than voting.\n2. Why is participation between elections important?\n3. A message circulates claiming an official stole funds. Before sharing it, what would you check?\n4. Choose a real problem in your community. Write three steps a group could take, naming who they would approach.'},
      {heading: 'Summary',
       body: '• Voting is the minimum of citizenship, not the whole.\n• Government acts daily; elections are years apart.\n• Participation includes meetings, associations, contacting representatives, scrutiny, volunteering, assembly and serving.\n• Informed participation needs checked facts, not just strong feeling.\n• Claims that match what you already believe deserve MORE scrutiny, not less.'},
    ],
  },
];
