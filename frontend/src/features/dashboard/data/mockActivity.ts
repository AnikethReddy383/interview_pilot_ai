import { CheckCircle2, UserCheck, Upload, type LucideIcon } from 'lucide-react'
import { createElement } from 'react'
import type { ActivityEvent } from '../types'

function icon(Icon: LucideIcon, className = 'size-4') {
  return createElement(Icon, { className, 'aria-hidden': true })
}

export const MOCK_ACTIVITY: ActivityEvent[] = [
  {
    id: 'evt-1',
    title: 'Account Created',
    description: 'Welcome to CareerForge AI!',
    timestamp: 'Just now',
    icon: icon(CheckCircle2),
    iconColor: 'text-emerald-500',
  },
  {
    id: 'evt-2',
    title: 'Profile Completed',
    description: 'Your profile information has been saved.',
    timestamp: '2 minutes ago',
    icon: icon(UserCheck),
    iconColor: 'text-brand-600',
  },
  {
    id: 'evt-3',
    title: 'Ready to Upload Resume',
    description: 'Upload your first resume to unlock AI analysis.',
    timestamp: '5 minutes ago',
    icon: icon(Upload),
    iconColor: 'text-amber-500',
  },
]
