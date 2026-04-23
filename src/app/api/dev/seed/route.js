import { db, withTxn } from '@/lib/db.js'
import { computeTotalCents, httpError } from '../../_util.js'

export async function POST() {
  if (process.env.NODE_ENV === 'production') return httpError('Not available in production', 404)

  const count = db.prepare('SELECT COUNT(*) AS c FROM invoices').get().c
  if (count > 0) return Response.json({ seeded: false, reason: 'already has data' })

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
  const itemsA = [
    { name: 'Brand Guidelines', quantity: 1, price: 1800.9 },
    { name: 'Banner Design', quantity: 1, price: 156.0 },
  ]
  const itemsB = [{ name: 'Landing Page', quantity: 1, price: 950 }]

  const now = new Date().toISOString()
  const demoData = [
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
      items: JSON.stringify(itemsA),
      total: computeTotalCents(itemsA),
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
      items: JSON.stringify(itemsB),
      total: computeTotalCents(itemsB),
    },
  ]

  const make = withTxn(() => {
    const insert = db.prepare(
      `INSERT INTO invoices
        (id, createdAt, updatedAt, status, paymentDue, description, paymentTerms, clientName, clientEmail, senderAddress, clientAddress, items, total)
       VALUES
        (@id, @createdAt, @updatedAt, @status, @paymentDue, @description, @paymentTerms, @clientName, @clientEmail, @senderAddress, @clientAddress, @items, @total)`,
    )
    for (const inv of demoData) {
      insert.run(inv)
    }
  })
  make()

  return Response.json({ seeded: true })
}


