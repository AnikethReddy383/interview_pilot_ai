import { PLACEHOLDER_STATS } from '../data/placeholders'
import { StatCard } from '../../../shared/cards/StatCard'

export function StatsGrid() {
  return (
    <section aria-label="Dashboard statistics">
      <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
        Overview
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLACEHOLDER_STATS.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            featureKey={stat.featureKey}
          />
        ))}
      </div>
    </section>
  )
}
