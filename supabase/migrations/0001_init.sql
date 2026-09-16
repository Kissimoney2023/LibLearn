-- LibLearn initial schema.
--
-- Run this once in the Supabase SQL Editor (or `supabase db push`).
--
-- Design notes:
--  * Every table has RLS enabled with policies scoped to auth.uid(). The anon
--    key is public by design; RLS is the ONLY thing standing between it and
--    every student's records. A table without a policy here is a data leak.
--  * `role` is text + CHECK rather than a Postgres enum, so Phase 2 can add
--    teacher/parent/school_admin without an ALTER TYPE migration.
--  * Columns are snake_case; the client maps to/from camelCase in
--    src/lib/store.ts. Do not add quoted camelCase identifiers here.

-- ---------------------------------------------------------------- profiles

create table if not exists public.profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  name              text not null default '',
  email             text not null default '',
  role              text not null default 'student'
                      check (role in ('student','teacher','parent','school_admin','super_admin')),
  grade             smallint check (grade between 4 and 12),
  selected_subjects text[] not null default '{}',
  exam_goal         text check (exam_goal in ('general','lpsce','ljhsce','wassce')),
  onboarded_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles: read own" on public.profiles;
create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles: insert own" on public.profiles;
create policy "profiles: insert own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- A student must never be able to promote themselves. `role` is writable only
-- by the service role, which never touches client code.
drop policy if exists "profiles: no self role change" on public.profiles;
create or replace function public.guard_profile_role()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.role is distinct from old.role then
    raise exception 'role cannot be changed by the account holder';
  end if;
  new.updated_at := now();
  return new;
end; $$;

drop trigger if exists profiles_guard_role on public.profiles;
create trigger profiles_guard_role
  before update on public.profiles
  for each row execute function public.guard_profile_role();

-- Create the profile row as part of sign-up, so the client never races the
-- session to insert it. `name` comes from signUp options.data.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'name', ''), split_part(new.email, '@', 1)),
    coalesce(new.email, '')
  )
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- --------------------------------------------------------- lesson_progress

create table if not exists public.lesson_progress (
  user_id      uuid not null references auth.users(id) on delete cascade,
  lesson_id    text not null,
  subject_id   text not null,
  topic_id     text not null,
  grade        smallint not null,
  status       text not null check (status in ('in_progress','completed')),
  started_at   timestamptz not null default now(),
  completed_at timestamptz,
  primary key (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;
create index if not exists lesson_progress_user_idx on public.lesson_progress(user_id);

drop policy if exists "lesson_progress: own rows" on public.lesson_progress;
create policy "lesson_progress: own rows" on public.lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ------------------------------------------------------------ quiz_attempts

create table if not exists public.quiz_attempts (
  id           text primary key,
  user_id      uuid not null references auth.users(id) on delete cascade,
  quiz_id      text not null,
  subject_id   text not null,
  topic_id     text not null,
  grade        smallint not null,
  answers      jsonb not null default '[]'::jsonb,
  score        integer not null check (score >= 0),
  total        integer not null check (total >= 0),
  started_at   timestamptz not null,
  submitted_at timestamptz not null default now(),
  constraint quiz_score_within_total check (score <= total)
);

alter table public.quiz_attempts enable row level security;
create index if not exists quiz_attempts_user_idx on public.quiz_attempts(user_id);

-- Attempts are an audit trail: insert and read only, never updated or deleted
-- from the client, so a score cannot be edited after the fact.
drop policy if exists "quiz_attempts: read own" on public.quiz_attempts;
create policy "quiz_attempts: read own" on public.quiz_attempts
  for select using (auth.uid() = user_id);

drop policy if exists "quiz_attempts: insert own" on public.quiz_attempts;
create policy "quiz_attempts: insert own" on public.quiz_attempts
  for insert with check (auth.uid() = user_id);

-- ------------------------------------------------------------ exam_attempts

create table if not exists public.exam_attempts (
  id               text primary key,
  user_id          uuid not null references auth.users(id) on delete cascade,
  exam             text not null check (exam in ('general','lpsce','ljhsce','wassce')),
  subject_id       text not null,
  difficulty       text not null check (difficulty in ('foundation','core','challenge')),
  question_ids     text[] not null default '{}',
  answers          jsonb not null default '[]'::jsonb,
  flagged          text[] not null default '{}',
  score            integer not null default 0 check (score >= 0),
  total            integer not null default 0 check (total >= 0),
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  started_at       timestamptz not null,
  submitted_at     timestamptz,
  constraint exam_score_within_total check (score <= total)
);

alter table public.exam_attempts enable row level security;
create index if not exists exam_attempts_user_idx on public.exam_attempts(user_id);

-- An exam may be written twice: once on start, once on submit. It is sealed
-- after submission so a submitted score cannot be revised.
drop policy if exists "exam_attempts: read own" on public.exam_attempts;
create policy "exam_attempts: read own" on public.exam_attempts
  for select using (auth.uid() = user_id);

drop policy if exists "exam_attempts: insert own" on public.exam_attempts;
create policy "exam_attempts: insert own" on public.exam_attempts
  for insert with check (auth.uid() = user_id);

drop policy if exists "exam_attempts: update unsubmitted" on public.exam_attempts;
create policy "exam_attempts: update unsubmitted" on public.exam_attempts
  for update using (auth.uid() = user_id and submitted_at is null)
  with check (auth.uid() = user_id);

-- ----------------------------------------------------- student_achievements

create table if not exists public.student_achievements (
  user_id        uuid not null references auth.users(id) on delete cascade,
  achievement_id text not null,
  earned_at      timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

alter table public.student_achievements enable row level security;

drop policy if exists "achievements: read own" on public.student_achievements;
create policy "achievements: read own" on public.student_achievements
  for select using (auth.uid() = user_id);

drop policy if exists "achievements: insert own" on public.student_achievements;
create policy "achievements: insert own" on public.student_achievements
  for insert with check (auth.uid() = user_id);
