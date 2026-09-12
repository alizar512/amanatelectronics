import {
  getAllOrders,
  getOrderByOrderNumber,
  updateOrderStatus,
} from '../store/orderStore.js'
import { getAllProducts } from '../store/productStore.js'

const enrichOrderProducts = (order, allProducts) => {
  if (!order || !order.items) return order

  const enrichedItems = order.items.map((item) => {
    const liveProduct = allProducts.find(
      (p) =>
        String(p.id) === String(item.productId || item.id) ||
        p.name?.toLowerCase() === item.name?.toLowerCase()
    )

    return {
      ...item,
      productId: liveProduct?.id || item.productId || item.id,
      sku: liveProduct?.sku || item.sku || `AMANAT-${item.productId || item.id || 'SKU'}`,
      slug: liveProduct?.slug || null,
      brand: liveProduct?.brand || 'Amanat Electronics',
      category: liveProduct?.category || 'Appliance',
      currentStock: liveProduct ? (liveProduct.stock ?? 0) : null,
      liveInStock: liveProduct ? (liveProduct.stock > 0 && liveProduct.inStock !== false) : false,
      image: item.image || liveProduct?.image || liveProduct?.images?.[0] || '',
    }
  })

  return {
    ...order,
    items: enrichedItems,
  }
}

export const getAdminOrders = (request, response) => {
  const orders = getAllOrders()
  const allProducts = getAllProducts()
  const status = request.query.status
  const search = String(request.query.search || '').trim().toLowerCase()

  let filtered = [...orders]

  if (status && status !== 'all') {
    filtered = filtered.filter((o) => o.orderStatus.toLowerCase() === status.toLowerCase())
  }

  if (search) {
    filtered = filtered.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(search) ||
        o.customerName.toLowerCase().includes(search) ||
        o.customerEmail.toLowerCase().includes(search) ||
        o.customerPhone.includes(search)
    )
  }

  // Enrich with live product and stock info
  const enrichedOrders = filtered.map((o) => enrichOrderProducts(o, allProducts))

  // Sort descending by creation date
  enrichedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  response.json({
    orders: enrichedOrders,
    total: enrichedOrders.length,
  })
}

export const getAdminOrder = (request, response) => {
  const order = getOrderByOrderNumber(request.params.id)
  const allProducts = getAllProducts()

  if (!order) {
    response.status(404).json({ message: 'Order not found' })
    return
  }

  const enriched = enrichOrderProducts(order, allProducts)
  response.json({ order: enriched })
}

export const updateAdminOrderStatus = (request, response) => {
  const { status } = request.body || {}
  const allProducts = getAllProducts()

  if (!status) {
    response.status(400).json({ message: 'Order status is required' })
    return
  }

  try {
    const updated = updateOrderStatus(request.params.id, status)
    if (!updated) {
      response.status(404).json({ message: 'Order not found' })
      return
    }

    const enriched = enrichOrderProducts(updated, allProducts)
    response.json({
      message: `Order status updated to ${status}`,
      order: enriched,
    })
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
}
