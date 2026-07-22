import { useEffect, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { ROUTES } from '../../config/routes'
import { SIDEBAR_ROUTES } from '../../config/routeConfig'

interface LeftSidebarProps {
  open: boolean
  onClose: () => void
}

export function LeftSidebar({ open, onClose }: LeftSidebarProps) {
  const location = useLocation()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    },
    [open, onClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      {/* Backdrop for mobile */}
      {open && (
        <button
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-label="Close menu backdrop"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white pt-14 transition-transform duration-200 ease-out dark:bg-slate-950 lg:sticky lg:top-14 lg:z-auto lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        aria-label="Main sidebar navigation"
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-end px-3 py-2 lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close sidebar navigation"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="space-y-0.5">
            {SIDEBAR_ROUTES.map(({ path, title, icon: Icon }) => {
              const isActive =
                location.pathname === path ||
                (path !== ROUTES.DASHBOARD && location.pathname.startsWith(`${path}/`))

              return (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={onClose}
                    className={`group flex min-h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {Icon && (
                      <Icon
                        className={`size-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-brand-600 dark:text-brand-400'
                            : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                    {title}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer info */}
        <div className="border-t px-4 py-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-600">
            CareerForge AI v0.4
          </p>
        </div>
      </aside>
    </>
  )
}
