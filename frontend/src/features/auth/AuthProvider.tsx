import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'

interface AuthValue {
  user: User | null
  session: Session | null
  loading: boolean
  sessionExpired: boolean
  signOut: () => Promise<void>
  clearSessionExpired: () => void
}

const AuthContext = createContext<AuthValue | undefined>(undefined)

export function useAuth(): AuthValue {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used within an AuthProvider')
  return value
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessionExpired, setSessionExpired] = useState(false)

  const clearSessionExpired = useCallback(() => {
    setSessionExpired(false)
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data } = supabase.auth.onAuthStateChange((event, next) => {
      if (event === 'TOKEN_REFRESHED') {
        setSession(next)
      } else if (event === 'SIGNED_OUT') {
        // If we had a session before and now it's gone, it was an expiry
        setSession((prev) => {
          if (prev && !next) {
            setSessionExpired(true)
          }
          return next
        })
      } else {
        setSession(next)
      }
      setLoading(false)
    })

    return () => data.subscription.unsubscribe()
  }, [])

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut()
    setSession(null)
    setSessionExpired(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        loading,
        sessionExpired,
        signOut,
        clearSessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
