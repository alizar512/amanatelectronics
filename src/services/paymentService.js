import { apiClient } from './apiClient'

export const fetchPublicPaymentSettings = async () => {
  const response = await apiClient.get('/api/payment-settings')
  return response.data.settings
}

export const fetchAdminPaymentSettings = async () => {
  const response = await apiClient.get('/api/admin/payment-settings')
  return response.data.settings
}

export const updateAdminPaymentSettings = async (settingsPayload) => {
  const response = await apiClient.put('/api/admin/payment-settings', settingsPayload)
  return response.data
}
