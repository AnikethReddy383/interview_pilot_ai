import { UploadCloud, Search, CheckSquare, Send } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: UploadCloud,
    title: 'Upload Resume',
    description: 'Drop your resume in PDF or DOCX format. Your personal data is securely handled.',
  },
  {
    number: '02',
    icon: Search,
    title: 'AI Analysis',
    description: 'Our algorithms scan your resume for keyword matching, formatting, and structural issues.',
  },
  {
    number: '03',
    icon: CheckSquare,
    title: 'Improve Resume',
    description: 'Follow personalized, step-by-step optimization recommendations to upgrade your scores.',
  },
  {
    number: '04',
    icon: Send,
    title: 'Apply Confidently',
    description: 'Submit an optimized resume perfectly tailored to pass scanners and impress recruiters.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            How It Works
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Four simple steps to success
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            No convoluted setups. Get actionable intelligence on your application material in minutes.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm dark:bg-slate-950 dark:border-slate-800"
              >
                <div className="flex justify-between items-start">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-3xl font-extrabold text-slate-200 dark:text-slate-800 tracking-tight">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
