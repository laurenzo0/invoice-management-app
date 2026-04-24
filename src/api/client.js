import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function computeTotalCents(items) {
  let total = 0
  for (const it of items) {
    const priceCents = Math.round(it.price * 100)
    total += it.quantity * priceCents
  }
  return total
}

function newId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

function asInvoice(row) {
  if (!row) return null
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status,
    paymentDue: row.payment_due,
    description: row.description,
    paymentTerms: row.payment_terms,
    clientName: row.client_name,
    clientEmail: row.client_email,
    senderAddress: row.sender_address,
    clientAddress: row.client_address,
    items: row.items,
    totalCents: row.total_cents,
  }
}

const MOCK_INVOICES = [
  {
    id: 'RT3080', createdAt: '2021-08-18T00:00:00Z', paymentDue: '2021-08-19T00:00:00Z',
    description: 'Re-branding', paymentTerms: 1, clientName: 'Jensen Huang', clientEmail: 'jensenh@mail.com',
    status: 'paid', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '106 Kendell Street', city: 'Sharrington', postCode: 'NR24 5WQ', country: 'United Kingdom' },
    items: [{ name: 'Brand Guidelines', quantity: 1, price: 1800.90 }], totalCents: 180090
  },
  {
    id: 'XM9141', createdAt: '2021-08-21T00:00:00Z', paymentDue: '2021-09-20T00:00:00Z',
    description: 'Graphic Design', paymentTerms: 30, clientName: 'Alex Grim', clientEmail: 'alexgrim@mail.com',
    status: 'pending', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '84 Church Way', city: 'Bradford', postCode: 'BD1 9PB', country: 'United Kingdom' },
    items: [{ name: 'Banner Design', quantity: 1, price: 156.00 }, { name: 'Email Design', quantity: 2, price: 200.00 }], totalCents: 55600
  },
  {
    id: 'RG0314', createdAt: '2021-09-24T00:00:00Z', paymentDue: '2021-10-01T00:00:00Z',
    description: 'Website Redesign', paymentTerms: 7, clientName: 'John Morrison', clientEmail: 'jm@myco.com',
    status: 'paid', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '79 Dover Road', city: 'Westhall', postCode: 'IP19 3PF', country: 'United Kingdom' },
    items: [{ name: 'Website Redesign', quantity: 1, price: 14002.33 }], totalCents: 1400233
  },
  {
    id: 'RT2080', createdAt: '2021-10-11T00:00:00Z', paymentDue: '2021-10-12T00:00:00Z',
    description: 'Logo Concept', paymentTerms: 1, clientName: 'Alysa Werner', clientEmail: 'alysa@email.co.uk',
    status: 'pending', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '63 Warwick Road', city: 'Carlisle', postCode: 'CA2 5TG', country: 'United Kingdom' },
    items: [{ name: 'Logo Sketches', quantity: 1, price: 102.04 }], totalCents: 10204
  },
  {
    id: 'AA1449', createdAt: '2021-10-07T00:00:00Z', paymentDue: '2021-10-14T00:00:00Z',
    description: 'Re-branding', paymentTerms: 7, clientName: 'Mellisa Clarke', clientEmail: 'mellisa.clarke@example.com',
    status: 'pending', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '46 Abbey Row', city: 'Cambridge', postCode: 'CB1 3EG', country: 'United Kingdom' },
    items: [{ name: 'New Logo', quantity: 1, price: 1532.33 }, { name: 'Brand Guidelines', quantity: 1, price: 2500.00 }], totalCents: 403233
  },
  {
    id: 'TY9141', createdAt: '2021-10-01T00:00:00Z', paymentDue: '2021-10-31T00:00:00Z',
    description: 'Landing Page Design', paymentTerms: 30, clientName: 'Thomas Wayne', clientEmail: 'thomas@dc.com',
    status: 'pending', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '3964  Queens Lane', city: 'Gotham', postCode: '60457', country: 'United States of America' },
    items: [{ name: 'Web Design', quantity: 1, price: 6155.91 }], totalCents: 615591
  },
  {
    id: 'FV2353', createdAt: '2021-11-05T00:00:00Z', paymentDue: '2021-11-12T00:00:00Z',
    description: 'Logo Re-design', paymentTerms: 7, clientName: 'Anita Wainwright', clientEmail: 'anita@email.com',
    status: 'draft', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '319  Burnam Grove', city: 'Liverpool', postCode: 'L13 0PE', country: 'United Kingdom' },
    items: [{ name: 'Logo Re-design', quantity: 1, price: 3102.04 }], totalCents: 310204
  }
]

