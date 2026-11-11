import { useCallback, useMemo, useState } from 'react'
import PageBanner from '../components/ui/PageBanner'
import Lightbox from '../components/gallery/Lightbox'
import { galleryItems } from '../data/gallery'

export default function Gallery() {
  const [group, setGroup] = useState('All')
  const [broken, setBroken] = useState(() => new Set())
  const [open, setOpen] = useState(null)

  const available = useMemo(() => galleryItems.filter((i) => !broken.has(i.src)), [broken])
  const groups = useMemo(() => ['All', ...new Set(galleryItems.map((i) => i.group))], [])
  const shown = group === 'All' ? available : available.filter((i) => i.group === group)

  const markBroken = (src) => setBroken((p) => new Set(p).add(src))
  const close = useCallback(() => setOpen(null), [])
  const nav = useCallback(
    (d) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)),
    [shown.length],
  )

  return (
    <>
      <PageBanner eyebrow="Moments" title="Gallery" subtitle="Photos from our events and projects" />
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          {groups.length > 2 && (
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {groups.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroup(g)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    group === g
                      ? 'bg-brand-navy text-brand-gold shadow'
                      : 'border border-brand-gold/50 bg-white text-brand-navy hover:bg-brand-soft'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          )}

          {shown.length > 0 ? (
            <div className="columns-2 gap-3 sm:gap-4 lg:columns-3">
              {shown.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Open photo: ${item.caption || 'gallery photo'}`}
                  className="group mb-3 block w-full overflow-hidden rounded-xl border border-brand-gold/30 bg-brand-navy shadow-sm sm:mb-4"
                >
                  <img
                    src={item.src}
                    alt={item.caption || ''}
                    loading="lazy"
                    onError={() => markBroken(item.src)}
                    className="w-full transition duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border-2 border-dashed border-brand-gold/60 bg-white px-6 py-12 text-center font-semibold text-brand-navy">
              Photos will be added soon.
            </p>
          )}
        </div>
      </section>

      {open !== null && shown[open] && <Lightbox items={shown} index={open} onClose={close} onNav={nav} />}
    </>
  )
}