import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LoaderCircle, Check } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { AuthLayout } from '../AuthLayout'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'

export function ResetPasswordPage() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isBusy, setBusy] = useState(false)

  const doPasswordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword

  const isPasswordLongEnough = password.length >= 8

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isBusy || !supabase) return

    if (!doPasswordsMatch) {
      setError('Passwords do not match.')
      return
    }

    try {
      setBusy(true)
      setError(null)

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      })
      if (updateError) throw updateError

      setIsSuccess(true)
      setTimeout(() => navigate('/dashboard', { replace: true }), 2000)
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthLayout
      title="Set new password"
      description="Choose a strong password for your workspace."
    >
      {error && (
        <div
          className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300"
          role="alert"
        >
          {error}
        </div>
      )}

      {isSuccess ? (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30">
            <Check className="size-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Password updated
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Redirecting you to your workspace…
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New password */}
          <div>
            <label
              htmlFor="reset-password"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              New password
            </label>
            <div className="relative">
              <Input
                id="reset-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={8}
                required
                autoComplete="new-password"
                autoFocus
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="reset-confirm"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Confirm password
            </label>
            <Input
              id="reset-confirm"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              minLength={8}
              required
              autoComplete="new-password"
            />
            {confirmPassword.length > 0 && !doPasswordsMatch && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                Passwords do not match.
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isBusy || !isPasswordLongEnough || !doPasswordsMatch}
            className="w-full"
          >
            {isBusy ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Updating…
              </>
            ) : (
              'Update password'
            )}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
