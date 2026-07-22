import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { DashboardHeader } from './DashboardHeader'
import { DashboardFooter } from './DashboardFooter'
import { LeftSidebar } from '../sidebar/LeftSidebar'

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <DashboardHeader onMenuToggle={() => setSidebarOpen((v) => !v)} />

      <div className="flex flex-1">
        <LeftSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content — Outlet renders the matched child route */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>

      <DashboardFooter />
    </div>
  )
}
