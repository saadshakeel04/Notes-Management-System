export function NoteCardSkeleton() {
  return (
    <div className="card-base p-5 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-5 w-2/3 bg-gray-200 dark:bg-slate-700 rounded-lg" />
        <div className="h-5 w-5 bg-gray-200 dark:bg-slate-700 rounded-full" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-gray-200 dark:bg-slate-700 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 dark:bg-slate-700 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-gray-200 dark:bg-slate-700 rounded-full" />
        <div className="h-5 w-20 bg-gray-200 dark:bg-slate-700 rounded-full" />
      </div>
    </div>
  );
}

export function NotesGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <NoteCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 dark:bg-slate-700 rounded-lg" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card-base p-5">
            <div className="h-10 w-10 bg-gray-200 dark:bg-slate-700 rounded-xl mb-3" />
            <div className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
        ))}
      </div>
      <div className="card-base p-6">
        <div className="h-5 w-32 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-5 w-5 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-1/2 bg-gray-200 dark:bg-slate-700 rounded" />
                <div className="h-3 w-3/4 bg-gray-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
