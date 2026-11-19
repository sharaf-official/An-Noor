import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, MapPin, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { events } from '../../data/events'

const MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
}

// "21 November 2026" -> Date (null if it can't be read)
function parseDate(str = '') {
  const m = String(str).trim().match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/)
  if (!m) return null
  const month = MONTHS[m[2].toLowerCase()]
  if (month === undefined) return null
  return new Date(Number(m[3]), month, Number(m[1]), 23, 59, 59)
}

// All upcoming events that have not passed yet, nearest first
function getUpcoming() {
  const now = new Date()
  return events
    .filter((e) => e.status === 'upcoming')
    .map((e) => ({ e, d: parseDate(e.date) }))
    .filter((x) => x.d && x.d >= now)
    .sort((a, b) => a.d - b.d)
    .map((x) => x.e)
}

const KEY = 'annoor-event-popup-closed-v2'

export default function UpcomingEventPopup() {
  const [list] = useState(getUpcoming)
  const [idx, setIdx] = useState(0)
  const [show, setShow] = useState(false)
  const [failed, setFailed] = useState({})

  const count = list.length

  useEffect(() => {
    if (!count) return
    try {
      if (sessionStorage.getItem(KEY)) return
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setShow(true), 2500)
    return () => clearTimeout(t)
  }, [count])

  const close = () => {
    setShow(false)
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
  }

  const prev = () => setIdx((i) => (i - 1 + count) % count)
  const next = () => setIdx((i) => (i + 1) % count)

  // Esc / arrow keys + lock page scroll while open
  useEffect(() => {
    if (!show) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (count > 1 && e.key === 'ArrowLeft') prev()
      if (count > 1 && e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = old
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, count])

  if (!count || !show) return null

  const event = list[idx]
  const cover = event.photos?.[0]
  const showCover = cover && !failed[event.id]
  const hasLocation = event.location && !event.location.startsWith('[')

  return (
    <div
      className="event-pop-anim fixed inset-0 z-[60] flex items-center justify-center bg-black/65 p-4 [animation:eventFade_0.3s_ease_both]"
      onClick={close}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Upcoming events"
        onClick={(e) => e.stopPropagation()}
        className="event-pop-anim relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-3xl border-2 border-brand-gold/70 bg-brand-navy text-white shadow-2xl [animation:eventModalIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-brand-gold hover:text-brand-dark"
        >
          <X size={18} />
        </button>

        <div className="overflow-y-auto">
          {/* Poster */}
          <div className="relative bg-brand-dark">
            {showCover ? (
              <img
                key={event.id}
                src={cover}
                alt={event.title}
                onError={() => setFailed((f) => ({ ...f, [event.id]: true }))}
                className="mx-auto max-h-[48vh] w-full object-contain"
              />
            ) : (
              <div className="flex h-40 items-center justify-center">
                <CalendarDays size={44} className="text-brand-gold/60" />
              </div>
            )}

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous event"
                  className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-brand-gold hover:text-brand-dark"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next event"
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-brand-gold hover:text-brand-dark"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Details */}
          <div key={event.id} className="p-5 [animation:eventFade_0.35s_ease_both]">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-block rounded-full bg-brand-gold px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-dark">
                Upcoming Event
              </span>
              {count > 1 && (
                <span className="text-xs font-semibold text-white/60 lining-nums">
                  {idx + 1} / {count}
                </span>
              )}
            </div>

            <h3 className="mt-3 font-display text-xl font-bold leading-snug">{event.title}</h3>

            <div className="mt-2 space-y-1 text-sm text-white/80">
              <p className="flex items-center gap-2">
                <CalendarDays size={15} className="shrink-0 text-brand-gold" />
                {event.date}
              </p>
              {hasLocation && (
                <p className="flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-brand-gold" />
                  <span>{event.location}</span>
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <Link
                to="/events"
                onClick={close}
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-2 text-sm font-bold text-brand-dark transition hover:brightness-110"
              >
                View Details <ArrowRight size={15} />
              </Link>

              {count > 1 && (
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose event">
                  {list.map((ev, i) => (
                    <button
                      key={ev.id}
                      type="button"
                      role="tab"
                      aria-selected={i === idx}
                      aria-label={ev.title}
                      onClick={() => setIdx(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === idx ? 'w-6 bg-brand-gold' : 'w-2 bg-white/35 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}