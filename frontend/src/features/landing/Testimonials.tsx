const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineering Student',
    avatar: 'SC',
    quote: 'CareerForge helped me tailor my resume for my first internship search. The automated gap analysis pointed out missing technologies I had used in coursework but forgot to list. I landed 3 interviews in a week!',
  },
  {
    name: 'Marcus Miller',
    role: 'Frontend Developer',
    avatar: 'MM',
    quote: 'I was sending out dozens of applications with very few call-backs. After scanning my resume here and fixing the ATS formatting errors, my compliance score went from 60% to 92%. The response rate has been night and day.',
  },
  {
    name: 'Elena Rostova',
    role: 'Data Analyst',
    avatar: 'ER',
    quote: 'The simulated mock interviews built so much confidence. Being able to practice custom questions tailored directly to my experience and target roles helped me feel completely ready and relaxed during the real thing.',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Loved by job seekers
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Read how other candidates used CareerForge to stand out, improve their applications, and land offers.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between dark:border-slate-800 dark:bg-slate-950"
            >
              <blockquote className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-600/10 text-brand-600 text-xs font-bold dark:bg-brand-500/10 dark:text-brand-400">
                  {t.avatar}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-950 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
