import { Users, FileText, CheckCircle, Flag, Clock, ShieldCheck, Megaphone, Building2, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/features/StatsCard';
import AnnouncementCard from '@/components/features/AnnouncementCard';
import { MOCK_NOTES, MOCK_ANNOUNCEMENTS, MOCK_USERS, PLATFORM_STATS, MOCK_REPORTS } from '@/lib/mockData';
import { useAuth } from '@/hooks/useAuth';

const pending = MOCK_NOTES.filter(n => n.status === 'pending');
const unverifiedTeachers = MOCK_USERS.filter(u => u.role === 'teacher' && !u.verified);
const recentAnnouncements = MOCK_ANNOUNCEMENTS.slice(0, 2);
const openReports = MOCK_REPORTS.filter(r => r.status === 'pending');

const quickActions = [
  { label: 'Users',         icon: Users,       href: '/admin/users',                  color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30' },
  { label: 'Verifications', icon: ShieldCheck, href: '/admin/teacher-verifications',  color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30',  badge: unverifiedTeachers.length },
  { label: 'Approvals',     icon: CheckCircle, href: '/admin/content-approvals',      color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30', badge: pending.length },
  { label: 'Reports',       icon: Flag,        href: '/admin/reports',                color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30',  badge: openReports.length },
  { label: 'Announcements', icon: Megaphone,   href: '/admin/announcements',          color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30' },
  { label: 'Departments',   icon: Building2,   href: '/admin/departments',            color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/30' },
];

const platformMetrics = [
  { label: 'Total Downloads',  value: PLATFORM_STATS.totalDownloads, color: 'text-blue-600 dark:text-blue-400',   bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { label: 'Approved Content', value: PLATFORM_STATS.approvedContent, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { label: 'Pending Review',   value: PLATFORM_STATS.pendingReview,  color: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { label: 'Departments',      value: PLATFORM_STATS.totalDepartments, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { label: 'Verified Teachers',value: MOCK_USERS.filter(u => u.role === 'teacher' && u.verified).length, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/20' },
  { label: 'Reports Pending',  value: openReports.length, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-in-down">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Platform overview and governance controls</p>
        </div>
        <Button size="sm" asChild className="hidden sm:flex">
          <Link to="/admin/announcements">
            <Megaphone className="w-4 h-4 mr-2" /> Post Notice
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <StatsCard title="Total Users"       value={PLATFORM_STATS.totalUsers}    subtitle="Students & teachers"  icon={Users}      color="blue"   trend={{ value: '12 this week', positive: true }} index={0} />
        <StatsCard title="Total Resources"   value={PLATFORM_STATS.totalNotes}    subtitle="In repository"        icon={FileText}   color="green"  index={1} />
        <StatsCard title="Pending Approvals" value={pending.length}               subtitle="Needs review"         icon={Clock}      color="orange" index={2} />
        <StatsCard title="Open Reports"      value={openReports.length}           subtitle="Needs resolution"     icon={Flag}       color="red"    index={3} />
      </div>

      {/* Quick Actions */}
      <div className="sk-card p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Administrative Actions</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 stagger-children">
          {quickActions.map((a, i) => (
            <Link
              key={a.label}
              to={a.href}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-250 hover:-translate-y-1 hover:shadow-md active:translate-y-0 text-center group ${a.color}`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {'badge' in a && (a.badge as number) > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-bold animate-scale-in">
                  {a.badge}
                </span>
              )}
              <div className="w-9 h-9 rounded-xl bg-white/60 dark:bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <a.icon className="w-4.5 h-4.5" />
              </div>
              <span className="text-xs font-semibold leading-tight">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform metrics + recent pending */}
        <div className="lg:col-span-2 space-y-4 animate-fade-in-left" style={{ animationDelay: '250ms' }}>
          <div className="sk-card p-5">
            <h2 className="text-base font-semibold text-foreground mb-4">Platform Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 stagger-children">
              {platformMetrics.map((m, i) => (
                <div key={m.label} className={`p-4 rounded-xl ${m.bg} animate-fade-in-up`} style={{ animationDelay: `${i * 60}ms` }}>
                  <p className={`text-2xl font-bold ${m.color}`}>{m.value.toLocaleString()}</p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="sk-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">Recent Pending Content</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/content-approvals" className="flex items-center gap-1">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
            <div className="space-y-2.5 stagger-children">
              {pending.slice(0, 4).map((n, i) => (
                <div
                  key={n.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-all duration-200 animate-fade-in-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.uploadedBy} · {n.type}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs shrink-0 ml-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200" asChild>
                    <Link to="/admin/content-approvals">Review</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4 animate-fade-in-right" style={{ animationDelay: '300ms' }}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-foreground">Announcements</h2>
            </div>
            {recentAnnouncements.map((a, i) => (
              <div key={a.id} className="mb-3">
                <AnnouncementCard announcement={a} compact index={i} />
              </div>
            ))}
          </div>

          {unverifiedTeachers.length > 0 && (
            <div className="sk-card p-4 border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-900/10 animate-scale-in">
              <div className="flex items-start gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Teacher Verifications</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {unverifiedTeachers.length} teacher{unverifiedTeachers.length !== 1 ? 's' : ''} awaiting verification
                  </p>
                </div>
              </div>
              <Button size="sm" className="w-full" asChild>
                <Link to="/admin/teacher-verifications">Review Requests</Link>
              </Button>
            </div>
          )}

          <div className="sk-card p-4 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-900/20 border-primary/20">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-primary mb-1">Platform Health</p>
                <p className="text-xs text-muted-foreground">All systems operational. 4 items need your attention today.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
