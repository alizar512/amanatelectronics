import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '../common/Modal'
import { Button } from '../common/Button'
import { formatCurrency } from '../../utils/format'
import { useStore } from '../../context/StoreContext'
import { 
  FaStar, 
  FaShoppingCart, 
  FaHeart, 
  FaShieldAlt, 
  FaTruck, 
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa'

export const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const { addToCart, addToWishlist, wishlist } = useStore()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('')

  // Reset state when a new product is selected
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0)
      setQuantity(1)
      setSelectedColor(product.colors?.[0] || '')
    }
  }, [product])

  if (!product) return null

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image || '/images/products/placeholder.png']

  const activeImage = images[selectedImageIndex] || images[0]
  const isWishlisted = wishlist.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity)
    } else {
      addToCart(product, quantity)
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Quick View">
      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {/* Gallery Preview Column */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">
            <img
              src={activeImage}
              alt={product.name}
              className="h-full w-full object-contain transition-all duration-300 hover:scale-105"
            />
            {product.badge && (
              <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                {product.badge}
              </span>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-square h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 p-1 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-blue-600 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <img src={img} alt={`Preview ${idx + 1}`} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {product.brand || 'PEL'} • {product.category}
              </span>
              <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                {product.name}
              </h2>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                <FaStar className="h-4 w-4" />
                <span className="ml-1 text-sm font-bold text-slate-900 dark:text-white">
                  {product.rating || 4.9}
                </span>
              </div>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {product.reviews || 45} customer reviews
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <FaCheckCircle className="h-3 w-3" />
                {product.stock > 0 ? 'In Stock (Ready to Ship)' : 'Out of Stock'}
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-slate-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {product.description}
            </p>

            {/* Specs Highlights */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="rounded-xl bg-slate-50 p-3.5 text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                <p className="mb-2 font-semibold text-slate-900 dark:text-white">Key Specifications:</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {Object.entries(product.specs).slice(0, 4).map(([k, v]) => (
                    <div key={k}>
                      <span className="font-medium text-slate-500 dark:text-slate-400">{k}: </span>
                      <span className="text-slate-800 dark:text-slate-200">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Color / Variant Selector */}
            {product.colors && product.colors.length > 1 && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Select Color / Variant:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`rounded-lg border px-3 py-1 text-xs font-medium transition-all ${
                        selectedColor === c
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-300'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <FaShieldAlt className="text-blue-600 dark:text-blue-400" />
                <span>{product.warranty || 'Official Brand Warranty'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaTruck className="text-emerald-600 dark:text-emerald-400" />
                <span>{product.shipping ? 'Fast Delivery' : 'Nationwide Shipping'}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-semibold text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <FaShoppingCart className="h-4 w-4" />
                <span>Add to Cart ({formatCurrency(product.price * quantity)})</span>
              </Button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => addToWishlist(product)}
                className="rounded-xl border border-slate-200 p-3 text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <FaHeart className={isWishlisted ? 'text-red-500' : ''} />
              </button>
            </div>

            {/* View Full Product Page */}
            <Link
              to={`/product/${product.slug || product.id}`}
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <span>View Full Product Details & Warranty Info</span>
              <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  )
}
