import {Link} from 'react-router-dom';
import {Card, SectionHeading} from '../components/ui';

/**
 * Help, and an honest account of what LibLearn is.
 *
 * This route replaces a sidebar link that pointed at
 * `mailto:help@liblearn.example` - a reserved placeholder domain, so the mail
 * would have gone nowhere. A student who writes for help and is silently
 * ignored learns not to ask again, which is worse than having no help link at
 * all.
 *
 * Public: reachable without an account, because someone deciding whether to
 * sign up should be able to read what the app does with their data first.
 */
export default function Help() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <header>
        <h1 className="font-display text-2xl font-bold">Help</h1>
        <p className="mt-1 text-on-surface-variant">
          How LibLearn works, and what it does and does not claim to be.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <SectionHeading>Getting started</SectionHeading>
        <Card>
          <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm">
            <li>Create an account and choose your grade and subjects.</li>
            <li>
              Open <strong>Learn</strong>, pick a subject, then a unit, then a topic.
            </li>
            <li>Read the lesson and press <strong>Mark complete</strong> when you are done.</li>
            <li>Take the quiz. You will see which answers were wrong and why.</li>
            <li>
              Your progress appears on <strong>Home</strong> and <strong>Progress</strong>.
            </li>
          </ol>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>About the lessons</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            Lessons in LibLearn are labelled with where they came from. Most currently
            read <strong>LibLearn content</strong>, which means they were written for
            this app.
          </p>
          <p className="mt-3 text-sm leading-6">
            The subject matter is standard senior-secondary material — quadratic
            equations and photosynthesis are the same everywhere. But LibLearn{' '}
            <strong>does not claim to be the Liberian national curriculum</strong>, and a
            lesson here is not a statement of what will be on your examination.
          </p>
          <p className="mt-3 text-sm leading-6">
            For what your examination actually covers, ask your teacher or school, or use
            the syllabus from the Ministry of Education or WAEC. If something here
            disagrees with your teacher, your teacher is right.
          </p>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>About the AI Tutor</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            The AI Tutor explains things and sets practice questions. It is a language
            model, not a teacher, and it can be wrong.
          </p>
          <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-sm">
            <li>It will not give you the final answer to homework — it teaches the method.</li>
            <li>It does not have the official Liberian syllabus and will say so if asked.</li>
            <li>Check anything surprising against your lesson or your teacher.</li>
          </ul>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Using LibLearn on a slow connection</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            Lessons are text-first and no video is required. Once a grade has loaded,
            moving between subjects, topics and lessons does not use more data.
          </p>
          <p className="mt-3 text-sm leading-6">
            If the connection drops, LibLearn shows the lessons included with the app and
            tells you it is doing so. Your progress is still saved and syncs when you are
            back online.
          </p>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Your data</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            LibLearn stores your name, email, grade, chosen subjects, lesson progress,
            quiz attempts, bookmarks and recent activity. Other students cannot see any
            of it.
          </p>
          <Link
            to="/privacy"
            className="mt-3 inline-flex min-h-12 items-center text-sm text-secondary underline underline-offset-4">
            Read the full privacy note
          </Link>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Something is wrong</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            If a lesson contains a mistake, a quiz marks a correct answer wrong, or
            something will not load, that is worth reporting — a wrong answer key affects
            every student who takes that quiz.
          </p>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">
            A contact address has not been set up for this deployment yet. Until it is,
            report problems to whoever runs LibLearn at your school.
          </p>
        </Card>
      </section>
    </div>
  );
}
