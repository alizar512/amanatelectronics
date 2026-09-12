import { apiClient } from './apiClient'

export const loginCustomer = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password })
  const { token, user } = response.data
  if (token) {
    localStorage.setItem('customerToken', token)
  }
  return { token, user }
}

export const registerCustomer = async ({ name, email, password, phone }) => {
  const response = await apiClient.post('/auth/register', { name, email, password, phone })
  const { token, user } = response.data
  if (token) {
    localStorage.setItem('customerToken', token)
  }
  return { token, user }
}

export const getCustomerProfile = async () => {
  const response = await apiClient.get('/auth/me')
  return response.data.user
}

export const updateCustomerProfile = async (profileData) => {
  const response = await apiClient.put('/auth/profile', profileData)
  return response.data.user
}

export const changeCustomerPassword = async (currentPassword, newPassword) => {
  const response = await apiClient.put('/auth/change-password', {
    currentPassword,
    newPassword,
  })
  return response.data
}

export const forgotCustomerPassword = async (email) => {
  const response = await apiClient.post('/auth/forgot-password', { email })
  return response.data
}

export const logoutCustomer = () => {
  localStorage.removeItem('customerToken')
}
