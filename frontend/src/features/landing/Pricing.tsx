import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Establish your application foundation with core analysis tools.',
    features: ['Resume Analysis', 'ATS Compliance Checking', 'Basic Job Matching'],
    cta: 'Get Started Free',
    href: '/register',
    isPrimary: false,
    comingSoon: false,
  },
  {
    name: 'Professional',
    price: '$15',
    period: '/mo',
    description: 'Coming Soon — Deep insights and interview simulations.',
    features: [
      'Everything in Starter',
      'Interactive Mock Interview Simulator',
      'Detailed Skills Gap Recommendations',
      'AI Career Guidance & Insight Logs',
    ],
    cta: 'Coming Soon',
    isPrimary: true,
    comingSoon: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Coming Soon — Collaborative features for universities and bootcamps.',
    features: [
      'Everything in Professional',
      'Team & Organization Workspaces',
      'Bulk Resume Processing Queue',
      'Dedicated Customer Support Manager',
    ],
    cta: 'Coming Soon',
    isPrimary: false,
    comingSoon: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Simple, transparent plans
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Start preparing for your next role for free today. Upgrade when you need more power.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-2xl border p-6 shadow-sm bg-white dark:bg-slate-900 ${
                plan.isPrimary
                  ? 'border-brand-600 ring-1 ring-brand-600 dark:border-brand-500'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1 text-slate-900 dark:text-white">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  {plan.period && <span className="text-sm font-semibold">{plan.period}</span>}
                </div>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>

                <ul className="mt-6 space-y-3" role="list">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="size-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                {plan.comingSoon ? (
                  <Button variant="secondary" className="w-full cursor-not-allowed" disabled>
                    {plan.cta}
                  </Button>
                ) : (
                  <Link to={plan.href || '#'}>
                    <Button variant={plan.isPrimary ? 'default' : 'secondary'} className="w-full">
                      {plan.cta}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
