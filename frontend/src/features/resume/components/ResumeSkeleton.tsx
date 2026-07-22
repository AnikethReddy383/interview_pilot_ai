export function ResumeSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading resume status"
      className="w-full rounded-2xl border bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 animate-pulse space-y-6"
    >
      <div className="flex items-center gap-4">
        <div className="size-14 rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-48 rounded bg-slate-100 dark:bg-slate-800" />
          <div className="h-3 w-32 rounded bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <div className="h-9 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
        <div className="h-9 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
        <div className="h-9 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
      </div>
    </div>
  )
}
