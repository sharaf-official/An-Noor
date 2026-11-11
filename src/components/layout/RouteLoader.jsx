import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function RouteLoader() {
  const { pathname } = useLocation()
  const [active, setActive] = useState(false)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setActive(true)
    const t = setTimeout(() => setActive(false), 650)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[150] h-1 origin-left bg-gradient-to-r from-brand-gold via-brand-blue to-brand-gold transition-all ${
        active ? 'scale-x-100 opacity-100 duration-500' : 'scale-x-0 opacity-0 duration-300'
      }`}
    />
  )
}