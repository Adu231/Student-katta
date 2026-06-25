import type { User, UserRole } from '@/types';

const STORAGE_KEY = 'studentkatta_user';

export const DEMO_USERS: Record<string, User & { password: string }> = {
  'student@sk.edu': {
    id: 'u2', name: 'Rahul Verma', email: 'student@sk.edu', password: 'student123',
    role: 'student', department: 'Computer Science', semester: 5, verified: false, joinedAt: '2024-08-15',
  },
  'teacher@sk.edu': {
    id: 'u1', name: 'Priya Sharma', email: 'teacher@sk.edu', password: 'teacher123',
    role: 'teacher', department: 'Computer Science', subject: 'Data Structures', verified: true, joinedAt: '2024-08-01',
  },
  'admin@sk.edu': {
    id: 'admin1', name: 'Admin User', email: 'admin@sk.edu', password: 'admin123',
    role: 'admin', department: 'Administration', verified: true, joinedAt: '2022-01-01',
  },
};

export function getCurrentUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const record = DEMO_USERS[email.toLowerCase()];
  if (!record) return { success: false, error: 'No account found with this email.' };
  if (record.password !== password) return { success: false, error: 'Incorrect password.' };
  const { password: _, ...user } = record;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function register(data: { name: string; email: string; password: string; role: UserRole; department?: string }): { success: boolean; user?: User; error?: string } {
  if (DEMO_USERS[data.email.toLowerCase()]) return { success: false, error: 'An account with this email already exists.' };
  const user: User = {
    id: `u_${Date.now()}`,
    name: data.name,
    email: data.email,
    role: data.role,
    department: data.department,
    semester: data.role === 'student' ? 1 : undefined,
    verified: data.role !== 'teacher',
    joinedAt: new Date().toISOString().split('T')[0],
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case 'student': return '/student/dashboard';
    case 'teacher': return '/teacher/dashboard';
    case 'admin': return '/admin/dashboard';
  }
}
