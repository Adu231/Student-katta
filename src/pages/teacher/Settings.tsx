import { useState } from 'react';
import { Bell, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

export default function TeacherSettings() {
  const { theme, toggleTheme } = useTheme();
  const [notifs, setNotifs] = useState({ newSubmissions: true, approvalUpdates: true, announcements: true });

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your teacher account preferences</p>
      </div>
      <div className="sk-card p-6">
        <div className="flex items-center gap-3 mb-5"><Moon className="w-5 h-5 text-muted-foreground" /><h2 className="font-semibold text-foreground">Appearance</h2></div>
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium text-foreground">Dark Mode</p><p className="text-xs text-muted-foreground">Toggle theme</p></div>
          <button onClick={toggleTheme} className={`relative w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-muted'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
      <div className="sk-card p-6">
        <div className="flex items-center gap-3 mb-5"><Bell className="w-5 h-5 text-muted-foreground" /><h2 className="font-semibold text-foreground">Notifications</h2></div>
        <div className="space-y-4">
          {[
            { key: 'newSubmissions' as const, label: 'New Student Submissions', desc: 'When students upload content for review' },
            { key: 'approvalUpdates' as const, label: 'Approval Updates', desc: 'When admin approves or rejects your content' },
            { key: 'announcements' as const, label: 'Platform Announcements', desc: 'Admin notices and updates' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div><p className="text-sm font-medium text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
              <button onClick={() => setNotifs(p => ({ ...p, [item.key]: !p[item.key] }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${notifs[item.key] ? 'bg-primary' : 'bg-muted'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifs[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
        <Button className="mt-4" size="sm" onClick={() => toast.success('Settings saved!')}>Save</Button>
      </div>
    </div>
  );
}
