"use client"

import { useRouter } from 'next/navigation'
import { InvoiceFormPage } from '../../../views/InvoiceFormPage.jsx'

export default function Page() {
  const router = useRouter()
  return (
    <InvoiceFormPage mode="new" onClose={() => router.push('/')} onCreated={(id) => router.push(`/invoice/${id}`)} />
  )
}

