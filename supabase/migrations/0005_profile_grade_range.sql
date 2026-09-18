-- Widen the student profile grade range from 4-12 to 1-12.
--
-- The curriculum tables in 0002 and the grades table in 0003 already allow
-- 1-12; only profiles.grade was capped at 4. Adding Grade 1-3 content without
-- this migration would produce the worst kind of failure: the grade appears on
-- the Learn screen and can be browsed, then onboarding rejects the child when
-- they try to say which grade they are in.
--
-- Safe to run more than once: the constraint is dropped by name first, and
-- widening a CHECK cannot fail against existing rows because every grade that
-- satisfied 4-12 also satisfies 1-12.

alter table public.profiles
  drop constraint if exists profiles_grade_check;

alter table public.profiles
  add constraint profiles_grade_check check (grade between 1 and 12);
