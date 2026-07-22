import { Link } from 'react-router-dom'
import { ArrowRight, Play, TrendingUp, Target } from 'lucide-react'
import { Button } from '../../components/ui/button'

function MetricCard({ label, value, change, icon: Icon, color }: {
  label: string
  value: string
  change: string
  icon: typeof TrendingUp
  color: string
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</span>
        <span className={`flex size-7 items-center justify-center rounded-lg ${color}`}>
          <Icon className="size-3.5" />
        </span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <p className="text-xl font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-white">{value}</p>
        <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">{change}</p>
      </div>
    </div>
  )
}

function DashboardMockup() {
  return (
    <div className="relative" aria-hidden="true">
      {/* Background Glow effects */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-brand-600/30 to-violet-600/30 blur-xl opacity-70 animate-pulse-slow" />
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20 blur-2xl opacity-50" />

      {/* Dashboard shell */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-red-400" />
            <span className="size-2 rounded-full bg-amber-400" />
            <span className="size-2 rounded-full bg-emerald-400" />
          </div>
          <div className="mx-auto rounded-md bg-slate-200/50 px-4 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            app.careerforge.ai/dashboard
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Banner notification */}
          <div className="flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50/60 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-950/30 dark:bg-emerald-950/20 dark:text-emerald-300">
            <div className="flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium font-mono text-[10px] tracking-tight">senior_software_engineer.pdf</span>
            </div>
            <span className="font-semibold text-[8px] uppercase tracking-wide bg-emerald-100 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded">Scanned Successfully</span>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              label="ATS Score"
              value="92%"
              change="+14% improved"
              icon={Target}
              color="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            />
            <MetricCard
              label="Resume Score"
              value="87/100"
              change="+9 pts this week"
              icon={TrendingUp}
              color="bg-brand-600/10 text-brand-600 dark:text-indigo-400"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {/* Column Left: ATS Score Trend & Missing Skills */}
            <div className="space-y-3">
              {/* ATS Score Trend */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-900/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Scan Progress History</span>
                <div className="mt-2.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Current Scan</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">92%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">2nd Scan (added Docker)</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-350">81%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span className="line-through">Initial Upload</span>
                    <span>72%</span>
                  </div>
                </div>
              </div>

              {/* Skills Gap list */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-900/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Skills Gaps (Found 3)</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 px-2 py-0.5 text-[9px] font-semibold border border-amber-200/50 dark:border-amber-900/30">Docker</span>
                  <span className="rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 px-2 py-0.5 text-[9px] font-semibold border border-amber-200/50 dark:border-amber-900/30">AWS ECS</span>
                  <span className="rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 px-2 py-0.5 text-[9px] font-semibold border border-amber-200/50 dark:border-amber-900/30">Redis Cache</span>
                </div>
              </div>
            </div>

            {/* Column Right: AI recommendations */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-900/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">AI Recommendations</span>
                <ul className="mt-2 text-xs space-y-1.5">
                  <li className="flex items-start gap-1.5 text-slate-600 dark:text-slate-450">
                    <span className="mt-1.5 size-1 rounded-full bg-brand-600 shrink-0" />
                    <span className="leading-tight text-[11px]">Integrate <strong>Docker</strong> multi-stage container deployment descriptions.</span>
                  </li>
                  <li className="flex items-start gap-1.5 text-slate-600 dark:text-slate-450">
                    <span className="mt-1.5 size-1 rounded-full bg-brand-600 shrink-0" />
                    <span className="leading-tight text-[11px]">Explain <strong>AWS ECS</strong> cloud deployments under experience.</span>
                  </li>
                  <li className="flex items-start gap-1.5 text-slate-600 dark:text-slate-450">
                    <span className="mt-1.5 size-1 rounded-full bg-brand-600 shrink-0" />
                    <span className="leading-tight text-[11px]">Outline <strong>Redis</strong> usage for distributed caching optimization.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400">Keyword Coverage</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">11 / 14</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32">
      {/* Grid Pattern Background */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-slate-200/40 dark:stroke-slate-800/40 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width={32}
            height={32}
            patternUnits="userSpaceOnUse"
            x="50%"
            y={-1}
          >
            <path d="M.5 32V.5H32" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Background radial glow decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-600/10 via-transparent to-violet-500/10 blur-3xl opacity-75 animate-pulse-slow" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[500px] rounded-full bg-gradient-to-tl from-indigo-500/10 via-transparent to-transparent blur-3xl opacity-50" />
      </div>

      {/* Floating Geometric Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block" aria-hidden="true">
        {/* Glowing border circle upper left */}
        <div className="absolute left-[10%] top-[25%] size-24 rounded-full border border-indigo-400/20 bg-indigo-500/5 blur-[2px] animate-float" />
        {/* Glowing square bottom center */}
        <div className="absolute left-[45%] bottom-[15%] size-16 rounded-2xl border border-purple-400/25 bg-purple-500/5 blur-[1px] animate-float-delayed" />
        {/* Small bubble right */}
        <div className="absolute right-[8%] top-[40%] size-12 rounded-full border border-brand-400/10 bg-brand-500/5 blur-[1px] animate-float" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-600/20 bg-brand-600/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700 dark:border-brand-600/30 dark:bg-brand-600/10 dark:text-brand-300">
              <span className="flex size-1.5 rounded-full bg-brand-600" />
              AI-powered preparation workspace
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white leading-none">
              Land More Interviews{' '}
              <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                with AI-driven Tailoring
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              CareerForge AI analyzes your resume, optimizes it for ATS systems, matches you with the right roles, and prepares you for interviews &mdash; all in one calm, private workspace.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Get Started Free
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                  <Play className="size-4" />
                  See How It Works
                </Button>
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
              Free to start &middot; No credit card required &middot; Privacy first
            </p>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="hidden lg:block">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
