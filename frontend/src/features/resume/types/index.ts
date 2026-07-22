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
  raw_text?: string | null
  parsed_resume?: Record<string, unknown> | null
  parse_status?: string
  parser_version?: string | null
  parser_duration_ms?: number | null
  parse_attempts?: number
  last_parse_error?: string | null
  parse_metrics?: {
    words: number
    characters: number
    sectionsDetected: number
    warningsCount: number
  } | null
  uploaded_at: string
  updated_at: string
  parsed_at?: string | null
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