export const api = {
  listInvoices: async ({ statuses } = {}) => {
    let query = supabase.from('invoices').select('*').order('updated_at', { ascending: false })
    if (statuses && statuses.length > 0) {
      query = query.in('status', statuses)
    }
    const { data: rows, error } = await query
    
    if (error || !rows || rows.length === 0) {
      const filtered = statuses && statuses.length ? MOCK_INVOICES.filter(i => statuses.includes(i.status)) : MOCK_INVOICES;
      return { invoices: filtered }
    }
    
    return { invoices: rows.map(asInvoice) }
  },
  
  getInvoice: async (id) => {
    const { data: row, error } = await supabase.from('invoices').select('*').eq('id', id).single()
    if (error || !row) {
      const mock = MOCK_INVOICES.find(i => i.id === id)
      if (mock) return { invoice: mock }
      throw error || new Error('Not found')
    }
    return { invoice: asInvoice(row) }
  },
  
  createInvoice: async (payload) => {
    const id = newId()
    const status = payload.status ?? 'pending'
    const total = computeTotalCents(payload.items)
    
    const { data: created, error } = await supabase
      .from('invoices')
      .insert({
        id,
        status,
        payment_due: payload.paymentDue,
        description: payload.description,
        payment_terms: payload.paymentTerms,
        client_name: payload.clientName,
        client_email: payload.clientEmail,
        sender_address: payload.senderAddress,
        client_address: payload.clientAddress,
        items: payload.items,
        total_cents: total,
      })
      .select('*')
      .single()
      
    if (error) throw error
    return { invoice: asInvoice(created) }
  },
  
  updateInvoice: async (id, payload) => {
    const total = computeTotalCents(payload.items)
    const { data: updated, error } = await supabase
      .from('invoices')
      .update({
        status: payload.status,
        payment_due: payload.paymentDue,
        description: payload.description,
        payment_terms: payload.paymentTerms,
        client_name: payload.clientName,
        client_email: payload.clientEmail,
        sender_address: payload.senderAddress,
        client_address: payload.clientAddress,
        items: payload.items,
        total_cents: total,
      })
      .eq('id', id)
      .select('*')
      .single()
      
    if (error) throw error
    return { invoice: asInvoice(updated) }
  },
  
  deleteInvoice: async (id) => {
    const { error } = await supabase.from('invoices').delete().eq('id', id)
    if (error) throw error
  },
  
  setStatus: async (id, status) => {
    const { data: updated, error } = await supabase
      .from('invoices')
      .update({ status })
      .eq('id', id)
      .select('*')
      .single()
      
    if (error) throw error
    return { invoice: asInvoice(updated) }
  },
  
  seed: async () => {
    // Basic seed if needed for client side
    const baseAddress = { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' }
    const clientAddress = { street: '84 Church Way', city: 'Bradford', postCode: 'BD1 9PB', country: 'United Kingdom' }
    const itemsA = [{ name: 'Brand Guidelines', quantity: 1, price: 1800.9 }, { name: 'Banner Design', quantity: 1, price: 156.0 }]
    const itemsB = [{ name: 'Landing Page', quantity: 1, price: 950 }]
    
    const demoData = [
      {
        id: 'RT3080', status: 'pending', payment_due: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
        description: 'Re-branding', payment_terms: 7, client_name: 'Jensen Huang', client_email: 'jensen@example.com',
        sender_address: baseAddress, client_address: clientAddress, items: itemsA, total_cents: computeTotalCents(itemsA),
      },
      {
        id: 'XM9141', status: 'draft', payment_due: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
        description: 'Landing page design', payment_terms: 14, client_name: 'Alex Johnson', client_email: 'alex@example.com',
        sender_address: baseAddress, client_address: clientAddress, items: itemsB, total_cents: computeTotalCents(itemsB),
      },
    ]
    const { error } = await supabase.from('invoices').insert(demoData)
    if (error) throw error
    return { seeded: true }
  }
}
