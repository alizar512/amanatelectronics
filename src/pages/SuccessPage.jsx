import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { Button } from '../components/common/Button'
import { formatCurrency } from '../utils/format'
import { BankTransferModal, DEFAULT_BANK_DETAILS } from '../components/commerce/BankTransferModal'
import { fetchPublicPaymentSettings } from '../services/paymentService'
import { FaUniversity, FaWhatsapp, FaInfoCircle, FaCheckCircle } from 'react-icons/fa'

export default function SuccessPage() {
  const location = useLocation()
  const order = location.state?.order

  const isBankTransfer =
    order?.paymentMethod === 'Direct Bank Transfer / Raast' ||
    order?.paymentMethod?.toLowerCase().includes('bank')

  const [bankSettings, setBankSettings] = useState(DEFAULT_BANK_DETAILS)
  const [showBankModal, setShowBankModal] = useState(isBankTransfer)

  useEffect(() => {
    let isMounted = true
    fetchPublicPaymentSettings()
      .then((data) => {
        if (isMounted && data) {
          setBankSettings((prev) => ({ ...prev, ...data }))
        }
      })
      .catch(() => {
        // Fallback gracefully
      })
    return () => {
      isMounted = false
    }
  }, [])

  const whatsappMessage = encodeURIComponent(
    `Hello Amanat Electronics! I have placed order #${
      order?.orderNumber || ''
    } for ${order?.total ? formatCurrency(order.total) : ''}. Name: ${
      order?.customerName || ''
    }. Here is my payment transfer receipt:`
  )

  const cleanWhatsappNumber = (bankSettings.whatsappNumber || '+923007654321').replace(/[^\d]/g, '')
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="container-shell section-gap">
      <Seo title="Order success" description="Your order has been placed successfully." />
      <div className="surface mx-auto max-w-2xl p-6 text-center sm:p-10">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          <FaCheckCircle /> Order Placed Successfully
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          Thank you for your order!
        </h1>

        {order ? (
          <div className="my-6 rounded-2xl bg-slate-50 p-5 text-left dark:bg-slate-900/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
              <span className="text-sm text-slate-500">Order Number</span>
              <strong className="text-base text-blue-600 dark:text-blue-400">#{order.orderNumber}</strong>
            </div>

            <div className="grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <span className="text-slate-500">Recipient:</span>{' '}
                <strong className="text-slate-900 dark:text-white">{order.customerName}</strong>
              </div>
              <div>
                <span className="text-slate-500">Contact:</span>{' '}
                <span className="text-slate-700 dark:text-slate-300">{order.customerPhone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500">Delivery Address:</span>{' '}
                <span className="text-slate-700 dark:text-slate-300">
                  {order.shippingAddress}, {order.shippingCity}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between border-t border-slate-200 pt-3 text-base font-bold dark:border-slate-800">
              <span className="text-slate-900 dark:text-white">Amount Due ({order.paymentMethod})</span>
              <span className="text-slate-950 dark:text-white">{formatCurrency(order.total)}</span>
            </div>

            {/* Bank Transfer / Raast Notice Box on Success Page */}
            {isBankTransfer ? (
              <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50/90 p-4 text-xs dark:border-blue-900/60 dark:bg-blue-950/40">
                <div className="flex items-start gap-2.5">
                  <FaInfoCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <div className="space-y-2 text-blue-950 dark:text-blue-200">
                    <p className="font-bold text-sm">Action Required: Complete Bank Transfer / Raast Payment</p>
                    <p className="leading-relaxed">
                      {bankSettings.instructions || DEFAULT_BANK_DETAILS.instructions}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2 pt-2 border-t border-blue-200 dark:border-blue-900/50">
                      <button
                        type="button"
                        onClick={() => setShowBankModal(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                      >
                        <FaUniversity /> View Bank & Raast Details Popup
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
                      >
                        <FaWhatsapp /> Send Receipt on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200">
                <p className="font-semibold">💵 Cash on Delivery (COD) Selected</p>
                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  Please keep exact cash ready upon delivery. Our logistics partner will deliver your parcel in 2–4 business days.
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            A confirmation email and delivery details are on the way. Most deliveries arrive within 2 to 4 working days across Pakistan.
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
          <Link to="/">
            <Button variant="ghost">Return Home</Button>
          </Link>
        </div>
      </div>

      {order && (
        <BankTransferModal
          isOpen={showBankModal}
          onClose={() => setShowBankModal(false)}
          orderNumber={order.orderNumber}
          total={order.total}
          customerName={order.customerName}
        />
      )}
    </div>
  )
}
