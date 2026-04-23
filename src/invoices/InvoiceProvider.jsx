import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../api/client.js'

const InvoiceContext = createContext(null)

const FILTERS = ['draft', 'pending', 'paid']

function loadFilter() {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem('invoice.filters')
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return new Set()
    return new Set(arr.filter((s) => FILTERS.includes(s)))
  } catch {
    return new Set()
  }
}

function saveFilter(set) {
  localStorage.setItem('invoice.filters', JSON.stringify([...set]))
}

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState(() => loadFilter())

  const statuses = useMemo(() => [...statusFilter], [statusFilter])
  const statusesKey = useMemo(() => statuses.join(','), [statuses])

  const refresh = useCallback(async () => {
    const data = await api.listInvoices({ statuses })
    setInvoices(data.invoices)
  }, [statuses])

  useEffect(() => {
    saveFilter(statusFilter)
  }, [statusFilter])

  useEffect(() => {
    let alive = true
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        await refresh()
      } catch (e) {
        if (alive) setError(e)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [refresh, statusesKey])

  const value = useMemo(
    () => ({
      invoices,
      loading,
      error,
      statusFilter,
      setStatusFilter,
      refresh,
      createInvoice: async (payload) => {
        const data = await api.createInvoice(payload)
        await refresh()
        return data.invoice
      },
      updateInvoice: async (id, payload) => {
        const data = await api.updateInvoice(id, payload)
        await refresh()
        return data.invoice
      },
      deleteInvoice: async (id) => {
        await api.deleteInvoice(id)
        await refresh()
      },
      markPaid: async (id) => {
        const data = await api.setStatus(id, 'paid')
        await refresh()
        return data.invoice
      },
      seed: async () => {
        await api.seed()
        await refresh()
      },
    }),
    [error, invoices, loading, refresh, statusFilter],
  )

  return <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
}

export { InvoiceContext }

