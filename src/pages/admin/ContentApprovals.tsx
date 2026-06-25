import { useState } from 'react';
import { CheckCircle, XCircle, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MOCK_NOTES } from '@/lib/mockData';
import type { Note } from '@/types';

const tabs = ['All Pending', 'Student Uploads', 'Teacher Uploads'];

export default function ContentApprovals() {
  const [queue, setQueue] = useState<Note[]>(MOCK_NOTES.filter(n => n.status === 'pending'));
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [feedback, setFeedback] = useState('');
  const [activeTab, setActiveTab] = useState('All Pending');

  const filtered = queue.filter(n => {
    if (activeTab === 'Student Uploads') return n.uploaderRole === 'student';
    if (activeTab === 'Teacher Uploads') return n.uploaderRole === 'teacher';
    return true;
  });

  const approve = (id: string) => { setQueue(p => p.filter(n => n.id !== id)); setSelectedNote(null); toast.success('Content approved and published!'); };
  const reject = (id: string) => {
    if (!feedback.trim()) { toast.error('Please provide rejection feedback.'); return; }
    setQueue(p => p.filter(n => n.id !== id)); setSelectedNote(null); setFeedback('');
    toast.success('Content rejected. Feedback sent.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Content Approvals</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{queue.length} item{queue.length !== 1 ? 's' : ''} awaiting approval</p>
      </div>

      <div className="flex gap-1 border-b border-border">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">All clear!</h3>
          <p className="text-muted-foreground text-sm">No content pending approval in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {filtered.map(note => (
              <div key={note.id} onClick={() => setSelectedNote(note)}
                className={`sk-card p-4 cursor-pointer hover:shadow-md transition-all ${selectedNote?.id === note.id ? 'border-primary ring-1 ring-primary' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${note.uploaderRole === 'teacher' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
                    <FileText className={`w-5 h-5 ${note.uploaderRole === 'teacher' ? 'text-emerald-600' : 'text-amber-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground line-clamp-1">{note.title}</p>
                    <p className="text-xs text-muted-foreground">{note.uploadedBy} ({note.uploaderRole}) · {note.subject}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="sk-badge-pending">Pending</span>
                      <span className="text-xs text-muted-foreground">{note.uploadedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedNote ? (
            <div className="sk-card p-5 space-y-4 h-fit sticky top-6">
              <h2 className="font-semibold text-foreground">Review Content</h2>
              <div className="p-3 bg-muted/50 rounded-lg space-y-2 text-sm">
                {[['Title', selectedNote.title], ['Uploader', `${selectedNote.uploadedBy} (${selectedNote.uploaderRole})`], ['Subject', selectedNote.subject], ['Department', selectedNote.department], ['Type', selectedNote.type], ['Date', selectedNote.uploadedAt]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2"><span className="text-muted-foreground shrink-0">{k}</span><span className="font-medium text-foreground text-right">{v}</span></div>
                ))}
              </div>
              <div><p className="text-sm font-medium mb-1">Description</p><p className="text-sm text-muted-foreground">{selectedNote.description}</p></div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Admin Feedback</label>
                <Textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Feedback for rejection (required)..." rows={3} className="resize-none" />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => approve(selectedNote.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" />Approve
                </Button>
                <Button className="flex-1" variant="destructive" onClick={() => reject(selectedNote.id)}>
                  <XCircle className="w-4 h-4 mr-2" />Reject
                </Button>
              </div>
            </div>
          ) : (
            <div className="sk-card p-5 flex items-center justify-center h-48">
              <p className="text-muted-foreground text-sm">Select content to review</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
