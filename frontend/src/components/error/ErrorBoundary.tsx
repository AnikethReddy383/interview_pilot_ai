import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertOctagon, Copy, Check, RefreshCw, Home, RotateCcw } from 'lucide-react'
import { Button } from '../ui/button'
import { logger } from '../../services/logger'

interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  copied: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    copied: false,
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })
    logger.error('Unhandled React Error Boundary Exception:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, copied: false })
  }

  private handleCopyError = () => {
    const { error, errorInfo } = this.state
    const details = `[CareerForge AI Error Report]
Timestamp: ${new Date().toISOString()}
Error: ${error?.name}: ${error?.message}

Stack:
${error?.stack || 'No stack trace'}

Component Stack:
${errorInfo?.componentStack || 'No component stack'}`

    void navigator.clipboard.writeText(details).then(() => {
      this.setState({ copied: true })
      setTimeout(() => this.setState({ copied: false }), 2500)
    })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
          <section className="w-full max-w-lg rounded-2xl border bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 mb-4">
              <AlertOctagon className="size-6" />
            </div>

            <h1 className="text-xl font-bold tracking-tight">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              An unexpected application error occurred. You can attempt to reload the component, return to the dashboard, or copy the error details for debugging.
            </p>

            {this.state.error && (
              <div className="mt-4 rounded-lg bg-slate-100 p-3 text-left dark:bg-slate-950">
                <p className="font-mono text-xs font-semibold text-red-600 dark:text-red-400 truncate">
                  {this.state.error.name}: {this.state.error.message}
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Button size="sm" onClick={this.handleReset} className="gap-1.5">
                <RotateCcw className="size-4" />
                Try Again
              </Button>

              <Button
                size="sm"
                variant="secondary"
                onClick={() => (window.location.href = '/dashboard')}
                className="gap-1.5"
              >
                <Home className="size-4" />
                Go to Dashboard
              </Button>

              <Button
                size="sm"
                variant="secondary"
                onClick={() => window.location.reload()}
                className="gap-1.5"
              >
                <RefreshCw className="size-4" />
                Refresh Page
              </Button>

              <Button
                size="sm"
                variant="secondary"
                onClick={this.handleCopyError}
                className="gap-1.5"
              >
                {this.state.copied ? (
                  <>
                    <Check className="size-4 text-emerald-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    Copy Error Details
                  </>
                )}
              </Button>
            </div>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}
