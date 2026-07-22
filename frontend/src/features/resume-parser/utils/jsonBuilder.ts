import {
  EMAIL_REGEX,
  PHONE_REGEX,
  LINKEDIN_REGEX,
  GITHUB_REGEX,
  URL_REGEX,
  YEAR_REGEX,
} from '../constants/parser'
import type {
  ParsedResumeData,
  PersonalInfo,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  CertificationItem,
  AchievementItem,
  LanguageItem,
  ExtracurricularItem,
} from '../types'

/**
 * Extracts personal contact info from header text and text sections.
 */
/**
 * Extracts personal contact info from header text and full text using multi-strategy parsing.
 */
export function extractPersonalInfo(headerText: string, fullText: string): PersonalInfo {
  const combinedText = `${headerText}\n${fullText}`

  const emailMatch = combinedText.match(EMAIL_REGEX)
  const email = emailMatch ? emailMatch[0] : ''

  const phoneMatch = combinedText.match(PHONE_REGEX)
  const phone = phoneMatch ? phoneMatch[0] : ''

  const linkedinMatch = combinedText.match(LINKEDIN_REGEX)
  const linkedin = linkedinMatch ? linkedinMatch[0] : ''

  const githubMatch = combinedText.match(GITHUB_REGEX)
  const github = githubMatch ? githubMatch[0] : ''

  // Website URL (excluding LinkedIn and GitHub)
  const allUrls = combinedText.match(new RegExp(URL_REGEX, 'gi')) || []
  const website =
    allUrls.find(
      (url) => !url.toLowerCase().includes('linkedin.com') && !url.toLowerCase().includes('github.com'),
    ) || ''

  // Build list of top lines (up to 15 lines from header + top of document)
  const topRawLines = `${headerText}\n${fullText}`
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .slice(0, 15)

  // Split lines containing delimiters (| • ·) into tokens
  const topTokens: string[] = []
  for (const line of topRawLines) {
    if (line.includes('|') || line.includes('•') || line.includes('·')) {
      const parts = line.split(/[|•·]+/).map((p) => p.trim()).filter((p) => p.length > 0)
      topTokens.push(...parts)
    } else {
      topTokens.push(line)
    }
  }

  // Filter out contact tokens (emails, phones, URLs, section titles)
  const nonContactTokens = topTokens.filter((token) => {
    const isEmail = EMAIL_REGEX.test(token)
    const isPhone = PHONE_REGEX.test(token)
    const isUrl = URL_REGEX.test(token)
    const isHeaderKeyword = /^(summary|skills|experience|work experience|education|projects|certifications|curriculum vitae|resume|page \d+)$/i.test(
      token,
    )
    return !isEmail && !isPhone && !isUrl && !isHeaderKeyword
  })

  // 1. Name Extraction Strategy
  let name = ''

  // Candidate name is the first clean non-contact token at top of header without digits or location commas
  const candidateNameToken = nonContactTokens.find((token) => {
    const clean = token.replace(/[^a-zA-Z\s.-]/g, '').trim()
    const wordCount = clean.split(/\s+/).length
    const hasDigits = /\d/.test(token)
    const hasLocationComma = token.includes(',')
    return clean.length >= 2 && wordCount >= 1 && wordCount <= 4 && !hasDigits && !hasLocationComma
  })

  if (candidateNameToken) {
    name = candidateNameToken.replace(/[^a-zA-Z\s.-]/g, '').trim()
  } else if (nonContactTokens.length > 0) {
    name = nonContactTokens[0].replace(/[^a-zA-Z\s.-]/g, '').trim()
  }

  // Fallback: format name from email prefix if name is empty
  if (!name && email) {
    const prefix = email.split('@')[0]
    name = prefix
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim()
  }

  // 2. Location Extraction Strategy
  let location = ''

  const LOCATION_REGEX = /\b[A-Z][a-zA-Z\s.-]+,\s*([A-Z]{2}|[A-Z][a-zA-Z\s.-]+)(?:\s+\d{5})?\b/
  const LOCATION_KEYWORDS = /city|state|usa|uk|canada|india|remote|hybrid|san francisco|new york|seattle|austin|chicago|boston|los angeles|hyderabad|bengaluru|mumbai|delhi|toronto|london/i

  // Search top tokens for explicit City, State/Country regex match
  const explicitLocToken = topTokens.find((token) => {
    return LOCATION_REGEX.test(token) || LOCATION_KEYWORDS.test(token)
  })

  if (explicitLocToken) {
    // If token contains delimiter (e.g. "Hyderabad, India"), extract just the location part
    const match = explicitLocToken.match(LOCATION_REGEX)
    if (match) {
      location = match[0].trim()
    } else {
      location = explicitLocToken
        .replace(/\s+(profile|summary|objective|skills|experience|education|projects|certifications).*/i, '')
        .trim()
    }
  }

  return {
    name,
    email,
    phone,
    location,
    linkedin,
    github,
    website,
  }
}

