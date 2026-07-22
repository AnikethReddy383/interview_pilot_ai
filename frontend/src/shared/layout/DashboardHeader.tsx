import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bell,
  LogOut,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  User,
} from 'lucide-react'
import { useAuth } from '../../features/auth/AuthProvider'
import { useTheme } from '../../features/theme/ThemeProvider'
import { Button } from '../../components/ui/button'
import { Avatar } from '../../components/ui/Avatar'
import { ROUTES } from '../../config/routes'

interface DashboardHeaderProps {
  onMenuToggle: () => void
}

export function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()

  const [profileOpen, setProfileOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const fullName = user?.user_metadata?.full_name as string | undefined

  // Close dropdown on outside click or Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setProfileOpen(false)
      searchInputRef.current?.blur()
    }
    // Command Palette shortcut (⌘K or Ctrl+K)
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      searchInputRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileOpen, handleKeyDown])

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-xl dark:bg-slate-950/80">
      <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={onMenuToggle}
          aria-label="Open menu navigation"
        >
          <Menu className="size-5" />
        </Button>

        {/* Brand */}
        <Link
          to={ROUTES.DASHBOARD}
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
            <Sparkles className="size-4" />
          </span>
          <span className="hidden sm:inline">
            CareerForge <span className="text-brand-600">AI</span>
          </span>
        </Link>

        {/* Search Input Placeholder with Keyboard Command Shortcut */}
        <div className="ml-auto flex max-w-sm flex-1 items-center gap-2 rounded-lg border bg-slate-50/50 px-3 py-1.5 text-sm text-slate-400 transition-colors focus-within:border-brand-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-600/20 dark:bg-slate-900/50 dark:focus-within:bg-slate-900 lg:ml-8">
          <Search className="size-4 shrink-0" aria-hidden="true" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search dashboard… (⌘K)"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
            aria-label="Search dashboard"
          />
          {!searchFocused && (
            <kbd className="ml-auto hidden rounded border bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-400 dark:bg-slate-800 sm:inline">
              ⌘K
            </kbd>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggle}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            aria-label="View notifications"
            className="relative"
          >
            <Bell className="size-4" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-brand-600" />
          </Button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center rounded-full p-0.5 transition-shadow hover:ring-2 hover:ring-brand-400/50 focus:outline-none focus:ring-2 focus:ring-brand-600"
              aria-label="User account menu"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <Avatar name={fullName} email={user?.email} size="md" />
            </button>

            {profileOpen && (
              <div
                role="menu"
                aria-orientation="vertical"
                className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-xl border bg-white p-1.5 shadow-lg dark:bg-slate-900"
              >
                <div className="border-b px-3 py-2.5">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {fullName ?? 'User'}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {user?.email}
                  </p>
                </div>
                <Link
                  to={ROUTES.PROFILE}
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <User className="size-4" aria-hidden="true" />
                  Profile
                </Link>
                <button
                  role="menuitem"
                  onClick={() => {
                    setProfileOpen(false)
                    void signOut().then(() => navigate(ROUTES.HOME))
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
