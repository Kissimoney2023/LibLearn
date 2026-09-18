# Curriculum architecture

## The chain

```
OFFICIAL CURRICULUM (versioned, sourced)
   ↓
GRADE  →  SUBJECT  →  UNIT  →  TOPIC  →  [SUBTOPIC]  →  LESSON
                                                          ↓
                                                        NOTE  ← source of truth
                                                          ↓
                                    LEARNING OBJECTIVES · EXAMPLES
                                                          ↓
                                              PRACTICE  ·  QUIZ
                                                          ↓
                                                       RESULT
                                                          ↓
                                            PROGRESS  ·  RECOMMENDATION
                                                          ↓
                                                      AI TUTOR (grounded)
```

Everything below `NOTE` is generated **from** the Note and traceable back to it.
See [NOTE_TO_QUIZ_ALIGNMENT.md](NOTE_TO_QUIZ_ALIGNMENT.md).

## Tables (25)

**Curriculum spine** — `education_levels`, `grades`, `curriculum_versions`,
`curriculum_subjects`, `subjects`, `units`, `topics`, `subtopics`, `lessons`,
`lesson_notes`, `learning_objectives`, `glossary_terms`

**Assessment** — `questions`, `question_options`, `quizzes`, `quiz_questions`,
`quiz_attempts`, `quiz_answers`, `exam_attempts`

**Student** — `profiles`, `lesson_progress`, `bookmarks`, `recent_activity`,
`student_achievements`

**Provenance** — `content_sources`

Row-level security is enabled on every one.

## The seam

`src/lib/curriculum/index.ts` is the only module the UI imports curriculum from.
Behind it sit two interchangeable backends implementing one interface:

- `bundled.ts` — the offline floor. Always works: no network, no Supabase, no
  configuration. A student who has opened LibLearn once can study on a bus.
- `supabaseRepo.ts` — Postgres. Loading a grade into the database makes it
  appear in the app with no rebuild and no deploy.

Availability is the **union** of both, so the app can only ever offer more than
the bundle alone, never less. A database failure falls back to bundled content
with a *visible* warning — degrading quietly would leave someone studying stale
material without knowing.

A circuit breaker (`breaker.ts`, 30s cooldown, injected time for testing) stops
every navigation retrying a failing database during an outage.

## Scoping

Curriculum is loaded **one grade at a time**, not all twelve. A student uses one
grade; downloading the other eleven wastes data they are paying for. Once a
grade is loaded, moving subject → unit → topic → lesson touches no network.

Two scopes exist:

- `GradeScope` — `/learn/:grade/*`, loads the grade in the URL.
- `QuizScope` — `/quiz/:quizId`, loads **the quiz's own grade**. Scoping this to
  the student's grade was a real bug: Learn lets a student browse any grade, so
  a Grade 12 student opening a Grade 4 quiz was told "Quiz not found" about a
  quiz that plainly exists.

## jsonb next to relational tables

Deliberate, not laziness. Note sections and key terms are *documents* and are
always read as a whole lesson — one row, one request, which matters on a slow
connection. The normalised tables are the *query* path and give an objective its
own `source_id`.

Duplicated truth drifts, so `question_option_mismatches` reports any question
whose `correct_answer` disagrees with its options, and
`question_note_alignment_gaps` reports any question that cannot be traced to a
Note section.

## Prepared, deliberately not built

`UserRole` and review statuses already exist, so teacher/parent/school portals,
admin content management and the exam engine need no migration to begin. The AI
Tutor's grounding context (grade, subject, unit, topic, lesson, Note, objectives,
recent results, weak objectives) is all queryable today.
