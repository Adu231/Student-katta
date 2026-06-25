import type { Note, Announcement, Department, User, Report } from '@/types';

export const MOCK_NOTES: Note[] = [
  {
    id: 'n1', title: 'Data Structures & Algorithms - Complete Notes', description: 'Comprehensive notes covering arrays, linked lists, trees, graphs, sorting and searching algorithms with examples.',
    subject: 'Data Structures', department: 'Computer Science', semester: 3, type: 'notes', status: 'approved',
    uploadedBy: 'Priya Sharma', uploaderRole: 'teacher', uploadedAt: '2026-06-10', fileSize: '2.4 MB', fileType: 'PDF',
    downloads: 342, likes: 89, bookmarks: 67, rating: 4.8, ratingCount: 45, tags: ['DSA', 'algorithms', 'data structures'],
  },
  {
    id: 'n2', title: 'Operating Systems - Process Management', description: 'Detailed notes on process scheduling, inter-process communication, deadlocks and memory management.',
    subject: 'Operating Systems', department: 'Computer Science', semester: 5, type: 'notes', status: 'approved',
    uploadedBy: 'Rahul Verma', uploaderRole: 'student', uploadedAt: '2026-06-12', fileSize: '1.8 MB', fileType: 'PDF',
    downloads: 215, likes: 54, bookmarks: 38, rating: 4.5, ratingCount: 32, tags: ['OS', 'processes', 'scheduling'],
  },
  {
    id: 'n3', title: 'Database Management Systems - SQL Guide', description: 'Complete SQL tutorial with normalization, transactions, indexing and query optimization.',
    subject: 'DBMS', department: 'Computer Science', semester: 4, type: 'notes', status: 'pending',
    uploadedBy: 'Aditya Kumar', uploaderRole: 'student', uploadedAt: '2026-06-20', fileSize: '3.1 MB', fileType: 'PDF',
    downloads: 0, likes: 0, bookmarks: 0, rating: 0, ratingCount: 0, tags: ['SQL', 'database', 'normalization'],
  },
  {
    id: 'n4', title: 'Digital Electronics - Logic Gates & Circuits', description: 'Notes on combinational and sequential circuits, flip-flops, counters and registers.',
    subject: 'Digital Electronics', department: 'Electronics', semester: 3, type: 'notes', status: 'approved',
    uploadedBy: 'Dr. Anjali Mehta', uploaderRole: 'teacher', uploadedAt: '2026-05-28', fileSize: '4.2 MB', fileType: 'PDF',
    downloads: 178, likes: 43, bookmarks: 29, rating: 4.6, ratingCount: 28, tags: ['digital', 'logic', 'circuits'],
  },
  {
    id: 'n5', title: 'Engineering Mathematics - Calculus & Linear Algebra', description: 'Full semester notes with solved examples for differential calculus, integral calculus and matrix operations.',
    subject: 'Engineering Mathematics', department: 'Common', semester: 2, type: 'notes', status: 'approved',
    uploadedBy: 'Prof. Suresh Nair', uploaderRole: 'teacher', uploadedAt: '2026-05-15', fileSize: '5.6 MB', fileType: 'PDF',
    downloads: 520, likes: 134, bookmarks: 98, rating: 4.9, ratingCount: 87, tags: ['maths', 'calculus', 'algebra'],
  },
  {
    id: 'n6', title: 'Computer Networks - OSI Model & TCP/IP', description: 'Notes covering network layers, protocols, routing algorithms, and network security basics.',
    subject: 'Computer Networks', department: 'Computer Science', semester: 5, type: 'notes', status: 'rejected',
    uploadedBy: 'Sneha Patel', uploaderRole: 'student', uploadedAt: '2026-06-18', fileSize: '2.0 MB', fileType: 'PDF',
    downloads: 0, likes: 0, bookmarks: 0, rating: 0, ratingCount: 0, tags: ['networks', 'OSI', 'TCP'],
  },
  {
    id: 'n7', title: 'Thermodynamics - Laws & Cycles', description: 'Comprehensive coverage of laws of thermodynamics, Carnot cycle, and heat engine problems.',
    subject: 'Thermodynamics', department: 'Mechanical', semester: 4, type: 'notes', status: 'approved',
    uploadedBy: 'Vikram Singh', uploaderRole: 'student', uploadedAt: '2026-06-08', fileSize: '3.4 MB', fileType: 'PDF',
    downloads: 165, likes: 41, bookmarks: 33, rating: 4.3, ratingCount: 22, tags: ['thermo', 'carnot', 'heat'],
  },
  {
    id: 'n8', title: 'Mid-Semester Exam 2026 - DSA Question Paper', description: 'Previous year question paper for Data Structures and Algorithms mid-semester examination.',
    subject: 'Data Structures', department: 'Computer Science', semester: 3, type: 'question-paper', status: 'approved',
    uploadedBy: 'Dr. Anjali Mehta', uploaderRole: 'teacher', uploadedAt: '2026-06-01', fileSize: '0.8 MB', fileType: 'PDF',
    downloads: 289, likes: 67, bookmarks: 54, rating: 4.7, ratingCount: 38, tags: ['question-paper', 'DSA', 'exam'],
  },
  {
    id: 'n9', title: 'Python Programming - Assignment 3', description: 'Assignment on file handling, exception handling, and OOP concepts in Python.',
    subject: 'Python Programming', department: 'Computer Science', semester: 3, type: 'assignment', status: 'pending',
    uploadedBy: 'Meera Joshi', uploaderRole: 'student', uploadedAt: '2026-06-22', fileSize: '0.5 MB', fileType: 'PDF',
    downloads: 0, likes: 0, bookmarks: 0, rating: 0, ratingCount: 0, tags: ['python', 'assignment', 'OOP'],
  },
  {
    id: 'n10', title: 'Civil Engineering - Structural Analysis Notes', description: 'Complete notes on beams, trusses, frames, and influence lines for structural analysis.',
    subject: 'Structural Analysis', department: 'Civil', semester: 5, type: 'notes', status: 'approved',
    uploadedBy: 'Arjun Reddy', uploaderRole: 'student', uploadedAt: '2026-06-05', fileSize: '2.9 MB', fileType: 'PDF',
    downloads: 134, likes: 32, bookmarks: 25, rating: 4.4, ratingCount: 19, tags: ['civil', 'structure', 'beams'],
  },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1', title: 'End Semester Examinations Schedule - June 2026', content: 'The End Semester Examinations for all departments are scheduled to commence from July 5, 2026. Students are advised to check the detailed timetable on the notice board and prepare accordingly. Hall tickets will be distributed from June 28, 2026.',
    type: 'exam', publishedBy: 'Admin Office', publisherRole: 'admin', publishedAt: '2026-06-20', pinned: true,
    expiresAt: '2026-07-15',
  },
  {
    id: 'a2', title: 'National Level Technical Symposium - TechFest 2026', content: 'StudentKatta is proud to announce the National Level Technical Symposium TechFest 2026 scheduled on July 20-21, 2026. Registration is open for all students. Events include Paper Presentation, Coding Competition, Robotics, and more.',
    type: 'event', publishedBy: 'Dr. Anjali Mehta', publisherRole: 'teacher', publishedAt: '2026-06-18', pinned: true,
  },
  {
    id: 'a3', title: 'Campus Placement Drive - Infosys & TCS', content: 'Off-campus placement drive for final year students of Computer Science and Electronics departments. Companies: Infosys and TCS. Date: July 10, 2026. Venue: Main Auditorium. Eligible branches: CS, IT, ECE. Minimum CGPA: 7.0.',
    type: 'placement', publishedBy: 'Placement Cell', publisherRole: 'admin', publishedAt: '2026-06-15', pinned: false,
  },
  {
    id: 'a4', title: 'Database Management Systems Assignment Submission', content: 'Students of Semester 4 CSE are reminded to submit their DBMS assignment on ER Diagrams and Normalization by June 28, 2026. Submissions after the deadline will not be accepted.',
    type: 'assignment', publishedBy: 'Prof. Ramesh Kumar', publisherRole: 'teacher', publishedAt: '2026-06-14', pinned: false,
  },
  {
    id: 'a5', title: 'Holiday Notice - Eid ul-Adha', content: 'The institution will remain closed on June 28, 2026 on account of Eid ul-Adha. Students are requested to note the same and plan accordingly.',
    type: 'holiday', publishedBy: 'Admin Office', publisherRole: 'admin', publishedAt: '2026-06-13', pinned: false,
  },
  {
    id: 'a6', title: 'EMERGENCY: Server Maintenance Tonight', content: 'The platform will undergo critical maintenance from 11:00 PM to 3:00 AM on June 23, 2026. All uploads and downloads will be unavailable during this time. Please complete your work before 11:00 PM.',
    type: 'emergency', publishedBy: 'Admin', publisherRole: 'admin', publishedAt: '2026-06-23', pinned: true,
  },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: 'd1', name: 'Computer Science & Engineering', code: 'CSE', subjects: ['Data Structures', 'DBMS', 'Operating Systems', 'Computer Networks', 'Python Programming', 'Web Technologies'] },
  { id: 'd2', name: 'Electronics & Communication', code: 'ECE', subjects: ['Digital Electronics', 'Analog Circuits', 'Signal Processing', 'VLSI Design', 'Microprocessors'] },
  { id: 'd3', name: 'Mechanical Engineering', code: 'ME', subjects: ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'Manufacturing Processes', 'CAD/CAM'] },
  { id: 'd4', name: 'Civil Engineering', code: 'CE', subjects: ['Structural Analysis', 'Fluid Mechanics', 'Surveying', 'Concrete Technology', 'Geotechnical Engineering'] },
  { id: 'd5', name: 'Common Subjects', code: 'COMMON', subjects: ['Engineering Mathematics', 'Physics', 'Chemistry', 'Engineering Drawing', 'Communication Skills'] },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Priya Sharma', email: 'priya.sharma@sk.edu', role: 'teacher', department: 'Computer Science', subject: 'Data Structures', verified: true, joinedAt: '2024-08-01' },
  { id: 'u2', name: 'Rahul Verma', email: 'rahul.verma@sk.edu', role: 'student', department: 'Computer Science', semester: 5, verified: false, joinedAt: '2024-08-15' },
  { id: 'u3', name: 'Aditya Kumar', email: 'aditya.kumar@sk.edu', role: 'student', department: 'Computer Science', semester: 4, verified: false, joinedAt: '2024-08-20' },
  { id: 'u4', name: 'Dr. Anjali Mehta', email: 'anjali.mehta@sk.edu', role: 'teacher', department: 'Electronics', subject: 'Digital Electronics', verified: true, joinedAt: '2023-07-01' },
  { id: 'u5', name: 'Meera Joshi', email: 'meera.joshi@sk.edu', role: 'student', department: 'Computer Science', semester: 3, verified: false, joinedAt: '2025-08-10' },
  { id: 'u6', name: 'Vikram Singh', email: 'vikram.singh@sk.edu', role: 'student', department: 'Mechanical', semester: 4, verified: false, joinedAt: '2024-09-01' },
  { id: 'u7', name: 'Sneha Patel', email: 'sneha.patel@sk.edu', role: 'student', department: 'Computer Science', semester: 5, verified: false, joinedAt: '2024-08-12' },
  { id: 'u8', name: 'Prof. Suresh Nair', email: 'suresh.nair@sk.edu', role: 'teacher', department: 'Common', subject: 'Engineering Mathematics', verified: true, joinedAt: '2022-06-01' },
];

export const MOCK_REPORTS: Report[] = [
  { id: 'r1', noteId: 'n6', noteTitle: 'Computer Networks - OSI Model & TCP/IP', reportedBy: 'Rahul Verma', reason: 'Content contains errors and incorrect information', status: 'pending', reportedAt: '2026-06-19' },
  { id: 'r2', noteId: 'n3', noteTitle: 'Database Management Systems - SQL Guide', reportedBy: 'Priya Sharma', reason: 'Content appears to be copied from another source without attribution', status: 'pending', reportedAt: '2026-06-21' },
  { id: 'r3', noteId: 'n7', noteTitle: 'Thermodynamics - Laws & Cycles', reportedBy: 'Meera Joshi', reason: 'File is corrupted and cannot be opened', status: 'resolved', reportedAt: '2026-06-07' },
];

export const PLATFORM_STATS = {
  totalNotes: 1248,
  totalUsers: 4632,
  totalDownloads: 38420,
  totalDepartments: 12,
  approvedContent: 1089,
  pendingReview: 47,
};
