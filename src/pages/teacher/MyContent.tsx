import { useState } from 'react';
import { Edit2, Trash2, Eye, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MOCK_NOTES } from '@/lib/mockData';
import NoteCard from '@/components/features/NoteCard';

const teacherContent = MOCK_NOTES.filter(n => n.uploaderRole === 'teacher');
const tabs = ['All', 'Pending', 'Approved', 'Rejected'];

export default function TeacherMyContent() {
  const [activeTab, setActiveTab] = useState('All');
  const [content, setContent] = useState(teacherContent);

  const filtered = content.filter(n => activeTab === 'All' || n.status === activeTab.toLowerCase());
  const counts = { All: content.length, Pending: content.filter(n => n.status === 'pending').length, Approved: content.filter(n => n.status === 'approved').length, Rejected: content.filter(n => n.status === 'rejected').length };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>My Content</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage your uploaded academic resources</p>
        </div>
        <Button size="sm" asChild><Link to="/teacher/upload-content"><Upload className="w-4 h-4 mr-2" />Upload New</Link></Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(counts).map(([k, v]) => (
          <div key={k} className="sk-card p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{v}</p>
            <p className="text-xs text-muted-foreground">{k}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 border-b border-border">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            {tab} <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{counts[tab as keyof typeof counts]}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16"><p className="text-muted-foreground">No {activeTab.toLowerCase()} content</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(note => (
            <div key={note.id} className="relative group">
              <NoteCard note={note} showStatus />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button size="sm" variant="secondary" className="h-7 w-7 p-0"><Edit2 className="w-3.5 h-3.5" /></Button>
                <Button size="sm" variant="destructive" className="h-7 w-7 p-0" onClick={() => { setContent(p => p.filter(n => n.id !== note.id)); toast.success('Content deleted.'); }}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
