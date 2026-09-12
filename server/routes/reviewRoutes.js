import { Router } from 'express'
import { getProductReviews, submitProductReview } from '../controllers/reviewController.js'
import { optionalAuth } from '../middleware/auth.js'

const router = Router()

router.get('/:productId', getProductReviews)
router.post('/:productId', optionalAuth, submitProductReview)

export const reviewRoutes = router
