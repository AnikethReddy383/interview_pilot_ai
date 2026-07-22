import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react'
import { createElement } from 'react'

import { MOCK_STATS } from './mockStats'
import { MOCK_QUICK_ACTIONS } from './mockQuickActions'
import { MOCK_ACTIVITY } from './mockActivity'
import { AI_TIPS, MOCK_PROFILE_STEPS } from './mockProfile'

function icon(Icon: LucideIcon, className = 'size-3.5') {
  return createElement(Icon, { className, 'aria-hidden': true })
}

export const PLACEHOLDER_STATS = MOCK_STATS
export const PLACEHOLDER_ACTIONS = MOCK_QUICK_ACTIONS
export const PLACEHOLDER_ACTIVITY = MOCK_ACTIVITY
export { AI_TIPS, MOCK_PROFILE_STEPS }

export const TREND_ICONS = {
  positive: icon(TrendingUp),
  negative: icon(TrendingDown),
  neutral: icon(Minus),
} as const
