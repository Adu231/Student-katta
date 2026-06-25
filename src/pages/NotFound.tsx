import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { GraduationCap, ArrowLeft, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const location = useLocation();
  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-hero-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/5 rounded-full blur-3xl animate-hero-blob" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative z-10 animate-scale-in">
        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 mx-auto animate-float">
          <GraduationCap className="w-12 h-12 text-primary" />
        </div>

        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 animate-fade-in-down">Error 404</p>
        <h1 className="text-8xl font-black text-foreground mb-2 leading-none animate-fade-in-up">
          <span className="text-primary">4</span>0<span className="text-primary">4</span>
        </h1>
        <h2 className="text-2xl font-bold text-foreground mb-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-wrap gap-3 justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <Button asChild className="group">
            <Link to="/">
              <Home className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-y-0.5" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
          Tried to access: <code className="bg-muted px-2 py-0.5 rounded text-foreground">{location.pathname}</code>
        </p>
      </div>
    </div>
  );
}
