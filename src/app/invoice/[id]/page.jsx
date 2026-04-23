"use client"

import { use } from 'react'
import { InvoiceDetailPage } from '../../../views/InvoiceDetailPage.jsx'

export default function Page({ params }) {
  const unwrappedParams = use(params)
  return <InvoiceDetailPage id={unwrappedParams.id} />
}

