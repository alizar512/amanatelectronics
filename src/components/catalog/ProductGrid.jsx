// src/components/catalog/ProductGrid.jsx
import { ProductCard } from './ProductCard'

const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden" style={{ border: '1px solid var(--color-border-light)' }}>
      <div className="h-[220px]" style={{ backgroundColor: 'var(--color-product-bg)' }} />
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/4 rounded" style={{ backgroundColor: 'var(--color-bg-alt)' }} />
        <div className="h-4 w-3/4 rounded" style={{ backgroundColor: 'var(--color-bg-alt)' }} />
        <div className="h-4 w-1/2 rounded" style={{ backgroundColor: 'var(--color-bg-alt)' }} />
        <div className="h-10 w-full rounded" style={{ backgroundColor: 'var(--color-bg-alt)' }} />
      </div>
    </div>
  )
}

export const ProductGrid = ({
  products,
  loading = false,
  columns = 4,
  showViewAll = true,
  viewAllLink = '/shop'
}) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-${Math.min(columns, 4)}`}>
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-base font-semibold" style={{ color: 'var(--color-headings)' }}>No products found</p>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-alt-text)' }}>Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  const gridCols = {
    2: 'grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  }

  return (
    <div className={`grid gap-4 sm:gap-5 ${gridCols[columns] || gridCols[4]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}