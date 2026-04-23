import { supabaseAdmin } from '../../_supabase/server.js'
import { computeTotalCents, httpError } from '../../_util.js'

export async function POST() {
  if (process.env.NODE_ENV === 'production') return httpError('Not available in production', 404)

  const sb = supabaseAdmin()
  const { count } = await sb.from('invoices').select('*', { count: 'exact', head: true })
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

  const demoData = [
    {
      id: 'RT3080',
      status: 'pending',
      payment_due: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      description: 'Re-branding',
      payment_terms: 7,
      client_name: 'Jensen Huang',
      client_email: 'jensen@example.com',
      sender_address: baseAddress,
      client_address: clientAddress,
      items: itemsA,
      total_cents: computeTotalCents(itemsA),
    },
    {
      id: 'XM9141',
      status: 'draft',
      payment_due: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      description: 'Landing page design',
      payment_terms: 14,
      client_name: 'Alex Johnson',
      client_email: 'alex@example.com',
      sender_address: baseAddress,
      client_address: clientAddress,
      items: itemsB,
      total_cents: computeTotalCents(itemsB),
    },
  ]

  const { error } = await sb.from('invoices').insert(demoData)
  if (error) return httpError('Failed to seed database', 500, error)

  return Response.json({ seeded: true })
}


