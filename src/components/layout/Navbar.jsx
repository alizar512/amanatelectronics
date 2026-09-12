import { memo, useCallback, useEffect, useState, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  IoCartOutline,
  IoChevronDown,
  IoGridOutline,
  IoHeartOutline,
  IoSearchOutline,
} from 'react-icons/io5'
import { useDebounce } from '../../hooks/useDebounce'
import { useStore } from '../../context/StoreContext'
import { searchProducts, getCategories } from '../../services/catalogService'
import { SearchPalette } from './SearchPalette'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Deals', to: '/deals' },
  { label: 'Support', to: '/support' },
  { label: 'Location', to: '/location' },
  { label: 'About', to: '/about' },
]

export const Navbar = memo(() => {
  const navigate = useNavigate()
  const { cartCount, wishlist, searchHistory, saveSearchTerm, setCartOpen } = useStore()
  const [isSearchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [categories, setCategories] = useState([])
  const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const debouncedQuery = useDebounce(query)
  const categoryMenuRef = useRef(null)

  useEffect(() => {
    let isActive = true
    getCategories().then((data) => {
      if (isActive) {
        setCategories(Array.isArray(data) ? data : data.categories || [])
      }
    })
    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    let isActive = true
    if (!debouncedQuery.trim()) {
      setResults([])
      return undefined
    }

    searchProducts(debouncedQuery).then((items) => {
      if (isActive) setResults(items.slice(0, 5))
    })

    return () => {
      isActive = false
    }
  }, [debouncedQuery])

  // Close category dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target)) {
        setCategoryMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const submitSearch = useCallback(
    (term = query) => {
      if (!term.trim()) return
      saveSearchTerm(term)
      setSearchOpen(false)
      setQuery(term)
      navigate(`/shop?q=${encodeURIComponent(term)}`)
    },
    [navigate, query, saveSearchTerm]
  )

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[color:var(--color-bg)]/78 backdrop-blur-2xl dark:border-white/10">
      <div className="container-shell py-2.5">
        <div className="flex items-center gap-2 rounded-[28px] border border-slate-200/80 bg-white/72 px-3 py-2 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/62 dark:shadow-[0_16px_50px_rgba(2,6,23,0.35)]">
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="focus-ring rounded-full border border-slate-200/80 bg-white p-2.5 lg:hidden dark:border-white/10 dark:bg-slate-900/70"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Toggle navigation menu"
          >
            <IoGridOutline size={18} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200/90 bg-white p-1 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md dark:border-white/15 dark:bg-slate-900">
              <img
                src="/amanatelectronicslogo.png"
                alt="Amanat Electronics Logo"
                className="h-full w-full object-contain rounded-full"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold tracking-tight text-slate-950 dark:text-white leading-tight transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Amanat Electronics
              </p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 leading-tight">
                Official PEL Partner
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links: Home | Shop | Deals | Support | Location | Contact US | About */}
          <nav className="mx-auto hidden items-center gap-1 rounded-full border border-slate-200/80 bg-slate-50/90 p-1 lg:flex dark:border-white/10 dark:bg-white/[0.03]">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-white'
                      : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Icons: Search, Wishlist, Cart */}
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-white"
              title="Search products (Press /)"
              aria-label="Search catalog"
            >
              <IoSearchOutline size={18} />
            </button>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="focus-ring relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-red-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-white"
              title="View Wishlist"
              aria-label="View Wishlist"
            >
              <IoHeartOutline size={18} />
              {wishlist.length ? (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                  {wishlist.length}
                </span>
              ) : null}
            </Link>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="focus-ring relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-white"
              title="View Shopping Cart"
              aria-label="View Shopping Cart"
            >
              <IoCartOutline size={18} />
              {cartCount ? (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen ? (
        <div className="container-shell pb-3 lg:hidden">
          <div className="grid gap-2 rounded-[24px] border border-slate-200/80 bg-white/95 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setSearchOpen(true)
                }}
                className="flex w-full items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <IoSearchOutline size={16} /> Search all appliances...
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <SearchPalette
        isOpen={isSearchOpen}
        query={query}
        onChange={setQuery}
        onClose={() => setSearchOpen(false)}
        onSubmit={submitSearch}
        results={results}
        history={searchHistory}
      />
    </header>
  )
})

Navbar.displayName = 'Navbar'
