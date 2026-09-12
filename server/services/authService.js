import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { getStoreState } from '../store/storageEngine.js'
import { sanitizeUser, findUserByEmail } from '../store/userStore.js'

export const signToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  })
}

export const verifyToken = (token) => {
  return jwt.verify(token, env.jwtSecret)
}

// Admin Authentication
export const authenticateAdminUser = async ({ email, password }) => {
  const state = getStoreState()
  const normalizedEmail = String(email || '').trim().toLowerCase()
  const admin = state.adminUsers.find((u) => u.email.toLowerCase() === normalizedEmail)

  if (!admin) return null

  const isValid = await bcrypt.compare(String(password || ''), admin.passwordHash)
  if (!isValid) return null

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  }
}

// Customer Authentication
export const authenticateCustomer = async ({ email, password }) => {
  const user = findUserByEmail(email)
  if (!user) return null

  const isValid = await bcrypt.compare(String(password || ''), user.passwordHash)
  if (!isValid) return null

  return sanitizeUser(user)
}

export const signAccessToken = (user) => {
  return signToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'customer',
  })
}

export const verifyAccessToken = (token) => {
  return verifyToken(token)
}
