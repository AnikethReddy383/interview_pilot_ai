import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { isSupabaseConfigured } from '../../lib/supabase'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  description: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      {/* Subtle grid background */}
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full stroke-slate-200/30 dark:stroke-slate-800/30 [mask-image:radial-gradient(60%_60%_at_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="auth-grid"
            width={32}
            height={32}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 32V.5H32" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-grid)" />
      </svg>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/8 blur-3xl dark:bg-brand-600/5"
        aria-hidden="true"
      />

      <section className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 font-semibold tracking-tight"
            aria-label="CareerForge AI home"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md">
              <Sparkles className="size-4" />
            </span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              CareerForge{' '}
              <span className="text-brand-600">AI</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-brand-600 dark:text-slate-500"
          >
            ← Back to home
          </Link>

          <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {description}
          </p>

          {!isSupabaseConfigured && (
            <div
              className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-medium text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200"
              role="alert"
            >
              Supabase is not configured. Add{' '}
              <code className="font-mono text-[11px]">VITE_SUPABASE_URL</code> and{' '}
              <code className="font-mono text-[11px]">VITE_SUPABASE_ANON_KEY</code>{' '}
              to your environment.
            </div>
          )}

          <div className="mt-6">{children}</div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} CareerForge AI · Privacy guaranteed
        </p>
      </section>
    </main>
  )
}
