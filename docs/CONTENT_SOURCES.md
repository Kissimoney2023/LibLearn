# Content Sources

Every claim LibLearn makes about Liberian education must be traceable to a
document in `src/data/sources.ts` (mirrored into `content_sources` by migration
0002), and every document records **how far it has actually been checked**.

## The status ladder

| Status | Means |
| --- | --- |
| `located` | We know the document exists and where. **Nobody has read it.** |
| `verification-required` | Identified, and something about it needs checking before use |
| `reviewed` | A person has opened and read it |
| `verified` | Read and its content confirmed against LibLearn's records |
| `superseded` | Replaced by a newer document |

The distinction between `located` and `reviewed` is the entire point. Knowing a
PDF exists at a URL tells you nothing about what is on a Grade 11 syllabus. A
document you have only seen the title of cannot support a claim about content.

## Current register

| Source | Organisation | Status |
| --- | --- | --- |
| [MoE Curriculum Download](https://moe.gov.lr/curriculum-download/) | Ministry of Education | `located` — **start here** |
| National Curriculum (2011) | Ministry of Education (via UNESCO IBE) | `located` |
| National Curriculum Grades 10–12: Mathematics | Ministry of Education (via UNESDOC) | `located` — highest priority |
| Education Sector Plan 2022 | Ministry of Education | `located` |
| [WAEC](https://www.waec.org/) | WAEC | `located` |
| WAEC Liberia | WAEC | `verification-required` |
| [MCSS](https://mcssschools.com/) | Monrovia Consolidated School System | `located` |
| Reported 2026 WASSCE subject expansion | Ministry of Education | `verification-required` — owner-reported |

**Nothing is `reviewed`.** Every host was blocked by the build environment's
network egress proxy, so no document has been opened by anyone working on
LibLearn through this channel. Consequently every lesson is `liblearn`
provenance and nothing claims `official`.

The live register is rendered on the app's `/about` page, so it stays accurate
without anyone remembering to update this file.

## Two specific cautions

**WAEC material is usually about another country.** Most syllabus material
findable online describes the **Nigerian or Ghanaian** examination. "9
subjects", "Civic Education" and "trading subject" are Nigerian conventions.
Applying them to Liberia would produce a plausible, confident, wrong answer.
Liberian requirements must come from a Liberia-specific WAEC publication.

**The 2026 WASSCE expansion is owner-reported.** It was relayed to LibLearn by
the project owner, not read here from a primary document. It is recorded so it
is not lost, and held at `verification-required` so it cannot drive content. If
accurate it matters a great deal — an expanded subject list changes which
subjects LibLearn should offer at Grades 10–12, and a stale list sends students
to revise the wrong subjects.

## Promoting a source, and what it unlocks

```sql
update content_sources
   set verification_status = 'reviewed',
       last_verified_at    = now(),
       notes               = 'Read by <name> on <date>. Covers <what>.'
 where id = 'moe-mathematics-10-12';
```

Only then may content cite it with `official` provenance. This is enforced by a
database trigger, not by convention — an `official` row citing a `located`
source is rejected with a message naming the status.

## The standard being applied

A student in Monrovia revising from a topic list somebody guessed at, sitting an
examination that was misdescribed to them, is worse off than a student who saw
an empty subject and asked their teacher.

An empty subject is recoverable. A confidently wrong syllabus is not.
