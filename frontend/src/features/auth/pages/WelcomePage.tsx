import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useAuth } from '../AuthProvider'
import { Button } from '../../../components/ui/button'

export function WelcomePage() {
  const { user } = useAuth()
  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'there'

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/8 blur-3xl dark:bg-brand-600/5"
        aria-hidden="true"
      />

      <section className="w-full max-w-lg text-center">
        {/* Brand icon */}
        <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg">
          <Sparkles className="size-7" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Welcome, {displayName}!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400">
          Your account is ready. Let&apos;s customize your workspace so
          CareerForge can deliver the most relevant preparation insights.
        </p>

        <div className="mt-8">
          <Link to="/onboarding/complete-profile">
            <Button size="lg" className="gap-2">
              Set up your profile
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
          Takes less than 30 seconds
        </p>
      </section>
    </main>
  )
}
