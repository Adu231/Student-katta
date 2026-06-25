import { useState } from 'react';
import { Plus, Edit2, Trash2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { MOCK_DEPARTMENTS } from '@/lib/mockData';
import type { Department } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

export default function AdminDepartments() {
  const [departments, setDepartments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', subjects: '' });

  const handleCreate = () => {
    if (!form.name || !form.code) { toast.error('Please fill all fields.'); return; }
    const newD: Department = { id: `d_${Date.now()}`, name: form.name, code: form.code, subjects: form.subjects.split(',').map(s => s.trim()).filter(Boolean) };
    setDepartments(p => [...p, newD]);
    setForm({ name: '', code: '', subjects: '' });
    setOpen(false);
    toast.success('Department added!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Departments</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage institution departments and their subjects</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-2" />Add Department</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map(dept => (
          <div key={dept.id} className="sk-card p-5 group hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">{dept.code}</p>
                  <p className="text-xs text-muted-foreground">{dept.name}</p>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Edit2 className="w-3.5 h-3.5" /></Button>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" onClick={() => { setDepartments(p => p.filter(d => d.id !== dept.id)); toast.success('Department removed.'); }}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
            <p className="text-xs font-medium text-muted-foreground mb-2">{dept.subjects.length} Subjects</p>
            <div className="flex flex-wrap gap-1">
              {dept.subjects.slice(0, 4).map(s => <span key={s} className="text-xs bg-muted px-2 py-0.5 rounded">{s}</span>)}
              {dept.subjects.length > 4 && <span className="text-xs text-muted-foreground">+{dept.subjects.length - 4} more</span>}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Department</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div><Label>Department Name</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g., Computer Science & Engineering" className="mt-1.5" /></div>
            <div><Label>Department Code</Label><Input value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value }))} placeholder="e.g., CSE" className="mt-1.5" /></div>
            <div><Label>Subjects (comma-separated)</Label><Input value={form.subjects} onChange={e => setForm(p => ({ ...p, subjects: e.target.value }))} placeholder="e.g., Data Structures, DBMS, OS" className="mt-1.5" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Add Department</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
