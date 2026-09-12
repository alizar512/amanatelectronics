import { authenticateAdminUser, signToken } from '../services/authService.js'

export const loginAdmin = async (request, response) => {
  const { email, password } = request.body || {}

  if (!email || !password) {
    response.status(400).json({ message: 'Email and password are required' })
    return
  }

  const user = await authenticateAdminUser({ email, password })

  if (!user) {
    response.status(401).json({ message: 'Invalid admin credentials' })
    return
  }

  const token = signToken(user)

  response.json({
    message: 'Admin login successful',
    token,
    user,
  })
}

export const getCurrentAdmin = (request, response) => {
  response.json({
    user: request.user,
  })
}
