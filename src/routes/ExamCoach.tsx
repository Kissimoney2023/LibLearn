import {Link} from 'react-router-dom';
import {Card, ProgressBar, SectionHeading} from '../components/ui';
import {EXAMS} from '../data/catalog';
import {QUESTIONS} from '../data/seed/questions';
import {useAuth} from '../context/AuthContext';
import {useStudentData} from '../context/StudentDataContext';

export default function ExamCoach() {
  const {profile} = useAuth();
  const {exams, readiness} = useStudentData();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-bold">Exam Coach</h1>
        <p className="text-sm text-on-surface-variant">
          Practice sets with worked explanations for every question.
        </p>
      </header>

      <Card>
        <SectionHeading>LibLearn Exam Readiness</SectionHeading>
        <ProgressBar value={readiness} label="LibLearn exam readiness" />
        <p className="mt-2 text-sm text-on-surface-variant">
          An internal LibLearn learning metric from your lessons and practice scores.
          It is not an official prediction of any examination result.
        </p>
      </Card>

      <div className="grid gap-3 tablet:grid-cols-2">
        {EXAMS.filter((e) => e.id !== 'general').map((exam) => {
          const available = QUESTIONS.filter((q) => q.examGoal === exam.id).length;
          const attempts = exams.filter((a) => a.exam === exam.id && a.submittedAt).length;
          const isGoal = profile?.examGoal === exam.id;
          return (
            <Link key={exam.id} to={`/exam-coach/${exam.id}`}>
              <Card className={isGoal ? 'border-primary' : ''}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <h2 className="font-display text-lg font-semibold">{exam.name}</h2>
                  <span className="inline-flex h-7 items-center rounded-full bg-tertiary-surface px-3 text-xs font-medium text-on-tertiary-surface">
                    {exam.levelLabel}
                  </span>
                </div>
                <p className="mb-3 text-sm text-on-surface-variant">{exam.description}</p>
                <p className="text-xs text-on-surface-variant">
                  {available === 0
                    ? 'No practice questions added yet'
                    : `${available} practice question${available === 1 ? '' : 's'} available`}
                  {attempts > 0 && ` · ${attempts} attempt${attempts === 1 ? '' : 's'}`}
                </p>
                {isGoal && (
                  <p className="mt-2 text-xs font-medium text-on-primary-surface">Your goal</p>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
