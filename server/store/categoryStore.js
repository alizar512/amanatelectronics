import { getStoreState, saveStoreState } from './storageEngine.js'
import { slugify } from '../utils/slugify.js'
import { getAllProducts } from './productStore.js'

export const getAllCategories = ({ publicOnly = false } = {}) => {
  const state = getStoreState()
  const products = getAllProducts()

  let categories = state.categories || []
  if (publicOnly) {
    categories = categories.filter((cat) => cat.isActive !== false)
  }

  return categories.map((cat) => ({
    ...cat,
    isActive: cat.isActive !== false,
    count: products.filter(
      (p) =>
        p.category?.toLowerCase() === cat.name?.toLowerCase() ||
        p.category?.toLowerCase() === cat.id?.toLowerCase()
    ).length,
  }))
}

export const getCategoryById = (id) => {
  const state = getStoreState()
  const normalized = String(id).trim().toLowerCase()
  const cat = state.categories.find(
    (c) => c.id.toLowerCase() === normalized || c.name.toLowerCase() === normalized
  )
  if (!cat) return null
  return {
    ...cat,
    isActive: cat.isActive !== false,
  }
}

export const createCategory = ({
  name,
  description = '',
  accent = '',
  imageUrl = '',
  image = '',
  isActive = true,
}) => {
  if (!name || !name.trim()) {
    throw new Error('Category name is required')
  }

  const state = getStoreState()
  const cleanName = name.trim()
  const slug = slugify(cleanName)

  const existing = state.categories.find(
    (c) => c.id.toLowerCase() === slug || c.name.toLowerCase() === cleanName.toLowerCase()
  )
  if (existing) {
    throw new Error('A category with this name already exists')
  }

  const defaultAccents = [
    'from-sky-500/20 to-cyan-500/10',
    'from-amber-500/20 to-orange-500/10',
    'from-emerald-500/20 to-teal-500/10',
    'from-violet-500/20 to-fuchsia-500/10',
    'from-blue-500/20 to-indigo-500/10',
    'from-rose-500/20 to-pink-500/10',
    'from-slate-500/20 to-slate-700/10',
  ]

  const resolvedImage = (imageUrl || image || '').trim() || null

  const newCategory = {
    id: slug,
    name: cleanName,
    description: description.trim(),
    accent: accent || defaultAccents[state.categories.length % defaultAccents.length],
    imageUrl: resolvedImage,
    isActive: isActive !== false,
    createdAt: new Date().toISOString(),
  }

  state.categories.push(newCategory)
  saveStoreState(state)
  return newCategory
}

export const updateCategory = (id, updates = {}) => {
  const state = getStoreState()
  const normalized = String(id).trim().toLowerCase()
  const category = state.categories.find(
    (c) => c.id.toLowerCase() === normalized || c.name.toLowerCase() === normalized
  )

  if (!category) return null

  const oldName = category.name
  if (updates.name && updates.name.trim()) {
    const newName = updates.name.trim()
    category.name = newName

    // Also update any products referencing the old category name
    if (state.products && oldName !== newName) {
      state.products.forEach((p) => {
        if (p.category?.toLowerCase() === oldName.toLowerCase()) {
          p.category = newName
        }
      })
    }
  }

  if (updates.description !== undefined) category.description = updates.description.trim()
  if (updates.accent !== undefined) category.accent = updates.accent.trim()
  if (updates.imageUrl !== undefined || updates.image !== undefined) {
    category.imageUrl = (updates.imageUrl || updates.image || '').trim() || null
  }
  if (updates.isActive !== undefined) {
    category.isActive = Boolean(updates.isActive)
  }

  category.updatedAt = new Date().toISOString()
  saveStoreState(state)
  return category
}

export const toggleCategoryStatus = (id) => {
  const state = getStoreState()
  const normalized = String(id).trim().toLowerCase()
  const category = state.categories.find(
    (c) => c.id.toLowerCase() === normalized || c.name.toLowerCase() === normalized
  )

  if (!category) return null

  category.isActive = category.isActive === false ? true : false
  category.updatedAt = new Date().toISOString()
  saveStoreState(state)
  return category
}

export const deleteCategory = (id) => {
  const state = getStoreState()
  const normalized = String(id).trim().toLowerCase()
  const category = state.categories.find(
    (c) => c.id.toLowerCase() === normalized || c.name.toLowerCase() === normalized
  )

  if (!category) return null

  state.categories = state.categories.filter(
    (c) => c.id.toLowerCase() !== normalized && c.name.toLowerCase() !== normalized
  )
  saveStoreState(state)
  return category
}
