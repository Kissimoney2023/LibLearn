import type {VercelRequest, VercelResponse} from '@vercel/node';

/** Confirms the deployment is live and whether the tutor key is configured. */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    ok: true,
    aiConfigured: Boolean(process.env.GEMINI_API_KEY),
    supabaseConfigured: Boolean(process.env.VITE_SUPABASE_URL),
  });
}
