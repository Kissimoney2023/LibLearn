# Deployment (Netlify)

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Functions directory | `netlify/functions` |
| Node version | 22 (set in `netlify.toml`) |

All of this is committed in `netlify.toml`; nothing needs setting in the UI
except environment variables.

## Redirect ordering is load-bearing

Netlify evaluates redirects top to bottom, first match wins. The `/api/*` rules
**must** precede the SPA catch-all. Reversed, every API call is rewritten to
`index.html` and returns HTML where the client expects JSON — which surfaces as
a JSON parse error, not as a routing error, and sends you looking in the wrong
place.

The SPA fallback itself is required: without it a refresh on
`/learn/11/mathematics` is a 404, because no such file exists on disk.

## Environment variables

Site configuration → Environment variables:

| Key | Scope | Secret |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | **Builds** | No |
| `VITE_SUPABASE_ANON_KEY` | **Builds** | No |
| `GEMINI_API_KEY` | **Functions** | **Yes** |

The scope column is the part that is easy to get wrong, and both mistakes are
live failure modes — see [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

Never set `SUPABASE_SERVICE_ROLE_KEY` here. It bypasses row-level security and
nothing in the deployed app needs it.

After changing variables, use **Clear cache and deploy site**. A plain redeploy
may reuse the cached build and keep the old values.

## Checklist

- [ ] Three migrations run, 24 tables, RLS true on all
- [ ] Supabase Site URL and redirect URLs point at the deployed origin
- [ ] The three variables set with the scopes above
- [ ] Cleared cache and redeployed
- [ ] "Running in local mode" banner gone
- [ ] Sign-up creates a row in `profiles`
- [ ] `/api/health` returns JSON, not HTML — proves redirect ordering
- [ ] AI tutor answers, or says plainly that it is not configured
- [ ] Gemini billing enabled (free tier is **20 requests/day for the whole
      site**, not per student)

## Vercel

`vercel.json` and `api/` are still present and functional. Both hosts call the
same `handleTutorRequest`, so the tutor's safety prompts cannot drift between
them. Remove them if Netlify is the only target.
