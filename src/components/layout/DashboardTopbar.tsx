import { Bell, Menu, Moon, Sun, LogOut, User as UserIcon, Search, ChevronDown } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  onMenuClick: () => void;
  user: User;
}

const roleColors: Record<string, string> = {
  student: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  teacher: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  admin:   'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
};

const avatarColors: Record<string, string> = {
  student: 'bg-blue-500',
  teacher: 'bg-emerald-500',
  admin:   'bg-orange-500',
};

export default function DashboardTopbar({ onMenuClick, user }: Props) {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [hasNotif] = useState(true);

  const profilePath = `/${user.role}/profile`;

  return (
    <header className="h-16 border-b border-border bg-card/95 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-30 transition-shadow duration-200">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200 active:scale-90"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Greeting */}
        <div className="hidden sm:block animate-fade-in">
          <div className="flex items-center gap-2">
            <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full capitalize', roleColors[user.role])}>
              {user.role}
            </span>
            <p className="text-sm font-semibold text-foreground leading-tight">
              Welcome back, <span className="text-primary">{user.name.split(' ')[0]}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Toggle theme"
        >
          <div className="relative w-4 h-4">
            <Sun className={cn('absolute inset-0 w-4 h-4 transition-all duration-300', theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50')} />
            <Moon className={cn('absolute inset-0 w-4 h-4 transition-all duration-300', theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50')} />
          </div>
        </button>

        {/* Notifications */}
        <button
          onClick={() => setNotifOpen(o => !o)}
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Notifications"
        >
          <Bell className={cn('w-4 h-4 transition-transform duration-300', notifOpen && 'rotate-12')} />
          {hasNotif && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full sk-notif-dot" />
          )}
        </button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-muted transition-all duration-200 group ml-1">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform duration-200 group-hover:scale-105',
                avatarColors[user.role]
              )}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-foreground leading-none">{user.name.split(' ')[0]}</p>
                <p className="text-xs text-muted-foreground leading-none mt-0.5 capitalize">{user.role}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 animate-scale-in">
            <DropdownMenuLabel>
              <div className="flex items-center gap-2">
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0', avatarColors[user.role])}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground font-normal truncate max-w-[140px]">{user.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(profilePath)} className="cursor-pointer">
              <UserIcon className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
