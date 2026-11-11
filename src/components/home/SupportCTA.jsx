import { Link } from 'react-router-dom'
import { HeartHandshake } from 'lucide-react'

export default function SupportCTA() {
  return (
    <section className="bg-gradient-to-br from-brand-dark to-brand-navy text-white">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center">
        <HeartHandshake className="mx-auto text-brand-gold" size={40} />
        <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Be a Part of Our Journey</h2>
        <p className="mt-2 text-white/85">
          [PLACEHOLDER: Short invitation to support the association's community work.]
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/support"
            className="w-full rounded-full bg-brand-gold px-8 py-3 font-semibold text-brand-dark shadow-lg transition hover:brightness-95 sm:w-auto"
          >
            Support Us
          </Link>
          <Link
            to="/contact"
            className="w-full rounded-full border-2 border-brand-gold px-8 py-3 font-semibold text-brand-gold transition hover:bg-white/10 sm:w-auto"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}