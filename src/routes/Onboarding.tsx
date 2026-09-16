import {useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {Button} from '../components/ui';
import {EXAMS, subjectsForGrade} from '../data/catalog';
import {GRADE_LEVELS, type ExamGoal, type GradeLevel} from '../types/domain';
import {track} from '../lib/analytics';

export default function Onboarding() {
  const {status, profile, completeOnboarding} = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState<GradeLevel | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [goal, setGoal] = useState<ExamGoal | null>(null);
  const [busy, setBusy] = useState(false);

  if (status === 'signed_out') return <Navigate to="/login" replace />;
  if (profile?.onboardedAt) return <Navigate to="/dashboard" replace />;

  const available = grade ? subjectsForGrade(grade) : [];

  const toggle = (id: string) =>
    setSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  async function finish() {
    if (!grade || !goal || subjects.length === 0) return;
    setBusy(true);
    try {
      await completeOnboarding(grade, subjects, goal);
      track('onboarding_completed', {grade, subjects: subjects.length, goal});
      navigate('/dashboard', {replace: true});
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="shell flex min-h-dvh max-w-lg flex-col justify-center py-10">
      <p className="mb-2 text-sm font-medium text-on-surface-variant">
        Step {step + 1} of 3
      </p>
      <div className="mb-7 h-2 overflow-hidden rounded-full bg-outline-variant">
        <div
          className="h-full rounded-full bg-primary-container transition-[width]"
          style={{width: `${((step + 1) / 3) * 100}%`}}
        />
      </div>

      {step === 0 && (
        <>
          <h1 className="mb-5 font-display text-2xl font-bold">What grade are you in?</h1>
          <div className="mb-7 grid grid-cols-3 gap-3">
            {GRADE_LEVELS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setGrade(g);
                  setSubjects([]);
                }}
                aria-pressed={grade === g}
                className={`min-h-12 rounded-lg border-[1.5px] font-display font-semibold transition-colors ${
                  grade === g
                    ? 'border-primary bg-primary-surface text-on-primary-surface'
                    : 'border-outline bg-surface-lowest text-on-surface'
                }`}>
                Grade {g}
              </button>
            ))}
          </div>
          <Button fullWidth disabled={!grade} onClick={() => setStep(1)}>
            Continue
          </Button>
        </>
      )}

      {step === 1 && (
        <>
          <h1 className="mb-1 font-display text-2xl font-bold">
            What do you want to focus on?
          </h1>
          <p className="mb-5 text-sm text-on-surface-variant">
            Choose as many as you like. You can change this later in Settings.
          </p>
          <div className="mb-7 flex flex-col gap-2">
            {available.map((s) => (
              <label
                key={s.id}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-colors ${
                  subjects.includes(s.id)
                    ? 'border-primary bg-primary-surface'
                    : 'border-outline-variant bg-surface-lowest'
                }`}>
                <input
                  type="checkbox"
                  className="size-[22px] accent-primary"
                  checked={subjects.includes(s.id)}
                  onChange={() => toggle(s.id)}
                />
                <span className="font-medium">{s.name}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
            <Button fullWidth disabled={subjects.length === 0} onClick={() => setStep(2)}>
              Continue
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="mb-5 font-display text-2xl font-bold">
            What are you preparing for?
          </h1>
          <div className="mb-7 flex flex-col gap-2">
            {EXAMS.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setGoal(e.id)}
                aria-pressed={goal === e.id}
                className={`flex min-h-12 flex-col items-start gap-0.5 rounded-lg border p-3.5 text-left transition-colors ${
                  goal === e.id
                    ? 'border-primary bg-primary-surface'
                    : 'border-outline-variant bg-surface-lowest'
                }`}>
                <span className="font-display font-semibold">{e.name}</span>
                <span className="text-sm text-on-surface-variant">{e.description}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
            <Button fullWidth disabled={!goal || busy} onClick={finish}>
              {busy ? 'Building…' : 'Build My Learning Plan'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
