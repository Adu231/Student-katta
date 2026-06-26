import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, ArrowRight, CheckCircle, GraduationCap as GradCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { register, getDashboardPath } from '@/lib/auth';
import type { UserRole } from '@/types';
import { MOCK_DEPARTMENTS } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const roleOptions = [
  { value: 'student', label: 'Student', desc: 'Browse, upload, and download academic resources', color: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20', activeRing: 'ring-blue-500' },
  { value: 'teacher', label: 'Teacher', desc: 'Manage content, review submissions & post announcements', color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20', activeRing: 'ring-emerald-500' },
];

export default function Register() {
  const [form, setForm]         = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'student' as UserRole, department: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'student' || roleParam === 'teacher') {
      setForm(prev => ({ ...prev, role: roleParam as UserRole }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match.'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters.'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = register({ name: form.name, email: form.email, password: form.password, role: form.role, department: form.department });
      if (result.success && result.user) {
        toast.success('Account created successfully!');
        navigate(getDashboardPath(result.user.role));
      } else {
        toast.error(result.error || 'Registration failed');
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-8 group animate-fade-in-down">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-foreground">Student<span className="text-primary">Katta</span></span>
      </Link>

      <div className="w-full max-w-lg sk-card p-8 animate-scale-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Create Your Account</h1>
          <p className="text-muted-foreground text-sm">Join the StudentKatta academic community</p>
        </div>

        {/* Role selector */}
        <div className="mb-5">
          <Label className="mb-2 block">I am a...</Label>
          <div className="grid grid-cols-2 gap-3">
            {roleOptions.map(r => (
              <button
                key={r.value}
                type="button"
                onClick={() => setForm(p => ({ ...p, role: r.value as UserRole }))}
                className={cn(
                  'text-left p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-100',
                  form.role === r.value
                    ? `${r.color} ${r.activeRing} ring-2 ring-offset-2`
                    : 'border-border bg-card hover:border-primary/50'
                )}
              >
                <p className="text-sm font-bold text-foreground">{r.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{r.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="mt-1.5" required />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <select
                name="department" id="department" value={form.department} onChange={handleChange}
                className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Department</option>
                {MOCK_DEPARTMENTS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@institution.edu" className="mt-1.5" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password" name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password} onChange={handleChange}
                  placeholder="Min 6 chars" required
                />
                <button
                  type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword" name="confirmPassword" type="password"
                value={form.confirmPassword} onChange={handleChange}
                placeholder="Re-enter" className="mt-1.5" required
              />
            </div>
          </div>

          {form.role === 'teacher' && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 animate-scale-in">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Teacher accounts require admin verification before accessing the full teacher portal. You'll be notified via email.
                </p>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full relative overflow-hidden group" size="lg" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2"><div className="sk-spinner" />Creating account...</span>
            ) : (
              <span className="flex items-center gap-2">
                Create Account
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            )}
            <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline transition-colors">Sign in</Link>
        </p>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center animate-fade-in">
        By registering, you agree to our{' '}
        <Link to="/terms" className="text-primary hover:underline">Terms</Link>{' '}and{' '}
        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
      </p>
    </div>
  );
}
