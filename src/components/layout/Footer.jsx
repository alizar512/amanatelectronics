import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  IoLogoFacebook, 
  IoLogoInstagram, 
  IoLogoTwitter, 
  IoLogoYoutube,
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoTimeOutline
} from 'react-icons/io5'
import { Input } from '../common/Input'
import { subscribeNewsletter } from '../../services/orderService'
import { useToast } from '../../context/ToastContext'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Deals & Offers', to: '/deals' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Support', to: '/support' },
]

const categoryLinks = [
  { label: 'Air Conditioners', to: '/shop?category=air%20conditioners' },
  { label: 'Refrigerators', to: '/shop?category=refrigerators' },
  { label: 'Washing Machines', to: '/shop?category=washing%20machines' },
  { label: 'LED TVs', to: '/shop?category=led%20tvs' },
  { label: 'Kitchen Appliances', to: '/shop?category=kitchen%20appliances' },
  { label: 'Water Dispensers', to: '/shop?category=water%20dispensers' },
]

const accountLinks = [
  { label: 'My Account', to: '/login' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Cart', to: '/cart' },
  { label: 'Track Order', to: '/support' },
  { label: 'Admin Portal', to: '/admin/login' },
]

export const Footer = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error')
      return
    }

    setLoading(true)
    try {
      const res = await subscribeNewsletter(email)
      showToast(res.message, 'success')
      setEmail('')
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to subscribe', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer>
      {/* Newsletter Banner */}
      <div style={{ backgroundColor: 'var(--color-brand)' }}>
        <div className="container-shell flex flex-col items-center justify-between gap-4 py-6 sm:flex-row sm:py-8">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider sm:text-2xl" style={{ color: 'var(--color-brand-text)' }}>
              Subscribe to our Newsletter
            </h3>
            <p className="mt-1 text-sm" style={{ color: 'rgba(17,17,17,0.7)' }}>
              Get the latest deals, offers, and product updates directly in your inbox.
            </p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-md items-center gap-0 sm:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 border-0 px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: '#ffffff', color: 'var(--color-text)' }}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="whitespace-nowrap px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors"
              style={{ backgroundColor: 'var(--color-btn)' }}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ backgroundColor: '#1a1a1a' }}>
        <div className="container-shell grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
          {/* Column 1: About */}
          <div className="lg:col-span-2">
            <Link to="/" className="group inline-flex items-center gap-3 mb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-white p-0.5" style={{ borderColor: 'var(--color-brand)' }}>
                <img
                  src="/amanatelectronicslogo.png"
                  alt="Amanat Electronics Logo"
                  className="h-full w-full object-contain rounded-full"
                />
              </div>
              <div>
                <p className="text-base font-bold text-white leading-tight">Amanat Electronics</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] leading-tight" style={{ color: 'var(--color-brand)' }}>
                  Official PEL Partner
                </p>
              </div>
            </Link>
            <p className="mt-2 max-w-sm text-sm leading-7" style={{ color: '#999999' }}>
              Your trusted destination for premium home electronics and appliances. Authorized PEL dealer with 100% genuine warranty, easy installments, and fast delivery across Pakistan.
            </p>

            {/* Contact Info */}
            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3 text-sm" style={{ color: '#cccccc' }}>
                <IoLocationOutline size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--color-brand)' }} />
                <span>Main Market, Faisalabad, Punjab, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: '#cccccc' }}>
                <IoCallOutline size={18} className="shrink-0" style={{ color: 'var(--color-brand)' }} />
                <a href="tel:+923001234567" className="transition-colors hover:text-white">+92 300 1234567</a>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: '#cccccc' }}>
                <IoMailOutline size={18} className="shrink-0" style={{ color: 'var(--color-brand)' }} />
                <a href="mailto:info@amanatelectronics.com" className="transition-colors hover:text-white">info@amanatelectronics.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: '#cccccc' }}>
                <IoTimeOutline size={18} className="shrink-0" style={{ color: 'var(--color-brand)' }} />
                <span>Mon - Sat: 10:00 AM - 9:00 PM</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: IoLogoFacebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: IoLogoInstagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: IoLogoTwitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: IoLogoYoutube, href: 'https://youtube.com', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-all"
                  style={{ borderColor: '#444444', color: '#999999' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-brand)'
                    e.currentTarget.style.borderColor = 'var(--color-brand)'
                    e.currentTarget.style.color = 'var(--color-brand-text)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.borderColor = '#444444'
                    e.currentTarget.style.color = '#999999'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white relative pb-3">
              Quick Links
              <span className="absolute bottom-0 left-0 h-[2px] w-10" style={{ backgroundColor: 'var(--color-brand)' }} />
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors"
                    style={{ color: '#999999' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#999999' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white relative pb-3">
              Top Categories
              <span className="absolute bottom-0 left-0 h-[2px] w-10" style={{ backgroundColor: 'var(--color-brand)' }} />
            </h4>
            <ul className="space-y-2.5">
              {categoryLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors"
                    style={{ color: '#999999' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#999999' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: My Account */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white relative pb-3">
              My Account
              <span className="absolute bottom-0 left-0 h-[2px] w-10" style={{ backgroundColor: 'var(--color-brand)' }} />
            </h4>
            <ul className="space-y-2.5">
              {accountLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors"
                    style={{ color: '#999999' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#999999' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{ backgroundColor: '#111111' }}>
        <div className="container-shell flex flex-col items-center justify-between gap-2 py-4 sm:flex-row">
          <p className="text-xs" style={{ color: '#666666' }}>
            © {new Date().getFullYear()} Amanat Electronics. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: '#666666' }}>
            <Link to="/support" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link to="/support" className="transition-colors hover:text-white">Terms & Conditions</Link>
            <Link to="/support" className="transition-colors hover:text-white">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
