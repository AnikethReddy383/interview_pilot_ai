import {
  FileText,
  Search,
  BriefcaseBusiness,
  MessageSquareText,
  CheckCircle2,
  UserCheck,
  Upload,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from 'lucide-react'
import { createElement } from 'react'
import type { StatCardData, QuickActionData, ActivityEvent } from '../types'
import { ROUTES } from '../../../config/routes'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function icon(Icon: LucideIcon, className = 'size-5') {
  return createElement(Icon, { className, 'aria-hidden': true })
}

/* ------------------------------------------------------------------ */
/*  Stat cards                                                         */
/* ------------------------------------------------------------------ */

export const PLACEHOLDER_STATS: StatCardData[] = [
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

/* ------------------------------------------------------------------ */
/*  Quick actions                                                      */
/* ------------------------------------------------------------------ */

export const PLACEHOLDER_ACTIONS: QuickActionData[] = [
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

/* ------------------------------------------------------------------ */
/*  Activity timeline                                                  */
/* ------------------------------------------------------------------ */

export const PLACEHOLDER_ACTIVITY: ActivityEvent[] = [
  {
    id: 'evt-1',
    title: 'Account Created',
    description: 'Welcome to CareerForge AI!',
    timestamp: 'Just now',
    icon: icon(CheckCircle2, 'size-4'),
    iconColor: 'text-emerald-500',
  },
  {
    id: 'evt-2',
    title: 'Profile Completed',
    description: 'Your profile information has been saved.',
    timestamp: '2 minutes ago',
    icon: icon(UserCheck, 'size-4'),
    iconColor: 'text-brand-600',
  },
  {
    id: 'evt-3',
    title: 'Ready to Upload Resume',
    description: 'Upload your first resume to unlock AI analysis.',
    timestamp: '5 minutes ago',
    icon: icon(Upload, 'size-4'),
    iconColor: 'text-amber-500',
  },
]

/* ------------------------------------------------------------------ */
/*  AI Tips                                                            */
/* ------------------------------------------------------------------ */

export const AI_TIPS = [
  'Tailor your resume to each job description for 3× higher callback rates.',
  'Quantify achievements: "Increased revenue by 25%" beats "Improved sales".',
  'Keep your resume to one page if you have less than 10 years of experience.',
  'Use action verbs like "Led", "Built", "Optimised" to start bullet points.',
  'Include a skills section that mirrors the keywords in the job posting.',
]

/* ------------------------------------------------------------------ */
/*  Trend icons                                                        */
/* ------------------------------------------------------------------ */

export const TREND_ICONS = {
  positive: icon(TrendingUp, 'size-3.5'),
  negative: icon(TrendingDown, 'size-3.5'),
  neutral: icon(Minus, 'size-3.5'),
} as const
