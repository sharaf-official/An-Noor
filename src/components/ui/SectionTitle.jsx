export default function SectionTitle({ eyebrow, title, subtitle, align = 'center' }) {
  const left = align === 'left'
  return (
    <div className={`mb-8 sm:mb-10 ${left ? 'text-left' : 'text-center'}`}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold-dark">{eyebrow}</p>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold text-brand-navy sm:text-4xl">{title}</h2>
      <div className={`mt-3 h-1 w-16 rounded-full bg-brand-gold ${left ? '' : 'mx-auto'}`} />
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-gray-600 ${left ? '' : 'mx-auto'}`}>{subtitle}</p>
      )}
    </div>
  )
}