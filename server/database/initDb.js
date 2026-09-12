import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import { env } from '../config/env.js'
import { products as catalogProducts, categories as catalogCategories } from '../../src/assets/data/catalog.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const initDatabase = async () => {
  if (!env.mysql.host || !env.mysql.user || !env.mysql.database) {
    console.log('ℹ️  MySQL not configured; running with persistent storage fallback.')
    return false
  }

  try {
    // 1. Connect without selecting database to ensure database exists
    const rootConnection = await mysql.createConnection({
      host: env.mysql.host,
      port: env.mysql.port,
      user: env.mysql.user,
      password: env.mysql.password,
    })

    await rootConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${env.mysql.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    )
    await rootConnection.end()

    // 2. Connect to the database and run schema
    const dbConnection = await mysql.createConnection({
      host: env.mysql.host,
      port: env.mysql.port,
      user: env.mysql.user,
      password: env.mysql.password,
      database: env.mysql.database,
      multipleStatements: true,
    })

    const schemaPath = path.join(__dirname, 'schema.sql')
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8')
      await dbConnection.query(schemaSql)
    }

    // 3. Seed Admin Users if empty
    const [adminRows] = await dbConnection.query('SELECT COUNT(*) as count FROM admin_users')
    if (adminRows[0].count === 0) {
      const adminPass = bcrypt.hashSync(env.seedUsers.admin.password, 10)
      const managerPass = bcrypt.hashSync(env.seedUsers.manager.password, 10)

      await dbConnection.execute(
        'INSERT INTO admin_users (name, email, password_hash, role) VALUES (?, ?, ?, ?), (?, ?, ?, ?)',
        [
          env.seedUsers.admin.name,
          env.seedUsers.admin.email,
          adminPass,
          'admin',
          env.seedUsers.manager.name,
          env.seedUsers.manager.email,
          managerPass,
          'manager',
        ]
      )
      console.log('✅ Seeded admin users in MySQL')
    }

    // 4. Seed Demo Customer if empty
    const [userRows] = await dbConnection.query('SELECT COUNT(*) as count FROM users')
    if (userRows[0].count === 0) {
      const customerPass = bcrypt.hashSync(env.seedUsers.customer.password, 10)
      await dbConnection.execute(
        'INSERT INTO users (name, email, password_hash, phone, role) VALUES (?, ?, ?, ?, ?)',
        [
          env.seedUsers.customer.name,
          env.seedUsers.customer.email,
          customerPass,
          env.seedUsers.customer.phone,
          'customer',
        ]
      )
      console.log('✅ Seeded demo customer in MySQL')
    }

    // 5. Seed / Sync Electronics Categories
    const [categoryRows] = await dbConnection.query('SELECT COUNT(*) as count FROM categories')
    if (categoryRows[0].count === 0) {
      for (const cat of catalogCategories) {
        await dbConnection.execute(
          'INSERT INTO categories (id, name, description, accent) VALUES (?, ?, ?, ?)',
          [cat.id, cat.name, cat.description, cat.accent || '']
        )
      }
    }

    // 6. Seed Coupons if empty
    const [couponRows] = await dbConnection.query('SELECT COUNT(*) as count FROM coupons')
    if (couponRows[0].count === 0) {
      const sampleCoupons = [
        ['AMANAT10', 'percentage', 10.0, 5000.0, 5000.0],
        ['SAVE15', 'percentage', 15.0, 10000.0, 8000.0],
        ['WELCOME20', 'percentage', 20.0, 15000.0, 10000.0],
        ['FLAT2000', 'fixed', 2000.0, 20000.0, null],
      ]
      for (const coupon of sampleCoupons) {
        await dbConnection.execute(
          'INSERT INTO coupons (code, discount_type, discount_value, min_spend, max_discount) VALUES (?, ?, ?, ?, ?)',
          coupon
        )
      }
      console.log('✅ Seeded promotional coupons in MySQL')
    }

    // 7. Seed Products if empty
    const [prodRows] = await dbConnection.query('SELECT COUNT(*) as count FROM products')
    if (prodRows[0].count === 0) {
      for (const prod of catalogProducts) {
        await dbConnection.execute(
          `INSERT INTO products 
           (id, name, slug, brand, category, description, price, original_price, rating, reviews, stock, badge, shipping, warranty, sku, image_url, images_json, specs_json, colors_json, featured, is_best_seller, is_new)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            null,
            prod.name,
            prod.slug,
            prod.brand,
            prod.category,
            prod.description || '',
            prod.price,
            prod.originalPrice || prod.price,
            prod.rating || 5.0,
            prod.reviews || 0,
            prod.stock || 10,
            prod.badge || 'New',
            prod.shipping || 'Delivery available',
            prod.warranty || 'Official warranty',
            prod.sku || `AMANAT-${prod.id}`,
            prod.images?.[0] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&h=900&q=80',
            JSON.stringify(prod.images || []),
            JSON.stringify(prod.specs || {}),
            JSON.stringify(prod.colors || ['Default']),
            prod.featured ? 1 : 0,
            prod.isBestSeller ? 1 : 0,
            prod.isNew ? 1 : 0,
          ]
        )
      }
      console.log(`✅ Seeded ${catalogProducts.length} catalog products in MySQL`)
    }

    await dbConnection.end()
    console.log('🚀 MySQL Database initialized successfully!')
    return true
  } catch (error) {
    console.warn(`⚠️ MySQL initialization notice: ${error.message}. Continuing in fallback mode.`)
    return false
  }
}
