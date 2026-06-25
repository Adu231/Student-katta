import { useState } from 'react';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import NoteCard from '@/components/features/NoteCard';
import { MOCK_NOTES, MOCK_DEPARTMENTS } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const approvedNotes = MOCK_NOTES.filter(n => n.status === 'approved');
const contentTypes = ['All', 'notes', 'assignment', 'question-paper', 'syllabus', 'practical', 'study-material'];
const semesters = ['All', '1', '2', '3', '4', '5', '6', '7', '8'];

const typeColors: Record<string, string> = {
  'All': 'bg-muted text-foreground',
  'notes': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'assignment': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'question-paper': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'syllabus': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'practical': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  'study-material': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
};

export default function StudentNotes() {
  const [search, setSearch]           = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedSem, setSelectedSem]   = useState('All');
  const [showFilters, setShowFilters]   = useState(false);

  const filtered = approvedNotes.filter(n => {
    const matchSearch = !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.subject.toLowerCase().includes(search.toLowerCase()) ||
      n.uploadedBy.toLowerCase().includes(search.toLowerCase()) ||
      n.department.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === 'All' || n.type === selectedType;
    const matchDept = selectedDept === 'All' || n.department.includes(selectedDept.split(' ')[0]);
    const matchSem  = selectedSem === 'All' || String(n.semester) === selectedSem;
    return matchSearch && matchType && matchDept && matchSem;
  });

  const hasActiveFilters = search || selectedType !== 'All' || selectedDept !== 'All' || selectedSem !== 'All';
  const clearAll = () => { setSearch(''); setSelectedType('All'); setSelectedDept('All'); setSelectedSem('All'); };

  return (
    <div className="space-y-5 page-enter">
      {/* Header */}
      <div className="animate-fade-in-down">
        <h1 className="text-2xl font-bold text-foreground">Browse Notes</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Discover and download approved academic resources</p>
      </div>

      {/* Search bar */}
      <div className="relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title, subject, teacher, department..."
          className="pl-10 pr-10 transition-all duration-200 focus:shadow-md"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Type pills */}
      <div className="flex gap-2 flex-wrap animate-fade-in-up" style={{ animationDelay: '150ms' }}>
        {contentTypes.map(t => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95',
              selectedType === t
                ? (typeColors[t] || 'bg-primary text-primary-foreground') + ' ring-2 ring-offset-1 ring-current scale-105'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {t === 'All' ? 'All Types' : t.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </button>
        ))}
        <button
          onClick={() => setShowFilters(f => !f)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 border',
            showFilters ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
          )}
        >
          <SlidersHorizontal className="w-3 h-3" />
          Filters
          {(selectedDept !== 'All' || selectedSem !== 'All') && (
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-scale-in" />
          )}
        </button>
      </div>

      {/* Advanced filters */}
      <div className={cn(
        'sk-card overflow-hidden transition-all duration-300',
        showFilters ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 border-0 shadow-none'
      )}>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wide">Department</label>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            >
              <option value="All">All Departments</option>
              {MOCK_DEPARTMENTS.map(d => <option key={d.id} value={d.name}>{d.code} — {d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wide">Semester</label>
            <select
              value={selectedSem}
              onChange={e => setSelectedSem(e.target.value)}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            >
              {semesters.map(s => <option key={s} value={s}>{s === 'All' ? 'All Semesters' : `Semester ${s}`}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results bar */}
      <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: '200ms' }}>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> resource{filtered.length !== 1 ? 's' : ''} found
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-destructive hover:text-destructive/80 font-medium flex items-center gap-1 transition-all duration-200 hover:scale-105"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 animate-scale-in">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
          <p className="text-muted-foreground text-sm mb-4">Try adjusting your search or filters</p>
          <Button variant="outline" size="sm" onClick={clearAll}>Clear filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {filtered.map((note, i) => (
            <NoteCard key={note.id} note={note} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
