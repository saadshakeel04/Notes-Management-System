import { AnimatePresence, motion } from 'framer-motion';
import NoteCard from './NoteCard';
import EmptyState from '../common/EmptyState';
import { useNavigate } from 'react-router-dom';

export default function NoteGrid({ notes, emptyState, onEdit }) {
  const navigate = useNavigate();

  if (!notes || notes.length === 0) {
    return <EmptyState {...(emptyState || { icon: null, title: 'No notes', description: '' })} />;
  }

  const pinned = notes.filter((n) => n.isPinned);
  const unpinned = notes.filter((n) => !n.isPinned);

  const handleEdit = onEdit || ((note) => navigate(`/notes/${note.id}`));

  if (pinned.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {unpinned.map((note) => (
            <NoteCard key={note.id} note={note} onEdit={handleEdit} />
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
          Pinned
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800">{pinned.length}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {pinned.map((note) => (
              <NoteCard key={note.id} note={note} onEdit={handleEdit} />
            ))}
          </AnimatePresence>
        </div>
      </div>
      {unpinned.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 mb-3">Others</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {unpinned.map((note) => (
                <NoteCard key={note.id} note={note} onEdit={handleEdit} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
