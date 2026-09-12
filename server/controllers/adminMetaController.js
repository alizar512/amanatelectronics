import { getStoreState } from '../store/storageEngine.js'
import { getAllProducts } from '../store/productStore.js'
import { getAllOrders, getAdminOrderMetrics } from '../store/orderStore.js'
import { getAllCustomers } from '../store/userStore.js'
import { getAllCategories } from '../store/categoryStore.js'

export const getAdminCatalogMeta = (_request, response) => {
  const state = getStoreState()
  const categories = getAllCategories()

  response.json({
    categories,
    brands: state.brands || [],
    badges: ['Deal of the month', 'Hot pick', 'Cinema grade', 'New arrival', 'Best seller', 'Featured'],
    orderStatuses: ['Pending', 'Processing', 'In transit', 'Delivered', 'Cancelled'],
    roles: ['admin', 'manager'],
  })
}

export const getAdminDashboard = (_request, response) => {
  const allProducts = getAllProducts()
  const allOrders = getAllOrders()
  const customers = getAllCustomers()
  const categories = getAllCategories()
  const orderMetrics = getAdminOrderMetrics()

  const recentOrders = [...allOrders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  const recentActivity = [
    ...recentOrders.map((o) => ({
      id: `order-${o.id}`,
      type: 'order',
      title: `New order #${o.orderNumber}`,
      subtitle: `Rs ${o.total.toLocaleString()} • ${o.items.length} items • ${o.customerName}`,
      time: o.createdAt,
      status: o.orderStatus,
    })),
  ]

  response.json({
    totalProducts: allProducts.length,
    totalCategories: categories.length,
    totalOrders: orderMetrics.totalOrders,
    totalRevenue: orderMetrics.totalRevenue,
    activeUsers: customers.length + 2,
    stats: {
      totalProducts: allProducts.length,
      totalCategories: categories.length,
      featuredProducts: allProducts.filter((product) => product.featured).length,
      bestSellers: allProducts.filter((product) => product.isBestSeller).length,
      lowStockProducts: allProducts.filter((product) => product.stock > 0 && product.stock <= 5).length,
      outOfStockProducts: allProducts.filter((product) => (product.stock || 0) < 1).length,
      activeOrders: orderMetrics.activeOrdersCount,
      deliveredOrders: orderMetrics.deliveredOrders,
      pendingOrders: orderMetrics.pendingOrders,
    },
    recentProducts: allProducts.slice(0, 5),
    recentOrders,
    recentActivity,
  })
}
