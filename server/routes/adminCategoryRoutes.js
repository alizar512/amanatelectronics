import { Router } from 'express'
import {
  createAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
  getAdminCategory,
  toggleAdminCategoryStatus,
  updateAdminCategory,
} from '../controllers/adminCategoryController.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { ROLES, STAFF_ROLES } from '../constants/roles.js'

const router = Router()

router.use(requireAuth)

router.get('/', requireRole(STAFF_ROLES), getAdminCategories)
router.get('/:id', requireRole(STAFF_ROLES), getAdminCategory)
router.post('/', requireRole(STAFF_ROLES), createAdminCategory)
router.put('/:id', requireRole(STAFF_ROLES), updateAdminCategory)
router.patch('/:id/toggle-status', requireRole(STAFF_ROLES), toggleAdminCategoryStatus)
router.delete('/:id', requireRole([ROLES.ADMIN]), deleteAdminCategory)

export const adminCategoryRoutes = router
