import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, CalendarDays, MapPin } from 'lucide-react'
import { isDraft } from '../../utils/helpers'

export default function ActivityModal({ item, onClose }) {
  const [broken, setBroken] = useState(() => new Set())

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const photos = (item.photos || []).filter((s) => !broken.has(s))
  const showDate = item.date && !isDraft(item.date)
  const showPlace = item.location && !isDraft(item.location)

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-brand-dark/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="sticky top-3 z-10 float-right mr-3 mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-brand-gold shadow-lg transition hover:bg-brand-gold hover:text-brand-dark"
        >
          <X size={20} />
        </button>

        {photos.length > 0 && (
          <div className={`grid gap-1 ${photos.length > 1 ? 'sm:grid-cols-2' : ''}`}>
            {photos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${item.title} photo ${i + 1}`}
                onError={() => setBroken((p) => new Set(p).add(src))}
                className={`w-full object-cover ${
                  photos.length === 1 ? 'max-h-[50vh]' : 'aspect-[4/3]'
                } ${photos.length % 2 === 1 && i === 0 && photos.length > 1 ? 'sm:col-span-2' : ''}`}
              />
            ))}
          </div>
        )}

        <div className="p-6 sm:p-8">
          {item.category && (
            <span className="inline-block rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-brand-dark">
              {item.category}
            </span>
          )}
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-brand-navy sm:text-3xl">
            {item.title}
          </h2>

          {(showDate || showPlace) && (
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium text-gray-600">
              {showDate && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={16} className="text-brand-gold-dark" />
                  {item.date}
                </span>
              )}
              {showPlace && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={16} className="text-brand-gold-dark" />
                  {item.location}
                </span>
              )}
            </div>
          )}

          <div className="mt-5 space-y-3 text-gray-700">
            {item.description.map((p, i) => (
              <p
                key={i}
                className={
                  isDraft(p)
                    ? 'rounded-lg border border-dashed border-brand-blue/30 bg-brand-cream p-3 text-sm italic text-gray-500'
                    : ''
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}