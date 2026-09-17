import {Outlet, useParams} from 'react-router-dom';
import {CurriculumProvider, useCurriculum} from '../context/CurriculumContext';
import {EmptyState, ErrorState, Skeleton} from '../components/ui';
import type {GradeLevel} from '../types/domain';
import {GRADE_LEVELS} from '../types/domain';

/**
 * Loads one grade's curriculum once and hosts every screen beneath it.
 *
 * Every /learn/:grade/... route renders inside this, so the grade is fetched a
 * single time and navigating subject -> unit -> topic -> lesson touches no
 * network at all. On an intermittent connection that is the difference between
 * a student browsing freely and one waiting at every tap.
 *
 * It also puts loading, error and offline handling in ONE place rather than in
 * each screen, which is how those states stay honest and distinct instead of
 * collapsing back into a single "nothing here" message.
 */
function GradeGate() {
  const {status, error, warning, source, reload} = useCurriculum();

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="flex flex-col gap-4" aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading your curriculum…</span>
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-3 tablet:grid-cols-2 desktop:grid-cols-3">
          {Array.from({length: 6}).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <ErrorState
        message="We couldn't load the curriculum"
        hint={error ?? 'Something went wrong reaching the learning database.'}
        onRetry={reload}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* A fallback to bundled content is never silent: a student studying an
          older offline copy deserves to know that is what they are reading. */}
      {warning && source === 'bundled-fallback' && (
        <div
          role="status"
          className="rounded-xl border border-outline-variant bg-tertiary-container/20 px-4 py-3 text-sm text-on-surface-variant">
          {warning}
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default function GradeScope() {
  const {grade} = useParams();
  const g = Number(grade);
  const valid = GRADE_LEVELS.includes(g as GradeLevel);

  if (!valid) {
    return (
      <EmptyState
        title="That grade does not exist"
        body="Choose a grade between 4 and 12 from the Learn page."
      />
    );
  }

  // Keyed by grade so switching grades remounts and refetches cleanly rather
  // than briefly showing the previous grade's subjects.
  return (
    <CurriculumProvider key={g} grade={g as GradeLevel}>
      <GradeGate />
    </CurriculumProvider>
  );
}
