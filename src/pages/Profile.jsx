import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, Edit3, Save, X, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import { formatFullDate } from '../utils/helpers';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Profile() {
  const { displayName, email, user, updateProfile } = useAuth();
  const { getStats } = useNotes();
  const stats = getStats();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(displayName);
  const [bio, setBio] = useState(user?.user_metadata?.bio || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ name, bio });
      setEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const statItems = [
    { label: 'Notes', value: stats.total, color: 'blue' },
    { label: 'Favorites', value: stats.favorites, color: 'amber' },
    { label: 'Pinned', value: stats.pinned, color: 'pink' },
    { label: 'Archived', value: stats.archived, color: 'teal' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Profile</h1>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-base overflow-hidden"
      >
        <div className="h-28 bg-gradient-to-br from-brand-500 to-accent-500" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-12 mb-4">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-500 to-accent-500 text-white font-bold text-3xl flex items-center justify-center ring-4 ring-white dark:ring-slate-800">
              {(displayName || 'U').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
            </div>
            {!editing ? (
              <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
                <Edit3 className="w-4 h-4" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setEditing(false); setName(displayName); setBio(user?.user_metadata?.bio || ''); }}>
                  <X className="w-4 h-4" />
                </Button>
                <Button size="sm" motion onClick={handleSave} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save
                </Button>
              </div>
            )}
          </div>

          {editing ? (
            <div className="space-y-4">
              <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="input-base resize-y"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">{displayName}</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                {email}
              </p>
              {user?.user_metadata?.bio && <p className="mt-3 text-sm text-gray-600 dark:text-slate-300">{user.user_metadata.bio}</p>}
              {user?.created_at && (
                <p className="text-xs text-gray-400 dark:text-slate-500 flex items-center gap-1.5 mt-3">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined {formatFullDate(user.created_at)}
                </p>
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="card-base p-5 text-center"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stat.value}</div>
            <div className="text-sm text-gray-500 dark:text-slate-400 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
