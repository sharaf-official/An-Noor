import { useEffect, useState } from 'react'
import logo from '../../assets/logos/annoor-logo.png'

const ENABLED = true
const ONCE_PER_SESSION = false // set true before launch
const MIN_TIME = 1800
const MAX_TIME = 4000

export default function Preloader() {
  const [show, setShow] = useState(() => {
    if (!ENABLED) return false
    if (ONCE_PER_SESSION) {
      try {
        if (sessionStorage.getItem('annoor-preloaded')) return false
      } catch {
        /* ignore */
      }
    }
    return true
  })
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!show) return
    const start = Date.now()
    let done = false

    const finish = () => {
      if (done) return
      done = true
      const wait = Math.max(0, MIN_TIME - (Date.now() - start))
      setTimeout(() => {
        setLeaving(true)
        try {
          sessionStorage.setItem('annoor-preloaded', '1')
        } catch {
          /* ignore */
        }
        setTimeout(() => setShow(false), 600)
      }, wait)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })
    const max = setTimeout(finish, MAX_TIME)

    return () => {
      clearTimeout(max)
      window.removeEventListener('load', finish)
    }
  }, [show])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-brand-navy transition-opacity duration-500 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-brand-gold/20 border-t-brand-gold [animation-duration:1.4s]" />
        <img src={logo} alt="" className="h-32 w-32 animate-pulse object-contain sm:h-40 sm:w-40" />
      </div>
      <p className="mt-6 font-display text-xl font-bold text-white sm:text-2xl">
        An-Noor <span className="text-gold-grad">Youth Welfare</span> Association
      </p>
      <p className="mt-1 text-sm text-brand-gold">Hunupitiya, Wattala</p>
      <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-white/15">
        <div className="h-full w-full origin-left animate-[load_1.8s_ease-in-out_infinite] rounded-full bg-brand-gold" />
      </div>
      <style>{`@keyframes load{0%{transform:scaleX(0)}60%{transform:scaleX(1)}100%{transform:scaleX(1);opacity:.3}}`}</style>
    </div>
  )
}