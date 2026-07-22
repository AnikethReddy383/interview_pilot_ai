import type { SidebarWidgetProps } from '../types'
import { PLACEHOLDER_ACTIVITY } from '../data/placeholders'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import { cn } from '../../../lib/utils'

export function RecentActivityWidget({ className }: SidebarWidgetProps) {
  const recentItems = PLACEHOLDER_ACTIVITY.slice(0, 3)

  return (
    <Card className={cn(className)}>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Recent Activity
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-3">
        <ul className="space-y-3" aria-label="Recent activity overview">
          {recentItems.map((event) => (
            <li key={event.id} className="flex items-start gap-2.5">
              <span
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 ${event.iconColor}`}
                aria-hidden="true"
              >
                {event.icon}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">
                  {event.title}
                </p>
                <time className="text-[10px] text-slate-400 dark:text-slate-500">
                  {event.timestamp}
                </time>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
