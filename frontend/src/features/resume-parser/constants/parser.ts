/**
 * Constants and heading variations for Resume Parsing Pipeline.
 */

export const PARSER_VERSION = '1.0.0'

export const PARSE_STATUS_VALUES = {
  UPLOADED: 'UPLOADED',
  PARSING: 'PARSING',
  PARSED: 'PARSED',
  PARSE_FAILED: 'PARSE_FAILED',
} as const

export type ParseStatus = (typeof PARSE_STATUS_VALUES)[keyof typeof PARSE_STATUS_VALUES]

/**
 * Mapping of canonical section keys to heading title variants found in resumes.
 */
export const SECTION_HEADING_VARIANTS: Record<string, string[]> = {
  summary: [
    'summary',
    'professional summary',
    'career summary',
    'profile',
    'profile summary',
    'executive summary',
    'about me',
    'objective',
    'career objective',
    'personal statement',
    'overview',
  ],
  skills: [
    'skills',
    'technical skills',
    'core skills',
    'technologies',
    'technical expertise',
    'competencies',
    'skills & expertise',
    'expertise',
    'tools & technologies',
    'skills & tools',
    'technical skills & tools',
    'skills & technologies',
    'technical skills & technologies',
    'programming languages',
    'languages & technologies',
    'languages & frameworks',
    'tools',
    'areas of expertise',
    'key skills',
    'technical proficiencies',
    'proficiencies',
    'technical summary',
    'skills summary',
  ],
  projects: [
    'projects',
    'project',
    'academic projects',
    'personal projects',
    'major projects',
    'relevant projects',
    'selected projects',
    'key projects',
  ],
  experience: [
    'experience',
    'work experience',
    'professional experience',
    'employment',
    'employment history',
    'career history',
    'relevant experience',
    'professional background',
    'positions held',
  ],
  education: [
    'education',
    'academic background',
    'qualifications',
    'academic qualifications',
    'academic history',
  ],
  certifications: [
    'certifications',
    'certificates',
    'licenses',
    'training',
    'licenses & certifications',
    'certifications & licenses',
  ],
  achievements: [
    'achievements',
    'awards',
    'accomplishments',
    'honors & awards',
    'awards & achievements',
    'honors',
  ],
  languages: [
    'languages',
    'language proficiency',
    'languages spoken',
    'language skills',
  ],
  extracurricular: [
    'extracurricular',
    'leadership',
    'extracurricular activities',
    'activities',
    'volunteering',
    'volunteer experience',
    'leadership & activities',
    'community involvement',
    'volunteer work',
  ],
}

/**
 * Regex patterns for personal contact info extraction.
 */
export const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/
export const PHONE_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/
export const LINKEDIN_REGEX = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?/i
export const GITHUB_REGEX = /(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_-]+\/?/i
export const URL_REGEX = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/i
export const YEAR_REGEX = /\b(19|20)\d{2}\b/
