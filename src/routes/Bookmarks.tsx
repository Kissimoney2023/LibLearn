import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {Bookmark as BookmarkIcon} from 'lucide-react';
import {Card, EmptyState, SectionHeading} from '../components/ui';
import {useStudentData} from '../context/StudentDataContext';
import {SUBJECTS} from '../data/catalog';
import type {BookmarkType} from '../types/domain';

/**
 * Saved lessons, topics and questions.
 *
 * Filters are rendered only when they would actually narrow something — a
 * subject filter offering one subject is furniture, not a control. Each filter
 * lists only values present in the student's own bookmarks, so no option can
 * lead to an empty result.
 */
export default function Bookmarks() {
  const {bookmarks, toggleBookmark} = useStudentData();
  const [subject, setSubject] = useState<string>('all');
  const [type, setType] = useState<BookmarkType | 'all'>('all');

  const subjectsPresent = useMemo(
    () => [...new Set(bookmarks.map((b) => b.subjectId).filter(Boolean))] as string[],
    [bookmarks],
  );
  const typesPresent = useMemo(
    () => [...new Set(bookmarks.map((b) => b.contentType))],
    [bookmarks],
  );

  const filtered = bookmarks.filter(
    (b) =>
      (subject === 'all' || b.subjectId === subject) &&
      (type === 'all' || b.contentType === type),
  );

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="font-display text-2xl font-bold">My Bookmarks</h1>
        <EmptyState
          title="No bookmarks yet"
          body="Tap the bookmark icon on any lesson to save it here for later."
        />
      </div>
    );
  }

  const hrefFor = (b: (typeof bookmarks)[number]) => {
    if (b.contentType === 'lesson') {
      return b.grade && b.subjectId
        ? `/learn/${b.grade}/${b.subjectId}?lesson=${b.contentId}`
        : '/learn';
    }
    if (b.contentType === 'topic' && b.grade && b.subjectId) {
      return `/learn/${b.grade}/${b.subjectId}/${b.contentId}`;
    }
    return '/learn';
  };

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-bold">My Bookmarks</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          {bookmarks.length} saved item{bookmarks.length === 1 ? '' : 's'}
        </p>
      </header>

      {(subjectsPresent.length > 1 || typesPresent.length > 1) && (
        <div className="flex flex-wrap gap-4">
          {subjectsPresent.length > 1 && (
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium">Subject</span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="min-h-12 rounded-lg border border-outline bg-surface px-3">
                <option value="all">All subjects</option>
                {subjectsPresent.map((id) => (
                  <option key={id} value={id}>
                    {SUBJECTS.find((s) => s.id === id)?.name ?? id}
                  </option>
                ))}
              </select>
            </label>
          )}
          {typesPresent.length > 1 && (
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium">Type</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as BookmarkType | 'all')}
                className="min-h-12 rounded-lg border border-outline bg-surface px-3">
                <option value="all">All types</option>
                {typesPresent.map((t) => (
                  <option key={t} value={t}>
                    {t[0].toUpperCase() + t.slice(1)}s
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      )}

      <SectionHeading>
        {filtered.length} result{filtered.length === 1 ? '' : 's'}
      </SectionHeading>

      {filtered.length === 0 ? (
        <EmptyState
          title="Nothing matches those filters"
          body="Try a different subject or content type."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((b) => (
            <Card key={b.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link to={hrefFor(b)} className="font-semibold underline-offset-4 hover:underline">
                    {b.title || b.contentId}
                  </Link>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    {[
                      b.subjectId
                        ? (SUBJECTS.find((s) => s.id === b.subjectId)?.name ?? b.subjectId)
                        : null,
                      b.grade ? `Grade ${b.grade}` : null,
                      b.contentType[0].toUpperCase() + b.contentType.slice(1),
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    void toggleBookmark({
                      contentType: b.contentType,
                      contentId: b.contentId,
                      title: b.title,
                      subjectId: b.subjectId,
                      grade: b.grade,
                    })
                  }
                  aria-label={`Remove bookmark: ${b.title || b.contentId}`}
                  className="flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-lg border border-outline text-on-surface-variant">
                  <BookmarkIcon size={20} aria-hidden="true" fill="currentColor" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
