import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface ThemeValue {
  dark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeValue | undefined>(undefined)

export function useTheme(): ThemeValue {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used within a ThemeProvider')
  return value
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(
    () => localStorage.getItem('interviewpilot-theme') === 'dark',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('interviewpilot-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((v) => !v) }}>
      {children}
    </ThemeContext.Provider>
  )
}
