import { GraduationCap, Target, Users, BookOpen, Shield } from 'lucide-react';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="text-center mb-14">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>About StudentKatta</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            StudentKatta is a centralized academic content sharing, learning resource management, and communication platform designed for the modern educational ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To democratize access to quality academic resources by providing a structured, teacher-verified platform where students can share and access study materials seamlessly.' },
            { icon: Users, title: 'Who We Serve', desc: 'StudentKatta is built for students seeking quality study materials, teachers managing academic content, and administrators overseeing institutional governance.' },
            { icon: BookOpen, title: 'What We Offer', desc: 'From lecture notes to question papers, syllabus to assignments — our platform covers every academic need with an organized repository system.' },
            { icon: Shield, title: 'Quality Assurance', desc: 'Every piece of content goes through a structured approval workflow ensuring only verified, accurate, and valuable academic resources reach students.' },
          ].map(item => (
            <div key={item.title} className="sk-card p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="sk-card p-8 bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-900/10 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">The StudentKatta Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>StudentKatta was conceived from a common academic struggle — the difficulty students face in finding reliable, organized, and quality-checked study materials. Traditional methods of resource sharing through WhatsApp groups and email chains were chaotic, unverified, and inefficient.</p>
            <p>We envisioned a platform that brings the structure of institutional learning management systems to everyday academic resource sharing. A platform where teachers could maintain oversight, students could contribute freely, and administrators could ensure platform integrity.</p>
            <p>Today, StudentKatta serves thousands of students and hundreds of teachers across multiple departments, bringing order and quality to academic resource management.</p>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
