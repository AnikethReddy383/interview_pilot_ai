import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoaderCircle, Sparkles, User, Briefcase } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../AuthProvider'
import { Button } from '../../../components/ui/button'

const TARGET_ROLES = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Analyst',
  'Data Scientist',
  'ML Engineer',
  'DevOps Engineer',
  'Product Manager',
  'UX Designer',
  'Other',
]

const EXPERIENCE_LEVELS = [
  { value: 'student', label: 'Student' },
  { value: 'fresher', label: 'Fresher' },
  { value: '1-3', label: '1–3 Years' },
  { value: '3-5', label: '3–5 Years' },
  { value: '5-10', label: '5–10 Years' },
  { value: '10+', label: '10+ Years' },
]

export function CompleteProfilePage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [targetRole, setTargetRole] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isBusy, setBusy] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isBusy || !supabase || !user) return

    try {
      setBusy(true)
      setError(null)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          target_role: targetRole || null,
          experience_level: experienceLevel || null,
          profile_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      navigate('/dashboard', { replace: true })
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

  const handleSkip = async () => {
    if (!supabase || !user) return

    try {
      setBusy(true)
      await supabase
        .from('profiles')
        .update({
          profile_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      navigate('/dashboard', { replace: true })
    } catch {
      navigate('/dashboard', { replace: true })
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/8 blur-3xl dark:bg-brand-600/5"
        aria-hidden="true"
      />

      <section className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md">
            <Sparkles className="size-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Complete your profile
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            This helps CareerForge tailor AI recommendations for your career
            goals.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {error && (
            <div
              className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Target Role */}
            <div>
              <label
                htmlFor="profile-role"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <Briefcase className="size-4 text-brand-600" />
                Target role
              </label>
              <select
                id="profile-role"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="min-h-11 w-full rounded-md border bg-white px-3 text-sm text-slate-950 dark:bg-slate-950 dark:text-white dark:border-slate-700"
              >
                <option value="">Select your target role…</option>
                {TARGET_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                We&apos;ll focus resume analysis and interview prep on this
                role.
              </p>
            </div>

            {/* Experience Level */}
            <div>
              <label
                htmlFor="profile-experience"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <User className="size-4 text-brand-600" />
                Experience level
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {EXPERIENCE_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setExperienceLevel(level.value)}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-all ${
                      experienceLevel === level.value
                        ? 'border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600 dark:bg-brand-950/30 dark:text-brand-300 dark:border-brand-500'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-2">
              <Button type="submit" disabled={isBusy} className="w-full">
                {isBusy ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  'Save and continue'
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleSkip}
                disabled={isBusy}
                className="w-full text-xs"
              >
                Skip for now
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          You can update these anytime from your profile settings.
        </p>
      </section>
    </main>
  )
}
