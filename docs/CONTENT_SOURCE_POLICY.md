# Content source policy

## The rule

> LibLearn must never present its own material as a Ministry of Education
> document.

The Ministry of Education is the authoritative source for Liberia's national
curriculum. LibLearn is not, and nothing it writes becomes official by being
well written or confidently formatted.

## Provenance tiers

Every student-facing item carries one:

| Tier | Means | May claim a source? |
| --- | --- | --- |
| `official` | Reproduced from an official curriculum document | **Must** cite a reviewed source |
| `verified` | Checked against an outside authority | **Must** cite a reviewed source |
| `liblearn` | Written by LibLearn | No source required |
| `ai-generated` | Machine-drafted explanation | No source required |

Note source types are the longer list the spec requires:
`MINISTRY_OF_EDUCATION`, `WAEC`, `OFFICIAL_GOVERNMENT`, `MCSS`, `TEXTBOOK`,
`TEACHER_GUIDE`, `OTHER_AUTHORITY`, `LIBLEARN`, `AI_GENERATED`.

## Enforced by the database, not by convention

Application code can be bypassed. A CHECK constraint cannot:

```sql
constraint lessons_official_needs_source
  check (provenance in ('liblearn','ai-generated') or source_id is not null)
```

and a trigger requires that the cited source has actually been **read**, not
merely located. A document nobody has opened cannot back an `official` claim.

## Verification ladder

```
located → reviewed → verified
                  ↘ superseded
                  ↘ verification-required
```

A source moves past `located` only when a human has opened it and recorded what
it says.

## Current state, stated plainly

**Nothing in this corpus claims `official`.** All 60 lessons are `liblearn`
provenance on curriculum version `liblearn-v1` with no `source_id`.

The Ministry curriculum volumes were located, but `moe.gov.lr`,
`mcssschools.com`, `ibe.unesco.org` and `unesdoc.unesco.org` are all blocked by
the build environment's egress policy, so **their contents have not been read**.
All 8 registered sources sit at `located` or `verification-required`. None is
`reviewed`.

That is why no lesson claims official standing, and why no question carries an
`examGoal`: LPSCE, LJHSCE and WASSCE are real examinations, but LibLearn holds
no verified syllabus for any of them, so tagging a question to one would assert
a mapping nobody has checked.

The reported 2026 WASSCE subject expansion is recorded at
`verification-required` and attributed as owner-reported. A stale subject list
would send students to revise the wrong subjects.

## What the student sees

Under every Note:

> **Curriculum source**
> Content: LibLearn Learning Material
> Curriculum version: liblearn-v1
> Note version: v1
>
> This lesson was written by LibLearn. It is not a Ministry of Education
> document and does not carry Ministry endorsement.

The disclaimer renders whenever `sourceType` is `LIBLEARN`. It is not optional
and not collapsed behind a toggle.

## Content that cannot be verified

Mark it `NEEDS_VERIFICATION`. Do not guess.

This applies especially to Liberian specifics — towns, counties, distances,
institutions, examination rules. Where a lesson needs a concrete setting and
none has been verified, it uses an **invented** one and says so: the Grade 3 and
Grade 4 map lessons teach direction-finding with a village that does not exist,
because naming a real place would assert geography nobody here has checked, and
a child cannot tell a checked fact from a confident guess.
