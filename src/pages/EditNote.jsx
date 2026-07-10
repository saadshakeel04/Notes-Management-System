import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Archive, Star, Pin } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import NoteForm from '../components/notes/NoteForm';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useState } from 'react';

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNoteById, deleteNote, toggleFavorite, togglePin, toggleArchive } = useNotes();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const note = getNoteById(id);

  if (!note) {
    return (
      <div className="max-w-3xl mx-auto">
        <EmptyState
          icon={Trash2}
          title="Note not found"
          description="This note may have been deleted."
          action={<Link to="/notes" className="btn-base px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm">Back to notes</Link>}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Link to="/notes" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to notes
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(note.id)}
            className={`p-2 rounded-xl transition-colors ${note.isFavorite ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-500' : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 hover:text-amber-400'}`}
          >
            <Star className={`w-4 h-4 ${note.isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
          <button
            onClick={() => togglePin(note.id)}
            className={`p-2 rounded-xl transition-colors ${note.isPinned ? 'bg-brand-100 dark:bg-brand-950/40 text-brand-500' : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 hover:text-brand-400'}`}
          >
            <Pin className={`w-4 h-4 ${note.isPinned ? 'fill-brand-500' : ''}`} />
          </button>
          <button
            onClick={() => { toggleArchive(note.id); navigate('/notes'); }}
            className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 hover:text-teal-500 transition-colors"
          >
            <Archive className="w-4 h-4" />
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card-base p-6 lg:p-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-6">Edit note</h1>
        <NoteForm note={note} />
      </motion.div>

      <ConfirmDialog
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => { deleteNote(note.id); navigate('/notes'); }}
        title="Delete this note?"
        message="It will be moved to trash. You can restore it later."
        confirmLabel="Move to trash"
      />
    </div>
  );
}
