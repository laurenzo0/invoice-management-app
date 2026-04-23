import { db } from '@/lib/db.js'
import { invoiceUpsertSchema } from '../../_schema.js'
import { asInvoice, computeTotalCents, httpError } from '../../_util.js'

export async function GET(_req, { params }) {
  const { id } = await params
  const row = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id)
  if (!row) return httpError('Invoice not found', 404)
  return Response.json({ invoice: asInvoice(row) })
}

export async function PUT(req, { params }) {
  const { id } = await params
  const existing = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id)
  if (!existing) return httpError('Invoice not found', 404)

  const current = asInvoice(existing)
  const body = await req.json().catch(() => null)
  const parsed = invoiceUpsertSchema.safeParse(body)
  if (!parsed.success) return httpError('Validation error', 400, parsed.error.flatten())

  const data = parsed.data
  const nextStatus = data.status ?? current.status
  if (current.status === 'paid' && nextStatus !== 'paid')
    return httpError('Paid invoices cannot be changed back', 409)

  const now = new Date().toISOString()
  const total = computeTotalCents(data.items)

  db.prepare(
    `UPDATE invoices SET
      updatedAt=@updatedAt,
      status=@status,
      paymentDue=@paymentDue,
      description=@description,
      paymentTerms=@paymentTerms,
      clientName=@clientName,
      clientEmail=@clientEmail,
      senderAddress=@senderAddress,
      clientAddress=@clientAddress,
      items=@items,
      total=@total
     WHERE id=@id`,
  ).run({
    id,
    updatedAt: now,
    status: nextStatus,
    paymentDue: data.paymentDue,
    description: data.description,
    paymentTerms: data.paymentTerms,
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    senderAddress: JSON.stringify(data.senderAddress),
    clientAddress: JSON.stringify(data.clientAddress),
    items: JSON.stringify(data.items),
    total,
  })

  const updated = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id)
  return Response.json({ invoice: asInvoice(updated) })
}

export async function DELETE(_req, { params }) {
  const { id } = await params
  const info = db.prepare('DELETE FROM invoices WHERE id = ?').run(id)
  if (!info || info.changes === 0) return httpError('Invoice not found', 404)
  return new Response(null, { status: 204 })
}


