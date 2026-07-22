import { EMAIL_REGEX, PHONE_REGEX, URL_REGEX } from '../constants/parser'
import type { ProjectItem } from '../types'

/**
 * Dictionary of common software development technologies and frameworks.
 */
export const COMMON_TECH_DICTIONARY: string[] = [
  'Java',
  'Python',
  'C',
  'C++',
  'C#',
  '.NET',
  'JavaScript',
  'TypeScript',
  'React',
  'React.js',
  'ReactJS',
  'React Native',
  'Angular',
  'Vue',
  'Vue.js',
  'Next.js',
  'NextJS',
  'Node.js',
  'NodeJS',
  'Express',
  'Express.js',
  'Spring',
  'Spring Boot',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'Postgres',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'TensorFlow',
  'PyTorch',
  'OpenCV',
  'Scikit-Learn',
  'Git',
  'GitHub',
  'TailwindCSS',
  'Tailwind',
  'Bootstrap',
  'Supabase',
  'Firebase',
  'n8n',
  'MERN',
  'MEAN',
  'MERN Stack',
  'GraphQL',
  'REST API',
  'REST',
  'HTML',
  'CSS',
  'Sass',
  'FastAPI',
  'Flask',
  'Django',
  'Prisma',
  'WebSockets',
  'Go',
  'Golang',
  'Rust',
  'PHP',
  'Ruby',
  'Rails',
  'Swift',
  'Kotlin',
]

/**
 * Checks if string is formatted in Title Case or ALL CAPS.
 */
function isTitleCaseOrCaps(str: string): boolean {
  const words = str.trim().split(/\s+/)
  if (words.length === 0) return false

  let titleOrCapCount = 0
  for (const word of words) {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '')
    if (cleanWord.length === 0) continue
    const firstChar = cleanWord.charAt(0)
    const isUpperFirst = firstChar === firstChar.toUpperCase()
    const isAllCaps = cleanWord === cleanWord.toUpperCase()
    if (isUpperFirst || isAllCaps) {
      titleOrCapCount++
    }
  }

  return titleOrCapCount / words.length >= 0.7
}

/**
 * Calculates a confidence score (0.0 to 1.0) indicating whether a line is a new project title.
 */
