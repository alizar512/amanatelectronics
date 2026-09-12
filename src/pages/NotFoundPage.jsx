import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { Button } from '../components/common/Button'

export default function NotFoundPage() {
  return (
    <div className="container-shell section-gap">
      <Seo title="Page not found" description="The page you requested does not exist." />
      <div className="surface mx-auto max-w-2xl p-8 text-center sm:p-12">
        <p className="chip mx-auto mb-4">404</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white">Page not found.</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">The destination may have moved or never existed.</p>
        <Link to="/"><Button className="mt-8">Back home</Button></Link>
      </div>
    </div>
  )
}
