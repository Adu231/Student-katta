import { useState } from 'react';
import { Plus, Edit2, Trash2, Pin, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import AnnouncementCard from '@/components/features/AnnouncementCard';
import { MOCK_ANNOUNCEMENTS } from '@/lib/mockData';
import type { Announcement } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', type: 'general', pinned: false });

  const handleCreate = () => {
    if (!form.title || !form.content) { toast.error('Please fill all fields.'); return; }
    const newA: Announcement = {
      id: `a_${Date.now()}`, title: form.title, content: form.content,
      type: form.type as Announcement['type'], publishedBy: 'Admin', publisherRole: 'admin',
      publishedAt: new Date().toISOString().split('T')[0], pinned: form.pinned,
    };
    setAnnouncements(p => [newA, ...p]);
    setForm({ title: '', content: '', type: 'general', pinned: false });
    setOpen(false);
    toast.success('Announcement published to all users!');
  };

  const togglePin = (id: string) => { setAnnouncements(p => p.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a)); };
  const deleteAnn = (id: string) => { setAnnouncements(p => p.filter(a => a.id !== id)); toast.success('Announcement deleted.'); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Announcements</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Publish and manage platform-wide notices</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-2" />New Announcement</Button>
      </div>

      <div className="space-y-4">
        {announcements.map(a => (
          <div key={a.id} className="relative group">
            <AnnouncementCard announcement={a} />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Button size="sm" variant="secondary" className="h-7 w-7 p-0" onClick={() => togglePin(a.id)} title={a.pinned ? 'Unpin' : 'Pin'}>
                <Pin className={`w-3.5 h-3.5 ${a.pinned ? 'fill-primary' : ''}`} />
              </Button>
              <Button size="sm" variant="secondary" className="h-7 w-7 p-0"><Edit2 className="w-3.5 h-3.5" /></Button>
              <Button size="sm" variant="destructive" className="h-7 w-7 p-0" onClick={() => deleteAnn(a.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>New Announcement</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div><Label>Title</Label><Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Announcement title" className="mt-1.5" /></div>
            <div>
              <Label>Type</Label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {['general', 'exam', 'assignment', 'holiday', 'placement', 'event', 'emergency'].map(t => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>
            <div><Label>Content</Label><Textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={4} className="mt-1.5 resize-none" /></div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.pinned} onChange={e => setForm(p => ({ ...p, pinned: e.target.checked }))} className="rounded" />
              <span className="text-sm text-foreground">Pin this announcement</span>
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
