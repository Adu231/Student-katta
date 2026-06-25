import { ClipboardList, Upload, CheckCircle, FileText, Clock, BarChart3, Bell, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/features/StatsCard';
import AnnouncementCard from '@/components/features/AnnouncementCard';
import { MOCK_NOTES, MOCK_ANNOUNCEMENTS } from '@/lib/mockData';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const initialPending = MOCK_NOTES.filter(n => n.status === 'pending');
const recentAnnouncements = MOCK_ANNOUNCEMENTS.slice(0, 2);

const quickActions = [
  { label: 'Review Queue',  icon: ClipboardList, href: '/teacher/review-queue',   color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30', badge: initialPending.length },
  { label: 'Upload Content',icon: Upload,        href: '/teacher/upload-content', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30' },
  { label: 'My Content',    icon: FileText,      href: '/teacher/my-content',     color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30' },
  { label: 'Announcements', icon: Bell,          href: '/teacher/announcements',  color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30' },
];

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [pendingNotes, setPendingNotes] = useState(initialPending);

  const handleApprove = (id: string) => {
    setPendingNotes(p => p.filter(n => n.id !== id));
    toast.success('Content approved and published!');
  };
  const handleReject = (id: string) => {
    setPendingNotes(p => p.filter(n => n.id !== id));
    toast.error('Content rejected.');
  };

  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-in-down">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Teacher Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Welcome, <span className="text-primary font-medium">{user?.name}</span>. Manage your content and reviews.
          </p>
        </div>
        <Button size="sm" asChild className="hidden sm:flex">
          <Link to="/teacher/upload-content">
            <Upload className="w-4 h-4 mr-2" /> Upload Content
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <StatsCard title="Pending Reviews" value={pendingNotes.length} subtitle="Awaiting your review" icon={ClipboardList} color="orange" trend={{ value: '2 new today', positive: false }} index={0} />
        <StatsCard title="My Content"      value={8}                  subtitle="Published resources" icon={FileText}      color="blue"   index={1} />
        <StatsCard title="Approved Today"  value={3}                  subtitle="Reviewed & approved" icon={CheckCircle}   color="green"  index={2} />
        <StatsCard title="Total Downloads" value={1240}               subtitle="All my content"      icon={BarChart3}     color="purple" index={3} />
      </div>

      {/* Quick Actions */}
      <div className="sk-card p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger-children">
          {quickActions.map((a, i) => (
            <Link
              key={a.label}
              to={a.href}
              className={`relative flex flex-col items-center gap-2.5 p-4 rounded-xl transition-all duration-250 hover:-translate-y-1 hover:shadow-md active:translate-y-0 text-center group ${a.color}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {'badge' in a && (a.badge as number) > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-bold animate-scale-in">
                  {a.badge}
                </span>
              )}
              <div className="w-10 h-10 rounded-xl bg-white/60 dark:bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <a.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending review list */}
        <div className="lg:col-span-2 sk-card p-5 animate-fade-in-left" style={{ animationDelay: '250ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">Pending Reviews</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/teacher/review-queue" className="flex items-center gap-1">
                View all ({pendingNotes.length}) <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          {pendingNotes.length === 0 ? (
            <div className="text-center py-10">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">All caught up!</p>
              <p className="text-xs text-muted-foreground mt-1">No pending reviews at the moment.</p>
            </div>
          ) : (
            <div className="space-y-2.5 stagger-children">
              {pendingNotes.map((note, i) => (
                <div
                  key={note.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-all duration-200 group animate-fade-in-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{note.title}</p>
                      <p className="text-xs text-muted-foreground">{note.uploadedBy} · {note.subject} · Sem {note.semester}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0 ml-2">
                    <Button
                      size="sm"
                      className="h-7 text-xs bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-200 active:scale-95"
                      onClick={() => handleApprove(note.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs text-destructive border-destructive/30 hover:bg-destructive/5 transition-all duration-200 active:scale-95"
                      onClick={() => handleReject(note.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4 animate-fade-in-right" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Announcements</h2>
          </div>
          {recentAnnouncements.map((a, i) => (
            <AnnouncementCard key={a.id} announcement={a} compact index={i} />
          ))}

          <div className="sk-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">This Month's Activity</h3>
            <div className="space-y-3">
              {[
                { label: 'Content Reviewed', value: 18, total: 20, color: 'bg-blue-500' },
                { label: 'Approved',         value: 15, total: 18, color: 'bg-emerald-500' },
                { label: 'Rejected',         value: 3,  total: 18, color: 'bg-red-500' },
              ].map(({ label, value, total, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${color}`}
                      style={{ width: `${(value / total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sk-card p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200/50 dark:border-emerald-700/30">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Great work!</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">Your content has been downloaded 1,240 times this month. Keep sharing quality resources!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
