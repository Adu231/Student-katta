import { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MOCK_DEPARTMENTS } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const contentTypes = [
  { value: 'notes',         label: 'Lecture Notes',   color: 'bg-blue-500' },
  { value: 'assignment',    label: 'Assignment',       color: 'bg-orange-500' },
  { value: 'question-paper',label: 'Question Paper',  color: 'bg-purple-500' },
  { value: 'syllabus',      label: 'Syllabus',         color: 'bg-green-500' },
  { value: 'practical',     label: 'Practical Manual', color: 'bg-teal-500' },
  { value: 'study-material',label: 'Study Material',   color: 'bg-indigo-500' },
];

export default function UploadNote() {
  const [form, setForm] = useState({ title: '', description: '', subject: '', department: '', semester: '', type: 'notes', tags: '' });
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') setFile(f);
    else toast.error('Only PDF files are allowed.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { toast.error('Please select a file to upload.'); return; }
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      toast.success('Your note has been submitted for review!');
      setLoading(false);
    }, 1200);
  };

  const selectedDept = MOCK_DEPARTMENTS.find(d => d.name === form.department);

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto pt-12 text-center page-enter">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-5 animate-scale-in">
          <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Submitted for Review!</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Your note has been submitted. A teacher or admin will review it and publish it once approved.
          You can track the status in <strong>My Uploads</strong>.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={() => { setSubmitted(false); setFile(null); setForm({ title: '', description: '', subject: '', department: '', semester: '', type: 'notes', tags: '' }); }}>
            Upload Another
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6 page-enter">
      {/* Header */}
      <div className="animate-fade-in-down">
        <h1 className="text-2xl font-bold text-foreground">Upload Note</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Share your academic resources with the community</p>
      </div>

      {/* Info banner */}
      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <p className="font-semibold mb-0.5">Content Review Process</p>
          <p className="text-blue-700 dark:text-blue-300">All uploads are reviewed by teachers or admins before being published. You'll be notified once your submission is approved or rejected.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Content type selector */}
        <div className="sk-card p-6 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
          <h2 className="font-semibold text-foreground mb-4">Content Type *</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {contentTypes.map(ct => (
              <button
                key={ct.value}
                type="button"
                onClick={() => setForm(p => ({ ...p, type: ct.value }))}
                className={cn(
                  'flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] active:scale-100',
                  form.type === ct.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/40'
                )}
              >
                <div className={cn('w-3 h-3 rounded-full shrink-0', ct.color)} />
                <span className={cn('text-xs font-semibold', form.type === ct.value ? 'text-primary' : 'text-foreground')}>{ct.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resource Info */}
        <div className="sk-card p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: '160ms' }}>
          <h2 className="font-semibold text-foreground">Resource Information</h2>
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" value={form.title} onChange={handleChange} placeholder="e.g., Data Structures - Linked Lists Complete Notes" className="mt-1.5" required />
          </div>
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Describe what this resource covers, what students will learn, and which topics are included..." rows={3} className="mt-1.5 resize-none" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="semester">Semester *</Label>
              <select id="semester" name="semester" value={form.semester} onChange={handleChange}
                className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required>
                <option value="">Select</option>
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Sem {s}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <select id="department" name="department" value={form.department} onChange={handleChange}
                className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required>
                <option value="">Select</option>
                {MOCK_DEPARTMENTS.map(d => <option key={d.id} value={d.name}>{d.code}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <select id="subject" name="subject" value={form.subject} onChange={handleChange}
                className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required>
                <option value="">Select</option>
                {(selectedDept?.subjects || []).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" name="tags" value={form.tags} onChange={handleChange} placeholder="e.g., DSA, sorting, algorithms, linked-list" className="mt-1.5" />
          </div>
        </div>

        {/* File Upload */}
        <div className="sk-card p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h2 className="font-semibold text-foreground mb-4">Upload File *</h2>
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput')?.click()}
            className={cn(
              'border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200',
              dragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border hover:border-primary/50 hover:bg-muted/30'
            )}
          >
            {file ? (
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB · PDF</p>
                </div>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); setFile(null); }}
                  className="p-1 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300', dragging ? 'bg-primary/10 scale-110' : 'bg-muted')}>
                  <Upload className={cn('w-7 h-7 transition-colors duration-200', dragging ? 'text-primary' : 'text-muted-foreground')} />
                </div>
                <p className="font-semibold text-foreground mb-1">Drag & drop your PDF here</p>
                <p className="text-sm text-muted-foreground">or click to browse · PDF only · Max 20 MB</p>
              </>
            )}
          </div>
          <input id="fileInput" type="file" accept=".pdf" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
        </div>

        {/* Submit */}
        <div className="flex gap-3 animate-fade-in" style={{ animationDelay: '250ms' }}>
          <Button type="submit" className="flex-1 sm:flex-none sm:px-10 relative overflow-hidden group" size="lg" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2"><div className="sk-spinner" />Submitting...</span>
            ) : (
              'Submit for Review'
            )}
            <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => { setForm({ title: '', description: '', subject: '', department: '', semester: '', type: 'notes', tags: '' }); setFile(null); }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
