import { describe, it, expect } from 'vitest'
import { detectProjectBoundaries } from '../utils/ProjectBoundaryDetector'

describe('ProjectBoundaryDetector', () => {
  it('correctly splits 3 projects from user prompt example into 3 separate ProjectItem objects', () => {
    const projectsText = `
CareerForge AI
React | TypeScript | Supabase
• Built AI resume analyzer and job matcher

Asset Management System
MERN Stack
• Developed RBAC asset tracking platform with real-time audit logs

KMIT Clubs Hub
React | MongoDB
• Created club management portal for student organizations
`

    const projects = detectProjectBoundaries(projectsText)

    expect(projects.length).toBe(3)

    expect(projects[0].title).toBe('CareerForge AI')
    expect(projects[0].technologies).toContain('React')
    expect(projects[0].technologies).toContain('TypeScript')
    expect(projects[0].technologies).toContain('Supabase')

    expect(projects[1].title).toBe('Asset Management System')
    expect(projects[1].technologies).toContain('MERN Stack')

    expect(projects[2].title).toBe('KMIT Clubs Hub')
    expect(projects[2].technologies).toContain('React')
    expect(projects[2].technologies).toContain('MongoDB')
  })

  it('handles 2 projects separated by blank lines and pipe tech stacks', () => {
    const text = `
Smart Healthcare Assistant
Python | TensorFlow | FastAPI
• Developed diagnostic assist pipeline using deep neural networks

Cloud Log Analyzer
Go | Kubernetes | Docker
• Built distributed log collector processing 20,000 events per second
`

    const projects = detectProjectBoundaries(text)
    expect(projects.length).toBe(2)
    expect(projects[0].title).toBe('Smart Healthcare Assistant')
    expect(projects[0].technologies).toContain('Python')
    expect(projects[1].title).toBe('Cloud Log Analyzer')
    expect(projects[1].technologies).toContain('Docker')
  })

  it('handles 4 projects with GitHub and Live Demo links', () => {
    const text = `
CareerForge AI
https://github.com/user/careerforge
https://careerforge.app
• Built deterministic resume parser

Interview Pilot
https://github.com/user/interview-pilot
• Created mock interview engine with audio recording

Portfolio Builder
https://github.com/user/portfolio
• Designed developer portfolio platform

DevOps Dashboard
https://github.com/user/devops
• Automated CI/CD pipeline monitor
`

    const projects = detectProjectBoundaries(text)
    expect(projects.length).toBe(4)
    expect(projects[0].title).toBe('CareerForge AI')
    expect(projects[0].github).toBe('https://github.com/user/careerforge')
    expect(projects[0].liveDemo).toBe('https://careerforge.app')
    expect(projects[1].title).toBe('Interview Pilot')
    expect(projects[2].title).toBe('Portfolio Builder')
    expect(projects[3].title).toBe('DevOps Dashboard')
  })

  it('handles 5 projects with mixed bullet styles (*, -, •)', () => {
    const text = `
Project Alpha
* Created feature A for enterprise clients
- Optimized query performance

Project Beta
• Designed UI dashboard using Vue.js and TailwindCSS

Project Gamma
* Built real-time chat service using WebSockets

Project Delta
- Implemented OAuth2 authentication

Project Epsilon
• Automated testing with Jest and Cypress
`

    const projects = detectProjectBoundaries(text)
    expect(projects.length).toBe(5)
    expect(projects[0].title).toBe('Project Alpha')
    expect(projects[4].title).toBe('Project Epsilon')
  })

  it('handles continuous unformatted text without newlines (pdfjs-dist output)', () => {
    const rawContinuousText = `AI Code Reviewer Python, FastAPI, OpenAI API, Async REST APIs – Built a production style AI code review tool that analyzes source code and generates structured, automated feedback using OpenAI LLM APIs. – Designed structured LLM prompt pipelines with context management, token handling, and response parsing for consistent output quality. – Implemented async FastAPI endpoints for concurrent LLM API calls, handling real world edge cases including malformed inputs, API rate limits, and token overflow. – Built request response workflows with robust error handling and fallback mechanisms for production reliability. Automated WhatsApp Agent for Restaurants n8n, Google Sheets API, WhatsApp API, Workflow Automation – Built a fully automated WhatsApp AI agent for restaurants using n8n workflow automation handling FAQs, order taking, and customer interaction end to end. – Integrated Google Sheets as a live data source for menu items, pricing, and restaurant info, enabling non technical restaurant owners to update data without code. – Designed multi step n8n workflows for intent detection, dynamic response generation, and order storage processing all incoming messages automatically. – System handles the full customer journey: FAQ responses, order capture, data persistence, and confirmation with zero manual intervention. KMIT Clubs Hub React.js, Node.js, Express.js, MongoDB, Redis – Built a full stack platform for managing communication and announcements across college clubs with scalable backend architecture. – Integrated Redis caching for frequently accessed data, improving API response performance for high read endpoints. – Designed and implemented REST APIs for data retrieval, backend operations, and efficient frontend backend interaction. Asset Management System React.js, Node.js, Express.js, MongoDB – Developed a role based asset management application with dashboards for employees, HOD, and administrators. – Implemented secure authentication, authorization, and approval workflows; designed REST APIs for all backend operations.`

    const projects = detectProjectBoundaries(rawContinuousText)
    expect(projects.length).toBe(4)

    expect(projects[0].title).toBe('AI Code Reviewer')
    expect(projects[0].technologies).toContain('Python')
    expect(projects[0].technologies).toContain('FastAPI')

    expect(projects[1].title).toBe('Automated WhatsApp Agent for Restaurants')

    expect(projects[2].title).toBe('KMIT Clubs Hub')
    expect(projects[2].technologies).toContain('React')
    expect(projects[2].technologies).toContain('Node.js')

    expect(projects[3].title).toBe('Asset Management System')
    expect(projects[3].technologies).toContain('MongoDB')
  })
})
