import { COLOR_MAP } from './constants';

export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
}

export function formatFullDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getInitials(name) {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function getColorClasses(colorId) {
  return COLOR_MAP[colorId] || COLOR_MAP.default;
}

export function sortNotes(notes, sortBy) {
  const sorted = [...notes];
  switch (sortBy) {
    case 'updated-desc':
      return sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    case 'created-desc':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'created-asc':
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

export function filterNotes(notes, { search = '', category = 'all', color = 'all', favoritesOnly = false } = {}) {
  return notes.filter((note) => {
    if (favoritesOnly && !note.isFavorite) return false;
    if (category !== 'all' && note.category !== category) return false;
    if (color !== 'all' && note.color !== color) return false;
    if (search) {
      const q = search.toLowerCase();
      const inTitle = note.title?.toLowerCase().includes(q);
      const inContent = note.content?.toLowerCase().includes(q);
      const inTags = note.tags?.some((t) => t.toLowerCase().includes(q));
      if (!inTitle && !inContent && !inTags) return false;
    }
    return true;
  });
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function truncate(text, length = 120) {
  if (!text) return '';
  return text.length > length ? text.slice(0, length).trim() + '…' : text;
}

export function getReadingTime(content) {
  if (!content) return '0 min';
  const words = content.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min`;
}
