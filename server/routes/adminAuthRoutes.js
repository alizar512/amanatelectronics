import { Router } from 'express'
import { getCurrentAdmin, loginAdmin } from '../controllers/adminAuthController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/login', loginAdmin)
router.get('/me', requireAuth, getCurrentAdmin)

export const adminAuthRoutes = router
