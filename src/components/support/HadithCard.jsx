import { Quote } from 'lucide-react'

const hadith = {
  arabic: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ',
  tamil: 'தர்மம் செல்வத்தைக் குறைத்து விடுவதில்லை.',
  english: 'Charity never decreases wealth.',
  source: 'Narrated by Abu Hurairah (RA)',
  ref: 'Sahih Muslim 2588',
}

export default function HadithCard() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-brand-gold/60 bg-gradient-to-br from-brand-cream via-white to-brand-cream p-8 text-center shadow-xl sm:p-10">
      {/* Decorations */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-brand-navy/10 blur-3xl" />
      <Quote
        className="pointer-events-none absolute left-5 top-5 text-brand-gold/20"
        size={90}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-3 rounded-2xl border border-brand-gold/30" />

      <div className="relative">
        {/* Label */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-brand-gold" />
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold-dark">Hadith</p>
          <span className="h-px w-10 bg-brand-gold" />
        </div>

        {/* Arabic */}
        <p
          lang="ar"
          dir="rtl"
          className="mt-6 text-4xl font-bold leading-[1.9] text-brand-navy sm:text-5xl"
          style={{ fontFamily: "'Amiri', 'Noto Naskh Arabic', 'Traditional Arabic', serif" }}
        >
          {hadith.arabic}
        </p>

        {/* Divider */}
        <div className="my-5 flex items-center justify-center gap-2">
          <span className="h-px w-12 bg-brand-gold/60" />
          <span className="h-2 w-2 rotate-45 bg-brand-gold" />
          <span className="h-px w-12 bg-brand-gold/60" />
        </div>

        {/* Tamil + English */}
        <p lang="ta" className="text-xl font-bold text-brand-navy sm:text-2xl">
          {hadith.tamil}
        </p>
        <p className="mt-3 font-quote text-lg italic text-gray-700 sm:text-xl">“{hadith.english}”</p>

        {/* Source */}
        <div className="mt-7 inline-flex flex-col items-center rounded-full border border-brand-gold/50 bg-white/80 px-5 py-2 shadow-sm">
          <span className="text-xs font-semibold text-brand-navy">{hadith.source}</span>
          <span className="text-[11px] font-medium text-brand-gold-dark">{hadith.ref}</span>
        </div>
      </div>
    </div>
  )
}