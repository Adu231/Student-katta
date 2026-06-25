import { Bell, CheckCircle, XCircle, Info, Megaphone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const INITIAL_NOTIFS = [
  { id: 'n1', type: 'approved',     title: 'Your upload was approved!',          desc: '"Data Structures & Algorithms" has been approved by Dr. Anjali Mehta and is now live.',                                  time: '2 hours ago',  read: false },
  { id: 'n2', type: 'rejected',     title: 'Upload returned for revision',        desc: '"Computer Networks - OSI Model" was returned with feedback: Please add more detailed explanations for routing algorithms.', time: '1 day ago',    read: false },
  { id: 'n3', type: 'announcement', title: 'End Semester Examinations Scheduled', desc: 'End Semester Examinations scheduled from July 5, 2026. Check your timetable on the academic portal.',                    time: '3 days ago',   read: true  },
  { id: 'n4', type: 'info',         title: 'Assignment Submission Deadline',      desc: 'DBMS Assignment on ER Diagrams due on June 28, 2026. Submit via the upload portal.',                                      time: '4 days ago',   read: true  },
  { id: 'n5', type: 'approved',     title: 'Engineering Mathematics Approved!',   desc: '"Engineering Mathematics Notes" has been approved and published to the repository.',                                       time: '1 week ago',   read: true  },
];

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  approved:     { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  rejected:     { icon: XCircle,     color: 'text-destructive',  bg: 'bg-red-50 dark:bg-red-900/20' },
  announcement: { icon: Megaphone,   color: 'text-primary',      bg: 'bg-blue-50 dark:bg-blue-900/20' },
  info:         { icon: Info,        color: 'text-amber-500',    bg: 'bg-amber-50 dark:bg-amber-900/20' },
};

export default function StudentNotifications() {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const unread = notifs.filter(n => !n.read).length;

  const markAllRead  = () => setNotifs(p => p.map(n => ({ ...n, read: true })));
  const markRead     = (id: string) => setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  const dismiss      = (id: string) => setNotifs(p => p.filter(n => n.id !== id));

  return (
    <div className="max-w-2xl space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-down">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {unread > 0
              ? <><span className="font-semibold text-primary">{unread}</span> unread notification{unread !== 1 ? 's' : ''}</>
              : 'All caught up!'
            }
          </p>
        </div>
        {unread > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllRead} className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" /> Mark all as read
          </Button>
        )}
      </div>

      {notifs.length === 0 ? (
        <div className="text-center py-24 animate-scale-in">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-5">
            <Bell className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
          <p className="text-sm text-muted-foreground">No notifications at the moment.</p>
        </div>
      ) : (
        <div className="space-y-2 stagger-children">
          {notifs.map((n, i) => {
            const config = typeConfig[n.type] || typeConfig.info;
            const Icon = config.icon;
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn(
                  'sk-card p-4 flex items-start gap-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group animate-fade-in-up',
                  !n.read && 'border-l-4 border-l-primary bg-primary/5 dark:bg-primary/10'
                )}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110', config.bg)}>
                  <Icon className={cn('w-5 h-5', config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm mb-0.5 leading-snug', !n.read ? 'font-semibold text-foreground' : 'font-medium text-foreground')}>
                    {n.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{n.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1.5">{n.time}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {!n.read && (
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                  <button
                    onClick={e => { e.stopPropagation(); dismiss(n.id); }}
                    className="text-xs text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
