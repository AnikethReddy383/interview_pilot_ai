import { PLACEHOLDER_ACTIVITY } from '../data/placeholders'
import { Card, CardContent } from '../../../components/ui/Card'

export function ActivityTimeline() {
  return (
    <section aria-label="Recent activity history">
      <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
        Recent Activity
      </h2>
      <Card>
        <CardContent className="p-5">
          <ol className="relative space-y-6">
            {PLACEHOLDER_ACTIVITY.map((event, index) => (
              <li key={event.id} className="relative flex gap-4">
                {/* Timeline vertical connector */}
                {index < PLACEHOLDER_ACTIVITY.length - 1 && (
                  <div
                    className="absolute left-[15px] top-8 h-[calc(100%+0.5rem)] w-px bg-slate-200 dark:bg-slate-700"
                    aria-hidden="true"
                  />
                )}

                {/* Event Icon Dot */}
                <div
                  className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-slate-50 dark:border-slate-900 dark:bg-slate-800 ${event.iconColor}`}
                  aria-hidden="true"
                >
                  {event.icon}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {event.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {event.description}
                  </p>
                  <time className="mt-1 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                    {event.timestamp}
                  </time>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </section>
  )
}
