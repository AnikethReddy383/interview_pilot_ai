import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ErrorBoundary } from './ErrorBoundary'

function ProblemChild(): React.ReactNode {
  throw new Error('Test Component Failure')
}

describe('ErrorBoundary Component', () => {
  it('renders children normally when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Normal Content</div>
      </ErrorBoundary>,
    )
    expect(screen.getByText('Normal Content')).toBeInTheDocument()
  })

  it('renders fallback error UI when a child throws', () => {
    // Suppress console.error during expected thrown test error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText(/Test Component Failure/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /copy error details/i })).toBeInTheDocument()

    spy.mockRestore()
  })

  it('copies error details to clipboard when copy button is clicked', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Mock navigator.clipboard.writeText
    const writeTextMock = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    })

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    )

    const copyBtn = screen.getByRole('button', { name: /copy error details/i })
    fireEvent.click(copyBtn)

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled()
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })

    spy.mockRestore()
  })
})
