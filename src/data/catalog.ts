import type {Achievement, ExamDefinition, Subject} from '../types/domain';

export const SUBJECTS: Subject[] = [
  {id: 'mathematics', name: 'Mathematics', icon: 'calculate', grades: [4, 5, 6, 7, 8, 9, 10, 11, 12]},
  {id: 'english', name: 'English Language', icon: 'menu_book', grades: [4, 5, 6, 7, 8, 9, 10, 11, 12]},
  {id: 'general-science', name: 'General Science', icon: 'science', grades: [4, 5, 6, 7, 8, 9]},
  {id: 'biology', name: 'Biology', icon: 'biotech', grades: [10, 11, 12]},
  {id: 'chemistry', name: 'Chemistry', icon: 'experiment', grades: [10, 11, 12]},
  {id: 'physics', name: 'Physics', icon: 'bolt', grades: [10, 11, 12]},
  {id: 'social-studies', name: 'Social Studies', icon: 'public', grades: [4, 5, 6, 7, 8, 9]},
  {id: 'civics', name: 'Civics', icon: 'gavel', grades: [7, 8, 9, 10, 11, 12]},
];

/**
 * Examination targets LibLearn can practise against.
 *
 * `gradeRange` is LibLearn's own grouping for routing students to relevant
 * practice. It is NOT an eligibility rule, and LibLearn holds no verified
 * syllabus, grading scale or entry requirement for any of these examinations.
 */
export const EXAMS: ExamDefinition[] = [
  {
    id: 'general',
    name: 'General Learning',
    levelLabel: 'All grades',
    description: 'Work through lessons and practice at your own pace, without a specific examination in view.',
    gradeRange: [4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'lpsce',
    name: 'LPSCE',
    levelLabel: 'Primary',
    description: 'Liberian Primary School Certificate Examination. Practice sets covering the primary grades.',
    gradeRange: [4, 5, 6],
  },
  {
    id: 'ljhsce',
    name: 'LJHSCE',
    levelLabel: 'Junior High',
    description: 'Liberian Junior High School Certificate Examination. Practice sets covering the junior secondary grades.',
    gradeRange: [7, 8, 9],
  },
  {
    id: 'wassce',
    name: 'WASSCE',
    levelLabel: 'Senior High',
    description: 'West African Senior School Certificate Examination. Practice sets covering the senior secondary grades.',
    gradeRange: [10, 11, 12],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {id: 'first-lesson', name: 'First Lesson', description: 'Completed your first lesson.', icon: 'school'},
  {id: 'quiz-starter', name: 'Quiz Starter', description: 'Finished your first quiz.', icon: 'quiz'},
  {id: 'seven-day-learner', name: '7-Day Learner', description: 'Studied seven days in a row.', icon: 'local_fire_department'},
  {id: 'math-explorer', name: 'Math Explorer', description: 'Completed five Mathematics lessons.', icon: 'calculate'},
  {id: 'exam-practice-pro', name: 'Exam Practice Pro', description: 'Completed three mock examinations.', icon: 'workspace_premium'},
  {id: 'sharp-shooter', name: 'Sharp Shooter', description: 'Scored 100% on a quiz.', icon: 'target'},
];

export const subjectById = (id: string): Subject | undefined =>
  SUBJECTS.find((s) => s.id === id);

export const examById = (id: string): ExamDefinition | undefined =>
  EXAMS.find((e) => e.id === id);

export const subjectsForGrade = (grade: number): Subject[] =>
  SUBJECTS.filter((s) => s.grades.includes(grade as Subject['grades'][number]));
