import { Router } from 'express'
import {
  cancelCustomerOrder,
  getMyOrders,
  getOrderDetails,
  placeOrder,
} from '../controllers/orderController.js'
import { optionalAuth, requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', optionalAuth, placeOrder)
router.get('/my-orders', requireAuth, getMyOrders)
router.get('/:orderNumber', optionalAuth, getOrderDetails)
router.post('/:orderNumber/cancel', optionalAuth, cancelCustomerOrder)

export const orderRoutes = router
