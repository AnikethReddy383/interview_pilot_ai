import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QuickActions } from './QuickActions'

describe('QuickActions Component', () => {
  it('renders quick action header and cards inside router context', () => {
    render(
      <MemoryRouter>
        <QuickActions />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /quick actions/i })).toBeInTheDocument()
    expect(screen.getByText('Upload Resume')).toBeInTheDocument()
    expect(screen.getByText('Analyze Resume')).toBeInTheDocument()
    expect(screen.getByText('Job Match')).toBeInTheDocument()
    expect(screen.getByText('Interview Questions')).toBeInTheDocument()
  })
})
