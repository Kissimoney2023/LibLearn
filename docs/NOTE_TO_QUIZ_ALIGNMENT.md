# Note → Quiz alignment

**The rule this document exists to enforce:**

> A question may only assess something its lesson's Note actually teaches.

Everything else here is machinery for making that rule checkable by a machine
rather than by good intentions.

## Why it needs machinery

A quiz that drifts from its lesson fails invisibly. Nothing crashes. The student
reads a lesson, takes its quiz, gets a question about something they were never
shown, and concludes they are bad at the subject. The content looks fine in
review because the question is *correct* — it is just not *taught*.

This actually happened in this repository. The Grade 8 "Algebra Check" quiz sat
on lesson 2 (solving equations) and asked about **coefficients**, taught in
lesson 1, and **expanding brackets**, taught in lesson 3. Two of its five
questions assessed material the student had not opened. Nobody noticed until
the alignment check existed, because there was nothing to notice *with*: a
question linked to a *topic*, and the topic contained all three lessons.

## The model

```
LESSON ── has one ──▶ NOTE ── has many ──▶ SECTION (stable key)
                                              ▲
                                              │ cites
QUIZ ── contains ──▶ QUESTION ────────────────┘
```

- A **Note** is the teaching content of a lesson, given an identity and a
  version. It is derived from the lesson rather than copied beside it, because
  two copies of the same prose drift and a citation into drifted prose means
  nothing.
- A **section key** is slugified from the heading (`"The four places"` →
  `the-four-places`). Editing a section's prose keeps every citation intact.
  *Renaming* the heading breaks them — deliberately, because a renamed section
  is a changed section and its questions need re-checking.
- A **question** records `lessonId`, `noteSection` and `objectiveId`.

## Where the trace lives

`src/data/seed/alignment.ts` — one entry per question, authored by hand:

```ts
'q11-quad-2': {
  lessonId:    'g11-math-quadratics-l1',
  noteSection: 'factorising',
  objectiveId: 'o2',
},
```

It is applied in one place (`src/data/seed/questions.ts`) rather than written
into each question file, so a new question cannot quietly ship without a trace:
anything missing from the map arrives with no `lessonId` and the validator
reports it.

## Null is a real answer

```ts
'q-alg-7': {
  lessonId: 'g8-math-algebra-l2',
  noteSection: null,
  objectiveId: null,
  gap: 'Solving with the variable on both sides is not taught by any Grade 8 algebra lesson.',
},
```

`noteSection: null` means **nobody has established** which part of the Note
supports this question. It is reported as `NEEDS_VERIFICATION` and **kept out of
every quiz**. It is never guessed at. A `gap` explaining why is required — the
validator errors if a null arrives without a reason.

`objectiveId: null` means the question tests something true and taught that no
learning objective covers. That is a finding about the *objectives*, not the
question.

## What the validator checks

`npm run validate:curriculum`

| Check | Failure means |
| --- | --- |
| Every question has an alignment entry | Untraceable question |
| Its lesson exists, and matches the question's grade and subject | Mis-filed question |
| Its `noteSection` is a real key in that lesson's Note | Citation rotted, or wrong |
| Its `objectiveId` exists on that lesson | Objective renamed or wrong |
| A null `noteSection`/`objectiveId` carries a `gap` | Unexplained gap |
| **Every question in a quiz is aligned to that quiz's own lesson** | The Grade 8 bug |
| No `NEEDS_VERIFICATION` question appears in any quiz | Assessing the unverified |
| Every quiz's Note is `published` | Quizzing from draft material |
| Every objective is assessed by something | Incomplete blueprint (warning) |

The database carries the same rule independently, in the
`question_note_alignment_gaps` view, so a row written directly to Postgres
cannot bypass the check that application code enforces.

## What a student sees

On the results screen, every question names the section that teaches it:

> Taught in **"Factorising"** · [Review this section]

The link goes to `?lesson=<id>&section=<key>`, which opens the lesson scrolled
to that exact section with it highlighted — *"here is the part you missed"*,
not *"here is the lesson"*.

## Current state

- **164 of 164** questions traced to a Note section.
- **0** `NEEDS_VERIFICATION`.
- **1** question tests content no learning objective covers, recorded with a
  reason (`q3-mul-3`, commutativity).
- **40 of 176** objectives are taught but never assessed — reported as
  warnings. These are gaps in the quiz blueprint, not defects in existing
  questions, and closing them is the next content task.

The last `NEEDS_VERIFICATION` closed when the Grade 8 algebra lessons were
rewritten: `q-alg-7` asks about solving with the variable on both sides, which
no lesson taught. Lesson 2 now teaches it in its own section under a new
objective, so the question became assessed learning instead of being deleted or
quietly waved through.
