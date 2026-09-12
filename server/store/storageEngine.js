import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import { env } from '../config/env.js'
import {
  products as catalogProducts,
  categories as catalogCategories,
  brands as catalogBrands,
  testimonials as catalogTestimonials,
  blogPosts as catalogBlogPosts,
  heroSlides as catalogHeroSlides,
  instagramGallery as catalogInstagramGallery,
} from '../../src/assets/data/catalog.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.resolve(__dirname, '../data')
const STATE_FILE = path.join(DATA_DIR, 'store_state.json')

let state = null

const createInitialState = () => {
  const adminPasswordHash = bcrypt.hashSync(env.seedUsers.admin.password, 10)
  const managerPasswordHash = bcrypt.hashSync(env.seedUsers.manager.password, 10)
  const customerPasswordHash = bcrypt.hashSync(env.seedUsers.customer.password, 10)

  return {
    adminUsers: [
      {
        id: 1,
        name: env.seedUsers.admin.name,
        email: env.seedUsers.admin.email,
        role: 'admin',
        passwordHash: adminPasswordHash,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: env.seedUsers.manager.name,
        email: env.seedUsers.manager.email,
        role: 'manager',
        passwordHash: managerPasswordHash,
        createdAt: new Date().toISOString(),
      },
    ],
    users: [
      {
        id: 1,
        name: env.seedUsers.customer.name,
        email: env.seedUsers.customer.email,
        passwordHash: customerPasswordHash,
        phone: env.seedUsers.customer.phone,
        role: 'customer',
        createdAt: new Date().toISOString(),
      },
    ],
    addresses: [
      {
        id: 1,
        userId: 1,
        title: 'Home',
        fullName: env.seedUsers.customer.name,
        phone: env.seedUsers.customer.phone,
        city: 'Faisalabad',
        addressLine: 'Canal Road, Green Valley, House 42',
        isDefault: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        userId: 1,
        title: 'Office',
        fullName: env.seedUsers.customer.name,
        phone: env.seedUsers.customer.phone,
        city: 'Lahore',
        addressLine: 'Main Boulevard, Gulberg III, Tech Tower Floor 4',
        isDefault: false,
        createdAt: new Date().toISOString(),
      },
    ],
    products: catalogProducts.map((p) => ({
      ...p,
      sku: p.sku || `AMANAT-${p.id}`,
      image: p.images?.[0] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&h=900&q=80',
      stock: p.stock !== undefined ? p.stock : 12,
      inStock: (p.stock !== undefined ? p.stock : 12) > 0,
      createdAt: new Date().toISOString(),
    })),
    categories: catalogCategories,
    brands: catalogBrands,
    testimonials: catalogTestimonials,
    blogPosts: catalogBlogPosts,
    heroSlides: catalogHeroSlides,
    instagramGallery: catalogInstagramGallery,
    coupons: [
      {
        id: 1,
        code: 'AMANAT10',
        discountType: 'percentage',
        discountValue: 10,
        minSpend: 5000,
        maxDiscount: 5000,
        isActive: true,
      },
      {
        id: 2,
        code: 'SAVE15',
        discountType: 'percentage',
        discountValue: 15,
        minSpend: 10000,
        maxDiscount: 8000,
        isActive: true,
      },
      {
        id: 3,
        code: 'WELCOME20',
        discountType: 'percentage',
        discountValue: 20,
        minSpend: 15000,
        maxDiscount: 10000,
        isActive: true,
      },
      {
        id: 4,
        code: 'FLAT2000',
        discountType: 'fixed',
        discountValue: 2000,
        minSpend: 20000,
        maxDiscount: 2000,
        isActive: true,
      },
    ],
    orders: [
      {
        id: 1,
        orderNumber: 'AMANAT-2026-1024',
        userId: 1,
        customerName: 'Demo Customer',
        customerEmail: 'customer@amanat.local',
        customerPhone: '+92 300 1234567',
        shippingCity: 'Faisalabad',
        shippingAddress: 'Canal Road, Green Valley, House 42',
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'pending',
        orderStatus: 'Delivered',
        items: [
          {
            id: 1,
            productId: 1,
            name: 'Glacier Pro Inverter AC',
            price: 214999,
            quantity: 1,
            color: 'Frost',
            image: catalogProducts[0]?.images?.[0],
            total: 214999,
          },
        ],
        subtotal: 214999,
        shippingFee: 2500,
        tax: 10750,
        discount: 0,
        couponCode: null,
        total: 228249,
        notes: 'Please call before delivery',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        orderNumber: 'AMANAT-2026-1025',
        userId: 1,
        customerName: 'Demo Customer',
        customerEmail: 'customer@amanat.local',
        customerPhone: '+92 300 1234567',
        shippingCity: 'Lahore',
        shippingAddress: 'Main Boulevard, Gulberg III, Tech Tower Floor 4',
        paymentMethod: 'Direct Bank Transfer / Raast',
        paymentStatus: 'paid',
        orderStatus: 'In transit',
        items: [
          {
            id: 2,
            productId: 2,
            name: 'Nimbus Air Cooler Max',
            price: 48999,
            quantity: 1,
            color: 'Cloud White',
            image: catalogProducts[1]?.images?.[0],
            total: 48999,
          },
        ],
        subtotal: 48999,
        shippingFee: 1500,
        tax: 2450,
        discount: 4899,
        couponCode: 'AMANAT10',
        total: 48050,
        notes: 'Deliver during office hours',
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    reviews: [
      {
        id: 1,
        productId: 1,
        userId: 1,
        userName: 'Hamza Khan',
        userEmail: 'hamza@example.com',
        rating: 5,
        comment: 'Exceptional cooling efficiency and whisper-quiet operation. Highly recommended!',
        isVerified: true,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      },
      {
        id: 2,
        productId: 1,
        userId: null,
        userName: 'Zainab Tariq',
        userEmail: 'zainab@example.com',
        rating: 5,
        comment: 'Very sleek design, easily cools a 16x20 room in under 5 minutes.',
        isVerified: true,
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
      {
        id: 3,
        productId: 2,
        userId: 1,
        userName: 'Bilal Ahmed',
        userEmail: 'bilal@example.com',
        rating: 5,
        comment: 'Great water efficiency and build quality. The remote control works smoothly.',
        isVerified: true,
        createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
      },
    ],
    contactMessages: [
      {
        id: 1,
        name: 'Ali Raza',
        email: 'ali@example.com',
        phone: '+92 321 9876543',
        subject: 'Wholesale order inquiry',
        message: 'Hello, I would like to inquire about corporate bulk purchasing for smart appliances.',
        isRead: false,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ],
    newsletterSubscribers: [
      {
        id: 1,
        email: 'subscriber@example.com',
        createdAt: new Date().toISOString(),
      },
    ],
  }
}

export const getStoreState = () => {
  if (state) return state

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  if (fs.existsSync(STATE_FILE)) {
    try {
      const data = fs.readFileSync(STATE_FILE, 'utf8')
      state = JSON.parse(data)
      return state
    } catch (err) {
      console.warn('⚠️ Could not parse existing state file, creating fresh state:', err.message)
    }
  }

  state = createInitialState()
  saveStoreState(state)
  return state
}

export const saveStoreState = (updatedState) => {
  state = updatedState || state
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8')
  } catch (err) {
    console.error('❌ Error saving store state to file:', err.message)
  }
  return state
}
