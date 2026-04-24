'use client'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useInvoices } from '../invoices/useInvoices.js'
import { StatusBadge } from '../ui/StatusBadge.jsx'
import { FilterMenu } from '../ui/FilterMenu.jsx'
import { InvoiceRowSkeleton } from '../ui/Skeleton.jsx'
import { InvoiceFormPage } from './InvoiceFormPage.jsx'

function formatMoney(cents) {
  return ((cents ?? 0) / 100).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
}

function formatDue(isoDate) {
  if (!isoDate) return '—'
  const date = new Date(`${isoDate}T00:00:00`)
  const day = date.getDate()
  const month = date.toLocaleString('en-GB', { month: 'short' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

function ChevronRight() {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" aria-hidden="true">
      <path d="M1 1l4.228 4.228L1 9.456" stroke="#7c5dfa" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function EmptyState() {
  return (
    <div className="empty" role="status" aria-label="No invoices found">
      <svg className="emptyIllustration" viewBox="0 0 242 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="121" cy="186" rx="80" ry="14" fill="var(--border)"/>
        <rect x="61" y="40" width="120" height="140" rx="14" fill="var(--panel)" stroke="var(--border)" strokeWidth="2"/>
        <rect x="77" y="60" width="88" height="10" rx="5" fill="var(--border)"/>
        <rect x="77" y="80" width="60" height="8" rx="4" fill="var(--border)"/>
        <rect x="77" y="98" width="72" height="8" rx="4" fill="var(--border)"/>
        <rect x="77" y="116" width="40" height="8" rx="4" fill="var(--border)"/>
        <circle cx="121" cy="22" r="22" fill="var(--primary)" fillOpacity=".15"/>
        <path d="M112 22h18M121 13v18" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <h2 className="emptyTitle">Nothing to see here</h2>
      <p className="emptySubtitle">
        Create an invoice by clicking the <strong>New Invoice</strong> button and get started.
      </p>
    </div>
  )
}

export function InvoiceListPage({ showNewForm }) {
  const navigate = useNavigate()
  const { invoices, loading, error, statusFilter, setStatusFilter, seed } = useInvoices()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const count = invoices.length
  const subtitle = loading
    ? 'Loading…'
    : count === 0
    ? 'No invoices'
    : `There are ${count} total invoices`

  return (
    <section className="page">
      {/* Header */}
      <div className="listHeader">
        <div>
          <h1 className="h1">Invoices</h1>
          <p className="subtle">{subtitle}</p>
        </div>

        <div className="listHeaderActions">
          <FilterMenu
            value={statusFilter}
            onChange={setStatusFilter}
            open={filtersOpen}
            onToggle={() => setFiltersOpen((v) => !v)}
          />
          <button
            type="button"
            className="primaryButton"
            id="new-invoice-btn"
            onClick={() => navigate('/invoice/new')}
          >
            <span className="btnIcon">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M5.5 1v9M1 5.5h9" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            New Invoice
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="card errorCard" role="alert" style={{ marginBottom: 24 }}>
          <div className="errorTitle">Couldn't load invoices</div>
          <div className="subtle" style={{ marginBottom: 16 }}>{error.message}</div>
          <div className="row gap">
            <button type="button" className="secondaryButton" onClick={() => window.location.reload()}>
              Reload
            </button>
            <button type="button" className="ghostButton" onClick={seed}>
              Seed demo data
            </button>
          </div>
        </div>
      )}

      {/* Skeleton */}
      {loading && (
        <div style={{ display: 'grid', gap: 14 }} aria-busy="true" aria-label="Loading invoices">
          {[1, 2, 3, 4, 5].map((i) => <InvoiceRowSkeleton key={i} />)}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && count === 0 && (
        <>
          <EmptyState />
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button type="button" className="ghostButton" onClick={seed} style={{ fontSize: 13 }}>
              Seed demo data
            </button>
          </div>
        </>
      )}

      {/* List */}
      {!loading && count > 0 && (
        <ul className="invoiceList" aria-label="Invoice list">
          {invoices.map((inv) => (
            <li key={inv.id}>
              <Link className="invoiceRow" to={`/invoice/${inv.id}`} aria-label={`Invoice ${inv.id}, ${inv.clientName}, due ${formatDue(inv.paymentDue)}, ${inv.status}`}>
                <div className="invId"><span className="hash">#</span>{inv.id}</div>
                <div className="invDue">Due {formatDue(inv.paymentDue)}</div>
                <div className="invClient">{inv.clientName}</div>
                <div className="invTotal">{formatMoney(inv.totalCents)}</div>
                <StatusBadge status={inv.status} />
                <div className="chevronRight"><ChevronRight /></div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {showNewForm && (
        <InvoiceFormPage
          mode="new"
          onClose={() => navigate('/')}
          onCreated={(id) => navigate(`/invoice/${id}`)}
        />
      )}
    </section>
  )
}
