import { useMemo } from 'react'
import { useAuth } from '../../auth/AuthProvider'

function getGreeting(date: Date): string {
  const hour = date.getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function WelcomeSection() {
  const { user } = useAuth()

  const now = useMemo(() => new Date(), [])
  const greeting = useMemo(() => getGreeting(now), [now])
  const formattedDate = useMemo(() => formatDate(now), [now])

  const fullName = useMemo(() => {
    const metaName = user?.user_metadata?.full_name
    if (typeof metaName === 'string' && metaName.trim().length > 0) {
      return metaName.trim()
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'there'
  }, [user])

  return (
    <section className="space-y-1" aria-label="Welcome banner">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
        {formattedDate}
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        {greeting},{' '}
        <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
          {fullName}
        </span>
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Here&apos;s what&apos;s happening with your career preparation today.
      </p>
    </section>
  )
}
