import { useEffect, useState } from 'react'
import { api } from '../api/client.js'
import { useInvoices } from '../invoices/useInvoices.js'
import { StatusBadge } from '../ui/StatusBadge.jsx'
import { Modal } from '../ui/Modal.jsx'

function formatMoney(cents) {
  const v = (cents ?? 0) / 100
  return v.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

export function InvoiceDetailPage({ id }) {
  const { deleteInvoice, markPaid } = useInvoices()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let alive = true
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await api.getInvoice(id)
        if (alive) setInvoice(data.invoice)
      } catch (e) {
        if (alive) setError(e)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [id])

  return (
    <section className="page">
      <div className="row gap alignCenter">
        <button type="button" className="ghostButton" onClick={() => (window.location.hash = '#/')}>
          ← Go back
        </button>
      </div>

      {loading ? <div className="card">Loading…</div> : null}
      {error ? (
        <div className="card errorCard" role="alert">
          <div className="errorTitle">Couldn’t load invoice</div>
          <div className="subtle">{error.message}</div>
        </div>
      ) : null}

      {invoice ? (
        <>
          <div className="card detailHeader">
            <div className="row spaceBetween alignCenter wrap">
              <div className="row gap alignCenter">
                <div className="subtle">Status</div>
                <StatusBadge status={invoice.status} />
              </div>
              <div className="row gap">
                <button
                  type="button"
                  className="secondaryButton"
                  onClick={() => (window.location.hash = `#/invoice/${invoice.id}/edit`)}
                  disabled={invoice.status === 'paid'}
                >
                  Edit
                </button>
                <button type="button" className="dangerButton" onClick={() => setDeleteOpen(true)}>
                  Delete
                </button>
                <button
                  type="button"
                  className="primaryButton"
                  disabled={invoice.status !== 'pending'}
                  onClick={async () => {
                    setBusy(true)
                    try {
                      const inv = await markPaid(invoice.id)
                      setInvoice(inv)
                    } finally {
                      setBusy(false)
                    }
                  }}
                >
                  {busy ? 'Working…' : 'Mark as Paid'}
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="detailGrid">
              <div>
                <div className="invId big">
                  <span className="hash">#</span>
                  {invoice.id}
                </div>
                <div className="subtle">{invoice.description}</div>
              </div>
              <div className="address subtle">
                <div>{invoice.senderAddress.street}</div>
                <div>{invoice.senderAddress.city}</div>
                <div>{invoice.senderAddress.postCode}</div>
                <div>{invoice.senderAddress.country}</div>
              </div>

              <div>
                <div className="subtle">Invoice Date</div>
                <div className="strong">{new Date(invoice.createdAt).toLocaleDateString()}</div>
                <div className="subtle mt">Payment Due</div>
                <div className="strong">{invoice.paymentDue}</div>
              </div>

              <div>
                <div className="subtle">Bill To</div>
                <div className="strong">{invoice.clientName}</div>
                <div className="address subtle">
                  <div>{invoice.clientAddress.street}</div>
                  <div>{invoice.clientAddress.city}</div>
                  <div>{invoice.clientAddress.postCode}</div>
                  <div>{invoice.clientAddress.country}</div>
                </div>
              </div>

              <div>
                <div className="subtle">Sent to</div>
                <div className="strong">{invoice.clientEmail}</div>
              </div>
            </div>

            <div className="itemsCard">
              <div className="itemsHeader">
                <div>Item Name</div>
                <div className="right">QTY.</div>
                <div className="right">Price</div>
                <div className="right">Total</div>
              </div>
              <div className="itemsBody">
                {invoice.items.map((it, idx) => (
                  <div className="itemsRow" key={idx}>
                    <div className="strong">{it.name}</div>
                    <div className="right subtle">{it.quantity}</div>
                    <div className="right subtle">{formatMoney(Math.round(it.price * 100))}</div>
                    <div className="right strong">
                      {formatMoney(Math.round(it.price * 100) * it.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="itemsTotal">
                <div className="subtle">Amount Due</div>
                <div className="total">{formatMoney(invoice.totalCents)}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {invoice && deleteOpen ? (
        <Modal
          title="Confirm Deletion"
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
                onClick={async () => {
                  setBusy(true)
                  try {
                    await deleteInvoice(invoice.id)
                    window.location.hash = '#/'
                  } finally {
                    setBusy(false)
                  }
                }}
              >
                Delete
              </button>
            </div>
          }
        >
          <p className="subtle">
            Are you sure you want to delete invoice <span className="strong">#{invoice.id}</span>? This action cannot be
            undone.
          </p>
        </Modal>
      ) : null}
    </section>
  )
}

