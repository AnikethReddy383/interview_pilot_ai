import type { ResumeStatus } from '../constants/resumeConstants'

export interface ResumeMetadata {
  id: string
  user_id: string
  file_name: string
  storage_path: string
  file_size: number
  mime_type: string
  file_hash: string
  version: number
  uploaded_at: string
  updated_at: string
  status: ResumeStatus
}

export interface ValidationResult {
  valid: boolean
  error?: string
}

export interface UploadProgressState {
  loaded: number
  total: number
  percentage: number
}
