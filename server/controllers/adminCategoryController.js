import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  toggleCategoryStatus,
  updateCategory,
} from '../store/categoryStore.js'

export const getAdminCategories = (_request, response) => {
  const categories = getAllCategories()
  response.json({
    categories,
    total: categories.length,
  })
}

export const getAdminCategory = (request, response) => {
  const category = getCategoryById(request.params.id)

  if (!category) {
    response.status(404).json({ message: 'Category not found' })
    return
  }

  response.json({ category })
}

export const createAdminCategory = (request, response) => {
  const { name, description, accent, imageUrl, image, isActive } = request.body || {}

  if (!name || !name.trim()) {
    response.status(400).json({ message: 'Category name is required' })
    return
  }

  try {
    const category = createCategory({
      name,
      description,
      accent,
      imageUrl,
      image,
      isActive: isActive !== false,
    })
    response.status(201).json({
      message: 'Category created successfully',
      category,
    })
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
}

export const updateAdminCategory = (request, response) => {
  try {
    const category = updateCategory(request.params.id, request.body)

    if (!category) {
      response.status(404).json({ message: 'Category not found' })
      return
    }

    response.json({
      message: 'Category updated successfully',
      category,
    })
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
}

export const toggleAdminCategoryStatus = (request, response) => {
  const category = toggleCategoryStatus(request.params.id)

  if (!category) {
    response.status(404).json({ message: 'Category not found' })
    return
  }

  response.json({
    message: `Category is now ${category.isActive ? 'Active (published on main website)' : 'Inactive (hidden from main website)'}`,
    category,
  })
}

export const deleteAdminCategory = (request, response) => {
  const category = deleteCategory(request.params.id)

  if (!category) {
    response.status(404).json({ message: 'Category not found' })
    return
  }

  response.json({
    message: 'Category deleted successfully',
    category,
  })
}
