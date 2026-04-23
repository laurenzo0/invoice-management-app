const ALL = ['draft', 'pending', 'paid']

export function FilterMenu({ value, onChange }) {
  const has = (s) => value.has(s)
  const toggle = (s) => {
    const next = new Set(value)
    if (next.has(s)) next.delete(s)
    else next.add(s)
    onChange(next)
  }

  return (
    <div className="filterMenu" role="group" aria-label="Filter by status">
      {ALL.map((s) => (
        <label key={s} className="checkbox">
          <input type="checkbox" checked={has(s)} onChange={() => toggle(s)} />
          <span>{s[0].toUpperCase() + s.slice(1)}</span>
        </label>
      ))}
    </div>
  )
}

