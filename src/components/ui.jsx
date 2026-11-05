import { useEffect } from 'react'
import { AlertTriangle, Search, X } from 'lucide-react'

export function Badge({ children, tone = 'default', className = '' }) {
  return <span className={`badge ${tone !== 'default' ? `badge-${tone}` : ''} ${className}`}>{children}</span>
}

export function ProgressBar({ value = 0, tone = '', height }) {
  const safe = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className="progress" style={height ? { height } : undefined} role="progressbar" aria-valuenow={safe} aria-valuemin={0} aria-valuemax={100}>
      <div className={`progress-bar ${tone}`} style={{ width: `${safe}%` }} />
    </div>
  )
}

export function SectionHead({ eyebrow, title, sub, center = true, children }) {
  return (
    <div className={`section-head ${center ? '' : 'left'}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
      {children}
    </div>
  )
}

export function EmptyState({ icon, title, text, action }) {
  return (
    <div className="empty">
      <div className="empty-icon">{icon || <Search size={22} />}</div>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {action && <div className="mt-16">{action}</div>}
    </div>
  )
}

export function Loader({ label = 'Loading…', dark = false }) {
  return (
    <div className="loading-block">
      <div className={`spinner lg ${dark ? 'dark' : ''}`} />
      <span>{label}</span>
    </div>
  )
}

export function SearchInput({ value, onChange, placeholder = 'Search…', onClear }) {
  return (
    <div className="search-wrap">
      <span className="search-icon">
        <Search size={17} />
      </span>
      <input
        className="input"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
      />
      {value && (
        <button type="button" className="clear-btn" onClick={() => (onClear ? onClear() : onChange(''))} aria-label="Clear search">
          <X size={15} />
        </button>
      )}
    </div>
  )
}

export function Modal({ open, onClose, title, children, footer, wide = false }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose?.()} role="presentation">
      <div className="modal" style={wide ? { maxWidth: 820 } : undefined} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-head">
          <h3 className="h3" style={{ fontSize: '1.15rem' }}>{title}</h3>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close dialog">
            <X size={17} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  )
}

export function FieldError({ children }) {
  if (!children) return null
  return (
    <span className="field-error">
      <AlertTriangle size={13} /> {children}
    </span>
  )
}

export function DifficultyMeter({ score = 1, max = 5 }) {
  return (
    <div className="diff-dots" aria-label={`Difficulty ${score} of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`diff-dot ${i < score ? 'on' : ''}`} />
      ))}
    </div>
  )
}

export function StatCard({ icon, tone = '', value, label, delta }) {
  return (
    <div className="kpi">
      <div className="kpi-top">
        <span className={`kpi-icon ${tone}`}>{icon}</span>
        {delta && <span className="badge badge-green">{delta}</span>}
      </div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}
