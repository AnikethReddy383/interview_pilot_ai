import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LoaderCircle, Check } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { AuthLayout } from '../AuthLayout'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'Contains a number', test: (p: string) => /\d/.test(p) },
  { label: 'Contains uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
]

export function RegisterPage() {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isBusy, setBusy] = useState(false)

  const isPasswordValid = PASSWORD_RULES.every((r) => r.test(password))
  const isFormValid =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    isPasswordValid &&
    hasAcceptedTerms &&
    hasAcceptedPrivacy

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isBusy || !supabase || !isFormValid) return

    try {
      setBusy(true)
      setError(null)

      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim() },
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      })
      if (signUpError) throw signUpError

      navigate('/verification-pending', {
        state: { email: email.trim() },
        replace: true,
      })
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
      title="Create your workspace"
      description="Start preparing smarter with AI-powered tools."
    >
      {/* Error */}
      {error && (
        <div
          className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300"
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="register-name"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Full name
          </label>
          <Input
            id="register-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Alex Johnson"
            required
            autoComplete="name"
            autoFocus
            maxLength={120}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="register-email"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email address
          </label>
          <Input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="register-password"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={8}
              required
              autoComplete="new-password"
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

          {/* Password strength indicators */}
          {password.length > 0 && (
            <ul className="mt-2 space-y-1">
              {PASSWORD_RULES.map((rule) => {
                const isPassing = rule.test(password)
                return (
                  <li
                    key={rule.label}
                    className={`flex items-center gap-1.5 text-xs ${
                      isPassing
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <Check
                      className={`size-3 ${isPassing ? 'opacity-100' : 'opacity-30'}`}
                    />
                    {rule.label}
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Terms of Service */}
        <div className="space-y-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-800/30">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={hasAcceptedTerms}
              onChange={(e) => setHasAcceptedTerms(e.target.checked)}
              className="mt-0.5 size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600 dark:border-slate-600"
              required
            />
            <span className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              I agree to the{' '}
              <span className="font-medium text-brand-600 hover:underline cursor-pointer">
                Terms of Service
              </span>
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={hasAcceptedPrivacy}
              onChange={(e) => setHasAcceptedPrivacy(e.target.checked)}
              className="mt-0.5 size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600 dark:border-slate-600"
              required
            />
            <span className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              I agree to the{' '}
              <span className="font-medium text-brand-600 hover:underline cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isBusy || !isFormValid}
          className="w-full"
        >
          {isBusy ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Creating account…
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>

      {/* Login link */}
      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-brand-600 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
