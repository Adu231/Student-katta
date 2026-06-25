import { useState } from 'react';
import { Trash2, Eye, Clock, CheckCircle, XCircle, Upload, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MOCK_NOTES } from '@/lib/mockData';
import NoteCard from '@/components/features/NoteCard';
import { cn } from '@/lib/utils';

const tabs = ['All', 'Pending', 'Approved', 'Rejected'] as const;

const tabColors: Record<string, string> = {
  All:      'text-foreground',
  Pending:  'text-amber-600 dark:text-amber-400',
  Approved: 'text-emerald-600 dark:text-emerald-400',
  Rejected: 'text-destructive',
};

const summaryCards = [
  { label: 'Total',    key: 'All',      accent: 'border-t-primary',        icon: Upload       },
  { label: 'Pending',  key: 'Pending',  accent: 'border-t-amber-500',      icon: Clock        },
  { label: 'Approved', key: 'Approved', accent: 'border-t-emerald-500',    icon: CheckCircle  },
  { label: 'Rejected', key: 'Rejected', accent: 'border-t-destructive',    icon: XCircle      },
];

export default function MyUploads() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [notes, setNotes] = useState(MOCK_NOTES);

  const counts = {
    All:      notes.length,
    Pending:  notes.filter(n => n.status === 'pending').length,
    Approved: notes.filter(n => n.status === 'approved').length,
    Rejected: notes.filter(n => n.status === 'rejected').length,
  };

  const filtered = notes.filter(n => activeTab === 'All' || n.status === activeTab.toLowerCase());

  const handleDelete = (id: string) => {
    setNotes(p => p.filter(n => n.id !== id));
    toast.success('Upload removed successfully.');
  };

  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-in-down">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Uploads</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Track and manage all your uploaded resources</p>
        </div>
        <Button size="sm" asChild className="hidden sm:flex group">
          <Link to="/student/upload-note">
            <Upload className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-y-0.5" />
            Upload New
          </Link>
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger-children">
        {summaryCards.map(({ label, key, accent, icon: Icon }, i) => (
          <button
            key={label}
            onClick={() => setActiveTab(key)}
            className={cn(
              'sk-card p-4 border-t-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md animate-fade-in-up',
              accent,
              activeTab === key && 'ring-2 ring-inset ring-primary/20'
            )}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{counts[key as keyof typeof counts]}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
              <Icon className={cn('w-4 h-4 mt-1', tabColors[key])} />
            </div>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-200 -mb-px',
              activeTab === tab
                ? `border-primary ${tabColors[tab]}`
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            )}
          >
            {tab}
            <span className={cn(
              'ml-1.5 text-xs px-1.5 py-0.5 rounded-full transition-colors duration-200',
              activeTab === tab ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            )}>
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 animate-scale-in">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">No {activeTab.toLowerCase()} uploads</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {activeTab === 'All' ? "You haven't uploaded any content yet." : `No ${activeTab.toLowerCase()} uploads found.`}
          </p>
          <Button asChild size="sm">
            <Link to="/student/upload-note" className="flex items-center gap-2">
              Upload your first note <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {filtered.map((note, i) => (
            <div key={note.id} className="relative group animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <NoteCard note={note} showStatus index={i} />
              <div className="absolute top-6 right-4 flex gap-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-20">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-7 w-7 p-0 shadow-sm hover:scale-110 transition-transform duration-150"
                  asChild
                >
                  <Link to={`/student/note-details?id=${note.id}`}><Eye className="w-3.5 h-3.5" /></Link>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-7 w-7 p-0 shadow-sm hover:scale-110 transition-transform duration-150"
                  onClick={() => handleDelete(note.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
