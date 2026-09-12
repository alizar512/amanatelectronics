import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaLaptop, 
  FaMobileAlt, 
  FaTv,
  FaFan,
  FaUtensils,
  FaShieldAlt,
  FaCamera,
  FaGamepad,
  FaTags
} from 'react-icons/fa'
import { getCategories } from '../../services/catalogService'

const getCategoryIcon = (categoryName = '') => {
  const name = categoryName.toLowerCase()
  if (name.includes('phone') || name.includes('tablet') || name.includes('mobile')) return <FaMobileAlt />
  if (name.includes('laptop') || name.includes('computer') || name.includes('pc')) return <FaLaptop />
  if (name.includes('tv') || name.includes('audio') || name.includes('screen') || name.includes('sound')) return <FaTv />
  if (name.includes('air conditioner') || name.includes('cooling') || name.includes('ac')) return <FaFan />
  if (name.includes('kitchen') || name.includes('fryer') || name.includes('espresso')) return <FaUtensils />
  if (name.includes('smart home') || name.includes('security') || name.includes('camera kit') || name.includes('vacuum')) return <FaShieldAlt />
  if (name.includes('camera') || name.includes('photo') || name.includes('drone')) return <FaCamera />
  if (name.includes('gaming') || name.includes('console') || name.includes('game')) return <FaGamepad />
  return <FaTags />
}

export const HeroSection = () => {
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
    return () => {
      isActive = false
    }
  }, [])

  return (
    <section className="pt-2 pb-1 sm:pt-3 sm:pb-2">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 p-3.5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/72 dark:shadow-[0_18px_50px_rgba(2,6,23,0.35)] sm:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.10),transparent_24%)]" />
          
          {/* Categories Grid */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 via-white to-slate-200 p-3.5 sm:p-4 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.14),transparent_24%)]" />
              
              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400 sm:text-sm">
                      Official PEL Departments
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Explore official PEL home appliances curated by category
                    </p>
                  </div>
                  <Link 
                    to="/shop" 
                    className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 sm:text-sm"
                  >
                    View All Products →
                  </Link>
                </div>
                
                {loading ? (
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
                    {categories.map((category) => (
                      <Link 
                        key={category.id || category.name}
                        to={`/shop?category=${encodeURIComponent(category.name.toLowerCase())}`}
                        className="group relative flex flex-col items-center justify-center rounded-xl bg-white p-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-800/80"
                      >
                        <div className={`mb-1.5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent || 'from-blue-500/20 to-indigo-500/10'} text-lg text-blue-600 shadow-sm transition-transform group-hover:scale-110 dark:text-blue-400`}>
                          {getCategoryIcon(category.name)}
                        </div>
                        <span className="font-semibold text-slate-800 transition-colors group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400 text-xs line-clamp-1">
                          {category.name}
                        </span>
                        <span className="mt-0.5 text-[10px] text-slate-400 leading-none">
                          {category.count !== undefined ? `${category.count} models` : 'Explore'}
                        </span>
                        <div className="absolute inset-0 rounded-xl border border-transparent transition-colors group-hover:border-blue-500/40 dark:group-hover:border-blue-400/40" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}