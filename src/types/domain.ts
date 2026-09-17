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
 * Every content record declares where it came from, and the UI must label it.
 *
 *  official      Reproduced from a government / Ministry / WAEC document that
 *                someone has actually read. Requires a `sourceId`.
 *  verified      Supported by a credible published educational source that
 *                someone has actually read. Requires a `sourceId`.
 *  liblearn      Written for LibLearn. Academically standard material, NOT
 *                claimed to match any national curriculum.
 *  ai-generated  Produced by a model at runtime. Never persisted as curriculum
 *                without passing through review (see ReviewStatus).
 *
 * The distinction that matters: `official` and `verified` are claims about
 * Liberia. Nothing may carry them until the underlying document has been read
 * by a person. Guessing here misinforms students about their own examinations.
 */
export type ContentProvenance =
  | 'official'
  | 'verified'
  | 'liblearn'
  | 'ai-generated';

/** Human-readable label per provenance tier, for UI badges. */
export const PROVENANCE_LABEL: Record<ContentProvenance, string> = {
  official: 'Official source',
  verified: 'Verified source',
  liblearn: 'LibLearn content',
  'ai-generated': 'AI generated',
};

/** Where a source document came from. */
export type SourceType =
  | 'MOE'
  | 'WAEC'
  | 'MCSS'
  | 'Government'
  | 'UNESCO'
  | 'WorldBank'
  | 'Other';

/**
 * How far a source has actually been checked.
 *
 * `located` is deliberately distinct from `reviewed`: knowing a document
 * exists at a URL is not the same as having read it, and only the latter can
 * justify `official` provenance on content.
 */
export type VerificationStatus =
  | 'located'
  | 'reviewed'
  | 'verified'
  | 'superseded'
  | 'verification-required';

/** A document LibLearn can cite. Registry lives in src/data/sources.ts. */
export interface ContentSource {
  id: string;
  title: string;
  organization: string;
  sourceType: SourceType;
  url?: string;
  documentDate?: string;
  curriculumVersionId?: string;
  description: string;
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string | null;
  /** Why this status - especially why something is not yet reviewed. */
  notes?: string;
}

/** Status of a curriculum version. Only `official-current` may drive claims. */
export type CurriculumStatus =
  | 'official-current'
  | 'official-historical'
  | 'revised'
  | 'draft'
  | 'archived'
  | 'reference';

export interface CurriculumVersion {
  id: string;
  name: string;
  description: string;
  status: CurriculumStatus;
  sourceId?: string;
  effectiveDate?: string;
  notes?: string;
}

/** Editorial pipeline for content, incl. anything a model drafts. */
export type ReviewStatus = 'draft' | 'in-review' | 'verified' | 'published';

export interface Subject {
  id: string;
  name: string;
  /** Material Symbols glyph name. */
  icon: string;
  grades: GradeLevel[];
}

/**
 * A unit groups related topics inside one subject at one grade.
 *
 *   Grade 11 -> Mathematics -> Algebra -> Quadratic Equations -> Lesson -> Quiz
 *                              ^^^^^^^ this
 *
 * Curriculum documents are organised this way, so carrying the level makes
 * importing one a mapping exercise rather than a reshaping exercise. `unitId`
 * on Topic stays optional: a topic that has not been filed under a unit still
 * renders, which matters while curriculum is being loaded piecemeal.
 */
export interface Unit {
  id: string;
  subjectId: string;
  grade: GradeLevel;
  name: string;
  summary: string;
  order: number;
  curriculumVersionId?: string;
  provenance?: ContentProvenance;
  sourceId?: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  grade: GradeLevel;
  name: string;
  summary: string;
  order: number;
  /** The unit this topic belongs to. Optional: see Unit. */
  unitId?: string;
  /** Which curriculum version places this topic at this grade. */
  curriculumVersionId?: string;
  provenance?: ContentProvenance;
  sourceId?: string;
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
  /** Required when provenance is 'official' or 'verified'. */
  sourceId?: string;
  curriculumVersionId?: string;
  reviewStatus?: ReviewStatus;
  /** Terms a student can look up; feeds the glossary and search. */
  keyTerms?: {term: string; definition: string}[];
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

/** How the tutor speaks. Liberian English stays academically precise. */
export type TeachingStyle = 'standard' | 'simple' | 'liberian';

export const TEACHING_STYLE_LABEL: Record<TeachingStyle, string> = {
  standard: 'Standard English',
  simple: 'Simple English',
  liberian: 'Liberian English',
};

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  grade: GradeLevel | null;
  selectedSubjects: string[];
  examGoal: ExamGoal | null;
  /**
   * How the AI Tutor should address this student. Persisted on the profile so
   * the choice survives a new device and a new session - a preference that
   * resets every time is a preference the student stops setting.
   */
  preferredLanguage: TeachingStyle;
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

/* ---------- Bookmarks & activity ---------- */

export type BookmarkType = 'lesson' | 'topic' | 'question';

export interface Bookmark {
  id: string;
  contentType: BookmarkType;
  contentId: string;
  /** Denormalised so My Bookmarks renders from one read, not N lookups. */
  title: string;
  subjectId?: string;
  grade?: GradeLevel;
  createdAt: string;
}

export type ActivityType =
  | 'lesson_opened'
  | 'lesson_completed'
  | 'quiz_started'
  | 'quiz_completed'
  | 'bookmark_created'
  | 'exam_started'
  | 'exam_completed'
  | 'search_performed';

export interface ActivityEvent {
  id: string;
  activityType: ActivityType;
  contentType?: 'lesson' | 'topic' | 'subject' | 'quiz' | 'question' | 'exam' | 'unit';
  contentId?: string;
  /** Small payload (title, subject, score) so the feed needs no extra reads. */
  metadata: Record<string, string | number>;
  createdAt: string;
}

/**
 * The card that answers "where was I?".
 *
 * Derived from lesson progress rather than stored, so it can never disagree
 * with the progress it is meant to summarise.
 */
export interface ContinueLearning {
  lessonId: string;
  lessonTitle: string;
  topicId: string;
  topicName: string;
  subjectId: string;
  subjectName: string;
  grade: GradeLevel;
  /** Lessons finished in this topic, over lessons in it. */
  topicCompleted: number;
  topicTotal: number;
  percent: number;
  href: string;
}

/* ---------- AI tutor ---------- */


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
