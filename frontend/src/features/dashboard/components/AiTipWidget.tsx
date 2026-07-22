import { useState, useMemo } from 'react'
import { Lightbulb, RefreshCw } from 'lucide-react'
import { AI_TIPS } from '../data/placeholders'
import type { SidebarWidgetProps } from '../types'
import { Card, CardContent } from '../../../components/ui/Card'
import { cn } from '../../../lib/utils'

export function AiTipWidget({ className }: SidebarWidgetProps) {
  const [index, setIndex] = useState(
    () => Math.floor(Math.random() * AI_TIPS.length),
  )

  const tip = useMemo(() => AI_TIPS[index], [index])

  const nextTip = () => {
    setIndex((prev) => (prev + 1) % AI_TIPS.length)
  }

  return (
    <Card
      className={cn(
        'bg-gradient-to-br from-brand-50 to-white dark:from-brand-950/20 dark:to-slate-900',
        className,
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Lightbulb
              className="size-3.5 text-amber-500"
              aria-hidden="true"
            />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              AI Tip of the Day
            </h3>
          </div>
          <button
            onClick={nextTip}
            className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            aria-label="Refresh AI tip"
          >
            <RefreshCw className="size-3" />
          </button>
        </div>

        <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {tip}
        </p>
      </CardContent>
    </Card>
  )
}
