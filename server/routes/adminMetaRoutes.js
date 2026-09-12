import { Router } from 'express'
import { getAdminCatalogMeta, getAdminDashboard } from '../controllers/adminMetaController.js'
import { STAFF_ROLES } from '../constants/roles.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth, requireRole(STAFF_ROLES))

router.get('/dashboard', getAdminDashboard)
router.get('/meta', getAdminCatalogMeta)

export const adminMetaRoutes = router
