import { useState } from 'react'
import { Input } from '../components/common/Input'
import { Button } from '../components/common/Button'
import { AuthPageShell } from './AuthPageShell'
import { forgotCustomerPassword } from '../services/authService'
import { useToast } from '../context/ToastContext'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      await forgotCustomerPassword(email)
      setSubmitted(true)
      showToast('Reset instructions sent to your email', 'success')
    } catch {
      showToast('If the email exists, instructions have been dispatched', 'info')
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthPageShell
      title="Reset password"
      description="Enter your email and we will send reset instructions."
      alternateText="Remembered your password?"
      alternateLabel="Sign in"
      alternateLink="/login"
    >
      {submitted ? (
        <div className="rounded-2xl bg-emerald-50 p-6 text-center text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
          <p className="font-semibold">Check your inbox</p>
          <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
            If an account exists for {email}, a recovery link has been dispatched.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send instructions'}
          </Button>
        </form>
      )}
    </AuthPageShell>
  )
}
