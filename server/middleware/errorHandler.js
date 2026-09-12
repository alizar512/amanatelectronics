export const errorHandler = (error, _request, response, _next) => {
  console.error('API Error:', error)

  const statusCode = error.statusCode || (error.message?.includes('not found') ? 404 : 500)
  
  response.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
  })
}
