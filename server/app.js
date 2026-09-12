import cors from 'cors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { env } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Routes
import { publicRoutes } from './routes/publicRoutes.js'
import { customerAuthRoutes } from './routes/customerAuthRoutes.js'
import { orderRoutes } from './routes/orderRoutes.js'
import { couponRoutes } from './routes/couponRoutes.js'
import { reviewRoutes } from './routes/reviewRoutes.js'
import { userRoutes } from './routes/userRoutes.js'
import { inquiryRoutes } from './routes/inquiryRoutes.js'
import { adminAuthRoutes } from './routes/adminAuthRoutes.js'
import { adminMetaRoutes } from './routes/adminMetaRoutes.js'
import { adminProductRoutes } from './routes/adminProductRoutes.js'
import { adminCategoryRoutes } from './routes/adminCategoryRoutes.js'
import { adminOrderRoutes } from './routes/adminOrderRoutes.js'
import { adminCustomerRoutes } from './routes/adminCustomerRoutes.js'
import { adminTeamRoutes } from './routes/adminTeamRoutes.js'
import { paymentRoutes } from './routes/paymentRoutes.js'
import { adminPaymentRoutes } from './routes/adminPaymentRoutes.js'

export const createApp = () => {
  const app = express()

  app.use(
    cors({
      origin: env.corsOrigin === '*' ? true : env.corsOrigin,
      credentials: true,
    })
  )
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))
  app.use(express.static(path.resolve(__dirname, '../public')))

  // Mount Public Endpoints
  app.use('/api', publicRoutes)
  app.use('/api', inquiryRoutes)
  app.use('/api', paymentRoutes)
  app.use('/api/auth', customerAuthRoutes)
  app.use('/api/orders', orderRoutes)
  app.use('/api/coupons', couponRoutes)
  app.use('/api/reviews', reviewRoutes)
  app.use('/api/user', userRoutes)

  // Mount Admin Endpoints
  app.use('/api/admin/auth', adminAuthRoutes)
  app.use('/api/admin', adminMetaRoutes)
  app.use('/api/admin', adminCustomerRoutes)
  app.use('/api/admin/categories', adminCategoryRoutes)
  app.use('/api/admin/products', adminProductRoutes)
  app.use('/api/admin/orders', adminOrderRoutes)
  app.use('/api/admin/team', adminTeamRoutes)
  app.use('/api/admin/payment-settings', adminPaymentRoutes)

  // Central Error Handler
  app.use(errorHandler)

  return app
}
