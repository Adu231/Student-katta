import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, ClipboardList, Upload, FolderOpen,
  Megaphone, User, Settings, X, GraduationCap, CheckSquare, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface Props { open: boolean; onClose: () => void; }

const links = [
  { label: 'Dashboard',     href: '/teacher/dashboard',      icon: LayoutDashboard, badge: null },
  { label: 'Review Queue',  href: '/teacher/review-queue',   icon: ClipboardList,   badge: '5'  },
  { label: 'Upload Content',href: '/teacher/upload-content', icon: Upload,          badge: null },
  { label: 'My Content',    href: '/teacher/my-content',     icon: FolderOpen,      badge: null },
  { label: 'Announcements', href: '/teacher/announcements',  icon: Megaphone,       badge: null },
  { label: 'Profile',       href: '/teacher/profile',        icon: User,            badge: null },
  { label: 'Settings',      href: '/teacher/settings',       icon: Settings,        badge: null },
];

export default function TeacherSidebar({ open, onClose }: Props) {
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-sidebar flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sidebar-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Student<span className="text-primary">Katta</span>
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground p-1 rounded transition-all duration-200 hover:bg-sidebar-accent">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-sidebar-border">
          <div className="flex items-center gap-2 bg-emerald-500/10 rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Teacher Portal</span>
          </div>
        </div>

        {user && (
          <div className="px-4 py-3 border-b border-sidebar-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/50 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {links.map(({ label, href, icon: Icon, badge }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} to={href} onClick={onClose} className={cn('sk-sidebar-link group', isActive && 'active')}>
                <Icon className={cn('w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110', isActive && 'scale-110')} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className={cn(
                    'text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center',
                    isActive ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400'
                  )}>{badge}</span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/30 text-center">StudentKatta v1.0 · Academic Platform</p>
        </div>
      </aside>
    </>
  );
}
