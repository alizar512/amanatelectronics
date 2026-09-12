import { getStoreState } from '../store/storageEngine.js'
import {
  filterProducts,
  getAllProducts,
  getProductById,
  getProductBySlug,
} from '../store/productStore.js'
import { getAllCategories } from '../store/categoryStore.js'
import { getReviewsByProductId } from '../store/reviewStore.js'
import { getAllTeamMembers } from '../store/teamStore.js'
import { getDbStatus } from '../config/db.js'

export const getHealth = async (_request, response) => {
  const db = await getDbStatus()

  response.json({
    status: 'ok',
    service: 'Amanat Electronics REST API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: db,
  })
}

export const getHome = (_request, response) => {
  const state = getStoreState()
  const allProducts = getAllProducts().filter((product) => (product.stock || 0) > 0 && product.inStock !== false)
  const categories = getAllCategories({ publicOnly: true })

  response.json({
    heroSlides: state.heroSlides || [],
    categories,
    brands: state.brands || [],
    testimonials: state.testimonials || [],
    blogPosts: state.blogPosts || [],
    instagramGallery: state.instagramGallery || [],
    featured: allProducts.filter((product) => product.featured),
    bestSellers: allProducts.filter((product) => product.isBestSeller),
    newArrivals: allProducts.filter((product) => product.isNew),
    offers: allProducts.filter((product) => (product.originalPrice || 0) > product.price),
    popular: allProducts.slice(0, 8),
  })
}

export const getProducts = (request, response) => {
  const result = filterProducts(request.query)
  const allProducts = getAllProducts()
  const allCategories = getAllCategories({ publicOnly: true })

  const categories = allCategories.map((c) => c.name)
  const brands = [...new Set(allProducts.map((p) => p.brand))].filter(Boolean)

  if (Array.isArray(result)) {
    response.json({
      items: result,
      meta: { total: result.length, categories, brands },
    })
    return
  }

  response.json({
    items: result.items,
    total: result.total,
    page: result.page,
    totalPages: result.totalPages,
    meta: {
      total: result.total,
      categories,
      brands,
    },
  })
}

export const getProductDetails = (request, response) => {
  const product = getProductBySlug(request.params.slug)

  if (!product) {
    response.status(404).json({ message: 'Product not found' })
    return
  }

  const reviews = getReviewsByProductId(product.id)
  const related = getAllProducts()
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4)

  response.json({
    item: product,
    reviews,
    related: related.length ? related : getAllProducts().filter((item) => item.id !== product.id).slice(0, 4),
  })
}

export const getProductByIdEndpoint = (request, response) => {
  const product = getProductById(request.params.id)

  if (!product) {
    response.status(404).json({ message: 'Product not found' })
    return
  }

  const reviews = getReviewsByProductId(product.id)
  response.json({ item: product, reviews })
}

export const getCategories = (_request, response) => {
  const categories = getAllCategories({ publicOnly: true })
  response.json({ categories })
}

export const getBrands = (_request, response) => {
  const state = getStoreState()
  const allProducts = getAllProducts()

  const brandCounts = (state.brands || []).map((brand) => ({
    name: brand,
    count: allProducts.filter((p) => p.brand?.toLowerCase() === brand.toLowerCase()).length,
  }))

  response.json({ brands: brandCounts })
}

export const searchProducts = (request, response) => {
  const query = String(request.query.q || '').trim().toLowerCase()

  if (!query) {
    response.json({ items: [] })
    return
  }

  const allProducts = getAllProducts().filter((p) => (p.stock || 0) > 0 && p.inStock !== false)
  const matches = allProducts.filter((p) => {
    const haystack = `${p.name} ${p.brand} ${p.category} ${p.badge || ''} ${p.sku || ''}`.toLowerCase()
    return haystack.includes(query)
  })

  response.json({
    items: matches,
    suggestions: matches.slice(0, 6).map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: p.price,
      image: p.image || p.images?.[0],
    })),
  })
}

export const getTeam = (_request, response) => {
  const members = getAllTeamMembers()
  response.json({
    items: members,
    total: members.length,
  })
}
