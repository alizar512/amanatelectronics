import mysql from 'mysql2/promise'
import { env } from './env.js'

let pool = null
let dbInitialized = false

export const isDbConfigured = () =>
  Boolean(env.mysql.host && env.mysql.user && env.mysql.database)

export const getDbPool = () => {
  if (!isDbConfigured()) return null

  if (!pool) {
    pool = mysql.createPool({
      host: env.mysql.host,
      port: env.mysql.port,
      user: env.mysql.user,
      password: env.mysql.password,
      database: env.mysql.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    })
  }

  return pool
}

export const getDbStatus = async () => {
  if (!isDbConfigured()) {
    return {
      configured: false,
      connected: false,
      mode: 'mock',
    }
  }

  try {
    const connectionPool = getDbPool()
    if (!connectionPool) {
      return { configured: true, connected: false, mode: 'mock' }
    }
    const [rows] = await connectionPool.query('SELECT 1 as ping')
    return {
      configured: true,
      connected: Boolean(rows),
      mode: 'mysql',
    }
  } catch (error) {
    return {
      configured: true,
      connected: false,
      mode: 'mock',
      error: error.message,
    }
  }
}

export const executeQuery = async (sql, params = []) => {
  const dbPool = getDbPool()
  if (!dbPool) return null
  const [results] = await dbPool.execute(sql, params)
  return results
}
