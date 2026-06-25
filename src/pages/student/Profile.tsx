import { useState } from 'react';
import { User, Mail, Building2, BookOpen, Calendar, Upload, Download, Star, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Uploads',    value: 7,     icon: Upload,   color: 'text-blue-600 dark:text-blue-400',   bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { label: 'Downloads',  value: 43,    icon: Download, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { label: 'Bookmarks',  value: 8,     icon: BookOpen, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { label: 'Avg Rating', value: '4.6', icon: Star,     color: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-50 dark:bg-amber-900/20' },
];

export default function StudentProfile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    department: user?.department || '',
    semester: String(user?.semester || 1),
  });

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setEditing(false);
  };

  return (
    <div className="max-w-3xl space-y-6 page-enter">
      {/* Header */}
      <div className="animate-fade-in-down">
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your account information</p>
      </div>

      {/* Profile card */}
      <div className="sk-card p-6 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="relative group shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-white text-3xl font-bold transition-transform duration-300 group-hover:scale-105">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute inset-0 rounded-2xl ring-4 ring-primary/20 ring-offset-2 ring-offset-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="sk-badge-general capitalize">{user?.role}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Joined {user?.joinedAt}
              </span>
            </div>
          </div>

          <Button
            variant={editing ? 'outline' : 'secondary'}
            size="sm"
            onClick={() => setEditing(!editing)}
            className="shrink-0 transition-all duration-200"
          >
            {editing ? <><X className="w-3.5 h-3.5 mr-1.5" />Cancel</> : <><Edit2 className="w-3.5 h-3.5 mr-1.5" />Edit</>}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-border stagger-children">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn('flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200 hover:scale-105 animate-fade-in-up', s.bg)}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <s.icon className={cn('w-5 h-5', s.color)} />
              <p className={cn('text-xl font-bold', s.color)}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Form */}
      {editing && (
        <div className="sk-card p-6 space-y-4 animate-scale-in border-primary/20">
          <h2 className="font-semibold text-foreground">Edit Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="p-name">Full Name</Label>
              <Input
                id="p-name" value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="p-dept">Department</Label>
              <Input
                id="p-dept" value={form.department}
                onChange={e => setForm(p => ({ ...p, department: e.target.value }))}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="p-sem">Current Semester</Label>
              <select
                id="p-sem" value={form.semester}
                onChange={e => setForm(p => ({ ...p, semester: e.target.value }))}
                className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="group">
              <Check className="w-3.5 h-3.5 mr-1.5 transition-transform duration-200 group-hover:scale-110" />
              Save Changes
            </Button>
            <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Account Details */}
      <div className="sk-card p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h2 className="font-semibold text-foreground mb-4">Account Details</h2>
        <dl className="space-y-1">
          {[
            { icon: User,      label: 'Full Name',      value: user?.name },
            { icon: Mail,      label: 'Email Address',  value: user?.email },
            { icon: Building2, label: 'Department',     value: user?.department || 'Not set' },
            { icon: BookOpen,  label: 'Semester',       value: user?.semester ? `Semester ${user.semester}` : 'Not set' },
          ].map((item, i) => (
            <div
              key={item.label}
              className="flex items-center gap-3 py-3 border-b border-border/60 last:border-0 hover:bg-muted/30 px-2 rounded-lg transition-colors duration-200 animate-fade-in-up"
              style={{ animationDelay: `${250 + i * 50}ms` }}
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 flex items-center justify-between min-w-0">
                <dt className="text-sm text-muted-foreground">{item.label}</dt>
                <dd className="text-sm font-semibold text-foreground truncate ml-2">{item.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
