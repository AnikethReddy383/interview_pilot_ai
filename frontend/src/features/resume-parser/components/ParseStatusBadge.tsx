import { CheckCircle2, Clock, AlertTriangle, Loader2, FileCheck } from 'lucide-react'
import type { ParseStatus } from '../types'

interface ParseStatusBadgeProps {
  status: ParseStatus
  className?: string
}

export function ParseStatusBadge({ status, className = '' }: ParseStatusBadgeProps) {
  const normalizedStatus = (status || '').toUpperCase()

  switch (normalizedStatus) {
    case 'UPLOADED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300 ${className}`}
        >
          <Clock className="size-3.5" />
          Uploaded
        </span>
      )

    case 'PARSING':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 ${className}`}
        >
          <Loader2 className="size-3.5 animate-spin text-amber-600" />
          Parsing...
        </span>
      )

    case 'PARSED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 ${className}`}
        >
          <CheckCircle2 className="size-3.5 text-emerald-600" />
          Parsed
        </span>
      )

    case 'PARSE_FAILED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-950/50 dark:text-red-300 ${className}`}
        >
          <AlertTriangle className="size-3.5 text-red-600" />
          Parse Failed
        </span>
      )

    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 ${className}`}
        >
          <FileCheck className="size-3.5" />
          {status}
        </span>
      )
  }
}
