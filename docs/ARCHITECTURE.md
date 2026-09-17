# Architecture

React 19 + Vite 6 + TypeScript (strict). **Not Next.js.** React Router 7,
Tailwind 4 with `@theme` tokens, Supabase for auth and Postgres, Gemini for the
tutor behind a server function.

## Layers

```
routes/          screens. Import selectors, never data modules.
context/         Auth, StudentData, Curriculum — the three providers
lib/curriculum/  THE SEAM: one interface, two backends (bundled | supabase)
lib/store.ts     student records, with the same two-backend pattern
data/seed/       bundled curriculum corpus (the offline floor)
server/tutor.ts  tutor logic, shared by every runtime
```

## The curriculum seam

The single most important structural decision. Twelve route files used to import
seed modules directly, so there was nowhere to put a database.

Now `src/lib/curriculum` exposes selectors and routes import only from there.
Swapping bundled content for Postgres touched no route.

- **bundled** — always works, offline, no configuration. The floor.
- **supabase** — content changes appear with no rebuild.

A database failure falls back to bundled content **with a visible banner**. On a
dropping connection, lessons already shipped beat a retry button — but degrading
silently would leave a student revising a stale corpus unaware.

Curriculum loads **once per grade**. Navigating subject → unit → topic → lesson
touches no network. Scoped to one grade deliberately: a student uses one, and
downloading the other eleven wastes data they pay for.

`GradeScope` owns loading/error/offline for every Learn screen, so those states
stay distinct instead of collapsing into one "nothing here" message.

## One tutor, three runtimes

`server.ts` (local Express), `netlify/functions/tutor.mts` and `api/ai/tutor.ts`
all delegate to `handleTutorRequest` in `server/tutor.ts`.

The homework guard and the curriculum disclaimer are the product's safety
surface. Duplicating them across three entry points is how they drift apart.

## Derived, never stored

Continue Learning and all progress percentages are computed from records, not
persisted. A stored "current lesson" is a second source of truth that drifts the
moment a lesson is completed somewhere that forgets to update it.

Continue Learning reports **topic** completion, not a percentage through the
lesson text — reading position is not measured, and claiming "45% through" would
be a fabricated number.

## Provenance

Four tiers (`official` / `verified` / `liblearn` / `ai-generated`), a source
registry, curriculum versions, a badge on every lesson, and enforcement in the
database rather than in convention. See [CURRICULUM.md](CURRICULUM.md).

## Low bandwidth

Text-first lessons, no video dependency, 18 lazy routes, one request per grade,
hashed immutable assets, a service worker caching the app shell, and fonts with
`display=swap` so text renders immediately on a slow link.

## Ready for later waves, not built now

`UserRole` already carries teacher/parent/school_admin/super_admin, and RLS is
structured around ownership, so Phase 5 portals need no migration of existing
rows. Lessons and questions carry `review_status` (draft → in-review → verified
→ published), so a content-management UI has a pipeline to drive. Only
`published` content reaches students.
