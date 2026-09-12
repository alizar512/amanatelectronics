import { useStore } from '../context/StoreContext'
import { Seo } from '../components/common/Seo'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { EmptyState } from '../components/common/EmptyState'
import { ProductGrid } from '../components/catalog/ProductGrid'

export default function ComparePage() {
  const { compare, addToCart, toggleWishlist, toggleCompare, wishlist } = useStore()

  return (
    <div className="section-gap">
      <Seo title="Compare" description="Compare shortlisted products side by side before purchase." />
      <div className="container-shell">
        <Breadcrumbs items={[{ label: 'Compare' }]} />
        {compare.length ? <ProductGrid products={compare} onQuickView={() => {}} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onToggleCompare={toggleCompare} isWishlisted={(product) => wishlist.some((item) => item.id === product.id)} isCompared={() => true} /> : <EmptyState title="No products to compare" description="Add products from cards or details pages to evaluate them side by side." actionLabel="Browse products" onAction={() => window.location.assign('/shop')} />}
      </div>
    </div>
  )
}
