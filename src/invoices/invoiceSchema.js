import { z } from 'zod'

const addressSchema = z.object({
  street: z.string().trim().min(1, 'Required'),
  city: z.string().trim().min(1, 'Required'),
  postCode: z.string().trim().min(1, 'Required'),
  country: z.string().trim().min(1, 'Required'),
})

const itemSchema = z.object({
  name: z.string().trim().min(1, 'Required'),
  quantity: z.coerce.number().int().positive('Must be > 0'),
  price: z.coerce.number().positive('Must be > 0'),
})

export const invoiceFormSchema = z.object({
  description: z.string().trim().min(1, 'Required'),
  paymentTerms: z.coerce.number().int().min(1).max(365),
  paymentDue: z.string().trim().min(1, 'Required'),
  clientName: z.string().trim().min(1, 'Client name is required'),
  clientEmail: z.string().trim().email('Must be a valid email'),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z.array(itemSchema).min(1, 'At least one item is required'),
})

export function validateInvoiceForm(values) {
  const parsed = invoiceFormSchema.safeParse(values)
  if (parsed.success) return { ok: true, data: parsed.data, errors: {} }
  const flat = parsed.error.flatten()
  return { ok: false, data: null, errors: flat }
}

