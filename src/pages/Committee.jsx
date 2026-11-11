import PageBanner from '../components/ui/PageBanner'
import SectionTitle from '../components/ui/SectionTitle'
import MemberCard from '../components/committee/MemberCard'
import { committeeYear, leaders, viceLeaders, officeBearers, teamMembers } from '../data/committee'

export default function Committee() {
  return (
    <>
      <PageBanner
        eyebrow="Leadership"
        title="Our Committee"
        subtitle={`Official Bearers and Executive Committee ${committeeYear}`}
      />

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          {/* President + Vice Presidents */}
          <SectionTitle eyebrow="Leadership" title="President & Vice Presidents" />
          <div className="flex flex-wrap items-end justify-center gap-8 sm:gap-12">
            {leaders.map((m) => (
              <div key={m.name} className="order-first w-full sm:order-none sm:w-auto">
                <MemberCard {...m} size="lg" />
              </div>
            ))}
            {viceLeaders.map((m) => (
              <MemberCard key={m.name} {...m} size="md" />
            ))}
          </div>

          {/* Office bearers */}
          <div className="mt-16">
            <SectionTitle eyebrow="Office Bearers" title="Secretary, Treasurer & Media" />
            <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-12">
              {officeBearers.map((m) => (
                <MemberCard key={m.name} {...m} size="md" />
              ))}
            </div>
          </div>

          {/* Team members */}
          <div className="mt-16">
            <SectionTitle eyebrow="Executive Committee" title="Team Members" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
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