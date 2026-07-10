import { motion } from 'framer-motion';
import { Star, Pin, Archive, Trash2, MoreVertical, Folder, Clock } from 'lucide-react';
import Dropdown, { DropdownItem, DropdownSeparator } from '../ui/Dropdown';
import Badge from '../ui/Badge';
import { useNotes } from '../../context/NotesContext';
import { getColorClasses, formatDate, truncate, getReadingTime } from '../../utils/helpers';

export default function NoteCard({ note, onEdit }) {
  const { toggleFavorite, togglePin, toggleArchive, deleteNote, restoreNote, categories } = useNotes();
  const color = getColorClasses(note.color);
  const category = categories.find((c) => c.id === note.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl border ${color.accent} ${color.bg} p-5 shadow-card hover:shadow-card-hover transition-shadow cursor-pointer`}
      onClick={() => onEdit?.(note)}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {note.isPinned && (
            <Pin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0 fill-brand-500" />
          )}
          <h3 className="font-semibold text-gray-900 dark:text-slate-100 truncate text-[15px]">
            {note.title || 'Untitled'}
          </h3>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {note.isFavorite && (
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          )}
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown
              trigger={
                <button className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all">
                  <MoreVertical className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                </button>
              }
            >
              <DropdownItem icon={Star} onClick={() => toggleFavorite(note.id)}>
                {note.isFavorite ? 'Remove favorite' : 'Add to favorites'}
              </DropdownItem>
              <DropdownItem icon={Pin} onClick={() => togglePin(note.id)}>
                {note.isPinned ? 'Unpin' : 'Pin to top'}
              </DropdownItem>
              <DropdownItem icon={Archive} onClick={() => toggleArchive(note.id)}>
                {note.isArchived ? 'Unarchive' : 'Archive'}
              </DropdownItem>
              <DropdownSeparator />
              {note.isTrashed ? (
                <DropdownItem icon={Trash2} onClick={() => restoreNote(note.id)}>
                  Restore
                </DropdownItem>
              ) : (
                <DropdownItem icon={Trash2} danger onClick={() => deleteNote(note.id)}>
                  Move to trash
                </DropdownItem>
              )}
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-gray-600 dark:text-slate-400 line-clamp-3 whitespace-pre-wrap mb-3">
        {truncate(note.content, 160)}
      </p>

      {/* Tags */}
      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {note.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-gray-500 dark:text-slate-400">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
        <div className="flex items-center gap-2">
          {category && (
            <Badge color={category.color} dot>
              {category.name}
            </Badge>
          )}
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-slate-500">
            <Clock className="w-3 h-3" />
            {formatDate(note.updatedAt)}
          </span>
        </div>
        <span className="text-xs text-gray-400 dark:text-slate-500">{getReadingTime(note.content)}</span>
      </div>
    </motion.div>
  );
}
