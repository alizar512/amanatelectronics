import { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaTimes } from 'react-icons/fa'

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-brand)', height: 'var(--announcement-height)' }}>
      <div className="container-shell flex h-full items-center justify-between">
        {/* Left: Contact Info */}
        <div className="hidden items-center gap-4 text-xs font-medium sm:flex" style={{ color: 'var(--color-brand-text)' }}>
          <a href="tel:+923001234567" className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
            <FaPhoneAlt className="h-3 w-3" />
            <span>+92 300 1234567</span>
          </a>
          <a href="mailto:info@amanatelectronics.com" className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
            <FaEnvelope className="h-3 w-3" />
            <span>info@amanatelectronics.com</span>
          </a>
        </div>

        {/* Center: Scrolling Ticker */}
        <div className="mx-auto flex-1 overflow-hidden sm:mx-8">
          <div className="animate-ticker flex whitespace-nowrap">
            <span className="mx-8 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-brand-text)' }}>
              ✨ Free Delivery on Orders Over Rs. 50,000
            </span>
            <span className="mx-8 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-brand-text)' }}>
              🔥 Official PEL Authorized Dealer — 100% Genuine Warranty
            </span>
            <span className="mx-8 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-brand-text)' }}>
              💳 Easy Installment Plans Available
            </span>
            <span className="mx-8 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-brand-text)' }}>
              📞 Call Us for Best Deals
            </span>
            {/* Duplicate for seamless loop */}
            <span className="mx-8 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-brand-text)' }}>
              ✨ Free Delivery on Orders Over Rs. 50,000
            </span>
            <span className="mx-8 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-brand-text)' }}>
              🔥 Official PEL Authorized Dealer — 100% Genuine Warranty
            </span>
            <span className="mx-8 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-brand-text)' }}>
              💳 Easy Installment Plans Available
            </span>
            <span className="mx-8 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-brand-text)' }}>
              📞 Call Us for Best Deals
            </span>
          </div>
        </div>

        {/* Right: Close */}
        <button
          onClick={() => setIsVisible(false)}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-brand-text)' }}
          aria-label="Close announcement"
        >
          <FaTimes className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
