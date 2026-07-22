/**
 * Deterministic storage path generator.
 * Format: resumes/<user-id>/resume.<ext>
 * Eliminates timestamp fragmenting and orphaned files on replacement.
 */
export function getResumeStoragePath(userId: string, fileName: string): string {
  const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase()
  const cleanExt = extension === '.docx' ? 'docx' : 'pdf'
  return `${userId}/resume.${cleanExt}`
}

/**
 * Calculates SHA-256 hash of a file for duplicate detection.
 * Supports fallback for environment compatibility.
 */
export async function computeFileHash(file: File): Promise<string> {
  const arrayBuffer =
    typeof file.arrayBuffer === 'function'
      ? await file.arrayBuffer()
      : await new Response(file).arrayBuffer()

  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Formats byte size into human readable string (KB / MB).
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}
