import { getStoreState, saveStoreState } from './storageEngine.js'
import { slugify } from '../utils/slugify.js'

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const sortProducts = (items, sort = 'featured') => {
  const sorters = {
    featured: (list) => [...list].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)),
    'price-asc': (list) => [...list].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || a.price - b.price),
    'price-desc': (list) => [...list].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || b.price - a.price),
    rating: (list) => [...list].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || b.rating - a.rating),
    newest: (list) => [...list].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || new Date(b.createdAt || 0) - new Date(a.createdAt || 0)),
  }

  return (sorters[sort] || sorters.featured)(items)
}

export const getAllProducts = () => {
  const state = getStoreState()
  return state.products
}

export const filterProducts = (query = {}) => {
  const {
    category = 'all',
    brand = 'all',
    availability = 'in-stock',
    sort = 'featured',
    minPrice,
    maxPrice,
    q = '',
    limit,
    page = 1,
    includeOutOfStock = false,
  } = query

  const normalizedQuery = String(q).trim().toLowerCase()
  const products = getAllProducts()

  const filtered = products.filter((product) => {
    if (category !== 'all' && product.category?.toLowerCase() !== category.toLowerCase()) return false
    if (brand !== 'all' && product.brand?.toLowerCase() !== brand.toLowerCase()) return false
    
    // Hide out of stock items from customer catalog unless includeOutOfStock is explicitly true
    if (!includeOutOfStock && availability !== 'out-of-stock') {
      if ((product.stock || 0) < 1 || product.inStock === false) return false
    }

    if (availability === 'in-stock' && ((product.stock || 0) < 1 || !product.inStock)) return false
    if (availability === 'out-of-stock' && (product.stock || 0) > 0) return false

    if (minPrice !== undefined && minPrice !== '') {
      if (product.price < Number(minPrice)) return false
    }
    if (maxPrice !== undefined && maxPrice !== '') {
      if (product.price > Number(maxPrice)) return false
    }

    if (normalizedQuery) {
      const haystack = `${product.name} ${product.brand} ${product.category} ${product.description || ''} ${product.sku || ''}`.toLowerCase()
      if (!haystack.includes(normalizedQuery)) return false
    }

    return true
  })

  const sorted = sortProducts(filtered, sort)

  if (limit) {
    const numLimit = Number(limit)
    const numPage = Number(page) || 1
    const start = (numPage - 1) * numLimit
    return {
      items: sorted.slice(start, start + numLimit),
      total: sorted.length,
      page: numPage,
      totalPages: Math.ceil(sorted.length / numLimit),
    }
  }

  return {
    items: sorted,
    total: sorted.length,
  }
}

export const getProductBySlug = (slug) => {
  const products = getAllProducts()
  return products.find((product) => product.slug === slug) || null
}

export const getProductById = (id) => {
  const products = getAllProducts()
  return products.find((product) => String(product.id) === String(id)) || null
}

