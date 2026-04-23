const API_BASE = 'http://localhost:5185/api'

async function jsonFetch(path, init) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })
  if (res.status === 204) return null
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const message = data?.error?.message ?? `Request failed (${res.status})`
    const err = new Error(message)
    err.status = res.status
    err.details = data?.error?.details ?? null
    throw err
  }
  return data
}

export const api = {
  listInvoices: async ({ statuses } = {}) => {
    const qs = statuses?.length ? `?status=${encodeURIComponent(statuses.join(','))}` : ''
    return await jsonFetch(`/invoices${qs}`)
  },
  getInvoice: async (id) => await jsonFetch(`/invoices/${encodeURIComponent(id)}`),
  createInvoice: async (payload) =>
    await jsonFetch('/invoices', { method: 'POST', body: JSON.stringify(payload) }),
  updateInvoice: async (id, payload) =>
    await jsonFetch(`/invoices/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteInvoice: async (id) =>
    await jsonFetch(`/invoices/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  setStatus: async (id, status) =>
    await jsonFetch(`/invoices/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  seed: async () => await jsonFetch('/dev/seed', { method: 'POST', body: '{}' }),
}

