# Content Pipeline

Adding curriculum is a **data operation**. No code changes, no redeploy, no
developer.

```
curriculum-data/grades/grade-11/mathematics.json
        │
        ├── npx tsx scripts/import-curriculum.ts --dry-run   validate only
        │
        └── npx tsx scripts/import-curriculum.ts             validate and write
                    │
                    └── Supabase → app (no rebuild)
```

## Format

One file per subject per grade. Full schema and a worked example in
[`curriculum-data/README.md`](../curriculum-data/README.md).

The files under `curriculum-data/` are generated from the bundled corpus by
`scripts/export-curriculum.ts`, so the documented format and the real content
are the same thing rather than documentation that drifts.

## Validation

**Everything is validated before anything is written.** A half-imported subject
is worse than a failed import: it leaves topics whose lessons are missing and
quizzes whose questions are absent, and those render as *empty screens rather
than errors*, so nobody notices until a student does.

Rejected (exit code 1, so it gates CI):

- Unknown `subjectId`, `topicId`, `unitId`, `curriculumVersionId`
- Duplicate ids, within a file or across files
- A quiz referencing a missing question
- `correctAnswer` out of range, or duplicate options
- A question with no explanation — students read it after answering, so it is
  the teaching, not metadata
- A lesson with no objectives or sections
- `provenance: official`/`verified` without a `sourceId`, or citing a source
  nobody has read

Warned (not fatal): a topic with no lessons, which would render empty.

## Two other scripts

```bash
npx tsx scripts/validate-curriculum.ts   # integrity of the bundled corpus
npx tsx scripts/export-curriculum.ts     # bundled corpus → curriculum-data/
```

## Promoting content to `official`

1. A person opens the Ministry document and reads it.
2. Mark the source reviewed:
   ```sql
   update content_sources
      set verification_status = 'reviewed', last_verified_at = now(),
          notes = 'Read by <name> on <date>. Covers <what>.'
    where id = 'moe-mathematics-10-12';
   ```
3. Set `"provenance": "official"` and `"sourceId"` in the JSON and re-import.

Step 1 cannot be skipped: the database trigger rejects the write.

## Two backends, one seam

`src/lib/curriculum` exposes selectors; routes import from there and never from
a data module.

- **bundled** — from the JS bundle. Always works, offline, no configuration.
  Content changes need a rebuild.
- **supabase** — from Postgres. Content changes appear with no rebuild.

Supabase is used when configured. **On a database failure it falls back to
bundled content with a visible banner** — a student on a dropping connection is
better served by lessons already shipped than by a retry button, but degrading
*quietly* would leave someone revising a stale corpus unaware.

Curriculum loads once per grade, so subject → unit → topic → lesson touches no
network. Scoped to one grade deliberately: a student uses one, and downloading
the other eleven wastes data they pay for.
