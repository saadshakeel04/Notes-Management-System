import { useOutletContext } from 'react-router-dom';
import { Archive, ArchiveRestore } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { sortNotes } from '../utils/helpers';
import NoteGrid from '../components/notes/NoteGrid';
import EmptyState from '../components/common/EmptyState';

export default function ArchivePage() {
  const { search, searchResults } = useOutletContext();
  const { archivedNotes } = useNotes();

  let notes = archivedNotes;
  if (search && searchResults) {
    notes = searchResults.filter((n) => n.isArchived);
  }
  notes = sortNotes(notes, 'updated-desc');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
          <Archive className="w-6 h-6 text-teal-500" />
          Archive
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">{notes.length} archived notes</p>
      </div>
      {notes.length === 0 ? (
        <EmptyState
          icon={Archive}
          title="No archived notes"
          description="Archive notes to declutter your workspace without losing them."
        />
      ) : (
        <NoteGrid notes={notes} />
      )}
    </div>
  );
}
