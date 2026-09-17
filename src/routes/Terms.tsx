import {Link} from 'react-router-dom';
import {Card, SectionHeading} from '../components/ui';

/**
 * Terms of use.
 *
 * Deliberately short and deliberately not dressed up as a finished legal
 * instrument. Inventing binding-sounding clauses for a product aimed at
 * schoolchildren would be worse than stating plainly that this still needs a
 * lawyer — someone reading an official-looking page assumes obligations have
 * been considered that in fact have not.
 *
 * What IS stated here is true of the software and checkable in the code.
 */
export default function Terms() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <header>
        <h1 className="font-display text-2xl font-bold">Terms of use</h1>
      </header>

      <div
        role="note"
        className="rounded-xl border border-outline-variant bg-tertiary-container/20 px-4 py-3 text-sm">
        <strong>These are plain-language terms, not a lawyer-reviewed agreement.</strong>{' '}
        They describe how LibLearn is meant to be used and what it does not promise.
        Before LibLearn is offered to schools, someone qualified needs to review and
        replace this page.
      </div>

      <section className="flex flex-col gap-3">
        <SectionHeading>What LibLearn is for</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            Personal study. Read lessons, practise with quizzes, track your progress.
          </p>
          <p className="mt-3 text-sm leading-6">
            Please do not attempt to break the service, read other students' records, or
            extract the quiz answer keys. Answers are withheld during an attempt on
            purpose — seeing them early costs you the practice, which is the entire point.
          </p>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>What LibLearn does not promise</SectionHeading>
        <Card>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-6">
            <li>
              <strong>That its lessons match your official syllabus.</strong> Content is
              labelled with its source. Nothing is currently marked official.
            </li>
            <li>
              <strong>That the AI Tutor is correct.</strong> It is a language model and it
              can be wrong. Check anything surprising.
            </li>
            <li>
              <strong>Any examination result.</strong> The readiness figure is LibLearn's
              own measure of how much you have studied here, not a prediction.
            </li>
            <li>
              <strong>Uninterrupted service.</strong> This is early software and it can be
              unavailable.
            </li>
          </ul>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Your account</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            One account per student. Keep your password to yourself — anyone with it can
            see your progress and change your work.
          </p>
          <p className="mt-3 text-sm leading-6">
            See{' '}
            <Link to="/privacy" className="text-secondary underline underline-offset-4">
              Privacy
            </Link>{' '}
            for what is stored and how to have it removed.
          </p>
        </Card>
      </section>
    </div>
  );
}
