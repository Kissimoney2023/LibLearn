import {Outlet} from 'react-router-dom';
import {CurriculumProvider, useCurriculum} from '../context/CurriculumContext';
import {ErrorState, Skeleton} from '../components/ui';
import {useAuth} from '../context/AuthContext';

/**
 * Curriculum scope for screens reached outside the /learn/:grade hierarchy.
 *
 * A quiz is opened at /quiz/:quizId with no grade in the URL, so it has no
 * grade to load from. It takes the signed-in student's grade instead, which is
 * correct because a student practises at their own grade.
 *
 * Without this, quizzes would still read bundled seed data while the rest of
 * Learn read the database — so a quiz loaded into Postgres would simply not
 * open. Half a migration is worse than none: it fails only for the new content,
 * which is the content nobody has tested.
 */
function Gate() {
  const {status, error, reload} = useCurriculum();

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="flex flex-col gap-4" aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading…</span>
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <ErrorState
        message="We couldn't load this"
        hint={error ?? 'Something went wrong reaching the learning database.'}
        onRetry={reload}
      />
    );
  }

  return <Outlet />;
}

export default function StudentGradeScope() {
  const {profile} = useAuth();
  const grade = profile?.grade ?? null;

  return (
    <CurriculumProvider key={grade ?? 'none'} grade={grade}>
      <Gate />
    </CurriculumProvider>
  );
}
