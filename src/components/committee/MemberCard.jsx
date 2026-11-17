import { useState } from 'react'

const sizes = {
  lg: { w: 'w-56 sm:w-72', name: 'text-xl sm:text-2xl', role: 'text-xs sm:text-sm', initials: 'text-6xl sm:text-7xl', pad: 'p-4 sm:p-5' },
  md: { w: 'w-40 sm:w-52', name: 'text-base sm:text-xl', role: 'text-[10px] sm:text-xs', initials: 'text-5xl sm:text-6xl', pad: 'p-3 sm:p-4' },
  sm: { w: 'w-full max-w-44', name: 'text-sm sm:text-base', role: 'text-[10px] sm:text-xs', initials: 'text-4xl sm:text-5xl', pad: 'p-2.5 sm:p-3' },
}

// "Usama Nu'man" -> "UN",  "M.S.M Ameen" -> "AM"
function getInitials(name = '') {
  const words = String(name).trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  if (words[0].includes('.')) return words[words.length - 1].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export default function MemberCard({ name, role, photo, size = 'md' }) {
  const [failed, setFailed] = useState(false)
  const s = sizes[size] || sizes.md
  const showPhoto = photo && !failed

  return (
    <div className={`group mx-auto ${s.w}`}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-brand-gold/70 bg-brand-navy shadow-lg transition duration-300 group-hover:-translate-y-1.5 group-hover:border-brand-gold group-hover:shadow-[0_22px_36px_-14px_rgba(13,22,80,0.65)]">
        {showPhoto ? (
          <img
            src={photo}
            alt={name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-brand-navy to-brand-dark bg-[radial-gradient(circle_at_50%_35%,rgba(217,164,65,0.28),transparent_62%)] pb-12">
            <span className={`font-display font-bold text-gold-grad ${s.initials}`}>{getInitials(name)}</span>
          </div>
        )}

        {/* Gradient overlay + name / role */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/45 to-transparent" />
        <div className={`absolute inset-x-0 bottom-0 text-center ${s.pad}`}>
          <h3 className={`font-display font-bold leading-snug text-white ${s.name}`}>{name}</h3>
          {role && (
            <p className={`mt-1 font-semibold uppercase leading-tight tracking-wider text-brand-gold ${s.role}`}>
              {role}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}