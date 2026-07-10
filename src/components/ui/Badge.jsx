export default function Badge({ children, color = 'gray', className = '', dot = false }) {
  const colors = {
    gray: 'bg-gray-100 text-gray-600 dark:bg-slate-700/50 dark:text-slate-400',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
    green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
    red: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
    indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
    pink: 'bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300',
    teal: 'bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300',
  };

  const dotColors = {
    gray: 'bg-gray-400',
    blue: 'bg-blue-400',
    green: 'bg-emerald-400',
    red: 'bg-red-400',
    amber: 'bg-amber-400',
    indigo: 'bg-indigo-400',
    pink: 'bg-pink-400',
    teal: 'bg-teal-400',
    orange: 'bg-orange-400',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.gray} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[color] || dotColors.gray}`} />}
      {children}
    </span>
  );
}
