import { Router } from 'express'
import { getPublicPaymentSettings } from '../controllers/paymentController.js'

const router = Router()

router.get('/payment-settings', getPublicPaymentSettings)

export const paymentRoutes = router
