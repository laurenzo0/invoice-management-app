'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client.js'
import { useInvoices } from '../invoices/useInvoices.js'
import { StatusBadge } from '../ui/StatusBadge.jsx'
import { Modal } from '../ui/Modal.jsx'
import { Skeleton } from '../ui/Skeleton.jsx'

function formatMoney(cents) {
  return ((cents ?? 0) / 100).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
}

function formatDate(isoDate) {
  if (!isoDate) return '—'
  const date = new Date(`${isoDate}T00:00:00`)
  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleString('en-GB', { month: 'short' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

function BackIcon() {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" aria-hidden="true">
      <path d="M6 1L1.772 5.228 6 9.456" stroke="#7c5dfa" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function DetailSkeleton() {
  return (
    <div className="card" style={{ marginTop: 24 }}>
      <div style={{ display: 'grid', gap: 20 }}>
        <Skeleton height={18} width={120} />
        <Skeleton height={14} width={200} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 8 }}>
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} height={50} borderRadius={8} />)}
        </div>
        <Skeleton height={180} borderRadius={12} style={{ marginTop: 16 }} />
      </div>
    </div>
  )
}

export function InvoiceDetailPage({ id }) {
  const navigate = useNavigate()
  const { deleteInvoice, markPaid } = useInvoices()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let alive = true
    ;(async () => {
      setLoading(true); setError(null)
      try {
        const data = await api.getInvoice(id)
        if (alive) setInvoice(data.invoice)
      } catch (e) {
        if (alive) setError(e)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [id])

  return (
    <section className="page">
      {/* Back */}
      <button type="button" className="backButton" onClick={() => navigate('/')}>
        <BackIcon /> Go back
      </button>

      {loading && <DetailSkeleton />}

      {error && (
        <div className="card errorCard" style={{ marginTop: 24 }} role="alert">
          <div className="errorTitle">Couldn't load invoice</div>
          <div className="subtle">{error.message}</div>
        </div>
      )}

      {invoice && (
        <>
          {/* Status bar */}
          <div className="card detailHeader" style={{ marginTop: 24 }}>
            <div className="detailStatusBar">
              <div className="row gap alignCenter">
                <span className="detailStatusLabel">Status</span>
                <StatusBadge status={invoice.status} />
              </div>
              <div className="row gap wrap">
                <button
                  type="button"
                  className="secondaryButton"
                  id="edit-invoice-btn"
                  onClick={() => navigate(`/invoice/${invoice.id}/edit`)}
                  disabled={invoice.status === 'paid'}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="dangerButton"
                  id="delete-invoice-btn"
                  onClick={() => setDeleteOpen(true)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="primaryButton"
                  id="mark-paid-btn"
                  disabled={invoice.status !== 'pending' || busy}
                  onClick={async () => {
                    setBusy(true)
                    try { const inv = await markPaid(invoice.id); setInvoice(inv) }
                    finally { setBusy(false) }
                  }}
                >
                  {busy ? 'Working…' : 'Mark as Paid'}
                </button>
              </div>
            </div>
          </div>

          {/* Detail card */}
          <div className="card" style={{ marginTop: 16 }}>
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
              <div>
                <div className="invId big"><span className="hash">#</span>{invoice.id}</div>
                <div className="subtle" style={{ marginTop: 6 }}>{invoice.description}</div>
              </div>
              <div className="address subtle" style={{ textAlign: 'right' }}>
                <div>{invoice.senderAddress.street}</div>
                <div>{invoice.senderAddress.city}</div>
                <div>{invoice.senderAddress.postCode}</div>
                <div>{invoice.senderAddress.country}</div>
              </div>
            </div>

            {/* Info grid */}
            <div className="detailGrid">
              <div>
                <div className="detailLabel">Invoice Date</div>
                <div className="detailValue">{formatDate(invoice.createdAt)}</div>
                <div className="detailLabel" style={{ marginTop: 28 }}>Payment Due</div>
                <div className="detailValue">{formatDate(invoice.paymentDue)}</div>
              </div>

              <div>
                <div className="detailLabel">Bill To</div>
                <div className="detailValue" style={{ marginBottom: 8 }}>{invoice.clientName}</div>
                <div className="address subtle">
                  <div>{invoice.clientAddress.street}</div>
                  <div>{invoice.clientAddress.city}</div>
                  <div>{invoice.clientAddress.postCode}</div>
                  <div>{invoice.clientAddress.country}</div>
                </div>
              </div>

              <div>
                <div className="detailLabel">Sent To</div>
                <div className="detailValue">{invoice.clientEmail}</div>
              </div>
            </div>

            {/* Items */}
            <div className="itemsCard">
              <div className="itemsHeader">
                <div>Item Name</div>
                <div style={{ textAlign: 'center' }}>QTY.</div>
                <div className="right">Price</div>
                <div className="right">Total</div>
              </div>
              <div className="itemsBody">
                {invoice.items.map((it, idx) => (
                  <div className="itemsRow" key={idx}>
                    <div className="strong">{it.name}</div>
                    <div className="subtle" style={{ textAlign: 'center' }}>{it.quantity}</div>
                    <div className="right subtle">{formatMoney(Math.round(it.price * 100))}</div>
                    <div className="right strong">{formatMoney(Math.round(it.price * 100) * it.quantity)}</div>
                  </div>
                ))}
              </div>
              <div className="itemsTotal">
                <span className="totalLabel">Amount Due</span>
                <span className="totalAmount">{formatMoney(invoice.totalCents)}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete confirm dialog */}
      {invoice && deleteOpen && (
        <Modal
          title="Confirm Deletion"
          type="dialog"
          onClose={() => setDeleteOpen(false)}
          initialFocusSelector='button[data-primary="true"]'
          actions={
            <div className="row gap wrap">
              <button type="button" className="secondaryButton" onClick={() => setDeleteOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="dangerButton"
                data-primary="true"
                disabled={busy}
                onClick={async () => {
                  setBusy(true)
                  try { await deleteInvoice(invoice.id); navigate('/') }
                  finally { setBusy(false) }
                }}
              >
                {busy ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          }
        >
          <p className="subtle" style={{ lineHeight: 1.7, marginTop: 8 }}>
            Are you sure you want to delete invoice{' '}
            <strong className="strong">#{invoice.id}</strong>? This action cannot be undone.
          </p>
        </Modal>
      )}
    </section>
  )
}
