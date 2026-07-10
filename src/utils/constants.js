export const NOTE_COLORS = [
  { id: 'default', label: 'Default', bg: 'bg-white dark:bg-slate-800/60', dot: 'bg-gray-300 dark:bg-slate-600', accent: 'border-gray-200 dark:border-slate-700' },
  { id: 'red', label: 'Red', bg: 'bg-red-50 dark:bg-red-950/30', dot: 'bg-red-400', accent: 'border-red-200 dark:border-red-900/50' },
  { id: 'orange', label: 'Orange', bg: 'bg-orange-50 dark:bg-orange-950/30', dot: 'bg-orange-400', accent: 'border-orange-200 dark:border-orange-900/50' },
  { id: 'amber', label: 'Amber', bg: 'bg-amber-50 dark:bg-amber-950/30', dot: 'bg-amber-400', accent: 'border-amber-200 dark:border-amber-900/50' },
  { id: 'green', label: 'Green', bg: 'bg-emerald-50 dark:bg-emerald-950/30', dot: 'bg-emerald-400', accent: 'border-emerald-200 dark:border-emerald-900/50' },
  { id: 'teal', label: 'Teal', bg: 'bg-teal-50 dark:bg-teal-950/30', dot: 'bg-teal-400', accent: 'border-teal-200 dark:border-teal-900/50' },
  { id: 'blue', label: 'Blue', bg: 'bg-sky-50 dark:bg-sky-950/30', dot: 'bg-sky-400', accent: 'border-sky-200 dark:border-sky-900/50' },
  { id: 'indigo', label: 'Indigo', bg: 'bg-indigo-50 dark:bg-indigo-950/30', dot: 'bg-indigo-400', accent: 'border-indigo-200 dark:border-indigo-900/50' },
  { id: 'pink', label: 'Pink', bg: 'bg-pink-50 dark:bg-pink-950/30', dot: 'bg-pink-400', accent: 'border-pink-200 dark:border-pink-900/50' },
];

export const COLOR_MAP = Object.fromEntries(NOTE_COLORS.map((c) => [c.id, c]));

export const SORT_OPTIONS = [
  { value: 'updated-desc', label: 'Last updated' },
  { value: 'created-desc', label: 'Newest first' },
  { value: 'created-asc', label: 'Oldest first' },
  { value: 'title-asc', label: 'Title A-Z' },
  { value: 'title-desc', label: 'Title Z-A' },
];

export const SIDEBAR_NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { to: '/notes', label: 'All Notes', icon: 'StickyNote' },
  { to: '/favorites', label: 'Favorites', icon: 'Star' },
  { to: '/archive', label: 'Archive', icon: 'Archive' },
  { to: '/trash', label: 'Trash', icon: 'Trash2' },
  { to: '/categories', label: 'Categories', icon: 'Folder' },
];

export const SIDEBAR_SECONDARY_ITEMS = [
  { to: '/profile', label: 'Profile', icon: 'User' },
  { to: '/settings', label: 'Settings', icon: 'Settings' },
];

export const DEFAULT_CATEGORIES = [
  { id: 'personal', name: 'Personal', color: 'blue', count: 0 },
  { id: 'work', name: 'Work', color: 'indigo', count: 0 },
  { id: 'ideas', name: 'Ideas', color: 'amber', count: 0 },
  { id: 'tasks', name: 'Tasks', color: 'green', count: 0 },
  { id: 'study', name: 'Study', color: 'pink', count: 0 },
];
