import {useAuth} from '../context/AuthContext';
import {useStudentData} from '../context/StudentDataContext';
import {Button, Card, GradeBadge, SectionHeading, SubjectChip} from '../components/ui';
import {examById, subjectById} from '../data/catalog';

export default function ProfilePage() {
  const {profile, signOut, backend} = useAuth();
  const {summary} = useStudentData();

  if (!profile) return null;

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-bold">{profile.name}</h1>
        <p className="text-sm text-on-surface-variant">{profile.email}</p>
      </header>

      <Card>
        <SectionHeading>Your plan</SectionHeading>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-on-surface-variant">Grade</span>
            <GradeBadge>Grade {profile.grade ?? '—'}</GradeBadge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-on-surface-variant">Subjects</span>
            {profile.selectedSubjects.map((id) => (
              <SubjectChip key={id}>{subjectById(id)?.name ?? id}</SubjectChip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-on-surface-variant">Goal</span>
            <span className="text-sm font-medium">
              {profile.examGoal ? (examById(profile.examGoal)?.name ?? profile.examGoal) : '—'}
            </span>
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeading>At a glance</SectionHeading>
        <div className="grid grid-cols-2 gap-4 tablet:grid-cols-4">
          {[
            ['Lessons', String(summary.lessonsCompleted)],
            ['Quizzes', String(summary.quizzesTaken)],
            ['Exams', String(summary.examAttempts)],
            ['Streak', String(summary.streakDays)],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">{label}</p>
              <p className="font-display text-xl font-bold tabular-nums">{value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeading>Account</SectionHeading>
        <p className="mb-4 text-sm text-on-surface-variant">
          {backend === 'supabase'
            ? 'Your account is synced to your LibLearn profile.'
            : 'This device is running in local mode. Your account and progress are stored in this browser only.'}
        </p>
        <Button variant="secondary" onClick={() => void signOut()}>Sign out</Button>
      </Card>
    </div>
  );
}
