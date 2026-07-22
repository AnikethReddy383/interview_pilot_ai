import { ArrowRight, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { SidebarWidgetProps } from '../types'
import { Card, CardContent } from '../../../components/ui/Card'
import { ROUTES } from '../../../config/routes'
import { cn } from '../../../lib/utils'

export function NextActionWidget({ className }: SidebarWidgetProps) {
  return (
    <Card
      className={cn(
        'border-brand-200 bg-gradient-to-br from-brand-50 to-brand-100/50 dark:border-brand-800 dark:from-brand-950/30 dark:to-slate-900',
        className,
      )}
    >
      <CardContent className="p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Recommended Next
        </h3>

        <div className="mt-2.5 flex items-start gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400">
            <Upload className="size-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Upload your resume
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Start unlocking AI-powered insights.
            </p>
          </div>
        </div>

        <Link
          to={ROUTES.RESUME}
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded dark:text-brand-400 dark:hover:text-brand-300"
        >
          Get started
          <ArrowRight className="size-3" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  )
}
