import { useState } from 'react'
import { CalendarDays, MapPin, ArrowRight, Image as ImageIcon } from 'lucide-react'
import { isDraft } from '../../utils/helpers'

export default function ActivityCard({ item, onOpen }) {
  const [failed, setFailed] = useState(false)
  const cover = item.photos?.[0]
  const showDate = item.date && !isDraft(item.date)
  const showPlace = item.location && !isDraft(item.location)

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-brand-gold/40 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`View details: ${item.title}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-brand-dark to-brand-navy"
      >
        {cover && !failed ? (
          <img
            src={cover}
            alt=""
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-brand-gold/50">
            <ImageIcon size={48} />
          </div>
        )}
        {item.category && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-brand-dark shadow">
            {item.category}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-brand-navy">{item.title}</h3>

        {(showDate || showPlace) && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-gray-600">
            {showDate && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} className="text-brand-gold-dark" />
                {item.date}
              </span>
            )}
            {showPlace && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-brand-gold-dark" />
                {item.location}
              </span>
            )}
          </div>
        )}

        <p className="mt-3 flex-1 text-sm text-gray-600">{item.summary}</p>

        <button
          type="button"
          onClick={() => onOpen(item)}
          className="mt-4 inline-flex items-center gap-2 self-start rounded-full bg-brand-navy px-5 py-2 text-sm font-semibold text-brand-gold transition hover:bg-brand-dark"
        >
          View Details
          <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  )
}