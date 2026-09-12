import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: Number(process.env.PORT || 8787),
  jwtSecret: process.env.JWT_SECRET || 'amanat-electronics-dev-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  mysql: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'amanat_electronics',
  },
  seedUsers: {
    admin: {
      name: process.env.ADMIN_NAME || 'Amanat Admin',
      email: process.env.ADMIN_EMAIL || 'admin@amanat.local',
      password: process.env.ADMIN_PASSWORD || 'Admin123!',
    },
    manager: {
      name: process.env.MANAGER_NAME || 'Store Manager',
      email: process.env.MANAGER_EMAIL || 'manager@amanat.local',
      password: process.env.MANAGER_PASSWORD || 'Manager123!',
    },
    customer: {
      name: 'Demo Customer',
      email: 'customer@amanat.local',
      password: 'Customer123!',
      phone: '+92 300 1234567',
    },
  },
}
