import { describe, it, expect } from 'vitest'
import { detectSections } from '../utils/sectionDetector'

describe('sectionDetector', () => {
  it('detects common section headings and heading variants', () => {
    const text = [
      'John Doe',
      'john@example.com',
      '',
      'PROFESSIONAL SUMMARY',
      'Experienced staff software engineer.',
      '',
      'TECHNICAL SKILLS',
      'React, TypeScript, Node.js',
      '',
      'WORK EXPERIENCE',
      'Tech Corp',
      'Senior Lead',
      '',
      'ACADEMIC BACKGROUND',
      'University of Science',
      'B.S. Computer Science 2020',
    ].join('\n')

    const result = detectSections(text)

    expect(result.headerText).toContain('John Doe')
    expect(result.headerText).toContain('john@example.com')
    expect(result.sections['summary']).toContain('Experienced staff software engineer.')
    expect(result.sections['skills']).toContain('React, TypeScript, Node.js')
    expect(result.sections['experience']).toContain('Tech Corp')
    expect(result.sections['education']).toContain('University of Science')
  })

  it('assigns 0.95 confidence score for detected section headings', () => {
    const text = 'SUMMARY\nDeveloper summary\nSKILLS\nJavaScript'
    const result = detectSections(text)

    expect(result.sectionConfidence.summary).toBe(0.95)
    expect(result.sectionConfidence.skills).toBe(0.95)
    expect(result.sectionConfidence.projects).toBe(0)
  })

  it('handles documents without clear headings gracefully', () => {
    const text = 'John Doe\nSingle paragraph text without explicit section titles.'
    const result = detectSections(text)

    expect(result.headerText).toContain('John Doe')
    expect(Object.keys(result.sections).length).toBe(0)
  })
})
