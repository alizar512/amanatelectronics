import { verifyAccessToken } from '../services/authService.js'

export const requireAuth = (request, response, next) => {
  const authorizationHeader = request.headers.authorization || ''
  const [, token] = authorizationHeader.split(' ')

  if (!token) {
    response.status(401).json({ message: 'Authentication token required' })
    return
  }

  try {
    request.user = verifyAccessToken(token)
    next()
  } catch {
    response.status(401).json({ message: 'Invalid or expired session. Please log in again.' })
  }
}

export const optionalAuth = (request, _response, next) => {
  const authorizationHeader = request.headers.authorization || ''
  const [, token] = authorizationHeader.split(' ')

  if (token) {
    try {
      request.user = verifyAccessToken(token)
    } catch {
      // Ignored for optional auth
    }
  }

  next()
}

export const requireRole = (allowedRoles = []) => (request, response, next) => {
  if (!request.user) {
    response.status(401).json({ message: 'Authentication required' })
    return
  }

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]

  if (!roles.includes(request.user.role)) {
    response.status(403).json({ message: 'You do not have permission to perform this action' })
    return
  }

  next()
}
