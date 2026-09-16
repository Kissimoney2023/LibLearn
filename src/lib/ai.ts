import type {AiMessage, TutorContext, TutorMode} from '../types/domain';

/**
 * Browser-side client for the tutor endpoint.
 *
 * The Gemini key never reaches this file. Requests go to the server route,
 * which holds the key and builds the system prompt. See `server.ts`.
 */
const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export interface TutorRequest {
  message: string;
  mode: TutorMode;
  context: TutorContext;
  /** Prior turns, so the model can follow the thread. */
  history: Pick<AiMessage, 'role' | 'content'>[];
}

export interface TutorReply {
  message: string;
  suggestedActions?: string[];
  degraded?: boolean;
}

export class TutorUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TutorUnavailableError';
  }
}

export async function askTutor(req: TutorRequest): Promise<TutorReply> {
  let res: Response;
  try {
    res = await fetch(`${BASE}/api/ai/tutor`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(req),
    });
  } catch {
    throw new TutorUnavailableError(
      'Could not reach the tutor. Check your connection and try again.',
    );
  }

  if (res.status === 429) {
    throw new TutorUnavailableError(
      'You have asked a lot of questions very quickly. Wait a moment, then try again.',
    );
  }
  if (res.status === 503) {
    throw new TutorUnavailableError(
      'The AI tutor is not configured on this server yet. Lessons and practice still work.',
    );
  }
  if (!res.ok) {
    throw new TutorUnavailableError(
      'Something went wrong reaching the tutor. Please try again.',
    );
  }

  return (await res.json()) as TutorReply;
}

/** Labels for the tutor quick actions, shared by the chat and lesson views. */
export const MODE_LABELS: Record<Exclude<TutorMode, 'chat'>, string> = {
  explain: 'Explain this',
  example: 'Give me an example',
  quiz_me: 'Quiz me',
  homework: 'Help with homework',
  simplify: 'Make it easier',
  practice: 'Practice this topic',
};
