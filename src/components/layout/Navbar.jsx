import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, HeartHandshake } from 'lucide-react'
import { navLinks } from '../../utils/constants'
import { site } from '../../data/site'
import logo from '../../assets/logos/annoor-logo.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkCls = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-brand-navy text-brand-gold' : 'text-brand-navy hover:bg-brand-soft'
    }`

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:px-4">
      <div className="mx-auto max-w-6xl rounded-3xl border border-brand-gold/40 bg-white/95 shadow-lg backdrop-blur">
        <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <img src={logo} alt="" className="h-11 w-11 shrink-0 object-contain" />
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-bold leading-tight text-brand-navy sm:text-lg">
                {site.shortName}
              </span>
              <span className="block truncate text-[11px] font-medium text-brand-gold-dark">
                Hunupitiya · Since {site.founded}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls}>
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/support"
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark shadow transition hover:brightness-95"
            >
              <HeartHandshake size={16} />
              Support Us
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-brand-gold lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <nav
            className="max-h-[75vh] overflow-y-auto border-t border-brand-gold/30 px-3 pb-4 pt-2 lg:hidden"
            aria-label="Mobile"
          >
            <ul className="space-y-1">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-base font-semibold transition ${
                        isActive ? 'bg-brand-navy text-brand-gold' : 'text-brand-navy hover:bg-brand-soft'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link
              to="/support"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-brand-gold px-5 py-3 font-semibold text-brand-dark shadow"
            >
              <HeartHandshake size={18} />
              Support Us
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}