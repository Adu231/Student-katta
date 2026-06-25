import { Pin, Calendar, Tag, Bell, AlertTriangle } from 'lucide-react';
import type { Announcement } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  announcement: Announcement;
  compact?: boolean;
  index?: number;
}

const typeConfig: Record<string, { label: string; badgeClass: string; dot: string; icon: React.ElementType }> = {
  general:    { label: 'General',    badgeClass: 'sk-badge-general',    dot: 'bg-blue-500',    icon: Bell },
  exam:       { label: 'Exam',       badgeClass: 'sk-badge-exam',       dot: 'bg-purple-500',  icon: Bell },
  assignment: { label: 'Assignment', badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', dot: 'bg-orange-500', icon: Bell },
  holiday:    { label: 'Holiday',    badgeClass: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', dot: 'bg-green-500', icon: Bell },
  placement:  { label: 'Placement',  badgeClass: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', dot: 'bg-teal-500', icon: Bell },
  event:      { label: 'Event',      badgeClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', dot: 'bg-indigo-500', icon: Bell },
  emergency:  { label: 'Emergency',  badgeClass: 'sk-badge-emergency',  dot: 'bg-red-500',     icon: AlertTriangle },
};

export default function AnnouncementCard({ announcement, compact = false, index = 0 }: Props) {
  const config = typeConfig[announcement.type] || typeConfig.general;
  const TypeIcon = config.icon;
  const isEmergency = announcement.type === 'emergency';

  return (
    <div
      className={cn(
        'sk-card group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden',
        announcement.pinned && 'border-l-4 border-l-primary',
        isEmergency && 'border-l-4 border-l-destructive border-t-destructive/20',
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Emergency pulse background */}
      {isEmergency && (
        <div className="absolute inset-0 bg-red-50/50 dark:bg-red-900/10 rounded-xl pointer-events-none" />
      )}

      {/* Pinned ribbon */}
      {announcement.pinned && (
        <div className="absolute top-0 right-0 w-0 h-0
          border-l-[32px] border-l-transparent
          border-t-[32px] border-t-primary/80
          rounded-tr-xl"
        />
      )}

      <div className={cn('relative p-4', compact ? 'p-3' : 'p-4')}>
        {/* Type indicator dot */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className={cn('w-1.5 h-1.5 rounded-full shrink-0 mt-0.5', config.dot, isEmergency && 'animate-pulse')} />
            <span className={config.badgeClass}>{config.label}</span>
            {announcement.pinned && (
              <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                <Pin className="w-3 h-3" /> Pinned
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{announcement.publishedAt}</span>
        </div>

        <h3 className={cn(
          'font-semibold text-foreground mb-1.5 transition-colors duration-200 group-hover:text-primary',
          compact ? 'text-sm line-clamp-1' : 'text-base'
        )}>
          {announcement.title}
        </h3>

        <p className={cn(
          'text-muted-foreground leading-relaxed',
          compact ? 'text-xs line-clamp-2' : 'text-sm line-clamp-3'
        )}>
          {announcement.content}
        </p>

        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/60 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {announcement.publishedBy}
          </span>
          {announcement.expiresAt && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Expires: {announcement.expiresAt}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
