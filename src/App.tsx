/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {lazy, Suspense} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
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

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<PublicOnly><Landing /></PublicOnly>} />
            <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
            <Route path="/signup" element={<PublicOnly><SignUp /></PublicOnly>} />
            <Route path="/onboarding" element={<Onboarding />} />

            <Route element={<Protected />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:grade" element={<GradeSubjects />} />
              <Route path="/learn/:grade/:subject" element={<SubjectTopics />} />
              <Route path="/learn/:grade/:subject/:topic" element={<TopicLessons />} />
              <Route path="/quiz/:quizId" element={<QuizRunner />} />
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
    </BrowserRouter>
  );
}
