import { createContext, useContext, useEffect, useState } from 'react'
import {
  getCustomerProfile,
  loginCustomer,
  logoutCustomer,
  registerCustomer,
  updateCustomerProfile,
} from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('customerToken')
    if (token) {
      getCustomerProfile()
        .then((userData) => setUser(userData))
        .catch(() => {
          localStorage.removeItem('customerToken')
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const { user: loggedInUser } = await loginCustomer(email, password)
    setUser(loggedInUser)
    return loggedInUser
  }

  const register = async (userData) => {
    const { user: registeredUser } = await registerCustomer(userData)
    setUser(registeredUser)
    return registeredUser
  }

  const logout = () => {
    logoutCustomer()
    setUser(null)
  }

  const updateProfile = async (profileData) => {
    const updated = await updateCustomerProfile(profileData)
    setUser(updated)
    return updated
  }

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useCustomerAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useCustomerAuth must be used within an AuthProvider')
  }
  return context
}
