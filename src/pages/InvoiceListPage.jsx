import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useInvoices } from '../invoices/useInvoices.js'
import { StatusBadge } from '../ui/StatusBadge.jsx'
import { FilterMenu } from '../ui/FilterMenu.jsx'

function formatMoney(cents) {
  const v = (cents ?? 0) / 100
  return v.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

function formatDue(isoDate) {
  if (!isoDate) return '—'
  const d = new Date(`${isoDate}T00:00:00`)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function InvoiceListPage() {
  const router = useRouter()
  const { invoices, loading, error, statusFilter, setStatusFilter, seed } = useInvoices()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const count = invoices.length
  const title = useMemo(() => {
    const active = [...statusFilter]
    if (active.length === 0) return 'Invoices'
    if (active.length === 1) return `${active[0][0].toUpperCase() + active[0].slice(1)} invoices`
    return 'Filtered invoices'
  }, [statusFilter])

  return (
    <section className="page">
      <div className="listHeader">
        <div>
          <h1 className="h1">{title}</h1>
          <p className="subtle">
            {loading ? 'Loading…' : count === 0 ? 'No invoices' : `${count} total`}
          </p>
        </div>

        <div className="listHeaderActions">
          <div className="filterWrap">
            <button
              type="button"
              className="ghostButton"
              aria-haspopup="true"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((v) => !v)}
            >
              Filter
            </button>
            {filtersOpen ? (
              <div className="popover" role="dialog" aria-label="Filter invoices">
                <FilterMenu value={statusFilter} onChange={setStatusFilter} />
              </div>
            ) : null}
          </div>

          <button type="button" className="primaryButton" onClick={() => router.push('/invoice/new')}>
            New Invoice
          </button>
        </div>
      </div>

      {error ? (
        <div className="card errorCard" role="alert">
          <div className="errorTitle">Couldn’t load invoices</div>
          <div className="subtle">{error.message}</div>
          <div className="row gap">
            <button type="button" className="secondaryButton" onClick={() => window.location.reload()}>
              Reload
            </button>
            <button type="button" className="ghostButton" onClick={seed}>
              Seed demo data
            </button>
          </div>
        </div>
      ) : null}

      {!loading && !error && invoices.length === 0 ? (
        <div className="empty">
          <div className="emptyTitle">There is nothing here</div>
          <div className="subtle">Create an invoice by clicking the New Invoice button.</div>
          <button type="button" className="ghostButton" onClick={seed}>
            Seed demo data
          </button>
        </div>
      ) : null}

      <ul className="invoiceList" aria-label="Invoice list">
        {invoices.map((inv) => (
          <li key={inv.id}>
            <Link className="invoiceRow" href={`/invoice/${inv.id}`}>
              <div className="rowTop">
                <div className="invId">
                  <span className="hash">#</span>
                  {inv.id}
                </div>
                <div className="invClient">{inv.clientName}</div>
              </div>
              <div className="rowBottom">
                <div className="invDue">Due {formatDue(inv.paymentDue)}</div>
                <div className="invTotal">{formatMoney(inv.totalCents)}</div>
                <StatusBadge status={inv.status} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

