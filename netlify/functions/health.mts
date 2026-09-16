/**
 * Deployment check. Reports whether each environment variable actually landed,
 * which is the fastest way to tell a missing key from a broken build.
 */
export default async (): Promise<Response> =>
  new Response(
    JSON.stringify({
      ok: true,
      aiConfigured: Boolean(process.env.GEMINI_API_KEY),
      supabaseConfigured: Boolean(process.env.VITE_SUPABASE_URL),
      platform: 'netlify',
    }),
    {status: 200, headers: {'Content-Type': 'application/json'}},
  );
