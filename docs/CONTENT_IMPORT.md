# Content import

Adding curriculum is a **data operation**. No code change, no redeploy.

## Layout

```
curriculum-data/
  grades/
    grade-11/
      mathematics.json
      biology.json
      ...
```

Each file carries its grade, subject, units, topics, lessons, Notes and
questions, with `curriculum_version_id` and `source_id` preserved on every
record.

## Three routes in

**1. Generated seed SQL** — for the Supabase SQL editor, no tooling required:

```bash
npx tsx scripts/generate-seed-sql.ts
# → supabase/seed/0001_curriculum_seed.sql
```

Generated, never hand-edited, so the database seed and the bundled corpus cannot
drift. Every row upserts on its primary key, so re-running is safe and a
half-finished paste can simply be run again.

**2. The importer** — for a checkout with a service-role key:

```bash
npx tsx scripts/import-curriculum.ts
```

Validates everything **before** writing anything. A half-imported subject
renders as empty screens rather than errors, so nobody notices until a student
does. It exits non-zero on bad content rather than writing it.

**3. Export** — round-trips the bundled corpus back out to JSON:

```bash
npx tsx scripts/export-curriculum.ts
```

## Order of operations

Foreign keys mean order matters:

```
curriculum_versions → content_sources → education_levels → grades
  → subjects → units → topics → [subtopics] → lessons
  → lesson_notes → questions → quizzes → quiz_questions
```

The generated seed emits them in exactly this order. Notes come after lessons
(they reference one) and before questions (which reference a Note).

## Never mass-generate

Do not ask a model for "ten questions about Mathematics" and import the result.
Load the Note, read its objectives, key concepts and worked examples, and write
questions **only** from those — recording which section supports each one.

A question with no recorded support is `NEEDS_VERIFICATION`. It is kept out of
quizzes, and the reason is written down. It is never guessed at.

## After importing

```sql
select * from question_note_alignment_gaps;   -- expect only recorded gaps
select * from question_option_mismatches;     -- expect zero rows
select distinct grade from lessons where review_status = 'published' order by grade;
```

Then `npm run validate:curriculum` against the bundled corpus, so the two
sources of content stay in agreement.
