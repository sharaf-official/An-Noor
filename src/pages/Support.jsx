import { Link } from 'react-router-dom'
import { HeartHandshake, Users, Gift, Share2, Landmark, MessageCircle } from 'lucide-react'
import PageBanner from '../components/ui/PageBanner'
import SectionTitle from '../components/ui/SectionTitle'
import CopyButton from '../components/ui/CopyButton'
import { bank, bankNote, waysToHelp } from '../data/support'
import { site } from '../data/site'
import { isDraft, waLink } from '../utils/helpers'

const icons = [HeartHandshake, Users, Gift, Share2]

const rows = [
  ['Account Name', bank.accountName],
  ['Bank', bank.bankName],
  ['Branch', bank.branch],
  ['Account Number', bank.accountNumber],
]

export default function Support() {
  const slipLink = waLink(
    site.whatsapp,
    `Assalamu Alaikum, I have made a contribution to ${site.name}. Sending the payment slip.`,
  )

  return (
    <>
      <PageBanner eyebrow="Join Hands" title="Support Us" subtitle="Help us serve the community" />

      {/* Ways to help */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <SectionTitle eyebrow="Get Involved" title="Ways to Help" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {waysToHelp.map((w, i) => {
              const Icon = icons[i % icons.length]
              return (
                <div
                  key={w.title}
                  className="rounded-2xl border border-brand-gold/40 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
                    <Icon size={26} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">{w.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{w.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bank details */}
      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-14 sm:py-20">
          <SectionTitle eyebrow="Donate" title="Bank Details" subtitle="You can send your contribution directly to our account." />

          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-dark to-brand-navy text-white shadow-xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold text-brand-dark">
                <Landmark size={20} />
              </span>
              <p className="font-display text-lg font-bold">{site.name}</p>
            </div>

            <dl className="divide-y divide-white/10 px-6">
              {rows.map(([label, value]) => {
                const draft = isDraft(value)
                return (
                  <div key={label} className="flex items-center justify-between gap-3 py-4">
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-brand-gold">{label}</dt>
                      <dd
                        className={`mt-0.5 break-words font-semibold ${
                          draft ? 'text-sm italic text-white/50' : 'text-lg'
                        }`}
                      >
                        {value}
                      </dd>
                    </div>
                    {label === 'Account Number' && <CopyButton value={value} label="Copy" />}
                  </div>
                )
              })}
            </dl>

            <p
              className={`px-6 py-4 text-sm ${
                isDraft(bankNote) ? 'italic text-white/50' : 'bg-white/5 text-white/80'
              }`}
            >
              {bankNote}
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {slipLink ? (
              <a
                href={slipLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-dark shadow transition hover:brightness-95 sm:w-auto"
              >
                <MessageCircle size={18} />
                Send Payment Slip on WhatsApp
              </a>
            ) : null}
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-brand-navy px-6 py-3 font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-brand-gold sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}