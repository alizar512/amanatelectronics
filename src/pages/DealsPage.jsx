import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/catalogService'
import { useStore } from '../context/StoreContext'
import { useToast } from '../context/ToastContext'
import { Seo } from '../components/common/Seo'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { SectionHeading } from '../components/common/SectionHeading'
import { ProductGrid } from '../components/catalog/ProductGrid'
import { Skeleton } from '../components/common/Skeleton'
import { FaFire, FaTag, FaClock, FaPercent, FaArrowRight } from 'react-icons/fa'

export default function DealsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDiscount, setSelectedDiscount] = useState('all')

  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare, openQuickView } = useStore()
  const { showToast } = useToast()

  useEffect(() => {
    let isActive = true
    getProducts().then((items) => {
      if (!isActive) return
      const all = Array.isArray(items) ? items : items.items || []
      // Filter for deals / discounted or badge items
      const dealProducts = all.filter(
        (p) => (p.originalPrice && p.originalPrice > p.price) || p.badge || p.isBestSeller
      )
      setProducts(dealProducts.length ? dealProducts : all)
      setLoading(false)
    })

    return () => {
      isActive = false
    }
  }, [])

  const filteredDeals = useMemo(() => {
    if (selectedDiscount === 'all') return products
    const minPercent = Number(selectedDiscount)
    return products.filter((p) => {
      if (!p.originalPrice || p.originalPrice <= p.price) return false
      const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      return discount >= minPercent
    })
  }, [products, selectedDiscount])

  const productActions = useMemo(
    () => ({
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
    }),
    [addToCart, compare, openQuickView, showToast, toggleCompare, toggleWishlist, wishlist]
  )

  return (
    <div className="section-gap">
      <Seo
        title="Special Deals & Discounts"
        description="Grab the biggest discounts on official PEL home appliances, air conditioners, refrigerators, and smart TVs."
      />
      <div className="container-shell">
        <Breadcrumbs items={[{ label: 'Deals' }]} />

        {/* Promo Hero Banner */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-6 text-white shadow-xl sm:p-10">
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <FaFire className="text-amber-300" /> Limited Time Offers
            </span>
            <h1 className="mt-3 text-2xl font-extrabold sm:text-4xl">
              Exclusive Appliance Deals & Clearance
            </h1>
            <p className="mt-2 text-xs text-rose-100 sm:text-sm">
              Save up to 35% on verified original PEL Inverter ACs, Deep Freezers, Washing Machines, and Smart TVs.
            </p>
          </div>
        </div>

        <SectionHeading
          eyebrow="Special Promotions"
          title="Hot Deals & Flash Sales"
          description="Browse price drops with genuine manufacturer warranty and direct doorstep delivery."
        />

        {/* Discount Filter Buttons */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {[
            { label: 'All Deals', value: 'all' },
            { label: '10%+ Off', value: '10' },
            { label: '15%+ Off', value: '15' },
            { label: '20%+ Off', value: '20' },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setSelectedDiscount(btn.value)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                selectedDiscount === btn.value
                  ? 'bg-red-600 text-white shadow-md shadow-red-500/25'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Deals Product Grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <Skeleton key={index} className="h-[420px] rounded-[32px]" />
            ))}
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">No deals match this discount tier</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Select "All Deals" to view all discounted models.</p>
          </div>
        ) : (
          <ProductGrid products={filteredDeals} columns={4} showViewAll={false} {...productActions} />
        )}
      </div>
    </div>
  )
}
