/**
 * LibLearn API server.
 *
 * Holds the Gemini key and serves the tutor endpoint. In production it also
 * serves the built SPA. The key is read from the environment and never sent to
 * the browser - the client talks only to /api/ai/tutor.
 */
import 'dotenv/config';
import express, {type Request, type Response} from 'express';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(express.json({limit: '64kb'}));

/* ---------------- Rate limiting ----------------
 * A fixed window per client IP. In-memory by design: it protects a single
 * instance against runaway cost and accidental loops. A multi-instance
 * deployment should move this to a shared store. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, {count: number; resetAt: number}>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, {count: 1, resetAt: now + WINDOW_MS});
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

// Keep the map from growing without bound on a long-lived process.
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of hits) if (now > entry.resetAt) hits.delete(ip);
}, WINDOW_MS).unref();

/* ---------------- Prompt construction ---------------- */

const STYLE_GUIDANCE: Record<string, string> = {
  standard: 'Write in clear standard English.',
  simple:
    'Use short sentences and everyday words. Avoid technical vocabulary unless you define it immediately.',
  liberian:
    'Write in warm, natural Liberian English, the way a friendly Liberian teacher speaks. ' +
    'Use it for encouragement and framing only. Every definition, formula, rule and worked ' +
    'step must stay academically correct and in standard terminology. Do not overuse slang, ' +
    'and never let the register make the mathematics or science wrong.',
};

const MODE_GUIDANCE: Record<string, string> = {
  chat: 'Answer the question directly and helpfully.',
  explain: 'Explain the concept from the beginning, in small steps.',
  example: 'Give one clear worked example, then a second for the student to try.',
  quiz_me: 'Ask three questions one at a time. Wait for an answer before the next.',
  homework:
    'The student is asking about homework. Do NOT give the final answer. Give a hint, ' +
    'name the method, or work a similar problem with different numbers, then ask them to try.',
  simplify: 'Re-explain what came before more simply, using a concrete everyday comparison.',
  practice: 'Offer practice questions on this topic, from easier to harder.',
};

function buildSystemPrompt(body: TutorBody): string {
  const {context, mode} = body;
  const grade = context.grade ?? 'unspecified';
  return [
    'You are the LibLearn AI Tutor, helping a student in Liberia.',
    `The student is in Grade ${grade}.`,
    context.subjectId ? `Subject: ${context.subjectId}.` : '',
    context.topicId ? `Topic: ${context.topicId}.` : '',
    context.lessonId ? `Current lesson: ${context.lessonId}.` : '',
    '',
    STYLE_GUIDANCE[context.style] ?? STYLE_GUIDANCE.standard,
    MODE_GUIDANCE[mode] ?? MODE_GUIDANCE.chat,
    '',
    'Rules you must follow:',
    `- Pitch every explanation at Grade ${grade}. Do not use vocabulary far above it.`,
    '- Break hard ideas into numbered steps.',
    '- End with one short question that checks understanding.',
    '- Never give a straight answer to homework. Guide the student to it.',
    '- You do NOT have the official Liberian curriculum, WASSCE, LJHSCE or LPSCE syllabus.',
    '  Never state examination requirements, grading rules, Ministry policy or official',
    '  curriculum standards as fact. If asked, say plainly that you do not have the',
    '  official information and suggest the student check with their teacher or school.',
    '- Keep replies under about 200 words unless the student asks for more.',
  ]
    .filter(Boolean)
    .join('\n');
}

interface TutorBody {
  message: string;
  mode: string;
  context: {
    grade: number | null;
    subjectId?: string;
    topicId?: string;
    lessonId?: string;
    style: string;
  };
  history: {role: 'student' | 'tutor'; content: string}[];
}

function validate(body: unknown): TutorBody | null {
  if (typeof body !== 'object' || body === null) return null;
  const b = body as Partial<TutorBody>;
  if (typeof b.message !== 'string' || b.message.trim().length === 0) return null;
  if (b.message.length > 2000) return null;
  if (typeof b.mode !== 'string') return null;
  if (typeof b.context !== 'object' || b.context === null) return null;
  if (!Array.isArray(b.history)) return null;
  return {
    message: b.message.trim(),
    mode: b.mode,
    context: {
      grade: b.context.grade ?? null,
      subjectId: b.context.subjectId,
      topicId: b.context.topicId,
      lessonId: b.context.lessonId,
      style: b.context.style ?? 'standard',
    },
    // Only the last few turns are sent, to bound the token cost per request.
    history: b.history.slice(-8).filter(
      (m) =>
        (m.role === 'student' || m.role === 'tutor') && typeof m.content === 'string',
    ),
  };
}

const SUGGESTIONS: Record<string, string[]> = {
  explain: ['Give me an example', 'Make it easier', 'Quiz me'],
  example: ['Explain this', 'Practice this topic', 'Make it easier'],
  quiz_me: ['Explain this', 'Give me an example'],
  homework: ['Explain this', 'Make it easier'],
  simplify: ['Give me an example', 'Quiz me'],
  practice: ['Explain this', 'Quiz me'],
  chat: ['Explain this', 'Give me an example', 'Quiz me'],
};

app.post('/api/ai/tutor', async (req: Request, res: Response) => {
  const ip = req.ip ?? 'unknown';
  if (rateLimited(ip)) {
    res.status(429).json({error: 'Too many requests. Please wait a moment.'});
    return;
  }

  const body = validate(req.body);
  if (!body) {
    res.status(400).json({error: 'Invalid request.'});
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Explicit, visible development state - never a fabricated reply.
    res.status(503).json({error: 'AI tutor is not configured on this server.'});
    return;
  }

  try {
    const {GoogleGenAI} = await import('@google/genai');
    const ai = new GoogleGenAI({apiKey});

    const contents = [
      ...body.history.map((m) => ({
        role: m.role === 'student' ? ('user' as const) : ('model' as const),
        parts: [{text: m.content}],
      })),
      {role: 'user' as const, parts: [{text: body.message}]},
    ];

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: buildSystemPrompt(body),
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    const text = result.text?.trim();
    if (!text) {
      res.status(502).json({error: 'The tutor returned an empty reply.'});
      return;
    }

    res.json({
      message: text,
      suggestedActions: SUGGESTIONS[body.mode] ?? SUGGESTIONS.chat,
    });
  } catch (err) {
    // Log server-side; the student sees a plain message, never a stack trace.
    console.error('[ai/tutor]', err);
    res.status(502).json({error: 'Could not reach the tutor right now.'});
  }
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    aiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Serve the built SPA in production.
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
