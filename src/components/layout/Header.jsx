import { Menu, Plus, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import SearchBar from '../ui/SearchBar';
import { useNotes } from '../../context/NotesContext';

export default function Header({ onMenuClick, search, onSearchChange, title }) {
  const { favoriteNotes } = useNotes();

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800">
      <div className="flex items-center gap-3 px-4 lg:px-6 py-3.5">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-300"
        >
          <Menu className="w-5 h-5" />
        </button>

        {title && (
          <h1 className="hidden md:block text-lg font-semibold text-gray-900 dark:text-slate-100 font-display whitespace-nowrap">
            {title}
          </h1>
        )}

        <div className="flex-1 max-w-md mx-auto md:mx-0">
          <SearchBar value={search} onChange={onSearchChange} placeholder="Search notes..." />
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/notes/new"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors shadow-sm hover:shadow-glow"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden lg:inline">New Note</span>
          </Link>

          <button className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 transition-colors">
            <Bell className="w-5 h-5" />
            {favoriteNotes.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
