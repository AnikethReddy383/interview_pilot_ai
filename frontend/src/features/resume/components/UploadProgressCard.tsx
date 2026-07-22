import { LoaderCircle, FileText } from 'lucide-react'
import { formatFileSize } from '../utils/storage'

interface UploadProgressCardProps {
  fileName: string
  fileSize?: number
  progress: number
}

export function UploadProgressCard({ fileName, fileSize, progress }: UploadProgressCardProps) {
  return (
    <div
      role="status"
      aria-label="Upload progress indicator"
      className="w-full rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4"
    >
      <div className="flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400 shrink-0">
          <FileText className="size-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {fileName}
            </p>
            <span className="text-xs font-semibold tabular-nums text-brand-600 dark:text-brand-400">
              {progress}%
            </span>
          </div>
          {fileSize && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {formatFileSize(fileSize)}
            </p>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <LoaderCircle className="size-3.5 animate-spin text-brand-600" />
          <span>Uploading and encrypting resume file…</span>
        </div>
      </div>
    </div>
  )
}
