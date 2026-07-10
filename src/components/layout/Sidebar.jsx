import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, StickyNote, Star, Archive, Trash2, Folder,
  User, Settings, X, Plus, Sparkles,
} from 'lucide-react';
import { SIDEBAR_NAV_ITEMS, SIDEBAR_SECONDARY_ITEMS } from '../../utils/constants';
import { useNotes } from '../../context/NotesContext';
import { useAuth } from '../../context/AuthContext';

const ICONS = {
  LayoutDashboard, StickyNote, Star, Archive, Trash2, Folder, User, Settings,
};

export default function Sidebar({ isOpen, onClose }) {
  const { getStats } = useNotes();
  const { user } = useAuth();
  const stats = getStats();

  const navCounts = {
    '/dashboard': null,
    '/notes': stats.total,
    '/favorites': stats.favorites,
    '/archive': stats.archived,
    '/trash': stats.trashed,
    '/categories': null,
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 z-40 flex flex-col bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5">
          <NavLink to="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white font-display">Notely</span>
          </NavLink>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Note button */}
        <div className="px-4 mb-4">
          <NavLink
            to="/notes/new"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm transition-colors shadow-sm hover:shadow-glow"
          >
            <Plus className="w-4 h-4" />
            New Note
          </NavLink>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 no-scrollbar">
          <p className="px-3 mb-2 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Menu</p>
          <div className="space-y-1">
            {SIDEBAR_NAV_ITEMS.map((item) => {
              const Icon = ICONS[item.icon] || StickyNote;
              const count = navCounts[item.to];
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                        : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                    }`
                  }
                >
                  <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {count != null && count > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-700/50 text-gray-500 dark:text-slate-400">
                      {count}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          <p className="px-3 mt-6 mb-2 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Account</p>
          <div className="space-y-1">
            {SIDEBAR_SECONDARY_ITEMS.map((item) => {
              const Icon = ICONS[item.icon] || User;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                        : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                    }`
                  }
                >
                  <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* User card */}
        <div className="p-3 border-t border-gray-100 dark:border-slate-800">
          <NavLink to="/profile" onClick={onClose} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white font-semibold flex items-center justify-center text-sm">
              {(user?.name || 'U').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-400 dark:text-slate-500 truncate">{user?.email || ''}</p>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
