import {useState} from 'react';
import {useAuth} from '../context/AuthContext';
import {Button, Card, SectionHeading} from '../components/ui';
import {EXAMS, subjectsForGrade} from '../data/catalog';
import {
  GRADE_LEVELS,
  TEACHING_STYLE_LABEL,
  type ExamGoal,
  type GradeLevel,
  type TeachingStyle,
} from '../types/domain';

export default function SettingsPage() {
  const {profile, updateProfile} = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [grade, setGrade] = useState<GradeLevel | null>(profile?.grade ?? null);
  const [subjects, setSubjects] = useState<string[]>(profile?.selectedSubjects ?? []);
  const [goal, setGoal] = useState<ExamGoal | null>(profile?.examGoal ?? null);
  const [language, setLanguage] = useState<TeachingStyle>(
    profile?.preferredLanguage ?? 'standard',
  );

  if (!profile) return null;
  const available = grade ? subjectsForGrade(grade) : [];

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      await updateProfile({
        grade,
        selectedSubjects: subjects,
        examGoal: goal,
        preferredLanguage: language,
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-bold">Settings</h1>
        <p className="text-sm text-on-surface-variant">
          Changing these updates your dashboard and recommendations.
        </p>
      </header>

      <Card>
        <SectionHeading>Grade</SectionHeading>
        <div className="grid grid-cols-3 gap-2 tablet:grid-cols-5">
          {GRADE_LEVELS.map((g) => (
            <button
              key={g} type="button" aria-pressed={grade === g}
              onClick={() => {
                setGrade(g);
                setSubjects([]);
              }}
              className={`min-h-12 rounded-lg border text-sm font-semibold ${
                grade === g ? 'border-primary bg-primary-surface text-on-primary-surface' : 'border-outline'
              }`}>
              {g}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeading>Subjects</SectionHeading>
        <div className="flex flex-col gap-2">
          {available.map((s) => (
            <label
              key={s.id}
              className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border p-3 ${
                subjects.includes(s.id) ? 'border-primary bg-primary-surface' : 'border-outline-variant'
              }`}>
              <input
                type="checkbox" className="size-[22px] accent-primary"
                checked={subjects.includes(s.id)}
                onChange={() =>
                  setSubjects((p) =>
                    p.includes(s.id) ? p.filter((x) => x !== s.id) : [...p, s.id],
                  )
                }
              />
              {s.name}
            </label>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeading>How the AI Tutor speaks to you</SectionHeading>
        <p className="mb-3 text-sm text-on-surface-variant">
          This changes the wording only. Definitions, formulas and worked steps stay
          exactly the same in every option.
        </p>
        <div className="flex flex-col gap-2">
          {(['standard', 'simple', 'liberian'] as TeachingStyle[]).map((v) => (
            <label
              key={v}
              className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-colors ${
                language === v
                  ? 'border-primary bg-primary-surface'
                  : 'border-outline-variant bg-surface-lowest'
              }`}>
              <input
                type="radio"
                name="preferred-language"
                className="size-[22px] accent-primary"
                checked={language === v}
                onChange={() => setLanguage(v)}
              />
              <span className="font-medium">{TEACHING_STYLE_LABEL[v]}</span>
            </label>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeading>Exam goal</SectionHeading>
        <div className="flex flex-col gap-2">
          {EXAMS.map((e) => (
            <button
              key={e.id} type="button" aria-pressed={goal === e.id} onClick={() => setGoal(e.id)}
              className={`min-h-12 rounded-lg border p-3 text-left text-sm font-medium ${
                goal === e.id ? 'border-primary bg-primary-surface text-on-primary-surface' : 'border-outline-variant'
              }`}>
              {e.name}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={() => void save()} disabled={saving || !grade || subjects.length === 0}>
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
        {saved && <span className="text-sm text-on-primary-surface">Saved.</span>}
      </div>
    </div>
  );
}
