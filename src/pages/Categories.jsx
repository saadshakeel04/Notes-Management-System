import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Plus, Trash2, StickyNote } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { useNavigate } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import EmptyState from '../components/common/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';

const COLOR_OPTIONS = [
  { id: 'blue', name: 'Blue' },
  { id: 'green', name: 'Green' },
  { id: 'amber', name: 'Amber' },
  { id: 'pink', name: 'Pink' },
  { id: 'indigo', name: 'Indigo' },
  { id: 'teal', name: 'Teal' },
  { id: 'orange', name: 'Orange' },
  { id: 'red', name: 'Red' },
];

export default function Categories() {
  const { categories, activeNotes, addCategory, deleteCategory } = useNotes();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('blue');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await addCategory({ name: newName.trim(), color: newColor });
    setNewName('');
    setNewColor('blue');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Categories</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">Organize your notes into collections</p>
        </div>
        <Button motion size="sm" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" />
          New Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          icon={Folder}
          title="No categories"
          description="Create categories to organize your notes."
          action={<Button motion onClick={() => setShowModal(true)}><Plus className="w-4 h-4" />Create Category</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => {
            const count = activeNotes.filter((n) => n.category === cat.id).length;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="card-base p-5 group hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl bg-${cat.color}-100 dark:bg-${cat.color}-950/40 flex items-center justify-center`}>
                    <Folder className={`w-5 h-5 text-${cat.color}-600 dark:text-${cat.color}-400`} />
                  </div>
                  <button
                    onClick={() => setConfirmDelete(cat.id)}
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-400 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-400 dark:text-slate-500">{count} {count === 1 ? 'note' : 'notes'}</p>
                <div className="mt-4">
                  <button
                    onClick={() => navigate(`/notes?category=${cat.id}`)}
                    className="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium"
                  >
                    View notes →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Category">
        <div className="space-y-4">
          <Input
            label="Category name"
            placeholder="e.g. Travel"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setNewColor(c.id)}
                  className={`w-8 h-8 rounded-full bg-${c.id}-400 transition-all ${
                    newColor === c.id ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ring-gray-400 scale-110' : 'hover:scale-110'
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button motion onClick={handleCreate} disabled={!newName.trim()}>Create</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => { deleteCategory(confirmDelete); setConfirmDelete(null); }}
        title="Delete this category?"
        message="Notes in this category will be moved to Personal."
        confirmLabel="Delete"
      />
    </div>
  );
}
