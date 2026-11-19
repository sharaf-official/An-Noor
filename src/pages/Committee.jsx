import { useState } from 'react'
import PageBanner from '../components/ui/PageBanner'
import CommitteeTabs from '../components/committee/CommitteeTabs'
import SectionTitle from '../components/ui/SectionTitle'
import { committeeYear, committee, members } from '../data/committee'

// Placeholder person (head + shoulders in a suit) for members without a photo
function PersonAvatar() {
  return (
    <svg viewBox="0 0 200 250" className="h-full w-full" role="img" aria-label="Photo coming soon">
      <defs>
        <linearGradient id="avatarBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eaf1fb" />
          <stop offset="1" stopColor="#fdf8ec" />
        </linearGradient>
        <linearGradient id="avatarSuit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2670" />
          <stop offset="1" stopColor="#0d1650" />
        </linearGradient>
      </defs>
      <rect width="200" height="250" fill="url(#avatarBg)" />
      {/* neck */}
      <rect x="86" y="118" width="28" height="40" rx="10" fill="#c99b6d" />
      {/* suit / shoulders */}
      <path d="M22 250 C22 192 56 166 100 166 C144 166 178 192 178 250 Z" fill="url(#avatarSuit)" />
      {/* shirt collar */}
      <path d="M80 168 L100 204 L120 168 Z" fill="#ffffff" />
      {/* lapels */}
      <path d="M80 168 L100 204 L72 250 L52 250 L60 184 Z" fill="#0a1140" />
      <path d="M120 168 L100 204 L128 250 L148 250 L140 184 Z" fill="#0a1140" />
      {/* tie */}
      <path d="M95 192 L105 192 L109 226 L100 238 L91 226 Z" fill="#d9a441" />
      {/* head */}
      <ellipse cx="100" cy="90" rx="33" ry="38" fill="#d6a97b" />
      {/* hair */}
      <path d="M66 86 C64 52 90 44 104 46 C128 48 138 66 134 88 C130 70 118 64 100 64 C84 64 72 70 66 86 Z" fill="#1b1b1f" />
    </svg>
  )
}

function PersonCard({ name, role, photo }) {
  const [failed, setFailed] = useState(false)
  const showPhoto = photo && !failed

  return (
    <div className="group w-[calc(50%-0.5rem)] rounded-2xl bg-white p-2.5 text-center shadow-sm ring-1 ring-brand-gold/30 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-brand-gold sm:w-48">
      <div className="aspect-[4/5] overflow-hidden rounded-xl">
        {showPhoto ? (
          <img
            src={photo}
            alt={name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <PersonAvatar />
        )}
      </div>

      <h3 className="mt-3 font-display text-sm font-bold leading-snug text-brand-navy sm:text-base">{name}</h3>

      <div className="mb-1 mt-2 flex min-h-[1.75rem] items-center justify-center">
        {role && (
          <span className="rounded-full bg-brand-navy px-2.5 py-1 text-[10px] font-semibold leading-tight text-brand-gold sm:text-xs">
            {role}
          </span>
        )}
      </div>
    </div>
  )
}

export default function Committee() {
  return (
    <>
      <PageBanner
        eyebrow="An-Noor YWA"
        title="Leadership"
        subtitle={`Office Bearers and Executive Committee ${committeeYear}`}
      />
      <CommitteeTabs />

      <section className="flex-1 bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          {/* Office bearers */}
          <SectionTitle eyebrow="Executive Committee" title="Official Bearers" />
          <div className="flex flex-wrap items-stretch justify-center gap-4 sm:gap-6">
            {committee.map((m, i) => (
              <PersonCard key={`${m.role}-${m.name}-${i}`} {...m} />
            ))}
          </div>

          {/* Members */}
          <div className="mt-14 border-t border-brand-gold/40 pt-14 sm:mt-20 sm:pt-20">
            <SectionTitle eyebrow="" title="Members" />
            <div className="flex flex-wrap items-stretch justify-center gap-4 sm:gap-6">
              {members.map((m, i) => (
                <PersonCard key={`${m.name}-${i}`} {...m} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}