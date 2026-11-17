import { useState } from 'react'
import { Phone, MessageCircle, Mail, MapPin, Send } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import SectionTitle from '../components/ui/SectionTitle'
import { site } from '../data/site'
import { isDraft, waLink, telLink } from '../utils/helpers'

function InfoCard({ Icon, label, value, href }) {
  const draft = isDraft(value)
  const inner = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-gold">
        <Icon size={22} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wider text-brand-gold-dark">{label}</span>
        <span className={`block break-words font-semibold ${draft ? 'text-sm italic text-gray-500' : 'text-brand-navy'}`}>
          {value}
        </span>
      </span>
    </>
  )
  const cls = `flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition ${
    draft ? 'border-2 border-dashed border-brand-blue/30' : 'border border-brand-gold/40 hover:-translate-y-0.5 hover:shadow-md'
  }`
  return href && !draft ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

const field =
  'mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-brand-navy outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/40'

export default function Contact() {
  const [form, setForm] = useState({ name: '', message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const wa = waLink(site.whatsapp, `Assalamu Alaikum,\nI am ${form.name.trim()}.\n\n${form.message.trim()}`)
  const canSend = Boolean(wa) && form.name.trim() && form.message.trim()

  const onSubmit = (e) => {
    e.preventDefault()
    if (canSend) window.open(wa, '_blank', 'noopener,noreferrer')
  }

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`

  return (
    <>
      <PageBanner eyebrow="Get in Touch" title="Contact" subtitle="We would love to hear from you" />

      <section className="bg-brand-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14">
          {/* Info */}
          <div>
            <SectionTitle align="left" eyebrow="Reach Us" title="Contact Details" />
            <div className="space-y-3">
              <InfoCard Icon={MapPin} label="Address" value={site.address} href={mapsHref} />
              <InfoCard Icon={Phone} label="Phone" value={site.phone} href={telLink(site.phone)} />
              <InfoCard Icon={MessageCircle} label="WhatsApp" value={site.whatsapp} href={waLink(site.whatsapp)} />
              <InfoCard Icon={Mail} label="Email" value={site.email} href={isDraft(site.email) ? '' : `mailto:${site.email}`} />
            </div>

  {(site.facebook || site.instagram || site.tiktok) && (
  <p className="mt-5 text-sm text-gray-700">
    You can also find us on{' '}
    {[
      { label: 'Facebook', href: site.facebook },
      { label: 'Instagram', href: site.instagram },
      { label: 'TikTok', href: site.tiktok },
    ]
      .filter((s) => s.href)
      .map((s, i, arr) => (
        <span key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-navy underline underline-offset-4 hover:text-brand-gold-dark"
          >
            {s.label}
          </a>
          {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' and ' : ''}
        </span>
      ))}
    .
  </p>
)}
        </div>

          {/* Form -> WhatsApp */}
          <div>
            <SectionTitle align="left" eyebrow="Message Us" title="Send a Message" />
            <form onSubmit={onSubmit} className="rounded-3xl border border-brand-gold/40 bg-white p-6 shadow-sm sm:p-8">
              <label className="block text-sm font-semibold text-brand-navy">
                Your Name
                <input type="text" value={form.name} onChange={set('name')} required className={field} placeholder="Your name" />
              </label>
              <label className="mt-4 block text-sm font-semibold text-brand-navy">
                Message
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  required
                  rows={5}
                  className={field}
                  placeholder="How can we help you?"
                />
              </label>
              <button
                type="submit"
                disabled={!canSend}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-semibold text-brand-gold shadow transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={18} />
                Send via WhatsApp
              </button>
              <p className="mt-3 text-center text-xs text-gray-500">
                {isDraft(site.whatsapp)
                  ? 'WhatsApp number is not set yet.'
                  : 'This opens WhatsApp with your message ready to send.'}
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}