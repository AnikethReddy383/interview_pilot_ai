import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Lock } from 'lucide-react'
import { isFeatureEnabled, type FeatureKey } from '../../config/features'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import type { AppRoute } from '../../config/routes'
import { cn } from '../../lib/utils'

interface QuickActionCardProps {
  title: string
  description: string
  icon: ReactNode
  to: AppRoute
  featureKey?: FeatureKey
  className?: string
}

export function QuickActionCard({
  title,
  description,
  icon,
  to,
  featureKey,
  className,
}: QuickActionCardProps) {
  const locked = featureKey ? !isFeatureEnabled(featureKey) : false

  const content = (
    <Card
      className={cn(
        'group relative flex h-full flex-col overflow-hidden transition-all hover:border-brand-200 hover:shadow-md dark:hover:border-brand-800',
        locked &&
          'cursor-not-allowed opacity-60 hover:border-slate-200 hover:shadow-sm dark:hover:border-slate-700',
        className,
      )}
      aria-disabled={locked ? 'true' : undefined}
    >
      <CardContent className="flex flex-1 flex-col p-5">
        {/* Icon */}
        <div
          className={cn(
            'flex size-10 items-center justify-center rounded-lg transition-colors',
            locked
              ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
              : 'bg-brand-50 text-brand-600 group-hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-400 dark:group-hover:bg-brand-950/60',
          )}
          aria-hidden="true"
        >
          {locked ? <Lock className="size-4" /> : icon}
        </div>

        {/* Text */}
        <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {locked ? 'This feature is coming soon.' : description}
        </p>

        {/* Action Link / Locked Indicator */}
        <div className="mt-auto pt-4">
          {!locked ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 transition-transform group-hover:translate-x-0.5 dark:text-brand-400">
              Get started
              <ArrowRight
                className="size-3 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          ) : (
            <Badge variant="amber" className="text-[10px]">
              Coming soon
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )

  if (locked) {
    return <div className="h-full">{content}</div>
  }

  return (
    <Link to={to} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-xl">
      {content}
    </Link>
  )
}
