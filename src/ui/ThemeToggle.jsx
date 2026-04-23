import { useTheme } from '../theme/useTheme.js'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button className="iconButton" type="button" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? '☀' : '🌙'}
    </button>
  )
}

