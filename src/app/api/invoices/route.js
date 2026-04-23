import { db } from '@/lib/db.js'
import { invoiceUpsertSchema } from '../_schema.js'
import { asInvoice, computeTotalCents, httpError, newId } from '../_util.js'
import { nanoid } from 'nanoid'

export async function GET(req) {
  const url = new URL(req.url)
  const statusParam = (url.searchParams.get('status') ?? '').trim()
  const statuses = statusParam
    ? statusParam
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  const allowed = new Set(['draft', 'pending', 'paid'])
  for (const s of statuses) {
    if (!allowed.has(s)) return httpError(`Invalid status filter: ${s}`, 400)
  }

  let rows
  if (statuses.length === 0) {
    rows = db.prepare('SELECT * FROM invoices ORDER BY updatedAt DESC').all()
  } else {
    const placeholders = statuses.map(() => '?').join(',')
    rows = db
      .prepare(`SELECT * FROM invoices WHERE status IN (${placeholders}) ORDER BY updatedAt DESC`)
      .all(...statuses)
  }

  return Response.json({ invoices: rows.map(asInvoice) })
}

export async function POST(req) {
  const body = await req.json().catch(() => null)
  const parsed = invoiceUpsertSchema.safeParse(body)
  if (!parsed.success) return httpError('Validation error', 400, parsed.error.flatten())

  const data = parsed.data
  const id = nanoid(8).toUpperCase()
  const now = new Date().toISOString()
  const status = data.status ?? 'pending'
  const total = computeTotalCents(data.items)

  db.prepare(
    `INSERT INTO invoices
      (id, createdAt, updatedAt, status, paymentDue, description, paymentTerms, clientName, clientEmail, senderAddress, clientAddress, items, total)
     VALUES
      (@id, @createdAt, @updatedAt, @status, @paymentDue, @description, @paymentTerms, @clientName, @clientEmail, @senderAddress, @clientAddress, @items, @total)`,
  ).run({
    id,
    createdAt: now,
    updatedAt: now,
    status,
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

  const created = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id)
  return Response.json({ invoice: asInvoice(created) }, { status: 201 })
}


