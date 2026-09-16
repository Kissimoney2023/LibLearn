import {useMemo} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {Search as SearchIcon} from 'lucide-react';
import {useAuth} from '../context/AuthContext';
import {EmptyState} from '../components/ui';
import {KIND_LABELS, search} from '../lib/search';
import {track} from '../lib/analytics';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const {profile} = useAuth();
  const query = params.get('q') ?? '';

  const results = useMemo(
    () => search(query, profile?.grade ?? null),
    [query, profile?.grade],
  );

  return (
    <div className="flex max-w-2xl flex-col gap-5">
      <header>
        <h1 className="font-display text-2xl font-bold">Search</h1>
        <p className="text-sm text-on-surface-variant">
          Lessons, topics, subjects and practice sets.
        </p>
      </header>

      <div className="relative">
        <SearchIcon
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-outline"
        />
        <input
          id="search-input"
          type="search"
          autoFocus
          value={query}
          onChange={(e) => {
            const next = e.target.value;
            setParams(next ? {q: next} : {}, {replace: true});
            if (next.length > 2) track('search_performed', {length: next.length});
          }}
          placeholder="Try “fractions” or “linear equations”"
          aria-label="Search lessons, topics and practice"
          className="h-12 w-full rounded-lg border-[1.5px] border-outline bg-surface-lowest pl-11 pr-3.5 placeholder:text-outline focus:border-secondary"
        />
      </div>

      {query.length > 0 && query.length < 2 && (
        <p className="text-sm text-on-surface-variant">Keep typing — at least two letters.</p>
      )}

      {query.length >= 2 && results.length === 0 && (
        <EmptyState
          title={`Nothing found for “${query}”`}
          body="Try a shorter word, or check the spelling. Searching a topic name like “algebra” usually works best."
        />
      )}

      {results.length > 0 && (
        <>
          <p className="text-sm text-on-surface-variant">
            {results.length} result{results.length === 1 ? '' : 's'}
          </p>
          <ul className="flex flex-col gap-2">
            {results.map((r) => (
              <li key={`${r.kind}-${r.id}`}>
                <Link
                  to={r.href}
                  className="flex min-h-12 flex-col justify-center gap-0.5 rounded-lg border border-outline-variant bg-surface-lowest px-4 py-3 transition-colors hover:bg-surface-low">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{r.title}</span>
                    <span className="inline-flex h-6 items-center rounded-full bg-surface-container px-2.5 text-xs font-medium text-on-surface-variant">
                      {KIND_LABELS[r.kind]}
                    </span>
                  </span>
                  <span className="text-sm text-on-surface-variant">{r.context}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
