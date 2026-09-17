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
import type {
  ActivityEvent,
  Bookmark,
  BookmarkType,
  EarnedAchievement,
  ExamAttempt,
  Lesson,
  LessonProgress,
  ProgressSummary,
  QuizAttempt,
  Recommendation,
} from '../types/domain';

/**
 * The minimum a caller must supply to record progress against a lesson.
 *
 * Progress used to be recorded from a lesson id alone, looked up in the bundled
 * seed data. That silently did nothing for any lesson loaded from the database,
 * because the lookup returned undefined and the function returned early - a
 * student would mark a lesson complete and watch nothing happen. Callers hold
 * the lesson already, so they pass what is needed.
 */
export type LessonRef = Pick<Lesson, 'id' | 'subjectId' | 'topicId' | 'grade'>;

interface StudentData {
  loading: boolean;
  lessons: LessonProgress[];
  quizzes: QuizAttempt[];
  exams: ExamAttempt[];
  achievements: EarnedAchievement[];
  summary: ProgressSummary;
  recommendations: Recommendation[];
  readiness: number;
  bookmarks: Bookmark[];
  activity: ActivityEvent[];
  startLesson: (lesson: LessonRef) => Promise<void>;
  completeLesson: (lesson: LessonRef, title?: string) => Promise<void>;
  toggleBookmark: (b: {
    contentType: BookmarkType;
    contentId: string;
    title: string;
    subjectId?: string;
    grade?: LessonRef['grade'];
  }) => Promise<boolean>;
  isBookmarked: (contentType: BookmarkType, contentId: string) => boolean;
  logActivity: (e: Omit<ActivityEvent, 'id' | 'createdAt'>) => Promise<void>;
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
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const [l, q, e, a, b, ev] = await Promise.all([
          store.loadLessonProgress(userId),
          store.loadQuizAttempts(userId),
          store.loadExamAttempts(userId),
          store.loadAchievements(userId),
          store.loadBookmarks(userId),
          store.loadActivity(userId),
        ]);
        if (cancelled) return;
        setLessons(l);
        setQuizzes(q);
        setExams(e);
        setAchievements(a);
        setBookmarks(b);
        setActivity(ev);
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
    async (lesson: LessonRef) => {
      if (!userId) return;
      if (lessons.some((l) => l.lessonId === lesson.id)) return;
      const entry: LessonProgress = {
        lessonId: lesson.id,
        subjectId: lesson.subjectId,
        topicId: lesson.topicId,
        grade: lesson.grade,
        status: 'in_progress',
        startedAt: new Date().toISOString(),
        completedAt: null,
      };
      setLessons(await store.upsertLessonProgress(userId, entry));
      track('lesson_started', {lessonId: lesson.id, subjectId: lesson.subjectId});
      void store.recordActivity(userId, {
        activityType: 'lesson_opened',
        contentType: 'lesson',
        contentId: lesson.id,
        metadata: {subjectId: lesson.subjectId, grade: lesson.grade},
      });
    },
    [userId, lessons],
  );

  const completeLesson = useCallback(
    async (lesson: LessonRef, title?: string) => {
      if (!userId) return;
      const existing = lessons.find((l) => l.lessonId === lesson.id);
      const entry: LessonProgress = {
        lessonId: lesson.id,
        subjectId: lesson.subjectId,
        topicId: lesson.topicId,
        grade: lesson.grade,
        status: 'completed',
        startedAt: existing?.startedAt ?? new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };
      setLessons(await store.upsertLessonProgress(userId, entry));
      track('lesson_completed', {lessonId: lesson.id, subjectId: lesson.subjectId});
      void store.recordActivity(userId, {
        activityType: 'lesson_completed',
        contentType: 'lesson',
        contentId: lesson.id,
        metadata: {subjectId: lesson.subjectId, grade: lesson.grade, title: title ?? ''},
      });
      setActivity(await store.loadActivity(userId));
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

  const toggleBookmark = useCallback(
    async (b: {
      contentType: BookmarkType;
      contentId: string;
      title: string;
      subjectId?: string;
      grade?: LessonRef['grade'];
    }) => {
      if (!userId) return false;
      const {bookmarks: next, added} = await store.toggleBookmark(userId, b);
      setBookmarks(next);
      if (added) {
        void store.recordActivity(userId, {
          activityType: 'bookmark_created',
          contentType: b.contentType,
          contentId: b.contentId,
          metadata: {title: b.title, subjectId: b.subjectId ?? ''},
        });
        setActivity(await store.loadActivity(userId));
      }
      return added;
    },
    [userId],
  );

  const isBookmarked = useCallback(
    (contentType: BookmarkType, contentId: string) =>
      bookmarks.some((b) => b.contentType === contentType && b.contentId === contentId),
    [bookmarks],
  );

  const logActivity = useCallback(
    async (e: Omit<ActivityEvent, 'id' | 'createdAt'>) => {
      if (!userId) return;
      await store.recordActivity(userId, e);
      setActivity(await store.loadActivity(userId));
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
      bookmarks,
      activity,
      startLesson,
      completeLesson,
      recordQuiz,
      recordExam,
      isLessonComplete,
      toggleBookmark,
      isBookmarked,
      logActivity,
    }),
    [
      loading, lessons, quizzes, exams, achievements, summary, recommendations,
      readiness, bookmarks, activity, startLesson, completeLesson, recordQuiz,
      recordExam, isLessonComplete, toggleBookmark, isBookmarked, logActivity,
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
