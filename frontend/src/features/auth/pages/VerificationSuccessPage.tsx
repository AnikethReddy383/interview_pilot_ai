import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CheckCircle, LoaderCircle, XCircle } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { AuthLayout } from '../AuthLayout'
import { Button } from '../../../components/ui/button'

type VerifyState = 'loading' | 'success' | 'error'

export function VerificationSuccessPage() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(3)
  const [state, setState] = useState<VerifyState>('loading')
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [errorDescription, setErrorDescription] = useState<string | null>(null)

  useEffect(() => {
    // First check for Supabase error params in the URL hash
    // e.g. #error=access_denied&error_code=otp_expired&error_description=...
    const hashParams = new URLSearchParams(window.location.hash.slice(1))
    const hashError = hashParams.get('error')
    const hashErrorCode = hashParams.get('error_code')
    const hashErrorDesc = hashParams.get('error_description')

    if (hashError || hashErrorCode) {
      setErrorCode(hashErrorCode)
      setErrorDescription(
        hashErrorDesc?.replace(/\+/g, ' ') || null
      )
      setState('error')
      return
    }

    // No error in the hash — wait for Supabase to process the tokens.
    // detectSessionInUrl handles the implicit-flow hash (#access_token=...).
    // We poll getSession() to wait for it.
    const client = supabase
    if (!client) {
      setState('error')
      setErrorDescription('Supabase is not configured.')
      return
    }

    let cancelled = false

    const checkSession = async () => {
      // Give the Supabase client a moment to consume the hash
      // onAuthStateChange fires asynchronously, so we retry a few times
      const maxAttempts = 15
      const delayMs = 400

      for (let i = 0; i < maxAttempts; i++) {
        if (cancelled) return
        const { data } = await client.auth.getSession()
        if (data.session) {
          if (!cancelled) setState('success')
          return
        }
        await new Promise((r) => setTimeout(r, delayMs))
      }

      // Exhausted retries — treat as error
      if (!cancelled) {
        setErrorDescription(
          'Email verification timed out. The link may have expired. Please try again.'
        )
        setState('error')
      }
    }

    // Also listen for auth state changes — this fires when the hash is consumed
    const { data: listener } = client.auth.onAuthStateChange(
      (event, session) => {
        if (
          (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') &&
          session &&
          !cancelled
        ) {
          setState('success')
        }
      }
    )

    void checkSession()

    return () => {
      cancelled = true
      listener.subscription.unsubscribe()
    }
  }, [])

  // Countdown + redirect on success
  useEffect(() => {
    if (state !== 'success') return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/onboarding', { replace: true })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate, state])

  // Loading state
  if (state === 'loading') {
    return (
      <AuthLayout
        title="Verifying email"
        description="Confirming your email address…"
      >
        <div className="space-y-6 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-950/30">
            <LoaderCircle className="size-8 animate-spin text-brand-600 dark:text-brand-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Hang tight…
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We're confirming your email address. This usually takes just a
              moment.
            </p>
          </div>
        </div>
      </AuthLayout>
    )
  }

  // Error state
  if (state === 'error') {
    return (
      <AuthLayout
        title="Verification failed"
        description="We couldn't confirm your email address."
      >
        <div className="space-y-6 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
            <XCircle className="size-8 text-red-600 dark:text-red-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {errorCode === 'otp_expired' ? 'Link expired' : 'Verification failed'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              {errorDescription ||
                'The email verification link is invalid or has expired. Please register again or request a new link.'}
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Link to="/register">
              <Button className="w-full">Create a new account</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="w-full">
                Back to sign in
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    )
  }

  // Success state
  return (
    <AuthLayout
      title="Email verified"
      description="Your account is confirmed and ready to go."
    >
      <div className="space-y-6 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30">
          <CheckCircle className="size-8 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            You&apos;re all set!
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Redirecting to your workspace setup in{' '}
            <span className="font-semibold tabular-nums text-brand-600">
              {countdown}
            </span>
            …
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <LoaderCircle className="size-3.5 animate-spin" />
          <span>Preparing your workspace</span>
        </div>

        <Link
          to="/onboarding"
          className="inline-block text-sm font-medium text-brand-600 hover:underline"
        >
          Continue now →
        </Link>
      </div>
    </AuthLayout>
  )
}
