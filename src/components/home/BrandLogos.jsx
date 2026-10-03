import { useEffect, useRef, useState } from 'react'

const brandItems = [
  { name: 'PEL', color: '#e31e24' },
  { name: 'Dawlance', color: '#0066b2' },
  { name: 'Haier', color: '#a50034' },
  { name: 'Orient', color: '#f15a22' },
  { name: 'Samsung', color: '#1428a0' },
  { name: 'LG', color: '#a50034' },
  { name: 'Gree', color: '#007236' },
  { name: 'Kenwood', color: '#0053a0' },
  { name: 'TCL', color: '#1a1a1a' },
  { name: 'Changhong Ruba', color: '#e31e24' },
]

export const BrandLogos = () => {
  const scrollRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let animationId
    let scrollPos = 0
    const speed = 0.5

    const scroll = () => {
      if (!isPaused) {
        scrollPos += speed
        if (scrollPos >= container.scrollWidth / 2) {
          scrollPos = 0
        }
        container.scrollLeft = scrollPos
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  return (
    <section className="section-gap" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="container-shell">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="section-title">Our Trusted Brands</h2>
          <p className="mt-4 text-sm" style={{ color: 'var(--color-alt-text)' }}>
            We are authorized dealers of Pakistan's leading electronics brands
          </p>
        </div>

        {/* Brand Scroll */}
        <div
          ref={scrollRef}
          className="flex items-center gap-8 overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Double the items for seamless loop */}
          {[...brandItems, ...brandItems].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex h-20 min-w-[160px] shrink-0 items-center justify-center rounded-sm border px-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-bg)',
                borderColor: 'var(--color-border-light)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-brand)'
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-light)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span
                className="text-lg font-black uppercase tracking-wider"
                style={{ color: brand.color }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
