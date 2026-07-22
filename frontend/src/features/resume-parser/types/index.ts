import type { ParseStatus } from '../constants/parser'

export type { ParseStatus }

export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  website: string
}

export interface EducationItem {
  institution: string
  degree: string
  fieldOfStudy?: string
  startDate?: string
  endDate?: string
  graduationYear?: string
  gpa?: string
  highlights?: string[]
}

export interface ExperienceItem {
  company: string
  role: string
  startDate?: string
  endDate?: string
  location?: string
  description?: string
  highlights?: string[]
}

export interface ProjectItem {
  title: string
  description?: string
  technologies?: string[]
  link?: string
  github?: string
  liveDemo?: string
  highlights?: string[]
}

export interface CertificationItem {
  name: string
  issuer?: string
  date?: string
}

export interface AchievementItem {
  title: string
  description?: string
  date?: string
}

export interface LanguageItem {
  language: string
  proficiency?: string
}

export interface ExtracurricularItem {
  title: string
  role?: string
  description?: string
}

export interface ParsedResumeData {
  personal: PersonalInfo
  summary: string
  skills: string[]
  education: EducationItem[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
  certifications: CertificationItem[]
  achievements: AchievementItem[]
  languages: LanguageItem[]
  extracurricular: ExtracurricularItem[]
}

export interface SectionConfidenceMap {
  summary: number
  skills: number
  experience: number
  education: number
  projects: number
  certifications: number
  achievements: number
  languages: number
  extracurricular: number
}

export interface ParserMetrics {
  words: number
  characters: number
  sectionsDetected: number
  warningsCount: number
  sectionConfidence?: SectionConfidenceMap
}

export interface ValidationWarning {
  code: string
  message: string
  field?: string
  severity: 'warning' | 'info'
}

export interface PipelineParseResult {
  rawText: string
  parsedResume: ParsedResumeData
  sectionConfidence: SectionConfidenceMap
  metrics: ParserMetrics
  warnings: ValidationWarning[]
  durationMs: number
}

export interface ResumeDatabaseRecord {
  id: string
  user_id: string
  file_name: string
  storage_path: string
  file_size: number
  mime_type: string
  file_hash: string
  version: number
  raw_text: string | null
  parsed_resume: ParsedResumeData | null
  parse_status: ParseStatus
  parser_version: string | null
  parser_duration_ms: number | null
  parse_attempts: number
  last_parse_error: string | null
  parse_metrics: ParserMetrics | null
  uploaded_at: string
  updated_at: string
  parsed_at: string | null
  status?: string
}
