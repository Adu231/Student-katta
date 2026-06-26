import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Public Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import FeatureDetail from "./pages/FeatureDetail";
import AboutDetail from "./pages/AboutDetail";
import NotePreview from "./pages/student/NotePreview";

// Layouts
import StudentLayout from "./components/layout/StudentLayout";
import TeacherLayout from "./components/layout/TeacherLayout";
import AdminLayout from "./components/layout/AdminLayout";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentNotes from "./pages/student/Notes";
import NoteDetails from "./pages/student/NoteDetails";
import UploadNote from "./pages/student/UploadNote";
import MyUploads from "./pages/student/MyUploads";
import StudentBookmarks from "./pages/student/Bookmarks";
import StudentNotifications from "./pages/student/Notifications";
import StudentProfile from "./pages/student/Profile";
import StudentSettings from "./pages/student/Settings";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/Dashboard";
import ReviewQueue from "./pages/teacher/ReviewQueue";
import TeacherUploadContent from "./pages/teacher/UploadContent";
import TeacherMyContent from "./pages/teacher/MyContent";
import TeacherAnnouncements from "./pages/teacher/Announcements";
import TeacherProfile from "./pages/teacher/Profile";
import TeacherSettings from "./pages/teacher/Settings";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import TeacherVerifications from "./pages/admin/TeacherVerifications";
import ContentApprovals from "./pages/admin/ContentApprovals";
import AdminReports from "./pages/admin/Reports";
import AdminAnnouncements from "./pages/admin/Announcements";
import AdminDepartments from "./pages/admin/Departments";
import AdminSubjects from "./pages/admin/Subjects";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/features/:slug" element={<FeatureDetail />} />
          <Route path="/about/:slug" element={<AboutDetail />} />
          <Route path="/note-preview" element={<NotePreview />} />

          {/* Student Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="notes" element={<StudentNotes />} />
            <Route path="note-details" element={<NoteDetails />} />
            <Route path="upload-note" element={<UploadNote />} />
            <Route path="my-uploads" element={<MyUploads />} />
            <Route path="bookmarks" element={<StudentBookmarks />} />
            <Route path="notifications" element={<StudentNotifications />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="review-queue" element={<ReviewQueue />} />
            <Route path="upload-content" element={<TeacherUploadContent />} />
            <Route path="my-content" element={<TeacherMyContent />} />
            <Route path="announcements" element={<TeacherAnnouncements />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="settings" element={<TeacherSettings />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="teacher-verifications" element={<TeacherVerifications />} />
            <Route path="content-approvals" element={<ContentApprovals />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="departments" element={<AdminDepartments />} />
            <Route path="subjects" element={<AdminSubjects />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
