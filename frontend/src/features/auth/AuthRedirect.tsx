import { Navigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { useAuth } from './AuthProvider'
import type { ReactNode } from 'react'

/**
 * Wraps auth pages (login, register, forgot-password).
 * Redirects already-authenticated users to /dashboard.
 */
export function AuthRedirect({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status">
        <LoaderCircle className="size-5 animate-spin text-brand-600" />
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
