import {useParams} from 'react-router-dom';
import {ButtonLink, Card, EmptyState, ProgressBar, SectionHeading} from '../components/ui';
import {useStudentData} from '../context/StudentDataContext';
import {questionById} from '../data/seed/questions';
import {topicById} from '../data/seed/curriculum';
import {subjectById} from '../data/catalog';

export default function ExamResults() {
  const {attemptId} = useParams();
  const {exams} = useStudentData();
  const attempt = exams.find((e) => e.id === attemptId);

  if (!attempt) {
    return <EmptyState title="Results not found" body="That attempt is not on this device." />;
  }

  const pct = Math.round((attempt.score / attempt.total) * 100);
  const mins = Math.floor(attempt.durationSeconds / 60);
  const secs = attempt.durationSeconds % 60;

  // Strengths and weaknesses are grouped by the topic each question belongs to.
  const byTopic = new Map<string, {correct: number; total: number}>();
  for (const a of attempt.answers) {
    const q = questionById(a.questionId);
    if (!q) continue;
    const acc = byTopic.get(q.topicId) ?? {correct: 0, total: 0};
    acc.total += 1;
    if (a.correct) acc.correct += 1;
    byTopic.set(q.topicId, acc);
  }
  const strengths = [...byTopic.entries()].filter(([, v]) => v.correct / v.total >= 0.7);
  const improve = [...byTopic.entries()].filter(([, v]) => v.correct / v.total < 0.7);

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-bold">
          {attempt.exam.toUpperCase()} results
        </h1>
        <p className="text-sm text-on-surface-variant">
          {subjectById(attempt.subjectId)?.name ?? attempt.subjectId}
        </p>
      </header>

      <Card rail={pct >= 70 ? 'complete' : 'progress'}>
        <div className="mb-4 grid grid-cols-2 gap-4 tablet:grid-cols-4">
          {[
            ['Score', `${attempt.score}/${attempt.total}`],
            ['Accuracy', `${pct}%`],
            ['Correct', String(attempt.score)],
            ['Time', `${mins}m ${secs}s`],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs uppercase tracking-wide text-on-surface-variant">{label}</p>
              <p className="font-display text-xl font-bold tabular-nums">{value}</p>
            </div>
          ))}
        </div>
        <ProgressBar value={pct} label="Exam accuracy" />
      </Card>

      {strengths.length > 0 && (
        <section>
          <SectionHeading>Strengths</SectionHeading>
          <ul className="flex flex-col gap-2">
            {strengths.map(([topicId, v]) => (
              <li key={topicId} className="rounded-lg border border-outline-variant bg-surface-lowest px-4 py-3 text-sm">
                <strong>{topicById(topicId)?.name ?? topicId}</strong> — {v.correct} of {v.total} correct
              </li>
            ))}
          </ul>
        </section>
      )}

      {improve.length > 0 && (
        <section>
          <SectionHeading>Areas to improve</SectionHeading>
          <div className="flex flex-col gap-3">
            {improve.map(([topicId, v]) => (
              <Card key={topicId} rail="progress">
                <p className="font-semibold">{topicById(topicId)?.name ?? topicId}</p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  You answered {v.correct} of {v.total} correctly here. Spend your next study
                  session reviewing {topicById(topicId)?.name ?? 'this topic'}.
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeading>Review questions</SectionHeading>
        <div className="flex flex-col gap-3">
          {attempt.answers.map((a) => {
            const q = questionById(a.questionId);
            if (!q) return null;
            return (
              <Card key={a.questionId} rail={a.correct ? 'complete' : undefined}>
                <p className="mb-2 font-medium">{q.question}</p>
                <p className={`mb-1 text-sm ${a.correct ? 'text-on-primary-surface' : 'text-error'}`}>
                  {a.correct
                    ? `Correct — ${q.options[q.correctAnswer]}`
                    : a.selected === null
                      ? `Not answered. The answer is ${q.options[q.correctAnswer]}.`
                      : `You chose ${q.options[a.selected]}. The answer is ${q.options[q.correctAnswer]}.`}
                </p>
                <p className="text-sm text-on-surface-variant">{q.explanation}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <ButtonLink to={`/exam-coach/${attempt.exam}`}>Start recommended practice</ButtonLink>
        <ButtonLink to="/progress" variant="secondary">See your progress</ButtonLink>
      </div>
    </div>
  );
}
