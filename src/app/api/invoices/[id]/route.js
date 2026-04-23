import { supabaseAdmin } from '../../_supabase/server.js'
import { invoiceUpsertSchema } from '../../_schema.js'
import { asInvoice, computeTotalCents, httpError } from '../../_util.js'

export async function GET(_req, { params }) {
  const { id } = await params
  const sb = supabaseAdmin()
  const { data: row, error } = await sb.from('invoices').select('*').eq('id', id).single()
  if (error) return httpError('Invoice not found', 404)
  return Response.json({ invoice: asInvoice(row) })
}

export async function PUT(req, { params }) {
  const { id } = await params
  const sb = supabaseAdmin()
  const { data: existing, error: exErr } = await sb.from('invoices').select('*').eq('id', id).single()
  if (exErr) return httpError('Invoice not found', 404)

  const current = asInvoice(existing)
  const body = await req.json().catch(() => null)
  const parsed = invoiceUpsertSchema.safeParse(body)
  if (!parsed.success) return httpError('Validation error', 400, parsed.error.flatten())

  const data = parsed.data
  const nextStatus = data.status ?? current.status
  if (current.status === 'paid' && nextStatus !== 'paid')
    return httpError('Paid invoices cannot be changed back', 409)

  const total = computeTotalCents(data.items)

  const { data: updated, error } = await sb
    .from('invoices')
    .update({
      status: nextStatus,
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
    .eq('id', id)
    .select('*')
    .single()

  if (error) return httpError('Failed to update invoice', 500, error)

  return Response.json({ invoice: asInvoice(updated) })
}

export async function DELETE(_req, { params }) {
  const { id } = await params
  const sb = supabaseAdmin()
  const { error } = await sb.from('invoices').delete().eq('id', id)
  if (error) return httpError('Failed to delete invoice', 500, error)
  return new Response(null, { status: 204 })
}


