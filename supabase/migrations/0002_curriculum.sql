-- LibLearn curriculum schema.
--
-- Run AFTER 0001_init.sql, in the Supabase SQL Editor or via `supabase db push`.
--
-- 0001 covers per-student records (profiles, progress, attempts). This adds the
-- shared curriculum: the content every student reads, plus the provenance that
-- says where each piece came from.
--
-- Design notes, several learned from 0001 the hard way:
--
--  * Curriculum is WORLD-READABLE and NOT student-writable. The policies below
--    grant select to anon and authenticated but no insert/update/delete to
--    either. Content is written by a privileged role (service_role, used only
--    from a trusted server or the dashboard - never from the browser). A
--    student who could edit the curriculum could edit the answer keys.
--
--  * Foreign keys within public.* are declared inline, which is safe. Only
--    references to auth.users are deferred to a guarded block, because that
--    needs REFERENCES privilege the migrating role may not hold - and since the
--    SQL Editor runs this whole file as ONE transaction, a single refused
--    statement rolls back every table above it and leaves the database empty.
--
--  * Text + CHECK rather than Postgres enums throughout, so new provenance
--    tiers or exam types do not require ALTER TYPE.
--
--  * snake_case only. The client maps to camelCase in src/lib/store.ts.
--
--  * Running this twice is safe: every statement is guarded.

-- ============================================================ provenance ==
-- These two tables exist so that no curriculum row can make a claim about
-- Liberian education without pointing at a document, and so that a document
-- nobody has read cannot be mistaken for one that has been checked.

