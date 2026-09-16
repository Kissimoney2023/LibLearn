import {isSupabaseConfigured, supabase} from './supabase';
import {readJSON, writeJSON, clearAll} from './storage';
import {toError} from './errors';
import type {
  AiSession,
  EarnedAchievement,
  ExamAttempt,
  ExamGoal,
  GradeLevel,
  LessonProgress,
  Profile,
  QuizAttempt,
} from '../types/domain';

/**
 * One repository for every piece of student state.
 *
 * Two backends sit behind it:
 *   - Supabase, when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.
 *   - This browser's localStorage otherwise.
 *
 * The local backend is a real, working fallback - not a stub. What it cannot do
 * is carry a student's work to another device, and the UI says so plainly
 * rather than implying the data is safe on a server.
 *
 * TypeScript uses camelCase; Postgres uses snake_case. Every Supabase read and
 * write goes through an explicit mapper below. Passing a domain object straight
 * to the client would silently create the wrong columns, so nothing here spreads
 * a domain object into a query.
 */

export type Backend = 'supabase' | 'local';

export const backend: Backend = isSupabaseConfigured ? 'supabase' : 'local';

const K = {
  profile: 'profile',
  lessons: 'lesson-progress',
  quizzes: 'quiz-attempts',
  exams: 'exam-attempts',
  achievements: 'achievements',
  sessions: 'ai-sessions',
} as const;

/* ------------------------------------------------------------------ rows */

interface ProfileRow {
  id: string;
  name: string;
  email: string;
  role: Profile['role'];
  grade: number | null;
  selected_subjects: string[];
  exam_goal: ExamGoal | null;
  onboarded_at: string | null;
  created_at: string;
  updated_at: string;
}

