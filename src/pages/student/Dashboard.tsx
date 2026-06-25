import { Upload, BookOpen, Download, Bookmark, Clock, CheckCircle, XCircle, Bell, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/features/StatsCard';
import NoteCard from '@/components/features/NoteCard';
import AnnouncementCard from '@/components/features/AnnouncementCard';
import { MOCK_NOTES, MOCK_ANNOUNCEMENTS } from '@/lib/mockData';
import { useAuth } from '@/hooks/useAuth';

const myUploads = MOCK_NOTES.slice(0, 3);
const recentNotes = MOCK_NOTES.filter(n => n.status === 'approved').slice(0, 3);
const announcements = MOCK_ANNOUNCEMENTS.slice(0, 2);

const quickActions = [
  { label: 'Browse Notes',  icon: BookOpen, href: '/student/notes',       color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30' },
  { label: 'Upload Note',   icon: Upload,   href: '/student/upload-note', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30' },
  { label: 'My Uploads',    icon: Download, href: '/student/my-uploads',  color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30' },
  { label: 'Bookmarks',     icon: Bookmark, href: '/student/bookmarks',   color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30' },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const pending  = myUploads.filter(n => n.status === 'pending').length;
  const approved = myUploads.filter(n => n.status === 'approved').length;
  const rejected = myUploads.filter(n => n.status === 'rejected').length;

  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-in-down">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Welcome back, <span className="text-primary font-medium">{user?.name}</span>. Here's your academic overview.
          </p>
        </div>
        <Button asChild size="sm" className="hidden sm:flex relative overflow-hidden group/btn">
          <Link to="/student/upload-note">
            <Upload className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
            Upload Note
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <StatsCard title="My Uploads"     value={myUploads.length} subtitle="Total submissions" icon={Upload}      color="blue"   index={0} />
        <StatsCard title="Pending Review" value={pending}          subtitle="Awaiting approval" icon={Clock}       color="orange" index={1} />
        <StatsCard title="Approved"       value={approved}         subtitle="Published content" icon={CheckCircle} color="green"  index={2} />
        <StatsCard title="Bookmarks"      value={8}               subtitle="Saved resources"   icon={Bookmark}    color="purple" index={3} />
      </div>

      {/* Quick Actions */}
      <div className="sk-card p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide text-muted-foreground">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger-children">
          {quickActions.map((a, i) => (
            <Link
              key={a.label}
              to={a.href}
              className={`flex flex-col items-center gap-2.5 p-4 rounded-xl transition-all duration-250 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-none text-center group ${a.color}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/60 dark:bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <a.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Recent Uploads */}
        <div className="lg:col-span-2 space-y-4 animate-fade-in-left" style={{ animationDelay: '250ms' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">My Recent Uploads</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/my-uploads" className="flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            {myUploads.map((note, i) => (
              <div key={note.id} className="animate-fade-in-up" style={{ animationDelay: `${300 + i * 80}ms` }}>
                <NoteCard note={note} showStatus index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar widgets */}
        <div className="space-y-4 animate-fade-in-right" style={{ animationDelay: '300ms' }}>
          {/* Announcements */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-foreground">Announcements</h2>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {announcements.map((a, i) => (
                <AnnouncementCard key={a.id} announcement={a} compact index={i} />
              ))}
            </div>
          </div>

          {/* Upload Status Summary */}
          <div className="sk-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Upload Status</h3>
            <div className="space-y-3">
              {[
                { label: 'Pending',  count: pending,  color: 'bg-amber-500',    textColor: 'text-amber-600 dark:text-amber-400',   icon: Clock },
                { label: 'Approved', count: approved, color: 'bg-emerald-500',  textColor: 'text-emerald-600 dark:text-emerald-400', icon: CheckCircle },
                { label: 'Rejected', count: rejected, color: 'bg-red-500',      textColor: 'text-destructive',                       icon: XCircle },
              ].map(({ label, count, color, textColor, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${textColor}`} />
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${color}`}
                        style={{ width: `${(count / Math.max(myUploads.length, 1)) * 100}%` }}
                      />
                    </div>
                    <span className={`text-sm font-bold w-4 text-right ${textColor}`}>{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip card */}
          <div className="sk-card p-4 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-900/20 border-primary/20">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-primary mb-1">Pro Tip</p>
                <p className="text-xs text-muted-foreground">Add detailed descriptions and tags to your uploads for faster approval and better discoverability.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Added section */}
      <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Recently Added Resources</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/student/notes" className="flex items-center gap-1">
              Browse all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {recentNotes.map((note, i) => (
            <NoteCard key={note.id} note={note} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
