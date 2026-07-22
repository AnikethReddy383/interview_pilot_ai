import { WelcomeSection } from '../components/WelcomeSection'
import { StatsGrid } from '../components/StatsGrid'
import { QuickActions } from '../components/QuickActions'
import { ActivityTimeline } from '../components/ActivityTimeline'
import { ProfileCompletionWidget } from '../components/ProfileCompletionWidget'
import { RecentActivityWidget } from '../components/RecentActivityWidget'
import { AiTipWidget } from '../components/AiTipWidget'
import { NextActionWidget } from '../components/NextActionWidget'
import { RightSidebar } from '../../../shared/sidebar/RightSidebar'

export function DashboardPage() {
  return (
    <div className="flex">
      {/* Main content */}
      <div className="min-w-0 flex-1 space-y-6 p-6 lg:p-8">
        <WelcomeSection />
        <StatsGrid />
        <QuickActions />
        <ActivityTimeline />
      </div>

      {/* Right sidebar (xl only) */}
      <RightSidebar>
        <ProfileCompletionWidget />
        <NextActionWidget />
        <AiTipWidget />
        <RecentActivityWidget />
      </RightSidebar>
    </div>
  )
}
