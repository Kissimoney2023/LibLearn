import {Link, useParams} from 'react-router-dom';
import {Card, EmptyState} from '../components/ui';
import {subjectsForGrade} from '../data/catalog';
import {topicsForSubjectGrade} from '../data/seed/curriculum';

export default function GradeSubjects() {
  const {grade} = useParams();
  const g = Number(grade);
  const subjects = subjectsForGrade(g);

  if (!Number.isFinite(g) || subjects.length === 0) {
    return (
      <EmptyState
        title="No subjects for this grade yet"
        body="Lessons for this grade have not been added. Try another grade."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <Link to="/learn" className="text-sm text-secondary underline underline-offset-4">
          ← All grades
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold">Grade {g}</h1>
      </header>
      <div className="grid gap-3 tablet:grid-cols-2 desktop:grid-cols-3">
        {subjects.map((s) => {
          const topics = topicsForSubjectGrade(s.id, g);
          return (
            <Link key={s.id} to={`/learn/${g}/${s.id}`}>
              <Card>
                <h2 className="font-semibold">{s.name}</h2>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {topics.length === 0
                    ? 'No topics added yet'
                    : `${topics.length} topic${topics.length === 1 ? '' : 's'}`}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
