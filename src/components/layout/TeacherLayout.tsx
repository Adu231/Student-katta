import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import DashboardTopbar from './DashboardTopbar';
import { useAuth } from '@/hooks/useAuth';

export default function TeacherLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'teacher') { navigate('/login'); }
  }, [user, navigate]);

  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  if (!user || user.role !== 'teacher') return null;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeacherSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} user={user} />
        <main key={location.pathname} className="flex-1 overflow-y-auto p-4 lg:p-6 page-enter">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
