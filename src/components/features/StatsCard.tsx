import { useState, useEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'teal';
  index?: number;
}

const colorMap = {
  blue:   { bg: 'bg-blue-50 dark:bg-blue-900/20',   text: 'text-blue-600 dark:text-blue-400',   border: 'border-blue-200 dark:border-blue-800',   ring: 'ring-blue-500' },
  green:  { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800', ring: 'ring-emerald-500' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800', ring: 'ring-orange-500' },
  red:    { bg: 'bg-red-50 dark:bg-red-900/20',     text: 'text-red-600 dark:text-red-400',     border: 'border-red-200 dark:border-red-800',     ring: 'ring-red-500' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800', ring: 'ring-purple-500' },
  teal:   { bg: 'bg-teal-50 dark:bg-teal-900/20',   text: 'text-teal-600 dark:text-teal-400',   border: 'border-teal-200 dark:border-teal-800',   ring: 'ring-teal-500' },
};

// Animated counter hook
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

export default function StatsCard({ title, value, subtitle, icon: Icon, trend, color = 'blue', index = 0 }: Props) {
  const c = colorMap[color];
  const numericValue = typeof value === 'number' ? value : parseInt(String(value).replace(/\D/g, ''), 10) || 0;
  const isNumeric = typeof value === 'number';
  const { count, ref } = useCountUp(numericValue);

  return (
    <div
      ref={ref}
      className="sk-card p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default group relative overflow-hidden sk-card-shine"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Subtle gradient background */}
      <div className={cn('absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl', c.bg)} />

      <div className="relative flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className={cn('text-2xl font-bold text-foreground mt-1.5 tabular-nums transition-all duration-300', 'group-hover:' + c.text)}>
            {isNumeric ? count.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-xs font-semibold mt-1.5',
              trend.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
            )}>
              {trend.positive
                ? <TrendingUp className="w-3 h-3" />
                : <TrendingDown className="w-3 h-3" />
              }
              {trend.value}
            </div>
          )}
        </div>

        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300',
          c.bg, c.text,
          'group-hover:scale-110 group-hover:rotate-3'
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Bottom progress bar decoration */}
      <div className={cn('absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-700 opacity-0 group-hover:opacity-100', c.text.replace('text-', 'bg-'))}
        style={{ width: `${Math.min((numericValue / 100) * 100, 100)}%` }}
      />
    </div>
  );
}
