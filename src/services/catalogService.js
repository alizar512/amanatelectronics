import {
  blogPosts,
  brands,
  categories as defaultCategories,
  heroSlides,
  instagramGallery,
  products,
  testimonials,
} from '../assets/data/catalog'
import { apiClient } from './apiClient'

const fallbackHomeData = () => ({
  heroSlides,
  categories: defaultCategories,
  brands,
  testimonials,
  blogPosts,
  instagramGallery,
  featured: products.filter((product) => product.featured),
  bestSellers: products.filter((product) => product.isBestSeller),
  newArrivals: products.filter((product) => product.isNew),
  offers: products.filter((product) => product.originalPrice > product.price),
  popular: products,
})

const withFallback = async (request, fallback) => {
  try {
    return await request()
  } catch {
    return fallback()
  }
}

export const getHomePageData = async () => {
  return withFallback(
    async () => {
      const { data } = await apiClient.get('/home')
      return data
    },
    fallbackHomeData,
  )
}

export const getCategories = async () => {
  return withFallback(
    async () => {
      const { data } = await apiClient.get('/categories')
      return data.categories || data
    },
    () => defaultCategories,
  )
}

export const getAdminCategories = async () => {
  const { data } = await apiClient.get('/admin/categories')
  return data.categories || data
}

export const createAdminCategory = async (categoryData) => {
  const { data } = await apiClient.post('/admin/categories', categoryData)
  return data.category
}

export const updateAdminCategory = async (id, categoryData) => {
  const { data } = await apiClient.put(`/admin/categories/${id}`, categoryData)
  return data.category
}

export const toggleAdminCategoryStatus = async (id) => {
  const { data } = await apiClient.patch(`/admin/categories/${id}/toggle-status`)
  return data
}

export const deleteAdminCategory = async (id) => {
  const { data } = await apiClient.delete(`/admin/categories/${id}`)
  return data
}

export const setProductToFirst = async (id) => {
  const { data } = await apiClient.patch(`/admin/products/${id}/set-first`)
  return data
}

export const getProducts = async (params = {}) => {
  return withFallback(
    async () => {
      const { data } = await apiClient.get('/products', { params })
      return data.items || data
    },
    () => {
      const normalizedQuery = String(params.q || '').trim().toLowerCase()
      const list = products.filter((product) => {
        if (params.category && params.category !== 'all' && product.category?.toLowerCase() !== params.category.toLowerCase()) return false
        if (params.brand && params.brand !== 'all' && product.brand?.toLowerCase() !== params.brand.toLowerCase()) return false
        if (params.availability === 'in-stock' && product.stock < 1) return false

        if (normalizedQuery) {
          const haystack = `${product.name} ${product.brand} ${product.category}`.toLowerCase()
          if (!haystack.includes(normalizedQuery)) return false
        }

        return true
      })

      const sorters = {
        featured: () => [...list].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)),
        'price-asc': () => [...list].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || a.price - b.price),
        'price-desc': () => [...list].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || b.price - a.price),
        rating: () => [...list].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || b.rating - a.rating),
      }

      return (sorters[params.sort] || sorters.featured)()
    },
  )
}

export const getProductBySlug = async (slug) => {
  return withFallback(
    async () => {
      const { data } = await apiClient.get(`/products/${slug}`)
      return data.item || data
    },
    () => products.find((product) => product.slug === slug) || null,
  )
}

export const searchProducts = async (query) => {
  if (!query?.trim()) return []

  const normalizedQuery = query.trim().toLowerCase()

  return withFallback(
    async () => {
      const { data } = await apiClient.get('/search', {
        params: { q: normalizedQuery },
      })
      return data.items || []
    },
    () =>
      products.filter((product) => {
        const haystack = `${product.name} ${product.brand} ${product.category}`.toLowerCase()
        return haystack.includes(normalizedQuery)
      }),
  )
}

export const getTeamMembers = async () => {
  return withFallback(
    async () => {
      const { data } = await apiClient.get('/team')
      return data.team || data
    },
    () => [],
  )
}

export const getAdminTeamMembers = async () => {
  const { data } = await apiClient.get('/admin/team')
  return data.team || data
}

export const createAdminTeamMember = async (memberData) => {
  const { data } = await apiClient.post('/admin/team', memberData)
  return data.member
}

export const updateAdminTeamMember = async (id, memberData) => {
  const { data } = await apiClient.put(`/admin/team/${id}`, memberData)
  return data.member
}

export const deleteAdminTeamMember = async (id) => {
  const { data } = await apiClient.delete(`/admin/team/${id}`)
  return data
}
