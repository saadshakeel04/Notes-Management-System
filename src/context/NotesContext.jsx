import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId } from '../utils/helpers';
import { seedNotes } from '../data/seedData';
import { DEFAULT_CATEGORIES } from '../utils/constants';

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useLocalStorage('notely-notes', seedNotes);
  const [categories, setCategories] = useLocalStorage('notely-categories', DEFAULT_CATEGORIES);

  const activeNotes = notes.filter((n) => !n.isArchived && !n.isTrashed);
  const archivedNotes = notes.filter((n) => n.isArchived && !n.isTrashed);
  const trashedNotes = notes.filter((n) => n.isTrashed);
  const favoriteNotes = activeNotes.filter((n) => n.isFavorite);

  const createNote = useCallback((data) => {
    const now = new Date().toISOString();
    const note = {
      id: generateId(),
      title: data.title || 'Untitled',
      content: data.content || '',
      category: data.category || 'personal',
      tags: data.tags || [],
      color: data.color || 'default',
      isFavorite: false,
      isPinned: false,
      isArchived: false,
      isTrashed: false,
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => [note, ...prev]);
    return note;
  }, [setNotes]);

  const updateNote = useCallback((id, updates) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
      )
    );
  }, [setNotes]);

  const deleteNote = useCallback((id) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, isTrashed: true, isArchived: false, trashedAt: new Date().toISOString() }
          : n
      )
    );
  }, [setNotes]);

  const restoreNote = useCallback((id) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isTrashed: false, trashedAt: null } : n
      )
    );
  }, [setNotes]);

  const permanentDelete = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, [setNotes]);

  const emptyTrash = useCallback(() => {
    setNotes((prev) => prev.filter((n) => !n.isTrashed));
  }, [setNotes]);

  const toggleFavorite = useCallback((id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isFavorite: !n.isFavorite, updatedAt: new Date().toISOString() } : n))
    );
  }, [setNotes]);

  const togglePin = useCallback((id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned, updatedAt: new Date().toISOString() } : n))
    );
  }, [setNotes]);

  const toggleArchive = useCallback((id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isArchived: !n.isArchived, updatedAt: new Date().toISOString() } : n))
    );
  }, [setNotes]);

  const getNoteById = useCallback((id) => notes.find((n) => n.id === id), [notes]);

  const addCategory = useCallback((cat) => {
    setCategories((prev) => [...prev, { ...cat, id: cat.id || generateId(), count: 0 }]);
  }, [setCategories]);

  const deleteCategory = useCallback((catId) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    setNotes((prev) =>
      prev.map((n) => (n.category === catId ? { ...n, category: 'personal' } : n))
    );
  }, [setCategories, setNotes]);

  const getStats = useCallback(() => {
    return {
      total: activeNotes.length,
      favorites: favoriteNotes.length,
      archived: archivedNotes.length,
      trashed: trashedNotes.length,
      pinned: activeNotes.filter((n) => n.isPinned).length,
      byCategory: categories.map((c) => ({
        ...c,
        count: activeNotes.filter((n) => n.category === c.id).length,
      })),
    };
  }, [activeNotes, archivedNotes, trashedNotes, favoriteNotes, categories]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        activeNotes,
        archivedNotes,
        trashedNotes,
        favoriteNotes,
        categories,
        createNote,
        updateNote,
        deleteNote,
        restoreNote,
        permanentDelete,
        emptyTrash,
        toggleFavorite,
        togglePin,
        toggleArchive,
        getNoteById,
        addCategory,
        deleteCategory,
        getStats,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}
