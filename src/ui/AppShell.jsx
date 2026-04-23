import { ThemeToggle } from './ThemeToggle.jsx'

export function AppShell({ children }) {
  return (
    <div className="app">
      <header className="sidebar" aria-label="App navigation">
        <div className="logo" aria-hidden="true">
          <span />
        </div>
        <div className="sidebarActions">
          <ThemeToggle />
          <div className="avatar" aria-label="User avatar" role="img">
            <span>U</span>
          </div>
        </div>
      </header>
      <main className="main">{children}</main>
    </div>
  )
}