function calculateTitleConfidence(
  line: string,
  nextLine?: string,
  isPrevLineBulletOrDesc?: boolean,
): number {
  const trimmed = line.trim()
  if (!trimmed) return 0.0

  const isBullet = /^[•\-*\u2022\d+[.)]\s*/.test(trimmed)
  if (isBullet) return 0.0

  const isStandaloneUrl = /^https?:\/\/\S+$/i.test(trimmed)
  if (isStandaloneUrl) return 0.0

  const isEmail = EMAIL_REGEX.test(trimmed)
  const isPhone = PHONE_REGEX.test(trimmed)
  if (isEmail || isPhone) return 0.0

  // Exclude full sentence descriptions (e.g. "System handles the full customer journey")
  const looksLikeSentence =
    /\b(handles|analyzes|provides|enables|implements|allows|processes|manages|includes|uses|builds|creates)\s+(the|a|an|all|our|my|for|with|in)\b/i.test(
      trimmed,
    )
  if (looksLikeSentence) return 0.0

  // Pure technology stack line check (e.g. "React.js | Node.js | MongoDB", "MERN Stack")
  const firstWord = trimmed.split(/\s+/)[0] || ''
  const firstWordClean = firstWord.replace(/[^a-zA-Z0-9.+]/g, '')
  const firstWordIsTech = COMMON_TECH_DICTIONARY.some(
    (t) => t.toLowerCase() === firstWordClean.toLowerCase() || t.toLowerCase() === firstWord.toLowerCase(),
  )
  const extractedTechs = extractTechnologiesFromLine(trimmed)
  const isPureTechStackLine =
    firstWordIsTech &&
    (extractedTechs.length >= 2 ||
      (extractedTechs.length === 1 && /[-|•·,/]/.test(trimmed)) ||
      /^(mern|mean)\s*stack$/i.test(trimmed))

  if (isPureTechStackLine) return 0.0

  let score = 0.0

  const words = trimmed.split(/\s+/)
  const wordCount = words.length

  if (wordCount >= 2 && wordCount <= 8) {
    score += 0.35
  } else if (wordCount === 1 || (wordCount >= 9 && wordCount <= 12)) {
    score += 0.15
  }

  if (isTitleCaseOrCaps(trimmed)) {
    score += 0.25
  }

  const endsWithPunctuation = /[.!?]$/.test(trimmed)
  if (!endsWithPunctuation) {
    score += 0.15
  }

  if (isPrevLineBulletOrDesc) {
    score += 0.15
  }

  if (nextLine) {
    const nextTrimmed = nextLine.trim()
    const nextIsBullet = /^[•\-*\u2022\d+[.)]\s*/.test(nextTrimmed)
    const nextIsUrl = URL_REGEX.test(nextTrimmed)
    const nextHasTechDelimiter = /[-|•·,/]/.test(nextTrimmed)
    const nextHasTech = COMMON_TECH_DICTIONARY.some((tech) =>
      new RegExp(`\\b${tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(nextTrimmed),
    )

    if (nextIsBullet || nextIsUrl || (nextHasTechDelimiter && nextHasTech)) {
      score += 0.15
    }
  }

  return Math.min(score, 1.0)
}

/**
 * Extracts technology keywords from a line or block using the known technology dictionary.
 */
function extractTechnologiesFromLine(text: string): string[] {
  const found: string[] = []
  if (!text) return found

  // Also check inline brackets like (React, Node, MongoDB) or [TypeScript]
  const bracketMatch = text.match(/\(([^)]+)\)|\[([^\]]+)\]/)
  const textToScan = bracketMatch ? `${text} ${bracketMatch[1] || bracketMatch[2]}` : text

  for (const tech of COMMON_TECH_DICTIONARY) {
    const escaped = tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`\\b${escaped}\\b`, 'i')
    if (regex.test(textToScan) && !found.some((t) => t.toLowerCase() === tech.toLowerCase())) {
      found.push(tech)
    }
  }

  return found
}

/**
 * Pre-processes projects text to insert line breaks before embedded project titles and dash bullets
 * when text is extracted as continuous paragraphs without newlines.
 */
function isolateProjectHeaders(text: string): string {
  if (!text) return ''

  let processed = text

  // 1. Insert newlines before bullet/dash markers if concatenated
  processed = processed.replace(/(?<!\n)\s*([–—•])\s*/g, '\n$1 ')

  // 2. Insert newlines after period (. ) when followed by Title Case project header and tech keywords
  processed = processed.replace(
    /(?<=\.)\s+([A-Z][a-zA-Z0-9\s&]{2,60}?)(?=\s+[a-zA-Z0-9.+]+(?:,\s*|\s*\|\s*|\s*[/·•]\s*|\s+))/g,
    '\n\n$1',
  )

  // 3. For any non-bullet header line containing Title + Tech Stack, split Title and Tech Stack by tech keyword
  processed = processed.replace(/^([A-Z][^\n]+)/gm, (match, line) => {
    const words = line.trim().split(/\s+/)
    let techIndex = -1

    for (let i = 0; i < words.length; i++) {
      const cleanWord = words[i].replace(/[^a-zA-Z0-9.+]/g, '')
      if (
        COMMON_TECH_DICTIONARY.some(
          (t) => t.toLowerCase() === cleanWord.toLowerCase() || t.toLowerCase() === words[i].toLowerCase(),
        )
      ) {
        techIndex = i
        break
      }
    }

    if (techIndex > 0) {
      const titleStr = words.slice(0, techIndex).join(' ')
      const techStr = words.slice(techIndex).join(' ')
      return `${titleStr}\n${techStr}`
    }

    return match
  })

  return processed
}

/**
 * Deterministic Project Boundary Detector state machine parser.
 * Reads Projects section line by line and outputs distinct ProjectItem objects.
 */
export function detectProjectBoundaries(projectsText?: string): ProjectItem[] {
  if (!projectsText || projectsText.trim().length === 0) {
    return []
  }

  const preprocessedText = isolateProjectHeaders(projectsText)
  const lines = preprocessedText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  if (lines.length === 0) return []

  const projectBlocks: string[][] = []
  let currentBlock: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const nextLine = i < lines.length - 1 ? lines[i + 1] : undefined

    const prevLineWasBulletOrDesc =
      currentBlock.length > 0 &&
      (/^[•\-*\u2022\d+[.)]\s*/.test(currentBlock[currentBlock.length - 1]) ||
        currentBlock.length >= 2)

    const confidence = calculateTitleConfidence(line, nextLine, prevLineWasBulletOrDesc)
    const isNewProjectHeader = currentBlock.length === 0 || confidence >= 0.7

    if (isNewProjectHeader && currentBlock.length > 0) {
      projectBlocks.push(currentBlock)
      currentBlock = [line]
    } else {
      currentBlock.push(line)
    }
  }

  if (currentBlock.length > 0) {
    projectBlocks.push(currentBlock)
  }

  const items: ProjectItem[] = []

  for (const blockLines of projectBlocks) {
    const cleanLines = blockLines.map((l) => l.replace(/^[•\-*\u2022\d+[.)]\s*/, '').trim())
    const titleLine = cleanLines[0] || 'Untitled Project'
    const blockText = blockLines.join('\n')

    // Extract links (GitHub vs Live Demo)
    const allUrls = blockText.match(new RegExp(URL_REGEX, 'gi')) || []
    const github = allUrls.find((url) => url.toLowerCase().includes('github.com'))
    const liveDemo = allUrls.find((url) => !url.toLowerCase().includes('github.com'))
    const link = github || liveDemo || (allUrls.length > 0 ? allUrls[0] : undefined)

    // Extract project technologies using technology dictionary and bracket scanning
    const technologies = extractTechnologiesFromLine(blockText)

    // Split title and subtitle/technology tags if joined with delimiters (e.g. "CareerForge AI | React, Supabase")
    let title = titleLine.replace(/\s*\([^)]+\)/g, '').replace(/\s*\[[^\]]+\]/g, '').trim()
    let description = cleanLines.slice(1).join(' ')

    if (title.includes(' - ') || title.includes(' | ') || title.includes(' — ') || title.includes(' · ')) {
      const parts = title.split(/\s*[-|—·]\s*/)
      title = parts[0].trim()
      description = `${parts.slice(1).join(' ')} ${description}`.trim()
    }

    const highlights = cleanLines.slice(1).filter((l) => l.length > 0)

    items.push({
      title: title || 'Untitled Project',
      description: description || title || 'Project details',
      technologies: technologies.length > 0 ? technologies : undefined,
      link,
      github,
      liveDemo,
      highlights: highlights.length > 0 ? highlights : undefined,
    })
  }

  return items
}
