import { useState } from 'react';
import { Bookmark, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import NoteCard from '@/components/features/NoteCard';
import { MOCK_NOTES } from '@/lib/mockData';
import { toast } from 'sonner';

export default function StudentBookmarks() {
  const [bookmarks, setBookmarks] = useState(MOCK_NOTES.filter(n => n.status === 'approved').slice(0, 5));

  const removeBookmark = (id: string) => {
    setBookmarks(p => p.filter(n => n.id !== id));
    toast.success('Bookmark removed');
  };

  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-in-down">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bookmarks</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Your saved academic resources</p>
        </div>
        {bookmarks.length > 0 && (
          <Button variant="outline" size="sm" asChild>
            <Link to="/student/notes" className="flex items-center gap-1">
              Browse More <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-24 animate-scale-in">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-5">
            <Bookmark className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No bookmarks yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">Save notes and resources you want to revisit later by clicking the bookmark icon on any note card.</p>
          <Button asChild size="sm">
            <Link to="/student/notes" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Browse Notes
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground animate-fade-in">
            <span className="font-semibold text-foreground">{bookmarks.length}</span> saved resource{bookmarks.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {bookmarks.map((note, i) => (
              <div key={note.id} className="relative group animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <NoteCard note={note} index={i} />
                <button
                  onClick={() => removeBookmark(note.id)}
                  className="absolute top-6 right-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 p-1.5 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/80 active:scale-95 z-20 shadow-sm"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
