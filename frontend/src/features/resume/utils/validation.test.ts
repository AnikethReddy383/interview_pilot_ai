import { describe, it, expect } from 'vitest'
import { validateResumeFile, validateFileList } from './validation'

describe('Resume File Validation Utility', () => {
  it('accepts valid PDF files under 5MB', () => {
    const validPdf = new File(['sample content'], 'my_resume.pdf', {
      type: 'application/pdf',
    })
    const result = validateResumeFile(validPdf)
    expect(result.valid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('accepts valid DOCX files under 5MB', () => {
    const validDocx = new File(['sample docx content'], 'resume_2026.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    })
    const result = validateResumeFile(validDocx)
    expect(result.valid).toBe(true)
  })

  it('rejects image files (PNG, JPG)', () => {
    const pngFile = new File(['fake png'], 'photo.png', { type: 'image/png' })
    const result = validateResumeFile(pngFile)
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/unsupported file type/i)
  })

  it('rejects executable files (EXE, SH)', () => {
    const exeFile = new File(['binary content'], 'virus.exe', {
      type: 'application/x-msdownload',
    })
    const result = validateResumeFile(exeFile)
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/unsupported file type/i)
  })

  it('rejects zip archives (ZIP)', () => {
    const zipFile = new File(['zip content'], 'resumes.zip', { type: 'application/zip' })
    const result = validateResumeFile(zipFile)
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/unsupported file type/i)
  })

  it('rejects files larger than 5MB', () => {
    // 6 MB file
    const largeBuffer = new Uint8Array(6 * 1024 * 1024)
    const largeFile = new File([largeBuffer], 'large_resume.pdf', {
      type: 'application/pdf',
    })
    const result = validateResumeFile(largeFile)
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/exceeds the maximum allowed limit/i)
  })

  it('rejects empty files (0 bytes)', () => {
    const emptyFile = new File([], 'empty.pdf', { type: 'application/pdf' })
    const result = validateResumeFile(emptyFile)
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/empty/i)
  })

  it('rejects multi-file drag and drop selection in validateFileList', () => {
    const file1 = new File(['content 1'], 'r1.pdf', { type: 'application/pdf' })
    const file2 = new File(['content 2'], 'r2.pdf', { type: 'application/pdf' })
    const result = validateFileList([file1, file2])
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/multiple files detected/i)
  })
})
