import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  StickyNote, Star, Archive, Pin, TrendingUp, ArrowRight, Clock, Folder,
} from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { useAuth } from '../context/AuthContext';
import { formatDate, truncate } from '../utils/helpers';
import EmptyState from '../components/common/EmptyState';
import Badge from '../components/ui/Badge';

export default function Dashboard() {
  const { search, searchResults } = useOutletContext();
  const { getStats, activeNotes, categories } = useNotes();
  const { displayName } = useAuth();
  const stats = getStats();

  if (search && searchResults) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
          Search results for "{search}" ({searchResults.length})
        </h2>
        {searchResults.length === 0 ? (
          <EmptyState icon={StickyNote} title="No results" description="Try a different search term." />
        ) : (
          <div className="space-y-2">
            {searchResults.map((note) => (
              <Link key={note.id} to={`/notes/${note.id}`} className="block card-base p-4 hover:shadow-card-hover transition-shadow">
                <h3 className="font-semibold text-gray-900 dark:text-slate-100">{note.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">{truncate(note.content, 100)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  const recentNotes = [...activeNotes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5);
  const pinnedNotes = activeNotes.filter((n) => n.isPinned).slice(0, 3);

  const statCards = [
    { label: 'Total Notes', value: stats.total, icon: StickyNote, color: 'brand', bg: 'bg-brand-100 dark:bg-brand-950/40', text: 'text-brand-600 dark:text-brand-400' },
    { label: 'Favorites', value: stats.favorites, icon: Star, color: 'amber', bg: 'bg-amber-100 dark:bg-amber-950/40', text: 'text-amber-600 dark:text-amber-400' },
    { label: 'Pinned', value: stats.pinned, icon: Pin, color: 'pink', bg: 'bg-pink-100 dark:bg-pink-950/40', text: 'text-pink-600 dark:text-pink-400' },
    { label: 'Archived', value: stats.archived, icon: Archive, color: 'teal', bg: 'bg-teal-100 dark:bg-teal-950/40', text: 'text-teal-600 dark:text-teal-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-display">
          Welcome back, {displayName?.split(' ')[0] || 'there'}!
        </h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">Here's what's happening with your notes.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="card-base p-5"
          >
            <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
              <card.icon className={`w-5 h-5 ${card.text}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{card.value}</div>
            <div className="text-sm text-gray-500 dark:text-slate-400">{card.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent notes */}
        <div className="lg:col-span-2 card-base p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Recent Notes</h2>
            <Link to="/notes" className="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recentNotes.length === 0 ? (
            <EmptyState icon={StickyNote} title="No notes yet" description="Create your first note to get started." action={
              <Link to="/notes/new" className="btn-base px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm">Create Note</Link>
            } />
          ) : (
            <div className="space-y-2">
              {recentNotes.map((note) => {
                const cat = categories.find((c) => c.id === note.category);
                return (
                  <Link
                    key={note.id}
                    to={`/notes/${note.id}`}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        {note.isPinned && <Pin className="w-3 h-3 text-brand-500 fill-brand-500 flex-shrink-0" />}
                        <h3 className="font-medium text-gray-900 dark:text-slate-100 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {note.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-slate-400 truncate">{truncate(note.content, 80)}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        {cat && <Badge color={cat.color}>{cat.name}</Badge>}
                        <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-slate-500">
                          <Clock className="w-3 h-3" />{formatDate(note.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Categories breakdown */}
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Categories</h2>
            <Link to="/categories" className="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium flex items-center gap-1">
              Manage <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {stats.byCategory.map((cat) => (
              <div key={cat.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-${cat.color}-100 dark:bg-${cat.color}-950/40 flex items-center justify-center`}>
                  <Folder className={`w-4 h-4 text-${cat.color}-600 dark:text-${cat.color}-400`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{cat.name}</span>
                    <span className="text-sm text-gray-400 dark:text-slate-500">{cat.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 dark:bg-slate-700/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.total > 0 ? (cat.count / stats.total) * 100 : 0}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full bg-${cat.color}-500`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pinned notes */}
      {pinnedNotes.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Pin className="w-4 h-4 text-brand-500 fill-brand-500" />
            Pinned Notes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map((note) => (
              <Link key={note.id} to={`/notes/${note.id}`} className="card-base p-5 hover:shadow-card-hover transition-shadow">
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">{note.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-2">{truncate(note.content, 100)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
