import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DashboardSkeleton } from './DashboardSkeleton'

describe('DashboardSkeleton Component', () => {
  it('renders skeleton pulse layout elements cleanly', () => {
    render(<DashboardSkeleton />)
    const statusContainers = screen.getAllByRole('status')
    expect(statusContainers.length).toBeGreaterThan(0)
  })
})
