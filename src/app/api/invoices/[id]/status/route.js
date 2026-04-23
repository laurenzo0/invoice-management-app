import { db } from '@/lib/db.js'
import { invoiceStatusSchema } from '../../../_schema.js'
import { asInvoice, httpError } from '../../../_util.js'

export async function PATCH(req, { params }) {
  const { id } = await params
  const existing = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id)
  if (!existing) return httpError('Invoice not found', 404)
  const current = asInvoice(existing)

  const body = await req.json().catch(() => null)
  const parsed = invoiceStatusSchema.safeParse(body)
  if (!parsed.success) return httpError('Validation error', 400, parsed.error.flatten())
  const nextStatus = parsed.data.status

  if (current.status === 'paid' && nextStatus !== 'paid') return httpError('Paid invoices cannot be changed back', 409)
  if (current.status === 'draft' && nextStatus === 'paid')
    return httpError('Draft invoices must go to pending first', 409)

  const now = new Date().toISOString()
  db.prepare('UPDATE invoices SET status=?, updatedAt=? WHERE id=?').run(nextStatus, now, id)

  const updated = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id)
  return Response.json({ invoice: asInvoice(updated) })
}

