import {useEffect, useState} from 'react';
import {Outlet, useMatch} from 'react-router-dom';
import {CurriculumProvider, useCurriculum} from '../context/CurriculumContext';
import {ErrorState, Skeleton} from '../components/ui';
import {useAuth} from '../context/AuthContext';
import {bundledQuizGrade, loadQuizGrade} from '../lib/curriculum';
import type {GradeLevel} from '../types/domain';

/**
 * Curriculum scope for a quiz opened at /quiz/:quizId.
 *
 * A quiz URL carries no grade, and this used to fall back to the signed-in
 * student's grade. That looked reasonable and broke every quiz outside it:
 * Learn lets a student browse ANY grade, so a Grade 12 student who opened a
 * Grade 4 quiz loaded the Grade 12 curriculum, the quiz was not in it, and the
 * screen said "Quiz not found" about a quiz that plainly exists.
 *
 * It scopes to the QUIZ's grade instead. The bundle answers synchronously, so
 * the common case costs no round trip and the first paint is already correct;
 * only a quiz the bundle does not know - content loaded into the database after
 * the app was built - needs the lookup.
 *
 * The student's own grade remains the fallback for an unknown id, so a stale or
 * mistyped link still lands somewhere sane rather than on a blank screen.
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

export default function QuizScope() {
  const {profile} = useAuth();
  // This is a layout route with no path of its own, so the quiz id is read
  // from the matched URL rather than from useParams.
  const quizId = useMatch('/quiz/:quizId')?.params.quizId ?? null;
  const studentGrade = profile?.grade ?? null;

  const [grade, setGrade] = useState<GradeLevel | null>(
    () => (quizId ? bundledQuizGrade(quizId) : null) ?? studentGrade,
  );

  useEffect(() => {
    if (!quizId) return;

    const bundled = bundledQuizGrade(quizId);
    if (bundled !== null) {
      setGrade(bundled);
      return;
    }

    let live = true;
    void loadQuizGrade(quizId).then((g) => {
      // A null answer means the quiz is unknown everywhere. Keep the student's
      // own grade loaded so QuizRunner can say so on a working screen.
      if (live) setGrade(g ?? studentGrade);
    });
    return () => {
      live = false;
    };
  }, [quizId, studentGrade]);

  return (
    <CurriculumProvider key={grade ?? 'none'} grade={grade}>
      <Gate />
    </CurriculumProvider>
  );
}
