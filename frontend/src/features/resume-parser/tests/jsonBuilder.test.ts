import { describe, it, expect } from 'vitest'
import {
  extractPersonalInfo,
  parseSkills,
  parseEducation,
  buildStructuredJson,
} from '../utils/jsonBuilder'

describe('jsonBuilder', () => {
  it('extracts candidate contact info from header text', () => {
    const header = [
      'John Architect',
      'john.architect@example.com',
      '+1 (555) 019-2834',
      'San Francisco, CA',
      'https://linkedin.com/in/johnarchitect',
      'https://github.com/johnarchitect',
      'https://johnarchitect.dev',
    ].join('\n')

    const personal = extractPersonalInfo(header, '')

    expect(personal.name).toBe('John Architect')
    expect(personal.email).toBe('john.architect@example.com')
    expect(personal.phone).toBe('+1 (555) 019-2834')
    expect(personal.location).toBe('San Francisco, CA')
    expect(personal.linkedin).toBe('https://linkedin.com/in/johnarchitect')
    expect(personal.github).toBe('https://github.com/johnarchitect')
    expect(personal.website).toBe('https://johnarchitect.dev')
  })

  it('parses skills list into clean unique array', () => {
    const skillsText = 'React, TypeScript, Node.js, React, GraphQL; Docker'
    const skills = parseSkills(skillsText)
    expect(skills).toEqual(['React', 'TypeScript', 'Node.js', 'GraphQL', 'Docker'])
  })

  it('parses education entries and extracts graduation year', () => {
    const eduText = 'Stanford University\nB.S. Computer Science\nGraduated 2021'
    const edu = parseEducation(eduText)
    expect(edu.length).toBe(1)
    expect(edu[0].institution).toBe('Stanford University')
    expect(edu[0].graduationYear).toBe('2021')
  })

  it('builds complete structured JSON conforming to exact required schema', () => {
    const header = 'Alice Smith\nalice@example.com\n+1 555-123-4567'
    const sections = {
      summary: 'Passionate software engineer',
      skills: 'JavaScript, Python',
      experience: 'Acme Corp\nSoftware Engineer',
      education: 'MIT\nB.S. Electrical Engineering 2019',
    }

    const structured = buildStructuredJson(header, sections)

    expect(structured.personal.name).toBe('Alice Smith')
    expect(structured.personal.email).toBe('alice@example.com')
    expect(structured.summary).toBe('Passionate software engineer')
    expect(structured.skills).toEqual(['JavaScript', 'Python'])
    expect(structured.education.length).toBe(1)
    expect(structured.experience.length).toBe(1)
    expect(structured.projects).toEqual([])
    expect(structured.certifications).toEqual([])
    expect(structured.achievements).toEqual([])
    expect(structured.languages).toEqual([])
    expect(structured.extracurricular).toEqual([])
  })
})
