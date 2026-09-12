import { useStore } from '../context/StoreContext'
import { Seo } from '../components/common/Seo'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { EmptyState } from '../components/common/EmptyState'
import { ProductGrid } from '../components/catalog/ProductGrid'

export default function WishlistPage() {
  const { wishlist, addToCart, toggleWishlist, toggleCompare, compare } = useStore()

  return (
    <div className="section-gap">
      <Seo title="Wishlist" description="Keep favorite products ready for later review or purchase." />
      <div className="container-shell">
        <Breadcrumbs items={[{ label: 'Wishlist' }]} />
        {wishlist.length ? <ProductGrid products={wishlist} onQuickView={() => {}} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onToggleCompare={toggleCompare} isWishlisted={() => true} isCompared={(product) => compare.some((item) => item.id === product.id)} /> : <EmptyState title="Your wishlist is empty" description="Save products you want to revisit later without losing your momentum." actionLabel="Browse products" onAction={() => window.location.assign('/shop')} />}
      </div>
    </div>
  )
}
