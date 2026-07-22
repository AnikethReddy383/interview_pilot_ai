import { Sparkles } from 'lucide-react'
import { UI_MESSAGES } from '../../constants/messages'
import { DASHBOARD_CONFIG } from '../../constants/dashboard'

export function PageLoader() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Animated branded icon badge */}
        <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/25 animate-pulse">
          <Sparkles className="size-7 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="absolute -inset-1 rounded-2xl bg-brand-500/20 blur-md -z-10" />
        </div>

        {/* Brand title & loading message */}
        <div className="space-y-1">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            {DASHBOARD_CONFIG.BRAND_NAME}
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {UI_MESSAGES.LOADING_WORKSPACE}
          </p>
        </div>

        {/* Subtle loading bar */}
        <div className="h-1 w-32 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-full w-1/2 rounded-full bg-brand-600 animate-[shimmer_1.5s_infinite_linear] bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600" />
        </div>
      </div>
    </div>
  )
}
