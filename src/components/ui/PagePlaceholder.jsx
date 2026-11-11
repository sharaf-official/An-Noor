import { Construction } from 'lucide-react'

export default function PagePlaceholder({ text = 'This page is being prepared.' }) {
  return (
    <section className="bg-brand-cream">
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="rounded-2xl border-2 border-dashed border-brand-gold/60 bg-white px-6 py-12">
          <Construction className="mx-auto text-brand-gold-dark" size={40} />
          <p className="mt-3 font-semibold text-brand-navy">{text}</p>
        </div>
      </div>
    </section>
  )
}