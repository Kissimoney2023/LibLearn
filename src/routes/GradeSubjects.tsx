import {Link, useParams} from 'react-router-dom';
import {Card, EmptyState} from '../components/ui';
import {useCurriculum} from '../context/CurriculumContext';
import {subjectsForGrade, topicCounts, unitsForSubject} from '../lib/curriculum';

/**
 * Subject list for one grade, driven entirely by loaded curriculum.
 *
 * Nothing here is hardcoded: the subjects shown are those the repository
 * returned for this grade. Loading a new grade into the database makes its
 * subjects appear with no code change, which is the property that lets this one
 * screen serve Grades 1-12.
 *
 * Loading and error are handled by <GradeScope>, so by the time this renders
 * the only remaining case is "this subject has no content yet" - and that is
 * stated as a fact about LibLearn, not dressed up as an error.
 */
export default function GradeSubjects() {
  const {grade} = useParams();
  const {curriculum} = useCurriculum();
  const g = Number(grade);

  const subjects = subjectsForGrade(curriculum);
  const counts = topicCounts(curriculum);

  if (subjects.length === 0) {
    return (
      <EmptyState
        title={`No lessons for Grade ${g} yet`}
        body="No curriculum has been loaded for this grade. Try another grade — Grade 11 is the most complete."
      />
    );
  }

  const ordered = [...subjects].sort(
    (a, b) => (counts.get(b.id) ?? 0) - (counts.get(a.id) ?? 0),
  );
  const ready = ordered.filter((s) => (counts.get(s.id) ?? 0) > 0).length;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <Link to="/learn" className="text-sm text-secondary underline underline-offset-4">
          ← All grades
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold">Grade {g}</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          {ready === 0
            ? 'Lessons for this grade are still being written.'
            : `${ready} of ${ordered.length} subjects have lessons ready.`}
        </p>
      </header>

      <div className="grid gap-3 tablet:grid-cols-2 desktop:grid-cols-3">
        {ordered.map((subject) => {
          const topics = counts.get(subject.id) ?? 0;
          const units = unitsForSubject(curriculum, subject.id).length;
          const empty = topics === 0;

          const card = (
            <Card>
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold">{subject.name}</h2>
                {empty && (
                  <span className="shrink-0 rounded-full border border-outline-variant px-2 py-0.5 text-xs text-on-surface-variant">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-on-surface-variant">
                {empty
                  ? 'Lessons for this subject have not been written yet.'
                  : units > 0
                    ? `${units} unit${units === 1 ? '' : 's'} · ${topics} topic${topics === 1 ? '' : 's'}`
                    : `${topics} topic${topics === 1 ? '' : 's'} ready to study`}
              </p>
            </Card>
          );

          // A card leading nowhere is a dead end, so empty subjects are not links.
          return empty ? (
            <div key={subject.id} className="cursor-default opacity-60">
              {card}
            </div>
          ) : (
            <Link key={subject.id} to={`/learn/${g}/${subject.id}`}>
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
