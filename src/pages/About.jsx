import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Target, Eye, Users, HeartHandshake, BookOpen, Sparkles, MapPin, CalendarDays, Building2 } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import SectionTitle from '../components/ui/SectionTitle'
import PresidentMessage from '../components/home/PresidentMessage'
import { site } from '../data/site'
import { aboutPreview } from '../data/home'
import { story, focusAreas } from '../data/about'
import { isDraft } from '../utils/helpers'
import logo from '../assets/logos/annoor-logo.png'

const focusIcons = [Users, BookOpen, Sparkles, HeartHandshake]

function Fact({ Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-brand-gold/40 bg-white p-4 shadow-sm">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-gold">
        <Icon size={22} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-dark">{label}</p>
        <p className="font-display font-bold text-brand-navy">{value}</p>
      </div>
    </div>
  )
}

function StoryPhoto() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="overflow-hidden rounded-3xl border-4 border-brand-gold bg-brand-navy shadow-xl">
      {!failed ? (
        <img
          src={story.photo}
          alt="An-Noor Youth Welfare Association activity"
          loading="lazy"
          onError={() => setFailed(true)}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center">
          <img src={logo} alt="" className="h-40 w-40 object-contain" />
        </div>
      )}
    </div>
  )
}

function ValueCard({ Icon, title, text }) {
  const draft = isDraft(title) || isDraft(text)
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        draft ? 'border-2 border-dashed border-brand-blue/30' : 'border border-brand-gold/40'
      }`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-gold">
        <Icon size={24} />
      </span>
      <h3 className={`mt-4 font-display text-xl font-bold text-brand-navy ${draft ? 'italic opacity-70' : ''}`}>
        {title}
      </h3>
      <p className={`mt-2 text-sm ${draft ? 'italic text-gray-500' : 'text-gray-600'}`}>{text}</p>
    </div>
  )
}

export default function About() {
  return (
    <>
      <PageBanner eyebrow="Who We Are" title="About Us" subtitle="Our story, mission and vision" />

      {/* Quick facts */}
      <section className="bg-brand-cream">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 pt-10 sm:grid-cols-3">
          <Fact Icon={CalendarDays} label="Established" value={site.founded} />
          <Fact Icon={MapPin} label="Based in" value="Hunupitiya, Wattala" />
          <Fact Icon={Building2} label="Type" value="Non-profit youth organisation" />
        </div>
      </section>

      {/* Story */}
      <section className="bg-brand-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionTitle align="left" eyebrow="Our Story" title="How It Began" />
            {story.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`mb-3 ${
                  isDraft(p)
                    ? 'rounded-lg border border-dashed border-brand-blue/30 bg-white/60 p-3 text-sm italic text-gray-500'
                    : 'text-lg text-gray-800'
                }`}
              >
                {p}
              </p>
            ))}
          </div>
          <StoryPhoto />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <SectionTitle eyebrow="Our Purpose" title="Mission & Vision" />
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { Icon: Target, title: 'Our Mission', text: aboutPreview.mission },
              { Icon: Eye, title: 'Our Vision', text: aboutPreview.vision },
            ].map(({ Icon, title, text }) => {
              const draft = isDraft(text)
              return (
                <div
                  key={title}
                  className={`rounded-3xl bg-brand-cream p-7 ${
                    draft ? 'border-2 border-dashed border-brand-blue/30' : 'border border-brand-gold/40'
                  }`}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
                    <Icon size={28} />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-brand-navy">{title}</h3>
                  <p className={`mt-2 ${draft ? 'italic text-gray-500' : 'text-gray-700'}`}>{text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <SectionTitle eyebrow="What We Do" title="Our Focus Areas" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((f, i) => (
              <ValueCard key={i} Icon={focusIcons[i % focusIcons.length]} title={f.title} text={f.text} />
            ))}
          </div>
        </div>
      </section>

      {/* President's message (same data as Home) */}
      <PresidentMessage />

      {/* CTA */}
      <section className="bg-brand-cream">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-14 text-center">
          <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
            Meet the People Behind the Work
          </h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/committee"
              className="rounded-full bg-brand-navy px-8 py-3 font-semibold text-brand-gold shadow transition hover:bg-brand-dark"
            >
              Our Committee
            </Link>
            <Link
              to="/support"
              className="rounded-full bg-brand-gold px-8 py-3 font-semibold text-brand-dark shadow transition hover:brightness-95"
            >
              Support Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}