import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight, Maximize2, CalendarDays, MapPin, Play } from 'lucide-react'

// Accepts string or { src | url | image | photo }
const toSrc = (p) => (typeof p === 'string' ? p : p?.src || p?.url || p?.image || p?.photo || '')

// Hide unfilled placeholders like "[PLACEHOLDER: date]"
const clean = (v) => (typeof v === 'string' && /\[\s*placeholder/i.test(v) ? '' : v || '')

// YouTube link -> video id (watch, youtu.be, shorts, embed)
const youtubeId = (url = '') => {
  const m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/))([\w-]{11})/)
  return m ? m[1] : ''
}

// Video entry: string (mp4 path or YouTube link) or { src | url, poster }
const toVideo = (v) => {
  const src = toSrc(v)
  if (!src) return null
  const id = youtubeId(src)
  if (id) {
    return {
      type: 'youtube',
      src: `https://www.youtube.com/embed/${id}?rel=0`,
      thumb: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    }
  }
  return { type: 'video', src, thumb: (typeof v === 'object' && v?.poster) || '' }
}

export default function ActivityModal(props) {
  const { open, isOpen, onClose, close } = props
  const data = props.item || props.activity || props.event || props.data || props.project || null
  const handleClose = onClose || close || (() => {})
  const visible = open !== false && isOpen !== false && !!data

  // Media list: photos first, then videos
  const media = (() => {
    if (!data) return []
    const list = data.photos || data.images || data.gallery
    let imgs = []
    if (Array.isArray(list) && list.length) imgs = list.map(toSrc).filter(Boolean)
    else {
      const single = data.image || data.photo || data.img || data.cover || data.thumbnail
      if (single) imgs = [toSrc(single)].filter(Boolean)
    }
    const vids = [].concat(data.videos || data.video || []).map(toVideo).filter(Boolean)
    return [...imgs.map((src) => ({ type: 'image', src, thumb: src })), ...vids]
  })()

  const title = data?.title || data?.name || ''
  const date = clean(data?.date)
  const location = clean(data?.location || data?.venue)
  const tag = data?.tag || data?.category || data?.type || ''
  const rawDesc = data?.description || data?.desc || data?.text || data?.summary || data?.content || ''
  // description can be a string or an array of paragraphs
  const paragraphs = (Array.isArray(rawDesc) ? rawDesc : String(rawDesc).split('\n'))
    .map((p) => String(p).trim())
    .filter(Boolean)

  const [idx, setIdx] = useState(0)
  const [full, setFull] = useState(false)
  const touchX = useRef(null)
  const count = media.length
  const current = media[idx]

  // Reset when a different item opens
  useEffect(() => {
    setIdx(0)
    setFull(false)
  }, [data])

  // Fullscreen is for photos only
  useEffect(() => {
    if (full && current && current.type !== 'image') setFull(false)
  }, [full, current])

  const go = (d) => setIdx((i) => (count ? (i + d + count) % count : 0))

  // Esc / arrows + body scroll lock
  useEffect(() => {
    if (!visible) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (full) setFull(false)
        else handleClose()
      } else if (e.target?.tagName === 'VIDEO') {
        return // let the video player use its own arrow keys
      } else if (e.key === 'ArrowRight' && count > 1) go(1)
      else if (e.key === 'ArrowLeft' && count > 1) go(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, full, count])

  if (!visible) return null

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current == null || count < 2 || current?.type !== 'image') return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  const arrow =
    'absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-brand-gold hover:text-brand-dark'

  return createPortal(
    <>
      {/* Modal */}
      <div
        className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/75 sm:items-center sm:p-6"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-3xl sm:rounded-3xl"
        >
          {/* Close (always visible, over the media) */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur transition hover:bg-brand-gold hover:text-brand-dark"
          >
            <X size={20} />
          </button>

          {/* Media: full width, dark bg, never cropped */}
          {count > 0 && (
            <div className="shrink-0 bg-brand-dark">
              <div
                className="relative flex min-h-[180px] w-full items-center justify-center overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {current.type === 'image' && (
                  <>
                    {/* Blurred copy fills the empty side bands */}
                    <img
                      src={current.src}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-2xl"
                    />
                    <img
                      key={current.src}
                      src={current.src}
                      alt={title}
                      onClick={() => setFull(true)}
                      className="relative h-auto max-h-[34vh] w-full cursor-zoom-in object-contain sm:max-h-[46vh]"
                    />
                    <button
                      type="button"
                      onClick={() => setFull(true)}
                      aria-label="View fullscreen"
                      className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-brand-gold hover:text-brand-dark"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </>
                )}

                {current.type === 'video' && (
                  <video
                    key={current.src}
                    src={current.src}
                    poster={current.thumb || undefined}
                    controls
                    playsInline
                    preload="metadata"
                    className="relative h-auto max-h-[34vh] w-full bg-black object-contain sm:max-h-[46vh]"
                  />
                )}

                {current.type === 'youtube' && (
                  <div className="relative aspect-video max-h-[34vh] w-full bg-black sm:max-h-[46vh]">
                    <iframe
                      key={current.src}
                      src={current.src}
                      title={title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                    />
                  </div>
                )}

                {count > 1 && (
                  <>
                    <button type="button" onClick={() => go(-1)} aria-label="Previous" className={`${arrow} left-3`}>
                      <ChevronLeft size={22} />
                    </button>
                    <button type="button" onClick={() => go(1)} aria-label="Next" className={`${arrow} right-3`}>
                      <ChevronRight size={22} />
                    </button>
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {idx + 1} / {count}
                    </span>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {count > 1 && (
                <div className="flex gap-2 overflow-x-auto bg-black/40 px-3 py-2">
                  {media.map((m, i) => (
                    <button
                      key={m.src + i}
                      type="button"
                      onClick={() => setIdx(i)}
                      aria-label={m.type === 'image' ? `Photo ${i + 1}` : 'Video'}
                      className={`relative h-11 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-brand-navy transition ${
                        i === idx ? 'border-brand-gold' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      {m.thumb && <img src={m.thumb} alt="" loading="lazy" className="h-full w-full object-cover" />}
                      {m.type !== 'image' && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                          <Play size={16} fill="currentColor" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Details (scrolls if long) */}
          <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              {tag && (
                <span className="rounded-full bg-brand-gold px-3 py-0.5 text-xs font-bold text-brand-dark">{tag}</span>
              )}
              {date && (
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                  <CalendarDays size={15} /> {date}
                </span>
              )}
              {location && (
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin size={15} /> {location}
                </span>
              )}
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-brand-navy sm:text-3xl">{title}</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-gray-600">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen photo viewer */}
      {full && current?.type === 'image' && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95"
          onClick={() => setFull(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => setFull(false)}
            aria-label="Close fullscreen"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-brand-gold hover:text-brand-dark"
          >
            <X size={22} />
          </button>
          <img
            src={current.src}
            alt={title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  go(-1)
                }}
                aria-label="Previous"
                className={`${arrow} left-4 h-12 w-12`}
              >
                <ChevronLeft size={26} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  go(1)
                }}
                aria-label="Next"
                className={`${arrow} right-4 h-12 w-12`}
              >
                <ChevronRight size={26} />
              </button>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold text-white">
                {idx + 1} / {count}
              </span>
            </>
          )}
        </div>
      )}
    </>,
    document.body
  )
}