import {Link, useParams} from 'react-router-dom';
import {Card, EmptyState, ProgressBar} from '../components/ui';
import {subjectById} from '../data/catalog';
import {lessonsForTopic, topicsForSubjectGrade} from '../data/seed/curriculum';
import {useStudentData} from '../context/StudentDataContext';

export default function SubjectTopics() {
  const {grade, subject} = useParams();
  const g = Number(grade);
  const {isLessonComplete} = useStudentData();
  const subjectMeta = subject ? subjectById(subject) : undefined;
  const topics = subject ? topicsForSubjectGrade(subject, g) : [];

  if (!subjectMeta) {
    return <EmptyState title="Subject not found" body="That subject is not in the catalog." />;
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <Link to={`/learn/${g}`} className="text-sm text-secondary underline underline-offset-4">
          ← Grade {g}
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold">{subjectMeta.name}</h1>
      </header>

      {topics.length === 0 ? (
        <EmptyState
          title="No topics yet"
          body={`${subjectMeta.name} for Grade ${g} has not been added yet.`}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {topics.map((t) => {
            const lessons = lessonsForTopic(t.id);
            const done = lessons.filter((l) => isLessonComplete(l.id)).length;
            const pct = lessons.length === 0 ? 0 : (done / lessons.length) * 100;
            const rail = done === lessons.length && lessons.length > 0 ? 'complete' : done > 0 ? 'progress' : undefined;
            return (
              <Link key={t.id} to={`/learn/${g}/${subjectMeta.id}/${t.id}`}>
                <Card rail={rail}>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <h2 className="font-semibold">{t.name}</h2>
                    <span className="text-xs font-medium text-on-surface-variant">
                      {done === lessons.length && lessons.length > 0
                        ? 'Complete'
                        : done > 0
                          ? 'In progress'
                          : 'Not started'}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-on-surface-variant">{t.summary}</p>
                  <ProgressBar value={pct} label={`${t.name} progress`} />
                  <p className="mt-2 text-xs text-on-surface-variant">
                    {done} of {lessons.length} lessons
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
