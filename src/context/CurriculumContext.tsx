import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {GradeLevel} from '../types/domain';
import {
  emptyCurriculum,
  loadGrade,
  type CurriculumSource,
  type GradeCurriculum,
} from '../lib/curriculum';
import {toMessage} from '../lib/errors';

/**
 * Loads one grade's curriculum and exposes the four states a screen can be in.
 *
 * These are four genuinely different situations and the UI must not conflate
 * them - that conflation is what made Grade 11 read "No topics added yet" when
 * the real answer was "nothing has been written for this grade". A student who
 * is told content does not exist gives up on the subject; one told the app
 * cannot reach the server tries again later.
 */
export type CurriculumStatus = 'idle' | 'loading' | 'ready' | 'error';

interface CurriculumState {
  status: CurriculumStatus;
  curriculum: GradeCurriculum;
  /** Which backend answered. 'bundled-fallback' means the database was missed. */
  source: CurriculumSource | null;
  /** Set when serving offline content after a failed database read. */
  warning: string | null;
  error: string | null;
  grade: GradeLevel | null;
  reload: () => void;
}

const Ctx = createContext<CurriculumState | null>(null);

export function CurriculumProvider({
  grade,
  children,
}: {
  grade: GradeLevel | null;
  children: ReactNode;
}) {
  const [status, setStatus] = useState<CurriculumStatus>('idle');
  const [curriculum, setCurriculum] = useState<GradeCurriculum>(() =>
    emptyCurriculum((grade ?? 1) as GradeLevel),
  );
  const [source, setSource] = useState<CurriculumSource | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    if (grade === null) {
      setStatus('idle');
      return;
    }

    let cancelled = false;
    setStatus('loading');
    setError(null);
    setWarning(null);

    (async () => {
      try {
        const res = await loadGrade(grade, {force: nonce > 0});
        if (cancelled) return;
        setCurriculum(res.curriculum);
        setSource(res.source);
        setWarning(res.warning ?? null);
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        // loadGrade falls back to bundled content on a database failure, so
        // reaching here means even that failed - a genuine error, not a
        // degraded state to paper over.
        setError(toMessage(err, 'Could not load the curriculum for this grade.'));
        setStatus('error');
      }
    })();

    // Guards against a slow request for grade 8 resolving after the student has
    // already switched to grade 11 and overwriting it.
    return () => {
      cancelled = true;
    };
  }, [grade, nonce]);

  const value = useMemo<CurriculumState>(
    () => ({status, curriculum, source, warning, error, grade, reload}),
    [status, curriculum, source, warning, error, grade, reload],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurriculum(): CurriculumState {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCurriculum must be used inside <CurriculumProvider>');
  return v;
}
