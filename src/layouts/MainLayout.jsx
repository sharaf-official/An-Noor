import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import RouteLoader from '../components/layout/RouteLoader'
import BackToTop from '../components/layout/BackToTop'

export default function MainLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <RouteLoader />
      <Navbar />
      <main key={pathname} className={`page-enter flex-1 ${isHome ? '' : ''}`}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}