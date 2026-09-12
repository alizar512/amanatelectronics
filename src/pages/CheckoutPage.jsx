import { useEffect, useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { useCustomerAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { Seo } from '../components/common/Seo'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { formatCurrency } from '../utils/format'
import { placeOrder, validateCoupon } from '../services/orderService'
import { fetchPublicPaymentSettings } from '../services/paymentService'
import { BankTransferModal, DEFAULT_BANK_DETAILS } from '../components/commerce/BankTransferModal'

const steps = ['Address', 'Shipping', 'Payment', 'Review']

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, cartSubtotal, clearCart } = useStore()
  const { user } = useCustomerAuth()
  const { showToast } = useToast()

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showBankModal, setShowBankModal] = useState(false)
  const [paymentSettings, setPaymentSettings] = useState(DEFAULT_BANK_DETAILS)

  // Form Fields
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('Faisalabad')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
  const [notes, setNotes] = useState('')

  // Coupon State
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [validatingCoupon, setValidatingCoupon] = useState(false)

  // Fetch payment settings from server
  useEffect(() => {
    fetchPublicPaymentSettings()
      .then((data) => {
        if (data) {
          setPaymentSettings((prev) => ({ ...prev, ...data }))
        }
      })
      .catch(() => {})
  }, [])

  // Prepopulate customer details if logged in
  useEffect(() => {
    if (user) {
      if (user.name) setFullName(user.name)
      if (user.email) setEmail(user.email)
      if (user.phone) setPhone(user.phone)
    }
  }, [user])

  const shippingFee = useMemo(() => (cartSubtotal > 100000 ? 0 : 2500), [cartSubtotal])
  const tax = useMemo(() => Math.round(cartSubtotal * 0.05), [cartSubtotal])
  const discount = appliedCoupon?.discount || 0
  const total = useMemo(
    () => Math.max(0, cartSubtotal + shippingFee + tax - discount),
    [cartSubtotal, shippingFee, tax, discount]
  )

  const handleApplyCoupon = async (e) => {
    e.preventDefault()
    if (!couponCode.trim()) return

    setValidatingCoupon(true)
    try {
      const result = await validateCoupon(couponCode, cartSubtotal)
      setAppliedCoupon(result)
      showToast(result.message, 'success')
    } catch (err) {
      showToast(err.response?.data?.message || 'Invalid coupon code', 'error')
      setAppliedCoupon(null)
    } finally {
      setValidatingCoupon(false)
    }
  }

  const handleNext = async () => {
    setError('')

    if (step === 0) {
      if (!fullName || !phone || !email || !city || !address) {
        setError('Please fill in all shipping details')
        return
      }
    }

    if (step === steps.length - 1) {
      if (!cart.length) {
        showToast('Your cart is empty', 'error')
        navigate('/shop')
        return
      }

      setLoading(true)
      try {
        const orderPayload = {
          customerName: fullName,
          customerEmail: email,
          customerPhone: phone,
          shippingCity: city,
          shippingAddress: address,
          paymentMethod,
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            color: item.selectedColor || 'Default',
            image: item.images?.[0] || item.image,
          })),
          couponCode: appliedCoupon?.code || null,
          notes,
        }

        const placed = await placeOrder(orderPayload)
        clearCart()
        showToast('Order placed successfully!', 'success')
        navigate('/order/success', { state: { order: placed } })
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to place order. Please try again.')
      } finally {
        setLoading(false)
      }
      return
    }

    setStep((current) => current + 1)
  }

  if (!cart.length && step === 0) {
    return (
      <div className="section-gap">
        <div className="container-shell text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your Cart is Empty</h1>
          <p className="mt-2 text-slate-500">Add products to your cart before proceeding to checkout.</p>
          <Link to="/shop" className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white">
            Explore Catalog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="section-gap">
      <Seo title="Checkout" description="Complete a multi-step checkout with address, shipping, payment, and review." />
      <div className="container-shell">
        <Breadcrumbs items={[{ label: 'Checkout' }]} />

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="surface p-6 sm:p-8">
            <div className="mb-8 flex flex-wrap gap-3 text-sm">
              {steps.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => index < step && setStep(index)}
                  className={`rounded-full px-4 py-2 font-medium transition-all ${
                    index === step
                      ? 'bg-blue-600 text-white shadow-md'
                      : index < step
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                        : 'border border-slate-200 text-slate-400 dark:border-slate-800'
                  }`}
                >
                  {index + 1}. {label}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-6 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Step 0: Address */}
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Shipping Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  <Input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  <Input placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Input placeholder="City (e.g., Faisalabad, Lahore, Karachi)" value={city} onChange={(e) => setCity(e.target.value)} required />
                  <Input placeholder="Complete street address, house/floor number" value={address} onChange={(e) => setAddress(e.target.value)} className="md:col-span-2" required />
                </div>
              </div>
            )}

            {/* Step 1: Shipping Method */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Delivery Options</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between rounded-2xl border border-blue-500/40 bg-blue-50/50 p-4 dark:bg-blue-900/20">
                    <div className="flex items-center gap-3">
                      <input type="radio" checked readOnly className="text-blue-600" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Express Insured Courier</p>
                        <p className="text-xs text-slate-500">Delivered within 2-4 business days across Pakistan</p>
                      </div>
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {shippingFee === 0 ? 'Free' : formatCurrency(shippingFee)}
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Payment Method</h3>
                <div className="space-y-3">
                  {['Cash on Delivery', 'Direct Bank Transfer / Raast'].map((method) => (
                    <label
                      key={method}
                      onClick={() => {
                        setPaymentMethod(method)
                        if (method === 'Direct Bank Transfer / Raast') {
                          setShowBankModal(true)
                        }
                      }}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-colors ${
                        paymentMethod === method
                          ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-900/20'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === method}
                          onChange={() => {
                            setPaymentMethod(method)
                            if (method === 'Direct Bank Transfer / Raast') {
                              setShowBankModal(true)
                            }
                          }}
                          className="text-blue-600"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{method}</p>
                          <p className="text-xs text-slate-500">
                            {method === 'Cash on Delivery'
                              ? 'Pay securely with cash upon delivery at your doorstep'
                              : 'Official bank account & Raast ID details provided with payment instructions'}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'Direct Bank Transfer / Raast' && (
                  <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 text-xs dark:border-blue-900/50 dark:bg-blue-950/30">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-blue-950 dark:text-blue-200">
                          📌 Bank Transfer & Raast Instruction:
                        </p>
                        <p className="mt-1 text-blue-900 dark:text-blue-300">
                          {paymentSettings.instructions || DEFAULT_BANK_DETAILS.instructions}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowBankModal(true)}
                        className="shrink-0 rounded-lg bg-blue-600 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-blue-700"
                      >
                        View Bank Details
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Order notes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special instructions for delivery or packaging..."
                    className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Review & Confirm</h3>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-900 space-y-2">
                  <p><span className="text-slate-500">Recipient:</span> <strong className="text-slate-900 dark:text-white">{fullName}</strong> ({phone})</p>
                  <p><span className="text-slate-500">Destination:</span> <strong className="text-slate-900 dark:text-white">{address}, {city}</strong></p>
                  <p><span className="text-slate-500">Payment:</span> <strong className="text-slate-900 dark:text-white">{paymentMethod}</strong></p>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              {step > 0 && (
                <Button variant="ghost" onClick={() => setStep((current) => current - 1)} disabled={loading}>
                  Back
                </Button>
              )}
              <Button onClick={handleNext} disabled={loading}>
                {loading ? 'Processing order...' : step === steps.length - 1 ? 'Place Order' : 'Continue'}
              </Button>
            </div>
          </section>

          {/* Sidebar Summary */}
          <aside className="surface h-fit p-6 space-y-6">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Order Summary</h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between gap-3 py-3">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code (e.g. AMANAT10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs uppercase focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={validatingCoupon || !couponCode}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-900"
              >
                {validatingCoupon ? '...' : 'Apply'}
              </button>
            </form>

            <div className="space-y-2 border-t pt-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : formatCurrency(shippingFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (5%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-4 text-lg font-bold text-slate-950 dark:text-white">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <BankTransferModal
        isOpen={showBankModal}
        onClose={() => setShowBankModal(false)}
        total={total}
        customerName={fullName}
      />
    </div>
  )
}
