/**
 * Central route definitions for CareerForge AI.
 * Prevents magic string typos across navigation, cards, and routers.
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFICATION_PENDING: '/verification-pending',
  VERIFY_EMAIL: '/verify-email',
  UNAUTHORIZED: '/unauthorized',
  ONBOARDING: '/onboarding',
  ONBOARDING_COMPLETE_PROFILE: '/onboarding/complete-profile',

  // Dashboard & Workspace Routes
  DASHBOARD: '/dashboard',
  RESUME: '/resume',
  ANALYSIS: '/analysis',
  JOB_MATCH: '/job-match',
  INTERVIEW_PREP: '/interview-prep',
  ACTIVITY: '/activity',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
