import {useEffect, useState} from 'react';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import {Bookmark as BookmarkIcon, CheckCircle2} from 'lucide-react';
import {Button, ButtonLink, Card, EmptyState, GradeBadge, ProvenanceBadge, SubjectChip} from '../components/ui';
import {useCurriculum} from '../context/CurriculumContext';
import {lessonsForTopic, noteForLesson, quizForLesson, topicById, unitById} from '../lib/curriculum';
import {useStudentData} from '../context/StudentDataContext';
import {NOTE_SOURCE_LABEL} from '../types/domain';

/**
 * Renders **bold** runs and nothing else.
 *
 * Lesson bodies are plain text, but several use **...** to mark the name of a
 * mistake or a rule so it can be found while skimming. Rendered raw they showed
 * as literal asterisks.
 *
 * This splits on the marker and alternates, building React nodes rather than
 * injecting HTML, so lesson text can never become markup. An unmatched marker
 * degrades to plain text instead of swallowing the rest of the paragraph.
 */
function emphasise(text: string) {
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function TopicLessons() {
  const {grade, subject, topic} = useParams();
  const [params, setParams] = useSearchParams();
  const {startLesson, completeLesson, isLessonComplete, toggleBookmark, isBookmarked} =
    useStudentData();

  const {curriculum} = useCurriculum();
  const topicMeta = topic ? topicById(curriculum, topic) : undefined;
  const lessons = topic ? lessonsForTopic(curriculum, topic) : [];
  const selectedId = params.get('lesson') ?? lessons[0]?.id;
  const lesson = lessons.find((l) => l.id === selectedId);
  const highlighted = params.get('section');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (lesson) void startLesson(lesson);
  }, [lesson, startLesson]);

  useEffect(() => {
    if (!highlighted) return;
    // The section renders in the same commit, so wait a frame before scrolling.
    const id = requestAnimationFrame(() => {
      document.getElementById(`note-${highlighted}`)?.scrollIntoView({block: 'start'});
    });
    return () => cancelAnimationFrame(id);
  }, [highlighted, selectedId]);

  if (!topicMeta || !lesson) {
    return <EmptyState title="Lesson not found" body="This topic has no lessons yet." />;
  }

  const unit = topicMeta.unitId ? unitById(curriculum, topicMeta.unitId) : undefined;
  const note = noteForLesson(lesson);
  const done = isLessonComplete(lesson.id);
  const bookmarked = isBookmarked('lesson', lesson.id);
  const index = lessons.findIndex((l) => l.id === lesson.id);
  const prev = lessons[index - 1];
  const next = lessons[index + 1];
  const quiz = quizForLesson(curriculum, lesson.id);

  async function markComplete() {
    setSaving(true);
    try {
      await completeLesson(lesson!, lesson!.title);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="flex max-w-3xl flex-col gap-6">
      <header>
        <Link
          to={`/learn/${grade}/${subject}`}
          className="inline-flex min-h-12 items-center text-sm text-secondary underline underline-offset-4">
          ← {curriculum.subjects.find((x) => x.id === subject)?.name ?? 'Back'}
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <GradeBadge>Grade {lesson.grade}</GradeBadge>
          {unit && <SubjectChip>{unit.name}</SubjectChip>}
          <SubjectChip>{topicMeta.name}</SubjectChip>
          <ProvenanceBadge provenance={lesson.provenance} />
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

      {note.sections.map((s) => (
        <section
          key={s.key}
          id={`note-${s.key}`}
          // A student arriving from a wrong answer lands on the exact section
          // that teaches it. Highlighting it is the difference between "here is
          // the lesson" and "here is the part you missed".
          className={
            s.key === highlighted
              ? 'scroll-mt-24 rounded-lg border-l-4 border-primary bg-primary-surface p-4'
              : 'scroll-mt-24'
          }>
          <h2 className="mb-2 text-lg font-semibold">{s.heading}</h2>
          {s.key === highlighted && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-on-primary-surface">
              The section your quiz question came from
            </p>
          )}
          <p className="whitespace-pre-wrap text-base leading-7 text-on-surface">{emphasise(s.body)}</p>
          {s.example && (
            <div className="mt-3 rounded-lg border-l-4 border-tertiary-container bg-tertiary-surface p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-on-tertiary-surface">
                Example
              </p>
              <p className="whitespace-pre-wrap text-sm text-on-surface">{emphasise(s.example)}</p>
            </div>
          )}
        </section>
      ))}

      {/* Source footer. A LibLearn Note must never be mistaken for a Ministry
          document, so what this content IS gets stated plainly under it. */}
      <Card>
        <p className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
          Curriculum source
        </p>
        <dl className="mt-2 grid gap-1 text-sm">
          <div className="flex flex-wrap gap-2">
            <dt className="text-on-surface-variant">Content:</dt>
            <dd className="font-medium">{NOTE_SOURCE_LABEL[note.sourceType]}</dd>
          </div>
          <div className="flex flex-wrap gap-2">
            <dt className="text-on-surface-variant">Curriculum version:</dt>
            <dd className="font-medium">{note.curriculumVersionId ?? 'Not assigned'}</dd>
          </div>
          <div className="flex flex-wrap gap-2">
            <dt className="text-on-surface-variant">Note version:</dt>
            <dd className="font-medium">v{note.version}</dd>
          </div>
        </dl>
        {note.sourceType === 'LIBLEARN' && (
          <p className="mt-3 text-sm text-on-surface-variant">
            This lesson was written by LibLearn. It is not a Ministry of Education document and
            does not carry Ministry endorsement.
          </p>
        )}
      </Card>

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
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                void toggleBookmark({
                  contentType: 'lesson',
                  contentId: lesson.id,
                  title: lesson.title,
                  subjectId: lesson.subjectId,
                  grade: lesson.grade,
                })
              }
              aria-pressed={bookmarked}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
              className="flex min-h-12 min-w-12 items-center justify-center rounded-lg border border-outline px-3 text-on-surface-variant">
              <BookmarkIcon
                size={20}
                aria-hidden="true"
                fill={bookmarked ? 'currentColor' : 'none'}
              />
            </button>
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
