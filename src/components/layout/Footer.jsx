import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react'
import { footerLinks } from '../../utils/constants'
import { site } from '../../data/site'
import logo from '../../assets/logos/annoor-logo.png'
import SocialIcon from '../ui/SocialIcon'

/* ---------- Decorations (inline SVG, no image files needed) ---------- */

// Shared gradients used by the decorations below
function Defs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="ft-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#fff6c2" />
          <stop offset=".6" stopColor="#f6b93b" />
          <stop offset="1" stopColor="#c77d12" />
        </radialGradient>
        <linearGradient id="ft-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3d37a" />
          <stop offset="1" stopColor="#a97a1f" />
        </linearGradient>
        <linearGradient id="ft-swoosh" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3d37a" />
          <stop offset=".5" stopColor="#d9a441" />
          <stop offset="1" stopColor="#8a5f14" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Swoosh({ className = '' }) {
  return (
    <svg className={className} width="320" height="190" viewBox="0 0 320 190" aria-hidden="true">
      <path d="M0 0 H290 C195 12 70 66 0 180 Z" fill="url(#ft-swoosh)" />
      <path d="M0 196 C74 78 205 24 318 6" fill="none" stroke="#080e33" strokeWidth="5" />
      <path d="M0 208 C84 90 215 34 320 18" fill="none" stroke="#d9a441" strokeWidth="1.6" />
    </svg>
  )
}

function Lantern({ drop = 100, className = '' }) {
  return (
    <svg
      className={`drop-shadow-[0_0_14px_rgba(255,190,70,0.55)] ${className}`}
      viewBox={`0 0 60 ${drop + 114}`}
      aria-hidden="true"
    >
      <line x1="30" y1="0" x2="30" y2={drop} stroke="#d9a441" strokeWidth="1.2" />
      <g transform={`translate(0 ${drop})`}>
        <circle cx="30" cy="4" r="3" fill="none" stroke="#d9a441" strokeWidth="1.5" />
        <path d="M17 30 Q30 8 43 30 Z" fill="url(#ft-gold)" />
        <rect x="15" y="30" width="30" height="4" rx="1" fill="url(#ft-gold)" />
        <path d="M18 34 H42 L47 62 L42 92 H18 L13 62 Z" fill="url(#ft-glow)" stroke="#d9a441" strokeWidth="1.5" />
        <path d="M24 34 Q20 62 24 92 M36 34 Q40 62 36 92" fill="none" stroke="#a35f0f" strokeOpacity=".55" />
        <path d="M18 92 H42 L37 100 H23 Z" fill="url(#ft-gold)" />
        <path d="M30 100 V108" stroke="#d9a441" strokeWidth="1.5" />
        <circle cx="30" cy="110" r="2.2" fill="#d9a441" />
      </g>
    </svg>
  )
}

function Skyline({ flip = false, className = '' }) {
  return (
    <svg
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
      style={{ WebkitMaskImage: 'linear-gradient(to right, #000 40%, transparent)', maskImage: 'linear-gradient(to right, #000 40%, transparent)' }}
      viewBox="0 0 420 170"
      fill="#1c2f8f"
      fillOpacity=".55"
      aria-hidden="true"
    >
      <rect x="22" y="48" width="14" height="122" />
      <path d="M20 48 H38 L29 22 Z" />
      <rect x="18" y="76" width="22" height="5" />
      <circle cx="29" cy="18" r="3" />
      <path d="M112 170 V112 A52 52 0 0 1 216 112 V170 Z" />
      <rect x="162" y="48" width="4" height="14" />
      <circle cx="164" cy="44" r="4" />
      <path d="M60 170 V138 A24 24 0 0 1 108 138 V170 Z" />
      <path d="M226 170 V132 A30 30 0 0 1 286 132 V170 Z" />
      <rect x="300" y="70" width="12" height="100" />
      <path d="M298 70 H314 L306 48 Z" />
      <rect x="296" y="96" width="20" height="4" />
      <rect x="330" y="140" width="90" height="30" />
    </svg>
  )
}

