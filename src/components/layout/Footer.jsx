import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5'
import { Input } from '../common/Input'
import { Button } from '../common/Button'
import { subscribeNewsletter } from '../../services/orderService'
import { useToast } from '../../context/ToastContext'

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
    <footer className="border-t bg-slate-950 text-slate-300 dark:bg-slate-950">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-white p-1 shadow-md transition-transform duration-300 group-hover:scale-105">
              <img
                src="/amanatelectronicslogo.png"
                alt="Amanat Electronics Logo"
                className="h-full w-full object-contain rounded-full"
              />
            </div>
            <div>
              <p className="text-base font-bold text-white leading-tight">Amanat Electronics</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Official PEL Partner</p>
            </div>
          </Link>
          <p className="mt-1 max-w-md text-sm leading-7 text-slate-400">
            A premium eCommerce storefront for home technology, cooling, wellness, and kitchen products with a cleaner buying journey.
          </p>
          <div className="mt-6 flex gap-3 text-slate-400">
            <a href="https://facebook.com" aria-label="Facebook"><IoLogoFacebook size={20} /></a>
            <a href="https://instagram.com" aria-label="Instagram"><IoLogoInstagram size={20} /></a>
            <a href="https://twitter.com" aria-label="Twitter"><IoLogoTwitter size={20} /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><IoLogoLinkedin size={20} /></a>
          </div>
        </div>
        <div className="space-y-3 text-sm flex flex-col">
          <p className="font-semibold text-white">Quick Links</p>
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/shop" className="hover:text-white">Shop</Link>
          <Link to="/location" className="hover:text-white">Location</Link>
          <Link to="/wishlist" className="hover:text-white">Wishlist</Link>
        </div>
        <div className="space-y-3 text-sm flex flex-col">
          <p className="font-semibold text-white">Portal</p>
          <Link to="/admin/login" className="hover:text-blue-400">Admin Portal</Link>
        </div>
        <div>
          <p className="font-semibold text-white">Newsletter</p>
          <p className="mt-3 text-sm leading-7 text-slate-400">Get product drops, offers, and expert buying guides.</p>
          <form onSubmit={handleNewsletterSubmit} className="mt-4 space-y-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-slate-800 bg-slate-900 text-white"
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Subscribing...' : 'Join newsletter'}
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
        Copyright © 2026 Amanat Electronics. All rights reserved.
      </div>
    </footer>
  )
}
