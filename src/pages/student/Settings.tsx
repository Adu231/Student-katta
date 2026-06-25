import { useState } from 'react';
import { Bell, Moon, Shield, Trash2, Sun, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const notifOptions = [
  { key: 'uploads',       label: 'Upload Status Updates',   desc: 'Get notified when your uploads are approved or rejected' },
  { key: 'announcements', label: 'Announcements',           desc: 'Receive institutional announcements and notices' },
  { key: 'comments',      label: 'Comments & Replies',      desc: 'Notifications when someone comments on your uploads' },
  { key: 'newsletter',    label: 'Weekly Digest',           desc: 'Weekly summary of new resources and activity' },
];

export default function StudentSettings() {
  const { theme, toggleTheme } = useTheme();
  const [notifs, setNotifs] = useState({ uploads: true, announcements: true, comments: false, newsletter: false });
  const [saved, setSaved] = useState(false);

  const saveNotifs = () => {
    setSaved(true);
    toast.success('Notification preferences saved!');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6 page-enter">
      {/* Header */}
      <div className="animate-fade-in-down">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your account preferences</p>
      </div>

      {/* Appearance */}
      <div className="sk-card p-6 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            {theme === 'dark' ? <Moon className="w-4.5 h-4.5 text-primary" /> : <Sun className="w-4.5 h-4.5 text-primary" />}
          </div>
          <h2 className="font-semibold text-foreground">Appearance</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Switch between light and dark themes</p>
          </div>
          <button
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === 'dark'}
            className={cn(
              'relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              theme === 'dark' ? 'bg-primary' : 'bg-muted-foreground/30'
            )}
          >
            <div className={cn(
              'absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center',
              theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
            )}>
              {theme === 'dark'
                ? <Moon className="w-2.5 h-2.5 text-primary" />
                : <Sun className="w-2.5 h-2.5 text-yellow-500" />
              }
            </div>
          </button>
        </div>

        {/* Theme preview */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => theme === 'dark' && toggleTheme()}
            className={cn(
              'p-3 rounded-xl border-2 transition-all duration-200 text-center',
              theme === 'light' ? 'border-primary bg-white' : 'border-border bg-white/10 hover:border-primary/50'
            )}
          >
            <div className="w-full h-8 rounded-lg bg-gray-100 mb-2 flex items-center justify-center">
              <Sun className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-xs font-medium text-gray-800">Light Mode</p>
          </button>
          <button
            onClick={() => theme === 'light' && toggleTheme()}
            className={cn(
              'p-3 rounded-xl border-2 transition-all duration-200 text-center',
              theme === 'dark' ? 'border-primary bg-slate-800' : 'border-border hover:border-primary/50'
            )}
          >
            <div className="w-full h-8 rounded-lg bg-slate-700 mb-2 flex items-center justify-center">
              <Moon className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-xs font-medium text-foreground">Dark Mode</p>
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="sk-card p-6 animate-fade-in-up" style={{ animationDelay: '160ms' }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <Bell className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="font-semibold text-foreground">Notification Preferences</h2>
        </div>
        <div className="space-y-1">
          {notifOptions.map(item => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-border/60 last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <button
                role="switch"
                aria-checked={notifs[item.key as keyof typeof notifs]}
                onClick={() => setNotifs(p => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
                className={cn(
                  'relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ml-4 shrink-0',
                  notifs[item.key as keyof typeof notifs] ? 'bg-primary' : 'bg-muted-foreground/30'
                )}
              >
                <div className={cn(
                  'absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300',
                  notifs[item.key as keyof typeof notifs] ? 'translate-x-6' : 'translate-x-1'
                )} />
              </button>
            </div>
          ))}
        </div>
        <Button
          className={cn('mt-5 transition-all duration-200', saved && 'bg-emerald-500 hover:bg-emerald-600')}
          size="sm"
          onClick={saveNotifs}
        >
          {saved ? <><CheckCircle className="w-3.5 h-3.5 mr-1.5" />Saved!</> : 'Save Preferences'}
        </Button>
      </div>

      {/* Privacy & Security */}
      <div className="sk-card p-6 animate-fade-in-up" style={{ animationDelay: '240ms' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
            <Shield className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="font-semibold text-foreground">Privacy & Security</h2>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Public Profile',       desc: 'Allow others to see your profile and uploads' },
            { label: 'Show Email',           desc: 'Display your email address on your public profile' },
            { label: 'Activity Tracking',    desc: 'Help improve the platform with anonymous usage data' },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button className="relative w-11 h-6 rounded-full bg-muted-foreground/30 transition-colors duration-300 ml-4 shrink-0">
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="sk-card p-6 border-destructive/30 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
            <Trash2 className="w-4.5 h-4.5 text-destructive" />
          </div>
          <h2 className="font-semibold text-destructive">Danger Zone</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <Button
          variant="destructive"
          size="sm"
          className="hover:scale-[1.02] active:scale-100 transition-transform duration-150"
          onClick={() => toast.error('Please contact admin to delete your account.')}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}
