-- LibLearn Wave 2: the rest of the learning schema.
--
-- Run AFTER 0001_init.sql and 0002_curriculum.sql.
--
-- 0001 = student records. 0002 = curriculum + provenance. This adds what Wave 2
-- needs: the finer curriculum levels (grades, subtopics, normalised objectives
-- and options), the quiz record at answer granularity, and the activity stream
-- that powers Recent Activity and Continue Learning.
--
-- Same conventions as 0002, and the same hard-won rules:
--   * snake_case columns; the client maps to camelCase.
--   * text + CHECK rather than enums, so new values need no ALTER TYPE.
--   * auth.users FKs deferred into guarded blocks - the SQL Editor runs this
--     file as ONE transaction, so a single refused statement would roll back
--     every table above it.
--   * policy names passed to format() as %I, never %L. A policy name is an
--     identifier; %L produced a syntax error that aborted all of 0002.
--   * Re-running is safe.

-- =============================================================== grades ===
-- Grades were a smallint column. They become a table so a grade can carry a
-- name, an education level and an active flag, and so Kindergarten, ABE, ALP
-- and TVET can be added later as rows rather than as a migration.
--
-- The smallint columns elsewhere are deliberately NOT rewritten into foreign
-- keys. Doing so would rewrite every curriculum table for no behavioural gain
-- today, and `grade` as a number is what the app already queries on.

create table if not exists public.grades (
  id                 smallint primary key check (id between 1 and 12),
  name               text not null,
  education_level_id text references public.education_levels(id) on delete set null,
  description        text not null default '',
  active             boolean not null default true,
  sort_order         smallint not null default 0
);

insert into public.grades (id, name, education_level_id, sort_order) values
  (1,'Grade 1','primary',1),   (2,'Grade 2','primary',2),
  (3,'Grade 3','primary',3),   (4,'Grade 4','primary',4),
  (5,'Grade 5','primary',5),   (6,'Grade 6','primary',6),
  (7,'Grade 7','junior-secondary',7),
  (8,'Grade 8','junior-secondary',8),
  (9,'Grade 9','junior-secondary',9),
  (10,'Grade 10','senior-secondary',10),
  (11,'Grade 11','senior-secondary',11),
  (12,'Grade 12','senior-secondary',12)
on conflict (id) do nothing;

-- ============================================================ subtopics ===
-- Optional by design. A topic with no subtopics is normal, not incomplete, and
-- the UI must render it without inventing an empty level.

create table if not exists public.subtopics (
  id          text primary key,
  topic_id    text not null references public.topics(id) on delete cascade,
  title       text not null,
  description text not null default '',
  sort_order  smallint not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.lessons
  add column if not exists subtopic_id text references public.subtopics(id) on delete set null;

-- =================================================== learning objectives ==
-- Lessons already carry objectives as jsonb, which is how they are READ (one
-- row, one request, which matters on a slow connection). This table is the
-- queryable projection: it lets a future curriculum map ask "which lessons
-- cover this objective?", and gives each objective its own source_id so an
-- objective taken from a Ministry document can be traced independently of the
-- lesson that teaches it.
--
-- The jsonb stays the read path. This is additive, not a replacement.

create table if not exists public.learning_objectives (
  id          bigserial primary key,
  lesson_id   text not null references public.lessons(id) on delete cascade,
  objective   text not null,
  sort_order  smallint not null default 0,
  source_id   text references public.content_sources(id) on delete set null,
  created_at  timestamptz not null default now(),
  unique (lesson_id, sort_order)
);

-- ===================================================== question options ===
-- Same reasoning: questions keep `options` jsonb for reading, and this table
-- makes individual options addressable - needed for per-option analytics
-- ("which distractor do students pick?") without parsing jsonb.
--
-- is_correct lives here as well as questions.correct_answer. The view
-- below is what keeps them honest.

create table if not exists public.question_options (
  id          bigserial primary key,
  question_id text not null references public.questions(id) on delete cascade,
  option_text text not null,
  is_correct  boolean not null default false,
  sort_order  smallint not null default 0,
  unique (question_id, sort_order)
);

-- ========================================================== quiz answers ==
-- 0001 stores a quiz attempt with a jsonb answers array. That is enough to show
-- a student their result, and not enough to ask "which questions does this
-- class get wrong?" - so answers become rows too.

alter table public.quiz_attempts
  add column if not exists status text not null default 'completed'
    check (status in ('in_progress','completed','abandoned')),
  add column if not exists percentage numeric(5,2),
  add column if not exists correct_count smallint,
  add column if not exists incorrect_count smallint,
  add column if not exists unanswered_count smallint,
  add column if not exists completed_at timestamptz,
  add column if not exists time_spent_seconds integer;

create table if not exists public.quiz_answers (
  id                 bigserial primary key,
  attempt_id         text not null,
  user_id            uuid not null,
  question_id        text not null references public.questions(id) on delete cascade,
  -- null means the student left it unanswered, which is distinct from wrong.
  selected_option    smallint,
  is_correct         boolean not null default false,
  time_spent_seconds integer,
  created_at         timestamptz not null default now(),
  unique (attempt_id, question_id)
);

-- ======================================================= lesson progress ==
-- Richer progress, so "Continue Learning" can say 45% rather than just
-- "in progress", and so time on task is measurable.

alter table public.lesson_progress
  add column if not exists progress_percentage smallint not null default 0
    check (progress_percentage between 0 and 100),
  add column if not exists last_viewed_at timestamptz,
  add column if not exists time_spent_seconds integer not null default 0,
  add column if not exists subtopic_id text;

-- ======================================================= recent activity ==
-- An append-only event stream. Deliberately generic: a new activity type is a
-- new string, not a migration, and Wave 3's recommendations can read the same
-- stream without a second logging path being bolted on beside it.

create table if not exists public.recent_activity (
  id            bigserial primary key,
  user_id       uuid not null,
  activity_type text not null
                  check (activity_type in (
                    'lesson_opened','lesson_completed','quiz_started','quiz_completed',
                    'bookmark_created','exam_started','exam_completed','search_performed'
                  )),
  content_type  text check (content_type in ('lesson','topic','subject','quiz','question','exam','unit')),
  content_id    text,
  -- Small denormalised payload (title, subject, score) so the feed renders from
  -- one read. Without it, showing ten activities means ten lookups.
  metadata      jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);

-- ============================================================== indexes ===

create index if not exists subtopics_topic_idx        on public.subtopics(topic_id, sort_order);
create index if not exists lessons_subtopic_idx       on public.lessons(subtopic_id);
create index if not exists objectives_lesson_idx      on public.learning_objectives(lesson_id, sort_order);
create index if not exists question_options_q_idx     on public.question_options(question_id, sort_order);
create index if not exists quiz_answers_attempt_idx   on public.quiz_answers(attempt_id);
create index if not exists quiz_answers_user_idx      on public.quiz_answers(user_id, created_at desc);
create index if not exists quiz_answers_question_idx  on public.quiz_answers(question_id);
-- The feed query: this user's activity, newest first.
create index if not exists recent_activity_user_idx   on public.recent_activity(user_id, created_at desc);
create index if not exists recent_activity_type_idx   on public.recent_activity(user_id, activity_type, created_at desc);
-- Continue Learning: this user's unfinished lessons, most recently touched.
create index if not exists lesson_progress_recent_idx on public.lesson_progress(user_id, last_viewed_at desc);
create index if not exists quiz_attempts_user_time_idx on public.quiz_attempts(user_id, submitted_at desc);

-- ================================================================== RLS ===
-- Curriculum tables: world-readable, not student-writable (same rule as 0002 -
-- a student who could write these could edit the answer keys).

do $$
declare t text;
begin
  foreach t in array array['grades','subtopics','learning_objectives','question_options'] loop
    execute format('alter table public.%I enable row level security', t);
    if not exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = t and policyname = t || ': public read'
    ) then
      -- %I: a policy name is an identifier. %L here is what aborted 0002.
      execute format('create policy %I on public.%I for select using (true)',
                     t || ': public read', t);
    end if;
  end loop;
