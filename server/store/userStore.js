import bcrypt from 'bcryptjs'
import { getStoreState, saveStoreState } from './storageEngine.js'

export const sanitizeUser = (user) => {
  if (!user) return null
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    avatar: user.avatar || '',
    role: user.role || 'customer',
    createdAt: user.createdAt,
  }
}

export const findUserByEmail = (email) => {
  const state = getStoreState()
  const normalizedEmail = String(email || '').trim().toLowerCase()
  return state.users.find((u) => u.email.toLowerCase() === normalizedEmail) || null
}

export const findUserById = (id) => {
  const state = getStoreState()
  return state.users.find((u) => String(u.id) === String(id)) || null
}

export const findAdminUserByEmail = (email) => {
  const state = getStoreState()
  const normalizedEmail = String(email || '').trim().toLowerCase()
  return state.adminUsers.find((u) => u.email.toLowerCase() === normalizedEmail) || null
}

export const createUser = async ({ name, email, password, phone = '' }) => {
  const state = getStoreState()
  const normalizedEmail = String(email || '').trim().toLowerCase()

  if (findUserByEmail(normalizedEmail)) {
    throw new Error('An account with this email already exists')
  }

  const nextId = Math.max(...state.users.map((u) => Number(u.id) || 0), 0) + 1
  const passwordHash = await bcrypt.hash(String(password), 10)

  const newUser = {
    id: nextId,
    name: String(name || '').trim(),
    email: normalizedEmail,
    passwordHash,
    phone: String(phone || '').trim(),
    avatar: '',
    role: 'customer',
    createdAt: new Date().toISOString(),
  }

  state.users.push(newUser)
  saveStoreState(state)
  return sanitizeUser(newUser)
}

export const verifyCustomerPassword = async (email, password) => {
  const user = findUserByEmail(email)
  if (!user) return null

  const isValid = await bcrypt.compare(String(password), user.passwordHash)
  if (!isValid) return null

  return user
}

export const updateUserProfile = (userId, updates) => {
  const state = getStoreState()
  const user = state.users.find((u) => String(u.id) === String(userId))
  if (!user) return null

  if (updates.name) user.name = updates.name.trim()
  if (updates.phone) user.phone = updates.phone.trim()
  if (updates.avatar) user.avatar = updates.avatar
  user.updatedAt = new Date().toISOString()

  saveStoreState(state)
  return sanitizeUser(user)
}

export const changeUserPassword = async (userId, oldPassword, newPassword) => {
  const state = getStoreState()
  const user = state.users.find((u) => String(u.id) === String(userId))
  if (!user) throw new Error('User not found')

  const isValid = await bcrypt.compare(String(oldPassword), user.passwordHash)
  if (!isValid) throw new Error('Current password is incorrect')

  user.passwordHash = await bcrypt.hash(String(newPassword), 10)
  user.updatedAt = new Date().toISOString()

  saveStoreState(state)
  return true
}

export const getAllCustomers = () => {
  const state = getStoreState()
  return state.users.map(sanitizeUser)
}

// User Addresses CRUD
export const getUserAddresses = (userId) => {
  const state = getStoreState()
  return state.addresses.filter((a) => String(a.userId) === String(userId))
}

export const addUserAddress = (userId, addressData) => {
  const state = getStoreState()
  const nextId = Math.max(...state.addresses.map((a) => Number(a.id) || 0), 0) + 1

  if (addressData.isDefault) {
    state.addresses.forEach((a) => {
      if (String(a.userId) === String(userId)) a.isDefault = false
    })
  }

  const newAddress = {
    id: nextId,
    userId: Number(userId),
    title: addressData.title || 'Home',
    fullName: addressData.fullName,
    phone: addressData.phone,
    city: addressData.city,
    addressLine: addressData.addressLine,
    isDefault: Boolean(addressData.isDefault || state.addresses.length === 0),
    createdAt: new Date().toISOString(),
  }

  state.addresses.push(newAddress)
  saveStoreState(state)
  return newAddress
}

export const updateUserAddress = (userId, addressId, addressData) => {
  const state = getStoreState()
  const address = state.addresses.find(
    (a) => String(a.id) === String(addressId) && String(a.userId) === String(userId)
  )
  if (!address) return null

  if (addressData.isDefault) {
    state.addresses.forEach((a) => {
      if (String(a.userId) === String(userId)) a.isDefault = false
    })
  }

  Object.assign(address, addressData, {
    updatedAt: new Date().toISOString(),
  })

  saveStoreState(state)
  return address
}

export const deleteUserAddress = (userId, addressId) => {
  const state = getStoreState()
  const initialLength = state.addresses.length
  state.addresses = state.addresses.filter(
    (a) => !(String(a.id) === String(addressId) && String(a.userId) === String(userId))
  )
  const deleted = state.addresses.length < initialLength
  if (deleted) saveStoreState(state)
  return deleted
}
