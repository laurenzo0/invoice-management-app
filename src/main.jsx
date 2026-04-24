import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import { ThemeProvider } from './theme/ThemeProvider.jsx'
import { InvoiceProvider } from './invoices/InvoiceProvider.jsx'
import { AppShell } from './ui/AppShell.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <InvoiceProvider>
          <AppShell>
            <App />
          </AppShell>
        </InvoiceProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
