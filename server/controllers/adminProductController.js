import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  setProductToFirst,
  updateProduct,
  updateProductStock,
} from '../store/productStore.js'

const validateProductPayload = (payload = {}, { partial = false } = {}) => {
  const requiredFields = ['name', 'brand', 'category', 'price']
  const missingFields = requiredFields.filter((field) => !payload[field] && !partial)

  if (missingFields.length) {
    return `Missing required fields: ${missingFields.join(', ')}`
  }

  return null
}

export const getAdminProducts = (request, response) => {
  const products = getAllProducts()
  const search = String(request.query.search || '').trim().toLowerCase()
  const category = request.query.category

  let filtered = products
  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.sku?.toLowerCase().includes(search)
    )
  }
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
  }

  // Return both array and items wrapper for frontend compatibility
  response.json({
    items: filtered,
    total: filtered.length,
  })
}

export const getAdminProduct = (request, response) => {
  const product = getProductById(request.params.id)

  if (!product) {
    response.status(404).json({ message: 'Product not found' })
    return
  }

  response.json({ item: product, product })
}

export const createAdminProduct = (request, response) => {
  const error = validateProductPayload(request.body)

  if (error) {
    response.status(400).json({ message: error })
    return
  }

  const product = createProduct(request.body)

  response.status(201).json({
    message: 'Product created successfully',
    item: product,
    product,
  })
}

export const updateAdminProduct = (request, response) => {
  const error = validateProductPayload(request.body, { partial: true })

  if (error) {
    response.status(400).json({ message: error })
    return
  }

  const product = updateProduct(request.params.id, request.body)

  if (!product) {
    response.status(404).json({ message: 'Product not found' })
    return
  }

  response.json({
    message: 'Product updated successfully',
    item: product,
    product,
  })
}

export const updateAdminStock = (request, response) => {
  const { quantityChange } = request.body || {}
  const product = updateProductStock(request.params.id, Number(quantityChange) || 0)

  if (!product) {
    response.status(404).json({ message: 'Product not found' })
    return
  }

  response.json({
    message: 'Stock updated successfully',
    product,
  })
}

export const setAdminProductFirst = (request, response) => {
  const product = setProductToFirst(request.params.id)

  if (!product) {
    response.status(404).json({ message: 'Product not found' })
    return
  }

  response.json({
    message: `"${product.name}" is now set to display first!`,
    item: product,
    product,
  })
}

export const deleteAdminProduct = (request, response) => {
  const product = deleteProduct(request.params.id)

  if (!product) {
    response.status(404).json({ message: 'Product not found' })
    return
  }

  response.json({
    message: 'Product deleted successfully',
    item: product,
  })
}
