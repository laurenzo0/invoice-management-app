import express from 'express'
import cors from 'cors'
import { nanoid } from 'nanoid'
import { db, withTxn } from './db.js'
import { invoiceStatusSchema, invoiceUpsertSchema } from './schema.js'
import { asInvoice, computeTotalCents, httpError, isoNow } from './util.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.get('/api/invoices', (req, res) => {
  const statusParam = String(req.query.status ?? '').trim()
  const statuses = statusParam
    ? statusParam
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  const allowed = new Set(['draft', 'pending', 'paid'])
  for (const s of statuses) {
    if (!allowed.has(s)) return httpError(res, 400, `Invalid status filter: ${s}`)
  }

  const rows =
    statuses.length === 0
      ? db.prepare('SELECT * FROM invoices ORDER BY updatedAt DESC').all()
      : db
          .prepare(
            `SELECT * FROM invoices WHERE status IN (${statuses
              .map(() => '?')
              .join(',')}) ORDER BY updatedAt DESC`,
          )
          .all(...statuses)

  res.json({ invoices: rows.map(asInvoice) })
})

app.get('/api/invoices/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM invoices WHERE id = ?').get(req.params.id)
  if (!row) return httpError(res, 404, 'Invoice not found')
  res.json({ invoice: asInvoice(row) })
})

app.post('/api/invoices', (req, res) => {
  const parsed = invoiceUpsertSchema.safeParse(req.body)
  if (!parsed.success) {
    return httpError(res, 400, 'Validation error', parsed.error.flatten())
  }
  const data = parsed.data
  const now = isoNow()
  const id = nanoid(8).toUpperCase()
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
  res.status(201).json({ invoice: asInvoice(created) })
})

app.put('/api/invoices/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM invoices WHERE id = ?').get(req.params.id)
  if (!existing) return httpError(res, 404, 'Invoice not found')
  const current = asInvoice(existing)

  const parsed = invoiceUpsertSchema.safeParse(req.body)
  if (!parsed.success) {
    return httpError(res, 400, 'Validation error', parsed.error.flatten())
  }
  const data = parsed.data

  // status transition rules
  const nextStatus = data.status ?? current.status
  if (current.status === 'paid' && nextStatus !== 'paid') {
    return httpError(res, 409, 'Paid invoices cannot be changed back')
  }

  const now = isoNow()
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
    id: req.params.id,
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

  const updated = db.prepare('SELECT * FROM invoices WHERE id = ?').get(req.params.id)
  res.json({ invoice: asInvoice(updated) })
})

app.patch('/api/invoices/:id/status', (req, res) => {
  const existing = db.prepare('SELECT * FROM invoices WHERE id = ?').get(req.params.id)
  if (!existing) return httpError(res, 404, 'Invoice not found')
  const current = asInvoice(existing)

  const parsed = invoiceStatusSchema.safeParse(req.body)
  if (!parsed.success) return httpError(res, 400, 'Validation error', parsed.error.flatten())
  const nextStatus = parsed.data.status

  if (current.status === 'paid' && nextStatus !== 'paid') {
    return httpError(res, 409, 'Paid invoices cannot be changed back')
  }
  if (current.status === 'draft' && nextStatus === 'paid') {
    return httpError(res, 409, 'Draft invoices must go to pending first')
  }

  const now = isoNow()
  db.prepare('UPDATE invoices SET status=?, updatedAt=? WHERE id=?').run(nextStatus, now, req.params.id)
  const updated = db.prepare('SELECT * FROM invoices WHERE id = ?').get(req.params.id)
  res.json({ invoice: asInvoice(updated) })
})

app.delete('/api/invoices/:id', (req, res) => {
  const info = db.prepare('DELETE FROM invoices WHERE id = ?').run(req.params.id)
  if (info.changes === 0) return httpError(res, 404, 'Invoice not found')
  res.status(204).end()
})

// simple seed endpoint for development (idempotent-ish: only if DB empty)
app.post('/api/dev/seed', (req, res) => {
  const count = db.prepare('SELECT COUNT(*) AS c FROM invoices').get().c
  if (count > 0) return res.json({ seeded: false, reason: 'already has data' })

  const now = isoNow()
  const make = withTxn(() => {
    const insert = db.prepare(
      `INSERT INTO invoices
        (id, createdAt, updatedAt, status, paymentDue, description, paymentTerms, clientName, clientEmail, senderAddress, clientAddress, items, total)
       VALUES
        (@id, @createdAt, @updatedAt, @status, @paymentDue, @description, @paymentTerms, @clientName, @clientEmail, @senderAddress, @clientAddress, @items, @total)`,
    )

    for (const inv of demoInvoices()) {
      insert.run(inv)
    }
  })
  make()

  res.json({ seeded: true, createdAt: now })
})

function demoInvoices() {
  const baseAddress = {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  }
  const clientAddress = {
    street: '84 Church Way',
    city: 'Bradford',
    postCode: 'BD1 9PB',
    country: 'United Kingdom',
  }
  const items = [
    { name: 'Brand Guidelines', quantity: 1, price: 1800.9 },
    { name: 'Banner Design', quantity: 1, price: 156.0 },
  ]
  const total = computeTotalCents(items)
  const now = isoNow()
  return [
    {
      id: 'RT3080',
      createdAt: now,
      updatedAt: now,
      status: 'pending',
      paymentDue: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      description: 'Re-branding',
      paymentTerms: 7,
      clientName: 'Jensen Huang',
      clientEmail: 'jensen@example.com',
      senderAddress: JSON.stringify(baseAddress),
      clientAddress: JSON.stringify(clientAddress),
      items: JSON.stringify(items),
      total,
    },
    {
      id: 'XM9141',
      createdAt: now,
      updatedAt: now,
      status: 'draft',
      paymentDue: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      description: 'Landing page design',
      paymentTerms: 14,
      clientName: 'Alex Johnson',
      clientEmail: 'alex@example.com',
      senderAddress: JSON.stringify(baseAddress),
      clientAddress: JSON.stringify(clientAddress),
      items: JSON.stringify([{ name: 'Landing Page', quantity: 1, price: 950 }]),
      total: computeTotalCents([{ name: 'Landing Page', quantity: 1, price: 950 }]),
    },
  ]
}

const port = Number(process.env.PORT ?? 5185)
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})

