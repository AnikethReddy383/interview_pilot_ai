import type { ReactNode } from 'react'
import { isFeatureEnabled, type FeatureKey } from '../../config/features'
import { TREND_ICONS } from '../../features/dashboard/data/placeholders'
import { Lock } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import type { TrendType } from '../../features/dashboard/types'
import { cn } from '../../lib/utils'

interface StatCardProps {
  label: string
  value: string
  change: string
  changeType: TrendType
  icon: ReactNode
  featureKey?: FeatureKey
  className?: string
}

const badgeVariantsMap: Record<TrendType, 'emerald' | 'red' | 'secondary'> = {
  positive: 'emerald',
  negative: 'red',
  neutral: 'secondary',
}

export function StatCard({
  label,
  value,
  change,
  changeType,
  icon,
  featureKey,
  className,
}: StatCardProps) {
  const locked = featureKey ? !isFeatureEnabled(featureKey) : false

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all hover:shadow-md',
        locked && 'opacity-75',
        className,
      )}
      aria-disabled={locked ? 'true' : undefined}
    >
      {/* Decorative corner glow */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br from-brand-100/40 to-transparent dark:from-brand-900/20"
        aria-hidden="true"
      />

      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div
            className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400"
            aria-hidden="true"
          >
            {locked ? <Lock className="size-4" /> : icon}
          </div>
          <Badge variant={badgeVariantsMap[changeType]} className="text-[11px] font-medium">
            {TREND_ICONS[changeType]}
            <span>{change}</span>
          </Badge>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {locked ? '—' : value}
          </p>
          <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            {label}
          </p>
        </div>

        {locked && (
          <p className="mt-2 text-[10px] font-medium text-slate-400 dark:text-slate-500">
            Coming soon
          </p>
        )}
      </CardContent>
    </Card>
  )
}
