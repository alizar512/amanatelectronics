import { createApp } from './app.js'
import { env } from './config/env.js'
import { initDatabase } from './database/initDb.js'
import { getStoreState } from './store/storageEngine.js'

const startServer = async () => {
  // Ensure store state is initialized
  getStoreState()

  // Try to initialize MySQL if configured
  await initDatabase()

  const app = createApp()

  app.listen(env.port, () => {
    console.log(`\n======================================================`)
    console.log(`🚀 Amanat Electronics Backend API is running!`)
    console.log(`📡 Local Server URL: http://localhost:${env.port}`)
    console.log(`🩺 Health check:      http://localhost:${env.port}/api/health`)
    console.log(`📦 Catalog:           http://localhost:${env.port}/api/products`)
    console.log(`======================================================\n`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
