import { useState } from 'react'
import { Hourglass } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import SectionTitle from '../components/ui/SectionTitle'
import CommitteeTabs from '../components/committee/CommitteeTabs'
import {
  BOARD_READY,
  boardYear,
  intro,
  president,
  vicePresidents,
  officeBearers,
  heads,
  members,
  mentors,
} from '../data/studentBoard'

// "M.N.M. Nafan" -> "NA"
function getInitials(name = '') {
  const w = String(name).trim().split(/\s+/).filter(Boolean)
  if (!w.length) return ''
  if (w.length === 1) return w[0].slice(0, 2).toUpperCase()
  if (w[0].includes('.')) return w[w.length - 1].slice(0, 2).toUpperCase()
  return (w[0][0] + w[w.length - 1][0]).toUpperCase()
}

// Rectangular photo with initials fallback
function Photo({ src, name }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-brand-navy to-brand-dark">
        <span className="font-display text-4xl font-bold text-gold-grad">{getInitials(name)}</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
    />
  )
}

// Round photo, zoomed on the face
function RoundPhoto({ src, name, className = '', ring = '' }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`shrink-0 overflow-hidden rounded-full bg-brand-navy ${ring} ${className}`}>
      {!src || failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-brand-navy to-brand-dark">
          <span className="font-display text-3xl font-bold text-gold-grad sm:text-4xl">
            {getInitials(name)}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full origin-top scale-[1.3] object-cover object-top"
        />
      )}
    </div>
  )
}

// Leadership card (navy, gold ring)
function LeaderCard({ name, role, photo, isPresident = false, className = '' }) {
  return (
    <div
      className={`relative flex flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-dark via-brand-navy to-brand-navy p-6 pb-8 text-center text-white shadow-xl ${className}`}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-gold/15 blur-3xl" />
      <div className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-brand-blue/25 blur-3xl" />

      <RoundPhoto
        src={photo}
        name={name}
        className={`relative ${isPresident ? 'h-40 w-40 sm:h-44 sm:w-44' : 'h-32 w-32 sm:h-36 sm:w-36'}`}
        ring="ring-4 ring-brand-gold ring-offset-4 ring-offset-brand-navy"
      />

      <span className="relative mt-5 inline-block rounded-full bg-brand-gold px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-dark">
        {role}
      </span>
      <h3
        className={`relative mt-2 font-display font-bold leading-snug ${
          isPresident ? 'text-2xl' : 'text-xl'
        }`}
      >
        {name}
      </h3>

      {isPresident && (
        <>
          <div className="relative mt-3 h-1 w-12 rounded-full bg-brand-gold" />
          <p className="relative mt-3 text-sm text-white/75">Student Board {boardYear}</p>
        </>
      )}
    </div>
  )
}

// One card style for the team
function PersonCard({ name, role, photo }) {
  return (
    <article className="group w-[calc(50%-0.5rem)] sm:w-44 lg:w-48">
      <div className="overflow-hidden rounded-2xl border-2 border-brand-gold/60 bg-brand-navy shadow-md transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl">
        <div className="aspect-[4/5] overflow-hidden">
          <Photo src={photo} name={name} />
        </div>
      </div>
      <h3 className="mt-3 text-center font-display text-sm font-bold leading-snug text-brand-navy sm:text-base">
        {name}
      </h3>
      {role && (
        <span className="mx-auto mt-1.5 block w-fit rounded-full bg-brand-navy px-3 py-0.5 text-[11px] font-semibold text-brand-gold">
          {role}
        </span>
      )}
    </article>
  )
}

// Titled group of cards
function Group({ title, list }) {
  if (!list || list.length === 0) return null
  return (
    <div className="mt-14 first:mt-0">
      <div className="mb-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-brand-gold/50" />
        <h3 className="font-display text-lg font-bold text-brand-navy sm:text-xl">{title}</h3>
        <span className="h-px flex-1 bg-brand-gold/50" />
      </div>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {list.map((m) => (
          <PersonCard key={m.name} {...m} />
        ))}
      </div>
    </div>
  )
}

