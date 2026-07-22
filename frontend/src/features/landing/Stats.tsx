const stats = [
  { value: '95%', label: 'Average ATS Improvement', description: 'Matched to target keywords' },
  { value: '500+', label: 'Resumes Analyzed', description: 'Securely processed and optimized' },
  { value: '4×', label: 'Interview Success', description: 'Higher call-back rate on average' },
  { value: '24/7', label: 'AI Assistance', description: 'Instant analysis and feedback' },
]

export function Stats() {
  return (
    <section className="bg-white py-12 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold tracking-tight text-brand-600 sm:text-5xl dark:text-brand-400">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