export const createProduct = (payload) => {
  const state = getStoreState()
  const nextId = Math.max(...state.products.map((product) => Number(product.id) || 0), 0) + 1
  const slug = slugify(payload.slug || payload.name)

  const price = toNumber(payload.price)
  const originalPrice = payload.originalPrice ? toNumber(payload.originalPrice, price) : price
  const stock = payload.stock !== undefined ? toNumber(payload.stock, 10) : 10
  const images = payload.images?.length
    ? payload.images
    : payload.image
      ? [payload.image]
      : ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&h=900&q=80']

  const newProduct = {
    id: nextId,
    name: payload.name,
    slug,
    brand: payload.brand,
    category: payload.category,
    description: payload.description || '',
    price,
    originalPrice,
    rating: payload.rating ? toNumber(payload.rating, 5) : 5,
    reviews: payload.reviews ? toNumber(payload.reviews) : 0,
    stock,
    inStock: stock > 0,
    badge: payload.badge || 'New',
    shipping: payload.shipping || 'Delivery available across Pakistan',
    warranty: payload.warranty || 'Official warranty',
    sku: payload.sku || `AMANAT-${nextId}`,
    colors: payload.colors?.length ? payload.colors : ['Default'],
    images,
    image: images[0],
    specs: payload.specs || {
      Brand: payload.brand,
      Category: payload.category,
    },
    installmentAvailable: payload.installmentAvailable !== undefined ? Boolean(payload.installmentAvailable) : true,
    installmentMonthly: payload.installmentMonthly ? toNumber(payload.installmentMonthly) : Math.round(price / 12),
    installmentAdvance: payload.installmentAdvance !== undefined ? toNumber(payload.installmentAdvance, 20) : 20,
    installmentTenures: payload.installmentTenures || ['3 Months', '6 Months', '12 Months', '24 Months'],
    installmentNote: payload.installmentNote || 'Available on easy monthly installments with flexible bank & showroom plans.',
    installmentMarkup: payload.installmentMarkup || '0% Markup Available',
    installmentPlans: payload.installmentPlans || null,
    featured: Boolean(payload.featured),
    isBestSeller: Boolean(payload.isBestSeller),
    isNew: Boolean(payload.isNew ?? true),
    isPinned: Boolean(payload.isPinned),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  state.products = [newProduct, ...state.products]
  saveStoreState(state)
  return newProduct
}

export const updateProduct = (id, payload) => {
  const state = getStoreState()
  const index = state.products.findIndex((p) => String(p.id) === String(id))
  if (index === -1) return null

  const existing = state.products[index]
  const price = payload.price !== undefined ? toNumber(payload.price, existing.price) : existing.price
  const originalPrice =
    payload.originalPrice !== undefined
      ? toNumber(payload.originalPrice, existing.originalPrice || price)
      : existing.originalPrice
  const stock = payload.stock !== undefined ? toNumber(payload.stock, existing.stock) : existing.stock
  const images = payload.images?.length
    ? payload.images
    : payload.image
      ? [payload.image]
      : existing.images

  const installmentAvailable = payload.installmentAvailable !== undefined ? Boolean(payload.installmentAvailable) : (existing.installmentAvailable ?? true)
  const installmentMonthly = payload.installmentMonthly !== undefined ? toNumber(payload.installmentMonthly, Math.round(price / 12)) : (existing.installmentMonthly || Math.round(price / 12))
  const installmentAdvance = payload.installmentAdvance !== undefined ? toNumber(payload.installmentAdvance, 20) : (existing.installmentAdvance ?? 20)
  const installmentTenures = payload.installmentTenures || existing.installmentTenures || ['3 Months', '6 Months', '12 Months', '24 Months']
  const installmentNote = payload.installmentNote !== undefined ? payload.installmentNote : (existing.installmentNote || 'Available on easy monthly installments with flexible bank & showroom plans.')
  const installmentMarkup = payload.installmentMarkup !== undefined ? payload.installmentMarkup : (existing.installmentMarkup || '0% Markup Available')

  const updatedProduct = {
    ...existing,
    ...payload,
    price,
    originalPrice,
    stock,
    inStock: stock > 0,
    images,
    image: images?.[0] || existing.image,
    isPinned,
    installmentAvailable,
    installmentMonthly,
    installmentAdvance,
    installmentTenures,
    installmentNote,
    installmentMarkup,
    rating: payload.rating !== undefined ? toNumber(payload.rating, existing.rating) : existing.rating,
    reviews: payload.reviews !== undefined ? toNumber(payload.reviews, existing.reviews) : existing.reviews,
    slug: slugify(payload.slug || payload.name || existing.slug),
    updatedAt: new Date().toISOString(),
  }

  if (isPinned && !existing.isPinned) {
    const remaining = state.products.filter((p) => String(p.id) !== String(id))
    state.products = [updatedProduct, ...remaining]
  } else {
    state.products[index] = updatedProduct
  }

  saveStoreState(state)
  return updatedProduct
}

export const setProductToFirst = (id) => {
  const state = getStoreState()
  const index = state.products.findIndex((p) => String(p.id) === String(id))
  if (index === -1) return null

  const product = state.products[index]
  const updatedProduct = {
    ...product,
    isPinned: true,
    pinnedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const remaining = state.products.filter((p) => String(p.id) !== String(id))
  state.products = [updatedProduct, ...remaining]
  saveStoreState(state)
  return updatedProduct
}

export const updateProductStock = (id, quantityChange) => {
  const state = getStoreState()
  const product = state.products.find((p) => String(p.id) === String(id))
  if (!product) return null

  const newStock = Math.max(0, (product.stock || 0) + quantityChange)
  product.stock = newStock
  product.inStock = newStock > 0
  product.updatedAt = new Date().toISOString()

  saveStoreState(state)
  return product
}

export const deleteProduct = (id) => {
  const state = getStoreState()
  const existing = state.products.find((p) => String(p.id) === String(id))
  if (!existing) return null

  state.products = state.products.filter((p) => String(p.id) !== String(id))
  saveStoreState(state)
  return existing
}
