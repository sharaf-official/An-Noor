import { useState } from 'react'
import ActivityCard from './ActivityCard'
import ActivityModal from './ActivityModal'

function Chip({ active, onClick, children, small }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full font-semibold transition ${
        small ? 'px-4 py-1.5 text-xs sm:text-sm' : 'px-5 py-2 text-sm'
      } ${
        active
          ? 'bg-brand-navy text-brand-gold shadow'
          : 'border border-brand-gold/50 bg-white text-brand-navy hover:bg-brand-soft'
      }`}
    >
      {children}
    </button>
  )
}

export default function ActivityList({ items, tabs, categories, emptyText }) {
  const [tab, setTab] = useState('all')
  const [category, setCategory] = useState('all')
  const [active, setActive] = useState(null)

  const shown = items
    .filter((i) => tab === 'all' || i.status === tab)
    .filter((i) => category === 'all' || i.category === category)

  return (
    <>
      <div className="mb-4 flex flex-wrap justify-center gap-2" role="tablist">
        {tabs.map(([key, label]) => (
          <Chip key={key} active={tab === key} onClick={() => setTab(key)}>
            {label}
          </Chip>
        ))}
      </div>

      {categories && categories.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Categories">
          <Chip small active={category === 'all'} onClick={() => setCategory('all')}>
            All Categories
          </Chip>
          {categories.map((c) => (
            <Chip small key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </Chip>
          ))}
        </div>
      )}

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