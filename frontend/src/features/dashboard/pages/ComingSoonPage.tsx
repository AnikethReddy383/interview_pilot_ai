import { Link, useLocation } from 'react-router-dom'
import { Construction, ArrowLeft } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/Badge'
import { Card, CardContent } from '../../../components/ui/Card'
import { ROUTES, type AppRoute } from '../../../config/routes'

const PAGE_META: Record<string, { title: string; description: string }> = {
  [ROUTES.RESUME]: {
    title: 'Resume Manager',
    description:
      'Upload, organize, and manage your resumes. AI-powered optimization and version tracking coming soon.',
  },
  [ROUTES.ANALYSIS]: {
    title: 'Resume Analysis',
    description:
      'Get detailed AI feedback on your resume with actionable improvement suggestions.',
  },
  [ROUTES.JOB_MATCH]: {
    title: 'Job Matching',
    description:
      'Automatically match your profile against job descriptions and discover your best-fit roles.',
  },
  [ROUTES.INTERVIEW_PREP]: {
    title: 'Interview Prep',
    description:
      'Practice with AI-generated interview questions tailored to your target roles.',
  },
  [ROUTES.ACTIVITY]: {
    title: 'Activity Log',
    description:
      'Track your career preparation progress with a detailed activity history.',
  },
  [ROUTES.PROFILE]: {
    title: 'Profile Settings',
    description:
      'Manage your personal account information, preferences, and career goals.',
  },
  [ROUTES.SETTINGS]: {
    title: 'System Settings',
    description:
      'Configure integrations, notification preferences, and workspace settings.',
  },
}

const FALLBACK_META = {
  title: 'Coming Soon',
  description: 'This feature is under active development and will be available in a future update.',
}

export function ComingSoonPage() {
  const location = useLocation()
  const meta = PAGE_META[location.pathname as AppRoute] ?? FALLBACK_META

  return (
    <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardContent className="p-8">
          {/* Icon */}
          <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 shadow-sm dark:from-brand-950/30 dark:to-slate-900">
            <Construction
              className="size-8 text-brand-600 dark:text-brand-400"
              aria-hidden="true"
            />
          </div>

          {/* Badge */}
          <div className="mt-5">
            <Badge variant="amber" className="px-3 py-1 text-xs">
              <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
              In Development
            </Badge>
          </div>

          {/* Title & description */}
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {meta.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {meta.description}
          </p>

          {/* Actions */}
          <div className="mt-8 flex justify-center">
            <Link to={ROUTES.DASHBOARD}>
              <Button>
                <ArrowLeft className="size-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Decorative dots */}
          <div className="mx-auto mt-8 flex justify-center gap-1.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="size-1.5 rounded-full bg-slate-200 dark:bg-slate-700"
                style={{ opacity: 1 - i * 0.18 }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
