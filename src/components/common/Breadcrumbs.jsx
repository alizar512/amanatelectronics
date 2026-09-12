import { Link } from 'react-router-dom'

export const Breadcrumbs = ({ items = [] }) => (
  <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
    <Link to="/" className="hover:text-slate-950 dark:hover:text-white">
      Home
    </Link>
    {items.map((item) => (
      <span key={item.label} className="flex items-center gap-2">
        <span>/</span>
        {item.to ? <Link to={item.to}>{item.label}</Link> : <span className="text-slate-900 dark:text-white">{item.label}</span>}
      </span>
    ))}
  </nav>
)
