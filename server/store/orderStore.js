import { getStoreState, saveStoreState } from './storageEngine.js'
import { updateProductStock } from './productStore.js'
import { validateCoupon } from './couponStore.js'

export const getAllOrders = () => {
  const state = getStoreState()
  return state.orders
}

export const getOrdersByUserId = (userId) => {
  const state = getStoreState()
  return state.orders
    .filter((o) => String(o.userId) === String(userId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export const getOrderByOrderNumber = (orderNumber) => {
  const state = getStoreState()
  const normalized = String(orderNumber).trim().toUpperCase()
  return (
    state.orders.find(
      (o) => o.orderNumber.toUpperCase() === normalized || String(o.id) === String(orderNumber)
    ) || null
  )
}

export const createOrder = ({
  userId = null,
  customerName,
  customerEmail,
  customerPhone,
  shippingCity,
  shippingAddress,
  paymentMethod = 'Cash on Delivery',
  items = [],
  couponCode = null,
  notes = '',
}) => {
  const state = getStoreState()

  if (!items || items.length === 0) {
    throw new Error('Cannot create order with an empty cart')
  }

  // Validate stock availability for each item before placing order
  for (const item of items) {
    const pId = item.id || item.productId
    if (pId) {
      const liveProduct = state.products.find((p) => String(p.id) === String(pId))
      const requestedQty = Number(item.quantity) || 1
      if (liveProduct && ((liveProduct.stock || 0) < requestedQty || (liveProduct.stock || 0) <= 0)) {
        throw new Error(
          `Product "${liveProduct.name}" is out of stock or only has ${liveProduct.stock || 0} unit(s) available in inventory.`
        )
      }
    }
  }

  // Calculate items subtotal and snapshot items
  let subtotal = 0
  const orderItems = items.map((item, index) => {
    const itemPrice = Number(item.price) || 0
    const itemQty = Number(item.quantity) || 1
    const itemTotal = itemPrice * itemQty
    subtotal += itemTotal

    // Decrease product stock immediately
    if (item.id || item.productId) {
      updateProductStock(item.id || item.productId, -itemQty)
    }

    return {
      id: index + 1,
      productId: item.id || item.productId,
      name: item.name,
      price: itemPrice,
      quantity: itemQty,
      color: item.color || 'Default',
      image: item.image || item.images?.[0] || '',
      total: itemTotal,
    }
  })

  // Calculate Shipping, Tax & Discount
  const shippingFee = subtotal > 100000 ? 0 : 2500
  const tax = Math.round(subtotal * 0.05)

  let discount = 0
  let appliedCoupon = null
  if (couponCode) {
    const couponValidation = validateCoupon(couponCode, subtotal)
    if (couponValidation.valid) {
      discount = couponValidation.discount
      appliedCoupon = couponValidation.code
    }
  }

  const total = Math.max(0, subtotal + shippingFee + tax - discount)

  const nextId = Math.max(...state.orders.map((o) => Number(o.id) || 0), 0) + 1
  const year = new Date().getFullYear()
  const orderNumber = `AMANAT-${year}-${1000 + nextId}`

  const newOrder = {
    id: nextId,
    orderNumber,
    userId: userId ? Number(userId) : null,
    customerName: String(customerName || '').trim(),
    customerEmail: String(customerEmail || '').trim(),
    customerPhone: String(customerPhone || '').trim(),
    shippingCity: String(shippingCity || '').trim(),
    shippingAddress: String(shippingAddress || '').trim(),
    paymentMethod,
    paymentStatus: paymentMethod === 'Cash on Delivery' ? 'pending' : 'paid',
    orderStatus: 'Pending',
    items: orderItems,
    subtotal,
    shippingFee,
    tax,
    discount,
    couponCode: appliedCoupon,
    total,
    notes: String(notes || '').trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  state.orders = [newOrder, ...state.orders]
  saveStoreState(state)
  return newOrder
}

export const updateOrderStatus = (orderId, status) => {
  const validStatuses = ['Pending', 'Processing', 'In transit', 'Delivered', 'Cancelled']
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`)
  }

  const state = getStoreState()
  const order = state.orders.find((o) => String(o.id) === String(orderId) || o.orderNumber === String(orderId))
  if (!order) return null

  order.orderStatus = status
  order.updatedAt = new Date().toISOString()

  saveStoreState(state)
  return order
}

export const cancelOrder = (orderId, userId = null) => {
  const state = getStoreState()
  const order = state.orders.find((o) => String(o.id) === String(orderId) || o.orderNumber === String(orderId))
  if (!order) return null

  if (userId && String(order.userId) !== String(userId)) {
    throw new Error('You do not have permission to cancel this order')
  }

  if (order.orderStatus === 'Delivered' || order.orderStatus === 'In transit') {
    throw new Error(`Cannot cancel an order that is ${order.orderStatus.toLowerCase()}`)
  }

  order.orderStatus = 'Cancelled'
  order.updatedAt = new Date().toISOString()

  // Restock items
  order.items.forEach((item) => {
    if (item.productId) {
      updateProductStock(item.productId, item.quantity)
    }
  })

  saveStoreState(state)
  return order
}

export const getAdminOrderMetrics = () => {
  const state = getStoreState()
  const orders = state.orders || []

  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0)

  const activeOrdersCount = orders.filter(
    (o) => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled'
  ).length

  return {
    totalOrders: orders.length,
    totalRevenue,
    activeOrdersCount,
    deliveredOrders: orders.filter((o) => o.orderStatus === 'Delivered').length,
    pendingOrders: orders.filter((o) => o.orderStatus === 'Pending').length,
  }
}
