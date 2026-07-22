import { describe, it, expect, vi } from 'vitest'
import { downloadStage } from '../services/pipeline/downloadStage'
import { extractStage } from '../services/pipeline/extractStage'
import { normalizeStage } from '../services/pipeline/normalizeStage'
import { sectionDetectStage } from '../services/pipeline/sectionDetectStage'
import { jsonBuildStage } from '../services/pipeline/jsonBuildStage'
import { validateStage } from '../services/pipeline/validateStage'

vi.mock('../../../lib/supabase', () => ({
  supabase: {
    storage: {
      from: vi.fn(() => ({
        download: vi.fn(() =>
          Promise.resolve({
            data: {
              arrayBuffer: () => Promise.resolve(new TextEncoder().encode('Dummy Resume Text').buffer),
            },
            error: null,
          }),
        ),
      })),
    },
  },
}))

vi.mock('../utils/textExtractor', () => ({
  extractTextFromBuffer: vi.fn(() => Promise.resolve('John Doe\njohn@example.com\n\nSKILLS\nReact, TypeScript')),
}))

describe('pipeline stages', () => {
  it('downloadStage retrieves ArrayBuffer from storage', async () => {
    const buffer = await downloadStage('usr-1/resume.pdf')
    expect(buffer.byteLength).toBeGreaterThan(0)
  })

  it('extractStage extracts raw text from document', async () => {
    const buffer = new TextEncoder().encode('Dummy').buffer
    const text = await extractStage(buffer, 'resume.pdf', 'application/pdf')
    expect(text).toContain('John Doe')
  })

  it('normalizeStage normalizes text and computes word/char metrics', () => {
    const raw = 'John   Doe\r\n\r\n\r\nSKILLS:\u00A0React'
    const result = normalizeStage(raw)
    expect(result.normalizedText).toBe('John Doe\n\nSKILLS: React')
    expect(result.wordCount).toBe(4)
    expect(result.characterCount).toBe(23)
  })

  it('sectionDetectStage isolates sections and calculates confidence', () => {
    const text = 'John Doe\n\nTECHNICAL SKILLS\nReact, TS'
    const detected = sectionDetectStage(text)
    expect(detected.sections['skills']).toBe('React, TS')
    expect(detected.sectionConfidence.skills).toBe(0.95)
  })

  it('jsonBuildStage builds structured JSON conforming to schema', () => {
    const header = 'John Doe\njohn@example.com'
    const sections = { skills: 'React, Node' }
    const json = jsonBuildStage(header, sections)
    expect(json.personal.name).toBe('John Doe')
    expect(json.personal.email).toBe('john@example.com')
    expect(json.skills).toEqual(['React', 'Node'])
  })

  it('validateStage generates warnings for missing fields', () => {
    const json = jsonBuildStage('John Doe', {})
    const warnings = validateStage(json)
    expect(warnings.some((w) => w.code === 'MISSING_EMAIL')).toBe(true)
  })
})
