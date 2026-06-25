import { useState } from 'react';
import { Settings, Moon, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

export default function AdminSettings() {
  const { theme, toggleTheme } = useTheme();
  const [platform, setPlatform] = useState({ name: 'StudentKatta', email: 'admin@studentkatta.edu', maxUploadSize: '20' });
  const [security, setSecurity] = useState({ requireApproval: true, teacherVerification: true, autoRejectReports: false });

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Platform Settings</h1>
        <p className="text-muted-foreground text-sm">Configure platform-wide settings</p>
      </div>

      <div className="sk-card p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4"><Settings className="w-5 h-5 text-muted-foreground" /><h2 className="font-semibold text-foreground">General Settings</h2></div>
        <div><Label>Platform Name</Label><Input value={platform.name} onChange={e => setPlatform(p => ({ ...p, name: e.target.value }))} className="mt-1.5" /></div>
        <div><Label>Admin Email</Label><Input type="email" value={platform.email} onChange={e => setPlatform(p => ({ ...p, email: e.target.value }))} className="mt-1.5" /></div>
        <div><Label>Max Upload Size (MB)</Label><Input type="number" value={platform.maxUploadSize} onChange={e => setPlatform(p => ({ ...p, maxUploadSize: e.target.value }))} className="mt-1.5 w-32" /></div>
        <Button onClick={() => toast.success('Settings saved!')} size="sm">Save Settings</Button>
      </div>

      <div className="sk-card p-6">
        <div className="flex items-center gap-3 mb-5"><Moon className="w-5 h-5 text-muted-foreground" /><h2 className="font-semibold text-foreground">Appearance</h2></div>
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium text-foreground">Dark Mode</p><p className="text-xs text-muted-foreground">Toggle platform theme</p></div>
          <button onClick={toggleTheme} className={`relative w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-muted'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="sk-card p-6">
        <div className="flex items-center gap-3 mb-5"><Shield className="w-5 h-5 text-muted-foreground" /><h2 className="font-semibold text-foreground">Content & Security</h2></div>
        <div className="space-y-4">
          {[
            { key: 'requireApproval' as const, label: 'Require Content Approval', desc: 'All student uploads must be approved before publishing' },
            { key: 'teacherVerification' as const, label: 'Teacher Verification Required', desc: 'New teachers must be verified by admin before uploading' },
            { key: 'autoRejectReports' as const, label: 'Auto-handle Reports', desc: 'Automatically remove content with 5+ reports' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div><p className="text-sm font-medium text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
              <button onClick={() => setSecurity(p => ({ ...p, [item.key]: !p[item.key] }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${security[item.key] ? 'bg-primary' : 'bg-muted'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${security[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
        <Button className="mt-4" size="sm" onClick={() => toast.success('Security settings saved!')}>Save</Button>
      </div>
    </div>
  );
}
