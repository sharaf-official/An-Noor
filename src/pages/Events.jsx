import PageBanner from '../components/ui/PageBanner'
import ActivityList from '../components/ui/ActivityList'
import { events } from '../data/events'
import { site } from '../data/site'

const tabs = [
  ['all', 'All'],
  ['upcoming', 'Upcoming'],
  ['past', 'Past'],
]

export default function Events() {
  return (
    <>
      <PageBanner eyebrow="What's Happening" title="Events" subtitle="Upcoming and past events" />
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <ActivityList
            items={events}
            tabs={tabs}
            emptyText="No events in this category right now. Please check back soon."
          />
          <p className="mt-10 text-center text-sm text-gray-600">
            Follow us on{' '}
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-navy underline underline-offset-4 hover:text-brand-gold-dark"
            >
              Facebook
            </a>
            {site.instagram && (
              <>
                {' '}and{' '}
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-navy underline underline-offset-4 hover:text-brand-gold-dark"
                >
                  Instagram
                </a>
              </>
            )}{' '}
            for the latest updates.
          </p>
        </div>
      </section>
    </>
  )
}