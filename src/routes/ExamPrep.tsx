import {useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Card, EmptyState} from '../components/ui';
import {examById, subjectById} from '../data/catalog';
import {QUESTIONS} from '../data/seed/questions';
import type {Difficulty, ExamGoal} from '../types/domain';

const DIFFICULTIES: {id: Difficulty; label: string}[] = [
  {id: 'foundation', label: 'Foundation'},
  {id: 'core', label: 'Core'},
  {id: 'challenge', label: 'Challenge'},
];

export default function ExamPrep() {
  const {exam} = useParams();
  const navigate = useNavigate();
  const examMeta = exam ? examById(exam as ExamGoal) : undefined;

  const pool = QUESTIONS.filter((q) => q.examGoal === exam);
  const subjectIds = [...new Set(pool.map((q) => q.subjectId))];

  const [subject, setSubject] = useState<string>(subjectIds[0] ?? '');
  const [difficulty, setDifficulty] = useState<Difficulty | 'any'>('any');
  const [count, setCount] = useState(5);

  if (!examMeta) {
    return <EmptyState title="Exam not found" body="That examination is not in the catalog." />;
  }

  if (subjectIds.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <Link to="/exam-coach" className="inline-flex min-h-12 items-center text-sm text-secondary underline underline-offset-4">
          ← Exam Coach
        </Link>
        <EmptyState
          title={`No ${examMeta.name} questions yet`}
          body="Practice questions for this examination have not been added. Try another exam, or practise from your lessons."
        />
      </div>
    );
  }

  const matching = pool.filter(
    (q) => q.subjectId === subject && (difficulty === 'any' || q.difficulty === difficulty),
  );

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <header>
        <Link to="/exam-coach" className="inline-flex min-h-12 items-center text-sm text-secondary underline underline-offset-4">
          ← Exam Coach
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold">{examMeta.name} practice</h1>
        <p className="mt-1 text-sm text-on-surface-variant">{examMeta.description}</p>
      </header>

      <Card>
        <fieldset className="mb-5">
          <legend className="mb-2 text-sm font-semibold">Subject</legend>
          <div className="flex flex-wrap gap-2">
            {subjectIds.map((id) => (
              <button
                key={id} type="button" onClick={() => setSubject(id)} aria-pressed={subject === id}
                className={`min-h-12 rounded-lg border px-4 text-sm font-medium ${
                  subject === id ? 'border-primary bg-primary-surface text-on-primary-surface' : 'border-outline'
                }`}>
                {subjectById(id)?.name ?? id}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-5">
          <legend className="mb-2 text-sm font-semibold">Difficulty</legend>
          <div className="flex flex-wrap gap-2">
            {[{id: 'any' as const, label: 'Any'}, ...DIFFICULTIES].map((d) => (
              <button
                key={d.id} type="button" onClick={() => setDifficulty(d.id)} aria-pressed={difficulty === d.id}
                className={`min-h-12 rounded-lg border px-4 text-sm font-medium ${
                  difficulty === d.id ? 'border-primary bg-primary-surface text-on-primary-surface' : 'border-outline'
                }`}>
                {d.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-5">
          <legend className="mb-2 text-sm font-semibold">Number of questions</legend>
          <div className="flex flex-wrap gap-2">
            {[3, 5, 10].map((n) => (
              <button
                key={n} type="button" onClick={() => setCount(n)} aria-pressed={count === n}
                className={`min-h-12 rounded-lg border px-4 text-sm font-medium ${
                  count === n ? 'border-primary bg-primary-surface text-on-primary-surface' : 'border-outline'
                }`}>
                {n}
              </button>
            ))}
          </div>
        </fieldset>

        <p className="mb-4 text-sm text-on-surface-variant">
          {matching.length} question{matching.length === 1 ? '' : 's'} match. Your set will
          have {Math.min(count, matching.length)}.
        </p>

        <Button
          fullWidth
          disabled={matching.length === 0}
          onClick={() =>
            navigate(`/exam/${exam}/${subject}?difficulty=${difficulty}&count=${count}`)
          }>
          Start practice
        </Button>
      </Card>
    </div>
  );
}
