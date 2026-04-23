import { useEffect, useMemo, useState } from 'react'
import './index.css'
import { ThemeProvider } from './theme/ThemeProvider.jsx'
import { InvoiceProvider } from './invoices/InvoiceProvider.jsx'
import { AppShell } from './ui/AppShell.jsx'
import { InvoiceListPage } from './pages/InvoiceListPage.jsx'
import { InvoiceDetailPage } from './pages/InvoiceDetailPage.jsx'
import { InvoiceFormPage } from './pages/InvoiceFormPage.jsx'

function getRoute() {
  const hash = window.location.hash || '#/'
  const parts = hash.replace(/^#\//, '').split('/').filter(Boolean)
  if (parts.length === 0) return { name: 'list' }
  if (parts.length === 2 && parts[0] === 'invoice' && parts[1] === 'new') return { name: 'new' }
  if (parts.length === 3 && parts[0] === 'invoice' && parts[2] === 'edit')
    return { name: 'edit', id: parts[1] }
  if (parts.length === 2 && parts[0] === 'invoice') return { name: 'detail', id: parts[1] }
  return { name: 'list' }
}

export default function App() {
  const [route, setRoute] = useState(() => getRoute())

  useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const page = useMemo(() => {
    if (route.name === 'detail') return <InvoiceDetailPage id={route.id} />
    if (route.name === 'new')
      return <InvoiceFormPage mode="new" onClose={() => (window.location.hash = '#/')} />
    if (route.name === 'edit')
      return (
        <InvoiceFormPage
          mode="edit"
          invoiceId={route.id}
          onClose={() => (window.location.hash = `#/invoice/${route.id}`)}
        />
      )
    return <InvoiceListPage />
  }, [route])

  return (
    <ThemeProvider>
      <InvoiceProvider>
        <AppShell>{page}</AppShell>
      </InvoiceProvider>
    </ThemeProvider>
  )
}

