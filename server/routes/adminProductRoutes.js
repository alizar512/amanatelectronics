import { Router } from 'express'
import {
  createAdminProduct,
  deleteAdminProduct,
  getAdminProduct,
  getAdminProducts,
  setAdminProductFirst,
  updateAdminProduct,
  updateAdminStock,
} from '../controllers/adminProductController.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { ROLES, STAFF_ROLES } from '../constants/roles.js'

const router = Router()

router.use(requireAuth)

router.get('/', requireRole(STAFF_ROLES), getAdminProducts)
router.get('/:id', requireRole(STAFF_ROLES), getAdminProduct)
router.post('/', requireRole(STAFF_ROLES), createAdminProduct)
router.put('/:id', requireRole(STAFF_ROLES), updateAdminProduct)
router.patch('/:id/set-first', requireRole(STAFF_ROLES), setAdminProductFirst)
router.patch('/:id/stock', requireRole(STAFF_ROLES), updateAdminStock)
router.delete('/:id', requireRole([ROLES.ADMIN]), deleteAdminProduct)

export const adminProductRoutes = router
