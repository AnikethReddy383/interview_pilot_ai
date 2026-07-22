/**
 * Constants for Resume Upload feature.
 * Single source of truth for validation limits, storage buckets, and status states.
 */

export const BUCKET_NAME = 'resumes'

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const

export const ALLOWED_EXTENSIONS = ['.pdf', '.docx'] as const

export const RESUME_STATUS = {
  UPLOADING: 'uploading',
  UPLOADED: 'uploaded',
  PARSING: 'parsing',
  READY: 'ready',
  FAILED: 'failed',
} as const

export type ResumeStatus = (typeof RESUME_STATUS)[keyof typeof RESUME_STATUS]
