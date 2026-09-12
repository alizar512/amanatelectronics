import {
  createOrder,
  getOrdersByUserId,
  getOrderByOrderNumber,
  cancelOrder,
} from '../store/orderStore.js'

export const placeOrder = (request, response) => {
  const {
    customerName,
    customerEmail,
    customerPhone,
    shippingCity,
    shippingAddress,
    paymentMethod,
    items,
    couponCode,
    notes,
  } = request.body || {}

  if (!customerName || !customerEmail || !customerPhone || !shippingCity || !shippingAddress) {
    response.status(400).json({
      message: 'Name, email, phone, city, and shipping address are required',
    })
    return
  }

  if (!items || !items.length) {
    response.status(400).json({ message: 'Cart items are required' })
    return
  }

  try {
    const order = createOrder({
      userId: request.user?.id || null,
      customerName,
      customerEmail,
      customerPhone,
      shippingCity,
      shippingAddress,
      paymentMethod,
      items,
      couponCode,
      notes,
    })

    response.status(201).json({
      message: 'Order placed successfully',
      order,
    })
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
}

export const getMyOrders = (request, response) => {
  if (!request.user?.id) {
    response.status(401).json({ message: 'Authentication required' })
    return
  }

  const orders = getOrdersByUserId(request.user.id)
  response.json({
    orders,
    total: orders.length,
  })
}

export const getOrderDetails = (request, response) => {
  const orderNumber = request.params.orderNumber
  const order = getOrderByOrderNumber(orderNumber)

  if (!order) {
    response.status(404).json({ message: 'Order not found' })
    return
  }

  // If user is authenticated as customer, verify ownership unless admin
  if (
    request.user &&
    request.user.role === 'customer' &&
    order.userId &&
    String(order.userId) !== String(request.user.id)
  ) {
    response.status(403).json({ message: 'You do not have permission to view this order' })
    return
  }

  response.json({ order })
}

export const cancelCustomerOrder = (request, response) => {
  const orderNumber = request.params.orderNumber
  try {
    const cancelled = cancelOrder(orderNumber, request.user?.id)
    if (!cancelled) {
      response.status(404).json({ message: 'Order not found' })
      return
    }
    response.json({
      message: 'Order has been cancelled successfully',
      order: cancelled,
    })
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
}
