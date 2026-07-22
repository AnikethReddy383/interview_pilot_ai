import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useResumeUpload } from './useResumeUpload'
import { resumeService } from '../services/resumeService'
import { computeFileHash } from '../utils/storage'
import * as AuthProviderModule from '../../auth/AuthProvider'
import type { User } from '@supabase/supabase-js'

vi.mock('../services/resumeService', () => ({
  resumeService: {
    fetchResume: vi.fn(),
    uploadResume: vi.fn(),
    deleteResume: vi.fn(),
    getDownloadUrl: vi.fn(),
  },
}))

describe('useResumeUpload Hook', () => {
  const mockUser = { id: 'usr-100', email: 'test@example.com' } as User

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(AuthProviderModule, 'useAuth').mockReturnValue({
      user: mockUser,
      session: null,
      loading: false,
      sessionExpired: false,
      clearSessionExpired: vi.fn(),
      signOut: vi.fn(),
    })
  })

  it('fetches existing resume on mount', async () => {
    const mockResume = {
      id: 'res-1',
      user_id: 'usr-100',
      file_name: 'existing.pdf',
      storage_path: 'usr-100/resume.pdf',
      file_size: 1024,
      mime_type: 'application/pdf',
      file_hash: 'hash123',
      version: 1,
      uploaded_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'uploaded' as const,
    }

    vi.mocked(resumeService.fetchResume).mockResolvedValue(mockResume)

    const { result } = renderHook(() => useResumeUpload())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.resume).toEqual(mockResume)
  })

  it('handles validation failure when invalid file is uploaded', async () => {
    vi.mocked(resumeService.fetchResume).mockResolvedValue(null)

    const { result } = renderHook(() => useResumeUpload())

    await waitFor(() => expect(result.current.loading).toBe(false))

    const invalidFile = new File(['invalid'], 'app.exe', { type: 'application/x-msdownload' })

    await act(async () => {
      await result.current.uploadFile(invalidFile)
    })

    expect(result.current.error).toMatch(/unsupported file type/i)
  })

  it('detects duplicate checksum hash and stops upload', async () => {
    const duplicateFile = new File(['sample content'], 'existing.pdf', {
      type: 'application/pdf',
    })
    const fileHash = await computeFileHash(duplicateFile)

    const existingResume = {
      id: 'res-1',
      user_id: 'usr-100',
      file_name: 'existing.pdf',
      storage_path: 'usr-100/resume.pdf',
      file_size: duplicateFile.size,
      mime_type: 'application/pdf',
      file_hash: fileHash,
      version: 1,
      uploaded_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'uploaded' as const,
    }

    vi.mocked(resumeService.fetchResume).mockResolvedValue(existingResume)

    const { result } = renderHook(() => useResumeUpload())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.uploadFile(duplicateFile)
    })

    expect(result.current.error).toBe('This resume is already uploaded.')
    expect(resumeService.uploadResume).not.toHaveBeenCalled()
  })

  it('deletes active resume cleanly', async () => {
    const existingResume = {
      id: 'res-1',
      user_id: 'usr-100',
      file_name: 'existing.pdf',
      storage_path: 'usr-100/resume.pdf',
      file_size: 500,
      mime_type: 'application/pdf',
      file_hash: 'hash99',
      version: 1,
      uploaded_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'uploaded' as const,
    }

    vi.mocked(resumeService.fetchResume).mockResolvedValue(existingResume)
    vi.mocked(resumeService.deleteResume).mockResolvedValue(undefined)

    const { result } = renderHook(() => useResumeUpload())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.deleteFile()
    })

    expect(resumeService.deleteResume).toHaveBeenCalledWith('usr-100', 'res-1', 'usr-100/resume.pdf')
    expect(result.current.resume).toBeNull()
  })
})
