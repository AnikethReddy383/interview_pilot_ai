import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  /** Optional action button */
  action?: {
    label: string
    onClick: () => void
  }
  /** Show a "Coming Soon" badge */
  comingSoon?: boolean
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  comingSoon,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        'rounded-xl border border-dashed bg-white px-6 py-12 text-center dark:bg-slate-900',
        className,
      )}
    >
      <div
        className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-indigo-50 text-brand-600 dark:bg-indigo-950"
        aria-hidden="true"
      >
        {icon}
      </div>

      {comingSoon && (
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
          Coming soon
        </span>
      )}

      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        {description}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          {action.label}
        </button>
      )}
    </section>
  )
}
