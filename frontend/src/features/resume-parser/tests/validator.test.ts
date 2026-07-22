import { describe, it, expect } from 'vitest'
import { validateParsedResume } from '../utils/validator'
import type { ParsedResumeData } from '../types'

describe('validator', () => {
  const sampleValidData: ParsedResumeData = {
    personal: {
      name: 'John Developer',
      email: 'john@example.com',
      phone: '+1 555-000-1111',
      location: 'Austin, TX',
      linkedin: 'https://linkedin.com/in/johndev',
      github: 'https://github.com/johndev',
      website: 'https://johndev.io',
    },
    summary: 'Senior developer',
    skills: ['React', 'TypeScript'],
    education: [
      {
        institution: 'University of Texas',
        degree: 'B.S. CS',
        graduationYear: '2020',
      },
    ],
    experience: [
      {
        company: 'Innovate LLC',
        role: 'Frontend Lead',
        description: 'Led core dashboard redesign.',
      },
    ],
    projects: [
      {
        title: 'Interview Pilot',
        description: 'AI career preparation portal',
        link: 'https://github.com/johndev/pilot',
      },
    ],
    certifications: [],
    achievements: [],
    languages: [],
    extracurricular: [],
  }

  it('returns no warnings for complete valid parsed resume', () => {
    const warnings = validateParsedResume(sampleValidData)
    expect(warnings.length).toBe(0)
  })

  it('detects missing email and missing phone', () => {
    const data: ParsedResumeData = {
      ...sampleValidData,
      personal: {
        ...sampleValidData.personal,
        email: '',
        phone: '',
      },
    }
    const warnings = validateParsedResume(data)
    expect(warnings.some((w) => w.code === 'MISSING_EMAIL')).toBe(true)
    expect(warnings.some((w) => w.code === 'MISSING_PHONE')).toBe(true)
  })

  it('detects duplicate skills', () => {
    const data: ParsedResumeData = {
      ...sampleValidData,
      skills: ['React', 'TypeScript', 'react', 'Node.js'],
    }
    const warnings = validateParsedResume(data)
    expect(warnings.some((w) => w.code === 'DUPLICATE_SKILLS')).toBe(true)
  })

  it('detects empty project descriptions', () => {
    const data: ParsedResumeData = {
      ...sampleValidData,
      projects: [{ title: 'Empty Project', description: '' }],
    }
    const warnings = validateParsedResume(data)
    expect(warnings.some((w) => w.code === 'EMPTY_PROJECT_DESCRIPTION')).toBe(true)
  })

  it('detects malformed URLs', () => {
    const data: ParsedResumeData = {
      ...sampleValidData,
      personal: {
        ...sampleValidData.personal,
        linkedin: 'not-a-valid-url',
      },
    }
    const warnings = validateParsedResume(data)
    expect(warnings.some((w) => w.code === 'MALFORMED_URL')).toBe(true)
  })

  it('detects missing graduation year in education entries', () => {
    const data: ParsedResumeData = {
      ...sampleValidData,
      education: [{ institution: 'State University', degree: 'B.A. Arts' }],
    }
    const warnings = validateParsedResume(data)
    expect(warnings.some((w) => w.code === 'MISSING_GRADUATION_YEAR')).toBe(true)
  })
})
