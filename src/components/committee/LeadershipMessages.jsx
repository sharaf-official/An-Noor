import { useState } from 'react'
import { Quote, User } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { leaders, leadershipTitle } from '../../data/leadership'

function LeaderCard({ role, name, photo, message, reverse }) {
  const [failed, setFailed] = useState(false)

  return (
    <article
      className={`flex flex-col items-center gap-8 md:items-center md:gap-12 ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div className="w-full max-w-[260px] shrink-0">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl border-2 border-brand-gold bg-brand-navy shadow-lg">
          {failed ? (
            <div className="flex h-full w-full items-center justify-center">
              <User className="text-brand-gold/60" size={56} />
            </div>
          ) : (
            <img
              src={photo}
              alt={name}
              loading="lazy"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover object-top"
            />
          )}
        </div>
      </div>

      <div className="text-center md:text-left">
        <span className="inline-block rounded-full bg-brand-navy px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold">
          {role}
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold text-brand-navy">{name}</h3>
        <Quote className="mx-auto mt-4 text-brand-gold md:mx-0" size={28} />
        <p className="mt-2 font-quote text-lg italic leading-relaxed text-gray-700">{message}</p>
      </div>
    </article>
  )
}

export default function LeadershipMessages() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <SectionTitle eyebrow="Our Leaders" title={leadershipTitle} />
        <div className="space-y-14 sm:space-y-16">
          {leaders.map((l, i) => (
            <LeaderCard key={l.role} {...l} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}