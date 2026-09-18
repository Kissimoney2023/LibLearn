-- THE NOTE ENGINE.
--
-- The Note is the source of truth for what a lesson teaches. Everything a
-- student is assessed on must be traceable back to a section of it.
--
-- Until now a lesson's teaching content lived in lessons.objectives /
-- lessons.sections / lessons.key_terms, and questions linked only to a TOPIC.
-- That left the central question of this curriculum model unanswerable:
--
--     "Which part of the lesson supports this answer?"
--
-- A topic link cannot answer it. A topic may hold several lessons, and a lesson
-- holds many sections. So a question could look aligned while testing something
-- the student was never taught, and nobody could tell without reading both.
--
-- This migration makes the Note a first-class, separately versioned record and
-- gives every question a trace to the exact section that supports it.
--
-- WHY A SEPARATE TABLE RATHER THAN MORE COLUMNS ON lessons
--
--   - A Note is versioned independently of the lesson. Rewriting a Note must
--     not silently change what an in-flight student attempt was assessed
--     against, so old versions are kept rather than overwritten.
--   - A Note has its own review lifecycle. A lesson can exist while its Note is
--     still in draft, and only a published Note may be taught from.
--   - Questions reference the Note, not the lesson. That is what makes
--     "regenerate the quiz when the Note changes" a decidable operation.

-- ------------------------------------------------------------- lesson_notes

create table if not exists public.lesson_notes (
  id                    text primary key,
  lesson_id             text not null references public.lessons(id) on delete cascade,

  title                 text not null,

  -- Structured sections, NOT one giant text field. Each carries a stable `key`
  -- that questions reference in questions.note_section, which is what makes the
  -- trace survive an edit to the section's prose or its heading.
  --
  -- Shape: [{key, heading, body, example?, kind}]
  -- kind is one of: introduction | objectives | main | key_concepts | example |
  --                 worked_example | terms | practice | quick_check |
  --                 common_mistakes | summary | remember
  introduction          text not null default '',
  main_content          jsonb not null default '[]'::jsonb,
  key_terms             jsonb not null default '[]'::jsonb,
  examples              jsonb not null default '[]'::jsonb,
  worked_examples       jsonb not null default '[]'::jsonb,
  important_points      jsonb not null default '[]'::jsonb,
  common_mistakes       jsonb not null default '[]'::jsonb,
  summary               text not null default '',
  study_tips            text not null default '',

  -- Provenance travels with the Note, because the Note is what a student reads.
  -- A LibLearn Note must never be able to present itself as a Ministry document.
  source_type           text not null default 'LIBLEARN'
                          check (source_type in
                            ('MINISTRY_OF_EDUCATION','WAEC','OFFICIAL_GOVERNMENT','MCSS',
                             'TEXTBOOK','TEACHER_GUIDE','OTHER_AUTHORITY','LIBLEARN','AI_GENERATED')),
  source_id             text references public.content_sources(id) on delete set null,
  curriculum_version_id text references public.curriculum_versions(id) on delete set null,

  -- Monotonic per lesson. v1, v2, ... Never reused, never rewritten in place.
  version               smallint not null default 1 check (version > 0),

  status                text not null default 'draft'
                          check (status in
                            ('draft','review','verified','published','archived','needs_verification')),

  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  -- Same rule as lessons: only LibLearn-authored or AI material may omit a
  -- source. Anything claiming an outside authority must cite one.
  constraint lesson_notes_authority_needs_source
    check (source_type in ('LIBLEARN','AI_GENERATED') or source_id is not null),

  -- One row per lesson per version.
  constraint lesson_notes_lesson_version_unique unique (lesson_id, version)
);

create index if not exists lesson_notes_lesson_idx on public.lesson_notes (lesson_id);
create index if not exists lesson_notes_status_idx on public.lesson_notes (status);

-- At most one PUBLISHED note per lesson. Two published notes would make
-- "the Note for this lesson" ambiguous, and every question trace with it.
create unique index if not exists lesson_notes_one_published_per_lesson
  on public.lesson_notes (lesson_id)
  where status = 'published';

-- --------------------------------------------- the question -> Note trace

alter table public.questions
  add column if not exists lesson_id text references public.lessons(id) on delete cascade;

alter table public.questions
  add column if not exists note_id text references public.lesson_notes(id) on delete set null;

-- The `key` of the note section that supports the answer. Nullable ON PURPOSE:
-- a question whose support has not been established is NEEDS_VERIFICATION, and
-- the honest representation of "nobody has checked this" is an empty column,
-- not a guess. The validator reports these; it does not invent them.
alter table public.questions
  add column if not exists note_section text;

-- Which learning objective the question assesses. This is what lets a result
-- say "you are weak on objective 2" rather than only "you scored 3/5".
alter table public.questions
  add column if not exists objective_id text;

create index if not exists questions_lesson_idx on public.questions (lesson_id);
create index if not exists questions_note_idx on public.questions (note_id);

-- ------------------------------------------------------ quizzes -> Note

alter table public.quizzes
  add column if not exists note_id text references public.lesson_notes(id) on delete set null;

create index if not exists quizzes_note_idx on public.quizzes (note_id);

-- ------------------------------------------------------------------- RLS

alter table public.lesson_notes enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'lesson_notes'
      and policyname = 'lesson_notes: public read published'
  ) then
    -- Students read PUBLISHED notes only. Draft and in-review teaching material
    -- is visible to whoever is editing it, not to a child revising for an exam.
    execute format(
      'create policy %I on public.lesson_notes for select using (status = %L)',
      'lesson_notes: public read published', 'published'
    );
  end if;
end $$;

-- No insert/update/delete policy is created, so writes are refused for every
-- role except service_role, which bypasses RLS. A student who could write here
-- could rewrite the lesson their own quiz is graded against.

-- --------------------------------------------------------------- audit view

-- Questions that cannot be traced back to a section of their lesson's Note.
-- This is the query the content audit is built on: anything listed here is
-- NEEDS_VERIFICATION and must not be presented as assessed learning.
create or replace view public.question_note_alignment_gaps as
select
  q.id            as question_id,
  q.grade,
  q.subject_id,
  q.topic_id,
  q.lesson_id,
  q.note_id,
  q.note_section,
  case
    when q.lesson_id   is null then 'no lesson'
    when q.note_id     is null then 'no note'
    when q.note_section is null then 'no note section'
    else 'section not found in note'
  end as gap
from public.questions q
left join public.lesson_notes n on n.id = q.note_id
where q.lesson_id is null
   or q.note_id is null
   or q.note_section is null
   or not exists (
        select 1
        from jsonb_array_elements(coalesce(n.main_content, '[]'::jsonb)) s
        where s->>'key' = q.note_section
      );
