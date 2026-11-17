import PageBanner from '../components/ui/PageBanner'
import SectionTitle from '../components/ui/SectionTitle'
import MemberCard from '../components/committee/MemberCard'
import CommitteeTabs from '../components/committee/CommitteeTabs'
import { committeeYear, leaders, viceLeaders, officeBearers, teamMembers } from '../data/committee'

// Gold connector lines for the org-chart (President -> Vice Presidents)
function Connector({ index, count }) {
  const first = index === 0
  const last = index === count - 1
  return (
    <>
      <span aria-hidden className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-brand-gold/60" />
      {count > 1 && (
        <span
          aria-hidden
          className={`absolute top-0 h-px bg-brand-gold/60 ${
            first ? 'left-1/2 right-0' : last ? 'left-0 right-1/2' : 'left-0 right-0'
          }`}
        />
      )}
    </>
  )
}

export default function Committee() {
  return (
    <>
      <PageBanner
        eyebrow="Leadership"
        title="Our Committee"
        subtitle={`Office Bearers and Executive Committee ${committeeYear}`}
      />
      <CommitteeTabs />

      <section className="flex-1 bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          {/* President -> Vice Presidents (org chart) */}
          <SectionTitle eyebrow="Leadership" title="President & Vice Presidents" />
          <div className="flex flex-col items-center">
            {leaders.map((m) => (
              <MemberCard key={m.name} {...m} size="lg" />
            ))}
            <span aria-hidden className="h-8 w-px bg-brand-gold/60" />
            <div className="flex justify-center">
              {viceLeaders.map((m, i) => (
                <div key={m.name} className="relative px-3 pt-8 sm:px-7">
                  <Connector index={i} count={viceLeaders.length} />
                  <MemberCard {...m} size="md" />
                </div>
              ))}
            </div>
          </div>

          {/* Office bearers */}
          <div className="mt-20">
            <SectionTitle eyebrow="Office Bearers" title="Secretary, Treasurer & Media" />
            <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10">
              {officeBearers.map((m) => (
                <MemberCard key={m.name} {...m} size="md" />
              ))}
            </div>
          </div>

          {/* Team members */}
          <div className="mt-20">
            <SectionTitle eyebrow="Executive Committee" title="Team Members" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-5">
              {teamMembers.map((m) => (
                <MemberCard key={m.name} {...m} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}