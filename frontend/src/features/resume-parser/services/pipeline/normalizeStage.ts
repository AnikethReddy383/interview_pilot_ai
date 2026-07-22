import { normalizeText, calculateTextMetrics } from '../../utils/textNormalizer'

export function normalizeStage(rawText: string): {
  normalizedText: string
  wordCount: number
  characterCount: number
} {
  const normalizedText = normalizeText(rawText)
  const { words, characters } = calculateTextMetrics(normalizedText)

  return {
    normalizedText,
    wordCount: words,
    characterCount: characters,
  }
}
