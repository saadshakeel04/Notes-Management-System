import { useOutletContext } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { sortNotes } from '../utils/helpers';
import NoteGrid from '../components/notes/NoteGrid';
import EmptyState from '../components/common/EmptyState';

export default function Favorites() {
  const { search, searchResults } = useOutletContext();
  const { favoriteNotes } = useNotes();

  let notes = favoriteNotes;
  if (search && searchResults) {
    notes = searchResults.filter((n) => n.isFavorite);
  }
  notes = sortNotes(notes, 'updated-desc');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
          <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
          Favorites
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">{notes.length} starred notes</p>
      </div>
      {notes.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No favorite notes"
          description="Star a note to find it here quickly."
        />
      ) : (
        <NoteGrid notes={notes} />
      )}
    </div>
  );
}
