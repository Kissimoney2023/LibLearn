import {BookOpen, GraduationCap, MessageCircleQuestion, TrendingUp} from 'lucide-react';
import {ButtonLink, Card} from '../components/ui';

const PILLARS = [
  {icon: BookOpen, title: 'Learn', body: 'Lessons for Grades 4 to 12, written to be read on a phone.'},
  {icon: MessageCircleQuestion, title: 'Ask', body: 'An AI tutor that explains at your grade level and guides rather than hands over answers.'},
  {icon: GraduationCap, title: 'Test', body: 'Practice sets for LPSCE, LJHSCE and WASSCE with worked explanations.'},
  {icon: TrendingUp, title: 'Improve', body: 'See which topics are weak and what to study next.'},
];

export default function Landing() {
  return (
    <div className="min-h-dvh">
      <header className="bg-secondary text-on-secondary">
        <div className="shell flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <GraduationCap aria-hidden="true" />
            <span className="font-display text-lg font-bold">LibLearn</span>
          </div>
          <ButtonLink to="/login" variant="ghost">
            <span className="text-on-secondary">Sign in</span>
          </ButtonLink>
        </div>
        <div className="shell pb-14 pt-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-tertiary-container">
            Built for Liberia. Powered by AI.
          </p>
          <h1 className="max-w-2xl font-display text-3xl font-bold leading-tight desktop:text-5xl">
            Your Future Starts With Learning.
          </h1>
          <p className="mt-4 max-w-xl text-base text-secondary-container">
            A digital classroom for Liberian students in Grades 4 through 12 — lessons,
            practice, an AI tutor and exam preparation, built to work on the phone you
            already have.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink to="/signup">Create free account</ButtonLink>
            <ButtonLink to="/login" variant="secondary">I already have one</ButtonLink>
          </div>
        </div>
      </header>

      <section className="shell py-12">
        <h2 className="mb-6 text-xl font-semibold">How LibLearn works</h2>
        <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
          {PILLARS.map(({icon: Icon, title, body}) => (
            <Card key={title}>
              <Icon className="mb-3 text-primary" aria-hidden="true" />
              <h3 className="mb-1.5 text-lg font-semibold">{title}</h3>
              <p className="text-sm text-on-surface-variant">{body}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-outline-variant bg-surface-low p-5">
          <h3 className="mb-1.5 font-semibold">About the lesson content</h3>
          <p className="text-sm text-on-surface-variant">
            LibLearn currently ships with sample teaching material written for the
            platform so you can see how it works. It is clearly marked throughout and is
            not the official Liberian curriculum. Verified curriculum material will be
            added from recognised educational sources.
          </p>
        </div>
      </section>

      <footer className="border-t border-outline-variant py-6">
        <p className="shell text-sm text-on-surface-variant">
          LibLearn — Your Future Starts With Learning.
        </p>
      </footer>
    </div>
  );
}
