export default function PageBanner({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-dark to-brand-navy pb-14 pt-32 text-center text-white sm:pb-16 sm:pt-36">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-4">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">{eyebrow}</p>
        )}
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-brand-gold" />
        {subtitle && <p className="mt-4 text-white/85">{subtitle}</p>}
      </div>
    </section>
  )
}