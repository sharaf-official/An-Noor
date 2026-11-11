import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { isDraft } from '../../utils/helpers'

export default function CopyButton({ value, label = 'Copy' }) {
  const [done, setDone] = useState(false)
  const disabled = isDraft(value)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      disabled={disabled}
      aria-label={`${label} ${value}`}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-gold/60 px-3 py-1.5 text-xs font-semibold text-brand-gold transition hover:bg-brand-gold hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand-gold"
    >
      {done ? <Check size={14} /> : <Copy size={14} />}
      {done ? 'Copied' : label}
    </button>
  )
}