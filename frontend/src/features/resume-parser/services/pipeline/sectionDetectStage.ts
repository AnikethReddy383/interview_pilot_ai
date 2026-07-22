import { detectSections, type DetectedSectionBlocks } from '../../utils/sectionDetector'

export function sectionDetectStage(normalizedText: string): DetectedSectionBlocks {
  return detectSections(normalizedText)
}