const COMMON_TECH_SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'React Native',
  'Node.js',
  'Express',
  'Next.js',
  'Vue',
  'Angular',
  'HTML',
  'CSS',
  'Tailwind',
  'Sass',
  'Python',
  'Django',
  'Flask',
  'FastAPI',
  'Java',
  'Spring Boot',
  'C++',
  'C#',
  '.NET',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
  'SQL',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'GraphQL',
  'REST API',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'Git',
  'GitHub',
  'CI/CD',
  'Linux',
  'Jira',
  'Agile',
  'Scrum',
]

/**
 * Parses raw skills text section into clean unique string array.
 */
export function parseSkills(skillsText?: string, fullTextFallback?: string): string[] {
  const cleaned: string[] = []

  if (skillsText && skillsText.trim().length > 0) {
    // Strip common category headers like "Programming Languages:", "Frameworks:", "Tools:"
    const sanitizedText = skillsText.replace(
      /\b(languages|programming|frameworks|libraries|databases|tools|platforms|technologies|cloud|frontend|backend|other|core|concepts)\s*:\s*/gi,
      ' ',
    )

    const rawItems = sanitizedText.split(/[,;\u2022|/·\n\t]+/)

    for (const item of rawItems) {
      const trimmed = item.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9)]+$/g, '').trim()
      const isCategoryLabel = /^(languages|programming|frameworks|libraries|databases|tools|platforms|technologies|cloud|frontend|backend|other|work|experience|education|projects|summary)$/i.test(
        trimmed,
      )

      if (
        trimmed.length >= 2 &&
        !isCategoryLabel &&
        !cleaned.some((s) => s.toLowerCase() === trimmed.toLowerCase())
      ) {
        cleaned.push(trimmed)
      }
    }
  }

  // Fallback: If no skills detected in skills section, scan full document text for common tech skills
  if (cleaned.length === 0 && fullTextFallback && fullTextFallback.trim().length > 0) {
    for (const skill of COMMON_TECH_SKILLS) {
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      if (regex.test(fullTextFallback)) {
        if (!cleaned.some((s) => s.toLowerCase() === skill.toLowerCase())) {
          cleaned.push(skill)
        }
      }
    }
  }

  return cleaned
}

/**
 * Parses raw education text into structured EducationItem array.
 */
export function parseEducation(educationText?: string): EducationItem[] {
  if (!educationText || educationText.trim().length === 0) {
    return []
  }

  const blocks = educationText
    .split(/(?:\n{2,}|\n(?=[•\-*]\s*|\d+[.)]\s*))/i)
    .map((b) => b.trim())
    .filter((b) => b.length > 0)

  const items: EducationItem[] = []

  for (const block of blocks) {
    const lines = block
      .split('\n')
      .map((l) => l.replace(/^[•\-*\d.)]\s*/, '').trim())
      .filter((l) => l.length > 0)

    if (lines.length === 0) continue

    const yearMatch = block.match(YEAR_REGEX)
    const graduationYear = yearMatch ? yearMatch[0] : undefined

    // Extract GPA / CGPA / Percentage
    const gpaMatch = block.match(/\b(?:GPA|CGPA|Score|Percentage)\s*:?\s*(\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?%?)\b/i) ||
      block.match(/\b(\d\.\d{1,2}\/\d\.\d|\d{1,2}\.\d{1,2}\s*%|\d\.\d{1,2}\s*CGPA)\b/i)
    const gpa = gpaMatch
      ? (gpaMatch[1] || gpaMatch[0]).replace(/^(CGPA|GPA|Score|Percentage)\s*:?\s*/i, '').trim()
      : undefined

    // Extract Major / Field of Study
    const majorMatch = block.match(/\b(?:Major|Field of Study|Branch)\s*:?\s*([A-Za-z\s]+)\b/i) ||
      block.match(/\b(Computer Science|Software Engineering|Electrical Engineering|Information Technology|Data Science|Cybersecurity|Mechanical Engineering)\b/i)
    const fieldOfStudy = majorMatch ? majorMatch[1] || majorMatch[0] : undefined

    let institution = ''
    let degree = ''
    const highlights: string[] = []

    const DEGREE_REGEX = /\b(Bachelor|B\.?S|B\.?Tech|Master|M\.?S|M\.?Tech|Ph\.?D|Diploma|Associate|Degree|Engineering|Science)\b/i
    const INST_REGEX = /\b(University|College|Institute|School|Academy|JNTU|IIT|NIT|MIT|Stanford|Harvard|Campus)\b/i

    for (const line of lines) {
      if (!institution && INST_REGEX.test(line)) {
        institution = line
      } else if (!degree && DEGREE_REGEX.test(line)) {
        degree = line
      } else {
        highlights.push(line)
      }
    }

    if (!institution && lines.length > 0) {
      institution = lines[0]
    }
    if (!degree && lines.length > 1) {
      degree = lines[1]
    } else if (!degree) {
      degree = institution
    }

    items.push({
      institution,
      degree,
      fieldOfStudy,
      graduationYear,
      gpa,
      highlights: highlights.length > 0 ? highlights : undefined,
    })
  }

  return items
}

