import { useState, useRef, type ChangeEvent } from 'react'
import { FileText, Eye, Download, RefreshCw, Trash2, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import type { ResumeMetadata } from '../types'
import { formatFileSize } from '../utils/storage'
import { ResumePreviewModal } from './ResumePreviewModal'
import { analytics } from '../../../services/analytics'

interface ResumeCardProps {
  resume: ResumeMetadata
  onReplace: (file: File) => void
  onDelete: () => void
  getDownloadUrl: () => Promise<string | null>
  disabled?: boolean
}

export function ResumeCard({
  resume,
  onReplace,
  onDelete,
  getDownloadUrl,
  disabled = false,
}: ResumeCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const replaceInputRef = useRef<HTMLInputElement>(null)

  const isPdf = resume.mime_type.includes('pdf') || resume.file_name.endsWith('.pdf')
  const uploadedDate = new Date(resume.uploaded_at).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const handleReplaceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onReplace(files[0])
    }
  }

  const handleDownload = async () => {
    analytics.track('download_clicked', { fileName: resume.file_name })
    const url = await getDownloadUrl()
    if (url) {
      const a = document.createElement('a')
      a.href = url
      a.download = resume.file_name
      a.target = '_blank'
      a.click()
    }
  }

  return (
    <>
      <div className="w-full rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all space-y-5">
        {/* Hidden Replace Input */}
        <input
          ref={replaceInputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleReplaceChange}
          className="hidden"
          disabled={disabled}
        />

        {/* Top File Meta Row */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-5 dark:border-slate-800">
          <div className="flex items-start gap-4 min-w-0">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400 shrink-0 shadow-sm">
              <FileText className="size-7" />
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="truncate text-base font-semibold text-slate-900 dark:text-white">
                  {resume.file_name}
                </h3>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  v{resume.version}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <CheckCircle2 className="size-3" />
                  {resume.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>{formatFileSize(resume.file_size)}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" /> Uploaded {uploadedDate}
                </span>
                <span>•</span>
                <span className="font-mono text-[10px] uppercase text-slate-400">
                  {isPdf ? 'PDF' : 'DOCX'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setPreviewOpen(true)}
              disabled={disabled}
              className="gap-1.5"
            >
              <Eye className="size-4" />
              Preview
            </Button>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => void handleDownload()}
              disabled={disabled}
              className="gap-1.5"
            >
              <Download className="size-4" />
              Download
            </Button>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => replaceInputRef.current?.click()}
              disabled={disabled}
              className="gap-1.5"
            >
              <RefreshCw className="size-4" />
              Replace
            </Button>
          </div>

          {/* Delete Action with inline confirm toggle */}
          {confirmDelete ? (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-1.5 dark:bg-red-950/30">
              <span className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1 pl-1">
                <AlertTriangle className="size-3.5" /> Delete resume?
              </span>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white min-h-7 px-2 text-xs"
                onClick={() => {
                  setConfirmDelete(false)
                  onDelete()
                }}
                disabled={disabled}
              >
                Yes, delete
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="min-h-7 px-2 text-xs"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setConfirmDelete(true)}
              disabled={disabled}
              className="gap-1.5 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <Trash2 className="size-4" />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <ResumePreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        resume={resume}
        getDownloadUrl={getDownloadUrl}
      />
    </>
  )
}
