import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Download, Star, Bookmark, Heart, Flag, ArrowLeft, FileText, User, Calendar, Tag, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MOCK_NOTES } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const sampleComments = [
  { author: 'Rahul V.', text: 'Very well structured notes. Helped me a lot for the exams!', date: '2026-06-15', rating: 5 },
  { author: 'Meera J.', text: 'Good explanations but some diagrams are missing.', date: '2026-06-12', rating: 4 },
  { author: 'Aarav K.', text: 'Comprehensive coverage of all topics. Highly recommended!', date: '2026-06-10', rating: 5 },
];

const typeColors: Record<string, string> = {
  'notes':         'bg-blue-500',
  'assignment':    'bg-orange-500',
  'question-paper':'bg-purple-500',
  'syllabus':      'bg-green-500',
  'practical':     'bg-teal-500',
  'study-material':'bg-indigo-500',
};

export default function NoteDetails() {
  const [params] = useSearchParams();
  const id = params.get('id');
  const note = MOCK_NOTES.find(n => n.id === id) || MOCK_NOTES[0];

  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked]           = useState(false);
  const [likeCount, setLikeCount]   = useState(note.likes);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [rating, setRating]         = useState(0);
  const [comment, setComment]       = useState('');

  const handleDownload = () => toast.success('Download started!');
  const handleReport   = () => toast.info('Report submitted for review.');
  const handleShare    = () => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied to clipboard!'); };
  const handleComment  = () => {
    if (!comment.trim()) { toast.error('Please write a comment.'); return; }
    toast.success('Comment submitted for review.');
    setComment('');
  };

  const accentColor = typeColors[note.type] || 'bg-primary';

  return (
    <div className="space-y-6 max-w-5xl page-enter">
      {/* Back */}
      <div className="animate-fade-in-down">
        <Button variant="ghost" size="sm" asChild className="hover:-translate-x-1 transition-transform duration-200">
          <Link to="/student/notes"><ArrowLeft className="w-4 h-4 mr-1.5" />Back to Notes</Link>
        </Button>
      </div>

      {/* Title card */}
      <div className="sk-card overflow-hidden animate-fade-in-up" style={{ animationDelay: '80ms' }}>
        <div className={cn('h-1.5 w-full', accentColor)} />
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shrink-0', accentColor)}>
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-foreground mb-1.5">{note.title}</h1>
                  <div className="flex items-center gap-x-3 gap-y-1 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{note.uploadedBy}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{note.uploadedAt}</span>
                    <span className="text-xs">{note.fileType} · {note.fileSize}</span>
                  </div>
                </div>
                <span className="sk-badge-approved shrink-0 animate-scale-in">✓ Approved</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Downloads', value: note.downloads },
              { label: 'Likes',     value: likeCount },
              { label: 'Bookmarks', value: note.bookmarks },
              { label: 'Rating',    value: `${note.rating.toFixed(1)} / 5` },
            ].map((s, i) => (
              <div
                key={s.label}
                className="p-3 rounded-xl bg-muted/50 text-center hover:bg-muted transition-colors duration-200 animate-fade-in-up"
                style={{ animationDelay: `${100 + i * 60}ms` }}
              >
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={handleDownload} className="group">
              <Download className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-y-0.5" />
              Download
            </Button>
            <Button
              variant="outline"
              onClick={() => { setBookmarked(!bookmarked); toast.success(bookmarked ? 'Bookmark removed' : 'Bookmarked!'); }}
              className={cn('transition-all duration-200', bookmarked && 'text-primary border-primary')}
            >
              <Bookmark className={cn('w-4 h-4 mr-2 transition-all duration-200', bookmarked && 'fill-primary scale-110')} />
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button
              variant="outline"
              onClick={() => { setLiked(!liked); setLikeCount(c => liked ? c - 1 : c + 1); toast.success(liked ? 'Like removed' : 'Liked!'); }}
              className={cn('transition-all duration-200', liked && 'text-red-500 border-red-300')}
            >
              <Heart className={cn('w-4 h-4 mr-2 transition-all duration-200', liked && 'fill-red-500 scale-110')} />
              {liked ? 'Liked' : 'Like'}
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleReport}>
              <Flag className="w-4 h-4 mr-1.5" /> Report
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Description */}
          <div className="sk-card p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="font-semibold text-foreground mb-3">Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{note.description}</p>
          </div>

          {/* Tags */}
          <div className="sk-card p-5 animate-fade-in-up" style={{ animationDelay: '240ms' }}>
            <h2 className="font-semibold text-foreground mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-primary/10 hover:text-primary rounded-full text-xs text-muted-foreground cursor-default transition-all duration-200 hover:scale-105 animate-scale-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <Tag className="w-3 h-3" />{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Rating & Comment */}
          <div className="sk-card p-5 animate-fade-in-up" style={{ animationDelay: '280ms' }}>
            <h2 className="font-semibold text-foreground mb-4">Rate & Review</h2>
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onClick={() => { setRating(s); toast.success('Rating submitted!'); }}
                  onMouseEnter={() => setHoveredStar(s)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="w-8 h-8 transition-all duration-150 hover:scale-125 active:scale-110"
                >
                  <Star
                    className={cn(
                      'w-full h-full transition-colors duration-150',
                      s <= (hoveredStar || rating) ? 'text-amber-400' : 'text-muted-foreground/40'
                    )}
                    fill={s <= (hoveredStar || rating) ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
              {rating > 0 && <span className="text-sm text-muted-foreground ml-2">{rating}/5</span>}
            </div>
            <Textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Share your thoughts on this resource..."
              rows={3}
              className="mb-3 resize-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
            />
            <Button size="sm" onClick={handleComment} disabled={!comment.trim()}>
              Submit Review
            </Button>
          </div>

          {/* Comments */}
          <div className="sk-card p-5 animate-fade-in-up" style={{ animationDelay: '320ms' }}>
            <h2 className="font-semibold text-foreground mb-4">Reviews ({sampleComments.length})</h2>
            <div className="space-y-4">
              {sampleComments.map((c, i) => (
                <div
                  key={i}
                  className="border-b border-border last:border-0 pb-4 last:pb-0 animate-fade-in-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{c.author.charAt(0)}</span>
                      </div>
                      <span className="font-semibold text-sm text-foreground">{c.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: c.rating }).map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">{c.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground pl-9">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 animate-fade-in-right" style={{ animationDelay: '200ms' }}>
          <div className="sk-card p-5">
            <h2 className="font-semibold text-foreground mb-4">Resource Details</h2>
            <dl className="space-y-3">
              {[
                ['Subject',    note.subject],
                ['Department', note.department],
                ['Semester',   `Semester ${note.semester}`],
                ['Type',       note.type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())],
                ['Format',     note.fileType],
                ['Size',       note.fileSize],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-start gap-2">
                  <dt className="text-xs text-muted-foreground">{k}</dt>
                  <dd className="text-xs font-semibold text-foreground text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
