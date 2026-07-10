import { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea(
  { label, error, hint, className = '', rows = 4, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`input-base resize-y ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {hint && !error && <p className="mt-1 text-sm text-gray-400 dark:text-slate-500">{hint}</p>}
    </div>
  );
});

export default Textarea;
