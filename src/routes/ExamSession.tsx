import {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {Flag} from 'lucide-react';
import {Button, Card, EmptyState, ProgressBar} from '../components/ui';
import {QUESTIONS} from '../data/seed/questions';
import {useStudentData} from '../context/StudentDataContext';
import {track} from '../lib/analytics';
import type {Difficulty, ExamAttempt, ExamGoal, QuizAnswer} from '../types/domain';

export default function ExamSession() {
  const {exam, subject} = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const {recordExam} = useStudentData();

  const difficulty = params.get('difficulty') ?? 'any';
  const count = Number(params.get('count') ?? 5);

  // The question set is fixed once, at mount, so re-renders cannot reshuffle it
  // underneath the student mid-exam.
  const questions = useMemo(() => {
    const pool = QUESTIONS.filter(
      (q) =>
        q.examGoal === exam &&
        q.subjectId === subject &&
        (difficulty === 'any' || q.difficulty === (difficulty as Difficulty)),
    );
    return pool.slice(0, Math.max(1, count));
  }, [exam, subject, difficulty, count]);

  const [attemptId] = useState(() => `ea-${Date.now().toString(36)}`);
  const [startedAt] = useState(() => Date.now());
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    track('exam_started', {exam: exam ?? '', subject: subject ?? ''});
  }, [exam, subject]);

  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000);
    return () => clearInterval(t);
  }, [startedAt]);

  if (questions.length === 0) {
    return <EmptyState title="No questions" body="No questions match that selection." />;
  }

  const current = questions[index];
  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');

  async function submit() {
    const answers: QuizAnswer[] = questions.map((q) => ({
      questionId: q.id,
      selected: picked[q.id] ?? null,
      correct: picked[q.id] === q.correctAnswer,
    }));
    const attempt: ExamAttempt = {
      id: attemptId,
      exam: exam as ExamGoal,
      subjectId: subject ?? '',
      difficulty: (difficulty === 'any' ? 'core' : difficulty) as Difficulty,
      questionIds: questions.map((q) => q.id),
      answers,
      flagged,
      score: answers.filter((a) => a.correct).length,
      total: questions.length,
      durationSeconds: Math.floor((Date.now() - startedAt) / 1000),
      startedAt: new Date(startedAt).toISOString(),
      submittedAt: new Date().toISOString(),
    };
    await recordExam(attempt);
    navigate(`/exam-results/${attemptId}`, {replace: true});
  }

  return (
    <div className="flex max-w-2xl flex-col gap-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold">
            {String(exam).toUpperCase()} practice
          </h1>
          <p className="text-sm text-on-surface-variant">
            Question {index + 1} of {questions.length}
          </p>
        </div>
        <span className="rounded-full bg-surface-container px-3 py-1 text-sm font-medium tabular-nums">
          {mm}:{ss}
        </span>
      </header>

      <ProgressBar value={((index + 1) / questions.length) * 100} label="Exam progress" />

      <Card>
        {/* The correct answer is never rendered during an active attempt. */}
        <p className="mb-5 text-lg font-medium">{current.question}</p>
        <div className="flex flex-col gap-2">
          {current.options.map((opt, i) => {
            const chosen = picked[current.id] === i;
            return (
              <label
                key={opt}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border p-3.5 ${
                  chosen ? 'border-primary bg-primary-surface' : 'border-outline-variant bg-surface-lowest'
                }`}>
                <input
                  type="radio" name={current.id} className="size-[22px] accent-primary"
                  checked={chosen}
                  onChange={() => setPicked((p) => ({...p, [current.id]: i}))}
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="secondary" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          Previous
        </Button>
        <button
          type="button"
          onClick={() =>
            setFlagged((f) =>
              f.includes(current.id) ? f.filter((x) => x !== current.id) : [...f, current.id],
            )
          }
          className={`inline-flex min-h-12 items-center gap-2 rounded-lg border px-4 text-sm font-medium ${
            flagged.includes(current.id)
              ? 'border-tertiary bg-tertiary-surface text-on-tertiary-surface'
              : 'border-outline text-on-surface-variant'
          }`}>
          <Flag size={16} aria-hidden="true" />
          {flagged.includes(current.id) ? 'Flagged' : 'Flag question'}
        </button>
        {index < questions.length - 1 ? (
          <Button onClick={() => setIndex((i) => i + 1)}>Next</Button>
        ) : (
          <Button onClick={() => setConfirming(true)}>Submit Exam</Button>
        )}
      </div>

      {confirming && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          className="fixed inset-0 z-30 flex items-center justify-center bg-inverse-surface/50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-surface-lowest p-6 shadow-[0_12px_24px_-4px_rgb(10_37_64_/_0.12)]">
            <h2 id="confirm-title" className="mb-2 font-display text-lg font-semibold">
              Submit your exam?
            </h2>
            <p className="mb-5 text-sm text-on-surface-variant">
              You have answered {Object.keys(picked).length} of {questions.length} questions
              {flagged.length > 0 && `, and flagged ${flagged.length}`}. You cannot change
              answers after submitting.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setConfirming(false)}>
                Keep working
              </Button>
              <Button fullWidth onClick={() => void submit()}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
