const ALL = ['draft', 'pending', 'paid']

function ChevronDown() {
  return (
    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true">
      <path d="M1 1l4.228 4.228L9.456 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function FilterMenu({ value, onChange, open, onToggle }) {
  const has = (s) => value.has(s)
  const toggle = (s) => {
    const next = new Set(value)
    if (next.has(s)) { next.delete(s) } else { next.add(s) }
    onChange(next)
  }
  const activeCount = value.size

  return (
    <div className="filterWrap">
      <button
        type="button"
        className="filterButton"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={onToggle}
      >
        Filter{activeCount > 0 && <span className="filterBadge">{activeCount}</span>}
        <span className="chevron"><ChevronDown /></span>
      </button>

      {open && (
        <div className="popover" role="dialog" aria-label="Filter by status">
          {ALL.map((s) => (
            <label key={s} className="checkbox">
              <input type="checkbox" checked={has(s)} onChange={() => toggle(s)} />
              <span className="checkboxBox">{has(s) && <CheckIcon />}</span>
              <span>{s[0].toUpperCase() + s.slice(1)}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
