import { describe, it, expect, vi, beforeEach } from 'vitest'
import { resumeParserService } from '../services/resumeParserService'
import type { ResumeDatabaseRecord } from '../types'

const mockUpdate = vi.fn(() => ({
  eq: vi.fn(() => ({
    eq: vi.fn(() => Promise.resolve({ error: null })),
  })),
}))

const mockDownload = vi.fn((path: string) => {
  if (path.includes('corrupted')) {
    return Promise.resolve({ data: null, error: { message: 'File read error' } })
  }
  return Promise.resolve({
    data: {
      arrayBuffer: () => Promise.resolve(new TextEncoder().encode('Dummy PDF Text').buffer),
    },
    error: null,
  })
})

vi.mock('../../../lib/supabase', () => ({
  supabase: {
    storage: {
      from: vi.fn(() => ({
        download: mockDownload,
      })),
    },
    from: vi.fn(() => ({
      update: mockUpdate,
    })),
  },
}))

vi.mock('../utils/textExtractor', () => ({
  extractTextFromBuffer: vi.fn((_buf, name) => {
    if (name.includes('corrupted')) {
      return Promise.reject(new Error('Corrupted PDF header'))
    }
    return Promise.resolve(
      'Jane Software Engineer\njane@example.com\n+1 555-987-6543\n\nTECHNICAL SKILLS\nReact, TypeScript\n\nWORK EXPERIENCE\nAcme Corp\nStaff Engineer\n\nACADEMIC BACKGROUND\nStanford University\nB.S. CS 2021',
    )
  }),
}))

describe('resumeParserService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockResume: ResumeDatabaseRecord = {
    id: 'res-100',
    user_id: 'usr-100',
    file_name: 'jane_resume.pdf',
    storage_path: 'usr-100/jane_resume.pdf',
    file_size: 10240,
    mime_type: 'application/pdf',
    file_hash: 'hash123',
    version: 1,
    raw_text: null,
    parsed_resume: null,
    parse_status: 'UPLOADED',
    parser_version: '1.0.0',
    parser_duration_ms: null,
    parse_attempts: 0,
    last_parse_error: null,
    parse_metrics: null,
    uploaded_at: '2026-07-22T00:00:00Z',
    updated_at: '2026-07-22T00:00:00Z',
    parsed_at: null,
  }

  it('runs complete parsing pipeline and returns structured JSON with metrics', async () => {
    const result = await resumeParserService.parseResume(mockResume)

    expect(result.parsedResume.personal.name).toBe('Jane Software Engineer')
    expect(result.parsedResume.personal.email).toBe('jane@example.com')
    expect(result.parsedResume.skills).toEqual(['React', 'TypeScript'])
    expect(result.metrics.words).toBeGreaterThan(0)
    expect(result.metrics.sectionsDetected).toBe(3)
    expect(mockUpdate).toHaveBeenCalled()
  })

  it('handles parsing failure gracefully and updates DB parse_status to PARSE_FAILED', async () => {
    const corruptedResume: ResumeDatabaseRecord = {
      ...mockResume,
      file_name: 'corrupted.pdf',
      storage_path: 'usr-100/corrupted.pdf',
    }

    await expect(resumeParserService.parseResume(corruptedResume)).rejects.toThrow(
      /File read error|Corrupted PDF header/,
    )

    expect(mockUpdate).toHaveBeenCalled()
  })
})
