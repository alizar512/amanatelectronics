import { validateCoupon } from '../store/couponStore.js'

export const validateCouponEndpoint = (request, response) => {
  const { code, subtotal } = request.body || {}

  if (!code) {
    response.status(400).json({ message: 'Coupon code is required' })
    return
  }

  const result = validateCoupon(code, subtotal)

  if (!result.valid) {
    response.status(400).json(result)
    return
  }

  response.json(result)
}
