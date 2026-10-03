import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

const heroSlides = [
  {
    id: 1,
    title: 'Premium Air Conditioners',
    subtitle: 'Stay Cool This Summer',
    description: 'Official PEL inverter AC with 10-year compressor warranty. Energy efficient cooling for your home.',
    cta: 'Shop Now',
    ctaLink: '/shop?category=air%20conditioners',
    bgColor: '#1a1a2e',
    accentColor: '#fad018',
    image: null,
  },
  {
    id: 2,
    title: 'Wedding Season Packages',
    subtitle: 'Special Bundle Deals',
    description: 'Complete home appliance packages for newlyweds. Save up to 30% on bundle purchases.',
    cta: 'View Packages',
    ctaLink: '/deals',
    bgColor: '#0f3460',
    accentColor: '#fad018',
    image: null,
  },
  {
    id: 3,
    title: 'Smart LED TVs',
    subtitle: 'Cinema Experience at Home',
    description: 'Full HD & 4K Smart LED TVs with Android OS. Stream, browse, and enjoy crystal clear visuals.',
    cta: 'Explore TVs',
    ctaLink: '/shop?category=led%20tvs',
    bgColor: '#16213e',
    accentColor: '#fad018',
    image: null,
  },
  {
    id: 4,
    title: 'Kitchen Appliances',
    subtitle: 'Cook Like a Pro',
    description: 'Microwave ovens, air fryers, juicers & more. Transform your kitchen with premium appliances.',
    cta: 'Shop Kitchen',
    ctaLink: '/shop?category=kitchen%20appliances',
    bgColor: '#1a1a1a',
    accentColor: '#fad018',
    image: null,
  },
]

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback((index) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)
  }, [currentSlide, goToSlide])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const slide = heroSlides[currentSlide]

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '420px' }}>
      {/* Background */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{ backgroundColor: slide.bgColor }}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 h-64 w-64 rounded-full" style={{ background: `radial-gradient(circle, ${slide.accentColor}40, transparent)` }} />
          <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full" style={{ background: `radial-gradient(circle, ${slide.accentColor}30, transparent)` }} />
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Content */}
      <div className="container-shell relative z-10 flex items-center" style={{ minHeight: '420px' }}>
        <div className="w-full py-12 sm:py-16 lg:py-20">
          <div className="max-w-xl animate-hero-fade" key={currentSlide}>
            {/* Subtitle Chip */}
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-sm px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em]"
              style={{ backgroundColor: slide.accentColor, color: '#111111' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
              {slide.subtitle}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-black uppercase leading-tight tracking-wide text-white sm:text-4xl lg:text-5xl">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-md text-sm leading-7 text-white/70 sm:text-base">
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex items-center gap-4">
              <Link
                to={slide.ctaLink}
                className="btn-yellow"
              >
                {slide.cta}
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 border-2 border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white/10"
              >
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Previous slide"
      >
        <IoChevronBack size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Next slide"
      >
        <IoChevronForward size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: currentSlide === index ? '24px' : '8px',
              backgroundColor: currentSlide === index ? '#fad018' : 'rgba(255,255,255,0.4)',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}