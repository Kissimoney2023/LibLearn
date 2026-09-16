import {Link} from 'react-router-dom';
import {BookOpen, GraduationCap, MessageCircleQuestion, Quote} from 'lucide-react';
import {useAuth} from '../context/AuthContext';
import {useStudentData} from '../context/StudentDataContext';
import {Button, ButtonLink, Card, EmptyState, ProgressBar, SectionHeading, Skeleton, SubjectChip} from '../components/ui';
import {subjectById} from '../data/catalog';
import {track} from '../lib/analytics';

const QUICK = [
  {to: '/ai-tutor', label: 'Ask AI', icon: MessageCircleQuestion},
  {to: '/learn', label: 'Browse Lessons', icon: BookOpen},
  {to: '/exam-coach', label: 'Exam Coach', icon: GraduationCap},
];

export default function Dashboard() {
  const {profile} = useAuth();
  const {loading, summary, recommendations, readiness, quizzes} = useStudentData();

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  const first = recommendations[0];
  const overall =
    summary.lessonsTotal === 0
      ? 0
      : (summary.lessonsCompleted / summary.lessonsTotal) * 100;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-display text-2xl font-bold">
          Hello, {profile?.name?.split(' ')[0] ?? 'there'}
        </h1>
        <p className="text-sm text-on-surface-variant">
          Grade {profile?.grade ?? '—'} ·{' '}
          {summary.streakDays > 0
            ? `${summary.streakDays}-day streak`
            : 'Start a lesson to begin your streak'}
        </p>
      </header>

      <Card>
        <SectionHeading>Your progress</SectionHeading>
        <ProgressBar value={overall} label="Lessons completed" />
        <p className="mt-2 text-sm text-on-surface-variant">
          {summary.lessonsCompleted} of {summary.lessonsTotal} lessons completed
          {summary.overallAccuracy !== null &&
            ` · ${summary.overallAccuracy}% average on quizzes`}
        </p>
      </Card>

      {first ? (
        <Card rail="progress">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-on-surface-variant">
            Continue learning
          </p>
          <h2 className="mb-1.5 text-lg font-semibold">{first.title}</h2>
          <p className="mb-4 text-sm text-on-surface-variant">{first.reason}</p>
          <Link to={first.href} onClick={() => track('recommendation_clicked', {kind: first.kind})}>
            <Button>Continue</Button>
          </Link>
        </Card>
      ) : (
        <EmptyState
          icon={<BookOpen aria-hidden="true" />}
          title="No activity yet"
          body="Start your first lesson and your progress will appear here."
          action={<ButtonLink to="/learn">Browse lessons</ButtonLink>}
        />
      )}

      <section>
        <SectionHeading>Quick actions</SectionHeading>
        <div className="grid gap-3 tablet:grid-cols-3">
          {QUICK.map(({to, label, icon: Icon}) => (
            <Link
              key={to}
              to={to}
              className="flex min-h-12 items-center gap-3 rounded-lg border border-outline-variant bg-surface-lowest p-4 font-medium transition-colors hover:bg-surface-low">
              <Icon size={20} className="text-primary" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </section>

      {summary.bySubject.length > 0 && (
        <section>
          <SectionHeading>Subjects</SectionHeading>
          <div className="grid gap-3 tablet:grid-cols-2">
            {summary.bySubject.map((s) => {
              const subject = subjectById(s.subjectId);
              const pct =
                s.lessonsTotal === 0 ? 0 : (s.lessonsCompleted / s.lessonsTotal) * 100;
              return (
                <Card key={s.subjectId}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{subject?.name ?? s.subjectId}</h3>
                    {s.accuracy !== null && <SubjectChip>{s.accuracy}% accuracy</SubjectChip>}
                  </div>
                  <ProgressBar value={pct} label={`${subject?.name} progress`} />
                  <p className="mt-2 text-xs text-on-surface-variant">
                    {s.lessonsCompleted} of {s.lessonsTotal} lessons
                  </p>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {recommendations.length > 1 && (
        <section>
          <SectionHeading>Recommended for you</SectionHeading>
          <div className="flex flex-col gap-3">
            {recommendations.slice(1).map((r) => (
              <Link
                key={r.id}
                to={r.href}
                onClick={() => track('recommendation_clicked', {kind: r.kind})}
                className="rounded-lg border border-outline-variant bg-surface-lowest p-4 transition-colors hover:bg-surface-low">
                <p className="font-medium">{r.title}</p>
                <p className="text-sm text-on-surface-variant">{r.reason}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Card>
        <SectionHeading>Exam preparation</SectionHeading>
        <ProgressBar value={readiness} label="LibLearn exam readiness" />
        <p className="mt-2 text-sm text-on-surface-variant">
          <strong>LibLearn Exam Readiness.</strong> This is our own internal learning
          measure, calculated from your lessons and practice scores. It is not a
          prediction of any examination result.
        </p>
        <div className="mt-4">
          <ButtonLink to="/exam-coach" variant="secondary">Open Exam Coach</ButtonLink>
        </div>
      </Card>

      {quizzes.length > 0 && (
        <section>
          <SectionHeading>Recent activity</SectionHeading>
          <div className="flex flex-col gap-2">
            {quizzes.slice(-4).reverse().map((q) => (
              <div
                key={q.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-outline-variant bg-surface-lowest px-4 py-3">
                <span className="flex items-center gap-2 text-sm">
                  <Quote size={14} className="text-on-surface-variant" aria-hidden="true" />
                  {subjectById(q.subjectId)?.name ?? q.subjectId}
                </span>
                <span className="text-sm font-medium tabular-nums">
                  {q.score}/{q.total}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
