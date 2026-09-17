import type {ContentSource, CurriculumVersion} from '../types/domain';

/**
 * SOURCE REGISTRY
 *
 * Every claim LibLearn makes about Liberian education has to be traceable to a
 * document in this list, and every document carries how far it has actually
 * been checked.
 *
 * READ THIS BEFORE PROMOTING ANYTHING TO `official`:
 *
 * The documents below were located by search. Their existence, titles, issuing
 * body and URLs are recorded. Their CONTENTS have not been read, because the
 * build environment that assembled this registry could not open them - UNESCO
 * IBE, UNESDOC and moe.gov.lr were all unreachable from it.
 *
 * That is why every entry is `located` and not `reviewed`. A document you have
 * only seen the title of cannot tell you what is on a Grade 11 syllabus. The
 * moment someone opens one of these PDFs and reads it, they can move it to
 * `reviewed`, fill in `lastVerifiedAt`, and only THEN may content cite it with
 * `official` provenance.
 *
 * The failure mode this guards against is specific and worth naming: a student
 * in Monrovia revising for WASSCE from a topic list we guessed at, and sitting
 * an examination we misdescribed. An empty subject is recoverable. A confidently
 * wrong syllabus is not.
 */
export const CONTENT_SOURCES: ContentSource[] = [
  {
    id: 'moe-national-curriculum-2011',
    title: 'Republic of Liberia Ministry of Education — National Curriculum',
    organization: 'Ministry of Education, Republic of Liberia',
    sourceType: 'MOE',
    url: 'https://www.ibe.unesco.org/curricula/liberia/',
    documentDate: '2011',
    curriculumVersionId: 'lr-national-2011',
    description:
      'The national curriculum issued by the Liberian Ministry of Education, ' +
      'archived by the UNESCO International Bureau of Education. Subject volumes ' +
      'are published separately (Language Arts, Social Studies, Mathematics and others).',
    verificationStatus: 'located',
    lastVerifiedAt: null,
    notes:
      'Document located, contents NOT read. Host unreachable from the build ' +
      'environment. Must be opened and read before any content cites it as official.',
  },
  {
    id: 'moe-mathematics-10-12',
    title: 'National Curriculum for Grades 10 to 12: Mathematics',
    organization: 'Ministry of Education, Republic of Liberia',
    sourceType: 'MOE',
    url: 'https://unesdoc.unesco.org/ark:/48223/pf0000230916',
    documentDate: '2011',
    curriculumVersionId: 'lr-national-2011',
    description:
      'Senior-secondary mathematics volume of the Liberian national curriculum. ' +
      'This is the single most directly relevant document for LibLearn Grades 10-12 ' +
      'mathematics and should be the first one reviewed.',
    verificationStatus: 'located',
    lastVerifiedAt: null,
    notes:
      'HIGHEST PRIORITY FOR REVIEW. Catalogued in UNESDOC; contents not read. ' +
      'Until read, LibLearn Grade 10-12 mathematics topics are LibLearn content, ' +
      'not a reproduction of this syllabus.',
  },
  {
    id: 'waec-liberia',
    title: 'West African Examinations Council — Liberia',
    organization: 'West African Examinations Council (WAEC)',
    sourceType: 'WAEC',
    description:
      'WAEC administers the WASSCE in Liberia alongside Nigeria, Ghana, Sierra Leone ' +
      'and The Gambia. Subject lists, syllabuses and grading rules are published by WAEC.',
    verificationStatus: 'verification-required',
    lastVerifiedAt: null,
    notes:
      'CAUTION. Most WAEC syllabus material findable online is written for the ' +
      'Nigerian or Ghanaian examination and its subject combinations do NOT ' +
      'automatically apply to Liberia. Liberian requirements must come from a ' +
      'Liberia-specific WAEC publication. No such document has been read here, so ' +
      'LibLearn states no WASSCE subject requirement, grading scale or entry rule.',
  },
  {
    id: 'moe-curriculum-download',
    title: 'Liberia Ministry of Education — Curriculum Download',
    organization: 'Ministry of Education, Republic of Liberia',
    sourceType: 'MOE',
    url: 'https://moe.gov.lr/curriculum-download/',
    curriculumVersionId: 'lr-national-2011',
    description:
      'The Ministry\u2019s own curriculum download page: the primary distribution point ' +
      'for current curriculum documents, and the most authoritative starting point ' +
      'for establishing which curriculum is actually in force.',
    verificationStatus: 'located',
    lastVerifiedAt: null,
    notes:
      'START HERE. Supplied as a priority source. Not reachable from the build ' +
      'environment (egress-blocked), so its contents have not been read. Reading ' +
      'this page is what would let LibLearn state which curriculum version is current.',
  },
  {
    id: 'mcss',
    title: 'Monrovia Consolidated School System',
    organization: 'MCSS',
    sourceType: 'MCSS',
    url: 'https://mcssschools.com/',
    description:
      'The Monrovia public school system. Useful for how the national curriculum is ' +
      'implemented in practice, and for school-specific subject offerings that may ' +
      'differ from the national list.',
    verificationStatus: 'located',
    lastVerifiedAt: null,
    notes:
      'Distinguish school-specific offerings from national curriculum requirements; ' +
      'they are not the same claim. Contents not read.',
  },
  {
    id: 'waec-official',
    title: 'West African Examinations Council',
    organization: 'WAEC',
    sourceType: 'WAEC',
    url: 'https://www.waec.org/',
    description:
      'WAEC\u2019s own site. The authoritative source for WASSCE subjects and rules, ' +
      'as against the many third-party syllabus sites describing other countries.',
    verificationStatus: 'located',
    lastVerifiedAt: null,
    notes:
      'Must be read for LIBERIA specifically. WAEC serves five countries and their ' +
      'subject combinations differ.',
  },
  {
    id: 'wassce-2026-expansion',
    title: 'Reported expansion of WASSCE subjects for 2026 (Liberia)',
    organization: 'Ministry of Education, Republic of Liberia',
    sourceType: 'MOE',
    description:
      'A reported significant expansion of the WASSCE subject list for 2026, and ' +
      'confirmation that Liberia uses LPSCE, LJHSCE, WASSCE and LNAT.',
    verificationStatus: 'verification-required',
    lastVerifiedAt: null,
    notes:
      'REPORTED TO LIBLEARN BY THE PROJECT OWNER, not read from a primary document ' +
      'here. Recorded so it is not lost, and held at verification-required so it ' +
      'cannot drive content until confirmed against a Ministry or WAEC publication. ' +
      'If accurate it is significant: an expanded subject list would change which ' +
      'subjects LibLearn should offer at Grades 10-12, and a stale list would send ' +
      'students to revise the wrong subjects.',
  },
  {
    id: 'liberia-esp-2022',
    title: 'Republic of Liberia Education Sector Plan',
    organization: 'Ministry of Education, Republic of Liberia',
    sourceType: 'Government',
    url: 'https://planipolis.iiep.unesco.org/sites/default/files/ressources/liberia_esp_2022.pdf',
    documentDate: '2022',
    description:
      'National education sector planning document. Useful for education structure ' +
      'and policy context rather than per-subject syllabus detail.',
    verificationStatus: 'located',
    lastVerifiedAt: null,
    notes: 'Located, contents not read.',
  },
];

