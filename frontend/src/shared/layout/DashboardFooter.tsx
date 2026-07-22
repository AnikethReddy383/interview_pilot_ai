export function DashboardFooter() {
  return (
    <footer className="border-t bg-white/50 py-4 text-center text-xs text-slate-400 dark:bg-slate-950/50 dark:text-slate-500">
      © {new Date().getFullYear()} CareerForge AI ·{' '}
      <a
        className="transition-colors hover:text-brand-600"
        href="mailto:support@careerforge.ai"
      >
        Support
      </a>
    </footer>
  )
}
