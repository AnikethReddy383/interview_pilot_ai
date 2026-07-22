import { Check, X } from 'lucide-react'

const rows = [
  {
    feature: 'Speed of Analysis',
    forge: 'Under 30 seconds',
    traditional: '2 to 5 business days',
    forgeBetter: true,
  },
  {
    feature: 'Optimization Method',
    forge: 'ATS-centric context analysis',
    traditional: 'Manual spelling & format checks',
    forgeBetter: true,
  },
  {
    feature: 'Tailored Job Matching',
    forge: 'Automated skills gap checks',
    traditional: 'Generic, uncustomized advice',
    forgeBetter: true,
  },
  {
    feature: 'Mock Interview Prep',
    forge: 'Interactive conversational simulator',
    traditional: 'Standard, static lists of Q&A',
    forgeBetter: true,
  },
  {
    feature: 'Cost',
    forge: 'Free starter plan',
    traditional: '$100 to $300 per review',
    forgeBetter: true,
  },
  {
    feature: 'Availability',
    forge: '24/7 unlimited access',
    traditional: 'Requires scheduled appointments',
    forgeBetter: true,
  },
]

export function Comparison() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Comparison
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            See the difference
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Compare CareerForge against traditional resume reviews and manual optimization.
          </p>
        </div>

        {/* Desktop View */}
        <div className="mt-16 hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
                <th className="p-5 text-sm font-semibold text-slate-950 dark:text-white">Feature</th>
                <th className="p-5 text-sm font-semibold text-brand-600 dark:text-brand-400 bg-brand-600/5">
                  CareerForge
                </th>
                <th className="p-5 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Traditional Review
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-slate-200 last:border-0 hover:bg-slate-50/50 dark:border-slate-800 dark:hover:bg-slate-900/10"
                >
                  <td className="p-5 text-sm font-medium text-slate-950 dark:text-white">
                    {row.feature}
                  </td>
                  <td className="p-5 text-sm font-medium text-slate-900 dark:text-white bg-brand-600/[0.02] flex items-center gap-2">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    {row.forge}
                  </td>
                  <td className="p-5 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-2">
                      <X className="size-4 text-red-500 shrink-0" />
                      {row.traditional}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="mt-12 md:hidden space-y-6">
          {rows.map((row) => (
            <div
              key={row.feature}
              className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm dark:border-slate-800 dark:bg-slate-950"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
                {row.feature}
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <Check className="size-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-brand-600 dark:text-brand-400">
                      CareerForge:{' '}
                    </span>
                    <span className="text-slate-800 dark:text-slate-200">{row.forge}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-500">Traditional Review:{' '}</span>
                    <span className="text-slate-500 dark:text-slate-400">{row.traditional}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
