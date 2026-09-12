import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { HeroSection } from '../components/home/HeroSection'
import { ProductGrid } from '../components/catalog/ProductGrid'
import { getHomePageData, getProducts } from '../services/catalogService'
import { useStore } from '../context/StoreContext'
import { useToast } from '../context/ToastContext'
import { 
  FaStar, 
  FaFire, 
  FaBolt, 
  FaTag, 
  FaArrowRight, 
  FaShieldAlt, 
  FaTruck, 
  FaCreditCard,
  FaCheckCircle 
} from 'react-icons/fa'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [activeTab, setActiveTab] = useState('featured')
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

    return () => {
      isActive = false
    }
  }, [])

  // Curated lists based on active tab
  const curatedProducts = useMemo(() => {
    if (!products.length) return []

    switch (activeTab) {
      case 'bestseller': {
        const best = products.filter((p) => p.isBestSeller)
        return (best.length ? best : products).slice(0, 8)
      }
      case 'new': {
        const newItems = products.filter((p) => p.isNew || p.badge?.toLowerCase().includes('new'))
        return (newItems.length ? newItems : products).slice(0, 8)
      }
      case 'deals': {
        const deals = products.filter((p) => p.originalPrice && p.originalPrice > p.price)
        return (deals.length ? deals : products).slice(0, 8)
      }
      case 'featured':
      default: {
        // Prioritize pinned products first, then featured flag
        return [...products]
          .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
          .slice(0, 8)
      }
    }
  }, [products, activeTab])

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

  const tabs = [
    { id: 'featured', label: 'Featured & Top Picks', icon: FaStar },
    { id: 'bestseller', label: 'Best Sellers', icon: FaFire },
    { id: 'new', label: 'New Arrivals', icon: FaBolt },
    { id: 'deals', label: 'Special Offers', icon: FaTag },
  ]

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* 1. Hero & Official Departments */}
      <HeroSection />

      {/* 2. Curated Storefront Highlights Section */}
      <section className="pt-2 pb-6 sm:pt-4 sm:pb-8">
        <div className="container-shell">
          {/* Section Header with Tabs */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Curated Showcase
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Trending & Top Rated
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Hand-picked high performance appliances with official warranty and instant dispatch.
              </p>
            </div>

            {/* Tab Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-900/80">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-white'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Curated Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-2xl border border-slate-100 bg-slate-200 dark:border-slate-800 dark:bg-slate-800/60"
                />
              ))}
            </div>
          ) : (
            <ProductGrid
              products={curatedProducts}
              columns={4}
              showViewAll={false}
              {...productActions}
            />
          )}

          {/* Explore Full Shop CTA */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/80 p-6 shadow-sm dark:border-blue-900/40 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 sm:flex-row sm:p-8">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                Looking for all models & categories?
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Explore our full catalog of {products.length} appliances with interactive filter pills, price sliders, and lazy loading.
              </p>
            </div>
            <Link
              to="/shop"
              className="flex items-center gap-2 whitespace-nowrap rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105"
            >
              <span>Explore All Products in Shop</span>
              <FaArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Trust & Value Proposition Pillars */}
      <section className="pb-12 sm:pb-16">
        <div className="container-shell">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <FaShieldAlt size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Genuine Warranty</h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Official manufacturer warranty on compressors and motors.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <FaTruck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Express Safe Delivery</h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Fast shipping with doorstep unboxing & verification.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <FaCreditCard size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Easy Installments</h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Flexible monthly installment plans on major bank cards.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <FaCheckCircle size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Authorized Dealership</h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Certified official partner with direct showroom backup.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}