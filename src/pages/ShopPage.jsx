import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { brands as defaultBrands } from '../assets/data/catalog'
import { getProducts, getCategories } from '../services/catalogService'
import { useStore } from '../context/StoreContext'
import { useToast } from '../context/ToastContext'
import { Seo } from '../components/common/Seo'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ProductGrid } from '../components/catalog/ProductGrid'
import { FiltersSidebar } from '../components/catalog/FiltersSidebar'
import { Skeleton } from '../components/common/Skeleton'
import { FaSpinner, FaTh, FaThList } from 'react-icons/fa'
import { IoChevronDown } from 'react-icons/io5'

const defaultFilters = { category: 'all', brand: 'all', availability: 'all', sort: 'featured' }
const INITIAL_BATCH_SIZE = 16
const LOAD_MORE_BATCH_SIZE = 12

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

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
  const [viewMode, setViewMode] = useState('grid')

  const observerTarget = useRef(null)

  useEffect(() => {
    if (categoryParam !== filters.category) {
      setFilters((prev) => ({ ...prev, category: categoryParam }))
      setVisibleCount(INITIAL_BATCH_SIZE)
    }
  }, [categoryParam])

  useEffect(() => {
    let isActive = true
    getCategories().then((data) => {
      if (isActive) {
        const cats = Array.isArray(data) ? data : data.categories || []
        setCategoriesList(cats.map((c) => c.name))
      }
    })
    return () => { isActive = false }
  }, [])

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

    return () => { isActive = false }
  }, [filters, queryParam])

  const visibleProducts = useMemo(() => {
    return products.slice(0, visibleCount)
  }, [products, visibleCount])

  const hasMore = visibleProducts.length < products.length

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return
    setIsLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE_BATCH_SIZE, products.length))
      setIsLoadingMore(false)
    }, 200)
  }, [isLoadingMore, hasMore, products.length])

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
    return () => { observer.disconnect() }
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
    return ['All', ...options.categories]
  }, [options.categories])

  const pageTitle = queryParam
    ? `Results for "${queryParam}"`
    : filters.category !== 'all'
    ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}`
    : 'All Products'

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <Seo
        title={`${pageTitle} — Amanat Electronics`}
        description="Browse premium electronics and home appliances with fast filters, instant search, and easy navigation."
      />

      {/* Page Header */}
      <div style={{ backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container-shell py-6">
          <Breadcrumbs items={[{ label: 'Shop' }]} />
          <h1 className="mt-2 text-2xl font-bold uppercase tracking-wider" style={{ color: 'var(--color-headings)' }}>
            {pageTitle}
          </h1>
          {queryParam && (
            <p className="mt-1 text-sm" style={{ color: 'var(--color-alt-text)' }}>
              Showing results for "<strong>{queryParam}</strong>"
            </p>
          )}
        </div>
      </div>

      <div className="container-shell py-6">
        {/* Category Pills */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categoryPills.map((cat) => {
            const isAll = cat === 'All'
            const isActive = isAll
              ? filters.category === 'all'
              : filters.category.toLowerCase() === cat.toLowerCase()

            return (
              <button
                key={cat}
                onClick={() => handlePillCategoryChange(cat)}
                className="whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: isActive ? 'var(--color-brand)' : 'transparent',
                  color: isActive ? 'var(--color-brand-text)' : 'var(--color-text)',
                  border: `1px solid ${isActive ? 'var(--color-brand)' : 'var(--color-border)'}`,
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
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

          <div>
            {/* Toolbar */}
            <div
              className="mb-5 flex items-center justify-between border-b pb-4"
              style={{ borderColor: 'var(--color-border-light)' }}
            >
              <span className="text-sm" style={{ color: 'var(--color-alt-text)' }}>
                Showing <strong style={{ color: 'var(--color-headings)' }}>{visibleProducts.length}</strong> of{' '}
                <strong style={{ color: 'var(--color-headings)' }}>{products.length}</strong> products
              </span>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={filters.sort}
                    onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
                    className="appearance-none border py-2 pl-3 pr-8 text-xs uppercase tracking-wider outline-none"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-bg)',
                      color: 'var(--color-text)',
                    }}
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <IoChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" size={12} style={{ color: 'var(--color-alt-text)' }} />
                </div>

                {/* View toggle */}
                <div className="hidden items-center gap-1 sm:flex">
                  <button
                    onClick={() => setViewMode('grid')}
                    className="flex h-8 w-8 items-center justify-center transition-colors"
                    style={{
                      backgroundColor: viewMode === 'grid' ? 'var(--color-brand)' : 'transparent',
                      color: viewMode === 'grid' ? 'var(--color-brand-text)' : 'var(--color-alt-text)',
                      border: `1px solid ${viewMode === 'grid' ? 'var(--color-brand)' : 'var(--color-border)'}`,
                    }}
                    aria-label="Grid view"
                  >
                    <FaTh size={12} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className="flex h-8 w-8 items-center justify-center transition-colors"
                    style={{
                      backgroundColor: viewMode === 'list' ? 'var(--color-brand)' : 'transparent',
                      color: viewMode === 'list' ? 'var(--color-brand-text)' : 'var(--color-alt-text)',
                      border: `1px solid ${viewMode === 'list' ? 'var(--color-brand)' : 'var(--color-border)'}`,
                    }}
                    aria-label="List view"
                  >
                    <FaThList size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) => (
                  <Skeleton key={index} className="h-[380px]" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 text-center"
                style={{ border: '2px dashed var(--color-border)' }}
              >
                <p className="text-lg font-bold" style={{ color: 'var(--color-headings)' }}>
                  No products found
                </p>
                <p className="mt-2 text-sm" style={{ color: 'var(--color-alt-text)' }}>
                  Try clearing your filters or searching for something else.
                </p>
                <button
                  onClick={() => {
                    setFilters(defaultFilters)
                    setSearchParams({})
                  }}
                  className="btn-brand mt-4"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <ProductGrid
                  products={visibleProducts}
                  columns={viewMode === 'list' ? 2 : 3}
                  {...productActions}
                />

                {/* Lazy Loading Sentinel */}
                <div ref={observerTarget} className="mt-8 flex flex-col items-center justify-center py-4">
                  {hasMore ? (
                    <div
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                      style={{
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-alt-text)',
                      }}
                    >
                      <FaSpinner className="h-3.5 w-3.5 animate-spin" style={{ color: 'var(--color-brand)' }} />
                      <span>Loading more products...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-lighter)' }}>
                      <span className="h-px w-8" style={{ backgroundColor: 'var(--color-border)' }} />
                      <span>End of catalog ({products.length} items)</span>
                      <span className="h-px w-8" style={{ backgroundColor: 'var(--color-border)' }} />
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
