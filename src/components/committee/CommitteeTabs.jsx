import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/committee', label: 'Executive Committee' },
  { to: '/committee/student-board', label: 'Student Board' },
]

export default function CommitteeTabs() {
  return (
    <div className="bg-brand-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 px-4 pt-8">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end
            className={({ isActive }) =>
              `rounded-full px-6 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-brand-navy text-brand-gold shadow'
                  : 'border border-brand-gold/50 bg-white text-brand-navy hover:bg-brand-soft'
              }`
            }
          >
            {t.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}