end $$;

-- Student-owned tables: own rows only.
do $$
declare t text;
begin
  foreach t in array array['quiz_answers','recent_activity'] loop
    execute format('alter table public.%I enable row level security', t);
    if not exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = t and policyname = t || ': own rows'
    ) then
      execute format(
        'create policy %I on public.%I for all using (auth.uid() = user_id) with check (auth.uid() = user_id)',
        t || ': own rows', t
      );
    end if;
  end loop;
end $$;

-- ===================================== foreign keys to auth.users =========
-- Guarded: REFERENCES on auth.users is not always granted. RLS above is what
-- enforces ownership; the FK only adds delete-cascade.

do $$
declare
  spec record;
begin
  for spec in
    select * from (values
      ('quiz_answers',    'quiz_answers_user_id_fkey'),
      ('recent_activity', 'recent_activity_user_id_fkey')
    ) as t(tbl, con)
  loop
    if not exists (select 1 from pg_constraint where conname = spec.con) then
      begin
        execute format(
          'alter table public.%I add constraint %I foreign key (user_id) references auth.users(id) on delete cascade',
          spec.tbl, spec.con
        );
      exception when insufficient_privilege or undefined_table then
        raise notice 'Skipped % -> auth.users FK (insufficient privilege). RLS still enforces ownership.', spec.tbl;
      end;
    end if;
  end loop;
end $$;

-- ================================================ consistency safeguard ===
-- question_options.is_correct and questions.correct_answer describe the same
-- fact twice, and duplicated truth drifts. This view surfaces any disagreement
-- so it can be checked rather than discovered by a student being marked wrong
-- on a correct answer.
--
--   select * from question_option_mismatches;   -- expect zero rows

create or replace view public.question_option_mismatches as
select
  q.id                         as question_id,
  q.correct_answer             as questions_says,
  array_agg(o.sort_order order by o.sort_order)
    filter (where o.is_correct) as options_say
from public.questions q
join public.question_options o on o.question_id = q.id
group by q.id, q.correct_answer
having array_agg(o.sort_order order by o.sort_order) filter (where o.is_correct)
       is distinct from array[q.correct_answer]::smallint[];

-- ================================================================ verify ==
--   select t.tablename, t.rowsecurity,
--          (select count(*) from pg_policies p
--            where p.schemaname='public' and p.tablename=t.tablename) as policies
--   from pg_tables t where t.schemaname='public' order by t.tablename;
--
--   select count(*) from question_option_mismatches;   -- must be 0
