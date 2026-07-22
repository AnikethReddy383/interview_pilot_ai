import { logger } from './logger'

export type AnalyticsEvent =
  | 'resume_uploaded'
  | 'resume_replaced'
  | 'resume_deleted'
  | 'upload_failed'
  | 'preview_opened'
  | 'download_clicked'

interface AnalyticsPayload {
  userId?: string
  fileName?: string
  fileSize?: number
  mimeType?: string
  version?: number
  error?: string
  [key: string]: unknown
}

class AnalyticsService {
  private isDev = import.meta.env.DEV

  track(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
    const timestamp = new Date().toISOString()

    if (this.isDev) {
      logger.info(`[Analytics Event: ${event}]`, { timestamp, ...payload })
    }

    // Extensible hook for external platforms (e.g., window.posthog?.capture(event, payload))
  }
}

export const analytics = new AnalyticsService()
