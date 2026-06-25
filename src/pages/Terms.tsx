import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';

const sections = [
  { title: '1. Acceptance of Terms', content: 'By registering and using StudentKatta, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the platform.' },
  { title: '2. User Accounts', content: 'Users are responsible for maintaining the confidentiality of their account credentials. You must provide accurate information during registration. Each person may maintain only one account.' },
  { title: '3. Acceptable Content', content: 'Users may only upload original academic content or content they have permission to share. Content must be relevant to academic studies, free from plagiarism, and appropriate for an educational environment.' },
  { title: '4. Prohibited Content', content: 'The following content is strictly prohibited: copyrighted materials without permission, offensive or inappropriate content, misleading or false academic information, personal attacks or harassment, and spam or promotional content.' },
  { title: '5. Content Approval', content: 'All student-uploaded content is subject to review by teachers or administrators. Rejection of content does not constitute a penalty. Users may resubmit corrected content. Teacher content requires admin approval.' },
  { title: '6. Intellectual Property', content: 'Uploading content grants StudentKatta a license to display it on the platform. You retain copyright. Content identified as plagiarized will be removed and the account may be suspended.' },
  { title: '7. Platform Usage', content: 'The platform is intended solely for academic purposes. Commercial use, data scraping, automated access, or any activity that disrupts platform operation is prohibited.' },
  { title: '8. Account Termination', content: 'StudentKatta reserves the right to suspend or terminate accounts that violate these terms. Users will be notified of termination reasons where legally permissible.' },
  { title: '9. Disclaimer', content: 'StudentKatta provides the platform as-is. We do not guarantee the accuracy of user-uploaded content. Always verify critical academic information from official institutional sources.' },
  { title: '10. Governing Law', content: 'These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Mumbai, Maharashtra.' },
];

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <h1 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Terms & Conditions</h1>
        <p className="text-muted-foreground mb-2">Last updated: June 23, 2026</p>
        <p className="text-muted-foreground mb-10 leading-relaxed">Please read these terms carefully before using StudentKatta. By using our platform, you agree to these terms.</p>
        <div className="space-y-8">
          {sections.map(s => (
            <div key={s.title}>
              <h2 className="text-xl font-bold text-foreground mb-3">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
