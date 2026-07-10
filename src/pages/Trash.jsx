import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Trash2, RotateCcw, X } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { formatDate } from '../utils/helpers';
import EmptyState from '../components/common/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Trash() {
  const { search, searchResults } = useOutletContext();
  const { trashedNotes, restoreNote, permanentDelete, emptyTrash, categories } = useNotes();
  const [confirmEmpty, setConfirmEmpty] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  let notes = trashedNotes;
  if (search && searchResults) {
    notes = searchResults.filter((n) => n.isTrashed);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-red-500" />
            Trash
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">{notes.length} notes in trash</p>
        </div>
        {notes.length > 0 && (
          <Button variant="dangerGhost" size="sm" onClick={() => setConfirmEmpty(true)}>
            <Trash2 className="w-4 h-4" />
            Empty trash
          </Button>
        )}
      </div>

      {notes.length === 0 ? (
        <EmptyState
          icon={Trash2}
          title="Trash is empty"
          description="Deleted notes will appear here for recovery."
        />
      ) : (
        <div className="space-y-2">
          {notes.map((note) => {
            const cat = categories.find((c) => c.id === note.category);
            return (
              <div key={note.id} className="card-base p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-slate-100 truncate">{note.title || 'Untitled'}</h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400 truncate">{note.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {cat && <Badge color={cat.color}>{cat.name}</Badge>}
                    <span className="text-xs text-gray-400 dark:text-slate-500">
                      Deleted {note.trashedAt ? formatDate(note.trashedAt) : formatDate(note.updatedAt)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => restoreNote(note.id)}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors"
                    title="Restore"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(note.id)}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete permanently"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmEmpty}
        onClose={() => setConfirmEmpty(false)}
        onConfirm={() => { emptyTrash(); setConfirmEmpty(false); }}
        title="Empty trash?"
        message="All notes in trash will be permanently deleted. This cannot be undone."
        confirmLabel="Empty trash"
      />
      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => { permanentDelete(confirmDelete); setConfirmDelete(null); }}
        title="Delete permanently?"
        message="This note will be gone forever."
        confirmLabel="Delete"
      />
    </div>
  );
}
