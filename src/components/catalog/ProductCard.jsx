import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaTag,
} from 'react-icons/fa'
import { useStore } from '../../context/StoreContext'
import { InstallmentModal } from '../commerce/InstallmentModal'

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist, openQuickView } = useStore()
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showInstallmentModal, setShowInstallmentModal] = useState(false)
  const isWishlisted = wishlist.some(item => item.id === product.id)

  const {
    name,
    price,
    oldPrice,
    image,
    badge,
    inStock = true,
    slug,
    category,
    brand,
  } = product

  const discountPercent = oldPrice && oldPrice > price
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="product-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div className="product-card-image" style={{ backgroundColor: 'var(--color-product-bg)' }}>
        <Link to={`/product/${slug}`} className="block overflow-hidden" style={{ height: '220px' }}>
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: 'var(--color-bg-alt)' }} />
          )}
          <img
            src={image}
            alt={name}
            className={`h-full w-full object-contain p-4 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-108`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
          />
        </Link>

        {/* Sale Badge */}
        {discountPercent > 0 && (
          <div className="sale-badge">
            Sale
          </div>
        )}

        {/* Custom Badge */}
        {badge && !discountPercent && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: badge.toLowerCase().includes('new') ? '#0070c9' : 'var(--color-sale)' }}
          >
            {badge}
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-sale)' }}>
              Sold Out
            </span>
          </div>
        )}

        {/* Quick Actions - Appear on Hover */}
        <div
          className={`absolute right-3 top-3 flex flex-col gap-2 transition-all duration-250 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
        >
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleWishlist(product)
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110"
            style={{ color: isWishlisted ? 'var(--color-sale)' : 'var(--color-alt-text)' }}
            aria-label={`Add ${name} to wishlist`}
          >
            <FaHeart className={`h-3.5 w-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              openQuickView(product)
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110"
            style={{ color: 'var(--color-alt-text)' }}
            aria-label={`Quick view ${name}`}
          >
            <FaEye className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Discount Percent Badge */}
        {discountPercent > 0 && (
          <div
            className="absolute bottom-2 left-2 px-2 py-1 text-[11px] font-bold text-white"
            style={{ backgroundColor: 'var(--color-sale)' }}
          >
            -{discountPercent}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category & Brand */}
        {(category || brand) && (
          <div className="mb-1 flex items-center gap-2">
            {brand && (
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-alt-text)' }}>
                {brand}
              </span>
            )}
          </div>
        )}

        {/* Product Name */}
        <Link to={`/product/${slug}`}>
          <h3
            className="line-clamp-2 text-sm font-semibold leading-snug transition-colors"
            style={{ color: 'var(--color-headings)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-dark)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-headings)' }}
          >
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          {discountPercent > 0 ? (
            <>
              <span className="price-sale">Rs.{price.toLocaleString()}</span>
              <span className="price-old">Rs.{oldPrice.toLocaleString()}</span>
            </>
          ) : (
            <span className="price-current">Rs.{price.toLocaleString()}</span>
          )}
        </div>

        {/* Installment Info */}
        {product.installmentAvailable !== false && price >= 5000 && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setShowInstallmentModal(true)
            }}
            className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold transition-colors"
            style={{ color: 'var(--color-brand-dark)' }}
          >
            <FaTag className="h-2.5 w-2.5 shrink-0" />
            <span>From Rs.{(product.installmentMonthly || Math.round(price / 12)).toLocaleString()}/mo</span>
          </button>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          disabled={!inStock}
          className={`mt-3 flex w-full items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
            inStock
              ? 'hover:opacity-90 active:scale-[0.98]'
              : 'cursor-not-allowed opacity-50'
          }`}
          style={{
            backgroundColor: inStock ? 'var(--color-btn)' : 'var(--color-bg-alt)',
            color: inStock ? '#ffffff' : 'var(--color-alt-text)',
            letterSpacing: '1px',
          }}
        >
          <FaShoppingCart className="h-3 w-3" />
          <span>{inStock ? 'Add to Cart' : 'Sold Out'}</span>
        </button>
      </div>

      <InstallmentModal
        isOpen={showInstallmentModal}
        onClose={() => setShowInstallmentModal(false)}
        product={product}
      />
    </motion.div>
  )
}