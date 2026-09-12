// src/pages/ProductDetails.jsx
import { useParams } from 'react-router-dom'
import { products } from '../assets/data/catalog'

export default function ProductDetails() {
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="container-shell py-12 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    )
  }

  return (
    <div className="section-gap">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-2xl object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-bold text-blue-600">
              Rs {product.price.toLocaleString()}
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              {product.description || 'Premium quality product'}
            </p>
            <button className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3 text-white transition-all hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}