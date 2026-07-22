import { useState, useRef, type DragEvent, type ChangeEvent, type KeyboardEvent } from 'react'
import { Upload, FileText, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { validateFileList } from '../utils/validation'

interface DropzoneProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export function Dropzone({ onFileSelect, disabled = false }: DropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [dropError, setDropError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    if (disabled) return

    const files = e.dataTransfer.files
    const validation = validateFileList(files)
    if (!validation.valid) {
      setDropError(validation.error || 'Invalid file dropped.')
      return
    }

    setDropError(null)
    onFileSelect(files[0])
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const validation = validateFileList(files)
    if (!validation.valid) {
      setDropError(validation.error || 'Invalid file selected.')
      return
    }

    setDropError(null)
    onFileSelect(files[0])
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault()
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="w-full space-y-3">
      <div
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label="Upload resume drag and drop zone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`group relative flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
          isDragOver
            ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/20 scale-[0.99]'
            : 'border-slate-300 hover:border-brand-400 bg-white hover:bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900'
        } ${disabled ? 'pointer-events-none opacity-60' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        {/* Upload Icon Badge */}
        <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 mb-4 transition-transform group-hover:scale-110">
          <Upload className="size-7" />
        </div>

        {/* Title and Instruction */}
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Drag and drop your resume here
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
          Upload your resume in PDF or DOCX format to get started.
        </p>

        {/* Browse Button */}
        <div className="mt-5">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              fileInputRef.current?.click()
            }}
          >
            Browse file
          </Button>
        </div>

        {/* Constraints Footer */}
        <div className="mt-6 flex items-center gap-3 text-[11px] font-medium text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1">
            <FileText className="size-3.5" /> PDF or DOCX
          </span>
          <span>•</span>
          <span>Maximum 5 MB</span>
        </div>
      </div>

      {/* Drop Validation Error Alert */}
      {dropError && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 dark:bg-red-950/40 dark:text-red-300">
          <AlertCircle className="size-4 shrink-0" />
          <span>{dropError}</span>
        </div>
      )}
    </div>
  )
}
