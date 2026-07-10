import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, description, action, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center text-center py-16 px-4 ${className}`}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-gray-400 dark:text-slate-500" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
