import { Link } from 'react-router-dom'
import { Sparkles, Linkedin, Twitter, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Sparkles className="size-4" />
              </span>
              <span className="text-lg text-slate-900 dark:text-white">CareerForge</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              A private, secure workspace for candidate preparation. Optimize your resumes, pass ATS systems, and land interviews.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label="Twitter / X"
              >
                <Twitter className="size-4" />
              </a>
              <a
                href="mailto:support@careerforge.ai"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label="Email support"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 sm:grid-cols-4">
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                Product
              </h3>
              <ul className="mt-4 space-y-2" role="list">
                <li>
                  <a href="#features" className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                Resources
              </h3>
              <ul className="mt-4 space-y-2" role="list">
                <li>
                  <a href="#how-it-works" className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                    How it Works
                  </a>
                </li>
                <li>
                  <span className="text-sm text-slate-400 dark:text-slate-600 cursor-not-allowed">
                    Roadmap
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                Developers
              </h3>
              <ul className="mt-4 space-y-2" role="list">
                <li>
                  <a
                    href="https://github.com/AnikethReddy383/interview-pilot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                Legal
              </h3>
              <ul className="mt-4 space-y-2" role="list">
                <li>
                  <span className="text-sm text-slate-400 dark:text-slate-600 cursor-not-allowed">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="text-sm text-slate-400 dark:text-slate-600 cursor-not-allowed">
                    Terms of Service
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 dark:border-slate-800">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} CareerForge. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            Built with ❤️ using React, TypeScript and Supabase
          </p>
        </div>
      </div>
    </footer>
  )
}
