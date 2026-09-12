import { addProductReview, getReviewsByProductId } from '../store/reviewStore.js'

export const getProductReviews = (request, response) => {
  const reviews = getReviewsByProductId(request.params.productId)
  response.json({
    reviews,
    total: reviews.length,
  })
}

export const submitProductReview = (request, response) => {
  const { userName, userEmail, rating, comment } = request.body || {}
  const productId = request.params.productId

  if (!comment || !rating) {
    response.status(400).json({ message: 'Rating and review comment are required' })
    return
  }

  try {
    const review = addProductReview({
      productId,
      userId: request.user?.id || null,
      userName: userName || request.user?.name || 'Customer',
      userEmail: userEmail || request.user?.email || '',
      rating: Number(rating),
      comment,
    })

    response.status(201).json({
      message: 'Review submitted successfully',
      review,
    })
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
}
