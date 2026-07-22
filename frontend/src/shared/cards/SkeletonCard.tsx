import { Card, CardContent } from '../../components/ui/Card'
import { cn } from '../../lib/utils'

interface SkeletonCardProps {
  className?: string
  /** Height variant for different card types */
  variant?: 'stat' | 'action' | 'widget'
}

export function SkeletonCard({
  className,
  variant = 'stat',
}: SkeletonCardProps) {
  const heights: Record<string, string> = {
    stat: 'h-[140px]',
    action: 'h-[180px]',
    widget: 'h-[120px]',
  }

  return (
    <Card
      className={cn('relative overflow-hidden', heights[variant], className)}
      role="status"
      aria-label="Loading content"
    >
      <CardContent className="p-5">
        {/* Icon placeholder */}
        <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800" />

        {/* Text lines */}
        <div className="mt-4 space-y-2">
          <div className="h-6 w-16 rounded bg-slate-100 dark:bg-slate-800" />
          <div className="h-3 w-24 rounded bg-slate-100 dark:bg-slate-800" />
        </div>
      </CardContent>

      {/* Shimmer overlay */}
      <div
        className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-slate-800/40"
        aria-hidden="true"
      />
    </Card>
  )
}
