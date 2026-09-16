# LibLearn architecture

How the application is put together, and why. Written for whoever picks this up
next — including the decisions that are easy to undo by accident.

---

## Frontend

React 19 + Vite 6, TypeScript in `strict` mode, Tailwind 4.

```
src/
  types/domain.ts        one domain model, imported everywhere
  data/
    catalog.ts           subjects, examinations, achievements
    seed/                demo curriculum + question bank
  lib/                   engines and seams (no JSX)
  context/               AuthContext, StudentDataContext
  components/
    ui/                  primitives (Button, Card, Field, ProgressBar…)
    layout/AppShell.tsx  sidebar + bottom nav + connectivity strip
  routes/                one file per route, lazily loaded
```

**Routing.** Every route is `lazy()`-loaded so the first paint on a phone
downloads the shell and one screen, not the whole app. `<Protected>` gates
authentication and redirects an un-onboarded student to `/onboarding`.
`<PublicOnly>` bounces a signed-in student off the landing and auth pages.

**State.** Two contexts, deliberately no state library. `AuthContext` owns
identity and the profile. `StudentDataContext` owns activity and derives
everything else — summary, recommendations, readiness, achievements — with
`useMemo`. Derived values are never stored, so they cannot drift from the
activity they came from.

**Responsive model.** Mobile-first: 4 columns under 768px, 8 to 1024px, 12 above,
capped at 1280px by the `.shell` utility. Desktop gets a sidebar, mobile a bottom
bar. Every interactive target is at least 48px.

## Backend

A single Express process (`server.ts`) that serves the built SPA and one API
route. It exists for one reason: **to hold the Gemini key**. Anything the browser
can safely do, the browser does.

```
POST /api/ai/tutor   validate → rate-limit → build prompt → Gemini → reply
GET  /api/health     { ok, aiConfigured }
```

Rate limiting is a fixed per-IP window held in memory, swept on a timer so the
map cannot grow without bound. It protects a single instance against runaway
cost; a multi-instance deployment needs a shared store.

## Database

Supabase (Postgres) when configured, `localStorage` otherwise. Both sit behind
**one module**, `src/lib/store.ts`, so no component knows which is live.

```
component → context → store.ts → ┬→ Supabase
                                 └→ localStorage
```

The tables are relational, not one JSON blob per student: `profiles`,
`lesson_progress`, `quiz_attempts`, `exam_attempts`, `student_achievements`.
Attempts are rows so they can be aggregated, and so a Phase 2 teacher portal can
query a class without parsing documents.

Row-level security is mandatory. The anon key is public by design; RLS is the
only thing standing between it and every student's records.

## AI

```
browser (no key)  →  /api/ai/tutor  →  Gemini
     lib/ai.ts         server.ts
```

The system prompt is assembled per request from three parts: the student's grade
and current lesson context, a **style** directive (standard / simple / Liberian
English), and a **mode** directive (explain, example, quiz me, homework,
simplify, practice).

Two constraints are load-bearing:

1. **The homework guard.** In `homework` mode the model must give a hint, name
   the method, or work a parallel problem — never the final answer. Removing this
   turns a tutor into a cheating tool.
2. **The curriculum disclaimer.** The model is told it does not hold the official
   Liberian curriculum or any examination syllabus, and must say so rather than
   invent requirements, grading rules or Ministry policy. This is the difference
   between a study aid and a source of misinformation for students making real
   decisions.

## Content architecture

Content is data. No curriculum text lives in a component.

Every content record carries `provenance`:

| Value | Meaning | UI treatment |
| --- | --- | --- |
| `demo` | LibLearn sample material | "Sample content" badge |
| `verified` | From a recognised educational source | no badge |
| `ai-generated` | Model-produced supplementary material | marked as AI-generated |

The hierarchy is `Grade → Subject → Topic → Lesson → Objective → Question → Quiz`.
Swapping the seed for verified material means replacing modules under
`src/data/seed/` — the frontend does not change, because nothing reads a literal
lesson id.

## Authentication flow

```
sign up ─→ profile created (role: student, onboardedAt: null)
             │
             ▼
        /onboarding   grade → subjects → exam goal
             │
             ▼
        onboardedAt set ─→ /dashboard
```

`<Protected>` enforces the middle step: a signed-in student without
`onboardedAt` cannot reach any other protected route.

## Progress system

Everything on `/progress` and the dashboard is computed from recorded activity.
There are no stored percentages and no random values anywhere in the app.

- **Lesson progress** — completed ÷ available, where *available* means lessons
  in the student's own grade and chosen subjects. Using the whole seed as the
  denominator would dilute a Grade 8 student's bar with Grade 12 work.
- **Accuracy** — correct ÷ asked, across quiz attempts.
- **Weak / strong topics** — under 60% and at or above 85%, and only once a
  topic has at least three recorded answers. Below that the sample is too small
  to call either way.
- **Streak** — consecutive days with activity, allowed to start today *or*
  yesterday so it does not appear to reset mid-morning.
- **Exam readiness** — `coverage × 0.4 + accuracy × 0.6`, weighted towards
  accuracy because answering correctly matters more than opening a lesson.
  **An internal LibLearn metric, labelled as such wherever it is shown.**

## Recommendation engine

Deterministic and explainable. Same inputs, same output — which is what makes it
testable and what lets it be replaced by a model later without moving any call
site. Priority order:

1. An unfinished lesson (finishing beats starting)
2. A topic scored under 60%
3. Exam practice, once a goal is set
4. The next untouched lesson in the student's grade and subjects

Each recommendation carries a plain-language `reason` the student can read.

## Exam engine

The question set is fixed once at mount with `useMemo`, so a re-render cannot
reshuffle questions underneath a student mid-exam.

During an active attempt the correct answer is **never rendered**. `maskQuestion`
exists to strip `correctAnswer` and `explanation` for the moment the question
bank moves server-side. Submission is guarded by a confirmation dialog stating
how many questions are answered and flagged.

Results group by topic to produce strengths and areas to improve, then link
straight into recommended practice.

## Known gaps

- **Client-side scoring.** Quiz and exam grading happens in the browser. Once
  Supabase is connected this belongs behind an RPC, so a student cannot post an
  arbitrary score. `store.ts` is the seam.
- **Scoring is still client-side even with Supabase connected.** RLS makes an
  attempt row immutable once written, but the score inside it is computed in
  the browser, so a determined student could post an arbitrary one. Moving
  grading behind an RPC closes this; `store.ts` is the seam.
- **No automated test suite.** Verification has been a Playwright smoke run over
  the student journey. Unit tests for `progress.ts`, `recommendations.ts` and
  `search.ts` would be the highest-value first tests — all three are pure
  functions.
- **Supabase ships in the bundle even in local mode** (~59 kB gzipped). Making
  the client a dynamic import would remove it from the local-mode path.
