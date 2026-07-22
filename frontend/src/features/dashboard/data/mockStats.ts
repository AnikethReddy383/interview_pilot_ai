import { FileText, Search, BriefcaseBusiness, MessageSquareText, type LucideIcon } from 'lucide-react'
import { createElement } from 'react'
import type { StatCardData } from '../types'

function icon(Icon: LucideIcon, className = 'size-5') {
  return createElement(Icon, { className, 'aria-hidden': true })
}

export const MOCK_STATS: StatCardData[] = [
  {
    id: 'resume-score',
    label: 'Resume Score',
    value: '—',
    change: 'Upload to unlock',
    changeType: 'neutral',
    icon: icon(FileText),
    featureKey: 'resumeUpload',
  },
  {
    id: 'ats-score',
    label: 'ATS Score',
    value: '—',
    change: 'Requires resume',
    changeType: 'neutral',
    icon: icon(Search),
    featureKey: 'atsScore',
  },
  {
    id: 'job-matches',
    label: 'Job Matches',
    value: '—',
    change: 'Not yet available',
    changeType: 'neutral',
    icon: icon(BriefcaseBusiness),
    featureKey: 'jobMatching',
  },
  {
    id: 'interview-readiness',
    label: 'Interview Readiness',
    value: '—',
    change: 'Coming soon',
    changeType: 'neutral',
    icon: icon(MessageSquareText),
    featureKey: 'interviewPrep',
  },
]
