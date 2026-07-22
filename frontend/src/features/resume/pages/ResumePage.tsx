import { AlertCircle, FileText, Info, ShieldCheck, Sparkles, X } from 'lucide-react'
import { useResumeUpload } from '../hooks/useResumeUpload'
import { Dropzone } from '../components/Dropzone'
import { ResumeCard } from '../components/ResumeCard'
import { UploadProgressCard } from '../components/UploadProgressCard'
import { ResumeSkeleton } from '../components/ResumeSkeleton'
import { ParsedResumeView, type ResumeDatabaseRecord } from '../../resume-parser'

export function ResumePage() {
  const {
    resume,
    loading,
    uploading,
    progress,
    error,
    uploadFile,
    replaceFile,
    deleteFile,
    getDownloadUrl,
    clearError,
    reload,
  } = useResumeUpload()

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="size-6 text-brand-600" />
            Resume Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Upload your professional resume to unlock AI career feedback and ATS optimization.
          </p>
        </div>

        {resume && (
          <div className="inline-flex items-center gap-1.5 rounded-xl border bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>Active Resume Verified</span>
          </div>
        )}
      </div>

      {/* Dismissible Error Notification Alert */}
      {error && (
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/40 text-red-800 dark:text-red-300 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold">Upload Error</h4>
              <p className="text-xs mt-0.5 text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
          <button
            onClick={clearError}
            className="text-red-500 hover:text-red-700 dark:text-red-400"
            aria-label="Dismiss error notification"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Dynamic Content Body */}
      {loading ? (
        <ResumeSkeleton />
      ) : uploading ? (
        <UploadProgressCard
          fileName={resume?.file_name || 'Resume Document'}
          progress={progress}
        />
      ) : resume ? (
        <div className="space-y-6">
          <ResumeCard
            resume={resume}
            onReplace={(file) => void replaceFile(file)}
            onDelete={() => void deleteFile()}
            getDownloadUrl={getDownloadUrl}
          />
          <ParsedResumeView
            resume={resume as unknown as ResumeDatabaseRecord}
            onParseComplete={() => void reload()}
          />
        </div>
      ) : (
        <Dropzone onFileSelect={(file) => void uploadFile(file)} />
      )}

      {/* Guidelines & Support Callout */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex items-start gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400 shrink-0 mt-0.5">
            <Info className="size-5" />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              Upload Guidelines
            </h4>
            <p className="text-slate-500 dark:text-slate-400">
              Only standard PDF (`.pdf`) or Word (`.docx`) documents under 5 MB are accepted. Executables, images, and archives are rejected.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex items-start gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 shrink-0 mt-0.5">
            <Sparkles className="size-5" />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              Privacy & Encryption
            </h4>
            <p className="text-slate-500 dark:text-slate-400">
              Your resume is securely encrypted in Supabase Storage with strict Row-Level Security. Only you have access to view or delete your document.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
