import { supabaseAdmin } from '../../../_supabase/server.js'
import { invoiceStatusSchema } from '../../../_schema.js'
import { asInvoice, httpError } from '../../../_util.js'

export async function PATCH(req, { params }) {
  const { id } = await params
  const sb = supabaseAdmin()
  const { data: existing, error: exErr } = await sb.from('invoices').select('*').eq('id', id).single()
  if (exErr) return httpError('Invoice not found', 404)
  const current = asInvoice(existing)

  const body = await req.json().catch(() => null)
  const parsed = invoiceStatusSchema.safeParse(body)
  if (!parsed.success) return httpError('Validation error', 400, parsed.error.flatten())
  const nextStatus = parsed.data.status

  if (current.status === 'paid' && nextStatus !== 'paid') return httpError('Paid invoices cannot be changed back', 409)
  if (current.status === 'draft' && nextStatus === 'paid')
    return httpError('Draft invoices must go to pending first', 409)

  const { data: updated, error } = await sb
    .from('invoices')
    .update({ status: nextStatus })
    .eq('id', id)
    .select('*')
    .single()

  if (error) return httpError('Failed to update status', 500, error)
  return Response.json({ invoice: asInvoice(updated) })
}

