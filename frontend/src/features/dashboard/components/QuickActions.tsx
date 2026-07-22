import { PLACEHOLDER_ACTIONS } from '../data/placeholders'
import { QuickActionCard } from '../../../shared/cards/QuickActionCard'

export function QuickActions() {
  return (
    <section aria-label="Quick actions">
      <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
        Quick Actions
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLACEHOLDER_ACTIONS.map((action) => (
          <QuickActionCard
            key={action.id}
            title={action.title}
            description={action.description}
            icon={action.icon}
            to={action.to}
            featureKey={action.featureKey}
          />
        ))}
      </div>
    </section>
  )
}
