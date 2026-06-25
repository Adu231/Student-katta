import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const footerLinks = {
  Platform: [['Home', '/'], ['About', '/about'], ['Contact', '/contact'], ['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms']],
  Access: [['Student Login', '/login'], ['Teacher Login', '/login'], ['Admin Login', '/login'], ['Register', '/register']],
};

export default function PublicFooter() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4 group cursor-default">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Student<span className="text-primary">Katta</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-5">
              A centralized academic content sharing platform for students, teachers, and educational institutions. Learn together, grow together.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="mailto:support@studentkatta.edu" className="flex items-center gap-2 hover:text-foreground transition-colors duration-200 group/link">
                <Mail className="w-4 h-4 transition-transform duration-200 group-hover/link:scale-110" />
                <span>support@studentkatta.edu</span>
              </a>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-sm text-foreground mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-all duration-200"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© 2026 StudentKatta. All rights reserved.</p>
          <p>Built for academic excellence.</p>
        </div>
      </div>
    </footer>
  );
}
