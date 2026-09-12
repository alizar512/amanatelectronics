import { Router } from 'express'
import {
  getAdminOrder,
  getAdminOrders,
  updateAdminOrderStatus,
} from '../controllers/adminOrderController.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { STAFF_ROLES } from '../constants/roles.js'

const router = Router()

router.use(requireAuth, requireRole(STAFF_ROLES))

router.get('/', getAdminOrders)
router.get('/:id', getAdminOrder)
router.patch('/:id/status', updateAdminOrderStatus)

export const adminOrderRoutes = router
