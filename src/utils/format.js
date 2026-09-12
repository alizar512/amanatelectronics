export const cn = (...classes) => classes.filter(Boolean).join(' ')

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(value)

export const formatCompactNumber = (value) =>
  new Intl.NumberFormat('en', { notation: 'compact' }).format(value)

export const calculateDiscount = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

export const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
