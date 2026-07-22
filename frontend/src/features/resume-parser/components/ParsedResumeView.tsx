import { useState } from 'react'
import {
  Cpu,
  RefreshCw,
  AlertTriangle,
  FileText,
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
  Sparkles,
  Globe,
  Loader2,
} from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { ParseStatusBadge } from './ParseStatusBadge'
import type { ParsedResumeData, ResumeDatabaseRecord, ValidationWarning } from '../types'
import { useResumeParser } from '../hooks/useResumeParser'

interface ParsedResumeViewProps {
  resume: ResumeDatabaseRecord
  onParseComplete?: () => void
}

export function ParsedResumeView({ resume, onParseComplete }: ParsedResumeViewProps) {
  const [activeTab, setActiveTab] = useState<
    'personal' | 'skills' | 'experience' | 'education' | 'projects' | 'raw'
  >('personal')

  const { isParsing, error, warnings, parseResult, handleParse, handleRetry } = useResumeParser()

  const onTriggerParse = async () => {
    const res = await handleParse(resume)
    if (res && onParseComplete) {
      onParseComplete()
    }
  }

  const onTriggerRetry = async () => {
    const res = await handleRetry(resume)
    if (res && onParseComplete) {
      onParseComplete()
    }
  }

  const parsedData: ParsedResumeData | null =
    parseResult?.parsedResume || (resume.parsed_resume as unknown as ParsedResumeData) || null
  const rawText = parseResult?.rawText || resume.raw_text || ''

  const rawStatus = isParsing
    ? 'PARSING'
    : (resume.parse_status || resume.status || 'UPLOADED').toUpperCase()

  const currentStatus =
    rawStatus === 'UPLOADED' || rawStatus === 'PARSING' || rawStatus === 'PARSED' || rawStatus === 'PARSE_FAILED'
      ? rawStatus
      : rawStatus === 'FAILED'
        ? 'PARSE_FAILED'
        : rawStatus === 'READY'
          ? 'PARSED'
          : 'UPLOADED'

  const lastError = error || resume.last_parse_error
  const metrics = parseResult?.metrics || resume.parse_metrics

  const activeWarnings: ValidationWarning[] =
    warnings.length > 0
      ? warnings
      : (parsedData ? [] : [])

  return (
    <div className="w-full rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all space-y-6">
      {/* Top Bar Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400">
            <Cpu className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              Structured Resume Data
              <ParseStatusBadge status={currentStatus} />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Deterministic parsing pipeline v{resume.parser_version || '1.0.0'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div>
          {currentStatus === 'UPLOADED' && (
            <Button
              onClick={() => void onTriggerParse()}
              disabled={isParsing}
              className="gap-2 bg-brand-600 hover:bg-brand-700 text-white"
            >
              {isParsing ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Parse Resume
            </Button>
          )}

          {currentStatus === 'PARSED' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => void onTriggerRetry()}
              disabled={isParsing}
              className="gap-1.5"
            >
              {isParsing ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
              Re-parse Document
            </Button>
          )}

          {currentStatus === 'PARSE_FAILED' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => void onTriggerRetry()}
              disabled={isParsing}
              className="gap-1.5 bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700"
            >
              {isParsing ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
              Retry Parsing
            </Button>
          )}
        </div>
      </div>

      {/* Metrics & Metadata Strip */}
      {metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="text-xs text-slate-500 dark:text-slate-400">Words Parsed</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-white">
              {metrics.words}
            </div>
          </div>

          <div className="rounded-xl border bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="text-xs text-slate-500 dark:text-slate-400">Characters</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-white">
              {metrics.characters}
            </div>
          </div>

          <div className="rounded-xl border bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="text-xs text-slate-500 dark:text-slate-400">Sections Found</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-white">
              {metrics.sectionsDetected}
            </div>
          </div>

          <div className="rounded-xl border bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="text-xs text-slate-500 dark:text-slate-400">Parse Duration</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-white">
              {resume.parser_duration_ms ? `${resume.parser_duration_ms}ms` : 'Fast'}
            </div>
          </div>
        </div>
      )}

      {/* Error Message Box */}
      {currentStatus === 'PARSE_FAILED' && lastError && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-950/50 dark:bg-red-950/20 text-red-700 dark:text-red-300">
          <AlertTriangle className="size-5 shrink-0 text-red-600 mt-0.5" />
          <div className="space-y-1 text-sm">
            <div className="font-semibold">Parsing Error Occurred</div>
            <div>{lastError}</div>
          </div>
        </div>
      )}

      {/* Validation Warnings */}
      {activeWarnings.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-950/50 dark:bg-amber-950/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
            <AlertTriangle className="size-4 text-amber-600" />
            Validation Warnings ({activeWarnings.length})
          </div>
          <ul className="space-y-1 text-xs text-amber-700 dark:text-amber-400">
            {activeWarnings.map((w, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-amber-500" />
                <span>
                  <strong>[{w.code}]</strong> {w.message}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Parsed Structure Tab View */}
      {parsedData && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b pb-2 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'personal'
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              <User className="size-3.5" /> Personal Info
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'skills'
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              <Award className="size-3.5" /> Skills ({parsedData.skills.length})
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'experience'
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              <Briefcase className="size-3.5" /> Experience ({parsedData.experience.length})
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'education'
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="size-3.5" /> Education ({parsedData.education.length})
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'projects'
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              <FolderGit2 className="size-3.5" /> Projects ({parsedData.projects.length})
            </button>

            <button
              onClick={() => setActiveTab('raw')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'raw'
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="size-3.5" /> Raw Text
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-2">
            {activeTab === 'personal' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-slate-500">Name</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {parsedData.personal.name || 'Not detected'}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-slate-500">Email</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {parsedData.personal.email || 'Not detected'}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-slate-500">Phone</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {parsedData.personal.phone || 'Not detected'}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-slate-500">Location</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {parsedData.personal.location || 'Not detected'}
                  </p>
                </div>

                {parsedData.personal.linkedin && (
                  <div>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Globe className="size-3" /> LinkedIn
                    </span>
                    <a
                      href={parsedData.personal.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-600 dark:text-brand-400 underline truncate block"
                    >
                      {parsedData.personal.linkedin}
                    </a>
                  </div>
                )}

                {parsedData.personal.github && (
                  <div>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Globe className="size-3" /> GitHub
                    </span>
                    <a
                      href={parsedData.personal.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-600 dark:text-brand-400 underline truncate block"
                    >
                      {parsedData.personal.github}
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                {parsedData.skills.length === 0 ? (
                  <p className="text-sm text-slate-500">No skills detected.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {parsedData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-4">
                {parsedData.experience.length === 0 ? (
                  <p className="text-sm text-slate-500">No work experience entries detected.</p>
                ) : (
                  parsedData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="rounded-xl border p-4 dark:border-slate-800 space-y-1 text-sm"
                    >
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {exp.company} — <span className="text-brand-600 dark:text-brand-400">{exp.role}</span>
                      </div>
                      {exp.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-3">
                {parsedData.education.length === 0 ? (
                  <p className="text-sm text-slate-500">No education entries detected.</p>
                ) : (
                  parsedData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="rounded-xl border p-4 dark:border-slate-800 space-y-1 text-sm"
                    >
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {edu.institution}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {edu.degree} {edu.graduationYear && `• Graduation Year: ${edu.graduationYear}`}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-3">
                {parsedData.projects.length === 0 ? (
                  <p className="text-sm text-slate-500">No projects detected.</p>
                ) : (
                  parsedData.projects.map((proj, index) => (
                    <div
                      key={index}
                      className="rounded-xl border p-4 dark:border-slate-800 space-y-1 text-sm"
                    >
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {proj.title}
                      </div>
                      {proj.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'raw' && (
              <div className="max-h-64 overflow-y-auto rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-200 leading-relaxed">
                <pre className="whitespace-pre-wrap">{rawText || 'No raw text extracted.'}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
