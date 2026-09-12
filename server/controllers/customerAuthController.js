import {
  createUser,
  verifyCustomerPassword,
  updateUserProfile,
  changeUserPassword,
  findUserById,
  sanitizeUser,
} from '../store/userStore.js'
import { signAccessToken } from '../services/authService.js'

export const registerCustomer = async (request, response) => {
  const { name, email, password, phone } = request.body || {}

  if (!name || !email || !password) {
    response.status(400).json({
      message: 'Name, email, and password are required',
    })
    return
  }

  if (password.length < 6) {
    response.status(400).json({
      message: 'Password must be at least 6 characters long',
    })
    return
  }

  try {
    const user = await createUser({ name, email, password, phone })
    const token = signAccessToken(user)

    response.status(201).json({
      message: 'Account created successfully',
      token,
      user,
    })
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
}

export const loginCustomer = async (request, response) => {
  const { email, password } = request.body || {}

  if (!email || !password) {
    response.status(400).json({ message: 'Email and password are required' })
    return
  }

  const user = await verifyCustomerPassword(email, password)

  if (!user) {
    response.status(401).json({ message: 'Invalid email or password' })
    return
  }

  const sanitized = sanitizeUser(user)
  const token = signAccessToken(sanitized)

  response.json({
    message: 'Welcome back!',
    token,
    user: sanitized,
  })
}

export const getCurrentCustomer = (request, response) => {
  const user = findUserById(request.user.id)

  if (!user) {
    response.status(404).json({ message: 'User not found' })
    return
  }

  response.json({
    user: sanitizeUser(user),
  })
}

export const updateCustomerProfile = (request, response) => {
  const { name, phone, avatar } = request.body || {}
  const updated = updateUserProfile(request.user.id, { name, phone, avatar })

  if (!updated) {
    response.status(404).json({ message: 'User not found' })
    return
  }

  response.json({
    message: 'Profile updated successfully',
    user: updated,
  })
}

export const changeCustomerPassword = async (request, response) => {
  const { currentPassword, newPassword } = request.body || {}

  if (!currentPassword || !newPassword) {
    response.status(400).json({ message: 'Current password and new password are required' })
    return
  }

  if (newPassword.length < 6) {
    response.status(400).json({ message: 'New password must be at least 6 characters' })
    return
  }

  try {
    await changeUserPassword(request.user.id, currentPassword, newPassword)
    response.json({ message: 'Password changed successfully' })
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
}

export const forgotCustomerPassword = (request, response) => {
  const { email } = request.body || {}

  if (!email) {
    response.status(400).json({ message: 'Email address is required' })
    return
  }

  // In production, an email with a reset link would be dispatched.
  response.json({
    message: `If an account exists for ${email}, a password reset link has been dispatched.`,
  })
}
