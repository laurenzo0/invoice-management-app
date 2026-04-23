import { useContext } from 'react'
import { InvoiceContext } from './InvoiceProvider.jsx'

export function useInvoices() {
  const ctx = useContext(InvoiceContext)
  if (!ctx) throw new Error('useInvoices must be used inside InvoiceProvider')
  return ctx
}

