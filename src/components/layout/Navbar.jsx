import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, HeartHandshake, ChevronDown } from 'lucide-react'
import { navLinks } from '../../utils/constants'
import { site } from '../../data/site'
import logo from '../../assets/logos/annoor-logo.png'

const linkCls = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-brand-navy text-brand-gold' : 'text-brand-navy hover:bg-brand-soft'
  }`

const mobileCls = ({ isActive }) =>
  `block rounded-full px-4 py-3 text-[15px] font-semibold transition ${
    isActive ? 'bg-brand-navy text-brand-gold' : 'text-brand-navy active:bg-brand-soft'
  }`

const mobileSubCls = ({ isActive }) =>
  `block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
    isActive ? 'font-bold text-brand-gold-dark' : 'text-brand-navy/80 active:bg-brand-soft'
  }`

function DesktopDropdown({ link, pathname }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = pathname.startsWith(link.to)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition ${
          active ? 'bg-brand-navy text-brand-gold' : 'text-brand-navy hover:bg-brand-soft'
        }`}
      >
        {link.label}
        <ChevronDown size={14} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full pt-2">
          <ul
            role="menu"
            className="min-w-48 overflow-hidden rounded-2xl border border-brand-gold/40 bg-white p-1.5 shadow-xl"
          >
            {link.children.map((c) => (
              <li key={c.to} role="none">
                <NavLink
                  to={c.to}
                  end
                  role="menuitem"
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      isActive ? 'bg-brand-navy text-brand-gold' : 'text-brand-navy hover:bg-brand-soft'
                    }`
                  }
                >
                  {c.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [sub, setSub] = useState(null) // which mobile dropdown is expanded
  const { pathname } = useLocation()

  // Close the menu on page change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // When the menu opens, expand the dropdown of the current page
  useEffect(() => {
    if (!open) return
    const current = navLinks.find((l) => l.children && pathname.startsWith(l.to))
    setSub(current ? current.label : null)
  }, [open, pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      {/* Dark overlay behind the mobile menu (tap to close) */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-brand-dark/70 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="fixed inset-x-0 top-3 z-40 px-3 sm:px-4">
        <div className="mx-auto max-w-6xl">
          {/* Top pill */}
          <div className="flex items-center justify-between gap-3 rounded-full border border-brand-gold/40 bg-white/95 px-3 py-2 shadow-lg backdrop-blur sm:px-4">
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
              {navLinks.map((l) =>
                l.children ? (
                  <DesktopDropdown key={l.label} link={l} pathname={pathname} />
                ) : (
                  <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls}>
                    {l.label}
                  </NavLink>
                ),
              )}
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
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-navy transition hover:bg-brand-soft lg:hidden"
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Mobile panel (separate white card under the pill) */}
          {open && (
            <nav
              className="mt-2 max-h-[calc(100svh-6.5rem)] overflow-y-auto overscroll-contain rounded-3xl border border-brand-gold/40 bg-white p-3 shadow-xl lg:hidden"
              aria-label="Mobile"
            >
              <ul className="space-y-0.5">
                {navLinks.map((l) => {
                  if (!l.children) {
                    return (
                      <li key={l.to}>
                        <NavLink to={l.to} end={l.to === '/'} className={mobileCls}>
                          {l.label}
                        </NavLink>
                      </li>
                    )
                  }

                  const expanded = sub === l.label
                  const here = pathname.startsWith(l.to)
                  return (
                    <li key={l.label}>
                      <button
                        type="button"
                        onClick={() => setSub(expanded ? null : l.label)}
                        aria-expanded={expanded}
                        className={`flex w-full items-center justify-between rounded-full px-4 py-3 text-[15px] font-semibold transition ${
                          here ? 'text-brand-gold-dark' : 'text-brand-navy'
                        } active:bg-brand-soft`}
                      >
                        {l.label}
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {expanded && (
                        <ul className="mb-1 ml-5 mt-0.5 space-y-0.5 border-l-2 border-brand-gold pl-3">
                          {l.children.map((c) => (
                            <li key={c.to}>
                              <NavLink to={c.to} end className={mobileSubCls}>
                                {c.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>

              <Link
                to="/support"
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-brand-gold px-5 py-3.5 font-semibold text-brand-dark shadow"
              >
                <HeartHandshake size={18} />
                Support Us
              </Link>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}