import { useState } from 'react'
import { User } from 'lucide-react'

const SIZES = {
  lg: 'h-40 w-40 sm:h-48 sm:w-48',
  md: 'h-32 w-32 sm:h-36 sm:w-36',
  sm: 'h-24 w-24 sm:h-28 sm:w-28',
}

export default function MemberCard({ name, role, photo, size = 'md' }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`${SIZES[size]} overflow-hidden rounded-2xl border-4 border-brand-gold bg-brand-navy shadow-lg transition hover:-translate-y-1 hover:shadow-xl`}
      >
        {photo && !failed ? (
          <img
            src={photo}
            alt={name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-brand-gold/60">
            <User size={size === 'sm' ? 36 : 56} />
          </div>
        )}
      </div>
      <p className="mt-3 font-display text-base font-bold leading-tight text-brand-navy sm:text-lg">{name}</p>
      {role && (
        <span className="mt-1.5 inline-block rounded-full bg-brand-navy px-3 py-1 text-xs font-semibold text-brand-gold">
          {role}
        </span>
      )}
    </div>
  )
}