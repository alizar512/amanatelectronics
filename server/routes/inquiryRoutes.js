import { Router } from 'express'
import {
  submitContactMessage,
  subscribeNewsletterEndpoint,
} from '../controllers/inquiryController.js'

const router = Router()

router.post('/contact', submitContactMessage)
router.post('/newsletter', subscribeNewsletterEndpoint)

export const inquiryRoutes = router
