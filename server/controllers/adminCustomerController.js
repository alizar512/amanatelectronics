import { getAllCustomers } from '../store/userStore.js'
import { getAllOrders } from '../store/orderStore.js'
import { getAllContactMessages, markMessageAsRead } from '../store/inquiryStore.js'
import { getCoupons, createCoupon, deleteCoupon } from '../store/couponStore.js'

export const getAdminCustomers = (_request, response) => {
  const customers = getAllCustomers()
  const orders = getAllOrders()

  const customersWithStats = customers.map((c) => {
    const customerOrders = orders.filter((o) => String(o.userId) === String(c.id))
    const totalSpent = customerOrders
      .filter((o) => o.orderStatus !== 'Cancelled')
      .reduce((sum, o) => sum + (Number(o.total) || 0), 0)

    return {
      ...c,
      ordersCount: customerOrders.length,
      totalSpent,
    }
  })

  response.json({
    customers: customersWithStats,
    total: customersWithStats.length,
  })
}

export const getAdminContactMessages = (_request, response) => {
  const messages = getAllContactMessages()
  response.json({
    messages,
    unreadCount: messages.filter((m) => !m.isRead).length,
    total: messages.length,
  })
}

export const markAdminMessageRead = (request, response) => {
  const msg = markMessageAsRead(request.params.id)
  if (!msg) {
    response.status(404).json({ message: 'Message not found' })
    return
  }
  response.json({ message: 'Message marked as read', inquiry: msg })
}

export const getAdminCoupons = (_request, response) => {
  const coupons = getCoupons()
  response.json({ coupons, total: coupons.length })
}

export const createAdminCoupon = (request, response) => {
  try {
    const coupon = createCoupon(request.body)
    response.status(201).json({ message: 'Coupon created successfully', coupon })
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
}

export const deleteAdminCoupon = (request, response) => {
  const deleted = deleteCoupon(request.params.id)
  if (!deleted) {
    response.status(404).json({ message: 'Coupon not found' })
    return
  }
  response.json({ message: 'Coupon deleted successfully' })
}
