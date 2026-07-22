import { describe, it, expect } from 'vitest'
import { normalizeText, calculateTextMetrics } from '../utils/textNormalizer'

describe('textNormalizer', () => {
  it('normalizes carriage returns and multiple horizontal spaces', () => {
    const raw = 'John   Doe\r\nSoftware   Engineer\rSenior Developer'
    const normalized = normalizeText(raw)
    expect(normalized).toBe('John Doe\nSoftware Engineer\nSenior Developer')
  })

  it('replaces non-breaking spaces with standard space', () => {
    const raw = 'Skills:\u00A0React,\u00A0TypeScript'
    const normalized = normalizeText(raw)
    expect(normalized).toBe('Skills: React, TypeScript')
  })

  it('collapses 3 or more blank lines into a single blank line', () => {
    const raw = 'Header Line\n\n\n\n\nSection Line'
    const normalized = normalizeText(raw)
    expect(normalized).toBe('Header Line\n\nSection Line')
  })

  it('handles empty input cleanly', () => {
    expect(normalizeText('')).toBe('')
  })

  it('calculates word and character counts accurately', () => {
    const text = 'Hello world from resume parser'
    const metrics = calculateTextMetrics(text)
    expect(metrics.words).toBe(5)
    expect(metrics.characters).toBe(30)
  })
})
