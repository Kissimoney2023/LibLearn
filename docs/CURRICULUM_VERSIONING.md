# Curriculum versioning

## Why versions exist

The Ministry of Education publishes curriculum in grade bands (1–6, 7–9, 10–12)
and has published a Draft Revised National Curriculum. **No curriculum version
is permanent.** A system that hardcodes "the curriculum" has to be rewritten
every time the real one changes.

So every grade, subject, unit, topic, lesson and Note can be associated with a
curriculum version, and more than one version can exist at a time.

## `curriculum_versions`

`id`, `name`, `description`, `version_label`, `source_id`, `source_url`,
`publication_date`, `effective_date`, `status`, timestamps.

Statuses: `official`, `revised`, `draft`, `reference`, `archived`,
`needs_verification`.

Registered today:

| id | status | why |
| --- | --- | --- |
| `lr-national-2011` | `reference` | Located, not read — blocked by egress |
| `liblearn-v1` | `reference` | LibLearn's own teaching sequence |

**Neither is `official-current`**, because no source backing either has been
reviewed.

## Note versions are separate

A Note carries its own `version`, monotonic per lesson, with a uniqueness
constraint on `(lesson_id, version)` and a partial unique index allowing **at
most one `published` Note per lesson**. Two published Notes would make "the Note
for this lesson" ambiguous, and every question citation with it.

Old versions are **kept, never rewritten**:

```
Quadratic Equations
  ├── note v1  (archived)   ← attempts made against this still resolve
  └── note v2  (published)
```

A student who started against v1 does not silently get v2's content mid-flight.
Changing a Note means publishing a new version and archiving the old one, not
editing in place.

## When a Note changes

1. Author v2. v1 stays.
2. Re-check every question citing v1's sections. A renamed section changes its
   key, so the validator fails loudly rather than letting a citation point at
   content that moved.
3. Publish v2; archive v1.
4. Existing quiz attempts keep resolving against the version they were taken on.

## Adding a new curriculum version

Adding one is a **data operation**: insert the version row, tag content with
`curriculum_version_id`, import. No migration, no code change, no redeploy. That
property is the reason the version table exists rather than a constant in the
source.
