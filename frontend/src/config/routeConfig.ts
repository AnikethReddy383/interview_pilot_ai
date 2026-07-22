import {
  Activity,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  MessageSquareText,
  Search,
  Settings,
  UserRound,
  LogIn,
  UserPlus,
  KeyRound,
  ShieldAlert,
  Home,
  type LucideIcon,
} from 'lucide-react'
import { ROUTES, type AppRoute } from './routes'
import type { FeatureKey } from './features'

export interface RouteMeta {
  path: AppRoute
  title: string
  description?: string
  icon?: LucideIcon
  requiresAuth: boolean
  showInSidebar: boolean
  comingSoon?: boolean
  featureFlag?: FeatureKey
}

export const ROUTE_METADATA: Record<string, RouteMeta> = {
  [ROUTES.HOME]: {
    path: ROUTES.HOME,
    title: 'Home',
    description: 'CareerForge AI Landing Page',
    icon: Home,
    requiresAuth: false,
    showInSidebar: false,
  },
  [ROUTES.LOGIN]: {
    path: ROUTES.LOGIN,
    title: 'Sign In',
    description: 'Sign into your CareerForge AI account',
    icon: LogIn,
    requiresAuth: false,
    showInSidebar: false,
  },
  [ROUTES.REGISTER]: {
    path: ROUTES.REGISTER,
    title: 'Register',
    description: 'Create a new CareerForge AI account',
    icon: UserPlus,
    requiresAuth: false,
    showInSidebar: false,
  },
  [ROUTES.FORGOT_PASSWORD]: {
    path: ROUTES.FORGOT_PASSWORD,
    title: 'Forgot Password',
    description: 'Reset your CareerForge AI password',
    icon: KeyRound,
    requiresAuth: false,
    showInSidebar: false,
  },
  [ROUTES.UNAUTHORIZED]: {
    path: ROUTES.UNAUTHORIZED,
    title: 'Unauthorized Access',
    description: 'Access denied to requested resource',
    icon: ShieldAlert,
    requiresAuth: false,
    showInSidebar: false,
  },

  // Dashboard & Workspace Protected Routes
  [ROUTES.DASHBOARD]: {
    path: ROUTES.DASHBOARD,
    title: 'Dashboard',
    description: 'Workspace overview and recent activity',
    icon: LayoutDashboard,
    requiresAuth: true,
    showInSidebar: true,
    comingSoon: false,
  },
  [ROUTES.RESUME]: {
    path: ROUTES.RESUME,
    title: 'Resume',
    description: 'Upload and manage your resumes',
    icon: FileText,
    requiresAuth: true,
    showInSidebar: true,
    comingSoon: false,
    featureFlag: 'resumeUpload',
  },
  [ROUTES.ANALYSIS]: {
    path: ROUTES.ANALYSIS,
    title: 'Analysis',
    description: 'AI feedback and score reports',
    icon: Search,
    requiresAuth: true,
    showInSidebar: true,
    comingSoon: true,
    featureFlag: 'aiAnalysis',
  },
  [ROUTES.JOB_MATCH]: {
    path: ROUTES.JOB_MATCH,
    title: 'Job Match',
    description: 'Match your resume to job listings',
    icon: BriefcaseBusiness,
    requiresAuth: true,
    showInSidebar: true,
    comingSoon: true,
    featureFlag: 'jobMatching',
  },
  [ROUTES.INTERVIEW_PREP]: {
    path: ROUTES.INTERVIEW_PREP,
    title: 'Interview Prep',
    description: 'AI interview practice and custom prompts',
    icon: MessageSquareText,
    requiresAuth: true,
    showInSidebar: true,
    comingSoon: true,
    featureFlag: 'interviewPrep',
  },
  [ROUTES.ACTIVITY]: {
    path: ROUTES.ACTIVITY,
    title: 'Activity',
    description: 'Activity logs and history',
    icon: Activity,
    requiresAuth: true,
    showInSidebar: true,
    comingSoon: true,
    featureFlag: 'activityTracking',
  },
  [ROUTES.PROFILE]: {
    path: ROUTES.PROFILE,
    title: 'Profile',
    description: 'User profile and account settings',
    icon: UserRound,
    requiresAuth: true,
    showInSidebar: true,
    comingSoon: true,
  },
  [ROUTES.SETTINGS]: {
    path: ROUTES.SETTINGS,
    title: 'Settings',
    description: 'Application preferences and theme',
    icon: Settings,
    requiresAuth: true,
    showInSidebar: true,
    comingSoon: true,
  },
}

export const SIDEBAR_ROUTES = Object.values(ROUTE_METADATA).filter(
  (route) => route.showInSidebar,
)
