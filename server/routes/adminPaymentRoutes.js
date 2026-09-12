import { Router } from 'express'
import {
  getAdminPaymentSettings,
  updateAdminPaymentSettings,
} from '../controllers/paymentController.js'
import { STAFF_ROLES } from '../constants/roles.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth, requireRole(STAFF_ROLES))

router.get('/', getAdminPaymentSettings)
router.put('/', updateAdminPaymentSettings)

export const adminPaymentRoutes = router
