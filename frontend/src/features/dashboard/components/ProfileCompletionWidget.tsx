import type { SidebarWidgetProps } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import { cn } from '../../../lib/utils'

const PROFILE_ITEMS = [
  { label: 'Account created', complete: true },
  { label: 'Email verified', complete: true },
  { label: 'Profile completed', complete: true },
  { label: 'Resume uploaded', complete: false },
  { label: 'First analysis', complete: false },
]

export function ProfileCompletionWidget({ className }: SidebarWidgetProps) {
  const completed = PROFILE_ITEMS.filter((i) => i.complete).length
  const total = PROFILE_ITEMS.length
  const percent = Math.round((completed / total) * 100)

  return (
    <Card className={cn(className)}>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Profile Completion
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-3">
        {/* Accessible Progress bar */}
        <div className="flex items-center gap-3">
          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Profile completion progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{percent}%</span>
        </div>

        {/* Checklist */}
        <ul className="mt-3 space-y-1.5" aria-label="Profile completion items">
          {PROFILE_ITEMS.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-xs">
              <span
                className={cn(
                  'flex size-4 shrink-0 items-center justify-center rounded-full border text-[8px]',
                  item.complete
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                    : 'border-slate-300 dark:border-slate-600',
                )}
                aria-hidden="true"
              >
                {item.complete && '✓'}
              </span>
              <span
                className={cn(
                  item.complete
                    ? 'text-slate-500 line-through dark:text-slate-400'
                    : 'text-slate-700 dark:text-slate-300',
                )}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
