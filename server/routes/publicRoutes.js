import { Router } from 'express'
import {
  getBrands,
  getCategories,
  getHealth,
  getHome,
  getProductByIdEndpoint,
  getProductDetails,
  getProducts,
  getTeam,
  searchProducts,
} from '../controllers/publicController.js'

const router = Router()

router.get('/health', getHealth)
router.get('/home', getHome)
router.get('/products', getProducts)
router.get('/products/id/:id', getProductByIdEndpoint)
router.get('/products/:slug', getProductDetails)
router.get('/categories', getCategories)
router.get('/brands', getBrands)
router.get('/team', getTeam)
router.get('/search', searchProducts)

export const publicRoutes = router
