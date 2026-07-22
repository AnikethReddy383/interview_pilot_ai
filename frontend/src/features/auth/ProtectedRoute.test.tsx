import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import * as AuthProviderModule from './AuthProvider'
import type { User } from '@supabase/supabase-js'

describe('ProtectedRoute Component', () => {
  it('renders loading status indicator when session is restoring', () => {
    vi.spyOn(AuthProviderModule, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: true,
      sessionExpired: false,
      clearSessionExpired: vi.fn(),
      signOut: vi.fn(),
    })

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    )

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText('Restoring session…')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('redirects to /login when unauthenticated', () => {
    vi.spyOn(AuthProviderModule, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: false,
      sessionExpired: false,
      clearSessionExpired: vi.fn(),
      signOut: vi.fn(),
    })

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('renders children when authenticated user session is active', () => {
    const mockUser = { id: 'usr-123', email: 'test@example.com' } as User

    vi.spyOn(AuthProviderModule, 'useAuth').mockReturnValue({
      user: mockUser,
      session: null,
      loading: false,
      sessionExpired: false,
      clearSessionExpired: vi.fn(),
      signOut: vi.fn(),
    })

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })
})
