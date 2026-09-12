import { useState, useEffect, useRef } from 'react'
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch, 
  FaSpinner, 
  FaTimes, 
  FaCheck,
  FaCloudUploadAlt,
  FaImage,
  FaEye,
  FaEyeSlash,
  FaToggleOn,
  FaToggleOff,
  FaLayerGroup
} from 'react-icons/fa'
import { 
  getAdminCategories, 
  createAdminCategory, 
  updateAdminCategory, 
  toggleAdminCategoryStatus,
  deleteAdminCategory 
} from '../../services/catalogService'
import { useToast } from '../../context/ToastContext'

const ACCENT_PRESETS = [
  { label: 'Sky Blue', value: 'from-sky-500/20 to-cyan-500/10', color: 'from-sky-500 to-cyan-500' },
  { label: 'Amber Orange', value: 'from-amber-500/20 to-orange-500/10', color: 'from-amber-500 to-orange-500' },
  { label: 'Emerald Teal', value: 'from-emerald-500/20 to-teal-500/10', color: 'from-emerald-500 to-teal-500' },
  { label: 'Violet Fuchsia', value: 'from-violet-500/20 to-fuchsia-500/10', color: 'from-violet-500 to-fuchsia-500' },
  { label: 'Royal Blue', value: 'from-blue-500/20 to-indigo-500/10', color: 'from-blue-500 to-indigo-500' },
  { label: 'Rose Pink', value: 'from-rose-500/20 to-pink-500/10', color: 'from-rose-500 to-pink-500' },
  { label: 'Slate Dark', value: 'from-slate-500/20 to-slate-700/10', color: 'from-slate-600 to-slate-800' },
  { label: 'Sunset Red', value: 'from-red-500/20 to-amber-500/10', color: 'from-red-500 to-amber-500' },
]

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // Modal State
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [saving, setSaving] = useState(false)
  const [modalError, setModalError] = useState('')

  // Form State
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [accent, setAccent] = useState(ACCENT_PRESETS[0].value)
  const [imageUrl, setImageUrl] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [isDragOver, setIsDragOver] = useState(false)

  const fileInputRef = useRef(null)
  const { showToast } = useToast()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const data = await getAdminCategories()
      setCategories(Array.isArray(data) ? data : data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      showToast('Failed to load categories', 'error')
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingCategory(null)
    setName('')
    setDescription('')
    setAccent(ACCENT_PRESETS[0].value)
    setImageUrl('')
    setIsActive(true)
    setModalError('')
    setShowModal(true)
  }

  const openEditModal = (category) => {
    setEditingCategory(category)
    setName(category.name || '')
    setDescription(category.description || '')
    setAccent(category.accent || ACCENT_PRESETS[0].value)
    setImageUrl(category.imageUrl || '')
    setIsActive(category.isActive !== false)
    setModalError('')
    setShowModal(true)
  }

  // Handle local image file upload
  const handleImageFile = (file) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setModalError('Please upload a valid image file (PNG, JPG, WEBP)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setModalError('Image size must be less than 5MB')
      return
    }

    setModalError('')
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageUrl(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0])
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setModalError('Category name is required')
      return
    }

    setSaving(true)
    setModalError('')

    const payload = {
      name: name.trim(),
      description: description.trim(),
      accent,
      imageUrl: imageUrl.trim(),
      isActive,
    }

    try {
      if (editingCategory) {
        await updateAdminCategory(editingCategory.id, payload)
        showToast(`Category "${payload.name}" updated successfully`, 'success')
      } else {
        await createAdminCategory(payload)
        showToast(
          isActive
            ? `Category "${payload.name}" created and published live!`
            : `Category "${payload.name}" created as inactive draft`,
          'success'
        )
      }
      setShowModal(false)
      await fetchCategories()
    } catch (err) {
      setModalError(err.response?.data?.message || err.message || 'Failed to save category')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleStatus = async (category) => {
    try {
      const res = await toggleAdminCategoryStatus(category.id)
      showToast(res.message || 'Status updated', 'success')
      await fetchCategories()
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to toggle status', 'error')
    }
  }

  const handleDelete = async (id, categoryName) => {
    if (!confirm(`Are you sure you want to delete category "${categoryName}"?`)) return

    try {
      await deleteAdminCategory(id)
      showToast(`Category "${categoryName}" removed`, 'success')
      await fetchCategories()
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete category', 'error')
    }
  }

  const filteredCategories = categories.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase()) ||
      c.id?.toLowerCase().includes(search.toLowerCase())
  )

  const activeCount = categories.filter((c) => c.isActive !== false).length
  const inactiveCount = categories.length - activeCount

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Store Categories</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create, edit, and organize product categories with image upload and live/inactive visibility controls.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg"
        >
          <FaPlus className="mr-2 inline" />
          Create Category
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Categories</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"><FaLayerGroup size={14} /></span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{categories.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Active (Live on Website)</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"><FaEye size={14} /></span>
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Inactive / Drafts</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"><FaEyeSlash size={14} /></span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-600 dark:text-slate-400">{inactiveCount}</p>
        </div>
      </div>

      {/* Search Filter */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories by name, slug, description..."
            className="w-full rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Category List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Category Name & Cover
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Website Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Assigned Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500 dark:text-slate-400">
                      No categories found. Click "Create Category" to add one.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat) => {
                    const isLive = cat.isActive !== false
                    return (
                      <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {cat.imageUrl ? (
                              <img
                                src={cat.imageUrl}
                                alt={cat.name}
                                className="h-12 w-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                              />
                            ) : (
                              <div
                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${
                                  cat.accent || 'from-blue-500/20 to-indigo-500/10'
                                } text-blue-600 dark:text-blue-400 font-bold text-lg`}
                              >
                                {cat.name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white">{cat.name}</p>
                              <p className="text-xs text-slate-400">
                                Slug: <code className="text-slate-500 dark:text-slate-400">{cat.id}</code>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 max-w-xs truncate">
                          {cat.description || 'No description provided'}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(cat)}
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                              isLive
                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                            }`}
                            title="Click to toggle live website visibility"
                          >
                            {isLive ? (
                              <>
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                Active (Live)
                              </>
                            ) : (
                              <>
                                <span className="h-2 w-2 rounded-full bg-slate-400" />
                                Inactive (Hidden)
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            {cat.count !== undefined ? cat.count : 0} products
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(cat)}
                              className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                              title="Edit category"
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(cat.id, cat.name)}
                              className="rounded-lg bg-red-100 p-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                              title="Delete category"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Category Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-700">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Configure department details, cover image, and website publication status
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
              >
                <FaTimes />
              </button>
            </div>

            {modalError && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              {/* Category Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Smart Living, Gaming Gear, Audio & Sound"
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary of products in this department..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              {/* Publication Status Selection (Active vs Inactive) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Category Status & Visibility
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsActive(true)}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm dark:bg-emerald-950/30'
                        : 'border-slate-200 hover:border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      isActive ? 'bg-emerald-500 text-white' : 'border border-slate-300 dark:border-slate-600'
                    }`}>
                      {isActive && <FaCheck size={10} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Active (Published)</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Visible on main website, navbar menu, home page, and shop filters.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsActive(false)}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                      !isActive
                        ? 'border-amber-500 bg-amber-50/50 shadow-sm dark:bg-amber-950/30'
                        : 'border-slate-200 hover:border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      !isActive ? 'bg-amber-500 text-white' : 'border border-slate-300 dark:border-slate-600'
                    }`}>
                      {!isActive && <FaCheck size={10} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Inactive (Hidden / Draft)</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Saved in admin system only. Hidden from customer storefront.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Category Cover Image
                </label>

                {imageUrl ? (
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
                    <div className="flex items-center gap-4">
                      <img
                        src={imageUrl}
                        alt="Category Preview"
                        className="h-20 w-20 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                      />
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                          Image uploaded successfully
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Ready for category banner and hero cards
                        </p>
                        <div className="mt-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                          >
                            Change Image
                          </button>
                          <button
                            type="button"
                            onClick={() => setImageUrl('')}
                            className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault()
                      setIsDragOver(true)
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
                      isDragOver
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
                        : 'border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-3">
                      <FaCloudUploadAlt size={24} />
                    </div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Click to upload or drag & drop category image
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      PNG, JPG, WEBP, or SVG (Max 5MB)
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleImageFile(e.target.files?.[0])}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Accent Gradient Color Theme */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Accent Gradient Color Theme
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ACCENT_PRESETS.map((preset) => {
                    const isSelected = accent === preset.value
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setAccent(preset.value)}
                        className={`flex items-center gap-2 rounded-xl border p-2 text-left text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50 shadow-sm dark:bg-blue-900/30'
                            : 'border-slate-200 hover:border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <span className={`h-4 w-4 rounded-full bg-gradient-to-r ${preset.color} shrink-0`} />
                        <span className="truncate text-slate-700 dark:text-slate-300">{preset.label}</span>
                        {isSelected && <FaCheck className="ml-auto text-blue-600 text-[10px]" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingCategory ? 'Update Category' : isActive ? 'Create & Publish Live' : 'Save as Draft (Inactive)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
