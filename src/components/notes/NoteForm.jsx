import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, X, Tag, Folder, Palette, Star, Pin } from 'lucide-react';
import { useNotes } from '../../context/NotesContext';
import { NOTE_COLORS } from '../../utils/constants';
import { getColorClasses } from '../../utils/helpers';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function NoteForm({ note, onSubmit, onCancel }) {
  const { categories, createNote, updateNote } = useNotes();
  const navigate = useNavigate();
  const isEdit = !!note;

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [category, setCategory] = useState(note?.category || 'personal');
  const [color, setColor] = useState(note?.color || 'default');
  const [tags, setTags] = useState(note?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [isFavorite, setIsFavorite] = useState(note?.isFavorite || false);
  const [isPinned, setIsPinned] = useState(note?.isPinned || false);
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase().replace(/\s+/g, '-');
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput('');
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
    if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setSaving(true);
    const data = { title, content, category, color, tags, isFavorite, isPinned };
    try {
      if (isEdit) {
        await updateNote(note.id, data);
      } else {
        await createNote(data);
      }
      if (onSubmit) onSubmit();
      navigate('/notes');
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Color & actions bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {NOTE_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setColor(c.id)}
              className={`w-6 h-6 rounded-full ${c.dot} transition-all ${
                color === c.id ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-gray-400 scale-110' : 'hover:scale-110'
              }`}
              title={c.label}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-xl transition-colors ${isFavorite ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-500' : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 hover:text-amber-400'}`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => setIsPinned(!isPinned)}
            className={`p-2 rounded-xl transition-colors ${isPinned ? 'bg-brand-100 dark:bg-brand-950/40 text-brand-500' : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 hover:text-brand-400'}`}
          >
            <Pin className={`w-4 h-4 ${isPinned ? 'fill-brand-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title..."
        autoFocus
        className="w-full text-2xl font-bold bg-transparent outline-none text-gray-900 dark:text-slate-100 placeholder-gray-300 dark:placeholder-slate-600 font-display"
      />

      {/* Category */}
      <div className="flex items-center gap-2 flex-wrap">
        <Folder className="w-4 h-4 text-gray-400 dark:text-slate-500" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={`transition-all ${category === cat.id ? 'scale-105' : 'opacity-60 hover:opacity-100'}`}
          >
            <Badge color={cat.color} dot>{cat.name}</Badge>
          </button>
        ))}
      </div>

      {/* Content */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing your note..."
        rows={12}
        className="w-full bg-transparent outline-none text-gray-700 dark:text-slate-300 placeholder-gray-300 dark:placeholder-slate-600 resize-none leading-relaxed"
      />

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700">
        <Tag className="w-4 h-4 text-gray-400 dark:text-slate-500 flex-shrink-0" />
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 text-sm px-2.5 py-1 rounded-md bg-brand-100 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300">
            #{tag}
            <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))} className="hover:text-brand-900 dark:hover:text-brand-100">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          onBlur={handleAddTag}
          placeholder={tags.length === 0 ? 'Add tags...' : 'Add another...'}
          className="flex-1 min-w-[100px] bg-transparent outline-none text-sm text-gray-700 dark:text-slate-300 placeholder-gray-400 dark:placeholder-slate-500"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel || (() => navigate(-1))}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" motion disabled={saving || (!title.trim() && !content.trim())}>
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Note'}
        </Button>
      </div>
    </form>
  );
}
