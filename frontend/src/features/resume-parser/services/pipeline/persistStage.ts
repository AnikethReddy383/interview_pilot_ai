import { supabase } from '../../../../lib/supabase'
import type { ParsedResumeData, ParserMetrics, ParseStatus } from '../../types'
import { PARSER_VERSION } from '../../constants/parser'

export interface PersistOptions {
  resumeId: string
  userId: string
  rawText: string | null
  parsedResume: ParsedResumeData | null
  parseStatus: ParseStatus
  durationMs: number
  attempts: number
  metrics: ParserMetrics | null
  lastError: string | null
}

export async function persistStage(options: PersistOptions): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase client is not configured.')
  }

  const legacyStatus =
    options.parseStatus === 'PARSED'
      ? 'ready'
      : options.parseStatus === 'PARSE_FAILED'
        ? 'failed'
        : options.parseStatus === 'PARSING'
          ? 'parsing'
          : 'uploaded'

  const payload = {
    status: legacyStatus,
    raw_text: options.rawText,
    parsed_resume: options.parsedResume,
    parse_status: options.parseStatus,
    parser_version: PARSER_VERSION,
    parser_duration_ms: options.durationMs,
    parse_attempts: options.attempts,
    last_parse_error: options.lastError,
    parse_metrics: options.metrics,
    parsed_at: options.parseStatus === 'PARSED' ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('resumes')
    .update(payload)
    .eq('id', options.resumeId)
    .eq('user_id', options.userId)

  if (error) {
    if (
      error.message?.includes("Could not find the 'parse_status' column") ||
      error.message?.includes("Could not find the 'parsed_resume' column") ||
      error.message?.includes('schema cache')
    ) {
      throw new Error(
        `Database migration required: The 'parse_status' or 'parsed_resume' column is missing in your Supabase 'resumes' table. Please run the SQL migration (202607220005_m6_resume_parser.sql) in your Supabase SQL Editor.`,
      )
    }
    throw new Error(`Failed to persist parsed resume in database: ${error.message}`)
  }
}
