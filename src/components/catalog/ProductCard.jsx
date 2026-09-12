// src/components/catalog/ProductCard.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaHeart, 
  FaShoppingCart, 
  FaEye, 
  FaTruck, 
  FaTag, 
  FaClock,
  FaCalculator
} from 'react-icons/fa'
import { useStore } from '../../context/StoreContext'
import { InstallmentModal } from '../commerce/InstallmentModal'

export const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, wishlist, openQuickView } = useStore()
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showInstallmentModal, setShowInstallmentModal] = useState(false)
  const isWishlisted = wishlist.some(item => item.id === product.id)

  const {
    id,
    name,
    price,
    oldPrice,
    image,
    badge,
    badgeType = 'sale',
    delivery,
    inStock = true,
    installment,
    slug,
    category,
    brand,
    description
  } = product

  const getBadgeStyles = () => {
    switch(badgeType) {
      case 'hot':
        return 'bg-gradient-to-r from-red-500 to-orange-500'
      case 'new':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500'
      case 'free':
        return 'bg-gradient-to-r from-green-500 to-emerald-500'
      default:
        return 'bg-gradient-to-r from-purple-500 to-pink-500'
    }
  }

  const getDeliveryIcon = () => {
    if (delivery?.includes('Same day')) {
      return <FaTruck className="text-green-500" />
    }
    return <FaClock className="text-orange-500" />
  }

  const getCategoryColor = () => {
    const colors = {
      'Air Conditioners': 'from-sky-500 to-cyan-400',
      'Refrigerators & Freezers': 'from-blue-500 to-indigo-400',
      'Water Dispensers': 'from-teal-500 to-emerald-400',
      'Microwave Ovens': 'from-amber-500 to-orange-400',
      'Smart LED TVs': 'from-purple-500 to-fuchsia-400',
      'Washing Machines': 'from-cyan-500 to-blue-400',
    }
    return colors[category] || 'from-gray-500 to-gray-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-slate-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Compact Appliance Preview */}
      <div className="relative overflow-hidden rounded-t-xl bg-slate-50 p-3 sm:p-4 dark:bg-slate-800/60">
        <Link to={`/product/${slug}`} className="block h-36 w-full sm:h-40">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-700" />
          )}
          <img
            src={image}
            alt={name}
            className={`h-full w-full object-contain transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-105`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg'
            }}
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
          {badge && (
            <span className={`${getBadgeStyles()} rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm leading-tight`}>
              {badge}
            </span>
          )}
          {!inStock && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm leading-tight">
              Out of Stock
            </span>
          )}
        </div>

        {/* Category Badge */}
        {category && (
          <div className="absolute left-2.5 bottom-2.5">
            <span className={`rounded-full bg-gradient-to-r ${getCategoryColor()} px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm backdrop-blur-sm leading-tight`}>
              {category}
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className={`absolute right-2.5 top-2.5 flex flex-col gap-1.5 transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
        }`}>
          <button
            onClick={() => addToWishlist(product)}
            className="rounded-full bg-white/95 p-1.5 shadow-md transition-all hover:scale-110 hover:bg-white dark:bg-slate-900/90"
            aria-label={`Add ${name} to wishlist`}
          >
            <FaHeart className={`h-3 w-3 ${isWishlisted ? 'text-red-500' : 'text-slate-600 dark:text-slate-400'}`} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              openQuickView(product)
            }}
            className="rounded-full bg-white/95 p-1.5 shadow-md transition-all hover:scale-110 hover:bg-white dark:bg-slate-900/90"
            aria-label={`Quick view ${name}`}
          >
            <FaEye className="h-3 w-3 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Discount Badge */}
        {oldPrice && oldPrice > price && (
          <div className="absolute right-2.5 bottom-2.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm leading-tight">
            -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-3.5">
        {/* Brand & Product Name */}
        <div className="mb-0.5">
          {brand && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 leading-none">
              {brand}
            </span>
          )}
          <Link to={`/product/${slug}`}>
            <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-slate-800 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400 sm:text-[13px]">
              {name}
            </h3>
          </Link>
        </div>

        {/* Description */}
        {description && (
          <p className="mt-0.5 line-clamp-1 text-[11px] leading-tight text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}

        {/* Delivery Info */}
        {delivery && (
          <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 leading-none">
            {getDeliveryIcon()}
            <span>{delivery}</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-slate-900 dark:text-white sm:text-base leading-tight">
            Rs {price.toLocaleString()}
          </span>
          {oldPrice && oldPrice > price && (
            <span className="text-[11px] text-slate-400 line-through leading-tight">
              Rs {oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Installment Badge & Trigger */}
        {product.installmentAvailable !== false && (product.installmentMonthly || product.installment || price >= 5000) && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setShowInstallmentModal(true)
            }}
            className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
          >
            <FaTag className="h-2.5 w-2.5 shrink-0" />
            <span>
              From Rs {(product.installmentMonthly || Math.round(price / 12)).toLocaleString()}/mo
            </span>
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
              Installment
            </span>
          </button>
        )}

        {/* Stock Status */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 leading-none">
            {inStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-2.5 flex gap-1.5">
          <button
            onClick={() => addToCart(product)}
            disabled={!inStock}
            className={`flex-1 items-center justify-center rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
              inStock
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm hover:shadow-md hover:from-blue-700 hover:to-blue-800 active:scale-95'
                : 'cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-700'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <FaShoppingCart className="h-3 w-3" />
              <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              openQuickView(product)
            }}
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Quick view
          </button>
        </div>
      </div>

      <InstallmentModal
        isOpen={showInstallmentModal}
        onClose={() => setShowInstallmentModal(false)}
        product={product}
      />
    </motion.div>
  )
}