import { useState, useCallback } from 'react'
import { resumeParserService } from '../services/resumeParserService'
import type { PipelineParseResult, ResumeDatabaseRecord, ValidationWarning } from '../types'

export interface UseResumeParserReturn {
  isParsing: boolean
  error: string | null
  warnings: ValidationWarning[]
  parseResult: PipelineParseResult | null
  handleParse: (resume: ResumeDatabaseRecord) => Promise<PipelineParseResult | null>
  handleRetry: (resume: ResumeDatabaseRecord) => Promise<PipelineParseResult | null>
}

export function useResumeParser(): UseResumeParserReturn {
  const [isParsing, setIsParsing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [warnings, setWarnings] = useState<ValidationWarning[]>([])
  const [parseResult, setParseResult] = useState<PipelineParseResult | null>(null)

  const handleParse = useCallback(async (resume: ResumeDatabaseRecord) => {
    setIsParsing(true)
    setError(null)

    try {
      const result = await resumeParserService.parseResume(resume)
      setParseResult(result)
      setWarnings(result.warnings)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to parse resume.'
      setError(message)
      return null
    } finally {
      setIsParsing(false)
    }
  }, [])

  const handleRetry = useCallback(
    async (resume: ResumeDatabaseRecord) => {
      return handleParse(resume)
    },
    [handleParse],
  )

  return {
    isParsing,
    error,
    warnings,
    parseResult,
    handleParse,
    handleRetry,
  }
}
