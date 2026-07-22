import { downloadStage } from './pipeline/downloadStage'
import { extractStage } from './pipeline/extractStage'
import { normalizeStage } from './pipeline/normalizeStage'
import { sectionDetectStage } from './pipeline/sectionDetectStage'
import { jsonBuildStage } from './pipeline/jsonBuildStage'
import { validateStage } from './pipeline/validateStage'
import { persistStage } from './pipeline/persistStage'
import type { PipelineParseResult, ParserMetrics, ResumeDatabaseRecord } from '../types'
import { PARSE_STATUS_VALUES } from '../constants/parser'

class ResumeParserService {
  /**
   * Runs the complete resume parsing pipeline for a given resume record.
   */
  async parseResume(resume: ResumeDatabaseRecord): Promise<PipelineParseResult> {
    const startTime = performance.now()
    const currentAttempts = (resume.parse_attempts || 0) + 1

    // 1. Set initial status to PARSING
    await persistStage({
      resumeId: resume.id,
      userId: resume.user_id,
      rawText: resume.raw_text || null,
      parsedResume: resume.parsed_resume || null,
      parseStatus: PARSE_STATUS_VALUES.PARSING,
      durationMs: 0,
      attempts: currentAttempts,
      metrics: resume.parse_metrics || null,
      lastError: null,
    })

    try {
      // 2. Download file buffer
      const arrayBuffer = await downloadStage(resume.storage_path)

      // 3. Extract text
      const rawText = await extractStage(arrayBuffer, resume.file_name, resume.mime_type)

      // 4. Normalize text & compute character/word metrics
      const { normalizedText, wordCount, characterCount } = normalizeStage(rawText)

      // 5. Detect sections & calculate confidence scores
      const { headerText, sections, sectionConfidence } = sectionDetectStage(normalizedText)

      // 6. Build structured JSON
      const parsedResume = jsonBuildStage(headerText, sections)

      // 7. Validate JSON & compute warnings
      const warnings = validateStage(parsedResume)

      const durationMs = Math.round(performance.now() - startTime)

      const sectionsDetectedCount = Object.values(sectionConfidence).filter((c) => c > 0).length

      const metrics: ParserMetrics = {
        words: wordCount,
        characters: characterCount,
        sectionsDetected: sectionsDetectedCount,
        warningsCount: warnings.length,
        sectionConfidence,
      }

      // 8. Persist successful parsing result
      await persistStage({
        resumeId: resume.id,
        userId: resume.user_id,
        rawText: normalizedText,
        parsedResume,
        parseStatus: PARSE_STATUS_VALUES.PARSED,
        durationMs,
        attempts: currentAttempts,
        metrics,
        lastError: null,
      })

      return {
        rawText: normalizedText,
        parsedResume,
        sectionConfidence,
        metrics,
        warnings,
        durationMs,
      }
    } catch (error) {
      const durationMs = Math.round(performance.now() - startTime)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during resume parsing.'

      // Persist failure status
      await persistStage({
        resumeId: resume.id,
        userId: resume.user_id,
        rawText: resume.raw_text || null,
        parsedResume: null,
        parseStatus: PARSE_STATUS_VALUES.PARSE_FAILED,
        durationMs,
        attempts: currentAttempts,
        metrics: null,
        lastError: errorMessage,
      })

      throw new Error(errorMessage)
    }
  }
}

export const resumeParserService = new ResumeParserService()
