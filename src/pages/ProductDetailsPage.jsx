import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoCheckmarkCircle, IoFlashOutline, IoShieldCheckmarkOutline, IoStar } from 'react-icons/io5'
import { getProductBySlug, getProducts } from '../services/catalogService'
import { useStore } from '../context/StoreContext'
import { useToast } from '../context/ToastContext'
import { Seo } from '../components/common/Seo'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ProductGallery } from '../components/product/ProductGallery'
import { StickyAddToCartBar } from '../components/product/StickyAddToCartBar'
import { SectionHeading } from '../components/common/SectionHeading'
import { ProductGrid } from '../components/catalog/ProductGrid'
import { Button } from '../components/common/Button'
import { formatCurrency } from '../utils/format'
import { ProductDetailsSkeleton } from '../components/product/ProductDetailsSkeleton'
import { InstallmentModal } from '../components/commerce/InstallmentModal'
import { FaTag, FaCalculator, FaShieldAlt, FaUniversity } from 'react-icons/fa'

export default function ProductDetailsPage() {
  const { slug } = useParams()
  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare, addRecentlyViewed, openQuickView } = useStore()
  const { showToast } = useToast()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [showInstallmentModal, setShowInstallmentModal] = useState(false)

  useEffect(() => {
    let isActive = true
    setProduct(null)
    getProductBySlug(slug).then((item) => {
      if (!isActive) return
      setProduct(item)
      if (item) {
        addRecentlyViewed(item)
        // Fetch products matching the exact same category
        getProducts({ category: item.category }).then((items) => {
          if (!isActive) return
          const sameCategory = items.filter((p) => p.slug !== slug && p.id !== item.id)
          if (sameCategory.length >= 4) {
            setRelatedProducts(sameCategory.slice(0, 4))
          } else {
            // Fallback: fill remaining slots with other catalog items
            getProducts().then((all) => {
              if (!isActive) return
              const others = all.filter(
                (p) => p.slug !== slug && p.id !== item.id && !sameCategory.some((sc) => sc.id === p.id)
              )
              setRelatedProducts([...sameCategory, ...others].slice(0, 4))
            })
          }
        })
      }
    })

    return () => {
      isActive = false
    }
  }, [addRecentlyViewed, slug])

  const productActions = useMemo(
    () => ({
      onQuickView: openQuickView,
      onAddToCart: (item) => { addToCart(item); showToast(`${item.name} added to cart`) },
      onToggleWishlist: (item) => { toggleWishlist(item); showToast(`${item.name} updated in wishlist`) },
      onToggleCompare: (item) => { toggleCompare(item); showToast(`${item.name} updated in compare`) },
      isWishlisted: (item) => wishlist.some((entry) => entry.id === item.id),
      isCompared: (item) => compare.some((entry) => entry.id === item.id),
    }),
    [addToCart, compare, openQuickView, showToast, toggleCompare, toggleWishlist, wishlist],
  )

  if (!product) return <ProductDetailsSkeleton />

  return (
    <div className="section-gap">
      <Seo title={product.name} description={product.description} structuredData={{ '@context': 'https://schema.org', '@type': 'Product', name: product.name, description: product.description, sku: product.sku }} />
      <div className="container-shell">
        <Breadcrumbs items={[{ label: 'Shop', to: '/shop' }, { label: product.name }]} />
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <ProductGallery images={product.images} alt={product.name} />
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/82 dark:shadow-[0_24px_70px_rgba(2,6,23,0.4)] sm:p-8">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-28 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-amber-400/10 blur-3xl" />
            <div className="relative">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <p className="chip">{product.category}</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-300"><IoStar size={13} /> {product.rating} rating</span>
              {(product.stock || 0) > 0 && product.inStock !== false ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                  <IoCheckmarkCircle size={13} /> In stock ({product.stock} units)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-300">
                  Out of Stock
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white">{product.name}</h1>
            <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300">{product.description}</p>
            <div className="mt-6 rounded-[24px] border border-slate-200/80 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex flex-wrap items-end gap-4">
                <span className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white">{formatCurrency(product.price)}</span>
                <span className="text-base text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
                <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-950">Save {formatCurrency(product.originalPrice - product.price)}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-2"><IoFlashOutline className="text-blue-600" /> {product.shipping}</span>
                <span className="inline-flex items-center gap-2"><IoShieldCheckmarkOutline className="text-emerald-600" /> {product.warranty}</span>
              </div>
            </div>

            {/* Installment Plan Banner */}
            {product.installmentAvailable !== false && (
              <div className="mt-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
                        <FaTag size={10} /> Installment Available
                      </span>
                      {product.installmentMarkup && (
                        <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                          {product.installmentMarkup}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white pt-1">
                      Pay as low as{' '}
                      <span className="text-emerald-700 dark:text-emerald-400">
                        {formatCurrency(product.installmentMonthly || Math.round(product.price / 12))} / month
                      </span>{' '}
                      <span className="text-xs font-normal text-slate-500">(3 to 24 Months)</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowInstallmentModal(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 transition-colors"
                  >
                    <FaCalculator /> View Plans & EMI
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {product.colors.map((color) => <span key={color} className="rounded-full border border-slate-200/80 bg-white px-4 py-2 font-medium dark:border-white/10 dark:bg-white/[0.03]">{color}</span>)}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Button 
                disabled={(product.stock || 0) <= 0 || product.inStock === false} 
                className="shadow-lg shadow-slate-950/10 disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={() => productActions.onAddToCart(product)}
              >
                {(product.stock || 0) > 0 && product.inStock !== false ? 'Add to cart' : 'Out of Stock'}
              </Button>
              {(product.stock || 0) > 0 && product.inStock !== false ? (
                <Link to="/checkout"><Button variant="ghost" className="w-full border-slate-200/80 bg-slate-50/90 dark:border-white/10 dark:bg-white/[0.03]">Quick buy</Button></Link>
              ) : (
                <Button variant="ghost" disabled className="w-full opacity-50 cursor-not-allowed">Unavailable</Button>
              )}
            </div>
            <div className="mt-8 grid gap-3 rounded-[24px] border border-slate-200/80 p-5 text-sm text-slate-600 dark:border-white/10 dark:text-slate-300">
              <div className="flex justify-between gap-3"><span>Brand</span><span className="font-semibold text-slate-950 dark:text-white">{product.brand}</span></div>
              <div className="flex justify-between gap-3"><span>SKU</span><span className="font-semibold text-slate-950 dark:text-white">{product.sku}</span></div>
              <div className="flex justify-between gap-3"><span>Shipping</span><span className="font-semibold text-slate-950 dark:text-white">{product.shipping}</span></div>
              <div className="flex justify-between gap-3"><span>Warranty</span><span className="font-semibold text-slate-950 dark:text-white">{product.warranty}</span></div>
            </div>
            </div>
          </div>
        </div>
        <StickyAddToCartBar product={product} onAddToCart={productActions.onAddToCart} />
        <section className="section-gap pb-0">
          <SectionHeading title="Specifications" description="Clear product information without tabs or hidden detail." />
          <div className="surface grid gap-4 p-6 md:grid-cols-2">
            {Object.entries(product.specs).map(([key, value]) => <div key={key} className="rounded-[24px] border border-slate-200/80 bg-slate-50/70 p-4 text-sm dark:border-white/10 dark:bg-white/[0.03]"><span className="font-semibold text-slate-950 dark:text-white">{key}:</span> <span className="text-slate-600 dark:text-slate-300">{value}</span></div>)}
          </div>
        </section>
        <section className="section-gap pb-0">
          <SectionHeading title="Related products" description="Continue exploring similar premium products from the same storefront." />
          <ProductGrid products={relatedProducts} carousel {...productActions} />
        </section>
      </div>

      <InstallmentModal
        isOpen={showInstallmentModal}
        onClose={() => setShowInstallmentModal(false)}
        product={product}
      />
    </div>
  )
}
