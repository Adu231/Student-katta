import { useState } from 'react';
import { Upload, FileText, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MOCK_DEPARTMENTS } from '@/lib/mockData';

export default function TeacherUploadContent() {
  const [form, setForm] = useState({ title: '', description: '', subject: '', department: '', semester: '', type: 'notes', tags: '' });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { toast.error('Please select a file.'); return; }
    setLoading(true);
    setTimeout(() => {
      toast.success('Content submitted for admin approval! It will be published once approved.');
      setForm({ title: '', description: '', subject: '', department: '', semester: '', type: 'notes', tags: '' });
      setFile(null);
      setLoading(false);
    }, 1000);
  };

  const selectedDept = MOCK_DEPARTMENTS.find(d => d.name === form.department);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Upload Content</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Share official academic resources with students</p>
      </div>

      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-sm text-emerald-700 dark:text-emerald-300">
          <p className="font-medium mb-0.5">Teacher Upload Workflow</p>
          <p>Teacher content requires admin approval before being published. You'll be notified once reviewed.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="sk-card p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Content Details</h2>
          <div><Label htmlFor="title">Title *</Label><Input id="title" name="title" value={form.title} onChange={handleChange} placeholder="e.g., Data Structures Unit 1 - Complete Notes" className="mt-1.5" required /></div>
          <div><Label htmlFor="description">Description *</Label><Textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Describe the content..." rows={3} className="mt-1.5 resize-none" required /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Content Type *</Label>
              <select id="type" name="type" value={form.type} onChange={handleChange} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {[['notes', 'Lecture Notes'], ['assignment', 'Assignment'], ['question-paper', 'Question Paper'], ['syllabus', 'Syllabus'], ['practical', 'Practical Manual'], ['study-material', 'Study Material']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="semester">Semester *</Label>
              <select id="semester" name="semester" value={form.semester} onChange={handleChange} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
                <option value="">Select</option>
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Department *</Label>
              <select id="department" name="department" value={form.department} onChange={handleChange} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
                <option value="">Select</option>
                {MOCK_DEPARTMENTS.map(d => <option key={d.id} value={d.name}>{d.code}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <select id="subject" name="subject" value={form.subject} onChange={handleChange} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
                <option value="">Select</option>
                {(selectedDept?.subjects || []).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div><Label htmlFor="tags">Tags</Label><Input id="tags" name="tags" value={form.tags} onChange={handleChange} placeholder="Comma-separated tags" className="mt-1.5" /></div>
        </div>

        <div className="sk-card p-6">
          <h2 className="font-semibold text-foreground mb-4">Upload File</h2>
          <div onClick={() => document.getElementById('teacherFile')?.click()}
            className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:border-primary/50 transition-colors">
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <FileText className="w-8 h-8 text-emerald-500" />
                <div className="text-left"><p className="font-medium text-foreground">{file.name}</p><p className="text-xs text-muted-foreground">{(file.size/1024/1024).toFixed(2)} MB</p></div>
              </div>
            ) : (
              <><Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" /><p className="font-medium text-foreground mb-1">Click to upload PDF</p><p className="text-sm text-muted-foreground">PDF only · Max 50 MB</p></>
            )}
          </div>
          <input id="teacherFile" type="file" accept=".pdf" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
        </div>

        <Button type="submit" className="w-full sm:w-auto sm:px-8" disabled={loading}>{loading ? 'Submitting...' : 'Submit for Approval'}</Button>
      </form>
    </div>
  );
}
