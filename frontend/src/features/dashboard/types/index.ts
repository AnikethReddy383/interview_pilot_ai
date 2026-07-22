import type { ReactNode } from 'react'
import type { FeatureKey } from '../../../config/features'
import type { AppRoute } from '../../../config/routes'

/** A single navigation item rendered in the left sidebar */
export interface NavItem {
  to: AppRoute
  label: string
  icon: ReactNode
  /** If set, the item is gated behind this feature flag */
  featureKey?: FeatureKey
}

export type TrendType = 'positive' | 'negative' | 'neutral'

/** Data shape for a stat card on the dashboard */
export interface StatCardData {
  id: string
  label: string
  value: string
  change: string
  changeType: TrendType
  icon: ReactNode
  featureKey?: FeatureKey
}

/** Data shape for a quick-action card */
export interface QuickActionData {
  id: string
  title: string
  description: string
  icon: ReactNode
  to: AppRoute
  featureKey?: FeatureKey
}

/** A single event in the activity timeline */
export interface ActivityEvent {
  id: string
  title: string
  description: string
  timestamp: string
  icon: ReactNode
  iconColor: string
}

/** Shape for a right-sidebar widget */
export interface SidebarWidgetProps {
  className?: string
}
