import { FileText, Download, Star, Bookmark, Heart, Eye, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { Note } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
  note: Note;
  showStatus?: boolean;
  showActions?: boolean;
  index?: number;
}

const typeColors: Record<string, string> = {
  'notes': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'assignment': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'question-paper': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'syllabus': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'practical': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  'study-material': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
};

const typeIconColors: Record<string, string> = {
  'notes': 'bg-blue-500',
  'assignment': 'bg-orange-500',
  'question-paper': 'bg-purple-500',
  'syllabus': 'bg-green-500',
  'practical': 'bg-teal-500',
  'study-material': 'bg-indigo-500',
};

const typeLabels: Record<string, string> = {
  'notes': 'Notes',
  'assignment': 'Assignment',
  'question-paper': 'Question Paper',
  'syllabus': 'Syllabus',
  'practical': 'Practical',
  'study-material': 'Study Material',
};

export default function NoteCard({ note, showStatus = false, showActions = false, index = 0 }: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(note.likes);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(b => !b);
    toast.success(bookmarked ? 'Removed from bookmarks' : 'Bookmarked!');
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(l => !l);
    setLikeCount(c => liked ? c - 1 : c + 1);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`Downloading ${note.title}...`);
  };

  return (
    <div
      className="sk-card sk-card-shine flex flex-col group relative overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Top color strip by type */}
      <div className={cn('h-1 w-full rounded-t-xl', typeIconColors[note.type] || 'bg-primary')} />

      <div className="p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110',
              typeIconColors[note.type] || 'bg-primary'
            )}>
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <Link
                to={`/student/note-details?id=${note.id}`}
                className="font-semibold text-sm text-foreground hover:text-primary line-clamp-2 transition-colors duration-200 leading-snug"
              >
                {note.title}
              </Link>
              <p className="text-xs text-muted-foreground mt-0.5">{note.uploadedBy} · Sem {note.semester}</p>
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-1">
            <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium', typeColors[note.type])}>
              {typeLabels[note.type]}
            </span>
            {/* Bookmark button */}
            <button
              onClick={handleBookmark}
              className={cn(
                'p-1 rounded transition-all duration-200 hover:scale-110 active:scale-95',
                bookmarked ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              )}
              title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              <Bookmark className={cn('w-3.5 h-3.5', bookmarked && 'fill-current')} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{note.description}</p>

        {/* Tags */}
        <div className="flex items-center gap-1 flex-wrap mb-3">
          <span className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">{note.subject}</span>
          <span className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">{note.department}</span>
        </div>

        {/* Status badge */}
        {showStatus && (
          <div className="mb-3">
            {note.status === 'approved' && (
              <span className="sk-badge-approved animate-scale-in">✓ Approved</span>
            )}
            {note.status === 'pending' && (
              <span className="sk-badge-pending animate-scale-in">⏳ Pending Review</span>
            )}
            {note.status === 'rejected' && (
              <span className="sk-badge-rejected animate-scale-in">✗ Rejected</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border relative">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {/* Download */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 hover:text-primary transition-colors duration-200 hover:scale-110 active:scale-95 transform"
              title="Download"
            >
              <Download className="w-3 h-3" />
              <span>{note.downloads}</span>
            </button>
            {/* Rating */}
            {note.rating > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {note.rating.toFixed(1)}
              </span>
            )}
            {/* Like */}
            <button
              onClick={handleLike}
              className={cn(
                'flex items-center gap-1 transition-all duration-200 hover:scale-110 active:scale-95',
                liked ? 'text-red-500' : 'hover:text-red-400'
              )}
              title="Like"
            >
              <Heart className={cn('w-3 h-3 transition-all duration-200', liked && 'fill-current scale-110')} />
              <span>{likeCount}</span>
            </button>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:opacity-0 transition-opacity duration-200">
            <span>{note.fileType}</span>
            <span>·</span>
            <span>{note.fileSize}</span>
          </div>
          <Link
            to={`/student/note-details?id=${note.id}`}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-auto z-10"
            onClick={e => e.stopPropagation()}
          >
            <Eye className="w-3 h-3" /> View
          </Link>
        </div>

        {/* Hover overlay CTA */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
      </div>
    </div>
  );
}
