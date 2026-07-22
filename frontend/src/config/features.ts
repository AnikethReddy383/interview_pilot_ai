/** Central feature flag configuration for CareerForge AI.
 *  Components consume these flags to gracefully show "Coming Soon" states
 *  for features that are not yet implemented.
 */

export const FEATURES = {
  /** Resume upload & management */
  resumeUpload: true,
  /** AI-powered resume analysis */
  aiAnalysis: false,
  /** ATS compatibility scoring */
  atsScore: false,
  /** Job description matching */
  jobMatching: false,
  /** AI interview prep & questions */
  interviewPrep: false,
  /** Activity tracking & history */
  activityTracking: false,
  /** Code review analysis */
  codeReview: false,
} as const

export type FeatureKey = keyof typeof FEATURES

/** Type-safe feature flag check */
export function isFeatureEnabled(key: FeatureKey): boolean {
  return FEATURES[key]
}
