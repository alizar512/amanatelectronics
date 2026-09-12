// src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaBox, 
  FaUsers, 
  FaShoppingCart, 
  FaDollarSign,
  FaPlus,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { apiClient } from '../../services/apiClient'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await apiClient.get('/admin/dashboard')
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
            <div className="h-20 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>
    )
  }

  const statItems = [
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: <FaBox className="text-blue-500" />,
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: <FaShoppingCart className="text-purple-500" />,
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Total Revenue',
      value: `Rs ${stats?.totalRevenue?.toLocaleString() || '0'}`,
      icon: <FaDollarSign className="text-green-500" />,
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers || 0,
      icon: <FaUsers className="text-orange-500" />,
      change: '-2%',
      trend: 'down'
    }
  ]

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back, {user?.name || 'Admin'}!
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Here's what's happening with your store today
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg"
        >
          <FaPlus className="mr-2 inline" />
          Add Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-slate-800"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-700">
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <FaArrowUp className="inline" /> : <FaArrowDown className="inline" />}
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-700">
            <div>
              <p className="font-medium text-slate-800 dark:text-white">
                New order #1234
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Rs 214,999 • 2 items
              </p>
            </div>
            <span className="text-sm text-slate-400">2 min ago</span>
          </div>
          {/* Add more activities */}
        </div>
      </div>
    </div>
  )
}