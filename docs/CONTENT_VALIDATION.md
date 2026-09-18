# Content validation

```bash
npm run validate:curriculum
```

Exits non-zero on any error. Warnings do not fail the run.

## What it checks

**Structure** — duplicate ids; orphaned topics, lessons, questions and quizzes;
invalid grades and subjects; quizzes referencing questions that do not exist;
missing answers and explanations.

**Provenance** — `official`/`verified` content must cite a source, and that
source must have been reviewed. Sources awaiting review are counted and
reported.

**Note alignment** — the full table is in
[NOTE_TO_QUIZ_ALIGNMENT.md](NOTE_TO_QUIZ_ALIGNMENT.md). In short: every question
must trace to a real section of its own lesson's Note; no quiz may contain a
question belonging to a different lesson; no `NEEDS_VERIFICATION` question may
appear in a quiz; every quiz's Note must be `published`.

**Coverage** — a table of topics, lessons, questions and subjects per grade, and
lesson provenance totals.

## Sample output

```
Note alignment
  Notes built:             60
  Questions traced:        163/164
  NEEDS_VERIFICATION:      1
  Taught but no objective: 2

  NEEDS_VERIFICATION (kept out of quizzes, never guessed):
    ? q-alg-7: Solving with the variable on both sides is not taught by any
      Grade 8 algebra lesson.
```

## The database checks independently

Application validation can be skipped; a row written straight to Postgres would
bypass it. So the same rules exist in SQL:

- `question_note_alignment_gaps` — questions with no lesson, no Note, no cited
  section, or a citation that does not resolve.
- `question_option_mismatches` — answer key disagreeing with the options.
- CHECK constraints and the provenance trigger described in
  [CONTENT_SOURCE_POLICY.md](CONTENT_SOURCE_POLICY.md).

Run them after any manual import:

```sql
select * from question_note_alignment_gaps;
select * from question_option_mismatches;
```

Both should return zero rows, except the recorded `NEEDS_VERIFICATION` entries.

## Unit tests

```bash
npx tsx src/lib/curriculum/breaker.test.ts        # 11 checks
npx tsx src/lib/curriculum/availability.test.ts   # 11 checks
npx tsx src/lib/recommend.test.ts                 # 21 checks
```

## Adding content

Do not mass-generate. The order matters:

1. Verify the curriculum structure against a source.
2. Create the lesson framework.
3. Write the **Note**.
4. Validate the Note.
5. Write questions **from the Note**, recording the section each one cites.
6. Validate alignment.
7. Publish.

A quiz cannot be built before its Note exists — the validator rejects a quiz
whose Note is not `published`.
