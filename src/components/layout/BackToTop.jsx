import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const R = 21
const CIRC = 2 * Math.PI * R

export default function BackToTop() {
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
      setShow(window.scrollY > 500)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`bt-anim group fixed bottom-4 right-3 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-brand-gold shadow-xl transition duration-500 ease-out hover:bg-brand-gold hover:text-brand-dark active:scale-90 sm:right-5 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      {/* progress ring */}
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="24" cy="24" r={R} fill="none" strokeWidth="3" className="stroke-brand-gold/25" />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          className="stroke-brand-gold transition-[stroke-dashoffset] duration-150"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress)}
        />
      </svg>

      <span className="bt-anim relative block group-hover:[animation:btBounce_0.8s_ease-in-out_infinite]">
        <ArrowUp size={20} strokeWidth={2.5} />
      </span>
    </button>
  )
}