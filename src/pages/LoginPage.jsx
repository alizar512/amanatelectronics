import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Input } from '../components/common/Input'
import { Button } from '../components/common/Button'
import { AuthPageShell } from './AuthPageShell'
import { useCustomerAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useCustomerAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      await login(email, password)
      showToast('Logged in successfully!', 'success')
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthPageShell
      title="Welcome back"
      description="Sign in to continue your premium storefront journey."
      alternateText="Need an account?"
      alternateLabel="Create one"
      alternateLink="/register"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <Input
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between text-sm text-slate-500">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-slate-300" /> Keep me signed in
          </label>
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>

        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-center text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          Demo Customer: <span className="font-semibold text-slate-700 dark:text-slate-200">customer@amanat.local</span> / <span className="font-semibold text-slate-700 dark:text-slate-200">Customer123!</span>
        </div>
      </form>
    </AuthPageShell>
  )
}
