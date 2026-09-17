import {Link, useParams} from 'react-router-dom';
import {Card, EmptyState} from '../components/ui';
import {subjectsForGrade} from '../data/catalog';
import {topicsForSubjectGrade} from '../data/seed/curriculum';

/**
 * Subject list for one grade.
 *
 * The per-subject caption below is deliberately specific. An earlier version
 * said "No topics added yet" for every subject with zero topics, which conflated
 * three situations a student cannot tell apart: content that has not been
 * written, content that failed to load, and content still loading. The first is
 * a fact about LibLearn; the second is a fault worth retrying. Showing the wrong
 * one teaches students to distrust the app, or to give up on a subject that is
 * actually there.
 *
 * Curriculum currently ships bundled with the app rather than being fetched, so
 * a read cannot fail or be pending here and only the "not written yet" case is
 * reachable. When this route moves to a network read, the loading and error
 * branches belong here — not a rewording of the empty one.
 */
export default function GradeSubjects() {
  const {grade} = useParams();
  const g = Number(grade);
  const subjects = subjectsForGrade(g);

  if (!Number.isFinite(g)) {
    return (
      <EmptyState
        title="That grade does not exist"
        body="Choose a grade between 4 and 12 from the Learn page."
      />
    );
  }

  if (subjects.length === 0) {
    return (
      <EmptyState
        title={`No subjects listed for Grade ${g}`}
        body="No subjects are offered at this grade yet. Try another grade."
      />
    );
  }

  // Subjects with lessons first, so a student lands on something they can use.
  const withTopics = subjects
    .map((s) => ({subject: s, topics: topicsForSubjectGrade(s.id, g)}))
    .sort((a, b) => b.topics.length - a.topics.length);

  const ready = withTopics.filter((s) => s.topics.length > 0).length;

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
            : `${ready} of ${subjects.length} subjects have lessons ready.`}
        </p>
      </header>

      <div className="grid gap-3 tablet:grid-cols-2 desktop:grid-cols-3">
        {withTopics.map(({subject, topics}) => {
          const empty = topics.length === 0;
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
                  : `${topics.length} topic${topics.length === 1 ? '' : 's'} ready to study`}
              </p>
            </Card>
          );

          // Linking into a subject with nothing in it is a dead end. Render such
          // a card as plain content rather than a link that looks tappable and
          // then disappoints.
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
