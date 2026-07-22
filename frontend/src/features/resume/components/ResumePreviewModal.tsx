import { useEffect, useState } from 'react'
import { X, Download, FileText, ExternalLink, LoaderCircle } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import type { ResumeMetadata } from '../types'
import { analytics } from '../../../services/analytics'

interface ResumePreviewModalProps {
  open: boolean
  onClose: () => void
  resume: ResumeMetadata
  getDownloadUrl: () => Promise<string | null>
}

export function ResumePreviewModal({
  open,
  onClose,
  resume,
  getDownloadUrl,
}: ResumePreviewModalProps) {
  const [url, setUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const isPdf = resume.mime_type.includes('pdf') || resume.file_name.endsWith('.pdf')

  useEffect(() => {
    if (!open) return
    let isMounted = true

    setLoading(true)
    void getDownloadUrl().then((signedUrl) => {
      if (isMounted) {
        setUrl(signedUrl)
        setLoading(false)
        analytics.track('preview_opened', {
          fileName: resume.file_name,
          mimeType: resume.mime_type,
        })
      }
    })

    return () => {
      isMounted = false
    }
  }, [open, getDownloadUrl, resume])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 flex h-[85vh] w-full max-w-4xl flex-col rounded-2xl border bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b px-4 lg:px-6 dark:border-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <FileText className="size-5 text-brand-600 shrink-0" />
            <h2 id="preview-modal-title" className="truncate text-base font-semibold text-slate-900 dark:text-white">
              {resume.file_name}
            </h2>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              v{resume.version}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {url && (
              <a href={url} download={resume.file_name} target="_blank" rel="noreferrer">
                <Button variant="secondary" size="sm" className="gap-1.5">
                  <Download className="size-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </a>
            )}
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close preview modal">
              <X className="size-5" />
            </Button>
          </div>
        </div>

        {/* Content Viewer Body */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950 relative flex items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center gap-3 text-slate-500">
              <LoaderCircle className="size-7 animate-spin text-brand-600" />
              <p className="text-sm font-medium">Generating secure preview link…</p>
            </div>
          ) : url && isPdf ? (
            <iframe
              src={url}
              title={`Preview of ${resume.file_name}`}
              className="h-full w-full border-none"
            />
          ) : (
            <div className="p-8 text-center max-w-md space-y-4">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 shadow-sm border">
                <FileText className="size-7 text-brand-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  DOCX Document Preview
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct inline preview is available for PDF files. You can download or open the DOCX file directly in your preferred editor.
                </p>
              </div>
              {url && (
                <a href={url} target="_blank" rel="noreferrer" className="inline-block">
                  <Button className="gap-2">
                    <ExternalLink className="size-4" />
                    Open / Download DOCX
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
