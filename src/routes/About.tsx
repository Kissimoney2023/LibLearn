import {Link} from 'react-router-dom';
import {Card, SectionHeading} from '../components/ui';
import {CONTENT_SOURCES, CURRICULUM_VERSIONS} from '../data/sources';

/**
 * What LibLearn is, and — more usefully — what it does not yet claim.
 *
 * The source table is rendered from the real registry rather than written out
 * by hand, so a document that someone reviews and promotes shows here as
 * reviewed without anyone remembering to edit this page.
 */
export default function About() {
  const reviewed = CONTENT_SOURCES.filter(
    (s) => s.verificationStatus === 'reviewed' || s.verificationStatus === 'verified',
  ).length;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <header>
        <h1 className="font-display text-2xl font-bold">About LibLearn</h1>
        <p className="mt-1 text-on-surface-variant">Built for Liberia. Powered by AI.</p>
      </header>

      <section className="flex flex-col gap-3">
        <SectionHeading>What it is</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            A study app for Liberian secondary students: read a lesson, practise with a
            quiz, and track what you have covered. It is built to work on a phone and on
            a slow connection, and lessons are text-first so no video is needed.
          </p>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Where the lessons come from</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            Every lesson carries a label saying where it came from. There are four:
          </p>
          <dl className="mt-3 flex flex-col gap-2 text-sm leading-6">
            <div>
              <dt className="inline font-semibold">Official source</dt>
              <dd className="inline"> — reproduced from a government, Ministry or WAEC document someone has read.</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Verified source</dt>
              <dd className="inline"> — supported by a credible published source someone has read.</dd>
            </div>
            <div>
              <dt className="inline font-semibold">LibLearn content</dt>
              <dd className="inline"> — written for LibLearn. Standard academic material, not a national curriculum.</dd>
            </div>
            <div>
              <dt className="inline font-semibold">AI generated</dt>
              <dd className="inline"> — produced by the tutor as you read. Check it before relying on it.</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm leading-6">
            <strong>
              Today every lesson is LibLearn content. None is marked official.
            </strong>{' '}
            The Ministry of Education curriculum documents have been identified but not
            yet read by anyone working on LibLearn, and a syllabus cannot be inferred from
            a document's title.
          </p>
          <p className="mt-3 text-sm leading-6">
            This matters more than it might seem. A student revising from a topic list
            somebody guessed at, sitting an examination that was misdescribed to them, is
            worse off than a student who saw an empty subject and asked their teacher.
          </p>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Sources</SectionHeading>
        <Card>
          <p className="mb-3 text-sm text-on-surface-variant">
            {reviewed} of {CONTENT_SOURCES.length} identified sources have been read.
          </p>
          <ul className="flex flex-col gap-3">
            {CONTENT_SOURCES.map((s) => (
              <li key={s.id} className="border-b border-outline-variant pb-3 last:border-0 last:pb-0">
                <p className="text-sm font-medium">
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-12 items-center text-secondary underline underline-offset-4">
                      {s.title}
                    </a>
                  ) : (
                    s.title
                  )}
                </p>
                <p className="mt-0.5 text-xs text-on-surface-variant">
                  {s.organization} ·{' '}
                  {s.verificationStatus === 'reviewed' || s.verificationStatus === 'verified'
                    ? 'Read and verified'
                    : s.verificationStatus === 'verification-required'
                      ? 'Needs verification'
                      : 'Identified, not yet read'}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Curriculum versions</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            Liberia's curriculum changes, and a revision does not erase the version a
            student was taught under, so versions are stored side by side.
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {CURRICULUM_VERSIONS.map((v) => (
              <li key={v.id}>
                <span className="font-medium">{v.name}</span>{' '}
                <span className="text-on-surface-variant">— {v.status}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">
            None is marked as the current official curriculum, because which curriculum is
            in force today has not been established.
          </p>
        </Card>
      </section>

      <p className="text-sm">
        <Link to="/help" className="text-secondary underline underline-offset-4">Help</Link>
        {' · '}
        <Link to="/privacy" className="text-secondary underline underline-offset-4">Privacy</Link>
        {' · '}
        <Link to="/terms" className="text-secondary underline underline-offset-4">Terms</Link>
      </p>
    </div>
  );
}
