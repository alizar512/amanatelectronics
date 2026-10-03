import { useState } from 'react'
import { IoLogoWhatsapp, IoCloseOutline } from 'react-icons/io5'

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const phoneNumber = '+923001234567'
  const defaultMessage = 'Hi! I would like to know more about your products.'

  const handleChat = () => {
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Chat Popup */}
      {isOpen && (
        <div
          className="absolute bottom-16 right-0 mb-2 w-[300px] overflow-hidden rounded-lg animate-fade-in-up"
          style={{ boxShadow: 'var(--shadow-lg)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: '#075e54' }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <IoLogoWhatsapp size={22} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Amanat Electronics</p>
                <p className="text-[11px] text-white/70">Typically replies within minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white hover:bg-white/10"
              aria-label="Close chat"
            >
              <IoCloseOutline size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4" style={{ backgroundColor: '#e5ddd5' }}>
            <div className="max-w-[220px] rounded-lg rounded-tl-none bg-white p-3 text-sm shadow-sm" style={{ color: '#333333' }}>
              <p>Hi there! 👋</p>
              <p className="mt-1">Welcome to Amanat Electronics. How can we help you today?</p>
              <p className="mt-2 text-right text-[10px]" style={{ color: '#999999' }}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          {/* Action */}
          <div className="p-3" style={{ backgroundColor: '#f0f0f0' }}>
            <button
              onClick={handleChat}
              className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: '#25d366' }}
            >
              <IoLogoWhatsapp size={18} />
              <span>Start Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-110 animate-pulse-glow"
        style={{ backgroundColor: '#25d366' }}
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <IoCloseOutline size={26} />
        ) : (
          <IoLogoWhatsapp size={28} />
        )}
      </button>
    </div>
  )
}
