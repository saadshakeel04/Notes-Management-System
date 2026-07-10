import { motion } from 'framer-motion';
import { Settings, Palette, Bell, Shield, LogOut, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeSelector } from '../components/ui/ThemeToggle';
import { useNotes } from '../context/NotesContext';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { notes } = useNotes();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleReset = () => {
    localStorage.removeItem('notely-notes');
    localStorage.removeItem('notely-categories');
    window.location.reload();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
        <Settings className="w-6 h-6" />
        Settings
      </h1>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-base p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950/40 flex items-center justify-center">
            <Palette className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-slate-100">Appearance</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">Choose your preferred theme</p>
          </div>
        </div>
        <ThemeSelector />
      </motion.div>

      {/* Data */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="card-base p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/40 flex items-center justify-center">
            <Database className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-slate-100">Data Management</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">Manage your local data</p>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-slate-700/50">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Total notes stored</p>
            <p className="text-sm text-gray-400 dark:text-slate-500">{notes.length} notes in local storage</p>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-slate-700/50">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Reset all data</p>
            <p className="text-sm text-gray-400 dark:text-slate-500">Delete all notes and restore defaults</p>
          </div>
          <Button variant="dangerGhost" size="sm" onClick={() => setConfirmReset(true)}>
            Reset
          </Button>
        </div>
      </motion.div>

      {/* Account */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-base p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-slate-100">Account</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">Manage your session</p>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-slate-700/50">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">{user?.email}</p>
            <p className="text-sm text-gray-400 dark:text-slate-500">Signed in as {user?.name}</p>
          </div>
          <Button variant="danger" size="sm" onClick={() => setConfirmLogout(true)}>
            <LogOut className="w-4 h-4" />
            Sign out
          </Button>
        </div>
      </motion.div>

      <ConfirmDialog
        isOpen={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        onConfirm={handleLogout}
        title="Sign out?"
        message="You'll need to sign in again to access your notes."
        confirmLabel="Sign out"
      />
      <ConfirmDialog
        isOpen={confirmReset}
        onClose={() => setConfirmReset(false)}
        onConfirm={handleReset}
        title="Reset all data?"
        message="This will permanently delete all your notes and restore the default sample data."
        confirmLabel="Reset everything"
      />
    </div>
  );
}
