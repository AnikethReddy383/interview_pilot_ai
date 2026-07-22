import * as pdfjsLib from 'pdfjs-dist'
import mammoth from 'mammoth'

// Disable pdfjs worker in test/browser environment if worker fails to load dynamically
if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
}

/**
 * Extracts plain text from a PDF document ArrayBuffer.
 */
export async function extractTextFromPdf(arrayBuffer: ArrayBuffer): Promise<string> {
  if (!arrayBuffer || arrayBuffer.byteLength === 0) {
    throw new Error('PDF document is empty or unreadable.')
  }

  try {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
      isEvalSupported: false,
    })

    const pdfDocument = await loadingTask.promise
    const pageTexts: string[] = []

    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum)
      const textContent = await page.getTextContent()
      const pageString = textContent.items
        .map((item) => ('str' in item ? item.str : ''))
        .join(' ')
      pageTexts.push(pageString)
    }

    const fullText = pageTexts.join('\n\n').trim()
    if (!fullText) {
      throw new Error('PDF contains no extractable text (it may be scanned or image-only).')
    }

    return fullText
  } catch (error) {
    if (error instanceof Error && error.message.includes('Password')) {
      throw new Error('PDF document is password protected.')
    }
    if (error instanceof Error) {
      throw new Error(`PDF text extraction failed: ${error.message}`)
    }
    throw new Error('PDF text extraction failed due to an unknown error.')
  }
}

/**
 * Extracts raw text from a DOCX document ArrayBuffer.
 */
export async function extractTextFromDocx(arrayBuffer: ArrayBuffer): Promise<string> {
  if (!arrayBuffer || arrayBuffer.byteLength === 0) {
    throw new Error('DOCX document is empty or unreadable.')
  }

  try {
    const result = await mammoth.extractRawText({ arrayBuffer })
    const text = (result.value || '').trim()

    if (!text) {
      throw new Error('DOCX document contains no text content.')
    }

    return text
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`DOCX text extraction failed: ${error.message}`)
    }
    throw new Error('DOCX text extraction failed due to an unknown error.')
  }
}

/**
 * Detects document type and extracts text from PDF or DOCX ArrayBuffer.
 */
export async function extractTextFromBuffer(
  arrayBuffer: ArrayBuffer,
  fileName: string,
  mimeType: string,
): Promise<string> {
  const isPdf =
    mimeType.toLowerCase().includes('pdf') || fileName.toLowerCase().endsWith('.pdf')
  const isDocx =
    mimeType.toLowerCase().includes('officedocument') ||
    mimeType.toLowerCase().includes('word') ||
    fileName.toLowerCase().endsWith('.docx')

  if (isPdf) {
    return extractTextFromPdf(arrayBuffer)
  }

  if (isDocx) {
    return extractTextFromDocx(arrayBuffer)
  }

  throw new Error(`Unsupported document format for file '${fileName}'. Only PDF and DOCX files are supported.`)
}
