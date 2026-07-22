import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Sparkles, X } from 'lucide-react'
import { Button } from '../../components/ui/button'

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  // Scroll Spy Logic
  useEffect(() => {
    const sections = navLinks.map(link => document.querySelector(link.href))
    
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 100 // offset for navbar height + buffer
      
      // Check if we are near the bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection(navLinks[navLinks.length - 1].href)
        return
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement | null
        if (section && section.offsetTop <= scrollPosition) {
          const id = section.getAttribute('id')
          if (id) {
            setActiveSection(`#${id}`)
            return
          }
        }
      }
      
      if (window.scrollY < 80) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScrollSpy, { passive: true })
    handleScrollSpy()
    return () => window.removeEventListener('scroll', handleScrollSpy)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'border-b border-slate-200/90 bg-white/95 shadow-md backdrop-blur-xl dark:border-slate-800/95 dark:bg-slate-950/95'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label="CareerForge AI home"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Sparkles className="size-3.5" />
          </span>
          <span className="text-base font-bold">
            CareerForge <span className="text-brand-600">AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                activeSection === href
                  ? 'text-brand-600 bg-brand-50/60 dark:text-brand-400 dark:bg-brand-950/50'
                  : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="https://github.com/AnikethReddy383/interview-pilot"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide uppercase text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            GitHub
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="h-8 text-xs">Log in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="h-8 text-xs font-semibold">Get Started</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="border-t bg-white/98 backdrop-blur-xl md:hidden dark:bg-slate-950/98">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsMobileOpen(false)}
                className={`block rounded-md px-3 py-2.5 text-sm font-semibold ${
                  activeSection === href
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="https://github.com/AnikethReddy383/interview-pilot"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              GitHub
            </a>
            <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
              <Link to="/login" onClick={() => setIsMobileOpen(false)}>
                <Button variant="secondary" className="w-full h-9 text-sm">Log in</Button>
              </Link>
              <Link to="/register" onClick={() => setIsMobileOpen(false)}>
                <Button className="w-full h-9 text-sm font-semibold">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
