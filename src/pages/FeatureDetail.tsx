import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Upload, CheckCircle, Search, Bell, BookOpen, Shield,
  ArrowLeft, ArrowRight, FileText, ClipboardList, Star,
  Award, Check, AlertCircle, Sparkles, Folder, GraduationCap, ChevronRight
} from 'lucide-react';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getCurrentUser, getDashboardPath } from '@/lib/auth';

interface FeatureContent {
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  description: string;
  highlights: string[];
  howItWorks: { step: string; title: string; desc: string }[];
  renderMock: () => React.ReactNode;
}

export default function FeatureDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const user = getCurrentUser();

  // Features data map
  const featureMap: Record<string, FeatureContent> = {
    'content-upload': {
      title: 'Easy Content Upload',
      subtitle: 'Share study notes, question papers, and assignments effortlessly in under a minute.',
      badge: 'Sharing',
      icon: Upload,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
      gradient: 'from-blue-600 to-indigo-600',
      description: 'StudentKatta makes academic resource sharing simple. Whether you are a student sharing handwritten lecture notes or a teacher uploading official syllabus documents, our drag-and-drop uploader categorizes and tags your content automatically for maximum reach.',
      highlights: [
        'Supports PDF, DOCX, PPTX, TXT, and high-quality images',
        'Direct classification by Department, Subject, and Semester',
        'Bulk file uploading with progress tracking indicators',
        'Personal uploads management dashboard for tracking reviews'
      ],
      howItWorks: [
        { step: '01', title: 'Select File & Category', desc: 'Drag your document into the uploader and select the target subject and semester.' },
        { step: '02', title: 'Add Descriptive Tags', desc: 'Add keywords to help other students find your notes instantly in search results.' },
        { step: '03', title: 'Submit for Moderation', desc: 'Our smart approval workflow forwards your content to department teachers for verification.' }
      ],
      renderMock: () => (
        <div className="sk-card p-6 bg-card border border-border shadow-lg space-y-4 max-w-sm mx-auto">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">New Upload</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded">Pending Review</span>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase">File Name</label>
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-muted/40 mt-1">
                <FileText className="w-5 h-5 text-blue-500" />
                <span className="text-xs font-medium truncate text-foreground">Computer_Networks_Unit3_Notes.pdf</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Department</label>
                <div className="text-xs font-semibold mt-0.5 text-foreground">Computer Science</div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Semester</label>
                <div className="text-xs font-semibold mt-0.5 text-foreground">Semester 5</div>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Tags</label>
              <div className="flex gap-1 flex-wrap mt-1">
                <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-[10px] rounded text-blue-700 dark:text-blue-300">#CN</span>
                <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-[10px] rounded text-blue-700 dark:text-blue-300">#RoutingAlgorithms</span>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-[10px] font-bold mb-1">
                <span className="text-emerald-500">Upload Complete</span>
                <span>100%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-50 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      )
    },
    'approval-workflow': {
      title: 'Quality Approval Workflow',
      subtitle: 'Every resource is reviewed and approved by verified educators before publication.',
      badge: 'Moderation',
      icon: CheckCircle,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
      gradient: 'from-emerald-600 to-teal-600',
      description: 'To maintain academic integrity and resource quality, StudentKatta routes every submission through a teacher review queue. This checks that all materials are free from plagiarism, are syllabus-compliant, and contain accurate learning contents before students can view or download them.',
      highlights: [
        'Role-based review queues for verified teachers and admin moderators',
        'Direct feedback loop for student uploaders with change requests',
        'Spam-prevention systems ensuring high-quality search results',
        'Audit logs showing reviewer name, timestamp, and review status'
      ],
      howItWorks: [
        { step: '01', title: 'Content Submission', desc: 'Student uploads material, which is placed in the department-specific pending queue.' },
        { step: '02', title: 'Teacher Evaluation', desc: 'Faculty members verify accuracy, formatting, syllabus alignment, and clear visibility.' },
        { step: '03', title: 'Instant Publishing', desc: 'Once approved, content goes live immediately and notifications are dispatched.' }
      ],
      renderMock: () => (
        <div className="sk-card p-6 bg-card border border-border shadow-lg space-y-4 max-w-sm mx-auto">
          <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block">Teacher Approval Board</span>
          <div className="space-y-3 p-3 bg-muted/40 rounded-xl border">
            <h4 className="text-xs font-bold text-foreground">Advanced DBMS Assignment 2</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">Uploaded by Rohan Gupta. Reviewing syllabus alignment (CS Semester 6)...</p>
            <div className="flex gap-2 pt-2 border-t">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-1 h-8 flex-1">
                <Check className="w-3.5 h-3.5 mr-1" /> Approve
              </Button>
              <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-950 dark:hover:bg-red-950/20 text-xs py-1 h-8 flex-1">
                <AlertCircle className="w-3.5 h-3.5 mr-1" /> Reject
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <Award className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Approved files instantly appear in student repositories.</span>
          </div>
        </div>
      )
    },
    'search-filter': {
      title: 'Advanced Search & Filter',
      subtitle: 'Locate relevant learning materials in seconds with context-driven filtering.',
      badge: 'Discovery',
      icon: Search,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
      gradient: 'from-purple-600 to-indigo-600',
      description: 'No more digging through chaotic chats or emails. StudentKatta provides query-matched filters. Instantly find documents by department, specific subject course, academic semester, file format, upload author, or content type.',
      highlights: [
        'Full-text query search matching titles, descriptions, and subject tags',
        'Granular filters including Department, Semester, and Material Type',
        'One-click category pill navigation on the user dashboard',
        'Instantly clear active filters to start fresh searches'
      ],
      howItWorks: [
        { step: '01', title: 'Enter Search Query', desc: 'Type subjects, topics, or teacher names into the main dashboard search bar.' },
        { step: '02', title: 'Select Filter Criteria', desc: 'Use dropdowns to narrow results by your department, semester, or document type.' },
        { step: '03', title: 'Download Resource', desc: 'Click directly on the matching card to view notes, rate them, or download.' }
      ],
      renderMock: () => (
        <div className="sk-card p-6 bg-card border border-border shadow-lg space-y-4 max-w-sm mx-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground animate-pulse" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
              defaultValue="Data Structures"
              readOnly
            />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Active Filters</span>
            <div className="flex gap-1.5 flex-wrap">
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-[10px] rounded-full text-purple-700 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                Computer Science
              </span>
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-[10px] rounded-full text-purple-700 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                Semester 3
              </span>
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-[10px] rounded-full text-purple-700 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                Notes
              </span>
            </div>
          </div>
          <div className="border-t pt-3 flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Matches found: <b>8 files</b></span>
            <span className="text-primary font-semibold hover:underline cursor-pointer">Clear Filters</span>
          </div>
        </div>
      )
    },
    'announcement-center': {
      title: 'Announcement Center',
      subtitle: 'Receive verified announcements, timetables, and placement notifications directly.',
      badge: 'Information',
      icon: Bell,
      color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20',
      gradient: 'from-orange-600 to-red-600',
      description: 'Faculty members and campus administrators can broadcast urgent alerts, exam timetables, placement opportunities, and holiday notices. The Announcement Center categorizes posts with prominence levels, making sure critical details are never lost in group chats.',
      highlights: [
        'Urgent announcements pinned to the student dashboard top feed',
        'Filterable announcement boards sorted by Placement, Exam, or Events',
        'Restricted posting rights (only verified Teachers and Admins)',
        'Rich styled description feeds supporting links and attachments'
      ],
      howItWorks: [
        { step: '01', title: 'Faculty Broadcasts', desc: 'A teacher drafts an announcement and sets the priority level (General, Urgent, etc.).' },
        { step: '02', title: 'Instant Feed Update', desc: 'The alert instantly propagates to the student dashboard announcement feed.' },
        { step: '03', title: 'Rich Interaction', desc: 'Students view the announcement, read details, and download attachments.' }
      ],
      renderMock: () => (
        <div className="sk-card p-6 bg-card border border-border shadow-lg space-y-3.5 max-w-sm mx-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">Announcements</span>
            <Sparkles className="w-4 h-4 text-orange-500" />
          </div>
          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 p-2.5 rounded-r-lg space-y-1">
            <div className="flex items-center justify-between">
              <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 text-[9px] font-bold text-red-700 dark:text-red-300 rounded uppercase">Urgent</span>
              <span className="text-[10px] text-muted-foreground">10 mins ago</span>
            </div>
            <h5 className="text-xs font-bold text-foreground">Mid-Term Exam Schedule released</h5>
            <p className="text-[10px] text-muted-foreground line-clamp-2">The mid-term exams for all semesters start next Monday. Please download the timetable...</p>
          </div>
          <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-r-lg space-y-1">
            <div className="flex items-center justify-between">
              <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-[9px] font-bold text-blue-700 dark:text-blue-300 rounded uppercase">Placement</span>
              <span className="text-[10px] text-muted-foreground">2 hours ago</span>
            </div>
            <h5 className="text-xs font-bold text-foreground">Google Recruiting Drive Registration</h5>
            <p className="text-[10px] text-muted-foreground line-clamp-2">Register on the placement portal by Friday. Eligibility: CS/IT students with 7.5+ CGPA.</p>
          </div>
        </div>
      )
    },
    'centralized-repository': {
      title: 'Centralized Repository',
      subtitle: 'A beautifully structured repository separating notes, syllabus, and manuals.',
      badge: 'Organization',
      icon: BookOpen,
      color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20',
      gradient: 'from-teal-600 to-emerald-600',
      description: 'We believe learning is easier when materials are logically arranged. The Centralized Repository organizes academic files under clear hierarchies: department courses, specific subject semesters, and resource categories (practical manuals, previous exams, lecture notes).',
      highlights: [
        'Central database structured dynamically per department syllabus',
        'Instant bookmarking for quick access to your favorite files',
        'File size, extension, and download counts shown transparently',
        'Fully responsive layout optimized for mobile and desktop screens'
      ],
      howItWorks: [
        { step: '01', title: 'Select Department', desc: 'Browse the repository under your specific academic department catalogue.' },
        { step: '02', title: 'Navigate Semester', desc: 'Access directories matching your current academic year semester.' },
        { step: '03', title: 'Open Resource type', desc: 'Browse folders divided into notes, question papers, and manuals.' }
      ],
      renderMock: () => (
        <div className="sk-card p-6 bg-card border border-border shadow-lg space-y-4 max-w-sm mx-auto">
          <div className="flex items-center gap-2 border-b pb-3 text-[11px] font-semibold text-foreground">
            <Folder className="w-4 h-4 text-teal-500" />
            <span>CS</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span>Sem 5</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-teal-500">Notes</span>
          </div>
          <div className="space-y-2">
            {[
              { title: 'Computer Networks - Unit 1', size: '2.4 MB', format: 'PDF', icon: FileText, color: 'text-blue-500' },
              { title: 'Software Engineering Guide', size: '1.8 MB', format: 'PDF', icon: FileText, color: 'text-blue-500' },
              { title: 'Theory of Computation syllabus', size: '0.8 MB', format: 'PDF', icon: FileText, color: 'text-blue-500' }
            ].map(item => (
              <div key={item.title} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/40 transition-colors border border-transparent hover:border-border cursor-pointer">
                <div className="flex items-center gap-2.5 min-w-0">
                  <item.icon className={cn('w-4 h-4 shrink-0', item.color)} />
                  <span className="text-xs font-medium text-foreground truncate">{item.title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-muted-foreground">{item.size}</span>
                  <span className="px-1 py-0.5 bg-muted text-[9px] font-bold text-muted-foreground rounded uppercase">{item.format}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    'role-access': {
      title: 'Role-Based Access Control',
      subtitle: 'Dedicated dashboards customized for Student, Teacher, and Admin portals.',
      badge: 'Security',
      icon: Shield,
      color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
      gradient: 'from-red-600 to-rose-600',
      description: 'StudentKatta uses a secure, role-based authorization system to separate permissions. Students enjoy browsing, downloading, and bookmarking; Teachers review submitted files, verify materials, and broadcast announcements; Admins govern accounts, verify faculty, and handle departments.',
      highlights: [
        'Secure authorization system separating permissions',
        'Custom student, teacher, and admin layout structures',
        'Secure email signup requiring admin validation for teachers',
        'Restricted actions ensuring only verified uploads enter search indexes'
      ],
      howItWorks: [
        { step: '01', title: 'Register Account', desc: 'Sign up and select your role (Students are pre-verified, Teachers enter details).' },
        { step: '02', title: 'Admin Verification', desc: 'Faculty profiles undergo administrative verification for authenticity.' },
        { step: '03', title: 'Role Portal Access', desc: 'Log in to access your customized layout, reports, list feeds, and tools.' }
      ],
      renderMock: () => (
        <div className="sk-card p-6 bg-card border border-border shadow-lg space-y-4 max-w-sm mx-auto">
          <span className="text-xs font-bold text-foreground block">Workspace Control Panel</span>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 border rounded-xl bg-blue-500/10 border-blue-500/20">
              <GraduationCap className="w-5 h-5 mx-auto text-blue-500 mb-1" />
              <span className="text-[10px] font-bold text-blue-500 block">Student</span>
              <span className="text-[8px] text-muted-foreground block mt-0.5">Read & Share</span>
            </div>
            <div className="p-2 border rounded-xl bg-emerald-500/10 border-emerald-500/20">
              <CheckCircle className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
              <span className="text-[10px] font-bold text-emerald-500 block">Teacher</span>
              <span className="text-[8px] text-muted-foreground block mt-0.5">Verify & Post</span>
            </div>
            <div className="p-2 border rounded-xl bg-orange-500/10 border-orange-500/20">
              <Shield className="w-5 h-5 mx-auto text-orange-500 mb-1" />
              <span className="text-[10px] font-bold text-orange-500 block">Admin</span>
              <span className="text-[8px] text-muted-foreground block mt-0.5">Moderate All</span>
            </div>
          </div>
          <div className="p-2 bg-muted/40 rounded-lg text-[10px] text-muted-foreground border">
            🔒 Permission enforcement checks happen on both UI components and API controllers.
          </div>
        </div>
      )
    }
  };

  const currentFeature = slug ? featureMap[slug] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (slug && !featureMap[slug]) {
      navigate('/not-found', { replace: true });
    }
  }, [slug, navigate]);

  if (!currentFeature) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />

      {/* ── Header ─────────────────────────────── */}
      <section className={cn('relative overflow-hidden text-white py-20 lg:py-24 bg-gradient-to-br', currentFeature.gradient)}>
        {/* Orbs */}
        <div className="absolute top-8 left-8 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-8 right-12 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in-down">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            {currentFeature.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 animate-fade-in-up">
            {currentFeature.title}
          </h1>

          <p className="text-lg text-white/90 max-w-2xl leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {currentFeature.subtitle}
          </p>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold h-10 px-4 py-2 border border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </section>

      {/* ── Main Details Section ────────────────── */}
      <section className="py-16 lg:py-20 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-10 animate-fade-in-left">
              <div className="space-y-4">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Feature Overview</span>
                <h2 className="text-2xl font-bold text-foreground">How it makes learning easier</h2>
                <p className="text-muted-foreground leading-relaxed">{currentFeature.description}</p>
              </div>

              {/* Highlights List */}
              <div className="space-y-4">
                <h3 className="font-bold text-foreground">Key Highlights & Capabilities</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentFeature.highlights.map(h => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How it works steps */}
              <div className="space-y-5 pt-4 border-t">
                <h3 className="font-bold text-foreground">Detailed Workflow Steps</h3>
                <div className="space-y-4">
                  {currentFeature.howItWorks.map(step => (
                    <div key={step.step} className="flex items-start gap-4 p-4 rounded-xl border bg-muted/20 hover:bg-muted/40 transition-colors duration-200">
                      <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center shrink-0">
                        {step.step}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-foreground">{step.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Mock Column */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 animate-fade-in-right">
              <div className="text-center lg:text-left mb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Interactive Mock Preview</span>
                <p className="text-xs text-muted-foreground mt-0.5">See how this feature looks live in the StudentKatta portal</p>
              </div>

              {/* Render Mock Illustration */}
              <div className="p-8 rounded-2xl bg-muted/30 border border-dashed border-border/80 flex items-center justify-center min-h-[320px] shadow-inner relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-50 pointer-events-none" />
                <div className="relative w-full transition-transform duration-300 hover:scale-[1.02]">
                  {currentFeature.renderMock()}
                </div>
              </div>

              {/* CTA card */}
              <div className="sk-card p-6 bg-gradient-to-br from-card to-muted/20 border-primary/20 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-foreground">Ready to try {currentFeature.title}?</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Sign up to access notes, browse resources, and join your department hub.</p>
                </div>
                <div className="flex gap-3">
                  {user ? (
                    <Button className="flex-1" onClick={() => navigate(getDashboardPath(user.role))}>
                      Go to Dashboard <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  ) : (
                    <>
                      <Button className="flex-1" onClick={() => navigate('/register')}>
                        Register Free <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => navigate('/login')}>
                        Log In
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
