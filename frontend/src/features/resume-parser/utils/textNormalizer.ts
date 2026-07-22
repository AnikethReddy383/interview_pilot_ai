/**
 * Text normalization utilities for resume parsing.
 */

/**
 * Clean whitespace, obscure characters, line breaks, and duplicate blank lines.
 */
export function normalizeText(rawText: string): string {
  if (!rawText) {
    return ''
  }

  return (
    rawText
      // Replace non-breaking spaces and special spaces with standard space
      .replace(/[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000]/g, ' ')
      // Standardize carriage returns to newlines
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      // Remove non-printable control characters except line breaks and tabs
      // eslint-disable-next-line no-control-regex
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      // Collapse multiple horizontal spaces into a single space
      .replace(/[ \t]+/g, ' ')
      // Clean leading and trailing spaces per line
      .split('\n')
      .map((line) => line.trim())
      .join('\n')
      // Collapse 3 or more consecutive newlines into 2 (single blank line separator)
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}

/**
 * Calculates word and character count metrics from normalized text.
 */
export function calculateTextMetrics(text: string): { words: number; characters: number } {
  if (!text) {
    return { words: 0, characters: 0 }
  }

  const characters = text.length
  const words = text
    .split(/\s+/)
    .filter((w) => w.length > 0).length

  return { words, characters }
}
