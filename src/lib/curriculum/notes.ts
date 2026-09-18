import type {Lesson, LessonNote, NoteSection, NoteSourceType, NoteStatus} from '../../types/domain';

/**
 * THE NOTE ENGINE.
 *
 * A Note is the teaching content of a lesson, given a stable identity so that
 * questions can cite the exact part of it that supports their answer.
 *
 * The Note is DERIVED from the lesson rather than duplicated beside it. That is
 * deliberate: two copies of the same teaching text drift, and the moment they
 * drift a citation stops meaning anything. One body of content, one identity,
 * addressable sections.
 */

/**
 * Section key from a heading.
 *
 * Derived from the heading rather than from position, because position changes
 * whenever a section is inserted, which would silently re-point every citation
 * at the wrong content. A heading rename does break the key - and should, since
 * a renamed section is a changed section and its questions need re-checking.
 */
export const sectionKey = (heading: string): string =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 44);

const noteStatusFor = (lesson: Lesson): NoteStatus => {
  switch (lesson.reviewStatus) {
    case 'published':
      return 'published';
    case 'verified':
      return 'verified';
    case 'in-review':
      return 'review';
    default:
      return 'draft';
  }
};

const noteSourceFor = (lesson: Lesson): NoteSourceType => {
  // A LibLearn-authored Note must never present itself as a Ministry document.
  // Only content whose provenance was actually established may claim an
  // outside authority, and nothing in this corpus currently does.
  switch (lesson.provenance) {
    case 'official':
      return 'MINISTRY_OF_EDUCATION';
    case 'verified':
      return 'OTHER_AUTHORITY';
    case 'ai-generated':
      return 'AI_GENERATED';
    default:
      return 'LIBLEARN';
  }
};

/** Stable note id for a lesson version. */
export const noteId = (lessonId: string, version = 1): string => `${lessonId}--note-v${version}`;

/**
 * Promote a lesson's teaching content into an addressable Note.
 *
 * Sections whose heading collides after slugification are disambiguated with a
 * numeric suffix, so keys stay unique within a Note even if two headings
 * normalise to the same string.
 */
export function noteForLesson(lesson: Lesson, version = 1): LessonNote {
  const seen = new Map<string, number>();
  const sections: NoteSection[] = lesson.sections.map((s) => {
    const base = sectionKey(s.heading);
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return {
      key: n === 1 ? base : `${base}-${n}`,
      heading: s.heading,
      body: s.body,
      example: s.example,
    };
  });

  // "What you will learn" and "Summary" are conventional openers and closers in
  // this corpus. Surfacing them as first-class fields lets the Note UI render
  // them in their standard places without the section list losing them.
  const intro = sections.find((s) => /what you will learn|introduction/i.test(s.heading));
  const summary = sections.find((s) => /^summary$/i.test(s.heading));

  return {
    id: noteId(lesson.id, version),
    lessonId: lesson.id,
    title: lesson.title,
    introduction: intro?.body ?? '',
    objectives: lesson.objectives,
    sections,
    keyTerms: lesson.keyTerms ?? [],
    summary: summary?.body ?? '',
    sourceType: noteSourceFor(lesson),
    sourceId: lesson.sourceId,
    curriculumVersionId: lesson.curriculumVersionId,
    version,
    status: noteStatusFor(lesson),
  };
}

/** The section a question cites, or undefined when it cites nothing valid. */
export const noteSectionOf = (note: LessonNote, key?: string): NoteSection | undefined =>
  key ? note.sections.find((s) => s.key === key) : undefined;
