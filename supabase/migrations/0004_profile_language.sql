-- LibLearn: preferred teaching language on the student profile.
--
-- Run AFTER 0003_wave2.sql. Safe to re-run.
--
-- The AI Tutor already offered Standard / Simple / Liberian English, but only
-- for the current session. A preference that resets on every new device is a
-- preference students stop bothering to set, so it belongs on the profile.
--
-- Liberian English is a register, not a lowering of the standard: the tutor
-- prompt requires every definition, formula and worked step to stay
-- academically correct and in standard terminology. See server/tutor.ts.

alter table public.profiles
  add column if not exists preferred_language text not null default 'standard'
    check (preferred_language in ('standard', 'simple', 'liberian'));

comment on column public.profiles.preferred_language is
  'How the AI Tutor addresses this student. Register only - accuracy is unaffected.';

-- Verify:
--   select preferred_language, count(*) from public.profiles group by 1;
