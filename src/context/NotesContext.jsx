import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from './AuthContext';

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const { session } = useAuth();
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    if (!session) return;
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) {
      console.error('Error fetching notes:', error);
      return;
    }
    setNotes(data.map(mapDbNote));
  }, [session]);

  const fetchCategories = useCallback(async () => {
    if (!session) return;
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }
    setCategories(data.map(mapDbCategory));
  }, [session]);

  useEffect(() => {
    if (!session) {
      setNotes([]);
      setCategories([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([fetchNotes(), fetchCategories()]).then(() => setLoading(false));
  }, [session]);

  // Seed default categories for new users
  const ensureDefaultCategories = useCallback(async () => {
    if (!session) return;
    const { data } = await supabase.from('categories').select('id').limit(1);
    if (data && data.length === 0) {
      const defaults = [
        { name: 'Personal', color: 'blue' },
        { name: 'Work', color: 'indigo' },
        { name: 'Ideas', color: 'amber' },
        { name: 'Tasks', color: 'green' },
        { name: 'Study', color: 'pink' },
      ];
      await supabase.from('categories').insert(
        defaults.map((d) => ({ ...d, user_id: session.user.id }))
      );
      await fetchCategories();
    }
  }, [session, fetchCategories]);

  useEffect(() => {
    if (session) ensureDefaultCategories();
  }, [session, ensureDefaultCategories]);

  const createNote = useCallback(async (data) => {
    const row = {
      title: data.title || 'Untitled',
      content: data.content || '',
      category: data.category || 'personal',
      tags: data.tags || [],
      color: data.color || 'default',
      is_favorite: data.isFavorite || false,
      is_pinned: data.isPinned || false,
      is_archived: false,
      is_trashed: false,
    };
    const { data: inserted, error } = await supabase.from('notes').insert(row).select().single();
    if (error) { console.error(error); return null; }
    const note = mapDbNote(inserted);
    setNotes((prev) => [note, ...prev]);
    return note;
  }, []);

  const updateNote = useCallback(async (id, updates) => {
    const dbUpdates = {};
    if ('title' in updates) dbUpdates.title = updates.title;
    if ('content' in updates) dbUpdates.content = updates.content;
    if ('category' in updates) dbUpdates.category = updates.category;
    if ('tags' in updates) dbUpdates.tags = updates.tags;
    if ('color' in updates) dbUpdates.color = updates.color;
    if ('isFavorite' in updates) dbUpdates.is_favorite = updates.isFavorite;
    if ('isPinned' in updates) dbUpdates.is_pinned = updates.isPinned;
    if ('isArchived' in updates) dbUpdates.is_archived = updates.isArchived;
    if ('isTrashed' in updates) dbUpdates.is_trashed = updates.isTrashed;
    if ('trashedAt' in updates) dbUpdates.trashed_at = updates.trashedAt;
    dbUpdates.updated_at = new Date().toISOString();

    const { error } = await supabase.from('notes').update(dbUpdates).eq('id', id);
    if (error) { console.error(error); return; }
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates, updatedAt: dbUpdates.updated_at } : n))
    );
  }, []);

  const deleteNote = useCallback(async (id) => {
    await updateNote(id, { isTrashed: true, isArchived: false, trashedAt: new Date().toISOString() });
  }, [updateNote]);

  const restoreNote = useCallback(async (id) => {
    await updateNote(id, { isTrashed: false, trashedAt: null });
  }, [updateNote]);

  const permanentDelete = useCallback(async (id) => {
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) { console.error(error); return; }
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const emptyTrash = useCallback(async () => {
    const trashedIds = notes.filter((n) => n.isTrashed).map((n) => n.id);
    if (trashedIds.length === 0) return;
    const { error } = await supabase.from('notes').delete().in('id', trashedIds);
    if (error) { console.error(error); return; }
    setNotes((prev) => prev.filter((n) => !n.isTrashed));
  }, [notes]);

  const toggleFavorite = useCallback(async (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    await updateNote(id, { isFavorite: !note.isFavorite });
  }, [notes, updateNote]);

  const togglePin = useCallback(async (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    await updateNote(id, { isPinned: !note.isPinned });
  }, [notes, updateNote]);

  const toggleArchive = useCallback(async (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    await updateNote(id, { isArchived: !note.isArchived });
  }, [notes, updateNote]);

  const getNoteById = useCallback((id) => notes.find((n) => n.id === id), [notes]);

  const addCategory = useCallback(async (cat) => {
    const row = { name: cat.name, color: cat.color || 'blue' };
    const { data, error } = await supabase.from('categories').insert(row).select().single();
    if (error) { console.error(error); return; }
    setCategories((prev) => [...prev, mapDbCategory(data)]);
  }, []);

  const deleteCategory = useCallback(async (catId) => {
    const { error } = await supabase.from('categories').delete().eq('id', catId);
    if (error) { console.error(error); return; }
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    setNotes((prev) => prev.map((n) => (n.category === catId ? { ...n, category: 'personal' } : n)));
  }, []);

  const getStats = useCallback(() => {
    const active = notes.filter((n) => !n.isArchived && !n.isTrashed);
    const archived = notes.filter((n) => n.isArchived && !n.isTrashed);
    const trashed = notes.filter((n) => n.isTrashed);
    const favorites = active.filter((n) => n.isFavorite);
    return {
      total: active.length,
      favorites: favorites.length,
      archived: archived.length,
      trashed: trashed.length,
      pinned: active.filter((n) => n.isPinned).length,
      byCategory: categories.map((c) => ({
        ...c,
        count: active.filter((n) => n.category === c.id).length,
      })),
    };
  }, [notes, categories]);

  const activeNotes = notes.filter((n) => !n.isArchived && !n.isTrashed);
  const archivedNotes = notes.filter((n) => n.isArchived && !n.isTrashed);
  const trashedNotes = notes.filter((n) => n.isTrashed);
  const favoriteNotes = activeNotes.filter((n) => n.isFavorite);

  return (
    <NotesContext.Provider
      value={{
        notes,
        activeNotes,
        archivedNotes,
        trashedNotes,
        favoriteNotes,
        categories,
        loading,
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

function mapDbNote(row) {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category,
    tags: row.tags || [],
    color: row.color,
    isFavorite: row.is_favorite,
    isPinned: row.is_pinned,
    isArchived: row.is_archived,
    isTrashed: row.is_trashed,
    trashedAt: row.trashed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapDbCategory(row) {
  return {
    id: row.id,
    name: row.name,
    color: row.color,
    createdAt: row.created_at,
  };
}
