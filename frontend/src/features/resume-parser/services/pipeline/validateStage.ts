import { validateParsedResume } from '../../utils/validator'
import type { ParsedResumeData, ValidationWarning } from '../../types'

export function validateStage(parsedResume: ParsedResumeData): ValidationWarning[] {
  return validateParsedResume(parsedResume)
}
