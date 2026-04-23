"use client"

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { InvoiceFormPage } from '../../../../pages/InvoiceFormPage.jsx'

export default function Page({ params }) {
  const unwrappedParams = use(params)
  const router = useRouter()
  return <InvoiceFormPage mode="edit" invoiceId={unwrappedParams.id} onClose={() => router.push(`/invoice/${unwrappedParams.id}`)} />
}

