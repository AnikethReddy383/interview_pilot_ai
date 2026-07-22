/**
 * Centralized logging service for CareerForge AI.
 * Abstracts console output for development and provides a clean hook
 * for plugging in production APM tools (e.g., Sentry, LogRocket, Datadog).
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

class Logger {
  private isDevelopment = import.meta.env.DEV

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString()
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`
  }

  info(message: string, ...args: unknown[]) {
    if (this.isDevelopment) {
      console.info(this.formatMessage('info', message), ...args)
    }
  }

  warn(message: string, ...args: unknown[]) {
    console.warn(this.formatMessage('warn', message), ...args)
  }

  error(message: string, error?: unknown, ...args: unknown[]) {
    console.error(this.formatMessage('error', message), error ?? '', ...args)
  }

  debug(message: string, ...args: unknown[]) {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message), ...args)
    }
  }
}

export const logger = new Logger()
