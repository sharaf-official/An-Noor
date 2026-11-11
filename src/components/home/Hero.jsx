import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, HeartHandshake, MapPin, CalendarDays } from 'lucide-react'
import { site } from '../../data/site'
import { heroImages } from '../../data/home'
import logo from '../../assets/logos/annoor-logo.png'

export default function Hero() {
  const [broken, setBroken] = useState(() => new Set())
  const [idx, setIdx] = useState(0)

  const imgs = heroImages.filter((s) => !broken.has(s))
  const current = imgs.length ? idx % imgs.length : 0

  useEffect(() => {
    if (imgs.length < 2) return
    const t = setInterval(() => setIdx((i) => i + 1), 6000)
    return () => clearInterval(t)
  }, [imgs.length])

  const markBroken = (src) => setBroken((prev) => new Set(prev).add(src))

  const scrollNext = () =>
    document.getElementById('home-next')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-dark text-white">
      {/* Background photos */}
      {imgs.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          onError={() => markBroken(src)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === current ? 'opacity-100 [animation:kenburns_22s_ease-in-out_infinite_alternate]' : 'opacity-0'
          }`}
        />
      ))}

      {/* Overlays: keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-navy/65 to-brand-dark/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 via-transparent to-transparent lg:from-brand-dark/80" />
      <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-4 pb-24 pt-28 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:pt-32">
        {/* Logo (top on mobile, right on laptop) */}
        <div className="flex justify-center lg:order-last">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-brand-gold/25 blur-3xl" />
            <img
              src={logo}
              alt={`${site.name} logo`}
              className="relative w-40 object-contain drop-shadow-2xl sm:w-56 lg:w-80"
            />
          </div>
        </div>

        {/* Text */}
        <div className="text-center lg:text-left [animation:pageIn_0.9s_ease_both]">
          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/60 bg-brand-dark/50 px-3 py-1 text-xs font-semibold text-brand-gold backdrop-blur">
              <CalendarDays size={14} />
              Since {site.founded}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/60 bg-brand-dark/50 px-3 py-1 text-xs font-semibold text-brand-gold backdrop-blur">
              <MapPin size={14} />
              Hunupitiya, Wattala
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            An-Noor Youth <span className="text-gold-grad">Welfare</span> Association
          </h1>

          <p className="mx-auto mt-5 max-w-xl border-brand-gold font-quote text-lg italic text-white/90 lg:mx-0 lg:border-l-4 lg:pl-4 lg:text-xl">
            "{site.tagline}"
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/support"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-3 font-semibold text-brand-dark shadow-lg transition hover:-translate-y-0.5 hover:brightness-95 sm:w-auto"
            >
              <HeartHandshake size={18} />
              Support Us
            </Link>
            <Link
              to="/projects"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-brand-gold px-8 py-3 font-semibold text-brand-gold backdrop-blur transition hover:bg-white/10 sm:w-auto"
            >
              Our Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand-gold/70 text-brand-gold backdrop-blur transition hover:bg-brand-gold hover:text-brand-dark"
      >
        <ChevronDown size={22} className="animate-bounce" />
      </button>

      <style>{`@keyframes kenburns{from{transform:scale(1)}to{transform:scale(1.12)}}`}</style>
    </section>
  )
}