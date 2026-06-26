import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  GraduationCap, Target, Users, BookOpen, Shield,
  ArrowLeft, ArrowRight, Check, Award, Compass, Heart,
  Briefcase, Landmark, BookCopy, Sparkles
} from 'lucide-react';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getCurrentUser, getDashboardPath } from '@/lib/auth';

interface AboutBlogContent {
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  description: string;
  sections: { title: string; desc: string; list?: string[] }[];
  highlights: string[];
  renderMock: () => React.ReactNode;
}

export default function AboutDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const blogMap: Record<string, AboutBlogContent> = {
    'our-mission': {
      title: 'Our Mission',
      subtitle: 'To democratize access to quality academic resources through teacher-verified content.',
      badge: 'Purpose',
      icon: Target,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
      gradient: 'from-blue-600 to-indigo-600',
      description: 'At StudentKatta, we believe academic excellence should not be gated by fragmented information or inaccessible study resources. We aim to build a transparent, peer-collaborative ecosystem where verified knowledge flows freely.',
      sections: [
        {
          title: 'Bridging the Educational Gap',
          desc: 'Traditional resource sharing inside campuses relies heavily on scattered messaging groups and temporary links. We solve this by compiling a single, unified database that remains accessible to future student generations.',
        },
        {
          title: 'Core Values We Stand By',
          desc: 'Our platform is guided by these major pillars:',
          list: [
            'Integrity: Every uploaded resource is checked for authenticity.',
            'Inclusivity: Providing free, standardized access for all departments and courses.',
            'Collaborative Growth: Encouraging peer-to-peer mentoring and resource rating.',
            'Teacher Oversight: Guaranteeing academic standards through verified reviews.'
          ]
        }
      ],
      highlights: [
        'Organized files that never expire',
        'Teacher-reviewed and syllabus-compliant content',
        'Empowering student contributions',
        'Bridging resource inequality in education'
      ],
      renderMock: () => (
        <div className="sk-card p-6 bg-card border border-border shadow-lg space-y-4 max-w-sm mx-auto">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <Compass className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Mission Statement</h4>
              <p className="text-[10px] text-muted-foreground">StudentKatta Core Goal</p>
            </div>
          </div>
          <blockquote className="italic text-xs text-muted-foreground border-l-2 border-primary pl-3 py-1 text-left">
            "To foster student collaboration and ensure quality study guides are available to every single student, free of cost, forever."
          </blockquote>
          <div className="flex justify-between items-center text-[10px] bg-muted/40 p-2 rounded-lg">
            <span className="text-foreground font-semibold">Active Departments</span>
            <span className="text-blue-600 font-bold font-mono">12+ Connected</span>
          </div>
        </div>
      )
    },
    'who-we-serve': {
      title: 'Who We Serve',
      subtitle: 'Connecting students, educators, and administrators under one unified portal.',
      badge: 'Community',
      icon: Users,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
      gradient: 'from-emerald-600 to-teal-600',
      description: 'StudentKatta coordinates the academic needs of the entire college ecosystem. From students seeking quick exam study aids, to teachers uploading official lecture summaries, to admins auditing reports — everyone has a home here.',
      sections: [
        {
          title: 'Empowering Students',
          desc: 'Students can easily search for materials from previous semesters, save notes for offline reading, bookmark references, and submit high-quality resources they generated to help others.',
        },
        {
          title: 'Facilitating Educator Moderation',
          desc: 'Teachers gain a centralized hub to review student submissions, verify syllabus accuracy, reject spam, and upload official study guides or exam guides directly to their class dashboards.',
        },
        {
          title: 'Landmark Governance for Admins',
          desc: 'Administrators maintain the smooth running of the site, manage user privileges, manage department registries, and act on reported contents to keep the community safe and clean.'
        }
      ],
      highlights: [
        'Dedicated dashboards for Students, Teachers, and Admins',
        'Secure sign-on and role validation',
        'Audit logs for platform changes and approvals',
        'Streamlined department-level communication portals'
      ],
      renderMock: () => (
        <div className="sk-card p-6 bg-card border border-border shadow-lg space-y-4 max-w-sm mx-auto">
          <h4 className="text-xs font-bold text-foreground border-b pb-2 text-left">Roles Overview</h4>
          <div className="space-y-2">
            {[
              { role: 'Students', count: '4.6k+ Members', color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' },
              { role: 'Teachers', count: '120+ Reviewers', color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30' },
              { role: 'Administrators', count: 'System Controllers', color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' }
            ].map(r => (
              <div key={r.role} className="flex justify-between items-center p-2 rounded-lg border text-xs">
                <span className="font-semibold text-foreground">{r.role}</span>
                <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold', r.color)}>{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    'what-we-offer': {
      title: 'What We Offer',
      subtitle: 'A structured, comprehensive repository for notes, assignments, and study kits.',
      badge: 'Product',
      icon: BookOpen,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
      gradient: 'from-purple-600 to-indigo-600',
      description: 'We offer an organized, tags-indexed platform covering all study resources. Users can filter materials dynamically and locate precisely what they need in seconds.',
      sections: [
        {
          title: 'Varied Content Formats',
          desc: 'StudentKatta accepts and organizes several types of study documents:',
          list: [
            'Lecture Notes: In-depth slide summaries and handwriting transcriptions.',
            'Assignments: Prompt sheets, solved practicals, and practice guides.',
            'Question Papers: Archive of past university and internal tests.',
            'Syllabus & Manuals: Verified curriculum instructions and practical experiment guides.'
          ]
        },
        {
          title: 'Collaborative Study Features',
          desc: 'Beyond just file downloads, StudentKatta offers bookmark storage, real-time teacher announcements, user ratings, and dynamic reviews to gauge a resource\'s utility before downloading it.',
        }
      ],
      highlights: [
        'Granular tags filter by subject, branch, and semester',
        'Secure file upload and download utilities',
        'Institutional announcements broadcast dashboard',
        'Individual bookmark lists'
      ],
      renderMock: () => (
        <div className="sk-card p-6 bg-card border border-border shadow-lg space-y-3 max-w-sm mx-auto">
          <div className="flex justify-between items-center text-xs border-b pb-2">
            <span className="font-bold text-foreground">Content Categories</span>
            <span className="text-purple-600 font-semibold font-mono">1,200+ Resources</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-left">
            <div className="p-2 border rounded-lg bg-muted/40">
              <span className="font-semibold block text-foreground">Lecture Notes</span>
              <span className="text-muted-foreground text-[10px] font-mono">420+ Files</span>
            </div>
            <div className="p-2 border rounded-lg bg-muted/40">
              <span className="font-semibold block text-foreground">Question Papers</span>
              <span className="text-muted-foreground text-[10px] font-mono">234+ Files</span>
            </div>
            <div className="p-2 border rounded-lg bg-muted/40">
              <span className="font-semibold block text-foreground">Assignments</span>
              <span className="text-muted-foreground text-[10px] font-mono">185+ Files</span>
            </div>
            <div className="p-2 border rounded-lg bg-muted/40">
              <span className="font-semibold block text-foreground">Study Material</span>
              <span className="text-muted-foreground text-[10px] font-mono">170+ Files</span>
            </div>
          </div>
        </div>
      )
    },
    'quality-assurance': {
      title: 'Quality Assurance',
      subtitle: 'Ensuring student study guides are reliable, accurate, and structured.',
      badge: 'Standard',
      icon: Shield,
      color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20',
      gradient: 'from-teal-600 to-emerald-600',
      description: 'Unlike unmoderated chat channels or local drives where files are shared blindly, StudentKatta prioritizes accuracy. Every single note uploaded by a student is audited by verified educators before hitting the main repository.',
      sections: [
        {
          title: 'The Educator Review Loop',
          desc: 'Our review queue forwards new submissions directly to designated subject teachers. They inspect alignment with the current curriculum, correct labelling, clear image/text quality, and verify content correctness.',
        },
        {
          title: 'Preventing Academic Misconduct',
          desc: 'Our system enforces policies against spam, duplicates, and copyrighted exam resources, fostering a safe and constructive study tool for colleges.',
        }
      ],
      highlights: [
        'Mandatory teacher review for student uploads',
        'Syllabus alignment checks',
        'Direct change request comment systems',
        'Plagiarism and copyright prevention protocols'
      ],
      renderMock: () => (
        <div className="sk-card p-6 bg-card border border-border shadow-lg space-y-3 max-w-sm mx-auto">
          <div className="flex justify-between items-center text-xs border-b pb-2">
            <span className="font-bold text-foreground">Approval Check</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold dark:bg-emerald-900/30 dark:text-emerald-300">Verified</span>
          </div>
          <div className="space-y-2 text-[11px] text-left">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Syllabus Compliance:</span>
              <span className="text-emerald-600 font-bold font-mono">100% Match</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Readability Scan:</span>
              <span className="text-emerald-600 font-bold">Passed</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Reviewer:</span>
              <span className="text-foreground font-semibold">Dr. A. K. Sharma</span>
            </div>
          </div>
        </div>
      )
    }
  };

  const blog = slug ? blogMap[slug] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <PublicNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Blog Details Not Found</h2>
          <p className="text-muted-foreground mb-6">The details page you requested does not exist or has been relocated.</p>
          <Button asChild>
            <Link to="/about">Back to About Page</Link>
          </Button>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const TopicIcon = blog.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />

      <main className="flex-1">
        {/* ── Header Banner ───────────────────── */}
        <section className={cn('relative overflow-hidden py-16 text-white bg-gradient-to-br', blog.gradient)}>
          {/* Decorative background blurs */}
          <div className="absolute top-12 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-6 right-8 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" /> Back to About
              </Link>
            </div>
            <div className="mt-8 flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20 shrink-0">
                <TopicIcon className="w-8 h-8 text-yellow-300 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-yellow-300 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
                  {blog.badge}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {blog.title}
                </h1>
                <p className="text-base md:text-lg text-white/80 mt-2 max-w-3xl leading-relaxed">
                  {blog.subtitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content Body ────────────────────── */}
        <section className="py-12 md:py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Left Column: Detailed Content */}
              <div className="lg:col-span-2 space-y-8 text-left">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                    {blog.description}
                  </p>
                </div>

                <div className="space-y-8">
                  {blog.sections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {section.desc}
                      </p>
                      {section.list && (
                        <ul className="space-y-2 mt-3">
                          {section.list.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex gap-2.5 text-xs text-muted-foreground">
                              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Sticky Sidebar & Interaction */}
              <div className="space-y-6">
                <div className="sticky top-24 space-y-6">
                  {/* Interactive Visual Card */}
                  <div className="space-y-2 text-left">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Interactive Demonstration</span>
                    {blog.renderMock()}
                  </div>

                  {/* Highlights Card */}
                  <div className="sk-card p-6 bg-muted/40 space-y-4 text-left">
                    <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" /> Key Takeaways
                    </h4>
                    <ul className="space-y-2.5">
                      {blog.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Banner */}
                  <div className="sk-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-primary/20 space-y-4 text-center">
                    <h4 className="font-bold text-foreground text-sm">Experience StudentKatta</h4>
                    <p className="text-xs text-muted-foreground">
                      Access curriculum syllabus lists, verified test materials, and instant institutional broadcast notes.
                    </p>
                    {user ? (
                      <Button className="w-full bg-primary text-white hover:bg-blue-600 shadow-md transition-all duration-200" asChild>
                        <Link to={getDashboardPath(user.role)}>Go to Dashboard</Link>
                      </Button>
                    ) : (
                      <Button className="w-full bg-primary text-white hover:bg-blue-600 shadow-md transition-all duration-200" asChild>
                        <Link to="/register">Join the Community</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
