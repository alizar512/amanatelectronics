import { Router } from 'express'
import {
  changeCustomerPassword,
  forgotCustomerPassword,
  getCurrentCustomer,
  loginCustomer,
  registerCustomer,
  updateCustomerProfile,
} from '../controllers/customerAuthController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/register', registerCustomer)
router.post('/login', loginCustomer)
router.post('/forgot-password', forgotCustomerPassword)

router.get('/me', requireAuth, getCurrentCustomer)
router.put('/profile', requireAuth, updateCustomerProfile)
router.put('/change-password', requireAuth, changeCustomerPassword)

export const customerAuthRoutes = router
