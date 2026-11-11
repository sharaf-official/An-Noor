import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ items, index, onClose, onNav }) {
  const item = items[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNav(-1)
      if (e.key === 'ArrowRight') onNav(1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNav])

  if (!item) return null

  const btn =
    'flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy/90 text-brand-gold shadow-lg transition hover:bg-brand-gold hover:text-brand-dark'

  return createPortal(
    <div
      className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-brand-dark/95 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button type="button" onClick={onClose} aria-label="Close" className={`${btn} absolute right-4 top-4`}>
        <X size={22} />
      </button>

      <img
        src={item.src}
        alt={item.caption || ''}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
      />
      {item.caption && (
        <p className="mt-4 max-w-xl text-center text-sm text-white/85" onClick={(e) => e.stopPropagation()}>
          {item.caption}
        </p>
      )}

      {items.length > 1 && (
        <div className="mt-4 flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => onNav(-1)} aria-label="Previous photo" className={btn}>
            <ChevronLeft size={22} />
          </button>
          <span className="text-sm text-white/70">
            {index + 1} / {items.length}
          </span>
          <button type="button" onClick={() => onNav(1)} aria-label="Next photo" className={btn}>
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>,
    document.body,
  )
}