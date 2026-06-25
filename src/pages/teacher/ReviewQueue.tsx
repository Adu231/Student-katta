import { useState } from 'react';
import { Clock, CheckCircle, XCircle, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MOCK_NOTES } from '@/lib/mockData';
import type { Note } from '@/types';

export default function ReviewQueue() {
  const [queue, setQueue] = useState<Note[]>(MOCK_NOTES.filter(n => n.status === 'pending'));
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleApprove = (id: string) => {
    setQueue(p => p.filter(n => n.id !== id));
    setSelectedNote(null);
    toast.success('Content approved and published!');
  };

  const handleReject = (id: string) => {
    if (!feedback.trim()) { toast.error('Please provide feedback for rejection.'); return; }
    setQueue(p => p.filter(n => n.id !== id));
    setSelectedNote(null);
    setFeedback('');
    toast.success('Content rejected with feedback sent to uploader.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Review Queue</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{queue.length} student submission{queue.length !== 1 ? 's' : ''} awaiting your review</p>
      </div>

      {queue.length === 0 ? (
        <div className="text-center py-20">
          <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
          <p className="text-muted-foreground text-sm">No student submissions pending review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Queue List */}
          <div className="space-y-3">
            {queue.map(note => (
              <div key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`sk-card p-4 cursor-pointer hover:shadow-md transition-all ${selectedNote?.id === note.id ? 'border-primary ring-1 ring-primary' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground line-clamp-1">{note.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{note.uploadedBy} · {note.subject} · Sem {note.semester}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{note.description}</p>
                  </div>
                  <span className="sk-badge-pending shrink-0">Pending</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">{note.uploadedAt} · {note.fileType} · {note.fileSize}</span>
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Review Panel */}
          {selectedNote ? (
            <div className="sk-card p-5 space-y-4 h-fit sticky top-6">
              <h2 className="font-semibold text-foreground">Review: {selectedNote.title}</h2>
              <div className="p-3 rounded-lg bg-muted/50 space-y-2 text-sm">
                {[['Submitted by', selectedNote.uploadedBy], ['Subject', selectedNote.subject], ['Department', selectedNote.department], ['Semester', `Semester ${selectedNote.semester}`], ['Type', selectedNote.type], ['File', `${selectedNote.fileType} · ${selectedNote.fileSize}`]].map(([k, v]) => (
                  <div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium text-foreground">{v}</span></div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Description</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedNote.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Feedback (required for rejection)
                </label>
                <Textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Provide feedback to the student..." rows={3} className="resize-none" />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleApprove(selectedNote.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" />Approve
                </Button>
                <Button className="flex-1" variant="destructive" onClick={() => handleReject(selectedNote.id)}>
                  <XCircle className="w-4 h-4 mr-2" />Reject
                </Button>
              </div>
            </div>
          ) : (
            <div className="sk-card p-5 flex items-center justify-center h-48">
              <p className="text-muted-foreground text-sm">Select a submission to review</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
