import { nanoid } from 'nanoid'

export function httpError(message, status = 400, details = null) {
  return Response.json({ error: { message, details } }, { status })
}

export function computeTotalCents(items) {
  let total = 0
  for (const it of items) {
    const priceCents = Math.round(it.price * 100)
    total += it.quantity * priceCents
  }
  return total
}

export function newId() {
  return nanoid(8).toUpperCase()
}

export function asInvoice(row) {
  if (!row) return null
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status,
    paymentDue: row.payment_due,
    description: row.description,
    paymentTerms: row.payment_terms,
    clientName: row.client_name,
    clientEmail: row.client_email,
    senderAddress: row.sender_address,
    clientAddress: row.client_address,
    items: row.items,
    totalCents: row.total_cents,
  }
}


