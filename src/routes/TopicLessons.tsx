import {useEffect, useState} from 'react';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import {CheckCircle2} from 'lucide-react';
import {Button, ButtonLink, Card, DemoBadge, EmptyState, GradeBadge, SubjectChip} from '../components/ui';
import {lessonsForTopic, topicById} from '../data/seed/curriculum';
import {quizForLesson} from '../data/seed/questions';
import {subjectById} from '../data/catalog';
import {useStudentData} from '../context/StudentDataContext';

export default function TopicLessons() {
  const {grade, subject, topic} = useParams();
  const [params, setParams] = useSearchParams();
  const {startLesson, completeLesson, isLessonComplete} = useStudentData();

  const topicMeta = topic ? topicById(topic) : undefined;
  const lessons = topic ? lessonsForTopic(topic) : [];
  const selectedId = params.get('lesson') ?? lessons[0]?.id;
  const lesson = lessons.find((l) => l.id === selectedId);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (lesson) void startLesson(lesson.id);
  }, [lesson, startLesson]);

  if (!topicMeta || !lesson) {
    return <EmptyState title="Lesson not found" body="This topic has no lessons yet." />;
  }

  const done = isLessonComplete(lesson.id);
  const index = lessons.findIndex((l) => l.id === lesson.id);
  const prev = lessons[index - 1];
  const next = lessons[index + 1];
  const quiz = quizForLesson(lesson.id);

  async function markComplete() {
    setSaving(true);
    try {
      await completeLesson(lesson!.id);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="flex max-w-3xl flex-col gap-6">
      <header>
        <Link
          to={`/learn/${grade}/${subject}`}
          className="text-sm text-secondary underline underline-offset-4">
          ← {subjectById(subject ?? '')?.name ?? 'Back'}
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <GradeBadge>Grade {lesson.grade}</GradeBadge>
          <SubjectChip>{topicMeta.name}</SubjectChip>
          {lesson.provenance === 'demo' && <DemoBadge />}
        </div>
        <h1 className="mt-3 font-display text-2xl font-bold">{lesson.title}</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          About {lesson.estimatedMinutes} minutes
        </p>
      </header>

      <Card>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-on-surface-variant">
          What you will be able to do
        </h2>
        <ul className="flex flex-col gap-1.5">
          {lesson.objectives.map((o) => (
            <li key={o.id} className="flex gap-2 text-sm">
              <span aria-hidden="true" className="text-primary">•</span>
              {o.text}
            </li>
          ))}
        </ul>
      </Card>

      {lesson.sections.map((s) => (
        <section key={s.heading}>
          <h2 className="mb-2 text-lg font-semibold">{s.heading}</h2>
          <p className="text-base leading-7 text-on-surface">{s.body}</p>
          {s.example && (
            <div className="mt-3 rounded-lg border-l-4 border-tertiary-container bg-tertiary-surface p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-on-tertiary-surface">
                Example
              </p>
              <p className="text-sm text-on-surface">{s.example}</p>
            </div>
          )}
        </section>
      ))}

      <Card rail={done ? 'complete' : 'progress'}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold">{done ? 'Lesson complete' : 'Finished reading?'}</p>
            <p className="text-sm text-on-surface-variant">
              {done
                ? 'Your progress has been saved.'
                : 'Mark it complete to update your progress and recommendations.'}
            </p>
          </div>
          {done ? (
            <span className="flex items-center gap-2 font-medium text-on-primary-surface">
              <CheckCircle2 size={20} aria-hidden="true" /> Done
            </span>
          ) : (
            <Button onClick={markComplete} disabled={saving}>
              {saving ? 'Saving…' : 'Mark complete'}
            </Button>
          )}
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        {quiz && <ButtonLink to={`/quiz/${quiz.id}`}>Take the quiz</ButtonLink>}
        <ButtonLink to="/ai-tutor" variant="secondary">Ask the AI Tutor</ButtonLink>
      </div>

      <nav className="flex justify-between gap-3 border-t border-outline-variant pt-5">
        {prev ? (
          <button
            type="button"
            onClick={() => setParams({lesson: prev.id})}
            className="min-h-12 text-sm font-medium text-secondary underline underline-offset-4">
            ← {prev.title}
          </button>
        ) : <span />}
        {next && (
          <button
            type="button"
            onClick={() => setParams({lesson: next.id})}
            className="min-h-12 text-right text-sm font-medium text-secondary underline underline-offset-4">
            {next.title} →
          </button>
        )}
      </nav>
    </article>
  );
}
