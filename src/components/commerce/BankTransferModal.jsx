import { useState, useEffect } from 'react'
import { Modal } from '../common/Modal'
import { formatCurrency } from '../../utils/format'
import { fetchPublicPaymentSettings } from '../../services/paymentService'
import { 
  FaUniversity, 
  FaCopy, 
  FaCheck, 
  FaWhatsapp, 
  FaMobileAlt, 
  FaInfoCircle,
  FaShieldAlt
} from 'react-icons/fa'

export const DEFAULT_BANK_DETAILS = {
  bankName: 'Meezan Bank Limited',
  accountTitle: 'Amanat Electronics',
  accountNumber: '02010108923456',
  iban: 'PK76MEZN0002010108923456',
  branch: 'Main Market Branch, Faisalabad',
  raastId: '03007654321',
  whatsappNumber: '+923007654321',
  formattedWhatsapp: '+92 300 7654321',
  instructions:
    'The customer receives the official Amanat Electronics bank account / Raast ID details along with their order summary. The customer transfers the exact order total from their bank app / EasyPaisa / JazzCash using the Order Number as the payment reference.',
}

export function BankTransferModal({
  isOpen,
  onClose,
  orderNumber = '',
  total = null,
  customerName = '',
}) {
  const [bankDetails, setBankDetails] = useState(DEFAULT_BANK_DETAILS)
  const [copiedKey, setCopiedKey] = useState(null)

  useEffect(() => {
    let isMounted = true
    fetchPublicPaymentSettings()
      .then((data) => {
        if (isMounted && data) {
          setBankDetails((prev) => ({ ...prev, ...data }))
        }
      })
      .catch(() => {
        // Fallback gracefully to default bank details
      })
    return () => {
      isMounted = false
    }
  }, [])

  const handleCopy = (text, key) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Amanat Electronics! I have placed order ${
      orderNumber ? `#${orderNumber}` : ''
    }${total ? ` for ${formatCurrency(total)}` : ''}.${
      customerName ? ` Name: ${customerName}.` : ''
    } Here is my payment transfer receipt:`
  )

  const cleanWhatsappNumber = (bankDetails.whatsappNumber || '+923007654321').replace(/[^\d]/g, '')
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${whatsappMessage}`

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Official Bank Transfer & Raast Details">
      <div className="space-y-6 text-slate-800 dark:text-slate-200">
        {/* Highlighted Notice */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-4 dark:border-blue-900/50 dark:bg-blue-950/40">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <div className="text-sm leading-relaxed text-blue-900 dark:text-blue-200">
              <p className="font-semibold text-blue-950 dark:text-blue-100">
                Payment Instructions:
              </p>
              <p className="mt-1">
                {bankDetails.instructions || DEFAULT_BANK_DETAILS.instructions}
              </p>
            </div>
          </div>
        </div>

        {/* Order Reference Badge if available */}
        {(orderNumber || total) && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-100 p-3.5 text-sm dark:bg-slate-800/70">
            {orderNumber && (
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Payment Reference:</span>
                <p className="font-bold text-blue-600 dark:text-blue-400">#{orderNumber}</p>
              </div>
            )}
            {total && (
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Exact Payable Total:</span>
                <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(total)}</p>
              </div>
            )}
            {orderNumber && (
              <button
                type="button"
                onClick={() => handleCopy(orderNumber, 'ref')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {copiedKey === 'ref' ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
                {copiedKey === 'ref' ? 'Reference Copied!' : 'Copy Reference'}
              </button>
            )}
          </div>
        )}

        {/* Bank & Raast Details Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Bank Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
            <div className="mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <FaUniversity className="h-5 w-5" />
              <h4 className="font-bold text-slate-900 dark:text-white">Direct Bank Transfer</h4>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-slate-500">Bank Name</span>
                <p className="font-semibold text-slate-900 dark:text-white">{bankDetails.bankName}</p>
              </div>

              <div>
                <span className="text-slate-500">Account Title</span>
                <p className="font-semibold text-slate-900 dark:text-white">{bankDetails.accountTitle}</p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Account Number</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(bankDetails.accountNumber, 'acc')}
                    className="text-blue-600 hover:underline dark:text-blue-400 flex items-center gap-1"
                  >
                    {copiedKey === 'acc' ? <FaCheck className="text-emerald-500" /> : <FaCopy size={10} />}
                    {copiedKey === 'acc' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="font-mono font-bold text-slate-900 dark:text-white">{bankDetails.accountNumber}</p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">IBAN Number</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(bankDetails.iban, 'iban')}
                    className="text-blue-600 hover:underline dark:text-blue-400 flex items-center gap-1"
                  >
                    {copiedKey === 'iban' ? <FaCheck className="text-emerald-500" /> : <FaCopy size={10} />}
                    {copiedKey === 'iban' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="font-mono text-[11px] font-bold text-slate-900 dark:text-white break-all">{bankDetails.iban}</p>
              </div>

              {bankDetails.branch && (
                <div>
                  <span className="text-slate-500">Branch</span>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{bankDetails.branch}</p>
                </div>
              )}
            </div>
          </div>

          {/* Raast / Digital Wallet Card */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <div className="mb-3 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <FaMobileAlt className="h-5 w-5" />
              <h4 className="font-bold text-slate-900 dark:text-white">Raast & Mobile Wallets</h4>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-slate-500">Compatible Wallets</span>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Raast ID, EasyPaisa, JazzCash, Nayapay, Sadapay
                </p>
              </div>

              <div>
                <span className="text-slate-500">Account Title</span>
                <p className="font-semibold text-slate-900 dark:text-white">{bankDetails.accountTitle}</p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Raast ID / Registered Mobile</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(bankDetails.raastId, 'raast')}
                    className="text-emerald-600 hover:underline dark:text-emerald-400 flex items-center gap-1"
                  >
                    {copiedKey === 'raast' ? <FaCheck className="text-emerald-500" /> : <FaCopy size={10} />}
                    {copiedKey === 'raast' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="font-mono font-bold text-slate-900 dark:text-white">{bankDetails.raastId}</p>
              </div>

              <div className="pt-2 text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400">
                  <FaShieldAlt /> 0% Transaction fees via Raast Instant Pay
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Guide */}
        <div className="rounded-2xl bg-slate-50 p-4 text-xs dark:bg-slate-900/60">
          <p className="font-bold text-slate-900 dark:text-white mb-2">How to complete your payment:</p>
          <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300">
            <li>Open your bank app, EasyPaisa, or JazzCash and select <strong>Transfer</strong>.</li>
            <li>Enter the <strong>IBAN</strong> or <strong>Raast ID</strong> above and transfer the exact total.</li>
            <li>In the description/purpose field, write your <strong>Order Number</strong>.</li>
            <li>Share your payment screenshot via WhatsApp for instant approval and courier dispatch.</li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
          >
            <FaWhatsapp size={16} /> Send Receipt on WhatsApp ({bankDetails.formattedWhatsapp || bankDetails.whatsappNumber})
          </a>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            I Understand / Close
          </button>
        </div>
      </div>
    </Modal>
  )
}
