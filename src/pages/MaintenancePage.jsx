import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { Button } from '../components/common/Button'

export default function MaintenancePage() {
  return (
    <div className="container-shell section-gap">
      <Seo title="Maintenance" description="The storefront is temporarily under maintenance." />
      <div className="surface mx-auto max-w-2xl p-8 text-center sm:p-12">
        <p className="chip mx-auto mb-4">Maintenance mode</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white">We are polishing the storefront.</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">A short maintenance window is in progress to improve performance and reliability.</p>
        <Link to="/"><Button className="mt-8">Return home</Button></Link>
      </div>
    </div>
  )
}
