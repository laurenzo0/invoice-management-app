"use client"

import { createContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem('invoice.theme')
  if (saved === 'light' || saved === 'dark') return saved
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
  return prefersDark ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getInitialTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('invoice.theme', theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      setTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { ThemeContext }

