import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const VARIANTS = {
  primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm hover:shadow-glow',
  secondary: 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-900 dark:text-slate-100',
  ghost: 'hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300',
  outline: 'border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
  dangerGhost: 'hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2.5',
};

const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', className = '', motion: useMotion = false, ...props },
  ref
) {
  const classes = `btn-base ${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || SIZES.md} ${className}`;

  if (useMotion) {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

export default Button;
