import {NavLink, Outlet} from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  HelpCircle,
  Home,
  type LucideIcon,
  MessageCircleQuestion,
  Settings,
  TrendingUp,
  User,
  WifiOff,
} from 'lucide-react';
import {useAuth} from '../../context/AuthContext';
import {useOnline} from '../../lib/useOnline';

interface NavItem {
  to: string;
  label: string;
  /** Shorter label for the mobile bar, where width is tight. */
  short: string;
  icon: LucideIcon;
}

const NAV: NavItem[] = [
  {to: '/dashboard', label: 'Home', short: 'Home', icon: Home},
  {to: '/learn', label: 'Learn', short: 'Learn', icon: BookOpen},
  {to: '/ai-tutor', label: 'AI Tutor', short: 'AI', icon: MessageCircleQuestion},
  {to: '/exam-coach', label: 'Exam Coach', short: 'Exams', icon: GraduationCap},
  {to: '/progress', label: 'Progress', short: 'Progress', icon: TrendingUp},
];

const SECONDARY: NavItem[] = [
  {to: '/settings', label: 'Settings', short: 'Settings', icon: Settings},
  {to: '/profile', label: 'Profile', short: 'Profile', icon: User},
];

/**
 * Connectivity strip. LibLearn is used on intermittent connections, so the
 * state is shown rather than left for the student to infer from a failure.
 */
function ConnectionStrip() {
  const online = useOnline();
  if (online) return null;
  return (
    <div className="flex items-center justify-center gap-2 bg-tertiary-container px-4 py-2 text-sm font-medium text-on-tertiary-container">
      <WifiOff size={16} aria-hidden="true" />
      Offline — your work is saved on this device and will sync when you reconnect.
    </div>
  );
}

/** Local mode means this browser only. Say so rather than implying a server. */
function BackendBanner() {
  const {backend} = useAuth();
  if (backend === 'supabase') return null;
  return (
    <div className="border-b border-outline-variant bg-surface-low px-4 py-2 text-center text-xs text-on-surface-variant">
      Running in local mode — your account and progress are saved on this device only.
      Connect Supabase to sync across devices.
    </div>
  );
}

export function AppShell() {
  const {profile} = useAuth();

  return (
    <div className="flex min-h-dvh flex-col">
      <ConnectionStrip />
      <BackendBanner />

      <div className="flex flex-1">
        {/* Desktop sidebar — 1024px and up */}
        <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-outline-variant bg-surface-lowest desktop:flex">
          <div className="flex items-center gap-2 px-6 py-6">
            <GraduationCap className="text-primary" aria-hidden="true" />
            <span className="font-display text-lg font-bold text-secondary">LibLearn</span>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Main">
            {NAV.map(({to, label, icon: Icon}) => (
              <NavLink
                key={to}
                to={to}
                className={({isActive}) =>
                  `flex min-h-12 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-surface text-on-primary-surface'
                      : 'text-on-surface-variant hover:bg-surface-low'
                  }`
                }>
                <Icon size={20} aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>
          <nav className="flex flex-col gap-1 border-t border-outline-variant px-3 py-3" aria-label="Account">
            <a
              href="mailto:help@liblearn.example"
              className="flex min-h-12 items-center gap-3 rounded-lg px-3 text-sm font-medium text-on-surface-variant hover:bg-surface-low">
              <HelpCircle size={20} aria-hidden="true" />
              Help
            </a>
            {SECONDARY.map(({to, label, icon: Icon}) => (
              <NavLink
                key={to}
                to={to}
                className={({isActive}) =>
                  `flex min-h-12 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-surface text-on-primary-surface'
                      : 'text-on-surface-variant hover:bg-surface-low'
                  }`
                }>
                <Icon size={20} aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile/tablet top bar */}
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-outline-variant bg-secondary px-4 py-3 text-on-secondary desktop:hidden">
            <div className="flex items-center gap-2">
              <GraduationCap size={22} aria-hidden="true" />
              <span className="font-display text-lg font-bold">LibLearn</span>
            </div>
            {profile?.grade && (
              <span className="inline-flex h-7 items-center rounded-full bg-tertiary-surface px-3 text-xs font-medium text-on-tertiary-surface">
                Grade {profile.grade}
              </span>
            )}
          </header>

          <main className="shell flex-1 py-6 pb-24 desktop:pb-10">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile bottom navigation — every target is at least 48px tall */}
      <nav
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-outline-variant bg-surface-lowest desktop:hidden"
        style={{paddingBottom: 'env(safe-area-inset-bottom, 0px)'}}
        aria-label="Main">
        {NAV.map(({to, short, icon: Icon}) => (
          <NavLink
            key={to}
            to={to}
            className={({isActive}) =>
              `flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 py-2 text-xs font-medium ${
                isActive
                  ? 'text-on-primary-surface shadow-[inset_0_2px_0_var(--color-primary)]'
                  : 'text-on-surface-variant'
              }`
            }>
            <Icon size={20} aria-hidden="true" />
            {short}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
