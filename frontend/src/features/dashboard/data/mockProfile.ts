export interface ProfileStep {
  id: string
  label: string
  completed: boolean
}

export const MOCK_PROFILE_STEPS: ProfileStep[] = [
  { id: 'auth', label: 'Create Account', completed: true },
  { id: 'details', label: 'Fill Basic Profile Info', completed: true },
  { id: 'resume', label: 'Upload First Resume', completed: false },
  { id: 'preferences', label: 'Set Career Preferences', completed: false },
]

export const AI_TIPS = [
  'Tailor your resume to each job description for 3× higher callback rates.',
  'Quantify achievements: "Increased revenue by 25%" beats "Improved sales".',
  'Keep your resume to one page if you have less than 10 years of experience.',
  'Use action verbs like "Led", "Built", "Optimised" to start bullet points.',
  'Include a skills section that mirrors the keywords in the job posting.',
]
