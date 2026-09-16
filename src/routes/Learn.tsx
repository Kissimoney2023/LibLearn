import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {Card, SectionHeading} from '../components/ui';
import {GRADE_LEVELS} from '../types/domain';

export default function Learn() {
  const {profile} = useAuth();
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-bold">Learn</h1>
        <p className="text-sm text-on-surface-variant">
          Pick a grade to see its subjects. Yours is highlighted.
        </p>
      </header>
      <section>
        <SectionHeading>Grades</SectionHeading>
        <div className="grid grid-cols-2 gap-3 tablet:grid-cols-3 desktop:grid-cols-4">
          {GRADE_LEVELS.map((g) => (
            <Link key={g} to={`/learn/${g}`}>
              <Card className={profile?.grade === g ? 'border-primary' : ''}>
                <p className="font-display text-lg font-semibold">Grade {g}</p>
                {profile?.grade === g && (
                  <p className="mt-1 text-xs font-medium text-on-primary-surface">Your grade</p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
