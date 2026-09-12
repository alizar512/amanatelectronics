// src/pages/Shop.jsx
import { useState } from 'react'
import { ProductGrid } from '../components/catalog/ProductGrid'
import { products } from '../assets/data/catalog'

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="section-gap">
      <div className="container-shell">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Shop All Products
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Discover our curated collection of premium electronics
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}