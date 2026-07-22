import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LoaderCircle, Mail } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { AuthLayout } from '../AuthLayout'
import { Button } from '../../../components/ui/button'

export function VerificationPendingPage() {
  const location = useLocation()
  const emailFromState = (location.state as { email?: string } | null)?.email

  const [isResending, setResending] = useState(false)
  const [didResend, setDidResend] = useState(false)

  const handleResend = async () => {
    if (isResending || !supabase || !emailFromState) return

    try {
      setResending(true)
      await supabase.auth.resend({
        type: 'signup',
        email: emailFromState,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      })
      setDidResend(true)
    } catch {
      // Silently handle — we don't want to leak info
      setDidResend(true)
    } finally {
      setResending(false)
    }
  }

  return (
    <AuthLayout
      title="Check your email"
      description="We sent a verification link to confirm your account."
    >
      <div className="space-y-6 text-center">
        {/* Animated email icon */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-950/30">
          <Mail className="size-7 text-brand-600 dark:text-brand-400 animate-bounce" />
        </div>

        <div className="space-y-2">
          {emailFromState && (
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {emailFromState}
            </p>
          )}
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Click the link in your email to verify your account. It may take a
            minute to arrive. Check your spam folder if you don&apos;t see it.
          </p>
        </div>

        {/* Resend */}
        {emailFromState && (
          <div>
            {didResend ? (
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Verification email resent successfully.
              </p>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResend}
                disabled={isResending}
              >
                {isResending ? (
                  <>
                    <LoaderCircle className="size-3.5 animate-spin" />
                    Resending…
                  </>
                ) : (
                  'Resend verification email'
                )}
              </Button>
            )}
          </div>
        )}

        <Link
          to="/login"
          className="inline-block text-sm font-medium text-brand-600 hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  )
}
