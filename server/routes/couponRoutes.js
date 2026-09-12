import { Router } from 'express'
import { validateCouponEndpoint } from '../controllers/couponController.js'

const router = Router()

router.post('/validate', validateCouponEndpoint)

export const couponRoutes = router
