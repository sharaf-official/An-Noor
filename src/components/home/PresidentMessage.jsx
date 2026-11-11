import { useState } from 'react'
import { User, Quote } from 'lucide-react'
import { president } from '../../data/home'
import { isDraft } from '../../utils/helpers'

export default function PresidentMessage() {
  const [failed, setFailed] = useState(false)

  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-5xl items-center gap-8 px-4 py-14 sm:py-20 md:grid-cols-[260px_1fr] md:gap-12">
        <div className="mx-auto">
          <div className="h-52 w-52 overflow-hidden rounded-full border-4 border-brand-gold bg-brand-dark shadow-2xl md:h-60 md:w-60">
            {!failed ? (
              <img
                src={president.photo}
                alt={president.name}
                onError={() => setFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-brand-gold/60">
                <User size={72} />
              </div>
            )}
          </div>
        </div>

        <div className="text-center md:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
            President's Message
          </p>
          <Quote className="mx-auto mt-3 text-brand-gold/70 md:mx-0" size={36} />
          <div className="mt-2 space-y-3 font-quote text-lg italic text-white/90">
            {president.message.map((p, i) => (
              <p
                key={i}
                className={isDraft(p) ? 'rounded-lg border border-dashed border-white/25 p-3 text-base text-white/60' : ''}
              >
                {p}
              </p>
            ))}
          </div>
          <div className="mt-5">
            <p className="font-display text-xl font-bold text-brand-gold">{president.name}</p>
            <p className="text-sm text-white/70">{president.role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}