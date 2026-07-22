import type { ReactNode } from 'react'

interface RightSidebarProps {
  children: ReactNode
}

export function RightSidebar({ children }: RightSidebarProps) {
  return (
    <aside
      className="hidden w-72 shrink-0 border-l bg-white/50 xl:block dark:bg-slate-950/50"
      aria-label="Dashboard widgets"
    >
      <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col gap-4 overflow-y-auto p-4">
        {children}
      </div>
    </aside>
  )
}
