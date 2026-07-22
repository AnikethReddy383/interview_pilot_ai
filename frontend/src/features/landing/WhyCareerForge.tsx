import { Brain, Sparkles, Award, Zap, Layout, Target } from 'lucide-react'

const reasons = [
  {
    icon: Brain,
    title: 'AI-First Approach',
    description: 'We do not just find keyword matches. We understand the context and intent of your experience.',
  },
  {
    icon: Sparkles,
    title: 'Actionable Insights',
    description: 'Get explicit directions on exactly what to add, edit, or remove from your resume to match expectations.',
  },
  {
    icon: Award,
    title: 'Recruiter-Friendly Suggestions',
    description: 'Recommendations curated by industry recruiters to match the specific patterns hiring teams look for.',
  },
  {
    icon: Zap,
    title: 'Fast Analysis',
    description: 'Complete scans and scores loaded in under 30 seconds, helping you tailor your applications rapidly.',
  },
  {
    icon: Layout,
    title: 'Clean Dashboard',
    description: 'An elegant, distraction-free environment that prioritizes your goals, scores, and next steps.',
  },
  {
    icon: Target,
    title: 'Career-Focused Workflow',
    description: 'A cohesive workflow from resume analysis to targeted mock interview practice, covering the full cycle.',
  },
]

export function WhyCareerForge() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Why CareerForge?
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Built for modern career preparation
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Ditch outdated approaches and general advice. Choose a tool dedicated to privacy, speed, and real outcomes.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <div key={reason.title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {reason.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
