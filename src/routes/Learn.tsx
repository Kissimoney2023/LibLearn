import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {Card, SectionHeading} from '../components/ui';
import {GRADE_LEVELS} from '../types/domain';
import {TOPICS} from '../data/seed/curriculum';

/**
 * Grade picker.
 *
 * Every grade used to be an identical tappable card, but only some have
 * content, so several of the nine led to a dead end. A student who taps their
 * own grade and lands on "no curriculum loaded for this grade" has been told
 * the app is not for them - a much bigger message than intended.
 *
 * Grades without content are now plain cards marked "Coming soon": still
 * visible, because a Grade 5 student should see their grade exists and is
 * planned, but not offered as something to open.
 *
 * The counts come from the BUNDLED corpus rather than the database. That is a
 * deliberate trade: this screen sits above the per-grade loader, and fetching
 * all twelve grades just to decide which cards to grey out would cost twelve
 * requests to render one list. The bundled figures are a floor, since the
 * database seed is generated from the same corpus.
 */
export default function Learn() {
  const {profile} = useAuth();

  const gradesWithContent = new Set(TOPICS.map((t) => t.grade));
  const ready = GRADE_LEVELS.filter((g) => gradesWithContent.has(g));

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-bold">Learn</h1>
        <p className="text-sm text-on-surface-variant">
          {ready.length === GRADE_LEVELS.length
            ? 'Pick a grade to see its subjects. Yours is highlighted.'
            : `Lessons are ready for ${ready.length} of ${GRADE_LEVELS.length} grades. Yours is highlighted.`}
        </p>
      </header>

      <section>
        <SectionHeading>Grades</SectionHeading>
        <div className="grid grid-cols-2 gap-3 tablet:grid-cols-3 desktop:grid-cols-4">
          {GRADE_LEVELS.map((g) => {
            const hasContent = gradesWithContent.has(g);
            const isMine = profile?.grade === g;

            const card = (
              <Card className={isMine ? 'border-primary' : ''}>
                <p className="font-display text-lg font-semibold">Grade {g}</p>
                {isMine && (
                  <p className="mt-1 text-xs font-medium text-on-primary-surface">Your grade</p>
                )}
                {!hasContent && (
                  <p className="mt-1 text-xs text-on-surface-variant">Coming soon</p>
                )}
              </Card>
            );

            // Not a link: opening it would only show an empty page.
            return hasContent ? (
              <Link key={g} to={`/learn/${g}`}>
                {card}
              </Link>
            ) : (
              <div key={g} className="cursor-default opacity-60">
                {card}
              </div>
            );
          })}
        </div>

        {ready.length < GRADE_LEVELS.length && (
          <p className="mt-4 text-sm text-on-surface-variant">
            Lessons for the remaining grades are being written. Grade 11 is the most
            complete.
          </p>
        )}
      </section>
    </div>
  );
}
