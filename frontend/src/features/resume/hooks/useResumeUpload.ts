import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../auth/AuthProvider'
import { resumeService } from '../services/resumeService'
import { validateResumeFile } from '../utils/validation'
import { computeFileHash } from '../utils/storage'
import { analytics } from '../../../services/analytics'
import { logger } from '../../../services/logger'
import type { ResumeMetadata } from '../types'

export function useResumeUpload() {
  const { user } = useAuth()
  const [resume, setResume] = useState<ResumeMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  /**
   * Loads user's active resume on mount or when user changes.
   */
  const loadResume = useCallback(async () => {
    if (!user) {
      setResume(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await resumeService.fetchResume(user.id)
      setResume(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch resume'
      logger.error('Error fetching resume:', err)
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    void loadResume()
  }, [loadResume])

  /**
   * Internal upload routine supporting progress simulation and checksum duplicate detection.
   */
  const performUpload = async (file: File, isReplace = false) => {
    if (!user) {
      setError('You must be logged in to upload a resume.')
      return
    }

    // 1. Validation check
    const validation = validateResumeFile(file)
    if (!validation.valid) {
      setError(validation.error || 'Invalid resume file.')
      analytics.track('upload_failed', { userId: user.id, error: validation.error })
      return
    }

    let interval: ReturnType<typeof setInterval> | undefined

    try {
      setError(null)
      setUploading(true)
      setProgress(10)

      // 2. Compute file hash
      const fileHash = await computeFileHash(file)
      setProgress(30)

      // 3. Duplicate check against existing active resume
      if (resume && resume.file_hash === fileHash && resume.file_size === file.size) {
        setError('This resume is already uploaded.')
        return
      }

      // Simulate upload progress steps for UI responsiveness
      interval = setInterval(() => {
        setProgress((prev) => (prev < 85 ? prev + 15 : prev))
      }, 150)

      // 4. Perform Storage + DB service upload
      const newResume = await resumeService.uploadResume(user.id, file, fileHash, resume)

      if (interval) clearInterval(interval)
      setProgress(100)

      if (newResume) {
        setResume(newResume)

        // 5. Analytics tracking
        analytics.track(isReplace ? 'resume_replaced' : 'resume_uploaded', {
          userId: user.id,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          version: newResume.version ?? 1,
        })
      }
    } catch (err) {
      if (interval) clearInterval(interval)
      const message = err instanceof Error ? err.message : 'Upload failed. Please try again.'
      logger.error('Error uploading resume:', err)
      setError(message)
      analytics.track('upload_failed', { userId: user.id, error: message })
    } finally {
      if (interval) clearInterval(interval)
      setUploading(false)
      setProgress(0)
    }
  }

  /**
   * Uploads a new resume file.
   */
  const uploadFile = async (file: File) => {
    await performUpload(file, false)
  }

  /**
   * Replaces current resume file with a new document (increments version).
   */
  const replaceFile = async (file: File) => {
    await performUpload(file, true)
  }

  /**
   * Deletes active resume file from storage and metadata record.
   */
  const deleteFile = async () => {
    if (!user || !resume) return

    try {
      setLoading(true)
      setError(null)
      await resumeService.deleteResume(user.id, resume.id, resume.storage_path)

      analytics.track('resume_deleted', {
        userId: user.id,
        fileName: resume.file_name,
        version: resume.version,
      })

      setResume(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete resume.'
      logger.error('Error deleting resume:', err)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Fetches signed download URL.
   */
  const getDownloadUrl = async (): Promise<string | null> => {
    if (!resume) return null
    try {
      return await resumeService.getDownloadUrl(resume.storage_path)
    } catch (err) {
      logger.error('Error getting download URL:', err)
      setError('Failed to generate file link.')
      return null
    }
  }

  const clearError = () => setError(null)

  return {
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
    reload: loadResume,
  }
}
