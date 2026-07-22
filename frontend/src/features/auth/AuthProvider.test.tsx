import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthProvider'

// Mock supabase client
vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}))

function TestConsumer() {
  const { user, loading, signOut } = useAuth()

  return (
    <div>
      <span data-testid="loading-state">{loading ? 'Loading' : 'Idle'}</span>
      <span data-testid="user-state">{user ? user.email : 'No User'}</span>
      <button onClick={() => void signOut()}>Sign Out</button>
    </div>
  )
}

describe('AuthProvider Component', () => {
  it('provides authentication context to child components', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading-state')).toHaveTextContent('Idle')
    })
    expect(screen.getByTestId('user-state')).toHaveTextContent('No User')
  })
})
