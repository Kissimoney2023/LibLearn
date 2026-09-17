# Database

PostgreSQL via Supabase. Three migrations, applied in order, each safe to re-run.

| File | Contents |
| --- | --- |
| `0001_init.sql` | Student records: profiles, lesson_progress, quiz_attempts, exam_attempts, student_achievements |
| `0002_curriculum.sql` | Curriculum + provenance: sources, versions, levels, subjects, units, topics, lessons, questions, quizzes, glossary, bookmarks |
| `0003_wave2.sql` | Grades, subtopics, learning_objectives, question_options, quiz_answers, recent_activity |

24 tables, **row-level security on every one**.

## The two access rules

**Student data: own rows only.** `auth.uid() = user_id`, enforced by policy.

**Curriculum: readable by all, writable by none.** The policies grant `select`
and nothing else. Content is written by `service_role`, which bypasses RLS —
and is why that key must never reach a browser. A student who could write these
tables could edit the answer keys.

## Provenance, enforced by the database

Two mechanisms, because application code can be bypassed and constraints cannot:

1. **CHECK constraint** — a lesson or question with provenance `official` or
   `verified` must have a `source_id`.
2. **Trigger** (`enforce_source_reviewed`) — that source must have
   `verification_status` of `reviewed` or `verified`.

The trigger is the one that matters. Without it, citing the real 2011 Ministry
curriculum — correctly recorded, but which nobody has opened — would pass every
other guard and present guessed content to students as official.

```
insert ... provenance='official', source_id='moe-mathematics-10-12'
ERROR: provenance "official" cites source "moe-mathematics-10-12" with status
       "located". A document nobody has read cannot support an official claim.
```

To lift it, a person reads the document and then:

```sql
update content_sources
   set verification_status = 'reviewed', last_verified_at = now(),
       notes = 'Read by <name> on <date>.'
 where id = 'moe-mathematics-10-12';
```

## jsonb next to normalised tables

Lessons hold `objectives`, `sections` and `key_terms` as jsonb, and there are
also `learning_objectives` and `question_options` tables. This is deliberate,
not duplication by accident:

- **jsonb is the read path.** A lesson is always read whole, so it is one row
  and one request. On a slow connection that is the difference between a lesson
  opening and a lesson hanging.
- **The tables are the query path.** "Which lessons cover this objective?" and
  "which distractor do students pick?" are not jsonb questions. An objective
  also gets its own `source_id`, so one taken from a Ministry document is
  traceable independently of the lesson teaching it.

Duplicated truth drifts, so `question_option_mismatches` exists as a view:

```sql
select * from question_option_mismatches;   -- expect zero rows
```

It reports any question whose `correct_answer` disagrees with its options'
`is_correct`. Better found by a query than by a student marked wrong on a
correct answer.

## Conventions, several learned the hard way

- **snake_case columns**, camelCase in the client. Supabase returns columns
  exactly as named, so `row.subjectId` is silently `undefined` rather than an
  error — every mapper is explicit for that reason.
- **text + CHECK, not enums.** A new provenance tier or exam type is a value,
  not an `ALTER TYPE`.
- **FKs to `auth.users` are deferred into guarded blocks.** That reference needs
  a privilege the migrating role may not hold, and the SQL Editor runs a file as
  ONE transaction — a single refused statement rolls back every table above it
  and leaves the database looking as though the migration never ran. RLS, not
  the FK, enforces ownership; the FK only adds cascade-on-delete.
- **`format('%I')` for identifiers, never `%L`.** A policy name is an
  identifier. `%L` produced `create policy 'topics: public read'`, a syntax
  error that aborted all of 0002 on first run.

## Testing a migration before it touches a real project

Run it against local PostgreSQL the way the SQL Editor runs it — one
transaction, stop on error:

```bash
psql -v ON_ERROR_STOP=1 --single-transaction -d liblearn_test -f supabase/migrations/0002_curriculum.sql
```

This is how the `%L` bug was caught. It needs a small shim for what Supabase
provides (`auth.users`, `auth.uid()`, the anon/authenticated/service_role
roles).

## Indexes

Every index backs a query the app actually makes: browsing by grade and subject,
opening a topic, assembling a quiz, the activity feed (`user_id, created_at
desc`), and Continue Learning (`user_id, last_viewed_at desc`).
