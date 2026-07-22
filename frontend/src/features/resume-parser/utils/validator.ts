import { URL_REGEX, YEAR_REGEX } from '../constants/parser'
import type { ParsedResumeData, ValidationWarning } from '../types'

/**
 * Validates parsed resume data against rules without using AI.
 */
export function validateParsedResume(data: ParsedResumeData): ValidationWarning[] {
  const warnings: ValidationWarning[] = []

  // 1. Missing email
  if (!data.personal.email || data.personal.email.trim().length === 0) {
    warnings.push({
      code: 'MISSING_EMAIL',
      field: 'personal.email',
      message: 'Email address is missing from contact details.',
      severity: 'warning',
    })
  }

  // 2. Missing phone
  if (!data.personal.phone || data.personal.phone.trim().length === 0) {
    warnings.push({
      code: 'MISSING_PHONE',
      field: 'personal.phone',
      message: 'Phone number is missing from contact details.',
      severity: 'warning',
    })
  }

  // 3. Duplicate skills
  const lowerSkills = data.skills.map((s) => s.toLowerCase().trim())
  const duplicates = data.skills.filter(
    (skill, index) => lowerSkills.indexOf(skill.toLowerCase().trim()) !== index,
  )
  if (duplicates.length > 0) {
    const uniqueDuplicates = Array.from(new Set(duplicates))
    warnings.push({
      code: 'DUPLICATE_SKILLS',
      field: 'skills',
      message: `Duplicate skills detected: ${uniqueDuplicates.join(', ')}`,
      severity: 'info',
    })
  }

  // 4. Empty project descriptions
  data.projects.forEach((proj, idx) => {
    if (!proj.description || proj.description.trim().length === 0) {
      warnings.push({
        code: 'EMPTY_PROJECT_DESCRIPTION',
        field: `projects[${idx}].description`,
        message: `Project "${proj.title || 'Untitled'}" is missing a description.`,
        severity: 'warning',
      })
    }
  })

  // 5. Malformed URLs
  const urlsToCheck = [
    { field: 'personal.linkedin', url: data.personal.linkedin },
    { field: 'personal.github', url: data.personal.github },
    { field: 'personal.website', url: data.personal.website },
  ]
  data.projects.forEach((p, idx) => {
    if (p.link) {
      urlsToCheck.push({ field: `projects[${idx}].link`, url: p.link })
    }
  })

  urlsToCheck.forEach(({ field, url }) => {
    if (url && url.trim().length > 0) {
      const isValid = URL_REGEX.test(url) || url.includes('linkedin.com/') || url.includes('github.com/')
      if (!isValid) {
        warnings.push({
          code: 'MALFORMED_URL',
          field,
          message: `Malformed URL string detected: "${url}".`,
          severity: 'warning',
        })
      }
    }
  })

  // 6. Missing graduation year in education entries
  data.education.forEach((edu, idx) => {
    const hasYear =
      (edu.graduationYear && YEAR_REGEX.test(edu.graduationYear)) ||
      (edu.endDate && YEAR_REGEX.test(edu.endDate))

    if (!hasYear) {
      warnings.push({
        code: 'MISSING_GRADUATION_YEAR',
        field: `education[${idx}].graduationYear`,
        message: `Education entry "${edu.institution || edu.degree || 'Entry'}" is missing a graduation year.`,
        severity: 'warning',
      })
    }
  })

  return warnings
}
