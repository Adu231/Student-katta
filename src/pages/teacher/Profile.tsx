import { useState } from 'react';
import { User, Mail, Building2, BookOpen, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export default function TeacherProfile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', department: user?.department || '', subject: user?.subject || '' });

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>My Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your teacher account</p>
      </div>
      <div className="sk-card p-6">
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-3xl font-bold shrink-0">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
              {user?.verified && <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium"><CheckCircle className="w-3.5 h-3.5" />Verified Teacher</span>}
            </div>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
            <p className="text-sm text-muted-foreground mt-1">{user?.department} · {user?.subject}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-border text-center">
          {[['Content', 8], ['Downloads', '2.4K'], ['Students', 340], ['Approved', 15]].map(([l, v]) => (
            <div key={l}><p className="text-2xl font-bold text-foreground">{v}</p><p className="text-xs text-muted-foreground">{l}</p></div>
          ))}
        </div>
      </div>
      {editing && (
        <div className="sk-card p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Edit Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Full Name</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="mt-1.5" /></div>
            <div><Label>Department</Label><Input value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} className="mt-1.5" /></div>
            <div><Label>Subject Specialization</Label><Input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className="mt-1.5" /></div>
          </div>
          <Button onClick={() => { toast.success('Profile updated!'); setEditing(false); }}>Save Changes</Button>
        </div>
      )}
      <div className="sk-card p-6">
        <h2 className="font-semibold text-foreground mb-4">Account Details</h2>
        <dl className="space-y-3">
          {[
            { icon: User, label: 'Name', value: user?.name },
            { icon: Mail, label: 'Email', value: user?.email },
            { icon: Building2, label: 'Department', value: user?.department },
            { icon: BookOpen, label: 'Subject', value: user?.subject || 'Not set' },
            { icon: Calendar, label: 'Joined', value: user?.joinedAt },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1 flex justify-between">
                <dt className="text-sm text-muted-foreground">{item.label}</dt>
                <dd className="text-sm font-medium text-foreground">{item.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
