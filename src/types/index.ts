export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  semester?: number;
  subject?: string;
  verified?: boolean;
  joinedAt: string;
}

export type ContentStatus = 'pending' | 'approved' | 'rejected';
export type ContentType = 'notes' | 'assignment' | 'question-paper' | 'syllabus' | 'practical' | 'study-material';

export interface Note {
  id: string;
  title: string;
  description: string;
  subject: string;
  department: string;
  semester: number;
  type: ContentType;
  status: ContentStatus;
  uploadedBy: string;
  uploaderRole: UserRole;
  uploadedAt: string;
  fileSize: string;
  fileType: string;
  downloads: number;
  likes: number;
  bookmarks: number;
  rating: number;
  ratingCount: number;
  tags: string[];
}

export type AnnouncementType = 'general' | 'exam' | 'assignment' | 'holiday' | 'placement' | 'event' | 'emergency';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  publishedBy: string;
  publisherRole: UserRole;
  publishedAt: string;
  expiresAt?: string;
  pinned: boolean;
  department?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  subjects: string[];
}

export interface Report {
  id: string;
  noteId: string;
  noteTitle: string;
  reportedBy: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  reportedAt: string;
}
