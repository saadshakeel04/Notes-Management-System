import { useState, useCallback, useMemo } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { useNotes } from '../context/NotesContext';
import { filterNotes } from '../utils/helpers';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/notes': 'All Notes',
  '/notes/new': 'Create Note',
  '/favorites': 'Favorites',
  '/archive': 'Archive',
  '/trash': 'Trash',
  '/categories': 'Categories',
  '/profile': 'Profile',
  '/settings': 'Settings',
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const { activeNotes } = useNotes();

  const handleMenuClick = useCallback(() => setSidebarOpen((o) => !o), []);
  const handleSearchChange = useCallback((v) => setSearch(v), []);

  const searchResults = useMemo(() => {
    if (!search) return null;
    return filterNotes(activeNotes, { search });
  }, [search, activeNotes]);

  const title = PAGE_TITLES[location.pathname] || (location.pathname.startsWith('/notes/') ? 'Edit Note' : '');

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuClick={handleMenuClick}
          search={search}
          onSearchChange={handleSearchChange}
          title={title}
        />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="p-4 lg:p-6 max-w-7xl mx-auto"
            >
              <Outlet context={{ search, searchResults }} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating New Note button (mobile) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-brand-600 text-white shadow-glow flex items-center justify-center z-30"
      >
        <Link to="/notes/new" className="w-full h-full flex items-center justify-center">
          <Plus className="w-6 h-6" />
        </Link>
      </motion.button>
    </div>
  );
}
