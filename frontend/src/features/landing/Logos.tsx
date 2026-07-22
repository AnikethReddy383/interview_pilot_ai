import { type ReactNode } from 'react'

interface TechLogo {
  name: string
  icon: ReactNode
}

const techLogos: TechLogo[] = [
  {
    name: 'React 19',
    icon: (
      <svg className="size-5 text-indigo-400 animate-spin" style={{ animationDuration: '10s' }} viewBox="-11.5 -10.23 23 20.46">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1.1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    name: 'Supabase Auth',
    icon: (
      <svg className="size-5 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.36 9.8a1.2 1.2 0 0 0-1.12-.76H14.1l3.3-7A1.2 1.2 0 0 0 16.32.4L4.85 10.97a1.2 1.2 0 0 0 .82 2.07h6.14l-3.3 7a1.2 1.2 0 0 0 2.08 1.13L22.06 10.6a1.2 1.2 0 0 0-.7-2.3z" />
      </svg>
    )
  },
  {
    name: 'OpenAI GPT',
    icon: (
      <svg className="size-5 text-slate-700 dark:text-slate-350" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.3 10.3a5.5 5.5 0 0 0-1.2-3 5.4 5.4 0 0 0-4.6-2.5 5.5 5.5 0 0 0-5 .8 5.5 5.5 0 0 0-4.5-2.1 5.4 5.4 0 0 0-4.5 2.5 5.5 5.5 0 0 0-.7 5.2 5.5 5.5 0 0 0 1.2 3.1 5.4 5.4 0 0 0 4.6 2.5c.3 0 .7 0 1-.1a5.5 5.5 0 0 0 5-.8 5.5 5.5 0 0 0 4.5 2.1 5.4 5.4 0 0 0 4.5-2.5 5.5 5.5 0 0 0 .7-5.2ZM12 17.5a2.2 2.2 0 0 1-1.3-.4l.1-.1 3.5-2v-4a.4.4 0 0 0-.2-.3l-3.5-2a.4.4 0 0 0-.4 0l-3.5 2a.4.4 0 0 0-.2.3v4a2.2 2.2 0 0 1-.2 1 2.2 2.2 0 0 1-2.2-1.3v-5.6a2.2 2.2 0 0 1 1-1.8l3.5-2a2.2 2.2 0 0 1 2.2 0l3.5 2a2.2 2.2 0 0 1 1 1.8v5.6a2.2 2.2 0 0 1-2.2 2.3Z" />
      </svg>
    )
  },
  {
    name: 'Vercel Deploy',
    icon: (
      <svg className="size-4 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 22.525H0L12 1.475L24 22.525Z" />
      </svg>
    )
  },
  {
    name: 'GitHub Code',
    icon: (
      <svg className="size-5 text-slate-800 dark:text-slate-200" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    )
  }
]

export function Logos() {
  return (
    <section className="border-y border-slate-200/60 bg-slate-50/50 py-10 dark:border-slate-800/60 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Built With & Integrated With Modern Technologies
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {techLogos.map((tech) => (
            <div key={tech.name} className="flex items-center gap-2.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors duration-200">
              <span className="flex items-center justify-center">
                {tech.icon}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider">{tech.name}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[10px] text-slate-400 dark:text-slate-500 italic">
          *Illustrative compatibility representations. Standard logos are property of their respective owners.
        </p>
      </div>
    </section>
  )
}
