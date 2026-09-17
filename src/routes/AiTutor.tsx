import {useEffect, useRef, useState} from 'react';
import {Send} from 'lucide-react';
import {useAuth} from '../context/AuthContext';
import {Button, Card, ErrorState} from '../components/ui';
import {askTutor, MODE_LABELS, TutorUnavailableError} from '../lib/ai';
import {loadSessions, saveSessions} from '../lib/store';
import {readJSON, writeJSON} from '../lib/storage';
import {track} from '../lib/analytics';
import type {AiMessage, TeachingStyle, TutorMode} from '../types/domain';

const STYLE_LABELS: Record<TeachingStyle, string> = {
  standard: 'Standard English',
  simple: 'Simple English',
  liberian: 'Liberian English',
};

export default function AiTutor() {
  const {profile} = useAuth();
  const [messages, setMessages] = useState<AiMessage[]>(
    () => loadSessions().at(-1)?.messages ?? [],
  );
  // The profile is the source of truth; local storage is only a fallback for
  // a session whose profile has not loaded yet.
  const [style, setStyle] = useState<TeachingStyle>(
    () => profile?.preferredLanguage ?? readJSON<TeachingStyle>('teaching-style', 'standard'),
  );
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages, busy]);

  useEffect(() => {
    writeJSON('teaching-style', style);
  }, [style]);

  async function send(text: string, mode: TutorMode) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const studentMsg: AiMessage = {
      id: `m-${Date.now().toString(36)}`,
      role: 'student',
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    const history = [...messages, studentMsg];
    setMessages(history);
    setInput('');
    setBusy(true);
    setError(null);
    track('ai_question_asked', {mode, style});

    try {
      const reply = await askTutor({
        message: trimmed,
        mode,
        context: {grade: profile?.grade ?? null, style},
        history: messages.map((m) => ({role: m.role, content: m.content})),
      });
      const tutorMsg: AiMessage = {
        id: `m-${Date.now().toString(36)}-r`,
        role: 'tutor',
        content: reply.message,
        createdAt: new Date().toISOString(),
        suggestedActions: reply.suggestedActions,
      };
      const next = [...history, tutorMsg];
      setMessages(next);
      saveSessions([
        {
          id: 'current',
          messages: next,
          context: {grade: profile?.grade ?? null, style},
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError(
        err instanceof TutorUnavailableError
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full max-w-3xl flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-bold">AI Tutor</h1>
        <p className="text-sm text-on-surface-variant">
          Ask anything about your lessons. The tutor guides you to the answer rather than
          handing it over.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-on-surface-variant">Teaching style</span>
        {(Object.keys(STYLE_LABELS) as TeachingStyle[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStyle(s)}
            aria-pressed={style === s}
            className={`inline-flex h-9 items-center rounded-full border px-3 text-sm font-medium transition-colors ${
              style === s
                ? 'border-primary bg-primary-surface text-on-primary-surface'
                : 'border-outline text-on-surface-variant'
            }`}>
            {STYLE_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="flex min-h-64 flex-1 flex-col gap-3 rounded-lg border border-outline-variant bg-surface-lowest p-4">
        {messages.length === 0 && !busy && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold">Ask your first question.</p>
            <p className="max-w-sm text-sm text-on-surface-variant">
              Try &ldquo;explain how to solve 3x + 4 = 19&rdquo;, or use a quick action below.
            </p>
          </div>
        )}

        {messages.map((m) =>
          m.role === 'tutor' ? (
            <div
              key={m.id}
              className="max-w-[85%] rounded-lg rounded-bl-sm bg-surface-low p-4 text-base leading-6 text-on-surface">
              {m.content}
            </div>
          ) : (
            <div
              key={m.id}
              className="ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-secondary p-4 text-base leading-6 text-on-secondary">
              {m.content}
            </div>
          ),
        )}

        {busy && (
          <div className="max-w-[85%] rounded-lg rounded-bl-sm bg-surface-low p-4 text-sm text-on-surface-variant">
            LibLearn AI is thinking…
          </div>
        )}
        <div ref={endRef} />
      </div>

      {error && <ErrorState message="The tutor could not answer" hint={error} />}

      <div className="flex flex-wrap gap-2">
        {(Object.keys(MODE_LABELS) as Exclude<TutorMode, 'chat'>[]).map((mode) => (
          <button
            key={mode}
            type="button"
            disabled={busy}
            onClick={() => send(MODE_LABELS[mode], mode)}
            className="inline-flex min-h-12 items-center rounded-lg border border-outline bg-surface-lowest px-4 text-sm font-medium disabled:opacity-50">
            {MODE_LABELS[mode]}
          </button>
        ))}
      </div>

      <form
        className="sticky bottom-0 flex gap-2 bg-surface pb-2 pt-1"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input, 'chat');
        }}>
        <input
          id="tutor-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          aria-label="Ask the AI tutor a question"
          className="h-12 flex-1 rounded-lg border-[1.5px] border-outline bg-surface-lowest px-3.5 placeholder:text-outline focus:border-secondary"
        />
        <Button type="submit" disabled={busy || input.trim().length === 0}>
          <Send size={18} aria-hidden="true" />
          <span className="sr-only">Send</span>
        </Button>
      </form>

      <Card>
        <p className="text-sm text-on-surface-variant">
          The AI tutor does not have the official Liberian curriculum or examination
          syllabus. It will say so rather than guess. Check requirements with your teacher
          or school.
        </p>
      </Card>
    </div>
  );
}
