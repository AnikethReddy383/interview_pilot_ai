import {
  MAX_FILE_SIZE_BYTES,
  ALLOWED_MIME_TYPES,
  ALLOWED_EXTENSIONS,
} from '../constants/resumeConstants'
import type { ValidationResult } from '../types'
import { formatFileSize } from './storage'

/**
 * Validates file format, extension, size, and single selection constraints.
 */
export function validateResumeFile(file: File): ValidationResult {
  if (!file) {
    return { valid: false, error: 'No file selected. Please choose a resume to upload.' }
  }

  const fileName = file.name.toLowerCase()
  const extension = fileName.slice(fileName.lastIndexOf('.'))

  // Reject explicitly forbidden types (images, executable, archives)
  if (['.exe', '.zip', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.sh', '.bat'].includes(extension)) {
    return {
      valid: false,
      error: `Unsupported file type (${extension}). Only PDF and DOCX documents are accepted.`,
    }
  }

  // Extension check
  const isExtensionAllowed = (ALLOWED_EXTENSIONS as readonly string[]).includes(extension)
  // MIME type check
  const isMimeAllowed = (ALLOWED_MIME_TYPES as readonly string[]).includes(file.type)

  if (!isExtensionAllowed && !isMimeAllowed) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload a valid PDF (.pdf) or Word document (.docx).',
    }
  }

  // Size limit check (max 5MB)
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size (${formatFileSize(file.size)}) exceeds the maximum allowed limit of ${formatFileSize(MAX_FILE_SIZE_BYTES)}.`,
    }
  }

  // Empty file check
  if (file.size === 0) {
    return {
      valid: false,
      error: 'The selected file is empty. Please choose a valid resume document.',
    }
  }

  return { valid: true }
}

/**
 * Validates drag-and-drop file list for single file requirement.
 */
export function validateFileList(files: FileList | File[]): ValidationResult {
  if (!files || files.length === 0) {
    return { valid: false, error: 'No file selected.' }
  }

  if (files.length > 1) {
    return {
      valid: false,
      error: 'Multiple files detected. Please select or drag a single resume file.',
    }
  }

  return validateResumeFile(files[0])
}
