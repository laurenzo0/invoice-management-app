import { useEffect, useId, useRef } from 'react'

function getFocusable(container) {
  if (!container) return []
  const nodes = container.querySelectorAll(
    'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])',
  )
  return [...nodes].filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
}

export function Modal({ title, children, onClose, actions, initialFocusSelector }) {
  const overlayRef = useRef(null)
  const dialogRef = useRef(null)

  const reactId = useId()
  const ariaTitleId = `modal_${reactId}`

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose?.()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = getFocusable(dialogRef.current)
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      if (e.shiftKey) {
        if (active === first || !dialogRef.current.contains(active)) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const t = window.setTimeout(() => {
      const root = dialogRef.current
      const target = initialFocusSelector ? root?.querySelector(initialFocusSelector) : null
      const focusables = getFocusable(root)
      ;(target ?? focusables[0] ?? root)?.focus?.()
    }, 0)

    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [initialFocusSelector, onClose])

  return (
    <div
      className="modalOverlay"
      ref={overlayRef}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onClose?.()
      }}
    >
      <div
        className="modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaTitleId}
        tabIndex={-1}
      >
        <div className="modalHeader">
          <h2 className="h2" id={ariaTitleId}>
            {title}
          </h2>
          <button className="iconPill" type="button" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="modalBody">{children}</div>
        {actions ? <div className="modalActions">{actions}</div> : null}
      </div>
    </div>
  )
}