const toProfile = (r: ProfileRow): Profile => ({
  id: r.id,
  name: r.name,
  email: r.email,
  role: r.role,
  grade: (r.grade as GradeLevel | null) ?? null,
  selectedSubjects: r.selected_subjects ?? [],
  examGoal: r.exam_goal,
  onboardedAt: r.onboarded_at,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

/** `role` is deliberately absent: a student may never set their own role. */
const fromProfile = (p: Profile) => ({
  id: p.id,
  name: p.name,
  email: p.email,
  grade: p.grade,
  selected_subjects: p.selectedSubjects,
  exam_goal: p.examGoal,
  onboarded_at: p.onboardedAt,
});

interface LessonRow {
  user_id: string;
  lesson_id: string;
  subject_id: string;
  topic_id: string;
  grade: number;
  status: LessonProgress['status'];
  started_at: string;
  completed_at: string | null;
}

const toLesson = (r: LessonRow): LessonProgress => ({
  lessonId: r.lesson_id,
  subjectId: r.subject_id,
  topicId: r.topic_id,
  grade: r.grade as GradeLevel,
  status: r.status,
  startedAt: r.started_at,
  completedAt: r.completed_at,
});

const fromLesson = (userId: string, l: LessonProgress) => ({
  user_id: userId,
  lesson_id: l.lessonId,
  subject_id: l.subjectId,
  topic_id: l.topicId,
  grade: l.grade,
  status: l.status,
  started_at: l.startedAt,
  completed_at: l.completedAt,
});

interface QuizRow {
  id: string;
  quiz_id: string;
  subject_id: string;
  topic_id: string;
  grade: number;
  answers: QuizAttempt['answers'];
  score: number;
  total: number;
  started_at: string;
  submitted_at: string;
}

const toQuiz = (r: QuizRow): QuizAttempt => ({
  id: r.id,
  quizId: r.quiz_id,
  subjectId: r.subject_id,
  topicId: r.topic_id,
  grade: r.grade as GradeLevel,
  answers: r.answers ?? [],
  score: r.score,
  total: r.total,
  startedAt: r.started_at,
  submittedAt: r.submitted_at,
});

const fromQuiz = (userId: string, q: QuizAttempt) => ({
  id: q.id,
  user_id: userId,
  quiz_id: q.quizId,
  subject_id: q.subjectId,
  topic_id: q.topicId,
  grade: q.grade,
  answers: q.answers,
  score: q.score,
  total: q.total,
  started_at: q.startedAt,
  submitted_at: q.submittedAt,
});

interface ExamRow {
  id: string;
  exam: ExamGoal;
  subject_id: string;
  difficulty: ExamAttempt['difficulty'];
  question_ids: string[];
  answers: ExamAttempt['answers'];
  flagged: string[];
  score: number;
  total: number;
  duration_seconds: number;
  started_at: string;
  submitted_at: string | null;
}

const toExam = (r: ExamRow): ExamAttempt => ({
  id: r.id,
  exam: r.exam,
  subjectId: r.subject_id,
  difficulty: r.difficulty,
  questionIds: r.question_ids ?? [],
  answers: r.answers ?? [],
  flagged: r.flagged ?? [],
  score: r.score,
  total: r.total,
  durationSeconds: r.duration_seconds,
  startedAt: r.started_at,
  submittedAt: r.submitted_at,
});

const fromExam = (userId: string, e: ExamAttempt) => ({
  id: e.id,
  user_id: userId,
  exam: e.exam,
  subject_id: e.subjectId,
  difficulty: e.difficulty,
  question_ids: e.questionIds,
  answers: e.answers,
  flagged: e.flagged,
  score: e.score,
  total: e.total,
  duration_seconds: e.durationSeconds,
  started_at: e.startedAt,
  submitted_at: e.submittedAt,
});

interface AchievementRow {
  achievement_id: string;
  earned_at: string;
}

/* --------------------------------------------------------------- profile */

export async function loadProfile(userId: string): Promise<Profile | null> {
  if (supabase) {
    const {data, error} = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (error) throw toError(error);
    return data ? toProfile(data as ProfileRow) : null;
  }
  return readJSON<Profile | null>(K.profile, null);
}

export async function saveProfile(profile: Profile): Promise<Profile> {
  const next = {...profile, updatedAt: new Date().toISOString()};
  if (supabase) {
    const {data, error} = await supabase
      .from('profiles')
      .upsert(fromProfile(next))
      .select()
      .single();
    if (error) throw toError(error);
    return toProfile(data as ProfileRow);
  }
  writeJSON(K.profile, next);
  return next;
}

/* ------------------------------------------------------- lesson progress */

export async function loadLessonProgress(userId: string): Promise<LessonProgress[]> {
  if (supabase) {
    const {data, error} = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', userId);
    if (error) throw toError(error);
    return ((data ?? []) as LessonRow[]).map(toLesson);
  }
  return readJSON<LessonProgress[]>(K.lessons, []);
}

export async function upsertLessonProgress(
  userId: string,
  entry: LessonProgress,
): Promise<LessonProgress[]> {
  const all = await loadLessonProgress(userId);
  const next = [...all.filter((l) => l.lessonId !== entry.lessonId), entry];
  if (supabase) {
    const {error} = await supabase
      .from('lesson_progress')
      .upsert(fromLesson(userId, entry), {onConflict: 'user_id,lesson_id'});
    if (error) throw toError(error);
    return next;
  }
  writeJSON(K.lessons, next);
  return next;
}

/* --------------------------------------------------------------- quizzes */

export async function loadQuizAttempts(userId: string): Promise<QuizAttempt[]> {
  if (supabase) {
    const {data, error} = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('submitted_at', {ascending: true});
    if (error) throw toError(error);
    return ((data ?? []) as QuizRow[]).map(toQuiz);
  }
  return readJSON<QuizAttempt[]>(K.quizzes, []);
}

export async function addQuizAttempt(
  userId: string,
  attempt: QuizAttempt,
): Promise<QuizAttempt[]> {
  const all = await loadQuizAttempts(userId);
  const next = [...all, attempt];
  if (supabase) {
    const {error} = await supabase.from('quiz_attempts').insert(fromQuiz(userId, attempt));
    if (error) throw toError(error);
    return next;
  }
  writeJSON(K.quizzes, next);
  return next;
}

/* ----------------------------------------------------------------- exams */

export async function loadExamAttempts(userId: string): Promise<ExamAttempt[]> {
  if (supabase) {
    const {data, error} = await supabase
      .from('exam_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', {ascending: true});
    if (error) throw toError(error);
    return ((data ?? []) as ExamRow[]).map(toExam);
  }
  return readJSON<ExamAttempt[]>(K.exams, []);
}

export async function saveExamAttempt(
  userId: string,
  attempt: ExamAttempt,
): Promise<ExamAttempt[]> {
  const all = await loadExamAttempts(userId);
  const next = [...all.filter((e) => e.id !== attempt.id), attempt];
  if (supabase) {
    // A submitted attempt is sealed by RLS, so this is an insert-or-finalise
    // rather than a general upsert.
    const {error} = await supabase
      .from('exam_attempts')
      .upsert(fromExam(userId, attempt), {onConflict: 'id'});
    if (error) throw toError(error);
    return next;
  }
  writeJSON(K.exams, next);
  return next;
}

/* ---------------------------------------------------------- achievements */

export async function loadAchievements(userId: string): Promise<EarnedAchievement[]> {
  if (supabase) {
    const {data, error} = await supabase
      .from('student_achievements')
      .select('achievement_id, earned_at')
      .eq('user_id', userId);
    if (error) throw toError(error);
    return ((data ?? []) as AchievementRow[]).map((r) => ({
      achievementId: r.achievement_id,
      earnedAt: r.earned_at,
    }));
  }
  return readJSON<EarnedAchievement[]>(K.achievements, []);
}

export async function saveAchievements(
  userId: string,
  earned: EarnedAchievement[],
): Promise<void> {
  if (supabase) {
    if (earned.length === 0) return;
    const {error} = await supabase.from('student_achievements').upsert(
      earned.map((e) => ({
        user_id: userId,
        achievement_id: e.achievementId,
        earned_at: e.earnedAt,
      })),
      {onConflict: 'user_id,achievement_id'},
    );
    if (error) throw toError(error);
    return;
  }
  writeJSON(K.achievements, earned);
}

/* ---------------------------------------------------------- AI sessions */

export function loadSessions(): AiSession[] {
  return readJSON<AiSession[]>(K.sessions, []);
}

export function saveSessions(sessions: AiSession[]): void {
  // Capped so a long-running conversation cannot fill the storage quota.
  writeJSON(K.sessions, sessions.slice(-20));
}

export function clearLocalState(): void {
  clearAll();
}
