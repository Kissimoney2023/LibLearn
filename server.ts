/**
 * Local development API server.
 *
 * Vercel does not run this - there, `api/ai/tutor.ts` is a serverless function
 * and the SPA is served from the CDN. Both call the same `handleTutorRequest`
 * in server/tutor.ts, so the prompt rules and safety guards cannot drift apart
 * between environments.
 *
 * Run alongside `npm run dev`; Vite proxies /api here (see vite.config.ts).
 */
import 'dotenv/config';
import express, {type Request, type Response} from 'express';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {handleTutorRequest} from './server/tutor';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(express.json({limit: '64kb'}));

app.post('/api/ai/tutor', async (req: Request, res: Response) => {
  const {status, body} = await handleTutorRequest(req.body, req.ip ?? 'unknown');
  res.status(status).json(body);
});

app.get('/api/health', (_req, res) => {
  res.json({ok: true, aiConfigured: Boolean(process.env.GEMINI_API_KEY)});
});

// Serve the built SPA when running this as a standalone server.
const dist = path.join(__dirname, 'dist');
app.use(express.static(dist));
app.get('*', (_req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`LibLearn API listening on :${PORT}`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY is not set - /api/ai/tutor will return 503.');
  }
});
