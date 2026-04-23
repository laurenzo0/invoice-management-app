import { supabaseAdmin } from '../_supabase/server.js'
import { invoiceUpsertSchema } from '../_schema.js'
import { asInvoice, computeTotalCents, httpError, newId } from '../_util.js'

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

  const sb = supabaseAdmin()
  let query = sb.from('invoices').select('*').order('updated_at', { ascending: false })

  if (statuses.length > 0) {
    query = query.in('status', statuses)
  }

  const { data: rows, error } = await query
  if (error) return httpError('Failed to fetch invoices', 500, error)

  return Response.json({ invoices: rows.map(asInvoice) })
}

export async function POST(req) {
  const body = await req.json().catch(() => null)
  const parsed = invoiceUpsertSchema.safeParse(body)
  if (!parsed.success) return httpError('Validation error', 400, parsed.error.flatten())

  const data = parsed.data
  const id = newId()
  const status = data.status ?? 'pending'
  const total = computeTotalCents(data.items)

  const sb = supabaseAdmin()
  const { data: created, error } = await sb
    .from('invoices')
    .insert({
      id,
      status,
      payment_due: data.paymentDue,
      description: data.description,
      payment_terms: data.paymentTerms,
      client_name: data.clientName,
      client_email: data.clientEmail,
      sender_address: data.senderAddress,
      client_address: data.clientAddress,
      items: data.items,
      total_cents: total,
    })
    .select('*')
    .single()

  if (error) return httpError('Failed to create invoice', 500, error)

  return Response.json({ invoice: asInvoice(created) }, { status: 201 })
}


