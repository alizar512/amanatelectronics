import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'

export const AuthPageShell = ({ title, description, children, alternateLabel, alternateLink, alternateText }) => (
  <div className="container-shell flex min-h-screen items-center justify-center py-12">
    <Seo title={title} description={description} />
    <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border bg-white shadow-[var(--shadow-soft)] dark:bg-slate-950 lg:grid-cols-[1fr_0.9fr]">
      <div className="hidden bg-slate-950 p-10 text-white lg:block">
        <p className="chip border-white/10 bg-white/5 text-white/70">Premium storefront access</p>
        <h1 className="mt-6 text-4xl font-bold tracking-tight">A more refined electronics buying experience.</h1>
        <p className="mt-5 text-sm leading-8 text-slate-300">Save your wishlist, review orders, manage addresses, and complete checkout faster from one clean account center.</p>
      </div>
      <div className="p-8 sm:p-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-6 text-sm text-slate-500">{alternateText} <Link to={alternateLink} className="font-semibold text-blue-600">{alternateLabel}</Link></p>
      </div>
    </div>
  </div>
)