create table if not exists public.content_sources (
  id                  text primary key,
  title               text not null,
  organization        text not null,
  source_type         text not null
                        check (source_type in ('MOE','WAEC','MCSS','Government','UNESCO','WorldBank','Other')),
  url                 text,
  document_date       text,
  description         text not null default '',
  -- 'located' means we know the document exists. It does NOT mean anyone has
  -- read it, and only 'reviewed'/'verified' may support an official claim.
  verification_status text not null default 'located'
                        check (verification_status in
                          ('located','reviewed','verified','superseded','verification-required')),
  last_verified_at    timestamptz,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table if not exists public.curriculum_versions (
  id             text primary key,
  name           text not null,
  description    text not null default '',
  -- Only 'official-current' asserts "this is the curriculum in force today".
  -- Do not use it without a reviewed source.
  status         text not null default 'reference'
                   check (status in
                     ('official-current','official-historical','revised','draft','archived','reference')),
  source_id      text references public.content_sources(id) on delete set null,
  effective_date text,
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ========================================================= structure ======

create table if not exists public.education_levels (
  id           text primary key,
  name         text not null,
  grade_min    smallint not null,
  grade_max    smallint not null,
  sort_order   smallint not null default 0,
  check (grade_max >= grade_min)
);

create table if not exists public.subjects (
  id          text primary key,
  name        text not null,
  subject_code text,
  icon        text not null default 'book',
  description text not null default '',
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- A subject is offered at a grade UNDER a particular curriculum version.
-- Modelling it this way is the point of the whole versioning system: when a
-- revised curriculum moves a subject to a different grade, both facts can be
-- stored side by side instead of one silently overwriting the other.
create table if not exists public.curriculum_subjects (
  id                    bigserial primary key,
  curriculum_version_id text not null references public.curriculum_versions(id) on delete cascade,
  subject_id            text not null references public.subjects(id) on delete cascade,
  grade                 smallint not null check (grade between 1 and 12),
  exam_relevance        text[] not null default '{}',
  source_id             text references public.content_sources(id) on delete set null,
  sort_order            smallint not null default 0,
  unique (curriculum_version_id, subject_id, grade)
);

create table if not exists public.units (
  id                    text primary key,
  subject_id            text not null references public.subjects(id) on delete cascade,
  curriculum_version_id text references public.curriculum_versions(id) on delete set null,
  grade                 smallint not null check (grade between 1 and 12),
  name                  text not null,
  summary               text not null default '',
  sort_order            smallint not null default 0
);

create table if not exists public.topics (
  id                    text primary key,
  unit_id               text references public.units(id) on delete set null,
  subject_id            text not null references public.subjects(id) on delete cascade,
  curriculum_version_id text references public.curriculum_versions(id) on delete set null,
  grade                 smallint not null check (grade between 1 and 12),
  name                  text not null,
  summary               text not null default '',
  provenance            text not null default 'liblearn'
                          check (provenance in ('official','verified','liblearn','ai-generated')),
  source_id             text references public.content_sources(id) on delete set null,
  sort_order            smallint not null default 0,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create table if not exists public.lessons (
  id                    text primary key,
  topic_id              text not null references public.topics(id) on delete cascade,
  subject_id            text not null references public.subjects(id) on delete cascade,
  curriculum_version_id text references public.curriculum_versions(id) on delete set null,
  grade                 smallint not null check (grade between 1 and 12),
  title                 text not null,
  short_description     text not null default '',
  estimated_minutes     smallint not null default 10 check (estimated_minutes > 0),
  difficulty            text not null default 'core'
                          check (difficulty in ('foundation','core','challenge')),
  -- Section bodies and key terms are documents, not relational data, and are
  -- always read as a whole lesson. jsonb keeps a lesson to one row and one read,
  -- which matters on a slow connection.
  objectives            jsonb not null default '[]'::jsonb,
  sections              jsonb not null default '[]'::jsonb,
  key_terms             jsonb not null default '[]'::jsonb,
  provenance            text not null default 'liblearn'
                          check (provenance in ('official','verified','liblearn','ai-generated')),
  source_id             text references public.content_sources(id) on delete set null,
  review_status         text not null default 'draft'
                          check (review_status in ('draft','in-review','verified','published')),
  sort_order            smallint not null default 0,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  -- The provenance rule, enforced by the database rather than by convention.
  -- Application code can be bypassed; this cannot.
  constraint lessons_official_needs_source
    check (provenance in ('liblearn','ai-generated') or source_id is not null)
);

-- ========================================================= assessment =====

create table if not exists public.questions (
  id                    text primary key,
  topic_id              text not null references public.topics(id) on delete cascade,
  subject_id            text not null references public.subjects(id) on delete cascade,
  curriculum_version_id text references public.curriculum_versions(id) on delete set null,
  grade                 smallint not null check (grade between 1 and 12),
  question_type         text not null default 'multiple_choice'
                          check (question_type in
                            ('multiple_choice','true_false','short_answer','matching','fill_blank','structured')),
  question_text         text not null,
  options               jsonb not null default '[]'::jsonb,
  -- Index into options for multiple choice. NEVER selected by client code
  -- during an active attempt; see the masking note below.
  correct_answer        smallint,
  explanation           text not null default '',
  difficulty            text not null default 'core'
                          check (difficulty in ('foundation','core','challenge')),
  skill                 text check (skill in
                            ('recall','understanding','application','analysis','problem_solving')),
  marks                 smallint not null default 1,
  exam_goal             text check (exam_goal in ('general','lpsce','ljhsce','wassce')),
  exam_year             smallint,
  provenance            text not null default 'liblearn'
                          check (provenance in ('official','verified','liblearn','ai-generated')),
  source_id             text references public.content_sources(id) on delete set null,
  review_status         text not null default 'draft'
                          check (review_status in ('draft','in-review','verified','published')),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  constraint questions_official_needs_source
    check (provenance in ('liblearn','ai-generated') or source_id is not null)
);

create table if not exists public.quizzes (
  id         text primary key,
  lesson_id  text references public.lessons(id) on delete cascade,
  topic_id   text not null references public.topics(id) on delete cascade,
  subject_id text not null references public.subjects(id) on delete cascade,
  grade      smallint not null check (grade between 1 and 12),
  title      text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  quiz_id     text not null references public.quizzes(id) on delete cascade,
  question_id text not null references public.questions(id) on delete cascade,
  sort_order  smallint not null default 0,
  primary key (quiz_id, question_id)
);

-- ========================================================== glossary ======

create table if not exists public.glossary_terms (
  id          bigserial primary key,
  term        text not null,
  definition  text not null,
  simple_definition text,
  subject_id  text references public.subjects(id) on delete set null,
  topic_id    text references public.topics(id) on delete set null,
  provenance  text not null default 'liblearn'
                check (provenance in ('official','verified','liblearn','ai-generated')),
  created_at  timestamptz not null default now(),
  unique (term, subject_id)
);

-- =========================================================== indexes ======
-- Every index below backs a query the app actually makes: browsing by grade and
-- subject, opening a topic, and assembling a quiz.

create index if not exists topics_subject_grade_idx   on public.topics(subject_id, grade);
create index if not exists topics_version_idx         on public.topics(curriculum_version_id);
create index if not exists lessons_topic_idx          on public.lessons(topic_id, sort_order);
create index if not exists lessons_subject_grade_idx  on public.lessons(subject_id, grade);
create index if not exists lessons_review_idx         on public.lessons(review_status);
create index if not exists questions_topic_idx        on public.questions(topic_id);
create index if not exists questions_subject_grade_idx on public.questions(subject_id, grade);
create index if not exists questions_exam_idx         on public.questions(exam_goal, grade);
create index if not exists quizzes_lesson_idx         on public.quizzes(lesson_id);
create index if not exists curriculum_subjects_grade_idx
  on public.curriculum_subjects(grade, curriculum_version_id);
create index if not exists glossary_term_idx          on public.glossary_terms(lower(term));

-- ======================================================== bookmarks =======
-- Student-owned, unlike everything above. Belongs here because it references
-- curriculum rows that only exist after this migration.

create table if not exists public.bookmarks (
  id           bigserial primary key,
  user_id      uuid not null,
  content_type text not null check (content_type in ('lesson','topic','question','exam')),
  content_id   text not null,
  subject_id   text,
  grade        smallint,
  created_at   timestamptz not null default now(),
  unique (user_id, content_type, content_id)
);
create index if not exists bookmarks_user_idx on public.bookmarks(user_id, created_at desc);

-- ============================================================== RLS =======
-- Curriculum: readable by everyone, writable by no one holding anon or
-- authenticated. service_role bypasses RLS entirely, which is how content gets
-- loaded, and is exactly why that key must never reach the browser.

do $$
declare t text;
begin
  foreach t in array array[
    'content_sources','curriculum_versions','education_levels','subjects',
    'curriculum_subjects','units','topics','lessons','questions','quizzes',
    'quiz_questions','glossary_terms'
  ] loop
    execute format('alter table public.%I enable row level security', t);

    if not exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = t and policyname = t || ': public read'
    ) then
      -- %I, not %L: a policy name is an identifier. Passing it as a string
      -- literal produces `create policy 'x: public read'`, a syntax error that
      -- aborts this whole file's single transaction and leaves the database
      -- with none of these tables.
      execute format(
        'create policy %I on public.%I for select using (true)',
        t || ': public read', t
      );
    end if;
  end loop;
end $$;

-- Bookmarks are per-student and follow the 0001 ownership pattern.
alter table public.bookmarks enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'bookmarks' and policyname = 'bookmarks: own rows'
  ) then
    create policy "bookmarks: own rows" on public.bookmarks
      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end $$;

-- ===================================== foreign keys to auth.users =========
-- Deferred and guarded: see the header note. RLS above is what actually
-- enforces ownership; this FK only adds delete-cascade.

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'bookmarks_user_id_fkey'
  ) then
    begin
      alter table public.bookmarks
        add constraint bookmarks_user_id_fkey
        foreign key (user_id) references auth.users(id) on delete cascade;
    exception when insufficient_privilege or undefined_table then
      raise notice 'Skipped bookmarks -> auth.users FK (insufficient privilege). RLS still enforces ownership.';
    end;
  end if;
end $$;

-- ============================================ provenance enforcement ======
-- The CHECK constraints above ensure an `official` or `verified` row cites SOME
-- source. They cannot check WHICH source, because a CHECK may not reference
-- another table. This trigger closes that gap: a row may not claim official or
-- verified standing by citing a document nobody has actually read.
--
-- Without it, the honest-looking move of citing 'moe-national-curriculum-2011'
-- - a real document, correctly recorded, but status 'located' - would pass
-- every other guard and present guessed content to students as Ministry
-- curriculum. That is the precise failure this schema exists to prevent.

create or replace function public.enforce_source_reviewed()
returns trigger language plpgsql as $$
declare s_status text;
begin
  if new.provenance in ('official','verified') then
    select verification_status into s_status
      from public.content_sources where id = new.source_id;

    if s_status is null then
      raise exception
        'provenance "%" cites unknown source "%"', new.provenance, new.source_id;
    end if;

    if s_status not in ('reviewed','verified') then
      raise exception
        'provenance "%" cites source "%" with status "%". A document nobody has read cannot support an official claim.',
        new.provenance, new.source_id, s_status;
    end if;
  end if;
  return new;
end $$;

do $$
declare t text;
begin
  foreach t in array array['lessons','questions','topics'] loop
    execute format('drop trigger if exists %I on public.%I', t || '_provenance_check', t);
    execute format(
      'create trigger %I before insert or update on public.%I
         for each row execute function public.enforce_source_reviewed()',
      t || '_provenance_check', t
    );
  end loop;
end $$;

-- ====================================================== seed provenance ===
-- The source registry and curriculum versions, mirroring src/data/sources.ts.
-- Seeded here because content rows reference them, and because the honest
-- status of each document should be in the database from the first row.
--
-- Note that NO version is 'official-current'. Marking one would assert that we
-- know which curriculum is in force today. Nobody has read these documents yet.

insert into public.content_sources
  (id, title, organization, source_type, url, document_date, description, verification_status, notes)
values
  ('moe-national-curriculum-2011',
   'Republic of Liberia Ministry of Education — National Curriculum',
   'Ministry of Education, Republic of Liberia', 'MOE',
   'https://www.ibe.unesco.org/curricula/liberia/', '2011',
   'National curriculum issued by the Liberian Ministry of Education, archived by UNESCO IBE.',
   'located',
   'Document located, contents NOT read. Must be reviewed before any content cites it as official.'),
  ('moe-mathematics-10-12',
   'National Curriculum for Grades 10 to 12: Mathematics',
   'Ministry of Education, Republic of Liberia', 'MOE',
   'https://unesdoc.unesco.org/ark:/48223/pf0000230916', '2011',
   'Senior-secondary mathematics volume of the Liberian national curriculum.',
   'located',
   'HIGHEST PRIORITY FOR REVIEW - most directly relevant to LibLearn Grades 10-12 mathematics.'),
  ('waec-liberia',
   'West African Examinations Council — Liberia',
   'West African Examinations Council (WAEC)', 'WAEC',
   null, null,
   'WAEC administers the WASSCE in Liberia. Subject lists and grading rules are published by WAEC.',
   'verification-required',
   'CAUTION: most WAEC syllabus material online describes the Nigerian or Ghanaian examination and does not automatically apply to Liberia.'),
  ('liberia-esp-2022',
   'Republic of Liberia Education Sector Plan',
   'Ministry of Education, Republic of Liberia', 'Government',
   'https://planipolis.iiep.unesco.org/sites/default/files/ressources/liberia_esp_2022.pdf', '2022',
   'National education sector planning document.',
   'located', 'Located, contents not read.')
on conflict (id) do nothing;

insert into public.curriculum_versions
  (id, name, description, status, source_id, effective_date, notes)
values
  ('lr-national-2011',
   'Liberia National Curriculum (2011)',
   'The 2011 national curriculum issued by the Ministry of Education.',
   'reference', 'moe-national-curriculum-2011', '2011',
   'Status is reference, not official-current: whether this remains in force has not been established.'),
  ('liblearn-v1',
   'LibLearn Teaching Sequence v1',
   'LibLearn''s own ordering of academically standard topics.',
   'reference', null, '2026',
   'NOT a national curriculum and must never be labelled as one.')
on conflict (id) do nothing;

insert into public.education_levels (id, name, grade_min, grade_max, sort_order) values
  ('primary',          'Primary',          1,  6,  1),
  ('junior-secondary', 'Junior Secondary', 7,  9,  2),
  ('senior-secondary', 'Senior Secondary', 10, 12, 3)
on conflict (id) do nothing;

insert into public.subjects (id, name, icon, description) values
  ('mathematics',     'Mathematics',      'calculate', ''),
  ('english',         'English Language', 'menu_book', ''),
  ('general-science', 'General Science',  'science',   ''),
  ('biology',         'Biology',          'biotech',   ''),
  ('chemistry',       'Chemistry',        'experiment',''),
  ('physics',         'Physics',          'bolt',      ''),
  ('social-studies',  'Social Studies',   'public',    ''),
  ('civics',          'Civics',           'gavel',     '')
on conflict (id) do nothing;

-- ============================================================ verify ======
-- After running, this should report 13 tables, all with rls_enabled = true.
--
--   select t.tablename, t.rowsecurity as rls_enabled,
--          (select count(*) from pg_policies p
--            where p.schemaname='public' and p.tablename=t.tablename) as policy_count
--   from pg_tables t
--   where t.schemaname='public'
--     and t.tablename in ('content_sources','curriculum_versions','education_levels',
--                         'subjects','curriculum_subjects','units','topics','lessons',
--                         'questions','quizzes','quiz_questions','glossary_terms','bookmarks')
--   order by t.tablename;
