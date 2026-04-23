"use client"

import { ThemeProvider } from '../theme/ThemeProvider.jsx'
import { InvoiceProvider } from '../invoices/InvoiceProvider.jsx'
import { AppShell } from '../ui/AppShell.jsx'

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <AppShell>{children}</AppShell>
      </InvoiceProvider>
    </ThemeProvider>
  )
}

