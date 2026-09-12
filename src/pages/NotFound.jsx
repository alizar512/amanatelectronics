// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-slate-700 dark:text-slate-300">
          Page Not Found
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}