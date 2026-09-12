import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch,
  FaSpinner,
  FaBox,
  FaEye,
  FaThumbtack
} from 'react-icons/fa'
import { apiClient } from '../../services/apiClient'
import { useToast } from '../../context/ToastContext'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [settingFirstId, setSettingFirstId] = useState(null)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/admin/products')
      const items = Array.isArray(response.data) ? response.data : response.data.items || []
      setProducts(items)
    } catch (error) {
      console.error('Error fetching products:', error)
      showToast('Failed to load products', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSetFirst = async (id, name) => {
    setSettingFirstId(id)
    try {
      await apiClient.patch(`/admin/products/${id}/set-first`)
      showToast(`"${name}" is now set as the very first product!`, 'success')
      await fetchProducts()
    } catch (error) {
      showToast(error.response?.data?.message || 'Error updating product order', 'error')
    } finally {
      setSettingFirstId(null)
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return
    
    try {
      await apiClient.delete(`/admin/products/${id}`)
      showToast(`Product "${name}" deleted`, 'success')
      await fetchProducts()
    } catch (error) {
      showToast(error.response?.data?.message || 'Error deleting product', 'error')
    }
  }

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Products Catalog
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create, prioritize, update, and manage inventory for your store
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl"
        >
          <FaPlus />
          Add New Product
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name, category, brand, SKU..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <FaSpinner className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Product & SKU
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Category
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Selling Price
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Stock Level
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Badge / Priority
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-slate-400">
                      No products found. Click "Add New Product" to create one.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, idx) => (
                    <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&h=120&q=80'}
                            alt={product.name}
                            className="h-12 w-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-slate-900 dark:text-white">
                                {product.name}
                              </p>
                              {(product.isPinned || idx === 0) && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                                  <FaThumbtack className="h-2 w-2" /> Top #1
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {product.brand} • <span className="font-mono text-slate-400">{product.sku || product.id}</span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                        Rs {Number(product.price).toLocaleString()}
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="block text-[11px] font-normal text-slate-400 line-through">
                            Rs {Number(product.originalPrice).toLocaleString()}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                          (product.stock > 5) 
                            ? 'text-emerald-600 dark:text-emerald-400' 
                            : (product.stock > 0) 
                            ? 'text-amber-600 dark:text-amber-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          <span className={`h-2 w-2 rounded-full ${
                            (product.stock > 5) ? 'bg-emerald-500' : (product.stock > 0) ? 'bg-amber-500' : 'bg-red-500'
                          }`} />
                          {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {product.isPinned ? (
                            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-amber-50 border border-amber-300 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300">
                              <FaThumbtack className="h-2.5 w-2.5" /> Pinned First
                            </span>
                          ) : null}
                          {product.badge ? (
                            <span className="w-fit rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300">
                              {product.badge}
                            </span>
                          ) : !product.isPinned ? (
                            <span className="text-xs text-slate-400">—</span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={settingFirstId === product.id}
                            onClick={() => handleSetFirst(product.id, product.name)}
                            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                              product.isPinned
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300'
                                : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700 dark:bg-slate-700/60 dark:text-slate-300 dark:hover:bg-amber-950/40 dark:hover:text-amber-300'
                            }`}
                            title="Set this product on very first position in the catalog"
                          >
                            {settingFirstId === product.id ? (
                              <FaSpinner className="h-3 w-3 animate-spin" />
                            ) : (
                              <FaThumbtack className="h-3 w-3" />
                            )}
                            <span className="hidden xl:inline">Set First</span>
                          </button>

                          <Link
                            to={`/admin/products/${product.id}/edit`}
                            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                            title="Edit product"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id, product.name)}
                            className="rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                            title="Delete product"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}