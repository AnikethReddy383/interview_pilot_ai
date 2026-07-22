import { describe, it, expect } from 'vitest'
import { detectSections } from '../utils/sectionDetector'
import { buildStructuredJson, parseEducation, parseExperience } from '../utils/jsonBuilder'
import { normalizeText } from '../utils/textNormalizer'

describe('Resume Parser Regression Suite', () => {
  it('parses multi-project resume with GitHub and Live Demo links accurately', () => {
    const rawResumeText = `
John Software Engineer
john@example.com | +1 555-019-2834 | San Francisco, CA

TECHNICAL PROJECTS

CareerForge AI - AI Resume Platform (React, TypeScript, Supabase)
https://github.com/john/careerforge
https://careerforge.demo.app
• Built deterministic resume parser pipeline using pdfjs-dist and mammoth
• Implemented multi-project and section confidence heuristics

Interview Pilot AI (Python, FastApi, PostgreSQL)
https://github.com/john/interview-pilot
• Created mock interview engine with audio recording and real-time feedback

Smart Portfolio Builder - https://github.com/john/portfolio
• Designed customizable developer portfolios with automatic GitHub sync

DevOps Dashboard (Docker, Kubernetes, Go)
• Automated CI/CD deployment pipelines for cloud microservices
`

    const normalized = normalizeText(rawResumeText)
    const { headerText, sections, sectionConfidence } = detectSections(normalized)
    const parsed = buildStructuredJson(headerText, sections)

    expect(sections['projects']).toBeDefined()
    expect(sectionConfidence.projects).toBeGreaterThan(0.8)
    expect(parsed.projects.length).toBe(4)

    expect(parsed.projects[0].title).toBe('CareerForge AI')
    expect(parsed.projects[0].github).toBe('https://github.com/john/careerforge')
    expect(parsed.projects[0].liveDemo).toBe('https://careerforge.demo.app')
    expect(parsed.projects[0].technologies).toContain('React')

    expect(parsed.projects[1].title).toBe('Interview Pilot AI')
    expect(parsed.projects[1].github).toBe('https://github.com/john/interview-pilot')

    expect(parsed.projects[2].title).toBe('Smart Portfolio Builder')
    expect(parsed.projects[3].title).toBe('DevOps Dashboard')
  })

  it('parses multi-company experience with date ranges and role titles correctly', () => {
    const rawExperienceText = `
TechCorp Solutions
Senior Software Engineer | Jan 2022 - Present | San Francisco, CA
• Led backend architecture refactoring for microservices
• Improved API response times by 45%

Innovate Mobile Inc
Frontend Developer | Jun 2020 - Dec 2021
• Developed cross-platform mobile apps using React Native
• Managed team of 4 junior developers
`

    const experiences = parseExperience(rawExperienceText)
    expect(experiences.length).toBe(2)
    expect(experiences[0].company).toBe('TechCorp Solutions')
    expect(experiences[0].role).toBe('Senior Software Engineer | Jan 2022 - Present | San Francisco, CA')
    expect(experiences[1].company).toBe('Innovate Mobile Inc')
  })

  it('parses variant section headings (Academic Background, Accomplishments, Leadership)', () => {
    const rawText = `
Aniketh Reddy
aniketh@example.com

ACADEMIC BACKGROUND
Stanford University
B.Tech Computer Science | CGPA: 3.9/4.0 | Graduated 2024

ACCOMPLISHMENTS
• First place in National Hackathon 2023
• Published paper on Distributed Systems

LEADERSHIP
President of CS Student Association
`

    const normalized = normalizeText(rawText)
    const { sections, sectionConfidence } = detectSections(normalized)

    expect(sections['education']).toBeDefined()
    expect(sections['achievements']).toBeDefined()
    expect(sections['extracurricular']).toBeDefined()

    expect(sectionConfidence.education).toBeGreaterThan(0.8)
    expect(sectionConfidence.achievements).toBeGreaterThan(0.8)
    expect(sectionConfidence.extracurricular).toBeGreaterThan(0.8)

    const edu = parseEducation(sections['education'])
    expect(edu[0].institution).toBe('Stanford University')
    expect(edu[0].gpa).toBe('3.9/4.0')
  })

  it('handles ATS and Canva templates with concatenated header lines', () => {
    const concatenatedText = `Aniketh Reddy | Hyderabad, India | aniketh@example.com Profile Summary Third-year CS student with hands-on experience building web apps. Technical Skills JavaScript, TypeScript, React, Node.js, Python, PostgreSQL`

    const { headerText, sections } = detectSections(concatenatedText)
    const parsed = buildStructuredJson(headerText, sections)

    expect(parsed.personal.name).toBe('Aniketh Reddy')
    expect(parsed.personal.email).toBe('aniketh@example.com')
    expect(parsed.personal.location).toBe('Hyderabad, India')
    expect(parsed.summary).toContain('Third-year CS student')
    expect(parsed.skills).toContain('React')
  })

  it('handles fallback tech stack scanning when no explicit SKILLS header exists', () => {
    const noSkillsHeaderResume = `
Jane Doe
jane@example.com

SUMMARY
Experienced Full Stack Engineer skilled in React, TypeScript, Node.js, Python, AWS, Docker, and PostgreSQL.
`

    const { headerText, sections } = detectSections(noSkillsHeaderResume)
    const parsed = buildStructuredJson(headerText, sections)

    expect(parsed.skills).toContain('React')
    expect(parsed.skills).toContain('TypeScript')
    expect(parsed.skills).toContain('Node.js')
    expect(parsed.skills).toContain('Python')
    expect(parsed.skills).toContain('AWS')
    expect(parsed.skills).toContain('Docker')
  })

  it('completes parsing in under 500ms benchmark for complex resumes', () => {
    const largeResume = `
Alex Developer | alex@example.com | +1 555-019-2834 | New York, NY
PROFESSIONAL SUMMARY
Senior Full Stack Engineer with 8+ years of experience building scalable enterprise applications.

TECHNICAL SKILLS
Java | Spring Boot | React | TypeScript | Node.js | PostgreSQL | Docker | Kubernetes | AWS

WORK EXPERIENCE
Alpha Cloud Systems
Principal Engineer | Jan 2021 - Present
• Architectural lead for multi-region cloud services
• Scaled database cluster to 10M active users

Beta Software Inc
Senior Engineer | Mar 2017 - Dec 2020
• Built real-time analytics dashboard with WebSockets

MAJOR PROJECTS
Enterprise Analytics Engine (Java, Spring, Redis) - https://github.com/alex/analytics
• High-throughput analytics engine processing 50k events/sec

Cloud Deployment Orchestrator (Go, Kubernetes) - https://github.com/alex/orchestrator
• Automated multi-cloud deployment engine

ACADEMIC BACKGROUND
MIT - Massachusetts Institute of Technology
B.S. Computer Science | GPA: 4.0/4.0 | 2017
`

    const startTime = performance.now()
    const normalized = normalizeText(largeResume)
    const { headerText, sections } = detectSections(normalized)
    const parsed = buildStructuredJson(headerText, sections)
    const duration = performance.now() - startTime

    expect(duration).toBeLessThan(500)
    expect(parsed.personal.name).toBe('Alex Developer')
    expect(parsed.projects.length).toBe(2)
    expect(parsed.skills.length).toBeGreaterThanOrEqual(7)
  })
})
