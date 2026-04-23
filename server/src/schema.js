import { z } from 'zod'

const addressSchema = z.object({
  street: z.string().trim().min(1, 'Required'),
  city: z.string().trim().min(1, 'Required'),
  postCode: z.string().trim().min(1, 'Required'),
  country: z.string().trim().min(1, 'Required'),
})

const itemSchema = z.object({
  name: z.string().trim().min(1, 'Required'),
  quantity: z.number().int().positive('Must be > 0'),
  price: z.number().positive('Must be > 0'), // decimal allowed; will be converted to cents
})

export const invoiceUpsertSchema = z
  .object({
    status: z.enum(['draft', 'pending', 'paid']).optional(),

    description: z.string().trim().min(1, 'Required'),
    paymentTerms: z.number().int().min(1).max(365),
    paymentDue: z.string().trim().min(1, 'Required'), // ISO yyyy-mm-dd

    clientName: z.string().trim().min(1, 'Client name is required'),
    clientEmail: z.string().trim().email('Must be a valid email'),

    senderAddress: addressSchema,
    clientAddress: addressSchema,

    items: z.array(itemSchema).min(1, 'At least one item is required'),
  })
  .strict()

export const invoiceStatusSchema = z.object({
  status: z.enum(['draft', 'pending', 'paid']),
})

