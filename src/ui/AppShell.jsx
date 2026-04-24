"use client"

import { ThemeToggle } from './ThemeToggle.jsx'

function Logo() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--primary)', borderRadius: '0 20px 20px 0' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'var(--primaryHover)', borderRadius: '20px 0 20px 0' }} />
      <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 1 }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M0 6.49479C0 2.90779 2.90779 0 6.49479 0H21.5052C25.0922 0 28 2.90779 28 6.49479V19.5052C28 23.0922 25.0922 26 21.5052 26H6.49479C2.90779 26 0 23.0922 0 19.5052V6.49479Z" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M7 13.5L14 6.5V20.5L7 13.5Z" fill="var(--primary)"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M21 13.5L14 20.5V6.5L21 13.5Z" fill="var(--primaryHover)"/>
      </svg>
    </div>
  )
}

export function AppShell({ children }) {
  return (
    <div className="app">
      <header className="sidebar" aria-label="App navigation">
        <div className="logo" aria-label="Invoice app home">
          <Logo />
        </div>

        <div className="sidebarActions">
          <ThemeToggle />
          <div className="sidebarDivider" style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)', margin: '0' }} />
          <div className="avatar" aria-label="User avatar" role="img" tabIndex={0}>
            U
          </div>
        </div>
      </header>

      <main className="main">{children}</main>
    </div>
  )
}
