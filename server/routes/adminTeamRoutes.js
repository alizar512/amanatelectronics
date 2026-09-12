import { Router } from 'express'
import {
  getAdminTeamMembers,
  getAdminTeamMember,
  createAdminTeamMember,
  updateAdminTeamMember,
  deleteAdminTeamMember,
} from '../controllers/adminTeamController.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { STAFF_ROLES, ROLES } from '../constants/roles.js'

const router = Router()

router.use(requireAuth)

router.get('/', requireRole(STAFF_ROLES), getAdminTeamMembers)
router.get('/:id', requireRole(STAFF_ROLES), getAdminTeamMember)
router.post('/', requireRole(STAFF_ROLES), createAdminTeamMember)
router.put('/:id', requireRole(STAFF_ROLES), updateAdminTeamMember)
router.delete('/:id', requireRole([ROLES.ADMIN]), deleteAdminTeamMember)

export const adminTeamRoutes = router
