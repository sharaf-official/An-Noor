import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { aboutPreview } from '../../data/home'
import { isDraft } from '../../utils/helpers'

function MiniCard({ Icon, title, text }) {
  const draft = isDraft(text)
  return (
    <div
      className={`rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        draft ? 'border-2 border-dashed border-brand-blue/30' : 'border border-brand-gold/40'
      }`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-brand-gold">
        <Icon size={22} />
      </span>
      <h3 className="mt-3 font-display text-lg font-bold text-brand-navy">{title}</h3>
      <p className={`mt-1 text-sm ${draft ? 'italic text-gray-500' : 'text-gray-600'}`}>{text}</p>
    </div>
  )
}

export default function AboutPreview() {
  return (
    <section id="home-next" className="scroll-mt-4 bg-brand-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionTitle align="left" eyebrow="Who We Are" title="About Our Association" />
          {aboutPreview.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`mb-3 ${
                isDraft(p)
                  ? 'rounded-lg border border-dashed border-brand-blue/30 bg-white/60 p-3 text-sm italic text-gray-500'
                  : i === 0
                    ? 'text-lg text-gray-800'
                    : 'text-gray-700'
              }`}
            >
              {p}
            </p>
          ))}
          <Link
            to="/about"
            className="group mt-4 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-semibold text-brand-gold shadow transition hover:bg-brand-dark"
          >
            Read More
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <MiniCard Icon={Target} title="Our Mission" text={aboutPreview.mission} />
          <MiniCard Icon={Eye} title="Our Vision" text={aboutPreview.vision} />
        </div>
      </div>
    </section>
  )
}