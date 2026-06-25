import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout as authLogout, getDashboardPath } from '@/lib/auth';
import type { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    const stored = getCurrentUser();
    setUser(stored);
  }, []);

  const logout = () => {
    authLogout();
    setUser(null);
    navigate('/login');
  };

  const redirectToDashboard = () => {
    if (user) navigate(getDashboardPath(user.role));
  };

  return { user, logout, redirectToDashboard, isAuthenticated: !!user };
}
