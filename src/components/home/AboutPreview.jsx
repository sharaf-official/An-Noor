import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import logo from '../../assets/logos/annoor-logo.png'
import { aboutPreview, heroImages } from '../../data/home'
import { isDraft } from '../../utils/helpers'

function AboutPhoto() {
  const [failed, setFailed] = useState(false)
  const src = heroImages[0]
  const showPhoto = src && !failed

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <span aria-hidden className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl border-2 border-brand-gold/50" />
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-brand-gold bg-brand-navy shadow-xl">
        {showPhoto ? (
          <img
            src={src}
            alt="An-Noor Youth Welfare Association activities"
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <img src={logo} alt="An-Noor Youth Welfare Association logo" className="w-40 object-contain sm:w-48" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-full bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
          Since 2022
        </span>
      </div>
    </div>
  )
}

function InfoCard({ Icon, title, text }) {
  const draft = isDraft(text)
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-8 ${
        draft ? 'border-2 border-dashed border-brand-blue/30' : 'border border-brand-gold/30'
      }`}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-dark" />
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold ring-4 ring-brand-gold/20">
          <Icon size={22} />
        </span>
        <h3 className="font-display text-xl font-bold text-brand-navy sm:text-2xl">{title}</h3>
      </div>
      <p className={`mt-4 leading-relaxed ${draft ? 'italic text-gray-500' : 'text-gray-700'}`}>{text}</p>
    </div>
  )
}

export default function AboutPreview() {
  return (
    <section id="home-next" className="scroll-mt-4 bg-brand-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle align="left" eyebrow="Who We Are" title="About Our Association" />
            <div className="space-y-4">
              {aboutPreview.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    isDraft(p)
                      ? 'rounded-lg border border-dashed border-brand-blue/30 bg-white/60 p-3 text-sm italic text-gray-500'
                      : 'text-base leading-relaxed text-gray-700 sm:text-lg'
                  }
                >
                  {p}
                </p>
              ))}
            </div>
            <Link
              to="/about"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-semibold text-brand-gold shadow transition hover:bg-brand-dark"
            >
              Read More
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
          </div>

          <AboutPhoto />
        </div>

        <div className="mt-14 grid gap-6 sm:mt-20 md:grid-cols-2">
          <InfoCard Icon={Target} title="Our Mission" text={aboutPreview.mission} />
          <InfoCard Icon={Eye} title="Our Vision" text={aboutPreview.vision} />
        </div>
      </div>
    </section>
  )
}