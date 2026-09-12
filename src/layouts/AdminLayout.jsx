// src/layouts/AdminLayout.jsx
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  FaBox, 
  FaChartBar, 
  FaSignOutAlt, 
  FaUser, 
  FaShoppingCart,
  FaTags,
  FaHome,
  FaUsers,
  FaUniversity
} from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const navItems = [
    { path: '/admin/dashboard', icon: <FaChartBar />, label: 'Dashboard' },
    { path: '/admin/orders', icon: <FaShoppingCart />, label: 'Orders' },
    { path: '/admin/products', icon: <FaBox />, label: 'Products' },
    { path: '/admin/categories', icon: <FaTags />, label: 'Categories' },
    { path: '/admin/team', icon: <FaUsers />, label: 'Team' },
    { path: '/admin/payment-settings', icon: <FaUniversity />, label: 'Payment Settings' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-full w-64 bg-white shadow-lg dark:bg-slate-800">
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-700">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white p-0.5 shadow-sm transition-transform duration-200 group-hover:scale-105 dark:border-slate-700 dark:bg-slate-900">
              <img
                src="/amanatelectronicslogo.png"
                alt="Amanat Electronics Logo"
                className="h-full w-full object-contain rounded-full"
              />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Admin Panel
              </h1>
              <p className="text-[10px] text-slate-400 leading-tight">Amanat Electronics</p>
            </div>
          </Link>
          <Link
            to="/"
            title="View Live Store"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-blue-400"
          >
            <FaHome />
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-4 dark:border-slate-700">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
              <FaUser className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                {user?.name || 'Admin'}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-red-600 dark:hover:bg-slate-700"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}