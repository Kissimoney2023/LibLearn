import {Card, SectionHeading} from '../components/ui';

/**
 * What LibLearn actually stores and sends.
 *
 * Every statement here is checked against the code, not drafted from a
 * template: the tables are those in supabase/migrations, and the third-party
 * call is the one in server/tutor.ts. A privacy page that describes a
 * different application than the one running is worse than none, because it is
 * confidently wrong about something people rely on.
 *
 * This is a plain-language description, NOT a lawyer-reviewed policy. It says
 * so, in the page, because LibLearn is intended for schoolchildren and that
 * review is a real obligation someone still has to discharge.
 */
export default function Privacy() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <header>
        <h1 className="font-display text-2xl font-bold">Privacy</h1>
        <p className="mt-1 text-on-surface-variant">
          What LibLearn stores, where it goes, and who can see it.
        </p>
      </header>

      <div
        role="note"
        className="rounded-xl border border-outline-variant bg-tertiary-container/20 px-4 py-3 text-sm">
        <strong>This is a plain-language description, not a legal policy.</strong> It
        accurately describes what the application does today. Before LibLearn is used by
        schools or children at scale, someone qualified in Liberian data-protection law
        needs to review it and publish a proper policy.
      </div>

      <section className="flex flex-col gap-3">
        <SectionHeading>What is stored</SectionHeading>
        <Card>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-6">
            <li>Your name and email address, from when you created the account.</li>
            <li>Your grade, chosen subjects and examination goal.</li>
            <li>Which lessons you opened and completed, and when.</li>
            <li>Your quiz attempts: the answers you chose and your scores.</li>
            <li>Your bookmarks.</li>
            <li>
              A record of recent activity — lessons opened and completed, quizzes taken,
              bookmarks created — used to show your dashboard.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-6">
            That is the complete list. LibLearn does not collect your location, contacts,
            photos, or anything from other apps, and there are no advertising or tracking
            services in it.
          </p>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Who can see it</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            Only you. Every table holding student records is protected by a database rule
            that matches rows to the signed-in account, so one student's records cannot be
            read by another even if they tried.
          </p>
          <p className="mt-3 text-sm leading-6">
            Lesson content is the opposite: readable by everyone, and writable by no
            student. That is deliberate — a student who could edit lessons could edit the
            answer keys.
          </p>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>The AI Tutor sends your question to Google</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            This is the one place your words leave LibLearn. When you ask the AI Tutor
            something, your question, the recent messages in that conversation, and your
            grade and subject are sent to Google's Gemini service, which generates the
            reply.
          </p>
          <p className="mt-3 text-sm leading-6">
            Your name and email are <strong>not</strong> sent. The request goes from
            LibLearn's server, not from your device.
          </p>
          <p className="mt-3 text-sm leading-6">
            If you would rather nothing you write leaves LibLearn, do not use the AI
            Tutor. Lessons, quizzes and progress work entirely without it.
          </p>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Where it is kept</SectionHeading>
        <Card>
          <p className="text-sm leading-6">
            Records are stored in a Supabase-hosted PostgreSQL database. Some
            information — your sign-in session and, in offline mode, your progress — is
            also kept in your own browser so the app works without a connection.
          </p>
          <p className="mt-3 text-sm leading-6">
            Signing out clears what is held in this browser.
          </p>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Deleting your data</SectionHeading>
        <Card>
          <p className="text-sm leading-6 text-on-surface-variant">
            A self-service delete has <strong>not</strong> been built yet. Until it is,
            ask whoever runs LibLearn at your school to remove your account, and they can
            delete it from the database.
          </p>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">
            This is a gap, and it is named here rather than left for someone to discover.
          </p>
        </Card>
      </section>
    </div>
  );
}
