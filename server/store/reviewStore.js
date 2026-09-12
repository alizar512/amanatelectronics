import { getStoreState, saveStoreState } from './storageEngine.js'
import { getProductById } from './productStore.js'

export const getReviewsByProductId = (productId) => {
  const state = getStoreState()
  return state.reviews
    .filter((r) => String(r.productId) === String(productId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export const addProductReview = ({
  productId,
  userId = null,
  userName,
  userEmail = '',
  rating = 5,
  comment,
}) => {
  const state = getStoreState()
  const product = getProductById(productId)
  if (!product) {
    throw new Error('Product not found')
  }

  const nextId = Math.max(...state.reviews.map((r) => Number(r.id) || 0), 0) + 1
  const cleanRating = Math.max(1, Math.min(5, Number(rating) || 5))

  const newReview = {
    id: nextId,
    productId: Number(productId),
    userId: userId ? Number(userId) : null,
    userName: String(userName || 'Verified Buyer').trim(),
    userEmail: String(userEmail || '').trim(),
    rating: cleanRating,
    comment: String(comment || '').trim(),
    isVerified: true,
    createdAt: new Date().toISOString(),
  }

  state.reviews.push(newReview)

  // Recalculate product average rating and reviews count
  const allProductReviews = state.reviews.filter((r) => String(r.productId) === String(productId))
  const avgRating =
    allProductReviews.reduce((sum, r) => sum + r.rating, 0) / allProductReviews.length

  const storeProduct = state.products.find((p) => String(p.id) === String(productId))
  if (storeProduct) {
    storeProduct.rating = Number(avgRating.toFixed(1))
    storeProduct.reviews = allProductReviews.length
    storeProduct.updatedAt = new Date().toISOString()
  }

  saveStoreState(state)
  return newReview
}
