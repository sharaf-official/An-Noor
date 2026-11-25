import PageBanner from '../components/ui/PageBanner'
import ActivityList from '../components/ui/ActivityList'
import { projects } from '../data/projects'

const tabs = [
  ['all', 'All'],
  ['ongoing', 'Ongoing'],
  ['completed', 'Completed'],
]

const categories = ['Youth Development', 'Education', 'Leadership Program', 'Sports']

export default function Projects() {
  return (
    <>
      <PageBanner eyebrow="Giving Back" title="Projects" subtitle="Our community service projects" />
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <ActivityList
            items={projects}
            tabs={tabs}
            categories={categories}
            emptyText="No projects in this category right now."
          />
        </div>
      </section>
    </>
  )
}