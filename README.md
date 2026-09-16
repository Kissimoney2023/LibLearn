# LibLearn

**Your Future Starts With Learning.** · Built for Liberia. Powered by AI.

A curriculum-aligned learning companion and exam coach for Liberian students in
Grades 4–12. Lessons, practice, an AI tutor and examination preparation, built
mobile-first for low-end Android devices on intermittent connections.

```
LEARN → PRACTICE → ASK → TEST → ANALYZE → IMPROVE → REPEAT
```

---

## A note on content

LibLearn currently ships with **sample teaching material written for the
platform**. Every seed record carries `provenance: 'demo'` and renders with a
"Sample content" badge.

**It is not the official Liberian curriculum and must never be presented as
such.** The application holds no verified syllabus, grading scale or eligibility
rule for LPSCE, LJHSCE or WASSCE, and the AI tutor is instructed to say so
rather than guess. "LibLearn Exam Readiness" is an internal learning metric, not
a prediction of any examination result.

Replacing the seed with verified material from recognised educational sources is
a data-layer change — see [Content architecture](#content-architecture).

## Technology stack

| Layer | Choice |
| --- | --- |
| UI | React 19, React Router 7 |
| Build | Vite 6, TypeScript 5.8 (`strict`) |
| Styling | Tailwind CSS 4 via `@theme` design tokens |
| Icons | `lucide-react` (tree-shaken; no icon webfont) |
| Auth & data | Supabase — optional, with a local fallback |
| AI | Gemini via a server-side Express route |

## Environment variables

Copy `.env.example` to `.env` and fill in what you need. **No secret is ever
read by browser code.**

| Variable | Required | Used by | Purpose |
| --- | --- | --- | --- |
| `GEMINI_API_KEY` | For the AI tutor | `server.ts` | Server-side only. The browser calls `/api/ai/tutor`; the key never leaves the server. |
| `APP_URL` | No | `server.ts` | Self-referential links and OAuth callbacks. |
| `VITE_SUPABASE_URL` | For real accounts | browser | Supabase project URL. |
| `VITE_SUPABASE_ANON_KEY` | For real accounts | browser | Publishable anon key. Safe in the browser **under row-level security**. The service-role key must never appear in client code. |
| `VITE_API_BASE_URL` | No | browser | Defaults to same-origin. |

### Local mode

If `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are absent, LibLearn runs in
**local mode**: accounts and progress are stored in that browser only. This is a
real working fallback, not a stub — and the UI says so on every screen rather
than implying the data is safe on a server. Local mode has no credential check,
so it is for development and demonstration, never for real student data.

## Local development

```bash
npm install
npm run dev        # Vite on :3000, proxying /api to :3001
npm run server     # Express API on :3001 (separate terminal)
```

Run both. Without the API server the app works fully except the AI tutor, which
surfaces an explicit "not configured" message instead of a fabricated reply.

| Script | Does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run server` | Express API (`tsx server.ts`) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built output |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | Same as typecheck |

## Database setup

Supabase is optional but required for accounts that survive a device change.
The repository layer in `src/lib/store.ts` targets these tables:

```
profiles              id, name, email, role, grade, selectedSubjects,
                      examGoal, onboardedAt, createdAt, updatedAt
lesson_progress       user_id, lessonId, subjectId, topicId, grade,
                      status, startedAt, completedAt
quiz_attempts         user_id, id, quizId, subjectId, topicId, grade,
                      answers, score, total, startedAt, submittedAt
exam_attempts         user_id, id, exam, subjectId, difficulty, questionIds,
                      answers, flagged, score, total, durationSeconds,
                      startedAt, submittedAt
student_achievements  user_id, achievementId, earnedAt
```

Every table must have row-level security enabled with policies scoped to
`auth.uid() = user_id` (and `auth.uid() = id` on `profiles`). Without RLS the
anon key would expose every student's records.

### Applying the schema

```bash
# Supabase CLI
supabase db push
# or paste supabase/migrations/0001_init.sql into the SQL Editor and run it
```

The migration creates the tables above, enables RLS on every one of them, and
installs two triggers:

- `on_auth_user_created` writes the profile row during sign-up, so the client
  never races the session to insert it. The student's name travels in
  `signUp options.data`.
- `profiles_guard_role` rejects any update that changes `role`, so a student
  cannot promote themselves to teacher or admin.

Quiz and exam attempts are **insert-and-read only** from the client — there is
no update or delete policy — so a recorded score cannot be edited afterwards.
An exam row may be finalised only while `submitted_at` is null.

## Authentication

Supabase Auth with email and password. Supported: sign up, sign in, sign out,
session persistence and password reset. Profiles carry a `role` field
(`student` | `teacher` | `parent` | `school_admin` | `super_admin`); only
`student` is implemented, so Phase 2 portals need no migration.

Grade and progress are never trusted from the client for anything that matters —
see [Security](#security).

## AI setup

The tutor is a server-side Express route at `POST /api/ai/tutor`.

```jsonc
// request
{"message": "...", "mode": "explain", "context": {...}, "history": [...]}
// response
{"message": "...", "suggestedActions": ["Give me an example", "Quiz me"]}
```

Behaviour worth knowing:

- **Homework guard.** In `homework` mode the model is instructed to give hints,
  name the method or work a parallel problem — never the final answer.
- **Grade-aware.** Every reply is pitched at the student's grade.
- **Three teaching styles.** Standard, Simple, and Liberian English. The
  Liberian mode shapes register and encouragement only; definitions, formulae
  and worked steps stay academically correct.
- **Honest failure.** Missing key → `503`. Rate limited → `429`. The student
  sees a plain message; stack traces never reach the browser.
- **Rate limiting.** 20 requests per minute per IP, in memory. A multi-instance
  deployment should move this to a shared store.

## Seed data

`src/data/catalog.ts` holds subjects, examinations and achievements.
`src/data/seed/` holds the demo curriculum and question bank. Nothing is
hard-coded into components — no component reads a literal lesson id.

## PWA and low bandwidth

Installable, with a hand-written service worker in `public/sw.js`:

- **Navigations** → network-first, falling back to the cached app shell, so
  going offline mid-session shows the app rather than a browser error.
- **`/assets/*`** → cache-first. Vite content-hashes these, so each URL is
  immutable.
- **`/api/*`** → always live. Tutor replies and auth are never served stale.

Icons are generated from code by `scripts/generate-icons.mjs` (a dependency-free
PNG encoder), so there are no binary assets nobody can regenerate. Both come to
under 2.5 kB combined.

Vendor chunks are split so React and Supabase stay cached across app deploys.
Connectivity state is shown in the UI rather than left for the student to infer
from a failure.

## Security

- API keys are server-side only. The browser never holds a Gemini key.
- Supabase uses the publishable anon key under row-level security.
- Request bodies on the AI route are validated and size-capped (64 kB), with
  conversation history truncated to the last 8 turns to bound token cost.
- Correct answers are **never** sent to the client during an active quiz or exam
  attempt — see `maskQuestion` in `src/data/seed/questions.ts`.
- Errors are logged server-side and reported to students in plain language.

> **Known gap:** scoring currently happens client-side. Once Supabase is
> connected, quiz and exam grading should move behind an RPC so a student cannot
> post an arbitrary score. The `store.ts` seam is where that swap happens.

## Deployment

Static output on the CDN plus two serverless functions. `server.ts` is
local-development only and is never deployed. Every runtime calls the same
`handleTutorRequest` in `server/tutor.ts`, so the prompt rules and safety
guards cannot drift between environments.

Both Netlify and Vercel are configured; the repository deploys to either.

| | Netlify | Vercel |
| --- | --- | --- |
| Config | `netlify.toml` | `vercel.json` |
| Functions | `netlify/functions/*.mts` | `api/**/*.ts` |
| Tutor endpoint | `/api/ai/tutor` (redirect) | `/api/ai/tutor` (file route) |

The browser calls `/api/ai/tutor` on both, so no client code is platform-aware.

### Environment variables

Set these for every deploy context (Netlify: **Site configuration → Environment
variables**; Vercel: **Settings → Environment Variables**).

| Variable | Scope | Value |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Build (public) | `https://<ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Build (public) | The anon / publishable key |
| `GEMINI_API_KEY` | Runtime (secret) | Gemini API key — **no VITE\_ prefix** |

> **The `VITE_` prefix is the security boundary.** Vite inlines every `VITE_*`
> value into the JavaScript bundle at build time, where any visitor can read
> it. That is fine for the Supabase anon key, which row-level security governs.
> It is not fine for a Gemini key, so `GEMINI_API_KEY` must never carry it.
>
> **Never add the Supabase `service_role` key to a host.** It bypasses
> row-level security completely and nothing in this app needs it.

Changing a `VITE_*` value requires a **redeploy** — those are baked in at build
time, not read at runtime.

### Deploying to Netlify

```bash
npx netlify login
npx netlify init      # link or create the site
npx netlify deploy --prod
```

Or connect the GitHub repo in the Netlify dashboard; `netlify.toml` supplies
the build command, publish directory, functions directory, redirects and
headers automatically.

**Redirect order matters.** Netlify evaluates redirects top to bottom and the
first match wins, so the two `/api/*` rules must stay above the `/*` SPA
fallback. Reversed, every API call is rewritten to `index.html` and returns
HTML where the client expects JSON.

### Deploying to Vercel

```bash
npx vercel link
npx vercel --prod
```

### After the first deploy

1. `GET /api/health` → `{"ok":true,"aiConfigured":true,"supabaseConfigured":true}`.
   Any `false` names a variable that did not apply to that context.
2. In Supabase → **Authentication → URL Configuration**, add the deployment
   origin to **Site URL** and **Redirect URLs**. Password reset links back to
   `${origin}/login` and fails silently without it.
3. Apply `supabase/migrations/0001_init.sql` if you have not already; sign-up
   against a database with no `profiles` table fails in a way that looks like a
   deployment bug.

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md).

## Phase 2

The MVP implements the student experience only. Teacher, parent and school
management portals are planned. The data model already carries roles, so adding
them requires no rewrite of authentication, users, lessons, questions, progress
or exams.