/**
 * CURRICULUM VERSIONS
 *
 * Liberia's curriculum changes, and a revision does not erase the version a
 * student was taught under. Versions are stored side by side so conflicting
 * information can be shown with context instead of one silently overwriting
 * the other.
 *
 * Note what is absent: there is no `official-current` version. Marking one
 * would assert that we know which curriculum is in force today, and we do not.
 */
export const CURRICULUM_VERSIONS: CurriculumVersion[] = [
  {
    id: 'lr-national-2011',
    name: 'Liberia National Curriculum (2011)',
    description:
      'The 2011 national curriculum issued by the Ministry of Education. Referenced ' +
      'by LibLearn as the identified national curriculum of record; its contents have ' +
      'not yet been reviewed, so no LibLearn content reproduces it.',
    status: 'reference',
    sourceId: 'moe-national-curriculum-2011',
    effectiveDate: '2011',
    notes:
      'Status is `reference`, not `official-current`. Whether this remains the ' +
      'curriculum in force has not been established.',
  },
  {
    id: 'liblearn-v1',
    name: 'LibLearn Teaching Sequence v1',
    description:
      'LibLearn’s own ordering of academically standard topics, written so students ' +
      'have something useful to study while the national curriculum volumes are being ' +
      'reviewed. Subject matter is standard senior-secondary material; the sequencing ' +
      'and selection are LibLearn’s editorial choices.',
    status: 'reference',
    effectiveDate: '2026',
    notes:
      'This is NOT a national curriculum and must never be labelled as one. It exists ' +
      'so the app teaches real material rather than showing empty subjects.',
  },
];

export const sourceById = (id: string): ContentSource | undefined =>
  CONTENT_SOURCES.find((s) => s.id === id);

export const curriculumVersionById = (
  id: string,
): CurriculumVersion | undefined => CURRICULUM_VERSIONS.find((v) => v.id === id);

/** Sources a person still needs to open and read. Drives the docs checklist. */
export const pendingReview = (): ContentSource[] =>
  CONTENT_SOURCES.filter(
    (s) =>
      s.verificationStatus === 'located' ||
      s.verificationStatus === 'verification-required',
  );