/* ---------- Social buttons ---------- */

const socialStyles = {
  Facebook:
    'border-blue-400/70 bg-gradient-to-b from-blue-600/40 to-blue-950/60 shadow-[0_0_18px_rgba(59,130,246,0.45)]',
  Instagram:
    'border-pink-400/70 bg-gradient-to-tr from-fuchsia-700/60 via-pink-600/50 to-orange-400/60 shadow-[0_0_18px_rgba(236,72,153,0.4)]',
  YouTube:
    'border-red-500/80 bg-gradient-to-b from-red-600/40 to-red-950/60 shadow-[0_0_18px_rgba(239,68,68,0.45)]',
  TikTok:
    'border-white/40 bg-black/70 shadow-[0_0_16px_rgba(37,244,238,0.35),0_0_16px_rgba(254,44,85,0.25)]',
}

function FooterHeading({ children }) {
  return (
    <h3 className="relative mb-3 pb-2 text-xl font-bold text-brand-gold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:bg-gradient-to-r after:from-brand-gold after:to-transparent">
      {children}
    </h3>
  )
}

export default function Footer() {
  const socials = [
    { label: 'Facebook', href: site.facebook },
    { label: 'Instagram', href: site.instagram },
    { label: 'YouTube', href: site.youtube },
    { label: 'TikTok', href: site.tiktok },
  ].filter((s) => s.href)

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-brand-navy to-brand-dark text-white">
      <Defs />

      {/* Decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Swoosh className="absolute left-0 top-0 hidden h-28 w-auto xl:block" />
        <Lantern drop={70} className="absolute left-[4%] top-0 hidden w-9 xl:block" />
        <Lantern drop={30} className="absolute left-[8.5%] top-0 hidden w-7 2xl:block" />
        <Lantern drop={40} className="absolute right-[4%] top-0 hidden w-8 xl:block" />
        <Lantern drop={85} className="absolute right-[1.5%] top-0 hidden w-9 2xl:block" />
        <Skyline className="absolute bottom-0 left-0 h-20 w-auto opacity-80 sm:h-28" />
        <Skyline flip className="absolute bottom-0 right-0 h-20 w-auto opacity-80 sm:h-28" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:py-10">
        {/* Brand */}
        <div className="flex flex-col items-center text-center sm:col-span-2 lg:col-span-1">
          <img
            src={logo}
            alt="An-Noor Youth Welfare Association logo"
            className="h-20 w-20 rounded-full object-contain shadow-[0_0_30px_rgba(70,130,255,0.45)]"
          />
          <p className="mt-3 font-display text-lg font-bold leading-snug">{site.name}</p>
          <p className="text-sm font-semibold text-brand-gold">Since {site.founded}</p>
          <p className="mt-1.5 max-w-xs font-quote text-sm italic text-white/80">{site.tagline}</p>
        </div>

        {/* Quick links */}
        <div className="lg:pl-6">
          <FooterHeading>Quick Links</FooterHeading>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {footerLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group inline-flex items-center gap-2 text-white/90 transition hover:text-brand-gold"
                >
                  <ChevronRight size={16} className="shrink-0 text-brand-gold transition group-hover:translate-x-0.5" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <FooterHeading>Contact</FooterHeading>
          <ul className="space-y-3 text-sm text-white/90">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand-gold" />
              {site.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-brand-gold" />
              {site.phone}
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-brand-gold" />
              <span className="break-all">{site.email}</span>
            </li>
          </ul>

          {socials.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.shortName} on ${s.label}`}
                  title={s.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border text-white transition hover:-translate-y-1 hover:brightness-125 ${socialStyles[s.label] || 'border-brand-gold/60'}`}
                >
                  <SocialIcon name={s.label} size={20} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 px-4 py-3 text-xs text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 text-center sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            Website by{' '}
            <a
              href="https://www.sharafizam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-gold underline-offset-4 transition hover:text-white hover:underline"
            >
              Sharaf Ahamed
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}