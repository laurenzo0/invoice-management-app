import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client.js'
import { useInvoices } from '../invoices/useInvoices.js'
import { validateInvoiceForm } from '../invoices/invoiceSchema.js'
import { Modal } from '../ui/Modal.jsx'

const emptyAddress = { street: '', city: '', postCode: '', country: '' }

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function emptyInvoice() {
  return {
    description: '',
    paymentTerms: 30,
    paymentDue: todayIso(),
    clientName: '',
    clientEmail: '',
    senderAddress: { ...emptyAddress },
    clientAddress: { ...emptyAddress },
    items: [{ name: '', quantity: 1, price: 0 }],
  }
}

function fieldErr(errors, path, fallback) {
  const parts = path.split('.')
  let cur = errors?.fieldErrors
  for (const p of parts) {
    if (!cur) return null
    cur = cur[p]
  }
  if (Array.isArray(cur) && cur.length) return cur[0]
  return fallback ?? null
}

export function InvoiceFormPage({ mode, invoiceId, onClose, onCreated }) {
  const { createInvoice, updateInvoice } = useInvoices()
  const [values, setValues] = useState(() => emptyInvoice())
  const [loading, setLoading] = useState(mode === 'edit')
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    let alive = true
    if (mode !== 'edit') return
    ;(async () => {
      setLoading(true)
      try {
        const data = await api.getInvoice(invoiceId)
        if (!alive) return
        const inv = data.invoice
        setValues({
          description: inv.description,
          paymentTerms: inv.paymentTerms,
          paymentDue: inv.paymentDue,
          clientName: inv.clientName,
          clientEmail: inv.clientEmail,
          senderAddress: inv.senderAddress,
          clientAddress: inv.clientAddress,
          items: inv.items.map((it) => ({ name: it.name, quantity: it.quantity, price: it.price })),
        })
      } catch (e) {
        if (alive) setSubmitError(e)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [invoiceId, mode])

  const title = mode === 'edit' ? `Edit #${invoiceId}` : 'New Invoice'

  const onChange = (path, next) => {
    setValues((v) => {
      const copy = structuredClone(v)
      const parts = path.split('.')
      let cur = copy
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]]
      cur[parts[parts.length - 1]] = next
      return copy
    })
  }

  const total = useMemo(() => {
    const cents = values.items.reduce(
      (sum, it) => sum + (Number.isFinite(+it.price) ? Math.round(+it.price * 100) : 0) * (+it.quantity || 0),
      0,
    )
    return (cents / 100).toLocaleString(undefined, { style: 'currency', currency: 'USD' })
  }, [values.items])

  const submit = async (status) => {
    setSubmitError(null)
    const v = { ...values }
    const result = validateInvoiceForm(v)
    if (!result.ok) {
      setErrors(result.errors)
      return
    }
    setErrors(null)
    setSaving(true)
    try {
      const payload = { ...result.data, status }
      if (mode === 'edit') {
        await updateInvoice(invoiceId, payload)
      } else {
        const created = await createInvoice(payload)
        if (onCreated) onCreated(created.id)
        return
      }
      onClose?.()
    } catch (e) {
      setSubmitError(e)
      if (e.details) setErrors(e.details)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      title={title}
      onClose={onClose}
      initialFocusSelector='input[name="clientName"]'
      actions={
        <div className="row gap wrap">
          <button type="button" className="secondaryButton" onClick={onClose} disabled={saving}>
            Discard
          </button>
          <div className="spacer" />
          <button type="button" className="secondaryButton" onClick={() => submit('draft')} disabled={saving || loading}>
            Save as Draft
          </button>
          <button type="button" className="primaryButton" onClick={() => submit('pending')} disabled={saving || loading}>
            Save &amp; Send
          </button>
        </div>
      }
    >
      {loading ? <div className="card">Loading…</div> : null}
      {submitError ? (
        <div className="formError" role="alert">
          {submitError.message}
        </div>
      ) : null}

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault()
          submit('pending')
        }}
      >
        <fieldset className="fieldset">
          <legend className="legend">Bill From</legend>
          <div className="grid2">
            <Field
              label="Street Address"
              name="senderStreet"
              value={values.senderAddress.street}
              error={fieldErr(errors, 'senderAddress.street')}
              onChange={(v) => onChange('senderAddress.street', v)}
            />
            <div />
            <Field
              label="City"
              name="senderCity"
              value={values.senderAddress.city}
              error={fieldErr(errors, 'senderAddress.city')}
              onChange={(v) => onChange('senderAddress.city', v)}
            />
            <Field
              label="Post Code"
              name="senderPostCode"
              value={values.senderAddress.postCode}
              error={fieldErr(errors, 'senderAddress.postCode')}
              onChange={(v) => onChange('senderAddress.postCode', v)}
            />
            <Field
              label="Country"
              name="senderCountry"
              value={values.senderAddress.country}
              error={fieldErr(errors, 'senderAddress.country')}
              onChange={(v) => onChange('senderAddress.country', v)}
            />
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="legend">Bill To</legend>
          <div className="grid2">
            <Field
              label="Client’s Name"
              name="clientName"
              value={values.clientName}
              error={fieldErr(errors, 'clientName')}
              onChange={(v) => onChange('clientName', v)}
            />
            <Field
              label="Client’s Email"
              name="clientEmail"
              value={values.clientEmail}
              error={fieldErr(errors, 'clientEmail')}
              onChange={(v) => onChange('clientEmail', v)}
            />
            <Field
              label="Street Address"
              name="clientStreet"
              value={values.clientAddress.street}
              error={fieldErr(errors, 'clientAddress.street')}
              onChange={(v) => onChange('clientAddress.street', v)}
            />
            <div />
            <Field
              label="City"
              name="clientCity"
              value={values.clientAddress.city}
              error={fieldErr(errors, 'clientAddress.city')}
              onChange={(v) => onChange('clientAddress.city', v)}
            />
            <Field
              label="Post Code"
              name="clientPostCode"
              value={values.clientAddress.postCode}
              error={fieldErr(errors, 'clientAddress.postCode')}
              onChange={(v) => onChange('clientAddress.postCode', v)}
            />
            <Field
              label="Country"
              name="clientCountry"
              value={values.clientAddress.country}
              error={fieldErr(errors, 'clientAddress.country')}
              onChange={(v) => onChange('clientAddress.country', v)}
            />
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="legend">Invoice</legend>
          <div className="grid2">
            <Field
              label="Invoice Date"
              name="paymentDue"
              type="date"
              value={values.paymentDue}
              error={fieldErr(errors, 'paymentDue')}
              onChange={(v) => onChange('paymentDue', v)}
            />
            <Field
              label="Payment Terms (days)"
              name="paymentTerms"
              type="number"
              value={values.paymentTerms}
              error={fieldErr(errors, 'paymentTerms')}
              onChange={(v) => onChange('paymentTerms', v)}
            />
            <Field
              label="Project Description"
              name="description"
              value={values.description}
              error={fieldErr(errors, 'description')}
              onChange={(v) => onChange('description', v)}
            />
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="legend">Item List</legend>
          {typeof errors?.formErrors?.[0] === 'string' ? (
            <div className="formError" role="alert">
              {errors.formErrors[0]}
            </div>
          ) : null}
          <div className="itemsEditor">
            {values.items.map((it, idx) => (
              <div className="itemRow" key={idx}>
                <Field
                  label="Item Name"
                  name={`itemName_${idx}`}
                  value={it.name}
                  error={errors?.fieldErrors?.items?.[idx]?.name?.[0] ?? null}
                  onChange={(v) => {
                    setValues((prev) => {
                      const next = structuredClone(prev)
                      next.items[idx].name = v
                      return next
                    })
                  }}
                />
                <Field
                  label="Qty."
                  name={`itemQty_${idx}`}
                  type="number"
                  value={it.quantity}
                  error={errors?.fieldErrors?.items?.[idx]?.quantity?.[0] ?? null}
                  onChange={(v) => {
                    setValues((prev) => {
                      const next = structuredClone(prev)
                      next.items[idx].quantity = v
                      return next
                    })
                  }}
                />
                <Field
                  label="Price"
                  name={`itemPrice_${idx}`}
                  type="number"
                  value={it.price}
                  error={errors?.fieldErrors?.items?.[idx]?.price?.[0] ?? null}
                  onChange={(v) => {
                    setValues((prev) => {
                      const next = structuredClone(prev)
                      next.items[idx].price = v
                      return next
                    })
                  }}
                />
                <div className="field">
                  <div className="label">Total</div>
                  <div className="readonlyBox">
                    {((+it.quantity || 0) * (Number.isFinite(+it.price) ? +it.price : 0)).toFixed(2)}
                  </div>
                </div>
                <button
                  type="button"
                  className="iconPill danger"
                  aria-label="Remove item"
                  onClick={() => {
                    setValues((prev) => {
                      const next = structuredClone(prev)
                      next.items.splice(idx, 1)
                      return next.items.length ? next : { ...next, items: [{ name: '', quantity: 1, price: 0 }] }
                    })
                  }}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="secondaryButton full"
            onClick={() =>
              setValues((prev) => ({ ...prev, items: [...prev.items, { name: '', quantity: 1, price: 0 }] }))
            }
          >
            + Add New Item
          </button>
          <div className="formTotal subtle">Current total: {total}</div>
        </fieldset>
      </form>
    </Modal>
  )
}

function Field({ label, name, value, onChange, error, type = 'text' }) {
  const id = `f_${name}`
  const hasError = Boolean(error)
  return (
    <div className={`field ${hasError ? 'hasError' : ''}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="input"
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(type === 'number' ? e.target.value : e.target.value)}
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={hasError ? `${id}_err` : undefined}
      />
      {hasError ? (
        <div className="fieldError" id={`${id}_err`}>
          {error}
        </div>
      ) : null}
    </div>
  )
}

