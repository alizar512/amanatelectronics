// src/hooks/useAuth.js
import { useState, useEffect } from 'react'
import apiClient from '../services/apiClient'  // ✅ This should work now

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      apiClient.defaults.headers.Authorization = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await apiClient.get('/admin/auth/me')
      setUser(response.data)
    } catch (error) {
      localStorage.removeItem('adminToken')
      delete apiClient.defaults.headers.Authorization
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/admin/auth/login', { email, password })
      const { token, user } = response.data
      localStorage.setItem('adminToken', token)
      apiClient.defaults.headers.Authorization = `Bearer ${token}`
      setUser(user)
      return user
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    delete apiClient.defaults.headers.Authorization
    setUser(null)
  }

  return { user, loading, login, logout }
}