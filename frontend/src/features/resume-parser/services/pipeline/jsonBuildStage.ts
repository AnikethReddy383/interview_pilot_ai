import { buildStructuredJson } from '../../utils/jsonBuilder'
import type { ParsedResumeData } from '../../types'

export function jsonBuildStage(
  headerText: string,
  sections: Record<string, string>,
): ParsedResumeData {
  return buildStructuredJson(headerText, sections)
}
