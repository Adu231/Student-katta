import { useState } from 'react';
import { UserCheck, UserX, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MOCK_USERS } from '@/lib/mockData';
import type { User } from '@/types';

export default function TeacherVerifications() {
  const [teachers, setTeachers] = useState<User[]>(MOCK_USERS.filter(u => u.role === 'teacher'));

  const verify = (id: string) => {
    setTeachers(p => p.map(t => t.id === id ? { ...t, verified: true } : t));
    toast.success('Teacher verified and granted full access!');
  };

  const reject = (id: string) => {
    setTeachers(p => p.filter(t => t.id !== id));
    toast.success('Verification request rejected.');
  };

  const pending = teachers.filter(t => !t.verified);
  const verified = teachers.filter(t => t.verified);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Teacher Verifications</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Review and verify teacher registration requests</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="sk-card p-4 text-center"><p className="text-2xl font-bold text-foreground">{teachers.length}</p><p className="text-xs text-muted-foreground">Total Teachers</p></div>
        <div className="sk-card p-4 text-center border-t-4 border-t-amber-500"><p className="text-2xl font-bold text-amber-600">{pending.length}</p><p className="text-xs text-muted-foreground">Pending</p></div>
        <div className="sk-card p-4 text-center border-t-4 border-t-emerald-500"><p className="text-2xl font-bold text-emerald-600">{verified.length}</p><p className="text-xs text-muted-foreground">Verified</p></div>
      </div>

      {pending.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3">Pending Verification ({pending.length})</h2>
          <div className="space-y-3">
            {pending.map(teacher => (
              <div key={teacher.id} className="sk-card p-5 border-l-4 border-l-amber-500">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 font-bold text-lg shrink-0">
                      {teacher.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{teacher.name}</p>
                      <p className="text-sm text-muted-foreground">{teacher.email}</p>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">{teacher.department}</span>
                        {teacher.subject && <span className="text-xs bg-muted px-2 py-0.5 rounded">{teacher.subject}</span>}
                        <span className="text-xs text-muted-foreground">Joined {teacher.joinedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => verify(teacher.id)}>
                      <UserCheck className="w-4 h-4 mr-1" />Verify
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => reject(teacher.id)}>
                      <UserX className="w-4 h-4 mr-1" />Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">Verified Teachers ({verified.length})</h2>
        <div className="sk-card overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-muted/50"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Teacher</th><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Department</th><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Subject</th><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th></tr></thead>
            <tbody>
              {verified.map(t => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-sm text-muted-foreground">{t.department}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-muted-foreground">{t.subject || '-'}</td>
                  <td className="px-4 py-3"><span className="sk-badge-approved flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" />Verified</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
