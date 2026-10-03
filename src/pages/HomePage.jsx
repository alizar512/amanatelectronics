import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { HeroSection } from '../components/home/HeroSection'
import { CategoryStrip } from '../components/home/CategoryStrip'
import { PromoBanner } from '../components/home/PromoBanner'
import { BrandLogos } from '../components/home/BrandLogos'
import { ProductGrid } from '../components/catalog/ProductGrid'
import { getHomePageData, getProducts } from '../services/catalogService'
import { useStore } from '../context/StoreContext'
import { useToast } from '../context/ToastContext'
import { Seo } from '../components/common/Seo'
import {
  FaShieldAlt,
  FaTruck,
  FaCreditCard,
  FaCheckCircle,
  FaArrowRight,
} from 'react-icons/fa'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare, openQuickView } = useStore()
  const { showToast } = useToast()

  useEffect(() => {
    let isActive = true

    Promise.all([getHomePageData(), getProducts()]).then(([homeData, allProducts]) => {
      if (!isActive) return
      const prods = Array.isArray(allProducts) ? allProducts : allProducts.items || []
      setProducts(prods)
      setLoading(false)
    })

    return () => { isActive = false }
  }, [])

  // Curated product sections
  const featuredProducts = useMemo(() => {
    if (!products.length) return []
    return [...products]
      .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      .slice(0, 8)
  }, [products])

  const bestSellers = useMemo(() => {
    if (!products.length) return []
    const best = products.filter((p) => p.isBestSeller)
    return (best.length ? best : products).slice(0, 8)
  }, [products])

  const dealsProducts = useMemo(() => {
    if (!products.length) return []
    const deals = products.filter((p) => p.originalPrice && p.originalPrice > p.price)
    return (deals.length >= 4 ? deals : products.filter((p) => p.oldPrice && p.oldPrice > p.price)).slice(0, 8)
  }, [products])

  const newArrivals = useMemo(() => {
    if (!products.length) return []
    const newItems = products.filter((p) => p.isNew || p.badge?.toLowerCase().includes('new'))
    return (newItems.length ? newItems : products).slice(0, 4)
  }, [products])

  const productActions = {
    onQuickView: openQuickView,
    onAddToCart: (product) => {
      addToCart(product)
      showToast(`${product.name} added to cart`)
    },
    onToggleWishlist: (product) => {
      toggleWishlist(product)
      showToast(`${product.name} updated in wishlist`)
    },
    onToggleCompare: (product) => {
      toggleCompare(product)
      showToast(`${product.name} updated in compare`)
    },
    isWishlisted: (product) => wishlist.some((item) => item.id === product.id),
    isCompared: (product) => compare.some((item) => item.id === product.id),
  }

  const trustPillars = [
    {
      icon: FaShieldAlt,
      title: '100% Genuine Warranty',
      desc: 'Official manufacturer warranty on all products',
      color: '#0070c9',
      bg: '#e8f4fd',
    },
    {
      icon: FaTruck,
      title: 'Fast & Safe Delivery',
      desc: 'Quick shipping with doorstep verification',
      color: '#0a8f3c',
      bg: '#e8f5e9',
    },
    {
      icon: FaCreditCard,
      title: 'Easy Installments',
      desc: 'Flexible monthly plans on major bank cards',
      color: '#7b1fa2',
      bg: '#f3e5f5',
    },
    {
      icon: FaCheckCircle,
      title: 'Authorized Dealer',
      desc: 'Certified official PEL partner & showroom',
      color: '#e65100',
      bg: '#fff3e0',
    },
  ]

  return (
    <div>
      <Seo
        title="Amanat Electronics — Best Electronics Store"
        description="Amanat Electronics is a trusted authorized PEL dealer offering Air Conditioners, Refrigerators, LED TVs, Washing Machines, Kitchen Appliances and more with genuine warranty and easy installments."
      />

      {/* 1. Hero Slider */}
      <HeroSection />

      {/* 2. Trust Pillars */}
      <section style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-shell py-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="flex items-start gap-3 p-4 transition-all duration-300"
                  style={{ border: '1px solid var(--color-border-light)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border-light)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: pillar.bg, color: pillar.color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-headings)' }}>
                      {pillar.title}
                    </h4>
                    <p className="mt-0.5 text-[11px] leading-relaxed" style={{ color: 'var(--color-alt-text)' }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <CategoryStrip />

      {/* 4. Featured Products */}
      <section className="section-gap" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-shell">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Featured Products
                <span style={{ left: 0, transform: 'none' }} />
              </h2>
            </div>
            <Link
              to="/shop"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors"
              style={{ color: 'var(--color-brand-dark)' }}
            >
              View All <FaArrowRight size={10} />
            </Link>
          </div>

          {loading ? (
            <ProductGrid products={[]} loading={true} columns={4} />
          ) : (
            <ProductGrid products={featuredProducts} columns={4} showViewAll={false} {...productActions} />
          )}
        </div>
      </section>

      {/* 5. Promotional Banners */}
      <PromoBanner />

      {/* 6. Best Sellers */}
      <section className="section-gap" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="container-shell">
          <div className="mb-8 text-center">
            <h2 className="section-title">Best Sellers</h2>
            <p className="mt-4 text-sm" style={{ color: 'var(--color-alt-text)' }}>
              Our most popular products loved by customers
            </p>
          </div>

          {loading ? (
            <ProductGrid products={[]} loading={true} columns={4} />
          ) : (
            <ProductGrid products={bestSellers} columns={4} showViewAll={false} {...productActions} />
          )}

          <div className="mt-8 text-center">
            <Link to="/shop" className="btn-brand-outline">
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

      {/* 7. New Arrivals - Compact */}
      {newArrivals.length > 0 && (
        <section className="section-gap" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="container-shell">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="section-title" style={{ textAlign: 'left' }}>
                  New Arrivals
                  <span style={{ left: 0, transform: 'none' }} />
                </h2>
              </div>
              <Link
                to="/shop"
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors"
                style={{ color: 'var(--color-brand-dark)' }}
              >
                See All <FaArrowRight size={10} />
              </Link>
            </div>

            <ProductGrid products={newArrivals} columns={4} showViewAll={false} {...productActions} />
          </div>
        </section>
      )}

      {/* 8. Special Deals Banner */}
      {dealsProducts.length > 0 && (
        <section style={{ backgroundColor: 'var(--color-brand)' }}>
          <div className="container-shell py-10 sm:py-14">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(17,17,17,0.5)' }}>
                  Limited Time Offer
                </span>
                <h2 className="mt-1 text-2xl font-black uppercase tracking-wider sm:text-3xl" style={{ color: 'var(--color-brand-text)' }}>
                  Special Deals & Offers
                </h2>
                <p className="mt-2 text-sm" style={{ color: 'rgba(17,17,17,0.7)' }}>
                  Grab these deals before they're gone. Huge discounts on selected products.
                </p>
              </div>
              <Link to="/deals" className="btn-brand shrink-0">
                Shop All Deals
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 9. Deals Products */}
      {dealsProducts.length > 0 && (
        <section className="section-gap" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="container-shell">
            <ProductGrid products={dealsProducts} columns={4} showViewAll={false} {...productActions} />
          </div>
        </section>
      )}

      {/* 10. Brand Logos */}
      <BrandLogos />

      {/* 11. Full Catalog CTA */}
      <section style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-shell py-10 sm:py-14">
          <div
            className="flex flex-col items-center justify-between gap-6 p-8 sm:flex-row sm:p-10"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold uppercase tracking-wider text-white sm:text-2xl">
                Looking for More Products?
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Explore our full catalog of {products.length}+ appliances with filters, search, and easy navigation.
              </p>
            </div>
            <Link to="/shop" className="btn-yellow shrink-0 flex items-center gap-2">
              <span>Explore Full Shop</span>
              <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}