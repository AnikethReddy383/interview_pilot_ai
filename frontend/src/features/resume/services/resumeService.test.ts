import { describe, it, expect, vi, beforeEach } from 'vitest'
import { resumeService } from './resumeService'
import { supabase } from '../../../lib/supabase'

vi.mock('../../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
    storage: {
      from: vi.fn(),
    },
  },
}))

describe('ResumeService Supabase Layer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchResume queries resumes table for user_id', async () => {
    const mockSelect = vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        maybeSingle: vi.fn().mockResolvedValue({
          data: { id: 'res-1', file_name: 'test.pdf', version: 1 },
          error: null,
        }),
      }),
    })

    const client = supabase!
    vi.mocked(client.from).mockReturnValue({ select: mockSelect } as unknown as ReturnType<typeof client.from>)

    const result = await resumeService.fetchResume('usr-123')
    expect(result).toEqual({ id: 'res-1', file_name: 'test.pdf', version: 1 })
    expect(client.from).toHaveBeenCalledWith('resumes')
  })

  it('deleteResume removes file from storage bucket and deletes metadata record', async () => {
    const client = supabase!

    const mockRemove = vi.fn().mockResolvedValue({ error: null })
    vi.mocked(client.storage.from).mockReturnValue({ remove: mockRemove } as unknown as ReturnType<typeof client.storage.from>)

    const mockDelete = vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      }),
    })
    vi.mocked(client.from).mockReturnValue({ delete: mockDelete } as unknown as ReturnType<typeof client.from>)

    await resumeService.deleteResume('usr-123', 'res-1', 'usr-123/resume.pdf')
    expect(client.storage.from).toHaveBeenCalledWith('resumes')
    expect(mockRemove).toHaveBeenCalledWith(['usr-123/resume.pdf'])
    expect(client.from).toHaveBeenCalledWith('resumes')
  })
})
