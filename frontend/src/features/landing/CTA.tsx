import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../../components/ui/button'

export function CTA() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background glow behind container */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
        <div className="h-[450px] w-[700px] rounded-full bg-brand-600/15 dark:bg-brand-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-brand-700 via-indigo-900 to-violet-850 dark:from-slate-900 dark:via-indigo-950 dark:to-violet-950 p-10 text-center sm:p-20 overflow-hidden shadow-2xl">
          {/* Faint grid pattern overlay */}
          <svg className="absolute inset-0 opacity-15 stroke-white/20 [mask-image:radial-gradient(100%_100%_at_center,white,transparent)] h-full w-full" aria-hidden="true">
            <defs>
              <pattern id="cta-grid" width={24} height={24} patternUnits="userSpaceOnUse">
                <path d="M.5 24V.5H24" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>

          {/* Large decorative glow inside the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none size-[400px] rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-brand-200 tracking-wide uppercase">
              <Sparkles className="size-3.5 text-brand-300" />
              Prepare Smarter Today
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {"Forge a resume that recruiters can't ignore"}
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Take the guesswork out of job hunting. Audit your resume against industry standards, identify skills gaps, and optimize your application materials instantly.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center items-center">
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-white text-brand-700 hover:bg-slate-50 font-bold hover:scale-105 transition-all shadow-md">
                  Create Your Free Workspace
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all font-semibold">
                  Sign In
                </Button>
              </Link>
            </div>
            
            <p className="text-xs text-slate-350 pt-2">
              No credit card required &middot; Privacy guaranteed
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
