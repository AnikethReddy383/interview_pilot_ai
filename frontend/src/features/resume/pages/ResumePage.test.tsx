import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ResumePage } from './ResumePage'

vi.mock('../hooks/useResumeUpload', () => ({
  useResumeUpload: vi.fn(),
}))

import { useResumeUpload } from '../hooks/useResumeUpload'

describe('ResumePage Component', () => {
  it('renders loading skeleton state when loading', () => {
    vi.mocked(useResumeUpload).mockReturnValue({
      resume: null,
      loading: true,
      uploading: false,
      progress: 0,
      error: null,
      uploadFile: vi.fn(),
      replaceFile: vi.fn(),
      deleteFile: vi.fn(),
      getDownloadUrl: vi.fn(),
      clearError: vi.fn(),
      reload: vi.fn(),
    })

    render(
      <MemoryRouter>
        <ResumePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('status', { name: /loading resume status/i })).toBeInTheDocument()
  })

  it('renders Dropzone empty state when no resume exists', () => {
    vi.mocked(useResumeUpload).mockReturnValue({
      resume: null,
      loading: false,
      uploading: false,
      progress: 0,
      error: null,
      uploadFile: vi.fn(),
      replaceFile: vi.fn(),
      deleteFile: vi.fn(),
      getDownloadUrl: vi.fn(),
      clearError: vi.fn(),
      reload: vi.fn(),
    })

    render(
      <MemoryRouter>
        <ResumePage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Drag and drop your resume here')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /browse file/i })).toBeInTheDocument()
  })

  it('renders ResumeCard when an active resume exists', () => {
    vi.mocked(useResumeUpload).mockReturnValue({
      resume: {
        id: 'res-10',
        user_id: 'usr-1',
        file_name: 'John_Doe_Software_Engineer.pdf',
        storage_path: 'usr-1/resume.pdf',
        file_size: 2048000,
        mime_type: 'application/pdf',
        file_hash: 'hash-abc',
        version: 2,
        uploaded_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'uploaded',
      },
      loading: false,
      uploading: false,
      progress: 0,
      error: null,
      uploadFile: vi.fn(),
      replaceFile: vi.fn(),
      deleteFile: vi.fn(),
      getDownloadUrl: vi.fn(),
      clearError: vi.fn(),
      reload: vi.fn(),
    })

    render(
      <MemoryRouter>
        <ResumePage />
      </MemoryRouter>,
    )

    expect(screen.getByText('John_Doe_Software_Engineer.pdf')).toBeInTheDocument()
    expect(screen.getByText('v2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /preview/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /replace/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })
})
