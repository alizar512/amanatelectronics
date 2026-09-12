import { apiClient } from './apiClient'

export const placeOrder = async (orderPayload) => {
  const response = await apiClient.post('/orders', orderPayload)
  return response.data.order
}

export const getMyOrders = async () => {
  const response = await apiClient.get('/orders/my-orders')
  return response.data.orders
}

export const getOrderDetails = async (orderNumber) => {
  const response = await apiClient.get(`/orders/${orderNumber}`)
  return response.data.order
}

export const cancelOrder = async (orderNumber) => {
  const response = await apiClient.post(`/orders/${orderNumber}/cancel`)
  return response.data.order
}

export const validateCoupon = async (code, subtotal) => {
  const response = await apiClient.post('/coupons/validate', { code, subtotal })
  return response.data
}

export const submitInquiry = async ({ name, email, phone, subject, message }) => {
  const response = await apiClient.post('/contact', { name, email, phone, subject, message })
  return response.data
}

export const subscribeNewsletter = async (email) => {
  const response = await apiClient.post('/newsletter', { email })
  return response.data
}
