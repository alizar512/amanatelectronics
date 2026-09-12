import { useState, useEffect } from 'react'
import { 
  FaUniversity, 
  FaMobileAlt, 
  FaWhatsapp, 
  FaSave, 
  FaSpinner, 
  FaCheckCircle, 
  FaInfoCircle, 
  FaShieldAlt, 
  FaEye, 
  FaUndoAlt,
  FaMoneyBillWave,
  FaCopy,
  FaCheck
} from 'react-icons/fa'
import { useToast } from '../../context/ToastContext'
import { fetchAdminPaymentSettings, updateAdminPaymentSettings } from '../../services/paymentService'

export default function AdminPaymentSettings() {
  const { showToast } = useToast()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [copiedKey, setCopiedKey] = useState(null)

  const [formData, setFormData] = useState({
    bankName: '',
    accountTitle: '',
    accountNumber: '',
    iban: '',
    branch: '',
    raastId: '',
    whatsappNumber: '',
    formattedWhatsapp: '',
    instructions: '',
    isCodEnabled: true,
    isBankTransferEnabled: true,
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const data = await fetchAdminPaymentSettings()
      if (data) {
        setFormData({
          bankName: data.bankName || '',
          accountTitle: data.accountTitle || '',
          accountNumber: data.accountNumber || '',
          iban: data.iban || '',
          branch: data.branch || '',
          raastId: data.raastId || '',
          whatsappNumber: data.whatsappNumber || '',
          formattedWhatsapp: data.formattedWhatsapp || '',
          instructions: data.instructions || '',
          isCodEnabled: data.isCodEnabled ?? true,
          isBankTransferEnabled: data.isBankTransferEnabled ?? true,
        })
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load payment settings', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await updateAdminPaymentSettings(formData)
      showToast(res.message || 'Payment details updated successfully!', 'success')
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update payment settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleCopy = (text, key) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <FaSpinner className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Payment & Bank Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Configure official bank accounts, Raast ID, WhatsApp proof submission, and customer instructions shown during checkout.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadSettings}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <FaUndoAlt size={12} /> Reload
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Form Settings */}
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-7">
          {/* Methods Availability */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaMoneyBillWave className="text-blue-600" /> Checkout Payment Options
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Cash on Delivery (COD)</p>
                  <p className="text-xs text-slate-500">Allow customers to pay upon parcel delivery</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isCodEnabled}
                  onChange={(e) => handleChange('isCodEnabled', e.target.checked)}
                  className="h-5 w-5 rounded text-blue-600"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Bank Transfer / Raast</p>
                  <p className="text-xs text-slate-500">Allow direct account deposits and instant Raast transfers</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isBankTransferEnabled}
                  onChange={(e) => handleChange('isBankTransferEnabled', e.target.checked)}
                  className="h-5 w-5 rounded text-blue-600"
                />
              </label>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaUniversity className="text-blue-600" /> Official Bank Account
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Bank Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meezan Bank Limited"
                  value={formData.bankName}
                  onChange={(e) => handleChange('bankName', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Account Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amanat Electronics"
                  value={formData.accountTitle}
                  onChange={(e) => handleChange('accountTitle', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Account Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 02010108923456"
                  value={formData.accountNumber}
                  onChange={(e) => handleChange('accountNumber', e.target.value)}
                  className="mt-1.5 w-full font-mono rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  IBAN Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PK76MEZN0002010108923456"
                  value={formData.iban}
                  onChange={(e) => handleChange('iban', e.target.value)}
                  className="mt-1.5 w-full font-mono rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm uppercase focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Branch / City Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Main Market Branch, Faisalabad"
                  value={formData.branch}
                  onChange={(e) => handleChange('branch', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Raast & WhatsApp Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaMobileAlt className="text-emerald-600" /> Raast & WhatsApp Verification
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Raast ID / Registered Mobile *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 03007654321"
                  value={formData.raastId}
                  onChange={(e) => handleChange('raastId', e.target.value)}
                  className="mt-1.5 w-full font-mono rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <span className="mt-1 block text-[11px] text-slate-500">
                  Used for instant 0% fee payments from EasyPaisa, JazzCash, and banking apps.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  WhatsApp Number (with Country Code) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +923007654321"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  className="mt-1.5 w-full font-mono rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <span className="mt-1 block text-[11px] text-slate-500">
                  WhatsApp where customers send payment receipts/screenshots.
                </span>
              </div>
            </div>
          </div>

          {/* Customer Instruction Text */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" /> Customer Popup Instructions
            </h2>
            <p className="text-xs text-slate-500 mb-3">
              This message appears prominently in the popup and on the checkout page when Bank Transfer is selected.
            </p>
            <textarea
              rows={4}
              value={formData.instructions}
              onChange={(e) => handleChange('instructions', e.target.value)}
              placeholder="Instructions for the client..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm leading-relaxed focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </form>

        {/* Right Column: Live Customer Preview */}
        <div className="space-y-4 lg:col-span-5">
          <div className="sticky top-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <FaEye /> Live Customer Preview
              </span>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-semibold text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                What clients will see
              </span>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Bank Transfer & Raast
                </span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Active Details
                </span>
              </div>

              {/* Instructions Box */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-3.5 text-xs dark:border-blue-900/50 dark:bg-blue-950/40">
                <p className="font-semibold text-blue-950 dark:text-blue-100 mb-1">
                  Payment Instructions:
                </p>
                <p className="text-blue-900 dark:text-blue-200 leading-relaxed text-[11px]">
                  {formData.instructions || 'No instructions provided.'}
                </p>
              </div>

              {/* Sample Order Reference */}
              <div className="flex items-center justify-between rounded-xl bg-slate-100 p-3 text-xs dark:bg-slate-800">
                <div>
                  <span className="text-slate-500">Order Reference:</span>
                  <p className="font-bold text-blue-600 dark:text-blue-400">#AMANAT-2026-1002</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('AMANAT-2026-1002', 'sample_ref')}
                  className="flex items-center gap-1 rounded bg-white px-2 py-1 text-[11px] shadow-sm dark:bg-slate-700"
                >
                  {copiedKey === 'sample_ref' ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
                  {copiedKey === 'sample_ref' ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Bank Card Preview */}
              <div className="rounded-2xl border border-slate-200 p-3.5 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <FaUniversity className="text-blue-600" /> {formData.bankName || 'Bank Name'}
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Account Title:</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {formData.accountTitle || 'Account Title'}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Account Number:</span>
                  <p className="font-mono font-bold text-slate-900 dark:text-white">
                    {formData.accountNumber || '00000000000000'}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">IBAN:</span>
                  <p className="font-mono text-[10px] font-bold text-slate-900 dark:text-white break-all">
                    {formData.iban || 'PK00XXXX0000000000000000'}
                  </p>
                </div>
              </div>

              {/* Raast Card Preview */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-3.5 dark:border-emerald-900/40 dark:bg-emerald-950/20 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300">
                  <FaMobileAlt className="text-emerald-600" /> Raast ID (Instant Transfer)
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 text-[11px]">Registered Mobile / Raast:</span>
                    <p className="font-mono font-bold text-slate-900 dark:text-white">
                      {formData.raastId || '03000000000'}
                    </p>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                    0% Fee
                  </span>
                </div>
              </div>

              {/* WhatsApp Button Preview */}
              <div className="pt-2">
                <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 p-2.5 text-xs font-semibold text-white shadow-sm">
                  <FaWhatsapp size={15} /> Send Receipt on WhatsApp ({formData.whatsappNumber || '+92 300 0000000'})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
