/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {lazy, Suspense} from 'react';
import {BrowserRouter, HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import {AuthProvider, useAuth} from './context/AuthContext';
import {StudentDataProvider} from './context/StudentDataContext';
import {AppShell} from './components/layout/AppShell';
import {Skeleton} from './components/ui';

// Route-level code splitting keeps the first load small on low-end Android.
const Landing = lazy(() => import('./routes/Landing'));
const Login = lazy(() => import('./routes/Login'));
const SignUp = lazy(() => import('./routes/SignUp'));
const Onboarding = lazy(() => import('./routes/Onboarding'));
const Dashboard = lazy(() => import('./routes/Dashboard'));
const Learn = lazy(() => import('./routes/Learn'));
const GradeSubjects = lazy(() => import('./routes/GradeSubjects'));
const GradeScope = lazy(() => import('./routes/GradeScope'));
const StudentGradeScope = lazy(() => import('./routes/StudentGradeScope'));
const Bookmarks = lazy(() => import('./routes/Bookmarks'));
const Help = lazy(() => import('./routes/Help'));
const About = lazy(() => import('./routes/About'));
const Privacy = lazy(() => import('./routes/Privacy'));
const Terms = lazy(() => import('./routes/Terms'));
const SubjectTopics = lazy(() => import('./routes/SubjectTopics'));
const TopicLessons = lazy(() => import('./routes/TopicLessons'));
const QuizRunner = lazy(() => import('./routes/QuizRunner'));
const AiTutor = lazy(() => import('./routes/AiTutor'));
const ExamCoach = lazy(() => import('./routes/ExamCoach'));
const ExamPrep = lazy(() => import('./routes/ExamPrep'));
const ExamSession = lazy(() => import('./routes/ExamSession'));
const ExamResults = lazy(() => import('./routes/ExamResults'));
const Progress = lazy(() => import('./routes/Progress'));
const ProfilePage = lazy(() => import('./routes/Profile'));
const SettingsPage = lazy(() => import('./routes/Settings'));
const SearchPage = lazy(() => import('./routes/Search'));
const NotFound = lazy(() => import('./routes/NotFound'));

function RouteFallback() {
  return (
    <div className="shell flex flex-col gap-4 py-8">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

/** Gate for everything behind sign-in, including the onboarding redirect. */
function Protected() {
  const {status, profile} = useAuth();

  if (status === 'loading') return <RouteFallback />;
  if (status === 'signed_out') return <Navigate to="/login" replace />;
  if (profile && !profile.onboardedAt) return <Navigate to="/onboarding" replace />;

  return (
    <StudentDataProvider>
      <AppShell />
    </StudentDataProvider>
  );
}

/** Landing, login and sign-up bounce to the dashboard once authenticated. */
function PublicOnly({children}: {children: React.ReactNode}) {
  const {status, profile} = useAuth();
  if (status === 'loading') return <RouteFallback />;
  if (status === 'signed_in') {
    return <Navigate to={profile?.onboardedAt ? '/dashboard' : '/onboarding'} replace />;
  }
  return <>{children}</>;
}

/**
 * Static-host preview builds set VITE_HASH_ROUTER. Hosts that serve the bundle
 * from a sub-path with no SPA rewrite rule cannot resolve deep links like
 * /learn/8/mathematics, so those builds route through the hash instead.
 * Production uses clean paths via BrowserRouter.
 */
const Router = import.meta.env.VITE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<PublicOnly><Landing /></PublicOnly>} />
            <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
            <Route path="/signup" element={<PublicOnly><SignUp /></PublicOnly>} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Public: readable without an account, because someone deciding
                whether to sign up should be able to read what the app does
                with their data first. */}
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            <Route element={<Protected />}>
              {/* Dashboard needs curriculum to derive Continue Learning, and
                  bookmarks link into it, so both sit in the student's grade scope. */}
              <Route element={<StudentGradeScope />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
              </Route>
              <Route path="/learn" element={<Learn />} />
              {/* Every screen below shares one grade load, so navigating
                  subject -> unit -> topic -> lesson touches no network, and
                  loading/error/offline states live in GradeScope alone. */}
              <Route path="/learn/:grade" element={<GradeScope />}>
                <Route index element={<GradeSubjects />} />
                <Route path=":subject" element={<SubjectTopics />} />
                <Route path=":subject/:topic" element={<TopicLessons />} />
              </Route>
              {/* Quizzes carry no grade in the URL, so they scope to the
                  student's own grade. */}
              <Route element={<StudentGradeScope />}>
                <Route path="/quiz/:quizId" element={<QuizRunner />} />
              </Route>
              <Route path="/ai-tutor" element={<AiTutor />} />
              <Route path="/exam-coach" element={<ExamCoach />} />
              <Route path="/exam-coach/:exam" element={<ExamPrep />} />
              <Route path="/exam/:exam/:subject" element={<ExamSession />} />
              <Route path="/exam/:exam/:subject/:attemptId" element={<ExamSession />} />
              <Route path="/exam-results/:attemptId" element={<ExamResults />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}
