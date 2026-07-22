import { Upload, Sparkles, BriefcaseBusiness, MessageSquareText, type LucideIcon } from 'lucide-react'
import { createElement } from 'react'
import type { QuickActionData } from '../types'
import { ROUTES } from '../../../config/routes'

function icon(Icon: LucideIcon, className = 'size-5') {
  return createElement(Icon, { className, 'aria-hidden': true })
}

export const MOCK_QUICK_ACTIONS: QuickActionData[] = [
  {
    id: 'upload-resume',
    title: 'Upload Resume',
    description: 'Start your career analysis journey',
    icon: icon(Upload),
    to: ROUTES.RESUME,
    featureKey: 'resumeUpload',
  },
  {
    id: 'analyze-resume',
    title: 'Analyze Resume',
    description: 'Get AI-powered feedback instantly',
    icon: icon(Sparkles),
    to: ROUTES.ANALYSIS,
    featureKey: 'aiAnalysis',
  },
  {
    id: 'job-match',
    title: 'Job Match',
    description: 'Find roles that fit your profile',
    icon: icon(BriefcaseBusiness),
    to: ROUTES.JOB_MATCH,
    featureKey: 'jobMatching',
  },
  {
    id: 'interview-prep',
    title: 'Interview Questions',
    description: 'Practice with AI-generated prompts',
    icon: icon(MessageSquareText),
    to: ROUTES.INTERVIEW_PREP,
    featureKey: 'interviewPrep',
  },
]
