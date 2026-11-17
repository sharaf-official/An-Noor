import { useState } from 'react'
import { Quote } from 'lucide-react'
import { leaders } from '../../data/leadership'

// "M.N. Usama" -> "US", "Zaid" -> "ZA"
function getInitials(name = '') {
  const w = String(name).trim().split(/\s+/).filter(Boolean)
  if (!w.length) return ''
  if (w.length === 1) return w[0].slice(0, 2).toUpperCase()
  if (w[0].includes('.')) return w[w.length - 1].slice(0, 2).toUpperCase()
  return (w[0][0] + w[w.length - 1][0]).toUpperCase()
}

const isDraft = (t = '') => /\[[^\]]*\]/.test(String(t))

function Avatar({ src, name, className = '' }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`overflow-hidden bg-brand-dark ${className}`}>
      {!src || failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-brand-navy to-brand-dark">
          <span className="font-display text-xl font-bold text-gold-grad sm:text-3xl">
            {getInitials(name)}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      )}
    </div>
  )
}

export default function LeadershipMessages() {
  const [idx, setIdx] = useState(0)
  const current = leaders[idx] || leaders[0]
  if (!current) return null
  const draft = isDraft(current.message)

  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:py-20">
        {/* Title */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">Our Leaders</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Messages from Our Leadership</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-brand-gold" />
        </div>

        {/* Selector */}
        <div role="tablist" aria-label="Leaders" className="mt-10 grid grid-cols-4 gap-2 sm:gap-6">
          {leaders.map((l, i) => {
            const on = i === idx
            return (
              <button
                key={l.role}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setIdx(i)}
                className="group flex flex-col items-center text-center focus:outline-none"
              >
                <Avatar
                  src={l.photo}
                  name={l.name}
                  className={`h-14 w-14 rounded-full transition duration-300 sm:h-24 sm:w-24 ${
                    on
                      ? 'ring-4 ring-brand-gold ring-offset-2 ring-offset-brand-navy'
                      : 'opacity-60 ring-2 ring-white/30 group-hover:opacity-100 group-hover:ring-brand-gold/70'
                  }`}
                />
                <span
                  className={`mt-2 text-[10px] font-semibold uppercase leading-tight tracking-wider transition sm:text-xs ${
                    on ? 'text-brand-gold' : 'text-white/60 group-hover:text-white'
                  }`}
                >
                  {l.role}
                </span>
              </button>
            )
          })}
        </div>

        {/* Message card */}
        <div
          key={idx}
          role="tabpanel"
          className="mt-8 grid items-center gap-7 rounded-3xl border border-brand-gold/40 bg-white/5 p-6 backdrop-blur [animation:pageIn_0.5s_ease_both] sm:p-10 md:grid-cols-[220px_1fr] md:gap-10"
        >
          <div className="mx-auto w-44 md:w-full">
            <Avatar
              src={current.photo}
              name={current.name}
              className="aspect-[4/5] w-full rounded-t-full rounded-b-2xl border-2 border-brand-gold shadow-[6px_6px_0_0_rgba(217,164,65,0.3)]"
            />
          </div>

          <div className="text-center md:text-left">
            <span className="inline-block rounded-full bg-brand-gold px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-dark">
              {current.role}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{current.name}</h3>
            <Quote className="mx-auto mt-4 text-brand-gold md:mx-0" size={30} />
            <p
              className={`mt-2 font-quote text-base leading-relaxed sm:text-lg ${
                draft ? 'italic text-white/50' : 'italic text-white/90'
              }`}
            >
              {current.message}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}