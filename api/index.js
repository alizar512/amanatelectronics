import { createApp } from '../server/app.js'
import { getStoreState } from '../server/store/storageEngine.js'

// Initialize state in serverless runtime
getStoreState()

const app = createApp()

export default function handler(req, res) {
  // Ensure req.url starts with /api because routes in server/app.js are mounted under /api
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url)
  }
  return app(req, res)
}
