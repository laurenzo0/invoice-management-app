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
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    status: row.status,
    paymentDue: row.paymentDue,
    description: row.description,
    paymentTerms: row.paymentTerms,
    clientName: row.clientName,
    clientEmail: row.clientEmail,
    senderAddress: typeof row.senderAddress === 'string' ? JSON.parse(row.senderAddress) : row.senderAddress,
    clientAddress: typeof row.clientAddress === 'string' ? JSON.parse(row.clientAddress) : row.clientAddress,
    items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items,
    totalCents: row.total,
  }
}


