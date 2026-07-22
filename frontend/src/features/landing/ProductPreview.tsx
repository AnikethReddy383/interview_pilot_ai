import { useState, useEffect } from 'react'
import { Check, Sparkles, TrendingUp, AlertCircle, Plus, Upload, LoaderCircle, FileText, RotateCcw } from 'lucide-react'
import { Button } from '../../components/ui/button'

type DemoPhase = 'idle' | 'uploading' | 'analyzing' | 'complete'

export function ProductPreview() {
  const [phase, setPhase] = useState<DemoPhase>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [addedSkills, setAddedSkills] = useState<string[]>([])
  const [optimized, setOptimized] = useState(false)

  const initialSkills = ['Docker', 'AWS', 'Redis']

  // Simulate the uploading phase progress
  useEffect(() => {
    if (phase !== 'uploading') return

    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setPhase('analyzing')
          return 100
        }
        return prev + 8
      })
    }, 100)

    return () => clearInterval(interval)
  }, [phase])

  // Simulate the analyzing phase steps
  useEffect(() => {
    if (phase !== 'analyzing') return

    setAnalysisStep(0)
    const timers = [
      setTimeout(() => setAnalysisStep(1), 600),
      setTimeout(() => setAnalysisStep(2), 1200),
      setTimeout(() => {
        setPhase('complete')
      }, 2000)
    ]

    return () => timers.forEach(clearTimeout)
  }, [phase])

  const handleStartScan = () => {
    setAddedSkills([])
    setOptimized(false)
    setPhase('uploading')
  }

  const handleAddSkill = (skill: string) => {
    if (addedSkills.includes(skill)) return
    const newAdded = [...addedSkills, skill]
    setAddedSkills(newAdded)
    if (newAdded.length === initialSkills.length) {
      setOptimized(true)
    }
  }

  const handleOptimizeAll = () => {
    setAddedSkills(initialSkills)
    setOptimized(true)
  }

  const handleReset = () => {
    setPhase('idle')
    setAddedSkills([])
    setOptimized(false)
  }

  // Analysis steps text
  const analysisMessages = [
    'Parsing layout structure & section dividers...',
    'Matching profile against Senior Developer role specifications...',
    'Calculating keyword overlap and semantic matching weights...'
  ]

  // Calculate mock scores based on optimization state
  const baseResumeScore = 86
  const baseAtsScore = 84
  const resumeScore = optimized ? 98 : baseResumeScore + addedSkills.length * 4
  const atsScore = optimized ? 96 : baseAtsScore + addedSkills.length * 4
  const keywordCount = optimized ? 12 : 9 + addedSkills.length

  return (
    <section id="demo" className="bg-slate-50 py-20 dark:bg-slate-900/30 border-t border-slate-200/50 dark:border-slate-800/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/10 px-3.5 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            <Sparkles className="size-3.5" />
            Recruiter Demo Feature
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Interactive Resume Scan Simulator
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400">
            Test drive our resume optimization workflow. Select a template below to watch how our simulated parser audits skills gaps and recalculates compatibility scores.
          </p>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-8 items-stretch">
          {/* Controls & Insights Panel (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 flex-1 flex flex-col justify-center">
              {phase === 'idle' && (
                <div className="text-center py-6 space-y-5">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-950/30">
                    <Upload className="size-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 dark:text-white">Start Resume Audit Simulation</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-450 px-4">
                      Click the button below to feed a standard senior engineer resume into the scanner simulator.
                    </p>
                  </div>
                  <Button onClick={handleStartScan} size="default" className="w-full font-semibold">
                    Simulate Audit (Senior Developer Resume)
                  </Button>
                </div>
              )}

              {phase === 'uploading' && (
                <div className="py-8 space-y-4">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Uploading resume...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-600 rounded-full transition-all duration-100"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 text-center italic">
                    Reading: senior_software_engineer_cv.pdf
                  </p>
                </div>
              )}

              {phase === 'analyzing' && (
                <div className="py-8 text-center space-y-4">
                  <LoaderCircle className="mx-auto size-8 text-brand-600 animate-spin" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Analyzing Content</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto animate-pulse">
                      {analysisMessages[analysisStep] || 'Evaluating keywords...'}
                    </p>
                  </div>
                </div>
              )}

              {phase === 'complete' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
                    <span className="flex size-6 items-center justify-center rounded bg-brand-600/10 text-brand-600">
                      <Sparkles className="size-3.5" />
                    </span>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Tailoring Optimization Assistant</h3>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-450">
                    Analysis complete! Your resume is missing <strong>three key technological matches</strong> required for optimal recruiter visibility. Add the skills tags below to dynamically modify your simulated resume and watch the score recalculate.
                  </p>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Identified Skills Gaps (Click to fix)
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {initialSkills.map((skill) => {
                        const isAdded = addedSkills.includes(skill)
                        return (
                          <button
                            key={skill}
                            onClick={() => handleAddSkill(skill)}
                            disabled={isAdded}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-all duration-200 ${
                              isAdded
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900 cursor-default'
                                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 hover:scale-105 cursor-pointer dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/50'
                            }`}
                            aria-label={isAdded ? `${skill} added` : `Fix missing ${skill}`}
                          >
                            {isAdded ? (
                              <Check className="size-3" />
                            ) : (
                              <Plus className="size-3" />
                            )}
                            {skill}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex gap-2">
                    {!optimized ? (
                      <Button onClick={handleOptimizeAll} size="sm" className="w-full text-xs">
                        Auto-Optimize Resume Gaps
                      </Button>
                    ) : (
                      <Button onClick={handleReset} variant="secondary" size="sm" className="w-full text-xs gap-1">
                        <RotateCcw className="size-3" />
                        Reset Scan Simulator
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Info Tip */}
            <div className="rounded-2xl border border-slate-150 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 flex gap-3">
              <AlertCircle className="size-5 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Simulated Workflow</h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  In a production environment, CareerForge utilizes advanced semantic models to index your files against custom job descriptions and generates targeted bullet recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* Simulated Dashboard View (Right) */}
          <div className="mt-8 lg:mt-0 lg:col-span-7 flex flex-col">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950 flex-1 flex flex-col relative">
              {/* If analyzing: display scanning laser animation */}
              {phase === 'analyzing' && (
                <div className="absolute inset-0 z-20 pointer-events-none bg-indigo-500/5 backdrop-blur-[1px] flex flex-col items-center justify-center">
                  <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-brand-600 to-indigo-500 shadow-[0_0_12px_#6366f1] animate-scan" />
                </div>
              )}

              {/* Header bar mockup */}
              <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex justify-between items-center dark:bg-slate-900 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-slate-350 dark:bg-slate-700" />
                  <span className="size-2 rounded-full bg-slate-350 dark:bg-slate-700" />
                  <span className="size-2 rounded-full bg-slate-350 dark:bg-slate-700" />
                  <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest dark:text-slate-500">
                    ATS Audit Preview
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-200 dark:bg-slate-800 dark:text-slate-500 px-2 py-0.5 rounded">Mock Mode</span>
                </div>
              </div>

              {/* Main metrics display */}
              <div className="p-6 space-y-6 flex-1 flex flex-col justify-center">
                {phase !== 'complete' ? (
                  <div className="text-center py-16 space-y-3">
                    <FileText className="mx-auto size-12 text-slate-300 dark:text-slate-750 animate-pulse" />
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                      {phase === 'idle'
                        ? 'Awaiting simulation trigger to show audit reports.'
                        : 'Parsing document data structure...'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Top 3 Score indicators */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* ATS Compatibility */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-center dark:border-slate-800 dark:bg-slate-900/40 transition-all duration-300">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                          ATS Score
                        </span>
                        <div className="mt-1 flex items-baseline justify-center gap-0.5">
                          <span className="text-2xl font-extrabold text-slate-900 dark:text-white transition-all duration-350">
                            {atsScore}%
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                            <TrendingUp className="size-3 mr-0.5" />
                            +{optimized ? 12 : addedSkills.length * 4}%
                          </span>
                        </div>
                      </div>

                      {/* Resume Score */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-center dark:border-slate-800 dark:bg-slate-900/40 transition-all duration-300">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                          Format Score
                        </span>
                        <div className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                          {resumeScore}%
                        </div>
                      </div>

                      {/* Keywords match */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-center dark:border-slate-800 dark:bg-slate-900/40 transition-all duration-300">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                          Keyword Overlap
                        </span>
                        <div className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                          {keywordCount} / 12
                        </div>
                      </div>
                    </div>

                    {/* Progress slider bar */}
                    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-[10px]">Keyword Match Coverage</span>
                        <span className="font-extrabold tabular-nums text-brand-600 dark:text-brand-400">
                          {Math.round((keywordCount / 12) * 100)}%
                        </span>
                      </div>
                      <div className="mt-2.5 h-2 w-full bg-slate-200 rounded-full overflow-hidden dark:bg-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${(keywordCount / 12) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Recommendations list */}
                    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40 space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                        Actionable AI Recommendations
                      </span>

                      <div className="space-y-2">
                        {/* Rec 1 */}
                        <div className="flex items-start gap-2.5 text-xs">
                          <span className={`mt-1 size-2 rounded-full shrink-0 transition-colors duration-300 ${addedSkills.includes('Docker') ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`} />
                          <div className="flex-1">
                            <p className={`font-semibold ${addedSkills.includes('Docker') ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-800 dark:text-slate-250'}`}>
                              Add containerization experience with Docker
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {addedSkills.includes('Docker') ? '✓ Optimized: Docker keywords and configurations indexed.' : 'Required: Mention Docker configurations and multi-stage builds.'}
                            </p>
                          </div>
                        </div>

                        {/* Rec 2 */}
                        <div className="flex items-start gap-2.5 text-xs">
                          <span className={`mt-1 size-2 rounded-full shrink-0 transition-colors duration-300 ${addedSkills.includes('AWS') ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`} />
                          <div className="flex-1">
                            <p className={`font-semibold ${addedSkills.includes('AWS') ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-800 dark:text-slate-250'}`}>
                              Describe AWS cloud deployment and ECS metrics
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {addedSkills.includes('AWS') ? '✓ Optimized: Cloud infrastructure parameters matching ECS added.' : 'Required: Outline AWS container orchestration or serverless deployments.'}
                            </p>
                          </div>
                        </div>

                        {/* Rec 3 */}
                        <div className="flex items-start gap-2.5 text-xs">
                          <span className={`mt-1 size-2 rounded-full shrink-0 transition-colors duration-300 ${addedSkills.includes('Redis') ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`} />
                          <div className="flex-1">
                            <p className={`font-semibold ${addedSkills.includes('Redis') ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-800 dark:text-slate-250'}`}>
                              Mention Redis caching layer details
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {addedSkills.includes('Redis') ? '✓ Optimized: Caching protocols and cluster descriptions added.' : 'Required: Illustrate session optimization using Redis caching models.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
