/**
 * LibLearn domain model.
 *
 * Phase 2 note: `UserRole` already carries teacher/parent/school_admin even
 * though the MVP only implements `student`. Roles live on the profile from day
 * one so the Phase 2 portals can be added without migrating existing rows.
 */

export type UserRole =
  | 'student'
  | 'teacher'
  | 'parent'
  | 'school_admin'
  | 'super_admin';

/** Grades 4-12 are the full MVP range. */
export type GradeLevel = 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export const GRADE_LEVELS: GradeLevel[] = [4, 5, 6, 7, 8, 9, 10, 11, 12];

/**
 * Examination targets. These identifiers name real Liberian/West African
 * examinations, but LibLearn holds NO verified syllabus, grading rule or
 * eligibility requirement for any of them - see `ContentProvenance`.
 */
export type ExamGoal = 'general' | 'lpsce' | 'ljhsce' | 'wassce';

export interface ExamDefinition {
  id: ExamGoal;
  name: string;
  /** Short label shown on cards, e.g. "Senior High". */
  levelLabel: string;
  description: string;
  /** Grades this exam is typically prepared for, per LibLearn's own grouping. */
  gradeRange: GradeLevel[];
}

export type Difficulty = 'foundation' | 'core' | 'challenge';

/**
 * Every content record declares where it came from. The UI must surface
 * `demo` content as sample material and must never present it as official
 * Liberian curriculum.
 */
export type ContentProvenance = 'demo' | 'verified' | 'ai-generated';

export interface Subject {
  id: string;
  name: string;
  /** Material Symbols glyph name. */
  icon: string;
  grades: GradeLevel[];
}

export interface Topic {
  id: string;
  subjectId: string;
  grade: GradeLevel;
  name: string;
  summary: string;
  order: number;
}

export interface LearningObjective {
  id: string;
  text: string;
}

export interface LessonSection {
  heading: string;
  body: string;
  /** Worked examples render in a distinct block from explanatory prose. */
  example?: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  subjectId: string;
  grade: GradeLevel;
  title: string;
  /** Minutes. Drives the "x min" chip and the study-plan estimate. */
  estimatedMinutes: number;
  objectives: LearningObjective[];
  sections: LessonSection[];
  provenance: ContentProvenance;
  order: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  /** Index into `options`. Never sent to the client during an active attempt. */
  correctAnswer: number;
  explanation: string;
  subjectId: string;
  grade: GradeLevel;
  topicId: string;
  difficulty: Difficulty;
  /** Set when the question is written for a specific examination. */
  examGoal?: ExamGoal;
  provenance: ContentProvenance;
}

export interface Quiz {
  id: string;
  lessonId?: string;
  topicId: string;
  subjectId: string;
  grade: GradeLevel;
  title: string;
  questionIds: string[];
}

/* ---------- Student state ---------- */

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  grade: GradeLevel | null;
  selectedSubjects: string[];
  examGoal: ExamGoal | null;
  onboardedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LessonProgress {
  lessonId: string;
  subjectId: string;
  topicId: string;
  grade: GradeLevel;
  status: 'in_progress' | 'completed';
  startedAt: string;
  completedAt: string | null;
}

export interface QuizAnswer {
  questionId: string;
  /** null when the student left it unanswered. */
  selected: number | null;
  correct: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  subjectId: string;
  topicId: string;
  grade: GradeLevel;
  answers: QuizAnswer[];
  score: number;
  total: number;
  startedAt: string;
  submittedAt: string;
}

export interface ExamAttempt {
  id: string;
  exam: ExamGoal;
  subjectId: string;
  difficulty: Difficulty;
  questionIds: string[];
  answers: QuizAnswer[];
  flagged: string[];
  score: number;
  total: number;
  /** Seconds elapsed between start and submission. */
  durationSeconds: number;
  startedAt: string;
  submittedAt: string | null;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface EarnedAchievement {
  achievementId: string;
  earnedAt: string;
}

export type RecommendationKind =
  | 'continue_lesson'
  | 'practice_weak_topic'
  | 'exam_practice'
  | 'next_lesson';

export interface Recommendation {
  id: string;
  kind: RecommendationKind;
  title: string;
  /** Plain-language justification, shown to the student. */
  reason: string;
  href: string;
  subjectId?: string;
  topicId?: string;
}

export interface SubjectPerformance {
  subjectId: string;
  lessonsCompleted: number;
  lessonsTotal: number;
  /** Mean quiz accuracy as a percentage, or null with no attempts yet. */
  accuracy: number | null;
}

export interface ProgressSummary {
  lessonsCompleted: number;
  lessonsTotal: number;
  quizzesTaken: number;
  examAttempts: number;
  /** Consecutive days with recorded activity, counting back from today. */
  streakDays: number;
  overallAccuracy: number | null;
  bySubject: SubjectPerformance[];
  weakTopics: string[];
  strongTopics: string[];
}

/* ---------- AI tutor ---------- */

export type TeachingStyle = 'standard' | 'simple' | 'liberian';

export type TutorMode =
  | 'chat'
  | 'explain'
  | 'example'
  | 'quiz_me'
  | 'homework'
  | 'simplify'
  | 'practice';

export interface TutorContext {
  grade: GradeLevel | null;
  subjectId?: string;
  topicId?: string;
  lessonId?: string;
  style: TeachingStyle;
}

export interface AiMessage {
  id: string;
  role: 'student' | 'tutor';
  content: string;
  createdAt: string;
  /** Present on tutor replies that offer follow-up actions. */
  suggestedActions?: string[];
  /** True when the reply is a local fallback, not a model response. */
  degraded?: boolean;
}

export interface AiSession {
  id: string;
  messages: AiMessage[];
  context: TutorContext;
  createdAt: string;
}
