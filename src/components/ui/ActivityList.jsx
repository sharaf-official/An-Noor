import { useState } from 'react'
import ActivityCard from './ActivityCard'
import ActivityModal from './ActivityModal'

export default function ActivityList({ items, tabs, emptyText }) {
  const [tab, setTab] = useState('all')
  const [active, setActive] = useState(null)

  const shown = tab === 'all' ? items : items.filter((i) => i.status === tab)

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              tab === key
                ? 'bg-brand-navy text-brand-gold shadow'
                : 'border border-brand-gold/50 bg-white text-brand-navy hover:bg-brand-soft'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {shown.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item) => (
            <ActivityCard key={item.id} item={item} onOpen={setActive} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border-2 border-dashed border-brand-gold/60 bg-white px-6 py-12 text-center font-semibold text-brand-navy">
          {emptyText}
        </p>
      )}

      {active && <ActivityModal item={active} onClose={() => setActive(null)} />}
    </>
  )
}