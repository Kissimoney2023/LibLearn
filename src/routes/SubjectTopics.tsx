import {Link, useParams} from 'react-router-dom';
import {Card, EmptyState, ProgressBar} from '../components/ui';
import {useCurriculum} from '../context/CurriculumContext';
import {
  lessonsForTopic,
  topicsForUnit,
  unfiledTopics,
  unitsForSubject,
} from '../lib/curriculum';
import type {Topic} from '../types/domain';
import {useStudentData} from '../context/StudentDataContext';

/**
 * Units and topics within one subject.
 *
 *   Grade 11 -> Mathematics -> [Algebra] -> Quadratic Equations -> Lesson
 *
 * Units are rendered as headed groups rather than as another tap. The hierarchy
 * is what curriculum documents use and what the database stores, but forcing a
 * student through an extra screen to reach a lesson would be structure imposed
 * on the reader for the data model's convenience.
 *
 * Topics under no unit are listed too, under a plain heading. Content is filed
 * gradually, and anything half-imported must stay reachable rather than
 * disappearing the moment its subject gains its first unit.
 */
export default function SubjectTopics() {
  const {grade, subject} = useParams();
  const {curriculum} = useCurriculum();
  const {isLessonComplete} = useStudentData();
  const g = Number(grade);

  const subjectMeta = curriculum.subjects.find((s) => s.id === subject);
  if (!subjectMeta) {
    return (
      <EmptyState
        title="Subject not found"
        body={`That subject has no curriculum loaded for Grade ${g}.`}
      />
    );
  }

  const units = unitsForSubject(curriculum, subjectMeta.id);
  const loose = unfiledTopics(curriculum, subjectMeta.id);

  const groups: {key: string; name: string; summary?: string; topics: Topic[]}[] = [
    ...units.map((u) => ({
      key: u.id,
      name: u.name,
      summary: u.summary,
      topics: topicsForUnit(curriculum, u.id),
    })),
    ...(loose.length
      ? [{key: '__unfiled', name: units.length ? 'Other topics' : '', topics: loose}]
      : []),
  ].filter((group) => group.topics.length > 0);

  const renderTopic = (t: Topic) => {
    const lessons = lessonsForTopic(curriculum, t.id);
    const done = lessons.filter((l) => isLessonComplete(l.id)).length;
    const pct = lessons.length === 0 ? 0 : (done / lessons.length) * 100;
    const complete = lessons.length > 0 && done === lessons.length;
    const rail = complete ? 'complete' : done > 0 ? 'progress' : undefined;

    return (
      <Link key={t.id} to={`/learn/${g}/${subjectMeta.id}/${t.id}`}>
        <Card rail={rail}>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <h3 className="font-semibold">{t.name}</h3>
            <span className="shrink-0 text-xs font-medium text-on-surface-variant">
              {complete ? 'Complete' : done > 0 ? 'In progress' : 'Not started'}
            </span>
          </div>
          <p className="mb-3 text-sm text-on-surface-variant">{t.summary}</p>
          <ProgressBar value={pct} label={`${t.name} progress`} />
          <p className="mt-2 text-xs text-on-surface-variant">
            {done} of {lessons.length} lesson{lessons.length === 1 ? '' : 's'}
          </p>
        </Card>
      </Link>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <header>
        <Link to={`/learn/${g}`} className="text-sm text-secondary underline underline-offset-4">
          ← Grade {g}
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold">{subjectMeta.name}</h1>
      </header>

      {groups.length === 0 ? (
        <EmptyState
          title="No topics yet"
          body={`${subjectMeta.name} for Grade ${g} has not been written yet.`}
        />
      ) : (
        <div className="flex flex-col gap-7">
          {groups.map((group) => (
            <section key={group.key} className="flex flex-col gap-3">
              {group.name && (
                <div>
                  <h2 className="font-display text-lg font-bold">{group.name}</h2>
                  {group.summary && (
                    <p className="mt-0.5 text-sm text-on-surface-variant">{group.summary}</p>
                  )}
                </div>
              )}
              {group.topics.map(renderTopic)}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
