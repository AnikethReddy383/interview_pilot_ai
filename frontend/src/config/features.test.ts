import { describe, it, expect } from 'vitest'
import { FEATURES, isFeatureEnabled } from './features'

describe('Feature Flags Configuration', () => {
  it('defines all expected feature keys with boolean default values', () => {
    expect(FEATURES).toHaveProperty('resumeUpload')
    expect(FEATURES).toHaveProperty('aiAnalysis')
    expect(FEATURES).toHaveProperty('atsScore')
    expect(FEATURES).toHaveProperty('jobMatching')
    expect(FEATURES).toHaveProperty('interviewPrep')
    expect(FEATURES).toHaveProperty('activityTracking')
    expect(FEATURES).toHaveProperty('codeReview')
  })

  it('isFeatureEnabled returns correct boolean state for each key', () => {
    expect(isFeatureEnabled('resumeUpload')).toBe(true)
    expect(isFeatureEnabled('aiAnalysis')).toBe(false)
  })
})
