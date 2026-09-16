import type {VercelRequest, VercelResponse} from '@vercel/node';
import {handleTutorRequest} from '../../server/tutor';

/**
 * Vercel serverless function for the AI tutor.
 *
 * This is the only server-side code in the deployed app: the rest is static
 * output on the CDN. GEMINI_API_KEY is read here from the function's runtime
 * environment and never reaches the browser.
 *
 * The variable must NOT be named with a VITE_ prefix. Vite inlines every
 * VITE_* value into the client bundle at build time, which would publish the
 * key to every visitor.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({error: 'Method not allowed.'});
    return;
  }

  // Vercel sets x-forwarded-for; fall back so local `vercel dev` still limits.
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]?.trim()) ??
    req.socket?.remoteAddress ??
    'unknown';

  const {status, body} = await handleTutorRequest(req.body, ip);
  res.status(status).json(body);
}
