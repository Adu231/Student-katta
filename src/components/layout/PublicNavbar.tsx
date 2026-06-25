import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Moon, Sun, GraduationCap, ChevronDown } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { getCurrentUser, getDashboardPath } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const user = getCurrentUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const navLinks = [
    { label: 'Home',    href: '/' },
    { label: 'About',   href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={cn(
      'sticky top-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-white/95 dark:bg-card/95 backdrop-blur-md shadow-sm border-b border-border'
        : 'bg-white/80 dark:bg-card/80 backdrop-blur-sm border-b border-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Student<span className="text-primary">Katta</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <Link
                key={l.href}
                to={l.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  location.pathname === l.href
                    ? 'text-primary bg-primary/8'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Toggle theme"
            >
              <div className="relative w-4 h-4">
                <Sun className={cn('absolute inset-0 w-4 h-4 transition-all duration-300', theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90')} />
                <Moon className={cn('absolute inset-0 w-4 h-4 transition-all duration-300', theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90')} />
              </div>
            </button>

            {user ? (
              <Button size="sm" asChild className="animate-fade-in">
                <Link to={getDashboardPath(user.role)}>Dashboard</Link>
              </Button>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button size="sm" asChild className="relative overflow-hidden group/btn">
                  <Link to="/register">
                    <span className="relative z-10">Sign Up</span>
                    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                  </Link>
                </Button>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition-all duration-200"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <Menu className={cn('absolute inset-0 w-5 h-5 transition-all duration-300', open ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0')} />
                <X className={cn('absolute inset-0 w-5 h-5 transition-all duration-300', open ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90')} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        'md:hidden border-t border-border bg-card/98 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out',
        open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              to={l.href}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                'animate-fade-in-left',
                location.pathname === l.href
                  ? 'text-primary bg-primary/8'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {l.label}
            </Link>
          ))}
          {!user && (
            <div className="flex gap-2 pt-3 animate-fade-in" style={{ animationDelay: '180ms' }}>
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
