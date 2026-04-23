export function isoNow() {
  return new Date().toISOString()
}

export function computeTotalCents(items) {
  // items: { quantity: int, price: number } where price is currency units
  let total = 0
  for (const it of items) {
    const priceCents = Math.round(it.price * 100)
    total += it.quantity * priceCents
  }
  return total
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
    senderAddress: JSON.parse(row.senderAddress),
    clientAddress: JSON.parse(row.clientAddress),
    items: JSON.parse(row.items),
    totalCents: row.total,
  }
}

export function httpError(res, status, message, details) {
  return res.status(status).json({
    error: {
      message,
      details: details ?? null,
    },
  })
}

