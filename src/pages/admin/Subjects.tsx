import { useState } from 'react';
import { Plus, Trash2, BookMarked, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { MOCK_DEPARTMENTS } from '@/lib/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

type SubjectEntry = { id: string; name: string; department: string; code: string; semester: number };

const initialSubjects: SubjectEntry[] = MOCK_DEPARTMENTS.flatMap(dept =>
  dept.subjects.map((s, i) => ({ id: `${dept.id}_${i}`, name: s, department: dept.code, code: s.substring(0, 3).toUpperCase() + (i + 1), semester: (i % 8) + 1 }))
);

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState<SubjectEntry[]>(initialSubjects);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', department: '', code: '', semester: '1' });

  const filtered = subjects.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => {
    if (!form.name || !form.department) { toast.error('Please fill all required fields.'); return; }
    setSubjects(p => [...p, { id: `s_${Date.now()}`, name: form.name, department: form.department, code: form.code || form.name.substring(0, 3).toUpperCase(), semester: Number(form.semester) }]);
    setForm({ name: '', department: '', code: '', semester: '1' });
    setOpen(false);
    toast.success('Subject added!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Subjects</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage all academic subjects across departments</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-2" />Add Subject</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search subjects..." className="pl-10" />
      </div>

      <div className="sk-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Subject</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Code</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Department</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Semester</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Action</th>
            </tr></thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <BookMarked className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{s.code}</span></td>
                  <td className="px-4 py-3 hidden sm:table-cell"><span className="text-sm text-muted-foreground">{s.department}</span></td>
                  <td className="px-4 py-3 hidden md:table-cell"><span className="text-sm text-muted-foreground">Sem {s.semester}</span></td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" onClick={() => { setSubjects(p => p.filter(x => x.id !== s.id)); toast.success('Subject removed.'); }}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10 text-muted-foreground text-sm">No subjects found</div>}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Subject</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div><Label>Subject Name *</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g., Data Structures" className="mt-1.5" /></div>
            <div><Label>Subject Code</Label><Input value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value }))} placeholder="e.g., CS301" className="mt-1.5" /></div>
            <div>
              <Label>Department *</Label>
              <select value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))}
                className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
                <option value="">Select</option>
                {MOCK_DEPARTMENTS.map(d => <option key={d.id} value={d.code}>{d.code}</option>)}
              </select>
            </div>
            <div>
              <Label>Semester</Label>
              <select value={form.semester} onChange={e => setForm(p => ({ ...p, semester: e.target.value }))}
                className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Add Subject</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
