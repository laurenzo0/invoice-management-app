import { Routes, Route } from 'react-router-dom'
import { InvoiceListPage } from './views/InvoiceListPage.jsx'
import { InvoiceDetailPage } from './views/InvoiceDetailPage.jsx'
import { InvoiceFormPage } from './views/InvoiceFormPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<InvoiceListPage />} />
      <Route path="/invoice/new" element={<InvoiceListPage showNewForm={true} />} />
      <Route path="/invoice/:id" element={<InvoiceDetailPageWrapper />} />
      <Route path="/invoice/:id/edit" element={<InvoiceDetailPageWrapper showEditForm={true} />} />
    </Routes>
  )
}

import { useParams, useNavigate } from 'react-router-dom'

function InvoiceDetailPageWrapper({ showEditForm }) {
  const { id } = useParams()
  const navigate = useNavigate()
  
  return (
    <>
      <InvoiceDetailPage id={id} />
      {showEditForm && (
        <InvoiceFormPage 
          mode="edit" 
          invoiceId={id} 
          onClose={() => navigate(`/invoice/${id}`)} 
        />
      )}
    </>
  )
}
