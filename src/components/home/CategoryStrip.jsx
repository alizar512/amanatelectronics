import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaSnowflake,
  FaTv,
  FaBlender,
  FaTint,
  FaTshirt,
  FaThermometerHalf,
  FaFan,
  FaBolt,
  FaTags,
} from 'react-icons/fa'
import { getCategories } from '../../services/catalogService'

const getCategoryIcon = (categoryName = '') => {
  const name = categoryName.toLowerCase()
  if (name.includes('air conditioner') || name.includes('ac') || name.includes('cooling')) return FaSnowflake
  if (name.includes('refrigerator') || name.includes('freezer') || name.includes('fridge')) return FaThermometerHalf
  if (name.includes('tv') || name.includes('led') || name.includes('screen')) return FaTv
  if (name.includes('kitchen') || name.includes('microwave') || name.includes('oven') || name.includes('fryer')) return FaBlender
  if (name.includes('water') || name.includes('dispenser')) return FaTint
  if (name.includes('washing') || name.includes('laundry') || name.includes('dryer')) return FaTshirt
  if (name.includes('fan') || name.includes('cooler')) return FaFan
  if (name.includes('iron') || name.includes('geyser') || name.includes('heater')) return FaBolt
  return FaTags
}

const getCategoryBgColor = (index) => {
  const colors = [
    { bg: '#e8f4fd', icon: '#0070c9' },
    { bg: '#fff3e0', icon: '#e65100' },
    { bg: '#e8f5e9', icon: '#2e7d32' },
    { bg: '#fce4ec', icon: '#c62828' },
    { bg: '#f3e5f5', icon: '#7b1fa2' },
    { bg: '#e0f2f1', icon: '#00695c' },
    { bg: '#fff8e1', icon: '#f57f17' },
    { bg: '#e8eaf6', icon: '#283593' },
    { bg: '#fbe9e7', icon: '#bf360c' },
    { bg: '#e1f5fe', icon: '#0277bd' },
  ]
  return colors[index % colors.length]
}

export const CategoryStrip = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isActive = true
    getCategories().then((data) => {
      if (isActive) {
        setCategories(Array.isArray(data) ? data : data.categories || [])
        setLoading(false)
      }
    })
    return () => { isActive = false }
  }, [])

  return (
    <section className="section-gap" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-shell">
        {/* Section Title */}
        <div className="mb-8 text-center">
          <h2 className="section-title">Shop by Category</h2>
          <p className="mt-4 text-sm" style={{ color: 'var(--color-alt-text)' }}>
            Browse our wide range of official PEL home appliances
          </p>
        </div>

        {/* Category Grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-sm" style={{ backgroundColor: 'var(--color-bg-alt)' }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((category, index) => {
              const Icon = getCategoryIcon(category.name)
              const colors = getCategoryBgColor(index)
              return (
                <Link
                  key={category.id || category.name}
                  to={`/shop?category=${encodeURIComponent(category.name.toLowerCase())}`}
                  className="group flex flex-col items-center justify-center p-5 text-center transition-all duration-300"
                  style={{
                    backgroundColor: colors.bg,
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div
                    className="mb-3 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${colors.icon}15`, color: colors.icon }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider leading-tight" style={{ color: 'var(--color-headings)' }}>
                    {category.name}
                  </h3>
                  {category.count !== undefined && (
                    <span className="mt-1 text-[10px]" style={{ color: 'var(--color-alt-text)' }}>
                      {category.count} Products
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
