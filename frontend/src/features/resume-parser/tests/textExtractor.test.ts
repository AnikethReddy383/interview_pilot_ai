import { describe, it, expect, vi } from 'vitest'
import {
  extractTextFromPdf,
  extractTextFromDocx,
  extractTextFromBuffer,
} from '../utils/textExtractor'

// Mock pdfjs-dist and mammoth
vi.mock('pdfjs-dist', () => ({
  GlobalWorkerOptions: { workerSrc: '' },
  version: '4.10.38',
  getDocument: vi.fn((options: { data: Uint8Array }) => {
    if (options.data.length === 0) {
      return { promise: Promise.reject(new Error('Empty buffer')) }
    }
    const text = String.fromCharCode(...options.data)
    if (text.includes('CORRUPTED')) {
      return { promise: Promise.reject(new Error('Corrupted PDF header')) }
    }
    if (text.includes('PASSWORD')) {
      return { promise: Promise.reject(new Error('Password required')) }
    }
    return {
      promise: Promise.resolve({
        numPages: 1,
        getPage: () =>
          Promise.resolve({
            getTextContent: () =>
              Promise.resolve({
                items: [{ str: 'John Doe Resume' }, { str: 'Software Engineer' }],
              }),
          }),
      }),
    }
  }),
}))

vi.mock('mammoth', () => ({
  default: {
    extractRawText: vi.fn(({ arrayBuffer }: { arrayBuffer: ArrayBuffer }) => {
      const text = new TextDecoder().decode(arrayBuffer)
      if (text.includes('CORRUPTED')) {
        return Promise.reject(new Error('Invalid docx structure'))
      }
      return Promise.resolve({ value: 'Jane Smith DOCX Resume Content' })
    }),
  },
}))

describe('textExtractor', () => {
  it('extracts text from valid PDF ArrayBuffer', async () => {
    const encoder = new TextEncoder()
    const buffer = encoder.encode('PDF Sample Content').buffer
    const text = await extractTextFromPdf(buffer)
    expect(text).toContain('John Doe Resume')
    expect(text).toContain('Software Engineer')
  })

  it('handles password protected PDF documents', async () => {
    const encoder = new TextEncoder()
    const buffer = encoder.encode('PASSWORD Protected').buffer
    await expect(extractTextFromPdf(buffer)).rejects.toThrow(/password protected/i)
  })

  it('extracts text from valid DOCX ArrayBuffer', async () => {
    const encoder = new TextEncoder()
    const buffer = encoder.encode('DOCX Content').buffer
    const text = await extractTextFromDocx(buffer)
    expect(text).toBe('Jane Smith DOCX Resume Content')
  })

  it('throws error for empty ArrayBuffer', async () => {
    const emptyBuffer = new ArrayBuffer(0)
    await expect(extractTextFromPdf(emptyBuffer)).rejects.toThrow()
    await expect(extractTextFromDocx(emptyBuffer)).rejects.toThrow()
  })

  it('extracts text through buffer router for pdf and docx', async () => {
    const encoder = new TextEncoder()
    const pdfBuf = encoder.encode('PDF Data').buffer
    const docxBuf = encoder.encode('DOCX Data').buffer

    const pdfText = await extractTextFromBuffer(pdfBuf, 'resume.pdf', 'application/pdf')
    expect(pdfText).toContain('John Doe')

    const docxText = await extractTextFromBuffer(
      docxBuf,
      'resume.docx',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    )
    expect(docxText).toContain('Jane Smith')
  })

  it('throws error for unsupported file extensions', async () => {
    const encoder = new TextEncoder()
    const buf = encoder.encode('Executable data').buffer
    await expect(extractTextFromBuffer(buf, 'app.exe', 'application/x-msdownload')).rejects.toThrow(
      /unsupported document format/i,
    )
  })
})
