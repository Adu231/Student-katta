import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Upload, FolderOpen,
  Bookmark, Bell, User, Settings, X, GraduationCap, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface Props { open: boolean; onClose: () => void; }

const links = [
  { label: 'Dashboard',     href: '/student/dashboard',     icon: LayoutDashboard, badge: null },
  { label: 'Browse Notes',  href: '/student/notes',         icon: BookOpen,        badge: null },
  { label: 'Upload Note',   href: '/student/upload-note',   icon: Upload,          badge: null },
  { label: 'My Uploads',    href: '/student/my-uploads',    icon: FolderOpen,      badge: '3'  },
  { label: 'Bookmarks',     href: '/student/bookmarks',     icon: Bookmark,        badge: null },
  { label: 'Notifications', href: '/student/notifications', icon: Bell,            badge: '2'  },
  { label: 'Profile',       href: '/student/profile',       icon: User,            badge: null },
  { label: 'Settings',      href: '/student/settings',      icon: Settings,        badge: null },
];

export default function StudentSidebar({ open, onClose }: Props) {
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <>
      {/* Backdrop */}
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
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sidebar-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Student<span className="text-primary">Katta</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground p-1 rounded transition-all duration-200 hover:bg-sidebar-accent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role pill */}
        <div className="px-4 py-3 border-b border-sidebar-border">
          <div className="flex items-center gap-2 bg-blue-500/10 rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Student Portal</span>
          </div>
        </div>

        {/* User mini-card */}
        {user && (
          <div className="px-4 py-3 border-b border-sidebar-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/50 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {links.map(({ label, href, icon: Icon, badge }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                to={href}
                onClick={onClose}
                className={cn('sk-sidebar-link group', isActive && 'active')}
              >
                <Icon className={cn('w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110', isActive && 'scale-110')} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className={cn(
                    'text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center transition-transform duration-200',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-primary/20 text-primary group-hover:scale-110'
                  )}>
                    {badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/30 text-center">StudentKatta v1.0 · Academic Platform</p>
        </div>
      </aside>
    </>
  );
}
