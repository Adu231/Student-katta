import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';

const sections = [
  { title: '1. Information We Collect', content: 'We collect information you provide during registration (name, email, institution), content you upload, and usage data such as downloads, bookmarks, and interactions with the platform. We do not collect payment information.' },
  { title: '2. How We Use Information', content: 'Your information is used to provide platform services, manage your account, enable content sharing and approval workflows, send academic notifications, and improve platform performance. We never sell your personal data.' },
  { title: '3. Content Ownership', content: 'You retain ownership of all academic content you upload. By uploading, you grant StudentKatta a non-exclusive license to display and distribute your content within the platform. You are responsible for ensuring you have rights to upload the content.' },
  { title: '4. Data Security', content: 'We implement industry-standard security measures to protect your data. All data is encrypted in transit and at rest. Access to user data is restricted to authorized personnel only.' },
  { title: '5. Cookies', content: 'We use cookies to maintain your session, remember your preferences (such as theme settings), and analyze platform usage patterns. You can control cookie settings through your browser.' },
  { title: '6. Third-Party Services', content: 'We may use trusted third-party services for analytics and infrastructure. These services are contractually bound to protect your data and cannot use it for their own purposes.' },
  { title: '7. Your Rights', content: 'You have the right to access, correct, or delete your personal data. You can request deletion of your account and all associated data at any time by contacting support@studentkatta.edu.' },
  { title: '8. Changes to This Policy', content: 'We may update this Privacy Policy periodically. We will notify users of significant changes via email or platform announcements. Continued use of the platform after changes constitutes acceptance.' },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <h1 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Privacy Policy</h1>
        <p className="text-muted-foreground mb-2">Last updated: June 23, 2026</p>
        <p className="text-muted-foreground mb-10 leading-relaxed">At StudentKatta, we are committed to protecting your privacy and handling your personal information with transparency and care. This policy explains how we collect, use, and protect your data.</p>
        <div className="space-y-8">
          {sections.map(s => (
            <div key={s.title}>
              <h2 className="text-xl font-bold text-foreground mb-3">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 p-5 rounded-xl bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground">For privacy-related inquiries, contact us at <a href="mailto:privacy@studentkatta.edu" className="text-primary hover:underline">privacy@studentkatta.edu</a></p>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
