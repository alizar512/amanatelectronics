import { Link } from 'react-router-dom'
import { IoChevronForward } from 'react-icons/io5'

export const Breadcrumbs = ({ items = [] }) => (
  <nav
    aria-label="Breadcrumb"
    className="mb-2 flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-wider"
  >
    <Link
      to="/"
      className="transition-colors"
      style={{ color: 'var(--color-alt-text)' }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-dark)' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-alt-text)' }}
    >
      Home
    </Link>
    {items.map((item) => (
      <span key={item.label} className="flex items-center gap-1.5">
        <IoChevronForward size={10} style={{ color: 'var(--color-text-lightest)' }} />
        {item.to ? (
          <Link
            to={item.to}
            className="transition-colors"
            style={{ color: 'var(--color-alt-text)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-dark)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-alt-text)' }}
          >
            {item.label}
          </Link>
        ) : (
          <span style={{ color: 'var(--color-headings)' }}>{item.label}</span>
        )}
      </span>
    ))}
  </nav>
)
