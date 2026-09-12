import { apiClient } from './apiClient'

export const getUserAddresses = async () => {
  const response = await apiClient.get('/user/addresses')
  return response.data.addresses
}

export const addUserAddress = async (addressData) => {
  const response = await apiClient.post('/user/addresses', addressData)
  return response.data.address
}

export const updateUserAddress = async (id, addressData) => {
  const response = await apiClient.put(`/user/addresses/${id}`, addressData)
  return response.data.address
}

export const deleteUserAddress = async (id) => {
  const response = await apiClient.delete(`/user/addresses/${id}`)
  return response.data
}
