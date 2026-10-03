import { memo, useCallback, useEffect, useState, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  IoCartOutline,
  IoHeartOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoChevronDown,
} from 'react-icons/io5'
import { FaPhoneAlt } from 'react-icons/fa'
import { useDebounce } from '../../hooks/useDebounce'
import { useStore } from '../../context/StoreContext'
import { searchProducts, getCategories } from '../../services/catalogService'
import { SearchPalette } from './SearchPalette'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Deals', to: '/deals' },
  { label: 'Support', to: '/support' },
  { label: 'Location', to: '/location' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const Navbar = memo(() => {
  const navigate = useNavigate()
  const { cartCount, wishlist, searchHistory, saveSearchTerm, setCartOpen } = useStore()
  const [isSearchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [categories, setCategories] = useState([])
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const debouncedQuery = useDebounce(query)
  const categoryDropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let isActive = true
    getCategories().then((data) => {
      if (isActive) {
        setCategories(Array.isArray(data) ? data : data.categories || [])
      }
    })
    return () => { isActive = false }
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
    return () => { isActive = false }
  }, [debouncedQuery])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
        setCategoryDropdownOpen(false)
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

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitSearch()
    }
  }

  return (
    <header
      className="sticky top-0 z-50 transition-shadow duration-300"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border-light)',
        boxShadow: isScrolled ? 'var(--shadow-md)' : 'none'
      }}
    >
      {/* Main Header Row */}
      <div className="container-shell">
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            style={{ color: 'var(--color-text)' }}
          >
            {isMobileMenuOpen ? <IoCloseOutline size={26} /> : <IoMenuOutline size={26} />}
          </button>

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 shrink-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-white p-0.5 transition-transform duration-300 group-hover:scale-105" style={{ borderColor: 'var(--color-brand)' }}>
              <img
                src="/amanatelectronicslogo.png"
                alt="Amanat Electronics Logo"
                className="h-full w-full object-contain rounded-full"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold leading-tight" style={{ color: 'var(--color-headings)' }}>
                Amanat Electronics
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] leading-tight" style={{ color: 'var(--color-brand-dark)' }}>
                Official PEL Partner
              </p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="mx-6 hidden flex-1 lg:block" style={{ maxWidth: '520px' }}>
            <div className="relative flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search for products, brands, categories..."
                className="w-full rounded-l-sm border py-2.5 pl-4 pr-4 text-sm outline-none transition-all focus:border-[color:var(--color-brand)]"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)'
                }}
              />
              <button
                type="button"
                onClick={() => submitSearch()}
                className="flex h-[42px] items-center justify-center rounded-r-sm px-5 text-sm font-semibold uppercase tracking-wider transition-colors"
                style={{
                  backgroundColor: 'var(--color-brand)',
                  color: 'var(--color-brand-text)',
                }}
                aria-label="Search"
              >
                <IoSearchOutline size={20} />
              </button>
            </div>
          </div>

          {/* Right Side: Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--color-bg-alt)] lg:hidden"
              style={{ color: 'var(--color-text)' }}
              aria-label="Search products"
            >
              <IoSearchOutline size={22} />
            </button>

            {/* Account */}
            <Link
              to="/login"
              className="hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--color-bg-alt)] sm:flex"
              style={{ color: 'var(--color-text)' }}
              title="Account"
              aria-label="Account"
            >
              <IoPersonOutline size={22} />
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--color-bg-alt)]"
              style={{ color: 'var(--color-text)' }}
              title="Wishlist"
              aria-label="View Wishlist"
            >
              <IoHeartOutline size={22} />
              {wishlist.length > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: 'var(--color-sale)' }}
                >
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--color-bg-alt)]"
              style={{ color: 'var(--color-text)' }}
              title="Shopping Cart"
              aria-label="View Shopping Cart"
            >
              <IoCartOutline size={24} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: 'var(--color-brand)', color: 'var(--color-brand-text)' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop */}
      <nav className="hidden border-t lg:block" style={{ borderColor: 'var(--color-border-light)', backgroundColor: 'var(--color-bg)' }}>
        <div className="container-shell">
          <div className="flex items-center">
            {/* Browse Categories Dropdown */}
            <div className="relative" ref={categoryDropdownRef}>
              <button
                type="button"
                onClick={() => setCategoryDropdownOpen((v) => !v)}
                className="flex items-center gap-2 py-3 pr-6 text-sm font-semibold uppercase tracking-wider transition-colors"
                style={{ color: 'var(--color-brand-text)', borderRight: '1px solid var(--color-border-light)' }}
              >
                <IoMenuOutline size={18} />
                <span>Categories</span>
                <IoChevronDown size={14} className={`transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryDropdownOpen && (
                <div
                  className="absolute left-0 top-full z-50 min-w-[250px] animate-fade-in-up border py-2"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.id || cat.name}
                      to={`/shop?category=${encodeURIComponent(cat.name.toLowerCase())}`}
                      className="flex items-center justify-between px-4 py-2.5 text-sm transition-colors"
                      style={{ color: 'var(--color-text)' }}
                      onClick={() => setCategoryDropdownOpen(false)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-brand)'
                        e.currentTarget.style.color = 'var(--color-brand-text)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = 'var(--color-text)'
                      }}
                    >
                      <span>{cat.name}</span>
                      {cat.count !== undefined && (
                        <span className="text-xs opacity-60">({cat.count})</span>
                      )}
                    </Link>
                  ))}
                  <div className="mx-4 my-1 border-t" style={{ borderColor: 'var(--color-border-light)' }} />
                  <Link
                    to="/shop"
                    className="flex items-center px-4 py-2.5 text-sm font-semibold transition-colors"
                    style={{ color: 'var(--color-brand-dark)' }}
                    onClick={() => setCategoryDropdownOpen(false)}
                  >
                    View All Products →
                  </Link>
                </div>
              )}
            </div>

            {/* Nav Links */}
            <div className="flex items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right: Help Text */}
            <div className="ml-auto flex items-center gap-2 py-3 text-xs" style={{ color: 'var(--color-alt-text)' }}>
              <FaPhoneAlt size={11} style={{ color: 'var(--color-brand-dark)' }} />
              <span>Need Help? Call us: <strong style={{ color: 'var(--color-headings)' }}>+92 300 1234567</strong></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="fixed left-0 top-0 z-50 h-full w-[300px] overflow-y-auto animate-slide-in-right lg:hidden"
            style={{
              backgroundColor: 'var(--color-bg)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div className="flex items-center justify-between border-b p-4" style={{ borderColor: 'var(--color-border-light)' }}>
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 bg-white p-0.5" style={{ borderColor: 'var(--color-brand)' }}>
                  <img src="/amanatelectronicslogo.png" alt="Logo" className="h-full w-full object-contain rounded-full" />
                </div>
                <span className="text-sm font-bold" style={{ color: 'var(--color-headings)' }}>Amanat Electronics</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center"
                style={{ color: 'var(--color-text)' }}
                aria-label="Close menu"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>

            <div className="border-b p-4" style={{ borderColor: 'var(--color-border-light)' }}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      submitSearch()
                      setMobileMenuOpen(false)
                    }
                  }}
                  placeholder="Search products..."
                  className="w-full border py-2 pl-3 pr-10 text-sm outline-none"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
                <IoSearchOutline className="absolute right-3" size={18} style={{ color: 'var(--color-alt-text)' }} />
              </div>
            </div>

            <div className="py-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${isActive ? 'border-l-[3px]' : 'border-l-[3px] border-l-transparent'}`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--color-brand-dark)' : 'var(--color-text)',
                    borderLeftColor: isActive ? 'var(--color-brand)' : 'transparent',
                    backgroundColor: isActive ? 'var(--color-drawer-bg)' : 'transparent',
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="border-t py-2" style={{ borderColor: 'var(--color-border-light)' }}>
              <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-alt-text)' }}>
                Categories
              </p>
              {categories.map((cat) => (
                <Link
                  key={cat.id || cat.name}
                  to={`/shop?category=${encodeURIComponent(cat.name.toLowerCase())}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm transition-colors"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="border-t p-4" style={{ borderColor: 'var(--color-border-light)' }}>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-alt-text)' }}>
                <FaPhoneAlt size={11} style={{ color: 'var(--color-brand-dark)' }} />
                <span>+92 300 1234567</span>
              </div>
            </div>
          </div>
        </>
      )}

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
