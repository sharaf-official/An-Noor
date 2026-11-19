import { useState } from 'react'
import { Link } from 'react-router-dom'
import WhatsAppButton from '../components/ui/WhatsAppButton'
import {
  Target,
  Eye,
  Users,
  HeartHandshake,
  BookOpen,
  Sparkles,
  MapPin,
  CalendarDays,
  Building2,
  Quote,
  Trophy,
  ShieldCheck,
} from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import SectionTitle from '../components/ui/SectionTitle'
import LeadershipMessages from '../components/home/LeadershipMessages'
import { site } from '../data/site'
import { aboutPreview } from '../data/home'
import {
  storyTitle,
  storySubtitle,
  storyOpening,
  storyParagraphs,
  storyClosing,
  storyClosingText,
  storyStats,
} from '../data/story'
import { isDraft } from '../utils/helpers'
import logo from '../assets/logos/annoor-logo.png'

// Put your photo here: public\images\about\story.jpg
const STORY_PHOTO = '/images/about/story.jpg'

// Keeps "An-Noor" on one line (no break after the hyphen)
function NoBreak({ text }) {
  return text.split(/(An-Noor)/g).map((part, i) =>
    part === 'An-Noor' ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

function StoryPhoto() {
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <span aria-hidden className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl border-2 border-brand-gold/50" />
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-brand-gold bg-brand-navy shadow-xl">
        {!failed ? (
          <img
            src={STORY_PHOTO}
            alt="An-Noor Youth Welfare Association activity"
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <img src={logo} alt="" className="h-32 w-32 object-contain" />
          </div>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
          Since 2022
        </span>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <>
      <PageBanner eyebrow="Who We Are" title="About Us" subtitle="Our story, mission and vision" />

      {/* Quick facts (floating gold card) */}
      <section className="bg-brand-cream px-4 py-8 sm:py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-brand-dark/20 overflow-hidden rounded-3xl bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-dark px-2 shadow-xl ring-4 ring-white sm:px-4">
          {[
            { Icon: CalendarDays, label: 'Established', value: site.founded },
            { Icon: MapPin, label: 'Based in', value: 'Hunupitiya, Wattala' },
            { Icon: Building2, label: 'Type', value: 'Non-profit youth organisation' },
          ].map(({ Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 px-2 py-5 text-center sm:flex-row sm:justify-center sm:gap-4 sm:px-6 sm:py-7 sm:text-left"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold shadow-md ring-4 ring-white/30 sm:h-14 sm:w-14">
                <Icon size={22} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/70 sm:text-xs">
                  {label}
                </p>
                <p className="mt-0.5 font-display text-xs font-bold leading-snug text-brand-dark sm:text-lg">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story (desktop) */}
      <section className="hidden bg-brand-navy lg:block">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left: title + opening quote */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">Our Story</p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {storyTitle}
                </h2>
                <p className="mt-3 font-display text-lg font-semibold italic text-gold-grad sm:text-xl">
                  {storySubtitle}
                </p>
                <div className="my-6 h-1 w-16 rounded-full bg-brand-gold" />
                <Quote className="text-brand-gold" size={32} />
                <p className="mt-3 font-quote text-xl italic leading-relaxed text-blue-100 sm:text-2xl">
                  <NoBreak text={storyOpening} />
                </p>
                <div className="mt-8 pr-3 pb-3">
                  <StoryPhoto />
                </div>
              </div>
            </div>

            {/* Right: numbered story cards */}
            <div className="space-y-5 lg:col-span-7">
              {storyParagraphs.map((p, i) => (
                <article
                  key={i}
                  className="flex gap-4 rounded-2xl border border-brand-gold/30 bg-white/5 p-5 backdrop-blur-sm transition hover:border-brand-gold/70 hover:bg-white/10 sm:gap-6 sm:p-7"
                >
                  <span className="font-display text-4xl font-bold leading-none text-gold-grad sm:text-5xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base leading-relaxed text-blue-100 sm:text-lg">
                    <NoBreak text={p} />
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {storyStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-brand-gold/40 bg-brand-dark/60 p-5 text-center"
              >
                <p className="font-display text-4xl font-bold text-gold-grad">{s.value}</p>
                <p className="mt-2 text-xs font-medium leading-snug text-blue-100">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Closing */}
          <div className="mt-10 rounded-3xl bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-dark p-6 text-center shadow-xl sm:p-10">
            <p className="font-display text-xl font-bold leading-snug text-brand-dark sm:text-3xl">
              {storyClosing}
            </p>
            <p className="mx-auto mt-3 max-w-3xl leading-relaxed text-brand-dark/85">
              <NoBreak text={storyClosingText} />
            </p>
          </div>
        </div>
      </section>

      {/* Story (mobile only) */}
      <section className="bg-brand-cream lg:hidden">
        <div className="mx-auto max-w-xl px-4 py-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold-dark">Our Story</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-brand-navy">{storyTitle}</h2>
            <p className="mt-1 font-display text-base font-semibold italic text-brand-gold-dark">{storySubtitle}</p>
            <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand-gold" />
          </div>

          {/* Opening quote */}
          <div className="mt-6 rounded-2xl bg-brand-navy p-5 text-center shadow-lg">
            <Quote className="mx-auto text-brand-gold" size={24} />
            <p className="mt-2 font-quote text-lg italic leading-relaxed text-white">
              <NoBreak text={storyOpening} />
            </p>
          </div>

          {/* Photo */}
          <div className="mt-6 pb-3 pr-3">
            <StoryPhoto />
          </div>

          {/* Stats: swipe sideways */}
          <div className="-mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
            {storyStats.map((s) => (
              <div
                key={s.label}
                className="w-32 shrink-0 snap-start rounded-2xl border border-brand-gold/40 bg-white p-3 text-center shadow-sm"
              >
                <p className="font-display text-2xl font-bold text-brand-navy">{s.value}</p>
                <p className="mt-1 text-[11px] font-medium leading-snug text-gray-600">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Story cards */}
          <div className="mt-6 space-y-4">
            {storyParagraphs.map((p, i) => {
              const steps = [
                { Icon: Sparkles, label: 'The Beginning' },
                { Icon: Target, label: 'Our Purpose' },
                { Icon: Users, label: 'Where We Are Today' },
                { Icon: HeartHandshake, label: 'Our Supporters' },
              ]
              const { Icon, label } = steps[i] || { Icon: Sparkles, label: '' }
              return (
                <article key={i} className="rounded-2xl border border-brand-gold/30 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-display text-lg font-bold text-brand-navy">{label}</h3>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-700">
                    <NoBreak text={p} />
                  </p>
                </article>
              )
            })}
          </div>

          {/* Closing */}
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-dark p-5 text-center shadow-lg">
            <p className="font-display text-lg font-bold leading-snug text-brand-dark">{storyClosing}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-dark/85">
              <NoBreak text={storyClosingText} />
            </p>
          </div>
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

      {/* Focus Areas */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <SectionTitle eyebrow="What We Do" title="Our Focus Areas" />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {[
              { Icon: BookOpen, title: 'Education' },
              { Icon: Users, title: 'Leadership' },
              { Icon: ShieldCheck, title: 'Discipline' },
              { Icon: Trophy, title: 'Sports' },
            ].map(({ Icon, title }, i) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-brand-gold/40 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl sm:p-8"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-dark" />
                <span className="absolute right-4 top-4 font-display text-2xl font-bold text-brand-gold/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy text-brand-gold ring-4 ring-brand-gold/20 transition group-hover:scale-110 sm:h-20 sm:w-20">
                  <Icon size={30} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-brand-navy sm:text-2xl">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership messages (same data as Home) */}
      <LeadershipMessages />

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