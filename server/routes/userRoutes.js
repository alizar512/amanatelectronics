import { Router } from 'express'
import {
  addUserAddressEndpoint,
  deleteUserAddressEndpoint,
  getUserAddressesEndpoint,
  updateUserAddressEndpoint,
} from '../controllers/userController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

router.get('/addresses', getUserAddressesEndpoint)
router.post('/addresses', addUserAddressEndpoint)
router.put('/addresses/:id', updateUserAddressEndpoint)
router.delete('/addresses/:id', deleteUserAddressEndpoint)

export const userRoutes = router
