import { useState } from 'react'
import { X } from 'lucide-react'

export function AnnouncementBanner() {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  return (
    <div className="relative bg-brand-600 text-white" role="status">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium sm:px-6 lg:px-8">
        <span className="text-center">
          <span aria-hidden="true" className="mr-1.5">🚀</span>
          New: AI Resume Analysis is coming soon.
        </span>
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute right-3 rounded-md p-1 transition-colors hover:bg-white/20"
          aria-label="Dismiss announcement"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}
