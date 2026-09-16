import {Card, EmptyState, ProgressBar, SectionHeading} from '../components/ui';
import {useStudentData} from '../context/StudentDataContext';
import {ACHIEVEMENTS, subjectById} from '../data/catalog';
import {topicById} from '../data/seed/curriculum';

export default function Progress() {
  const {summary, achievements, quizzes, exams, readiness} = useStudentData();

  const overall =
    summary.lessonsTotal === 0 ? 0 : (summary.lessonsCompleted / summary.lessonsTotal) * 100;
  const hasActivity = summary.lessonsCompleted > 0 || quizzes.length > 0 || exams.length > 0;

  if (!hasActivity) {
    return (
      <EmptyState
        title="No progress yet"
        body="Start your first lesson and your progress will appear here."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-bold">Your progress</h1>
        <p className="text-sm text-on-surface-variant">
          Everything here is calculated from what you have actually done.
        </p>
      </header>

      <Card>
        <div className="mb-4 grid grid-cols-2 gap-4 tablet:grid-cols-4">
          {[
            ['Lessons', `${summary.lessonsCompleted}/${summary.lessonsTotal}`],
            ['Quizzes', String(summary.quizzesTaken)],
            ['Exams', String(summary.examAttempts)],
            ['Streak', `${summary.streakDays} day${summary.streakDays === 1 ? '' : 's'}`],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">{label}</p>
              <p className="font-display text-xl font-bold tabular-nums">{value}</p>
            </div>
          ))}
        </div>
        <ProgressBar value={overall} label="Overall lesson progress" />
      </Card>

      <section>
        <SectionHeading>By subject</SectionHeading>
        <div className="grid gap-3 tablet:grid-cols-2">
          {summary.bySubject.map((s) => (
            <Card key={s.subjectId}>
              <h3 className="mb-3 font-semibold">{subjectById(s.subjectId)?.name ?? s.subjectId}</h3>
              <ProgressBar
                value={s.lessonsTotal === 0 ? 0 : (s.lessonsCompleted / s.lessonsTotal) * 100}
                label={`${s.subjectId} progress`}
              />
              <p className="mt-2 text-xs text-on-surface-variant">
                {s.lessonsCompleted} of {s.lessonsTotal} lessons
                {s.accuracy !== null && ` · ${s.accuracy}% quiz accuracy`}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {(summary.weakTopics.length > 0 || summary.strongTopics.length > 0) && (
        <section>
          <SectionHeading>What to work on</SectionHeading>
          <div className="grid gap-3 tablet:grid-cols-2">
            {summary.strongTopics.length > 0 && (
              <Card rail="complete">
                <h3 className="mb-2 font-semibold">Strong</h3>
                <ul className="flex flex-col gap-1 text-sm text-on-surface-variant">
                  {summary.strongTopics.map((t) => (
                    <li key={t}>{topicById(t)?.name ?? t}</li>
                  ))}
                </ul>
              </Card>
            )}
            {summary.weakTopics.length > 0 && (
              <Card rail="progress">
                <h3 className="mb-2 font-semibold">Needs work</h3>
                <ul className="flex flex-col gap-1 text-sm text-on-surface-variant">
                  {summary.weakTopics.map((t) => (
                    <li key={t}>{topicById(t)?.name ?? t}</li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </section>
      )}

      <Card>
        <SectionHeading>LibLearn Exam Readiness</SectionHeading>
        <ProgressBar value={readiness} label="LibLearn exam readiness" />
        <p className="mt-2 text-sm text-on-surface-variant">
          LibLearn&rsquo;s own internal learning metric — not an official prediction.
        </p>
      </Card>

      <section>
        <SectionHeading>Achievements</SectionHeading>
        <div className="grid gap-3 tablet:grid-cols-2 desktop:grid-cols-3">
          {ACHIEVEMENTS.map((a) => {
            const earned = achievements.some((e) => e.achievementId === a.id);
            return (
              <div
                key={a.id}
                className={`rounded-lg border p-4 ${
                  earned
                    ? 'border-primary bg-primary-surface'
                    : 'border-outline-variant bg-surface-lowest opacity-60'
                }`}>
                <p className="font-semibold">{a.name}</p>
                <p className="text-sm text-on-surface-variant">{a.description}</p>
                <p className="mt-1.5 text-xs font-medium">
                  {earned ? 'Earned' : 'Not yet earned'}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
