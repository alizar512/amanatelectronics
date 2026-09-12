import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787/api'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor to attach customer or admin token
apiClient.interceptors.request.use(
  (config) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin')
    const adminToken = localStorage.getItem('adminToken')
    const customerToken = localStorage.getItem('customerToken')

    const token = isAdminRoute ? adminToken : customerToken || adminToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle unauthenticated 401s
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAdminRoute = window.location.pathname.startsWith('/admin')
      if (isAdminRoute && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('adminToken')
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient