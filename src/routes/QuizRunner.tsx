import {useEffect, useMemo, useRef, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, ButtonLink, Card, EmptyState, ProgressBar} from '../components/ui';
import {useCurriculum} from '../context/CurriculumContext';
import {questionById, quizById, topicById} from '../lib/curriculum';
import {useStudentData} from '../context/StudentDataContext';
import {track} from '../lib/analytics';
import type {QuizAnswer, QuizAttempt} from '../types/domain';

export default function QuizRunner() {
  const {quizId} = useParams();
  const navigate = useNavigate();
  const {recordQuiz, logActivity} = useStudentData();

  const {curriculum} = useCurriculum();
  const quiz = quizId ? quizById(curriculum, quizId) : undefined;
  const questions = useMemo(
    () => (quiz ? quiz.questionIds.map((id) => questionById(curriculum, id)).filter((q) => q !== undefined) : []),
    [quiz],
  );

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [startedAt] = useState(() => new Date().toISOString());

  if (!quiz || questions.length === 0) {
    return <EmptyState title="Quiz not found" body="This quiz is not available." />;
  }

  const current = questions[index];
  // Fired once when the attempt begins. This previously fired on SUBMIT, which
  // made every completed quiz look like a fresh start and left no record of
  // attempts a student abandoned partway.
  const startedRef = useRef(false);
  useEffect(() => {
    if (!quiz || startedRef.current) return;
    startedRef.current = true;
    track('quiz_started', {quizId: quiz.id, subjectId: quiz.subjectId});
    void logActivity({
      activityType: 'quiz_started',
      contentType: 'quiz',
      contentId: quiz.id,
      metadata: {title: quiz.title, subjectId: quiz.subjectId},
    });
  }, [quiz, logActivity]);

  const answeredCount = Object.keys(picked).length;
  const unanswered = questions.length - answeredCount;

  async function submit() {
    const answers: QuizAnswer[] = questions.map((q) => ({
      questionId: q.id,
      selected: picked[q.id] ?? null,
      correct: picked[q.id] === q.correctAnswer,
    }));
    const score = answers.filter((a) => a.correct).length;
    const attempt: QuizAttempt = {
      id: `qa-${Date.now().toString(36)}`,
      quizId: quiz!.id,
      subjectId: quiz!.subjectId,
      topicId: quiz!.topicId,
      grade: quiz!.grade,
      answers,
      score,
      total: questions.length,
      startedAt,
      submittedAt: new Date().toISOString(),
    };
    await recordQuiz(attempt);
    await logActivity({
      activityType: 'quiz_completed',
      contentType: 'quiz',
      contentId: quiz!.id,
      metadata: {
        title: quiz!.title,
        subjectId: quiz!.subjectId,
        score,
        total: questions.length,
      },
    });
    setSubmitted(true);
  }

  if (submitted) {
    const score = questions.filter((q) => picked[q.id] === q.correctAnswer).length;
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="flex max-w-3xl flex-col gap-6">
        <header>
          <h1 className="font-display text-2xl font-bold">{quiz.title} — results</h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            You scored {score} of {questions.length} ({pct}%)
          </p>
        </header>
        <ProgressBar value={pct} label="Quiz score" />

        {questions.map((q) => {
          const chosen = picked[q.id];
          const right = chosen === q.correctAnswer;
          return (
            <Card key={q.id} rail={right ? 'complete' : undefined}>
              <p className="mb-3 font-medium">{q.question}</p>
              <p className={`mb-1 text-sm ${right ? 'text-on-primary-surface' : 'text-error'}`}>
                {right
                  ? `Correct — ${q.options[q.correctAnswer]}`
                  : chosen === undefined
                    ? `Not answered. The answer is ${q.options[q.correctAnswer]}.`
                    : `You chose ${q.options[chosen]}. The answer is ${q.options[q.correctAnswer]}.`}
              </p>
              <p className="text-sm text-on-surface-variant">{q.explanation}</p>
            </Card>
          );
        })}

        {pct < 60 && (
          <Card rail="progress">
            <p className="font-semibold">Recommended next</p>
            <p className="mt-1 text-sm text-on-surface-variant">
              Review {topicById(curriculum, quiz.topicId)?.name ?? 'this topic'} before moving on — your
              score here was below 60%.
            </p>
          </Card>
        )}

        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/dashboard">Back to dashboard</ButtonLink>
          <Button variant="secondary" onClick={() => navigate(0)}>Try again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <header>
        <Link to="/dashboard" className="inline-flex min-h-12 items-center text-sm text-secondary underline underline-offset-4">
          ← Leave quiz
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold">{quiz.title}</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Question {index + 1} of {questions.length}
        </p>
      </header>

      <ProgressBar value={((index + 1) / questions.length) * 100} label="Quiz progress" />

      <Card>
        <p className="mb-5 text-lg font-medium">{current.question}</p>
        <div className="flex flex-col gap-2">
          {current.options.map((opt, i) => {
            const chosen = picked[current.id] === i;
            return (
              <label
                key={opt}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-colors ${
                  chosen ? 'border-primary bg-primary-surface' : 'border-outline-variant bg-surface-lowest'
                }`}>
                <input
                  type="radio"
                  name={current.id}
                  className="size-[22px] accent-primary"
                  checked={chosen}
                  onChange={() => setPicked((p) => ({...p, [current.id]: i}))}
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
      </Card>

      <div className="flex justify-between gap-3">
        <Button
          variant="secondary"
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}>
          Previous
        </Button>
        {index < questions.length - 1 ? (
          <Button onClick={() => setIndex((i) => i + 1)}>Next</Button>
        ) : (
          // Submitting is irreversible and unanswered questions score zero, so
          // confirm first - and say how many are blank, since that is the fact
          // a student would want back if they could have it.
          <Button onClick={() => setConfirming(true)} disabled={answeredCount === 0}>
            Submit quiz
          </Button>
        )}
      </div>

      {confirming && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-submit-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-scrim/50 p-4 tablet:items-center">
          <div className="w-full max-w-md rounded-2xl bg-surface p-5 shadow-level-2">
            <h2 id="confirm-submit-title" className="font-display text-lg font-bold">
              Submit this quiz?
            </h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              {unanswered === 0
                ? `You have answered all ${questions.length} questions.`
                : `${unanswered} of ${questions.length} question${
                    unanswered === 1 ? ' is' : 's are'
                  } still blank, and blank answers score zero.`}
            </p>
            <p className="mt-2 text-sm text-on-surface-variant">
              You cannot change your answers after submitting.
            </p>
            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <Button variant="secondary" onClick={() => setConfirming(false)}>
                {unanswered === 0 ? 'Go back' : 'Keep answering'}
              </Button>
              <Button
                onClick={() => {
                  setConfirming(false);
                  void submit();
                }}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
