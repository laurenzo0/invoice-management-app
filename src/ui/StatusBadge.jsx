const META = {
  draft: { label: 'Draft', cls: 'draft' },
  pending: { label: 'Pending', cls: 'pending' },
  paid: { label: 'Paid', cls: 'paid' },
}

export function StatusBadge({ status }) {
  const m = META[status] ?? { label: String(status ?? '—'), cls: 'unknown' }
  return (
    <span className={`statusBadge ${m.cls}`}>
      <span className="dot" aria-hidden="true" />
      {m.label}
    </span>
  )
}

