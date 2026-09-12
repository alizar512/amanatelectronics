import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaSearch, 
  FaSpinner, 
  FaFilter, 
  FaEye, 
  FaBoxOpen, 
  FaTruck, 
  FaMoneyBillWave, 
  FaUser, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaExternalLinkAlt, 
  FaEdit, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTimesCircle,
  FaFileInvoiceDollar
} from 'react-icons/fa'
import { apiClient } from '../../services/apiClient'
import { Modal } from '../../components/common/Modal'
import { useToast } from '../../context/ToastContext'
import { formatCurrency } from '../../utils/format'

export default function AdminOrders() {
  const { showToast } = useToast()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [updatingId, setUpdatingId] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [statusFilter])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = {}
      if (statusFilter !== 'all') params.status = statusFilter
      const response = await apiClient.get('/admin/orders', { params })
      const fetchedOrders = response.data.orders || []
      setOrders(fetchedOrders)

      // Sync active selected order if modal is open
      if (selectedOrder) {
        const refreshed = fetchedOrders.find((o) => o.id === selectedOrder.id)
        if (refreshed) setSelectedOrder(refreshed)
      }
    } catch (error) {
      console.error('Error fetching admin orders:', error)
      showToast('Failed to load orders', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId)
    try {
      await apiClient.patch(`/admin/orders/${orderId}/status`, { status: newStatus })
      showToast(`Order status changed to ${newStatus}`, 'success')
      await fetchOrders()
    } catch (error) {
      console.error('Error updating order status:', error)
      showToast('Failed to update order status', 'error')
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingCity?.toLowerCase().includes(search.toLowerCase()) ||
      o.items?.some((it) => it.name?.toLowerCase().includes(search.toLowerCase()))
  )

  const statusColors = {
    Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300 dark:border-amber-700',
    Processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-300 dark:border-blue-700',
    'In transit': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700',
    Delivered: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700',
    Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border border-red-300 dark:border-red-700',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Orders</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Inspect order line items, view stock deductions, and track shipment status.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative min-w-[280px] flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order #, product name, customer, city..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <FaFilter className="text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="In transit">In transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">Order #</th>
                  <th className="px-5 py-3.5">Customer</th>
                  <th className="px-5 py-3.5">Purchased Products</th>
                  <th className="px-5 py-3.5">Total & Payment</th>
                  <th className="px-5 py-3.5">City</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 dark:text-slate-400">
                      No orders found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-5 py-4">
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          #{order.orderNumber}
                        </span>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('en-PK', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {order.customerPhone}
                        </p>
                      </td>

                      <td className="px-5 py-4 max-w-xs">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-100 px-1.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {order.items?.length || 0}
                          </span>
                          <span className="truncate font-medium text-slate-800 dark:text-slate-200">
                            {order.items?.map((it) => it.name).join(', ') || 'No items'}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900 dark:text-white">
                          {formatCurrency(order.total)}
                        </p>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block">
                          {order.paymentMethod}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-700 dark:text-slate-300">
                        {order.shippingCity}
                      </td>

                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          disabled={updatingId === order.id}
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none transition-all ${
                            statusColors[order.orderStatus] || 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="In transit">In transit</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="px-5 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        >
                          <FaEye /> View Products
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Selected Order & Detailed Products Modal */}
      {selectedOrder && (
        <Modal
          isOpen={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          title={`Order #${selectedOrder.orderNumber} Details & Products`}
        >
          <div className="space-y-6 text-slate-800 dark:text-slate-200">
            {/* Top Status & Customer Summary */}
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Customer Info */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
                <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <FaUser className="text-blue-600" /> Customer
                </h4>
                <p className="font-bold text-slate-900 dark:text-white">{selectedOrder.customerName}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{selectedOrder.customerEmail}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 flex items-center gap-1">
                  <FaPhoneAlt size={10} /> {selectedOrder.customerPhone}
                </p>
              </div>

              {/* Shipping Destination */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
                <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <FaMapMarkerAlt className="text-emerald-600" /> Delivery Address
                </h4>
                <p className="font-bold text-slate-900 dark:text-white">{selectedOrder.shippingCity}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {selectedOrder.shippingAddress}
                </p>
              </div>

              {/* Status & Payment Method */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
                <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <FaMoneyBillWave className="text-purple-600" /> Status & Payment
                </h4>
                <div className="mb-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                      statusColors[selectedOrder.orderStatus] || 'bg-slate-100'
                    }`}
                  >
                    {selectedOrder.orderStatus}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {selectedOrder.paymentMethod}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Special Instructions / Notes */}
            {selectedOrder.notes && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                <strong>Customer Note:</strong> {selectedOrder.notes}
              </div>
            )}

            {/* Purchased Product Line Items with Stock Inspection */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FaBoxOpen className="text-blue-600" /> Selected Items & Live Stock Status ({selectedOrder.items?.length || 0})
                </h3>
                <span className="text-xs text-slate-500">
                  Stock deducted upon order creation
                </span>
              </div>

              <div className="space-y-3">
                {selectedOrder.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
                  >
                    {/* Product Image & Details */}
                    <div className="flex items-center gap-3.5">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-800">
                        <img
                          src={item.image || '/images/placeholder.jpg'}
                          alt={item.name}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&h=300&q=80'
                          }}
                        />
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {item.name}
                        </h4>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold dark:bg-slate-800">
                            SKU: {item.sku || `AMANAT-${item.productId || idx + 1}`}
                          </span>
                          {item.brand && (
                            <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                              {item.brand}
                            </span>
                          )}
                          {item.category && (
                            <span className="rounded bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                              {item.category}
                            </span>
                          )}
                          {item.color && item.color !== 'Default' && (
                            <span className="text-slate-600 dark:text-slate-300">
                              Color: <strong>{item.color}</strong>
                            </span>
                          )}
                        </div>

                        {/* Live Inventory Badge */}
                        <div className="pt-1 flex items-center gap-2">
                          {item.currentStock !== null && item.currentStock !== undefined ? (
                            item.currentStock > 5 ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                <FaCheckCircle size={10} /> In Stock ({item.currentStock} units remaining)
                              </span>
                            ) : item.currentStock > 0 ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                                <FaExclamationTriangle size={10} /> Low Stock (Only {item.currentStock} left!)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-semibold text-red-800 dark:bg-red-950/60 dark:text-red-300">
                                <FaTimesCircle size={10} /> Out of Stock (0 units remaining)
                              </span>
                            )
                          ) : (
                            <span className="text-[11px] text-slate-400">Stock tracked</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex flex-wrap items-center justify-between sm:flex-col sm:items-end gap-2 border-t pt-2 sm:border-t-0 sm:pt-0 dark:border-slate-800">
                      <div className="text-right">
                        <p className="text-xs text-slate-500">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                        <p className="text-base font-bold text-slate-900 dark:text-white">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.slug && (
                          <Link
                            to={`/product/${item.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            title="View on public storefront"
                          >
                            <FaExternalLinkAlt size={10} /> Store
                          </Link>
                        )}
                        {item.productId && (
                          <Link
                            to={`/admin/products/${item.productId}/edit`}
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
                            title="Edit product stock or pricing in admin"
                          >
                            <FaEdit size={10} /> Edit Product
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary & Status Modifier */}
            <div className="grid gap-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/80 sm:grid-cols-2 sm:p-6">
              {/* Status Updater */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Update Order Status
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    disabled={updatingId === selectedOrder.id}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="In transit">In transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled (Restocks items)</option>
                  </select>
                </div>
                <p className="text-[11px] text-slate-400">
                  {selectedOrder.orderStatus === 'Cancelled'
                    ? '⚠️ Items have been restored to product inventory stock.'
                    : 'Stock was deducted when the customer submitted checkout.'}
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(selectedOrder.subtotal || selectedOrder.total)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Courier:</span>
                  <span>{selectedOrder.shippingFee === 0 ? 'Free' : formatCurrency(selectedOrder.shippingFee || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax:</span>
                  <span>{formatCurrency(selectedOrder.tax || 0)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Discount Coupon ({selectedOrder.couponCode || 'PROMO'}):</span>
                    <span>-{formatCurrency(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-950 dark:text-white dark:border-slate-800">
                  <span>Grand Total:</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {formatCurrency(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
