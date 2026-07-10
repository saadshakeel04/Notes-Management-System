import { useState, useMemo, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { sortNotes, filterNotes } from '../utils/helpers';
import { SORT_OPTIONS } from '../utils/constants';
import NoteGrid from '../components/notes/NoteGrid';
import EmptyState from '../components/common/EmptyState';
import { NotesGridSkeleton } from '../components/common/LoadingSkeleton';
import Badge from '../components/ui/Badge';

export default function AllNotes() {
  const { search, searchResults } = useOutletContext();
  const { activeNotes, categories } = useNotes();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('updated-desc');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterColor, setFilterColor] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const notes = useMemo(() => {
    let source = activeNotes;
    if (search && searchResults) source = searchResults;
    const filtered = filterNotes(source, { category: filterCategory, color: filterColor });
    return sortNotes(filtered, sortBy);
  }, [activeNotes, searchResults, search, filterCategory, filterColor, sortBy]);

  const colorFilters = [
    { id: 'all', label: 'All' },
    { id: 'red', label: 'Red' },
    { id: 'orange', label: 'Orange' },
    { id: 'amber', label: 'Amber' },
    { id: 'green', label: 'Green' },
    { id: 'teal', label: 'Teal' },
    { id: 'blue', label: 'Blue' },
    { id: 'indigo', label: 'Indigo' },
    { id: 'pink', label: 'Pink' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">All Notes</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">{notes.length} notes</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters((s) => !s)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
              showFilters || filterCategory !== 'all' || filterColor !== 'all'
                ? 'bg-brand-100 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3.5 pr-9 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors cursor-pointer outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="card-base p-5 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Category</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filterCategory === 'all' ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilterCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        filterCategory === cat.id ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Color</p>
                <div className="flex flex-wrap gap-2">
                  {colorFilters.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setFilterColor(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        filterColor === c.id ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              {(filterCategory !== 'all' || filterColor !== 'all') && (
                <button
                  onClick={() => { setFilterCategory('all'); setFilterColor('all'); }}
                  className="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes grid */}
      {loading ? (
        <NotesGridSkeleton count={6} />
      ) : notes.length === 0 ? (
        <EmptyState
          icon={StickyNote}
          title="No notes found"
          description="Try adjusting your filters or create a new note."
        />
      ) : (
        <NoteGrid notes={notes} />
      )}
    </div>
  );
}
