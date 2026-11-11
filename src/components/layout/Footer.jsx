import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { footerLinks } from '../../utils/constants'
import { site } from '../../data/site'
import logo from '../../assets/logos/annoor-logo.png'
import SocialIcon from '../ui/SocialIcon'

export default function Footer() {
  const socials = [
    { label: 'Facebook', href: site.facebook },
    { label: 'Instagram', href: site.instagram },
    { label: 'YouTube', href: site.youtube },
  ].filter((s) => s.href)

  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <img src={logo} alt="An-Noor Youth Welfare Association logo" className="h-24 w-24 object-contain" />
          <p className="mt-3 font-display text-lg font-bold">{site.name}</p>
          <p className="text-sm text-brand-gold">Since {site.founded}</p>
          <p className="mt-3 max-w-xs font-quote text-sm italic text-white/75">{site.tagline}</p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-brand-gold">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:block sm:space-y-2">
            {footerLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/80 transition hover:text-brand-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-brand-gold">Contact</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-gold" />
              {site.address}
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-brand-gold" />
              {site.phone}
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-brand-gold" />
              <span className="break-all">{site.email}</span>
            </li>
          </ul>
          {socials.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.shortName} on ${s.label}`}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-gold/60 px-4 py-2 text-sm font-semibold text-brand-gold transition hover:-translate-y-0.5 hover:bg-brand-gold hover:text-brand-dark"
                >
                  <SocialIcon name={s.label} />
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-xs text-white/60">
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