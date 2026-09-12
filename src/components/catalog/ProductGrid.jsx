// src/components/catalog/ProductGrid.jsx
import { ProductCard } from './ProductCard'

// Skeleton component defined locally
const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl bg-white shadow-sm dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
      <div className="h-40 rounded-t-xl bg-slate-200 dark:bg-slate-800" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-1/4 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-8 w-full rounded bg-slate-200 dark:bg-slate-800 mt-2" />
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
      <div className={`grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-${Math.min(columns, 4)} lg:gap-5`}>
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-slate-500 dark:text-slate-400">No products in this category</p>
      </div>
    )
  }

  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={`grid grid-cols-1 gap-3.5 sm:gap-4 lg:gap-5 ${gridCols[columns] || gridCols[4]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}