import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import DashboardTopbar from './DashboardTopbar';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      const redirectUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect=${redirectUrl}`);
      return;
    }
    if (user.role !== 'student') { navigate('/login'); }
  }, [user, navigate, location]);

  // Close sidebar on navigation
  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  if (!user || user.role !== 'student') return null;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <StudentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} user={user} />
        <main
          key={location.pathname}
          className="flex-1 overflow-y-auto p-4 lg:p-6 page-enter"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
