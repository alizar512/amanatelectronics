import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  FaArrowLeft,
  FaCloudUploadAlt,
  FaTrash,
  FaPlus,
  FaCheck,
  FaSpinner,
  FaImage,
  FaLayerGroup,
  FaTags,
  FaBolt,
  FaStar,
  FaBox,
  FaDollarSign,
  FaTimes,
  FaCalculator
} from 'react-icons/fa'
import { apiClient } from '../../services/apiClient'
import { getCategories } from '../../services/catalogService'
import { useToast } from '../../context/ToastContext'

const BRAND_SUGGESTIONS = [
  'Aether',
  'Vertex',
  'Nova',
  'Echo',
  'Lumina',
  'Apex',
  'Horizon',
  'Haier',
  'Gree',
  'Dawlance',
  'Orient',
  'Kenwood',
  'Pel',
  'Samsung',
  'LG',
  'TCL',
  'Sony'
]

const BADGE_OPTIONS = [
  'None',
  'New arrival',
  'Featured',
  'Best seller',
  'Deal of the month',
  'Hot pick',
  'Cinema grade',
  'Eco Smart',
  'Limited Edition'
]

export default function AdminProductForm() {
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Catalog Meta
  const [categories, setCategories] = useState([])

  // Basic Information
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('Aether')
  const [category, setCategory] = useState('')
  const [sku, setSku] = useState('')
  const [badge, setBadge] = useState('New arrival')
  const [description, setDescription] = useState('')

  // Pricing & Stock
  const [price, setPrice] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [stock, setStock] = useState('15')
  const [isActive, setIsActive] = useState(true)
  const [featured, setFeatured] = useState(false)
  const [isBestSeller, setIsBestSeller] = useState(false)
  const [isPinned, setIsPinned] = useState(false)

  // Installment & EMI Configuration
  const [installmentAvailable, setInstallmentAvailable] = useState(true)
  const [installmentAdvance, setInstallmentAdvance] = useState('20')
  const [installmentMonthly, setInstallmentMonthly] = useState('')
  const [installmentMarkup, setInstallmentMarkup] = useState('0% Markup Available')
  const [installmentNote, setInstallmentNote] = useState(
    'Available on easy monthly installments with flexible bank & showroom plans.'
  )

  // Media
  const [mainImage, setMainImage] = useState('')
  const [galleryImages, setGalleryImages] = useState([])
  const [isMainDragOver, setIsMainDragOver] = useState(false)
  const [isGalleryDragOver, setIsGalleryDragOver] = useState(false)

  // Highlights & Specs
  const [highlights, setHighlights] = useState([
    'Official manufacturer warranty included',
    'Energy efficient high-performance engineering',
  ])
  const [newHighlight, setNewHighlight] = useState('')

  const [specs, setSpecs] = useState([
    { key: 'Warranty', value: '1 Year Comprehensive + 10 Years Compressor/Motor' },
    { key: 'Condition', value: '100% Brand New Original Box Packed' },
    { key: 'Voltage', value: '220V - 240V / 50Hz' },
  ])

  const mainFileInputRef = useRef(null)
  const galleryFileInputRef = useRef(null)

  useEffect(() => {
    fetchInitialData()
  }, [id])

  const fetchInitialData = async () => {
    try {
      const catsData = await getCategories()
      const cats = Array.isArray(catsData) ? catsData : catsData.categories || []
      setCategories(cats)

      if (isEditMode) {
        setLoading(true)
        const res = await apiClient.get(`/admin/products/${id}`)
        const p = res.data.item || res.data.product || res.data
        if (p) {
          setName(p.name || '')
          setBrand(p.brand || 'Aether')
          setCategory(p.category || (cats[0]?.name || 'Cooling'))
          setSku(p.sku || '')
          setBadge(p.badge || 'None')
          setDescription(p.description || '')
          setPrice(String(p.price || ''))
          setOriginalPrice(String(p.originalPrice || ''))
          setStock(String(p.stock !== undefined ? p.stock : 10))
          setIsActive(p.isActive !== false)
          setFeatured(Boolean(p.featured))
          setIsBestSeller(Boolean(p.isBestSeller))
          setIsPinned(Boolean(p.isPinned))
          setInstallmentAvailable(p.installmentAvailable !== false)
          setInstallmentAdvance(String(p.installmentAdvance ?? 20))
          setInstallmentMonthly(p.installmentMonthly ? String(p.installmentMonthly) : '')
          setInstallmentMarkup(p.installmentMarkup || '0% Markup Available')
          setInstallmentNote(
            p.installmentNote ||
              'Available on easy monthly installments with flexible bank & showroom plans.'
          )
          setMainImage(p.image || p.images?.[0] || '')
          setGalleryImages(Array.isArray(p.images) ? p.images.slice(1) : [])
          if (Array.isArray(p.highlights) && p.highlights.length) {
            setHighlights(p.highlights)
          }
          if (p.specs && typeof p.specs === 'object') {
            const specList = Array.isArray(p.specs)
              ? p.specs
              : Object.entries(p.specs).map(([key, value]) => ({ key, value }))
            setSpecs(specList)
          }
        }
      } else {
        if (cats.length > 0) {
          setCategory(cats[0].name)
        }
        // Auto-generate a starter SKU
        setSku(`AMANAT-${Math.floor(1000 + Math.random() * 9000)}`)
      }
    } catch (err) {
      console.error('Error loading product data:', err)
      showToast('Failed to load product details', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Handle Main Image file
  const handleMainImageFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, WEBP)')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size must be less than 5MB')
      return
    }
    setErrorMessage('')
    const reader = new FileReader()
    reader.onload = (e) => {
      setMainImage(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  // Handle Gallery Images files
  const handleGalleryFiles = (files) => {
    if (!files || !files.length) return
    const fileList = Array.from(files)

    for (const file of fileList) {
      if (!file.type.startsWith('image/')) continue
      if (file.size > 5 * 1024 * 1024) continue

      const reader = new FileReader()
      reader.onload = (e) => {
        setGalleryImages((prev) => [...prev, e.target.result])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Highlights handlers
  const addHighlight = () => {
    if (!newHighlight.trim()) return
    setHighlights([...highlights, newHighlight.trim()])
    setNewHighlight('')
  }

  const removeHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index))
  }

  // Specs handlers
  const addSpecRow = () => {
    setSpecs([...specs, { key: '', value: '' }])
  }

  const updateSpecRow = (index, field, val) => {
    const updated = [...specs]
    updated[index][field] = val
    setSpecs(updated)
  }

  const removeSpecRow = (index) => {
    setSpecs(specs.filter((_, i) => i !== index))
  }

  // Submit product
  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

    if (!name.trim()) {
      setErrorMessage('Product title is required')
      return
    }
    if (!price || Number(price) <= 0) {
      setErrorMessage('A valid product price is required')
      return
    }
    if (!category) {
      setErrorMessage('Please select a category')
      return
    }

    setSaving(true)
    setErrorMessage('')

    const allImages = [
      mainImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&h=900&q=80',
      ...galleryImages,
    ]

    const formattedSpecs = specs.reduce((acc, curr) => {
      if (curr.key && curr.key.trim()) {
        acc[curr.key.trim()] = curr.value.trim()
      }
      return acc
    }, {})

    const payload = {
      name: name.trim(),
      brand: brand.trim(),
      category: category.trim(),
      sku: sku.trim() || `SKU-${Date.now()}`,
      badge: badge === 'None' ? '' : badge,
      description: description.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Number(price),
      stock: Number(stock) || 0,
      image: allImages[0],
      images: allImages,
      highlights: highlights.filter((h) => h.trim().length > 0),
      specs: formattedSpecs,
      isActive,
      featured,
      isBestSeller,
      isPinned,
      installmentAvailable,
      installmentAdvance: Number(installmentAdvance) || 20,
      installmentMonthly: installmentMonthly ? Number(installmentMonthly) : Math.round(Number(price) / 12),
      installmentMarkup,
      installmentNote: installmentNote.trim(),
      installmentTenures: ['3 Months', '6 Months', '12 Months', '24 Months'],
    }

    try {
      if (isEditMode) {
        await apiClient.put(`/admin/products/${id}`, payload)
        showToast(`Product "${payload.name}" updated successfully!`, 'success')
      } else {
        await apiClient.post('/admin/products', payload)
        showToast(`Product "${payload.name}" created and published!`, 'success')
      }
      navigate('/admin/products')
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  // Discount percentage calculation
  const discountPercent =
    originalPrice && Number(originalPrice) > Number(price)
      ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)
      : 0

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <FaSpinner className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl pb-16">
      {/* Top Bar Navigation */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/products"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <FaArrowLeft />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isEditMode
                ? 'Update specifications, pricing, media, and inventory stock'
                : 'Fill in catalog details to launch a new product on Amanat Electronics'}
            </p>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            Discard
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => {
              setIsActive(false)
              setTimeout(() => handleSubmit(), 50)
            }}
            className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            Save as Draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => {
              setIsActive(true)
              handleSubmit()
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? (
              <>
                <FaSpinner className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <FaCheck /> {isEditMode ? 'Update Product' : 'Publish Product'}
              </>
            )}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
          {errorMessage}
        </div>
      )}

      {/* Main Grid Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Main Form Fields */}
        <div className="space-y-6 lg:col-span-2">
          {/* Card 1: General Product Information */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FaBox className="text-blue-600" /> General Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Product Title / Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Glacier Pro 1.5 Ton Inverter Air Conditioner"
                  className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    list="brands-list"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Haier, Gree, Aether"
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                  <datalist id="brands-list">
                    {BRAND_SUGGESTIONS.map((b) => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Category Department *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <option key={cat.id || cat.name} value={cat.name}>
                          {cat.name}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Cooling">Cooling</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Smart Home">Smart Home</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    SKU / Model Number
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="AMANAT-AC-1001"
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Product Badge / Tag
                  </label>
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    {BADGE_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Detailed Description & Overview
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe key selling points, dimensions, build quality, power ratings, and included items..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Media & Image Uploads */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FaImage className="text-blue-600" /> Media & Images
            </h2>

            <div className="space-y-5">
              {/* Main Cover Image */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Main Cover Image *
                </p>

                {mainImage ? (
                  <div className="relative flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                    <img
                      src={mainImage}
                      alt="Main Product Preview"
                      className="h-24 w-24 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Primary Product Image</p>
                      <p className="text-xs text-slate-400 mt-0.5">This image will appear on product cards and search results</p>
                      <div className="mt-2.5 flex gap-2">
                        <button
                          type="button"
                          onClick={() => mainFileInputRef.current?.click()}
                          className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                        >
                          Replace Image
                        </button>
                        <button
                          type="button"
                          onClick={() => setMainImage('')}
                          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault()
                      setIsMainDragOver(true)
                    }}
                    onDragLeave={() => setIsMainDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setIsMainDragOver(false)
                      if (e.dataTransfer.files?.[0]) handleMainImageFile(e.dataTransfer.files[0])
                    }}
                    onClick={() => mainFileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
                      isMainDragOver
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
                        : 'border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50'
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-2">
                      <FaCloudUploadAlt size={24} />
                    </div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Upload Main Product Image
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Drag and drop or click to browse (PNG, JPG, WEBP)</p>
                  </div>
                )}

                <input
                  type="file"
                  ref={mainFileInputRef}
                  onChange={(e) => handleMainImageFile(e.target.files?.[0])}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Gallery Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Additional Gallery Images ({galleryImages.length})
                  </p>
                  <button
                    type="button"
                    onClick={() => galleryFileInputRef.current?.click()}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    + Add More Images
                  </button>
                </div>

                {galleryImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {galleryImages.map((img, idx) => (
                      <div key={idx} className="group relative rounded-xl border border-slate-200 overflow-hidden dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                        <img src={img} alt={`Gallery ${idx}`} className="h-24 w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition hover:bg-red-700"
                        >
                          <FaTimes size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault()
                      setIsGalleryDragOver(true)
                    }}
                    onDragLeave={() => setIsGalleryDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setIsGalleryDragOver(false)
                      if (e.dataTransfer.files) handleGalleryFiles(e.dataTransfer.files)
                    }}
                    onClick={() => galleryFileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 text-center cursor-pointer transition-colors ${
                      isGalleryDragOver
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
                        : 'border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50'
                    }`}
                  >
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Upload multiple side-views, accessories, or packaging photos
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  multiple
                  ref={galleryFileInputRef}
                  onChange={(e) => handleGalleryFiles(e.target.files)}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Key Highlights & Technical Specs */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FaBolt className="text-blue-600" /> Highlights & Specifications
            </h2>

            {/* Highlights Section */}
            <div className="mb-6 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Key Features & Bullets
              </p>

              <div className="space-y-2">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs dark:bg-blue-900/40 dark:text-blue-400">✓</span>
                    <span className="flex-1 text-sm text-slate-700 dark:text-slate-300">{item}</span>
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addHighlight()
                    }
                  }}
                  placeholder="Type a feature and press Enter (e.g. 75% Electricity Saver)"
                  className="flex-1 rounded-xl border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={addHighlight}
                  className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Technical Specs Table */}
            <div className="space-y-3 border-t border-slate-100 pt-5 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Technical Specifications Table
                </p>
                <button
                  type="button"
                  onClick={addSpecRow}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
                >
                  <FaPlus size={10} /> Add Spec Row
                </button>
              </div>

              <div className="space-y-2">
                {specs.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) => updateSpecRow(index, 'key', e.target.value)}
                      placeholder="Spec Name (e.g. Capacity)"
                      className="w-1/3 rounded-xl border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => updateSpecRow(index, 'value', e.target.value)}
                      placeholder="Value (e.g. 1.5 Ton)"
                      className="flex-1 rounded-xl border border-slate-200 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecRow(index)}
                      className="text-slate-400 hover:text-red-500 p-2"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card: Installment & EMI Plans Configuration */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FaCalculator className="text-emerald-600" /> Easy Installment & EMI Plans
              </h2>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={installmentAvailable}
                  onChange={(e) => setInstallmentAvailable(e.target.checked)}
                  className="h-4 w-4 rounded text-emerald-600"
                />
                Enable Installment for this product
              </label>
            </div>

            {installmentAvailable ? (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Advance / Down Payment (%)
                    </label>
                    <select
                      value={installmentAdvance}
                      onChange={(e) => setInstallmentAdvance(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                      <option value="10">10% Advance</option>
                      <option value="15">15% Advance</option>
                      <option value="20">20% Advance (Recommended)</option>
                      <option value="25">25% Advance</option>
                      <option value="30">30% Advance</option>
                      <option value="40">40% Advance</option>
                      <option value="50">50% Advance</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Monthly Installment (Rs/mo)
                      </label>
                      {price && Number(price) > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const down = (Number(price) * Number(installmentAdvance)) / 100
                            const emi = Math.round((Number(price) - down) / 12)
                            setInstallmentMonthly(String(emi))
                          }}
                          className="text-[11px] font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                        >
                          Auto-calculate (12 Mo)
                        </button>
                      )}
                    </div>
                    <input
                      type="number"
                      value={installmentMonthly}
                      onChange={(e) => setInstallmentMonthly(e.target.value)}
                      placeholder={price ? String(Math.round((Number(price) * 0.8) / 12)) : '5000'}
                      className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Installment Scheme Badge / Plan Type
                    </label>
                    <select
                      value={installmentMarkup}
                      onChange={(e) => setInstallmentMarkup(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                      <option value="0% Markup Available">0% Markup Available (Up to 12 Months)</option>
                      <option value="Bank Credit Card 0% EMI">Bank Credit Card 0% EMI (Meezan, Alfalah, HBL)</option>
                      <option value="In-House Showroom Installment">In-House Showroom Installment (Easy Verification)</option>
                      <option value="Flexible 3 to 24 Months">Flexible 3 to 24 Months Tenures</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Installment Terms & Eligibility Note
                    </label>
                    <textarea
                      rows={2}
                      value={installmentNote}
                      onChange={(e) => setInstallmentNote(e.target.value)}
                      placeholder="e.g. Available on easy monthly installments with flexible bank & showroom plans."
                      className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Live Preview of Calculated EMI Table */}
                {price && Number(price) > 0 && (
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Calculated Storefront EMI Breakdown for Rs {Number(price).toLocaleString()} ({installmentAdvance}% Advance):
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      {[3, 6, 12, 24].map((m) => {
                        const down = (Number(price) * Number(installmentAdvance)) / 100
                        const emi = Math.round((Number(price) - down) / m)
                        return (
                          <div key={m} className="rounded-xl bg-white p-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                            <span className="text-[10px] text-slate-400 block">{m} Months</span>
                            <span className="font-bold text-slate-900 dark:text-white text-xs">Rs {emi.toLocaleString()}/mo</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Installment option is disabled for this product. Customers will only see upfront payment options.
              </p>
            )}
          </div>
        </div>

        {/* Right 1 Column: Pricing, Inventory & Status Sidebar */}
        <div className="space-y-6">
          {/* Card 4: Pricing & Discounts */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FaDollarSign className="text-blue-600" /> Pricing & Offer
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Selling Price (Rs) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Rs</span>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="214999"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Original List Price (Rs)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Rs</span>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="239999"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-600 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  />
                </div>
                {discountPercent > 0 && (
                  <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Calculated Discount: {discountPercent}% OFF
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Card 5: Inventory Stock */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FaLayerGroup className="text-blue-600" /> Stock & Inventory
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Available Quantity in Units
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="10"
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-900/60">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Inventory Status:</span>
                <p className={`text-sm font-bold mt-1 ${Number(stock) > 5 ? 'text-emerald-600' : Number(stock) > 0 ? 'text-amber-600' : 'text-red-600'}`}>
                  {Number(stock) > 5 ? '● In Stock (Healthy)' : Number(stock) > 0 ? '● Low Stock Alert' : '● Out of Stock'}
                </p>
              </div>
            </div>
          </div>

          {/* Card 6: Publication & Promotion Settings */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FaStar className="text-blue-600" /> Visibility & Promotion
            </h2>

            <div className="space-y-4">
              {/* Active Toggle */}
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Active on Storefront</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Display item publicly for buying</p>
                </div>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </label>

              {/* Featured Toggle */}
              <label className="flex items-center justify-between cursor-pointer border-t border-slate-100 pt-3 dark:border-slate-700">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Feature on Home Page</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Highlight in top storefront banners</p>
                </div>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </label>

              {/* Best Seller Toggle */}
              <label className="flex items-center justify-between cursor-pointer border-t border-slate-100 pt-3 dark:border-slate-700">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Best Seller Collection</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Mark as trending bestseller</p>
                </div>
                <input
                  type="checkbox"
                  checked={isBestSeller}
                  onChange={(e) => setIsBestSeller(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </label>

              {/* Pin on Very First Position Toggle */}
              <label className="flex items-center justify-between cursor-pointer border-t border-slate-100 pt-3 dark:border-slate-700">
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Pin on Very First</p>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                      Top Priority #1
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Display this product at the very first position of the home page catalog
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
