import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {useAuth} from './AuthContext';
import * as store from '../lib/store';
import {summarise, examReadiness} from '../lib/progress';
import {recommend} from '../lib/recommendations';
import {evaluate} from '../lib/achievements';
import {track} from '../lib/analytics';
import {lessonById} from '../data/seed/curriculum';
import type {
  EarnedAchievement,
  ExamAttempt,
  LessonProgress,
  ProgressSummary,
  QuizAttempt,
  Recommendation,
} from '../types/domain';

interface StudentData {
  loading: boolean;
  lessons: LessonProgress[];
  quizzes: QuizAttempt[];
  exams: ExamAttempt[];
  achievements: EarnedAchievement[];
  summary: ProgressSummary;
  recommendations: Recommendation[];
  readiness: number;
  startLesson: (lessonId: string) => Promise<void>;
  completeLesson: (lessonId: string) => Promise<void>;
  recordQuiz: (attempt: QuizAttempt) => Promise<void>;
  recordExam: (attempt: ExamAttempt) => Promise<void>;
  isLessonComplete: (lessonId: string) => boolean;
}

const EMPTY_SUMMARY: ProgressSummary = {
  lessonsCompleted: 0,
  lessonsTotal: 0,
  quizzesTaken: 0,
  examAttempts: 0,
  streakDays: 0,
  overallAccuracy: null,
  bySubject: [],
  weakTopics: [],
  strongTopics: [],
};

const StudentDataContext = createContext<StudentData | null>(null);

export function StudentDataProvider({children}: {children: ReactNode}) {
  const {profile} = useAuth();
  const userId = profile?.id ?? null;

  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<LessonProgress[]>([]);
  const [quizzes, setQuizzes] = useState<QuizAttempt[]>([]);
  const [exams, setExams] = useState<ExamAttempt[]>([]);
  const [achievements, setAchievements] = useState<EarnedAchievement[]>([]);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const [l, q, e, a] = await Promise.all([
          store.loadLessonProgress(userId),
          store.loadQuizAttempts(userId),
          store.loadExamAttempts(userId),
          store.loadAchievements(userId),
        ]);
        if (cancelled) return;
        setLessons(l);
        setQuizzes(q);
        setExams(e);
        setAchievements(a);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const summary = useMemo(
    () =>
      profile
        ? summarise(lessons, quizzes, exams, profile.selectedSubjects, profile.grade)
        : EMPTY_SUMMARY,
    [lessons, quizzes, exams, profile],
  );

  const recommendations = useMemo(
    () =>
      profile
        ? recommend(summary, lessons, profile.grade, profile.selectedSubjects, profile.examGoal)
        : [],
    [summary, lessons, profile],
  );

  const readiness = useMemo(() => examReadiness(summary), [summary]);

  // Achievements are re-derived whenever activity changes, then persisted only
  // if the set actually grew.
  useEffect(() => {
    if (!userId || loading) return;
    const next = evaluate(lessons, quizzes, exams, summary, achievements);
    if (next.length !== achievements.length) {
      setAchievements(next);
      void store.saveAchievements(userId, next);
    }
  }, [userId, loading, lessons, quizzes, exams, summary, achievements]);

  const startLesson = useCallback(
    async (lessonId: string) => {
      if (!userId) return;
      const lesson = lessonById(lessonId);
      if (!lesson) return;
      if (lessons.some((l) => l.lessonId === lessonId)) return;
      const entry: LessonProgress = {
        lessonId,
        subjectId: lesson.subjectId,
        topicId: lesson.topicId,
        grade: lesson.grade,
        status: 'in_progress',
        startedAt: new Date().toISOString(),
        completedAt: null,
      };
      setLessons(await store.upsertLessonProgress(userId, entry));
      track('lesson_started', {lessonId, subjectId: lesson.subjectId});
    },
    [userId, lessons],
  );

  const completeLesson = useCallback(
    async (lessonId: string) => {
      if (!userId) return;
      const lesson = lessonById(lessonId);
      if (!lesson) return;
      const existing = lessons.find((l) => l.lessonId === lessonId);
      const entry: LessonProgress = {
        lessonId,
        subjectId: lesson.subjectId,
        topicId: lesson.topicId,
        grade: lesson.grade,
        status: 'completed',
        startedAt: existing?.startedAt ?? new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };
      setLessons(await store.upsertLessonProgress(userId, entry));
      track('lesson_completed', {lessonId, subjectId: lesson.subjectId});
    },
    [userId, lessons],
  );

  const recordQuiz = useCallback(
    async (attempt: QuizAttempt) => {
      if (!userId) return;
      setQuizzes(await store.addQuizAttempt(userId, attempt));
      track('quiz_completed', {
        quizId: attempt.quizId,
        score: attempt.score,
        total: attempt.total,
      });
    },
    [userId],
  );

  const recordExam = useCallback(
    async (attempt: ExamAttempt) => {
      if (!userId) return;
      setExams(await store.saveExamAttempt(userId, attempt));
      if (attempt.submittedAt) {
        track('exam_completed', {
          exam: attempt.exam,
          score: attempt.score,
          total: attempt.total,
        });
      }
    },
    [userId],
  );

  const isLessonComplete = useCallback(
    (lessonId: string) =>
      lessons.some((l) => l.lessonId === lessonId && l.status === 'completed'),
    [lessons],
  );

  const value = useMemo<StudentData>(
    () => ({
      loading,
      lessons,
      quizzes,
      exams,
      achievements,
      summary,
      recommendations,
      readiness,
      startLesson,
      completeLesson,
      recordQuiz,
      recordExam,
      isLessonComplete,
    }),
    [
      loading, lessons, quizzes, exams, achievements, summary, recommendations,
      readiness, startLesson, completeLesson, recordQuiz, recordExam, isLessonComplete,
    ],
  );

  return (
    <StudentDataContext.Provider value={value}>{children}</StudentDataContext.Provider>
  );
}

export function useStudentData(): StudentData {
  const ctx = useContext(StudentDataContext);
  if (!ctx) throw new Error('useStudentData must be used inside <StudentDataProvider>');
  return ctx;
}
