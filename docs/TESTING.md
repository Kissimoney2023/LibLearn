# Testing

No unit-test framework is installed. Verification is done by running the real
thing: type checking, a production build, data-integrity scripts, and a scripted
browser journey against the built app.

## Commands

```bash
npm run lint      # tsc --noEmit
npm run build     # production build
npx tsx scripts/validate-curriculum.ts        # corpus integrity
npx tsx scripts/import-curriculum.ts --dry-run # import validation
```

## Browser journey

The 20-step student journey is run against `vite preview` in Chromium at 390px:

sign up → onboarding (grade, subjects, exam goal) → dashboard → Learn → Grade 11
→ Mathematics → unit → topic → lesson → bookmark → mark complete → bookmarks
page → quiz → answer → results → answers hidden during the attempt → progress →
activity feed → Continue Learning → search → logout.

**Result: 20/20 passing.**

## Responsive sweep

7 routes × 8 widths (320, 375, 390, 414, 768, 1024, 1280, 1440), checking for
horizontal overflow and for interactive controls under a 44px height.

**Result: 112/112 clean.**

This sweep earns its keep: it found breadcrumb back-links rendering 16px tall
against a 48px touch minimum — invisible when reading the code, obvious when
measuring the DOM.

## Migrations

Run against local PostgreSQL 16 the way the Supabase SQL Editor runs them —
**one transaction, stop on first error** — because that is the failure mode that
matters:

```bash
psql -v ON_ERROR_STOP=1 --single-transaction -d liblearn_test -f supabase/migrations/0002_curriculum.sql
```

Verified: 24 tables, RLS on all, idempotent on re-run.

This caught a real bug before it shipped: `format('%L')` on a policy name
produced `create policy 'topics: public read'` — a syntax error that aborted the
whole migration and left the database with none of its tables.

Provenance enforcement is tested in both directions:

- `official` with no source → rejected by CHECK
- `official` citing a source with status `located` → rejected by trigger, with a
  message naming the status
- the same insert after the source is marked `reviewed` → accepted

And the consistency view is tested by deliberately introducing a disagreement
between `questions.correct_answer` and `question_options.is_correct`, confirming
it is reported, then confirming it returns zero rows once corrected.

## AI tutor

Verified against the live Gemini API, not mocked:

- explain, Grade 8 → real answer, ends cleanly
- **homework guard → 0/4 leaked** the final answer (was 1/4 before the prompt was
  tightened, 2/4 with thinking disabled)
- curriculum honesty → states it does not have the official WASSCE syllabus and
  refers the student to their teacher

## What is not tested

- **Anything requiring a live Supabase connection.** `*.supabase.co` is
  unreachable from the build environment, so the Supabase repository code path
  has been type-checked and reviewed but never executed. This is the largest
  gap and the first thing to exercise once the deployed app can connect.
- The deployed Netlify site (`*.netlify.app` is likewise blocked).
- Google OAuth.
