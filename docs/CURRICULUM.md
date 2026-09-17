# Curriculum

## The hierarchy

```
Education Level → Grade → Subject → Unit → Topic → [Subtopic] → Lesson → Objective
                                                        ↓
                                              Questions → Quiz → Attempt
```

Subtopics are optional. A topic without them is normal, not incomplete, and the
UI renders it without inventing an empty level.

Units render as **headed groups**, not another tap. The level belongs in the
data because curriculum documents use it; making a student walk through an extra
screen to reach a lesson would impose the data model on the reader.

Topics filed under no unit are still listed, under "Other topics". Content is
imported gradually and anything half-filed must stay reachable rather than
disappearing the moment its subject gains its first unit.

## Provenance — the part that matters for Liberia

| Tier | Meaning |
| --- | --- |
| `official` | Reproduced from a government / Ministry / WAEC document **someone has read** |
| `verified` | From a credible published source **someone has read** |
| `liblearn` | Written for LibLearn. Academically standard, not a claim about the Liberian curriculum |
| `ai-generated` | Produced by a model. Never persisted as curriculum without review |

**Everything currently shipped is `liblearn`. Nothing claims `official`.**

Not caution for its own sake. The Ministry curriculum volumes were located —
including *National Curriculum for Grades 10 to 12: Mathematics* — but every
host (`moe.gov.lr`, `ibe.unesco.org`, `unesdoc.unesco.org`, `mcssschools.com`)
is blocked by the build environment's network egress proxy, so **their contents
have not been read**. Knowing a document exists at a URL is not the same as
having read it, and a syllabus cannot be inferred from a title.

So every source is recorded `located`, never `reviewed`, and the database
refuses to let content cite an unread source as official.

### The WAEC trap

Most WAEC syllabus material findable online describes the **Nigerian or
Ghanaian** examination. "9 subjects", "Civic Education", "trading subject" are
Nigerian conventions. Applying them to Liberia would be a plausible, confident,
wrong answer.

LibLearn therefore states **no WASSCE subject requirement, grading scale or
entry rule**. A reported 2026 expansion of the Liberian WASSCE subject list is
recorded at `verification-required` and attributed as owner-reported, so it
cannot drive content until confirmed — a stale subject list would send students
to revise the wrong subjects.

### Why Civics teaches concepts

The Grade 11 Civics lesson covers what a constitution does and how separated
powers work. It does **not** assert specific provisions of Liberian law. A
constitutional detail misremembered in a civics lesson is one a student carries
into an examination.

### The standard being applied

A student in Monrovia revising from a topic list we guessed at, sitting an
examination we misdescribed, is worse off than a student who saw an empty
subject and asked their teacher. An empty subject is recoverable. A confidently
wrong syllabus is not.

## Current coverage

| Grade | Units | Topics | Lessons | Questions | Subjects |
| --- | --- | --- | --- | --- | --- |
| 6 | — | 1 | 1 | 3 | Mathematics |
| 8 | — | 4 | 6 | 15 | Maths, English, General Science |
| 10 | — | 1 | 1 | 3 | Biology |
| 11 | 10 | 10 | 11 | 34 | Maths, Biology, Chemistry, Physics, English, Civics |

Grades 1–5, 7, 9 and 12 have architecture but no content.

## Curriculum versions

| id | Status | Notes |
| --- | --- | --- |
| `lr-national-2011` | `reference` | The 2011 Ministry curriculum. Contents not yet read |
| `liblearn-v1` | `reference` | LibLearn's own teaching sequence. **Not a national curriculum** |

**No version is `official-current`.** Marking one would assert we know which
curriculum is in force today. We do not.

## Priority sources awaiting review

| Source | Why |
| --- | --- |
| [MoE Curriculum Download](https://moe.gov.lr/curriculum-download/) | **Start here.** The Ministry's own distribution point |
| National Curriculum Grades 10–12: Mathematics | Most directly relevant to Grades 10–12 |
| [WAEC](https://www.waec.org/) | Must be read for **Liberia** specifically |
| [MCSS](https://mcssschools.com/) | Implementation in practice; distinguish school-specific from national |

Reading the first of these is the highest-value action available in this
project. Everything needed to act on it is already built.
