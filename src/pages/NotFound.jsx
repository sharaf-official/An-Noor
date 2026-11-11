import { Link } from 'react-router-dom'
import PageBanner from '../components/ui/PageBanner'

export default function NotFound() {
  return (
    <>
      <PageBanner eyebrow="Error 404" title="Page Not Found" subtitle="The page you are looking for does not exist." />
      <section className="bg-brand-cream py-14 text-center">
        <Link to="/" className="inline-block rounded-full bg-brand-navy px-8 py-3 font-semibold text-brand-gold shadow">
          Back to Home
        </Link>
      </section>
    </>
  )
}