export default function StudentBoard() {
  const [filter, setFilter] = useState('all')

  // Secretary + Treasurer go to the Leadership section
  const secretary = officeBearers.find((m) => m.role === 'Secretary')
  const treasurer = officeBearers.find((m) => m.role === 'Treasurer')
  const topOfficers = [secretary, treasurer].filter(Boolean)
  const otherBearers = officeBearers.filter((m) => !topOfficers.includes(m))

  const memberList = members.map((m) => ({ ...m, role: '' }))

  // Section / filter name for the heads group (change here only)
  const HEADS_LABEL = 'Organizers'

  const FILTERS = [
    {
      key: 'all',
      label: 'All',
      count: otherBearers.length + heads.length + memberList.length,
      groups: [
        { title: 'Office Bearers', list: otherBearers },
        { title: 'Heads & Organizers', list: heads },
        { title: 'Members', list: memberList },
      ],
    },
    {
      key: 'office',
      label: 'Office Bearers',
      count: otherBearers.length,
      groups: [{ title: 'Office Bearers', list: otherBearers }],
    },
    {
      key: 'heads',
      label: 'Heads & Organizers',
      count: heads.length,
      groups: [{ title: 'Heads & Organizers', list: heads }],
    },
    {
      key: 'members',
      label: 'Members',
      count: memberList.length,
      groups: [{ title: 'Members', list: memberList }],
    },
  ]

  const active = FILTERS.find((f) => f.key === filter) || FILTERS[0]

  const chip = (on) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
      on
        ? 'border-brand-navy bg-brand-navy text-brand-gold shadow'
        : 'border-brand-gold/50 bg-white text-brand-navy hover:bg-brand-soft'
    }`

  return (
    <>
      <PageBanner eyebrow="Our Students" title="Student Board" subtitle={`Student Board ${boardYear}`} />
      <CommitteeTabs />

      {!BOARD_READY ? (
        <section className="bg-brand-cream">
          <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:py-20">
            <p className="text-lg text-gray-700">{intro}</p>
            <div className="mt-10 rounded-2xl border-2 border-dashed border-brand-gold/60 bg-white px-6 py-12">
              <Hourglass className="mx-auto text-brand-gold-dark" size={40} />
              <h2 className="mt-3 font-display text-2xl font-bold text-brand-navy">Coming Soon</h2>
              <p className="mt-2 text-gray-600">
                The Student Board {boardYear} members will be introduced here very soon.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Mentors */}
          {mentors.length > 0 && (
            <section className="bg-brand-cream">
              <div className="mx-auto max-w-4xl px-4 pb-14 pt-6 sm:pb-20 sm:pt-10">
                <SectionTitle
                  eyebrow="Guidance"
                  title="Student Board Mentors"
                  subtitle="Their leadership and dedication help our students grow in confidence, take responsibility, and serve the community with kindness and sincerity."
                />

                <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10">
                  {mentors.map((m) => (
                    <div key={m.name} className="group w-40 sm:w-52">
                      <div className="aspect-[4/5] overflow-hidden rounded-2xl border-2 border-brand-gold bg-brand-navy shadow-xl transition duration-300 group-hover:-translate-y-1.5">
                        <Photo src={m.photo} name={m.name} />
                      </div>
                      <h3 className="mt-3 text-center font-display text-base font-bold text-brand-navy sm:text-lg">
                        {m.name}
                      </h3>
                      <span className="mx-auto mt-1 block w-fit rounded-full bg-brand-navy px-3 py-0.5 text-xs font-semibold text-brand-gold">
                        {m.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Intro + Leadership */}
          <section className="bg-white">
            <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
              <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-700">{intro}</p>

              <SectionTitle eyebrow="Leadership" title="Student Board Leadership" />

              {/* Row 1: VP - President (raised) - VP */}
              <div className="mx-auto grid max-w-4xl grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
                <LeaderCard {...vicePresidents[0]} className="order-2 md:order-none md:mt-16" />
                <LeaderCard {...president} isPresident className="order-1 md:order-none" />
                <LeaderCard {...vicePresidents[1]} className="order-3 md:order-none md:mt-16" />
              </div>

              {/* Row 2: Secretary + Treasurer */}
              {topOfficers.length > 0 && (
                <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:mt-10 md:gap-8">
                  {topOfficers.map((m) => (
                    <LeaderCard key={m.name} {...m} className="h-full" />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Board team with filter */}
          <section className="bg-brand-cream">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
              <SectionTitle eyebrow="The Team" title="Student Board Members" />

              <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:justify-center">
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFilter(f.key)}
                    className={chip(filter === f.key)}
                  >
                    {f.label}
                    <span className="ml-1.5 opacity-70 lining-nums">({f.count})</span>
                  </button>
                ))}
              </div>

              <div key={filter}>
                {active.groups.map((g) => (
                  <Group key={g.title} title={g.title} list={g.list} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}