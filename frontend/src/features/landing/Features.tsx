import { FileText, Sparkles, CheckCircle, MessageSquare, LineChart, LayoutDashboard } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Resume Analysis',
    description: 'Thorough evaluation of your resume formatting, structure, and readability metrics.',
    comingSoon: false,
  },
  {
    icon: Sparkles,
    title: 'ATS Optimization',
    description: 'Compare your resume against popular ATS parser algorithms to guarantee seamless parsing.',
    comingSoon: false,
  },
  {
    icon: CheckCircle,
    title: 'Resume vs Job Match',
    description: 'Find matching skills and critical experience gaps relative to target job descriptions.',
    comingSoon: false,
  },
  {
    icon: MessageSquare,
    title: 'Interview Q&A Generator',
    description: 'Simulate customized, AI-driven behavioral and technical questions based on your background.',
    comingSoon: true,
  },
  {
    icon: LineChart,
    title: 'AI Career Insights',
    description: 'Obtain smart career recommendations and actionable pathways to reach your target job.',
    comingSoon: true,
  },
  {
    icon: LayoutDashboard,
    title: 'Progress Dashboard',
    description: 'Track score metrics and monitor your growth history through a clean, unified dashboard workspace.',
    comingSoon: false,
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Everything you need to prepare
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Explore advanced tools designed to help you stand out and succeed in your job applications.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="relative group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300 hover:-translate-y-1.5 hover:scale-[1.02] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 transition-all duration-350 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="size-5 transition-transform duration-300 group-hover:scale-105" />
                  </span>
                  {feature.comingSoon && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
