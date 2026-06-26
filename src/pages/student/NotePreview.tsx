import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  FileText, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight,
  Printer, ArrowLeft, Info, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_NOTES } from '@/lib/mockData';
import { toast } from 'sonner';

export default function NotePreview() {
  const [params] = useSearchParams();
  const id = params.get('id');
  const navigate = useNavigate();
  const note = MOCK_NOTES.find(n => n.id === id) || MOCK_NOTES[0];

  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom]               = useState(100);

  const getPreviewPages = (subjectName: string) => {
    const sub = subjectName.toLowerCase();
    
    if (sub.includes('network') || sub.includes('cn')) {
      return [
        {
          title: "Unit 1: Computer Networks & OSI Model Overview",
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-foreground text-left">
              <h4 className="font-bold text-sm text-primary">1. Definition and Node Types</h4>
              <p className="text-muted-foreground leading-relaxed">
                A computer network is a set of autonomous nodes connected by a transmission medium to share files, communication, and print/storage services. Nodes include client endpoints, host servers, network routers, and access switches.
              </p>
              <h4 className="font-bold text-sm text-primary">2. The 7 Layers of OSI Model</h4>
              <div className="border rounded-xl p-4 bg-muted/40 space-y-2">
                <p className="font-semibold text-xs text-foreground">Structure & Responsibilities:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-muted-foreground text-xs">
                  <li><strong>Application:</strong> Direct user interfaces (HTTP, DNS)</li>
                  <li><strong>Presentation:</strong> Encryption & translation (SSL, JPEG)</li>
                  <li><strong>Session:</strong> Connections management (sockets, RPC)</li>
                  <li><strong>Transport:</strong> Process-to-process delivery (TCP, UDP)</li>
                  <li><strong>Network:</strong> IP packet routing & pathing (IP addresses)</li>
                  <li><strong>Data Link:</strong> Frame transmission & MAC addressing (Ethernet)</li>
                  <li><strong>Physical:</strong> Hardware bit streaming (coaxial cable, fiber)</li>
                </ol>
              </div>
            </div>
          )
        },
        {
          title: "Unit 2: Transport Layer Protocol Details",
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-foreground text-left">
              <h4 className="font-bold text-sm text-primary">1. TCP vs UDP Comparisons</h4>
              <p className="text-muted-foreground leading-relaxed">
                TCP (Transmission Control Protocol) is connection-oriented, reliable, and performs sliding window flow control. UDP (User Datagram Protocol) is stateless, connectionless, and transmits data with zero delay overhead.
              </p>
              <table className="min-w-full divide-y border text-xs text-left">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2.5 border font-bold">Feature</th>
                    <th className="p-2.5 border font-bold">TCP</th>
                    <th className="p-2.5 border font-bold">UDP</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-muted-foreground">
                  <tr>
                    <td className="p-2 border font-semibold">Reliability</td>
                    <td className="p-2 border text-emerald-600 dark:text-emerald-400 font-medium">Guaranteed delivery</td>
                    <td className="p-2 border text-red-600 dark:text-red-400 font-medium">Best-effort, no checksum</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-semibold">Connection</td>
                    <td className="p-2 border">Three-way handshake (SYN, SYN-ACK, ACK)</td>
                    <td className="p-2 border">Connectionless, direct send</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-semibold">Speed</td>
                    <td className="p-2 border">Slower due to ACK overhead</td>
                    <td className="p-2 border text-emerald-600 dark:text-emerald-400 font-medium">Fast, suitable for streaming</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        }
      ];
    }
    
    if (sub.includes('dbms') || sub.includes('database')) {
      return [
        {
          title: "Unit 1: ER Diagrams & SQL Foundation",
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-foreground text-left">
              <h4 className="font-bold text-sm text-primary">1. Entity-Relationship Modeling</h4>
              <p className="text-muted-foreground leading-relaxed">
                An ER Diagram maps entity types, attributes, and relationships. It uses rectangles for Entities, ellipses for Attributes, diamonds for Relationships, and lines to show cardinality.
              </p>
              <h4 className="font-bold text-sm text-primary">2. Structured Query Language (SQL)</h4>
              <p className="text-muted-foreground leading-relaxed">
                SQL queries retrieve and manipulate relational databases. The core blocks include SELECT, FROM, JOIN, WHERE, GROUP BY, and HAVING.
              </p>
              <div className="border rounded-xl p-4 bg-muted/40 space-y-1.5 font-mono text-xs text-foreground">
                <p className="text-blue-600 dark:text-blue-400 font-bold">-- Sample Query: Retrieve student list</p>
                <p>SELECT s.student_id, s.name, n.gpa</p>
                <p>FROM Students s</p>
                <p>JOIN Enrollment e ON s.student_id = e.student_id</p>
                <p>WHERE e.course_code = 'CS-302'</p>
                <p>ORDER BY n.gpa DESC;</p>
              </div>
            </div>
          )
        }
      ];
    }
    
    return [
      {
        title: "Introduction & Basic Core Concepts",
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-foreground text-left">
            <h4 className="font-bold text-sm text-primary">1. Abstract Summary</h4>
            <p className="text-muted-foreground leading-relaxed">
              This document contains comprehensive notes compiled from main classroom lectures, official textbooks, and verified syllabus references. It outlines fundamental concepts, definitions, logical steps, and key formulas.
            </p>
            <h4 className="font-bold text-sm text-primary">2. Core Principles</h4>
            <p className="text-muted-foreground leading-relaxed">
              Please review all subsections. All materials are teacher-verified and comply with university guidelines. Use the sidebar to download files for offline reading.
            </p>
            <div className="p-3 bg-muted/40 border rounded-xl text-xs space-y-2">
              <p className="font-bold text-foreground">Content Highlights:</p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Detailed diagram analysis and tables.</li>
                <li>Practice question papers and model answers.</li>
                <li>Formulas and derivations compiled.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        title: "Advanced Sections & Exam Prep Questions",
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-foreground text-left">
            <h4 className="font-bold text-sm text-primary">1. Important Exam Questions</h4>
            <p className="text-muted-foreground leading-relaxed">
              Based on the past 5 years of university question papers, these sections carry the highest weightage. Ensure you review the diagrams and standard derivations.
            </p>
            <div className="border rounded-xl p-3 bg-muted/40 space-y-2 text-xs">
              <p className="font-semibold text-foreground">Quick Checklist:</p>
              <ul className="list-none pl-0 space-y-1.5 text-muted-foreground">
                <li className="flex items-center gap-2">✓ Verified definitions</li>
                <li className="flex items-center gap-2">✓ Plagiarism checked</li>
                <li className="flex items-center gap-2">✓ Correct calculations</li>
              </ul>
            </div>
          </div>
        )
      }
    ];
  };

  const previewPages = getPreviewPages(note.subject || note.title);

  const handleDownload = () => toast.success('Download started!');
  const handlePrint = () => { window.print(); };

  useEffect(() => {
    document.title = `Preview - ${note.title}`;
  }, [note]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white select-none">
      
      {/* ── Top Bar / Controls ────────────────── */}
      <header className="h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 z-20 shrink-0">
        
        {/* Left: Document Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left hidden sm:block">
            <h1 className="text-sm font-bold text-slate-100 truncate max-w-xs md:max-w-md">{note.title}</h1>
            <p className="text-[10px] text-slate-400 font-medium">Previewing {note.fileType} · {note.fileSize}</p>
          </div>
        </div>

        {/* Center: Page Controls & Zoom */}
        <div className="flex items-center gap-6">
          
          {/* Page Navigator */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-xs font-semibold text-slate-300 font-mono">
              {currentPage} / {previewPages.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              onClick={() => setCurrentPage(p => Math.min(previewPages.length, p + 1))}
              disabled={currentPage >= previewPages.length}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              onClick={() => setZoom(z => Math.max(50, z - 10))}
              disabled={zoom <= 50}
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </Button>
            <span className="text-[11px] font-mono w-10 text-center text-slate-300">{zoom}%</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              onClick={() => setZoom(z => Math.min(150, z + 10))}
              disabled={zoom >= 150}
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrint}
            className="h-9 w-9 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            title="Print Document"
          >
            <Printer className="w-4.5 h-4.5" />
          </Button>
          <Button
            onClick={handleDownload}
            className="h-9 bg-primary hover:bg-blue-600 text-white font-medium px-4 shadow-sm"
          >
            <Download className="w-4 h-4 mr-1.5" /> Download
          </Button>
        </div>

      </header>

      <style>{`
        @media print {
          body, html {
            background: white !important;
            color: black !important;
          }
          header, footer, .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
            background: white !important;
          }
          .print-content {
            transform: none !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            min-height: auto !important;
            color: black !important;
          }
        }
      `}</style>

      {/* ── Main Workspace ────────────────────── */}
      <main className="flex-1 bg-slate-900 overflow-auto p-8 flex justify-center items-start relative">
        
        {/* Page Shadow Box Container */}
        <div 
          className="transition-all duration-200 flex justify-center origin-top"
          style={{
            width: `${672 * (zoom / 100)}px`,
            height: `${850 * (zoom / 100)}px`,
          }}
        >
          <div
            className="bg-white text-slate-900 border border-slate-800 rounded-lg shadow-2xl p-8 sm:p-12 w-[672px] min-h-[800px] transition-all duration-200 relative print-content"
            style={{ 
              transform: `scale(${zoom / 100})`, 
              transformOrigin: 'top left',
            }}
          >
            {/* Header inside mock document */}
            <div className="border-b pb-3 mb-6 flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-bold">
              <span>StudentKatta Study Repository</span>
              <span>{previewPages[currentPage - 1]?.title}</span>
            </div>
            
            {/* Document Content */}
            <div className="space-y-4 pb-12">
              {previewPages[currentPage - 1]?.content}
            </div>

            {/* Footer inside mock document */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-slate-400 font-mono">
              - Page {currentPage} of {previewPages.length} -
            </div>
          </div>
        </div>

      </main>

      {/* ── Status Bar ────────────────────────── */}
      <footer className="h-6 bg-slate-950 border-t border-slate-800 px-4 flex items-center justify-between text-[10px] text-slate-500 shrink-0">
        <div className="flex items-center gap-1.5">
          <Info className="w-3 h-3 text-slate-500" />
          <span>This is a secure reading mode workspace. Content is copyright-protected.</span>
        </div>
        <div>
          <span>StudentKatta Library Services © 2026</span>
        </div>
      </footer>

    </div>
  );
}
