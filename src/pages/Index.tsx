import { Link } from 'react-router-dom';
import {
  BookOpen, Upload, CheckCircle, Users, Download, Star, ArrowRight,
  GraduationCap, FileText, ClipboardList, Bell, Search, Shield, Zap,
  ChevronRight, Award, Globe
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import NoteCard from '@/components/features/NoteCard';
import AnnouncementCard from '@/components/features/AnnouncementCard';
import { MOCK_NOTES, MOCK_ANNOUNCEMENTS, PLATFORM_STATS } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const approvedNotes = MOCK_NOTES.filter(n => n.status === 'approved').slice(0, 4);
const recentAnnouncements = MOCK_ANNOUNCEMENTS.slice(0, 3);

const features = [
  { icon: Upload,       title: 'Easy Content Upload',        desc: 'Upload notes, assignments, question papers & study materials with ease.',                              color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' },
  { icon: CheckCircle,  title: 'Quality Approval Workflow',  desc: 'All content reviewed and approved by teachers or admins before publishing.',                          color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: Search,       title: 'Advanced Search & Filter',   desc: 'Find resources by subject, department, semester, type and more.',                                     color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' },
  { icon: Bell,         title: 'Announcement Center',        desc: 'Stay updated with exam schedules, events, placements and notices.',                                   color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20' },
  { icon: BookOpen,     title: 'Centralized Repository',     desc: 'All academic resources organized by department, subject and semester.',                               color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20' },
  { icon: Shield,       title: 'Role-Based Access',          desc: 'Students, teachers and admins each have dedicated access controls.',                                  color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20' },
];

const categories = [
  { label: 'Lecture Notes',     count: 420, icon: FileText,    color: 'bg-blue-500',   hoverBg: 'hover:bg-blue-500' },
  { label: 'Assignments',       count: 185, icon: ClipboardList,color: 'bg-orange-500', hoverBg: 'hover:bg-orange-500' },
  { label: 'Question Papers',   count: 234, icon: BookOpen,    color: 'bg-purple-500', hoverBg: 'hover:bg-purple-500' },
  { label: 'Syllabus',          count: 96,  icon: CheckCircle, color: 'bg-emerald-500',hoverBg: 'hover:bg-emerald-500' },
  { label: 'Practical Manuals', count: 143, icon: Zap,         color: 'bg-teal-500',   hoverBg: 'hover:bg-teal-500' },
  { label: 'Study Materials',   count: 170, icon: Star,        color: 'bg-indigo-500', hoverBg: 'hover:bg-indigo-500' },
];

const steps = [
  { step: '01', title: 'Register & Verify',   desc: 'Create your account as a student, teacher, or admin with secure email registration.' },
  { step: '02', title: 'Upload Resources',    desc: 'Upload your notes, assignments, question papers or any academic content easily.' },
  { step: '03', title: 'Review & Approval',  desc: 'Content goes through teacher or admin review for quality assurance before publishing.' },
  { step: '04', title: 'Access & Download',  desc: 'Browse, search, bookmark, and download approved academic resources anytime.' },
];

const roles = [
  { role: 'Student', accent: 'border-t-blue-500', badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', icon: GraduationCap, features: ['Upload Notes & Assignments', 'Browse & Download Resources', 'Bookmark Favourites', 'Track Approval Status', 'Rate & Review Content'] },
  { role: 'Teacher', accent: 'border-t-emerald-500', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300', icon: CheckCircle, features: ['Upload Official Content', 'Review Student Uploads', 'Approve or Reject Content', 'Publish Announcements', 'View Analytics'] },
  { role: 'Admin',   accent: 'border-t-orange-500',  badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',  icon: Shield,      features: ['Manage All Users', 'Verify Teachers', 'Approve All Content', 'Manage Departments', 'Platform Governance'] },
];

// Animated counter
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1500;
        const start = performance.now();
        const animate = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Index() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />

      {/* ── Hero ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white min-h-[520px] flex items-center">
        {/* Animated orbs */}
        <div className="absolute top-8 left-8 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-hero-blob" />
        <div className="absolute bottom-8 right-12 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-hero-blob" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/5 rounded-full blur-2xl animate-hero-blob" style={{ animationDelay: '-2s' }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
            <div className={cn(
              'inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 transition-all duration-700',
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              Academic Resource Management Platform
            </div>

            <h1 className={cn(
              'text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-700 delay-100',
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}>
              Learn Together,<br />
              <span className="text-yellow-300">Grow Together</span>
            </h1>

            <p className={cn(
              'text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed transition-all duration-700 delay-200',
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}>
              StudentKatta is a centralized platform where students and teachers collaborate, share academic resources, and access quality-reviewed study materials through a structured approval system.
            </p>

            <div className={cn(
              'flex flex-wrap gap-3 transition-all duration-700 delay-300',
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}>
              <Button size="lg" className="bg-white text-primary hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className={cn(
              'mt-10 flex flex-wrap items-center gap-6 transition-all duration-700 delay-400',
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              {[
                { icon: Users, label: '4,600+ Students' },
                { icon: Award, label: 'Approval Verified' },
                { icon: Globe, label: 'All Departments' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-blue-200">
                  <Icon className="w-4 h-4 text-yellow-300" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── Stats bar ─────────────────────────── */}
      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center stagger-children">
            {[
              { label: 'Study Resources', value: PLATFORM_STATS.totalNotes,     icon: BookOpen,     suffix: '+' },
              { label: 'Active Users',    value: PLATFORM_STATS.totalUsers,     icon: Users,        suffix: '+' },
              { label: 'Total Downloads', value: PLATFORM_STATS.totalDownloads, icon: Download,     suffix: '+' },
              { label: 'Departments',     value: PLATFORM_STATS.totalDepartments, icon: GraduationCap, suffix: '' },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-col items-center gap-2 group animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <s.icon className="w-7 h-7 text-primary transition-colors duration-300 group-hover:text-white" />
                </div>
                <p className="text-3xl font-bold text-foreground">
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">Platform Features</span>
            <h2 className="text-3xl font-bold text-foreground mb-4">Everything You Need to Excel</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A complete academic ecosystem designed for modern education — from content sharing to quality moderation.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="sk-card sk-card-shine p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-3">Browse by Category</h2>
            <p className="text-muted-foreground">Organized academic resources across all content types.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
            {categories.map((c, i) => (
              <Link
                key={c.label}
                to="/login"
                className="sk-card p-5 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group animate-fade-in-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className={`w-12 h-12 ${c.color} rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg`}>
                  <c.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors duration-200">{c.label}</p>
                <p className="text-xs text-muted-foreground">{c.count}+ files</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ─────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">How StudentKatta Works</h2>
            <p className="text-muted-foreground">Simple, structured, and quality-assured academic resource management.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-10 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-0.5 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30 z-0" />

            {steps.map((s, i) => (
              <div key={s.step} className="relative z-10 animate-fade-in-up group" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="sk-card p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:bg-blue-600">
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Notes ─────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Latest Notes</h2>
              <p className="text-muted-foreground mt-1">Recently approved academic resources</p>
            </div>
            <Button variant="outline" asChild className="group">
              <Link to="/login" className="flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
            {approvedNotes.map((note, i) => (
              <NoteCard key={note.id} note={note} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Announcements Preview ─────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Latest Announcements</h2>
              <p className="text-muted-foreground mt-1">Stay updated with institutional notices</p>
            </div>
            <Button variant="outline" asChild className="group">
              <Link to="/login" className="flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 stagger-children">
            {recentAnnouncements.map((a, i) => (
              <AnnouncementCard key={a.id} announcement={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles ────────────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">Built for Every Role</h2>
            <p className="text-muted-foreground">Dedicated experiences for students, teachers, and administrators.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {roles.map((r, i) => (
              <div key={r.role} className={`sk-card p-6 border-t-4 ${r.accent} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up`} style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <r.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${r.badge}`}>{r.role}</span>
                    <h3 className="font-bold text-foreground mt-0.5">{r.role} Portal</h3>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {r.features.map((f, fi) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground" style={{ transitionDelay: `${fi * 30}ms` }}>
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-border">
                  <Link to="/register" className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all duration-200">
                    Get started <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-blue-100 text-lg mb-8">Join thousands of students and teachers already using StudentKatta.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200" asChild>
              <Link to="/register">Create Free Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
