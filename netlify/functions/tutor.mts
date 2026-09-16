import type {Context} from '@netlify/functions';
import {handleTutorRequest} from '../../server/tutor';

/**
 * Netlify Function (v2) for the AI tutor.
 *
 * This is the only server-side code in the deployed app; everything else is
 * static output on Netlify's CDN. GEMINI_API_KEY is read here from the
 * function's runtime environment and never reaches the browser.
 *
 * The variable must NOT carry a VITE_ prefix. Vite inlines every VITE_* value
 * into the client bundle at build time, which would publish the key to every
 * visitor.
 *
 * Reached at /api/ai/tutor via the redirect in netlify.toml, so the browser
 * code is identical across Netlify, Vercel and local development.
 */
export default async (req: Request, context: Context): Promise<Response> => {
  const json = (status: number, body: unknown) =>
    new Response(JSON.stringify(body), {
      status,
      headers: {'Content-Type': 'application/json'},
    });

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({error: 'Method not allowed.'}), {
      status: 405,
      headers: {'Content-Type': 'application/json', Allow: 'POST'},
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, {error: 'Invalid request.'});
  }

  // Netlify supplies the client IP on the context; fall back to its header.
  const ip =
    context.ip ??
    req.headers.get('x-nf-client-connection-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';

  const result = await handleTutorRequest(body, ip);
  return json(result.status, result.body);
};
