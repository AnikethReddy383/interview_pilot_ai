import { describe, it, expect } from 'vitest'
import { getResumeStoragePath, formatFileSize, computeFileHash } from './storage'

describe('Storage & Path Helper Utilities', () => {
  it('generates deterministic storage paths without timestamp fragments', () => {
    const pdfPath = getResumeStoragePath('usr-789', 'John_Doe_Resume_2026.pdf')
    expect(pdfPath).toBe('usr-789/resume.pdf')

    const docxPath = getResumeStoragePath('usr-789', 'John_Doe_Resume.DOCX')
    expect(docxPath).toBe('usr-789/resume.docx')
  })

  it('formats byte sizes cleanly', () => {
    expect(formatFileSize(0)).toBe('0 B')
    expect(formatFileSize(1024)).toBe('1 KB')
    expect(formatFileSize(2.5 * 1024 * 1024)).toBe('2.5 MB')
  })

  it('computes SHA-256 hash for file content', async () => {
    const testFile = new File(['hello resume world'], 'test.pdf', { type: 'application/pdf' })
    const hash = await computeFileHash(testFile)
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
    expect(hash.length).toBe(64) // SHA-256 hex length
  })
})
