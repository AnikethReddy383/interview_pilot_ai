import { SkeletonCard } from '../../../shared/cards/SkeletonCard'

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6 lg:p-8" role="status" aria-label="Loading dashboard">
      {/* Welcome skeleton */}
      <div className="space-y-2">
        <div className="h-3 w-32 rounded bg-slate-100 dark:bg-slate-800" />
        <div className="h-8 w-64 rounded bg-slate-100 dark:bg-slate-800" />
        <div className="h-4 w-48 rounded bg-slate-100 dark:bg-slate-800" />
      </div>

      {/* Stats skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={`stat-${i}`} variant="stat" />
        ))}
      </div>

      {/* Actions skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={`action-${i}`} variant="action" />
        ))}
      </div>

      {/* Timeline skeleton */}
      <div className="rounded-xl border bg-white p-5 dark:bg-slate-900">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`timeline-${i}`} className="flex gap-4">
              <div className="size-8 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-slate-100 dark:bg-slate-800" />
                <div className="h-3 w-48 rounded bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
