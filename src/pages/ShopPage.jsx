import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { brands as defaultBrands } from '../assets/data/catalog'
import { getProducts, getCategories } from '../services/catalogService'
import { useStore } from '../context/StoreContext'
import { useToast } from '../context/ToastContext'
import { Seo } from '../components/common/Seo'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { SectionHeading } from '../components/common/SectionHeading'
import { ProductGrid } from '../components/catalog/ProductGrid'
import { FiltersSidebar } from '../components/catalog/FiltersSidebar'
import { Skeleton } from '../components/common/Skeleton'
import { FaSpinner } from 'react-icons/fa'

const defaultFilters = { category: 'all', brand: 'all', availability: 'all', sort: 'featured' }
const INITIAL_BATCH_SIZE = 16
const LOAD_MORE_BATCH_SIZE = 12

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParam = searchParams.get('q')?.toLowerCase() || ''
  const categoryParam = searchParams.get('category')?.toLowerCase() || 'all'

  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare, openQuickView } = useStore()
  const { showToast } = useToast()

  const [products, setProducts] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [filters, setFilters] = useState(() => ({
    ...defaultFilters,
    category: categoryParam,
  }))
  const [loading, setLoading] = useState(true)

  const observerTarget = useRef(null)

  // Sync category param from URL if changed
  useEffect(() => {
    if (categoryParam !== filters.category) {
      setFilters((prev) => ({ ...prev, category: categoryParam }))
      setVisibleCount(INITIAL_BATCH_SIZE)
    }
  }, [categoryParam])

  // Fetch dynamic categories
  useEffect(() => {
    let isActive = true
    getCategories().then((data) => {
      if (isActive) {
        const cats = Array.isArray(data) ? data : data.categories || []
        setCategoriesList(cats.map((c) => c.name))
      }
    })
    return () => {
      isActive = false
    }
  }, [])

  // Fetch filtered products
  useEffect(() => {
    let isActive = true
    setLoading(true)
    setVisibleCount(INITIAL_BATCH_SIZE)

    getProducts({
      ...filters,
      q: queryParam,
    }).then((items) => {
      if (!isActive) return
      setProducts(Array.isArray(items) ? items : items.items || [])
      setLoading(false)
    })

    return () => {
      isActive = false
    }
  }, [filters, queryParam])

  // Slice visible products for lazy loading
  const visibleProducts = useMemo(() => {
    return products.slice(0, visibleCount)
  }, [products, visibleCount])

  const hasMore = visibleProducts.length < products.length

  // Load more handler
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return
    setIsLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE_BATCH_SIZE, products.length))
      setIsLoadingMore(false)
    }, 200)
  }, [isLoadingMore, hasMore, products.length])

  // IntersectionObserver for lazy loading
  useEffect(() => {
    const target = observerTarget.current
    if (!target || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { rootMargin: '250px' }
    )

    observer.observe(target)
    return () => {
      observer.disconnect()
    }
  }, [loadMore, hasMore])

  const options = useMemo(
    () => ({
      categories: categoriesList.length ? categoriesList : ['Cooling', 'Kitchen', 'Entertainment', 'Wellness', 'Smart Home', 'Laundry'],
      brands: defaultBrands,
    }),
    [categoriesList]
  )

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

  const handlePillCategoryChange = (catName) => {
    const newCategory = catName === 'All' ? 'all' : catName.toLowerCase()
    setFilters((prev) => ({ ...prev, category: newCategory }))
    setVisibleCount(INITIAL_BATCH_SIZE)
    if (newCategory === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', newCategory)
    }
    setSearchParams(searchParams)
  }

  const categoryPills = useMemo(() => {
    const defaultList = ['All', ...options.categories]
    return defaultList
  }, [options.categories])

  return (
    <div className="section-gap">
      <Seo
        title="Shop Catalog"
        description="Browse premium electronics and home appliances with fast filters, instant search, category pills, and lazy loading."
      />
      <div className="container-shell">
        <Breadcrumbs items={[{ label: 'Shop' }]} />
        
        <SectionHeading
          eyebrow="Full Catalog"
          title={
            queryParam
              ? `Results for "${queryParam}"`
              : filters.category !== 'all'
              ? `${filters.category.toUpperCase()} Collection`
              : 'All Products & Appliances'
          }
          description="Browse official PEL products with instant specs, warranty, category filters, and smooth lazy loading."
        />

        {/* Category Filter Pills */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categoryPills.map((cat) => {
            const isAll = cat === 'All'
            const isActive = isAll
              ? filters.category === 'all'
              : filters.category.toLowerCase() === cat.toLowerCase()

            return (
              <button
                key={cat}
                onClick={() => handlePillCategoryChange(cat)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat}</span>
              </button>
            )
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <FiltersSidebar
            filters={filters}
            options={options}
            onChange={(key, value) => {
              setFilters((current) => ({ ...current, [key]: value }))
              setVisibleCount(INITIAL_BATCH_SIZE)
            }}
            onClear={() => {
              setFilters(defaultFilters)
              setVisibleCount(INITIAL_BATCH_SIZE)
              setSearchParams({})
            }}
          />

          <div className="space-y-6">
            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>
                Showing <strong className="text-slate-800 dark:text-slate-200">{visibleProducts.length}</strong> of{' '}
                <strong className="text-slate-800 dark:text-slate-200">{products.length}</strong> products
              </span>
              <span className="hidden sm:inline">Optimized with fast lazy loading</span>
            </div>

            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) => (
                  <Skeleton key={index} className="h-[420px] rounded-[32px]" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
                <p className="text-base font-semibold text-slate-700 dark:text-slate-300">No products match your criteria</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Try clearing filters or search terms.</p>
              </div>
            ) : (
              <>
                <ProductGrid products={visibleProducts} {...productActions} />

                {/* Lazy Loading Sentinel and Status Indicator */}
                <div ref={observerTarget} className="mt-8 flex flex-col items-center justify-center py-4">
                  {hasMore ? (
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                      <FaSpinner className="h-3.5 w-3.5 animate-spin text-blue-600 dark:text-blue-400" />
                      <span>Loading more products as you scroll...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                      <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <span>You've reached the end of the catalog ({products.length} items)</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
