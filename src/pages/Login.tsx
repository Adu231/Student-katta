import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, ArrowRight, CheckCircle, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { login, getDashboardPath } from '@/lib/auth';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const demoLogins = [
  { label: 'Student', email: 'student@sk.edu', password: 'student123', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30', dot: 'bg-blue-500' },
  { label: 'Teacher', email: 'teacher@sk.edu', password: 'teacher123', color: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/30', dot: 'bg-emerald-500' },
  { label: 'Admin',   email: 'admin@sk.edu',   password: 'admin123',   color: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900/30', dot: 'bg-orange-500' },
];

const features = ['1,248+ Study Resources', '4,632+ Active Users', 'Approval-verified Content', 'Role-based Secure Access'];

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { theme, toggleTheme }  = useTheme();

  const handleDemoClick = (demo: typeof demoLogins[0]) => {
    setActiveDemo(demo.label);
    setEmail(demo.email);
    setPassword(demo.password);
    toast.info(`Demo credentials for ${demo.label} filled in`, { duration: 2000 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success && result.user) {
        toast.success(`Welcome back, ${result.user.name}!`);
        const redirect = searchParams.get('redirect');
        const type = searchParams.get('type');
        if (redirect) {
          navigate(decodeURIComponent(redirect));
        } else if (result.user.role === 'student' && type) {
          navigate(`/student/notes?type=${type}`);
        } else {
          navigate(getDashboardPath(result.user.role));
        }
      } else {
        toast.error(result.error || 'Login failed. Please check your credentials.');
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-blue-700 to-blue-900 items-center justify-center p-12 relative overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-12 left-12 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-hero-blob" />
        <div className="absolute bottom-12 right-8 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-hero-blob" style={{ animationDelay: '-4s' }} />

        <div className="text-white max-w-md relative z-10 animate-fade-in-left">
          <Link to="/" className="flex items-center gap-3 mb-10 group">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <GraduationCap className="w-7 h-7" />
            </div>
            <span className="text-2xl font-bold transition-colors duration-200 group-hover:text-yellow-300" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>StudentKatta</span>
          </Link>

          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Your Academic Hub<br />
            <span className="text-yellow-300">Awaits You</span>
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-10">Access thousands of curated study materials, notes, and resources shared by students and teachers.</p>

          <div className="space-y-3.5 stagger-children">
            {features.map((f, i) => (
              <div key={f} className="flex items-center gap-3 animate-fade-in-left" style={{ animationDelay: `${i * 80 + 200}ms` }}>
                <div className="w-6 h-6 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-blue-100 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 lg:p-6">
          <Link to="/" className="flex items-center gap-2 lg:hidden group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">StudentKatta</span>
          </Link>
          <div className="ml-auto">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <div className="relative w-4 h-4">
                <Sun className={cn('absolute inset-0 w-4 h-4 transition-all duration-300', theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-50')} />
                <Moon className={cn('absolute inset-0 w-4 h-4 transition-all duration-300', theme === 'light' ? 'opacity-100 scale-100' : 'opacity-0 scale-50')} />
              </div>
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md animate-fade-in-right">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
              <p className="text-muted-foreground">Sign in to your StudentKatta account</p>
            </div>

            {/* Demo quick login */}
            <div className="mb-5">
              <p className="text-xs text-muted-foreground mb-2.5 font-medium">Quick demo access:</p>
              <div className="grid grid-cols-3 gap-2">
                {demoLogins.map(d => (
                  <button
                    key={d.label}
                    onClick={() => handleDemoClick(d)}
                    className={cn(
                      'flex items-center gap-1.5 p-2.5 rounded-lg border text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95',
                      d.color,
                      activeDemo === d.label && 'ring-2 ring-offset-1 ring-current scale-105'
                    )}
                  >
                    <div className={cn('w-1.5 h-1.5 rounded-full shrink-0', d.dot)} />
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-3 text-muted-foreground">or enter manually</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@institution.edu"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/30"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline hover:text-primary/80 transition-colors">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full relative overflow-hidden group"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="sk-spinner" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                )}
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline hover:text-primary/80 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
