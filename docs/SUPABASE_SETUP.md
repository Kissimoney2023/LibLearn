# Supabase Setup

## 1. Run the migrations

Supabase dashboard → **SQL Editor** → paste and run, **in order**:

1. `supabase/migrations/0001_init.sql`
2. `supabase/migrations/0002_curriculum.sql`
3. `supabase/migrations/0003_wave2.sql`

Each is safe to re-run. Run them one at a time — the editor executes a file as a
single transaction, so one failure rolls back everything in that file.

Verify:

```sql
select t.tablename, t.rowsecurity as rls,
       (select count(*) from pg_policies p
         where p.schemaname='public' and p.tablename=t.tablename) as policies
from pg_tables t where t.schemaname='public'
order by t.tablename;
```

Expect **24 tables, `rls` true on every one**. A table with `rls` false is a
data leak, not a cosmetic problem — the anon key is public by design and RLS is
the only thing between it and every student's records.

## 2. Auth

**Authentication → Providers → Email**: enabled.

For testing without inbox access, turn *Confirm email* off. Turn it back on
before real students use it.

**URL Configuration**: set Site URL to your deployed origin and add it to
redirect URLs, or password reset and email confirmation links will point at
localhost.

## 3. Environment variables

| Variable | Where | Scope | Secret |
| --- | --- | --- | --- |
| `VITE_SUPABASE_URL` | Netlify | **Builds** | No — public |
| `VITE_SUPABASE_ANON_KEY` | Netlify | **Builds** | No — public, RLS governs it |
| `GEMINI_API_KEY` | Netlify | **Functions** | **Yes** |
| `SUPABASE_SERVICE_ROLE_KEY` | Your machine only, for imports | — | **Yes** |

**The `VITE_` prefix is the security boundary.** Vite inlines every `VITE_*`
value into the JavaScript bundle at build time, where any visitor can read it.

That cuts both ways, and both directions are live failure modes:

- A `VITE_` variable scoped only to *Functions* or *Runtime* is **invisible to
  the build**, so the app ships with no Supabase client and runs in local mode.
  This is the single most common cause of "Supabase is connected but the app
  says local mode".
- `GEMINI_API_KEY` must **never** carry `VITE_`, or it is served to every
  visitor.

**Never put `SUPABASE_SERVICE_ROLE_KEY` on Netlify.** It bypasses RLS entirely.
It belongs only in the shell where you run the content importer.

## 4. Load curriculum

```bash
export SUPABASE_URL="https://<ref>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<service role key>"

npx tsx scripts/import-curriculum.ts --dry-run   # validate
npx tsx scripts/import-curriculum.ts             # write
```

## 5. Verify end to end

1. Redeploy (**Clear cache and deploy site** — a plain redeploy may reuse the
   cached build and keep stale env vars).
2. The "Running in local mode" banner should be gone.
3. Sign up. A row should appear in `profiles`.
4. Open a lesson, mark it complete. A row should appear in `lesson_progress`,
   and one in `recent_activity`.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| "Running in local mode" | `VITE_*` vars missing the **Builds** scope |
| `PGRST205` / "tables have not been created" | Migrations not run, or PostgREST cache stale — run `notify pgrst, 'reload schema';` |
| Sign-up fails with an empty message | A `PostgrestError` is a plain object and fails `instanceof Error`; `src/lib/errors.ts` normalises it |
| "AI tutor is not configured" | `GEMINI_API_KEY` missing from the **Functions** scope |
| Import rejected: "nobody has read" | Working as intended — see [CONTENT_PIPELINE.md](CONTENT_PIPELINE.md) |
