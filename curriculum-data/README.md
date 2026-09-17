# curriculum-data

Curriculum as data files. Drop a JSON file here, run the importer, and the
content appears in the app. **No code changes, no redeploy, no developer.**

That is the whole point of this directory. Adding Grade 7 Chemistry should not
require anyone to touch TypeScript.

```
curriculum-data/
  grades/
    grade-07/
      mathematics.json
      biology.json
    grade-11/
      mathematics.json
```

## File format

One file per subject per grade. Everything except `units` is required.

```jsonc
{
  "grade": 11,
  "subjectId": "mathematics",
  "curriculumVersionId": "liblearn-v1",

  // Provenance for every record in this file.
  //   "official"     - reproduced from a government/Ministry/WAEC document
  //                    SOMEONE HAS READ. Requires sourceId.
  //   "verified"     - from a credible published source someone has read.
  //                    Requires sourceId.
  //   "liblearn"     - written for LibLearn. Academically standard, not a
  //                    claim about the Liberian curriculum.
  "provenance": "liblearn",
  "sourceId": null,

  "units": [
    {"id": "g11-math-u-algebra", "name": "Algebra",
     "summary": "Working with unknowns and equations.", "order": 1}
  ],

  "topics": [
    {"id": "g11-math-quadratics", "unitId": "g11-math-u-algebra",
     "name": "Quadratic Equations",
     "summary": "Equations where the unknown is squared.", "order": 1}
  ],

  "lessons": [
    {
      "id": "g11-math-quadratics-l1",
      "topicId": "g11-math-quadratics",
      "title": "Solving Quadratic Equations by Factorising",
      "estimatedMinutes": 15,
      "order": 1,
      "objectives": [{"id": "o1", "text": "Factorise a quadratic expression."}],
      "keyTerms": [{"term": "Root", "definition": "A value of x making the equation true."}],
      "sections": [
        {"heading": "Introduction", "body": "...", "example": "optional"}
      ]
    }
  ],

  "questions": [
    {
      "id": "q11-quad-1",
      "topicId": "g11-math-quadratics",
      "question": "Factorise x² + 5x + 6",
      "options": ["(x+1)(x+6)", "(x+2)(x+3)", "(x-2)(x-3)", "(x+5)(x+6)"],
      "correctAnswer": 1,
      "explanation": "Two numbers multiplying to 6 and adding to 5 are 2 and 3.",
      "difficulty": "core",
      "examGoal": "wassce"
    }
  ],

  "quizzes": [
    {"id": "quiz-g11-quadratics", "lessonId": "g11-math-quadratics-l1",
     "topicId": "g11-math-quadratics", "title": "Quadratic Equations Check",
     "questionIds": ["q11-quad-1"]}
  ]
}
```

## Importing

```bash
npx tsx scripts/import-curriculum.ts --dry-run          # validate only
npx tsx scripts/import-curriculum.ts                    # validate and write
npx tsx scripts/import-curriculum.ts curriculum-data/grades/grade-07
```

`--dry-run` is the default habit worth keeping: it reports every problem without
writing anything.

Importing needs `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the
environment. The service-role key bypasses row-level security, which is exactly
why curriculum can be written with it and why **it must never be committed, and
never given the `VITE_` prefix** — anything `VITE_*` is compiled into the
browser bundle and served to every visitor.

## What the importer refuses

Rejections are per record, and it tells you which file and which id:

- Unknown `subjectId`, `topicId`, `unitId` or `curriculumVersionId`
- Duplicate ids, within a file or against the database
- A quiz referencing a question that does not exist — this one is quiet in
  production, rendering as an empty quiz rather than an error
- `correctAnswer` outside the range of `options`
- A question with no explanation; students read it after answering, so it is
  the teaching, not metadata
- A lesson with no objectives or no sections
- **`provenance: "official"` or `"verified"` without a `sourceId`, or citing a
  source nobody has read** — a source stays `located` until a person opens the
  document and marks it `reviewed`

That last rule is also enforced by the database (a trigger in
`supabase/migrations/0002_curriculum.sql`), so it holds even if content is
loaded by some other route. Application checks can be bypassed; the trigger
cannot.

## Marking a source as read

When someone has actually read a Ministry document, in the SQL editor:

```sql
update content_sources
   set verification_status = 'reviewed',
       last_verified_at    = now(),
       notes               = 'Read by <name> on <date>. Covers <what>.'
 where id = 'moe-mathematics-10-12';
```

Only after this can content citing that source claim `official`. It is one
line, and it is the single highest-value action available in this project —
everything needed to act on it is already built and waiting.