/**
 * Parses raw experience text into structured ExperienceItem array.
 */
export function parseExperience(experienceText?: string): ExperienceItem[] {
  if (!experienceText || experienceText.trim().length === 0) {
    return []
  }

  const blocks = experienceText
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter((b) => b.length > 0)

  const items: ExperienceItem[] = []

  for (const block of blocks) {
    const lines = block
      .split('\n')
      .map((l) => l.replace(/^[•\-*\d.)]\s*/, '').trim())
      .filter((l) => l.length > 0)

    if (lines.length === 0) continue

    const dateRangeMatch = block.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|[0-9]{2})?[.\s\-/]*(?:19|20)[0-9]{2}\s*[-–—\s\to]+\s*(?:Present|Current|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|[0-9]{2})?[.\s\-/]*(?:19|20)[0-9]{2})\b/i)
    const startDate = dateRangeMatch ? dateRangeMatch[0].split(/[-–—\sto]+/i)[0]?.trim() : undefined
    const endDate = dateRangeMatch ? dateRangeMatch[0].split(/[-–—\sto]+/i)[1]?.trim() : undefined

    const company = lines[0]
    const role = lines.length > 1 ? lines[1] : 'Role/Position'
    const description = lines.slice(2).join(' ')
    const highlights = lines.slice(2)

    items.push({
      company,
      role,
      startDate,
      endDate,
      description: description || undefined,
      highlights: highlights.length > 0 ? highlights : undefined,
    })
  }

  return items
}

import { detectProjectBoundaries } from './ProjectBoundaryDetector'

/**
 * Parses raw projects text into structured ProjectItem array using ProjectBoundaryDetector.
 */
export function parseProjects(projectsText?: string): ProjectItem[] {
  return detectProjectBoundaries(projectsText)
}

/**
 * Parses raw certifications text into CertificationItem array.
 */
export function parseCertifications(certText?: string): CertificationItem[] {
  if (!certText) return []
  return certText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map((name) => ({ name }))
}

/**
 * Parses raw achievements text into AchievementItem array.
 */
export function parseAchievements(achieveText?: string): AchievementItem[] {
  if (!achieveText) return []
  return achieveText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map((title) => ({ title }))
}

/**
 * Parses raw languages text into LanguageItem array.
 */
export function parseLanguages(langText?: string): LanguageItem[] {
  if (!langText) return []
  return langText
    .split(/[,;\n]+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map((language) => ({ language }))
}

/**
 * Parses raw extracurricular text into ExtracurricularItem array.
 */
export function parseExtracurricular(extraText?: string): ExtracurricularItem[] {
  if (!extraText) return []
  return extraText
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter((b) => b.length > 0)
    .map((block) => {
      const lines = block.split('\n').map((l) => l.trim()).filter((l) => l.length > 0)
      return {
        title: lines[0] || 'Activity',
        description: lines.slice(1).join(' ') || undefined,
      }
    })
}

/**
 * Constructs complete structured JSON matching the exact required schema.
 */
export function buildStructuredJson(
  headerText: string,
  sections: Record<string, string>,
): ParsedResumeData {
  const fullText = Object.values(sections).join('\n')

  return {
    personal: extractPersonalInfo(headerText, fullText),
    summary: sections['summary'] || '',
    skills: parseSkills(sections['skills'], fullText),
    education: parseEducation(sections['education']),
    experience: parseExperience(sections['experience']),
    projects: parseProjects(sections['projects']),
    certifications: parseCertifications(sections['certifications']),
    achievements: parseAchievements(sections['achievements']),
    languages: parseLanguages(sections['languages']),
    extracurricular: parseExtracurricular(sections['extracurricular']),
  }
}
