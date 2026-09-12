import { Router } from 'express'
import {
  createAdminCoupon,
  deleteAdminCoupon,
  getAdminContactMessages,
  getAdminCoupons,
  getAdminCustomers,
  markAdminMessageRead,
} from '../controllers/adminCustomerController.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { ROLES, STAFF_ROLES } from '../constants/roles.js'

const router = Router()

router.use(requireAuth, requireRole(STAFF_ROLES))

router.get('/customers', getAdminCustomers)
router.get('/messages', getAdminContactMessages)
router.patch('/messages/:id/read', markAdminMessageRead)

router.get('/coupons', getAdminCoupons)
router.post('/coupons', requireRole([ROLES.ADMIN]), createAdminCoupon)
router.delete('/coupons/:id', requireRole([ROLES.ADMIN]), deleteAdminCoupon)

export const adminCustomerRoutes = router
