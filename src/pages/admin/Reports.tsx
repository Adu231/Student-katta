import { useState } from 'react';
import { Flag, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MOCK_REPORTS } from '@/lib/mockData';
import type { Report } from '@/types';

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);

  const resolve = (id: string) => { setReports(p => p.map(r => r.id === id ? { ...r, status: 'resolved' as const } : r)); toast.success('Report resolved.'); };
  const dismiss = (id: string) => { setReports(p => p.map(r => r.id === id ? { ...r, status: 'dismissed' as const } : r)); toast.success('Report dismissed.'); };

  const pending = reports.filter(r => r.status === 'pending');
  const resolved = reports.filter(r => r.status !== 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Reports</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Review and resolve content reports from users</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="sk-card p-4 text-center"><p className="text-2xl font-bold text-foreground">{reports.length}</p><p className="text-xs text-muted-foreground">Total Reports</p></div>
        <div className="sk-card p-4 text-center border-t-4 border-t-red-500"><p className="text-2xl font-bold text-red-600">{pending.length}</p><p className="text-xs text-muted-foreground">Pending</p></div>
        <div className="sk-card p-4 text-center border-t-4 border-t-emerald-500"><p className="text-2xl font-bold text-emerald-600">{resolved.length}</p><p className="text-xs text-muted-foreground">Resolved</p></div>
      </div>

      {pending.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3">Pending Reports ({pending.length})</h2>
          <div className="space-y-3">
            {pending.map(report => (
              <div key={report.id} className="sk-card p-5 border-l-4 border-l-red-500">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                      <Flag className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{report.noteTitle}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Reported by {report.reportedBy} · {report.reportedAt}</p>
                      <div className="mt-2 p-2.5 rounded bg-muted/50">
                        <p className="text-xs font-medium text-foreground mb-0.5">Reason:</p>
                        <p className="text-xs text-muted-foreground">{report.reason}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => resolve(report.id)}>
                      <CheckCircle className="w-4 h-4 mr-1" />Resolve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => dismiss(report.id)}>
                      <XCircle className="w-4 h-4 mr-1" />Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {resolved.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3">Resolved Reports</h2>
          <div className="space-y-3">
            {resolved.map(report => (
              <div key={report.id} className="sk-card p-4 opacity-60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{report.noteTitle}</p>
                    <p className="text-xs text-muted-foreground">{report.reportedBy} · {report.reportedAt}</p>
                  </div>
                  {report.status === 'resolved' ? <span className="sk-badge-approved">Resolved</span> : <span className="sk-badge-pending">Dismissed</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reports.length === 0 && (
        <div className="text-center py-20"><Flag className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No reports found</p></div>
      )}
    </div>
  );
}
