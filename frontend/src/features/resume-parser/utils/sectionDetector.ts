import { SECTION_HEADING_VARIANTS } from '../constants/parser'
import type { SectionConfidenceMap } from '../types'

export interface DetectedSectionBlocks {
  headerText: string
  sections: Record<string, string>
  sectionConfidence: SectionConfidenceMap
}

/**
 * Matches line against known heading variants.
 */
function matchHeadingVariant(line: string): string | null {
  const cleanLine = line
    .toLowerCase()
    .replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '')
    .replace(/&/g, 'and')
    .replace(/\s+/g, ' ')
    .trim()

  for (const [canonicalKey, variants] of Object.entries(SECTION_HEADING_VARIANTS)) {
    for (const variant of variants) {
      const cleanVariant = variant
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/\s+/g, ' ')
        .trim()

      if (
        cleanLine === cleanVariant ||
        cleanLine.startsWith(`${cleanVariant}:`) ||
        cleanLine.startsWith(`${cleanVariant}-`) ||
        cleanLine.startsWith(`${cleanVariant} -`)
      ) {
        return canonicalKey
      }
    }
  }

  return null
}

/**
 * Pre-processes text by inserting line breaks before section heading variants
 * if they are concatenated within lines in PDFs.
 */
function isolateHeadings(text: string): string {
  const allVariants: string[] = []
  for (const variants of Object.values(SECTION_HEADING_VARIANTS)) {
    allVariants.push(...variants)
  }

  // Sort longest variants first so "technical skills" is matched before "skills"
  allVariants.sort((a, b) => b.length - a.length)

  let processed = text
  for (const variant of allVariants) {
    const escaped = variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(?<=\\s|^)(${escaped})(?=:|\\s|$)`, 'gi')
    processed = processed.replace(regex, '\n$1\n')
  }

  return processed
}

/**
 * Detects section blocks in normalized resume text while preserving original ordering.
 */
export function detectSections(normalizedText: string): DetectedSectionBlocks {
  const defaultConfidence: SectionConfidenceMap = {
    summary: 0,
    skills: 0,
    experience: 0,
    education: 0,
    projects: 0,
    certifications: 0,
    achievements: 0,
    languages: 0,
    extracurricular: 0,
  }

  if (!normalizedText) {
    return {
      headerText: '',
      sections: {},
      sectionConfidence: defaultConfidence,
    }
  }

  const preprocessedText = isolateHeadings(normalizedText)
  const lines = preprocessedText.split('\n').map((l) => l.trim()).filter((l) => l.length > 0)
  const sections: Record<string, string[]> = {}
  const sectionConfidence: SectionConfidenceMap = { ...defaultConfidence }

  let currentSectionKey = 'header'
  const headerLines: string[] = []

  for (const line of lines) {
    const matchedKey = matchHeadingVariant(line)

    if (matchedKey) {
      currentSectionKey = matchedKey
      if (!sections[matchedKey]) {
        sections[matchedKey] = []
        sectionConfidence[matchedKey as keyof SectionConfidenceMap] = 0.95
      }
    } else {
      if (currentSectionKey === 'header') {
        headerLines.push(line)
      } else {
        sections[currentSectionKey].push(line)
      }
    }
  }

  const finalSections: Record<string, string> = {}
  for (const [key, lineArray] of Object.entries(sections)) {
    finalSections[key] = lineArray.join('\n').trim()
  }

  return {
    headerText: headerLines.join('\n').trim(),
    sections: finalSections,
    sectionConfidence,
  }
}
