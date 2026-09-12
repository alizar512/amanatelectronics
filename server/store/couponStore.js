import { getStoreState, saveStoreState } from './storageEngine.js'

export const getCoupons = () => {
  const state = getStoreState()
  return state.coupons
}

export const findCouponByCode = (code) => {
  if (!code) return null
  const state = getStoreState()
  const normalized = String(code).trim().toUpperCase()
  return state.coupons.find((c) => c.code.toUpperCase() === normalized && c.isActive) || null
}

export const validateCoupon = (code, subtotal = 0) => {
  if (!code) {
    return { valid: false, message: 'Please provide a coupon code' }
  }

  const coupon = findCouponByCode(code)
  if (!coupon) {
    return { valid: false, message: 'Invalid or expired coupon code' }
  }

  const amount = Number(subtotal) || 0
  if (coupon.minSpend && amount < coupon.minSpend) {
    return {
      valid: false,
      message: `Coupon requires a minimum order value of Rs ${coupon.minSpend.toLocaleString()}`,
    }
  }

  let discount = 0
  if (coupon.discountType === 'percentage') {
    discount = Math.round((amount * coupon.discountValue) / 100)
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount
    }
  } else if (coupon.discountType === 'fixed') {
    discount = Math.min(amount, coupon.discountValue)
  }

  return {
    valid: true,
    code: coupon.code,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    discount,
    message: `Promo applied: ${coupon.code} (-Rs ${discount.toLocaleString()})`,
  }
}

export const createCoupon = (payload) => {
  const state = getStoreState()
  const code = String(payload.code).trim().toUpperCase()

  if (state.coupons.some((c) => c.code.toUpperCase() === code)) {
    throw new Error('Coupon code already exists')
  }

  const nextId = Math.max(...state.coupons.map((c) => Number(c.id) || 0), 0) + 1
  const newCoupon = {
    id: nextId,
    code,
    discountType: payload.discountType || 'percentage',
    discountValue: Number(payload.discountValue),
    minSpend: Number(payload.minSpend || 0),
    maxDiscount: payload.maxDiscount ? Number(payload.maxDiscount) : null,
    isActive: Boolean(payload.isActive ?? true),
    createdAt: new Date().toISOString(),
  }

  state.coupons.push(newCoupon)
  saveStoreState(state)
  return newCoupon
}

export const deleteCoupon = (id) => {
  const state = getStoreState()
  const initialLength = state.coupons.length
  state.coupons = state.coupons.filter((c) => String(c.id) !== String(id))
  const deleted = state.coupons.length < initialLength
  if (deleted) saveStoreState(state)
  return deleted
}
