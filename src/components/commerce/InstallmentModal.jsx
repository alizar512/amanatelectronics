import { useState, useMemo } from 'react'
import { Modal } from '../common/Modal'
import { formatCurrency } from '../../utils/format'
import { 
  FaCalendarAlt, 
  FaPercent, 
  FaCheckCircle, 
  FaWhatsapp, 
  FaUniversity, 
  FaIdCard, 
  FaCalculator,
  FaShieldAlt,
  FaInfoCircle
} from 'react-icons/fa'

export function InstallmentModal({ isOpen, onClose, product }) {
  const [selectedMonths, setSelectedMonths] = useState(12)
  const [advancePercent, setAdvancePercent] = useState(
    product?.installmentAdvance !== undefined ? Number(product.installmentAdvance) : 20
  )

  const price = Number(product?.price || 0)

  // Calculations
  const calculations = useMemo(() => {
    const downPayment = Math.round((price * advancePercent) / 100)
    const remainingAmount = Math.max(0, price - downPayment)
    const monthlyPayment = Math.round(remainingAmount / selectedMonths)
    const totalPayable = downPayment + monthlyPayment * selectedMonths

    return {
      downPayment,
      remainingAmount,
      monthlyPayment,
      totalPayable,
    }
  }, [price, advancePercent, selectedMonths])

  const tenureOptions = [3, 6, 12, 18, 24]

  const whatsappMessage = encodeURIComponent(
    `Hello Amanat Electronics! I want to apply for the Installment Plan for "${
      product?.name
    }" (Rs ${price.toLocaleString()}).\nSelected Plan: ${selectedMonths} Months\nDown Payment: ${formatCurrency(
      calculations.downPayment
    )} (${advancePercent}%)\nEstimated Monthly: ${formatCurrency(
      calculations.monthlyPayment
    )}/month.\nPlease guide me on the next steps!`
  )

  const whatsappUrl = `https://wa.me/923007654321?text=${whatsappMessage}`

  if (!product) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Easy Installment Plans & EMI Calculator"
    >
      <div className="space-y-6 text-slate-800 dark:text-slate-200">
        {/* Product Snapshot */}
        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
          <div className="h-16 w-16 shrink-0 rounded-xl bg-white p-1 border border-slate-200 dark:border-slate-800">
            <img
              src={product.image || product.images?.[0]}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              {product.name}
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                {formatCurrency(price)}
              </span>
              {product.installmentMarkup && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {product.installmentMarkup}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Note / Partner Info from Admin */}
        {product.installmentNote && (
          <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-200 flex items-start gap-2.5">
            <FaInfoCircle className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
            <p className="leading-relaxed">
              <strong>Installment Terms:</strong> {product.installmentNote}
            </p>
          </div>
        )}

        {/* Interactive Calculator Controls */}
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <FaCalculator className="text-blue-600" /> Choose Your Installment Plan
          </h3>

          {/* 1. Select Tenure */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Select Tenure Duration:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {tenureOptions.map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => setSelectedMonths(months)}
                  className={`rounded-xl py-2.5 text-xs font-bold transition-all ${
                    selectedMonths === months
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 ring-2 ring-blue-600 ring-offset-1'
                      : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {months} Mo
                </button>
              ))}
            </div>
          </div>

          {/* 2. Select Down Payment */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Advance / Down Payment:
              </label>
              <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
                {advancePercent}% ({formatCurrency(calculations.downPayment)})
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[10, 20, 30, 40].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setAdvancePercent(pct)}
                  className={`rounded-xl py-2 text-xs font-semibold transition-all ${
                    advancePercent === pct
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {pct}% Advance
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Breakdown Result Card */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div>
                <span className="text-xs text-blue-100 uppercase tracking-wider font-semibold">
                  Monthly Installment (EMI)
                </span>
                <p className="text-2xl sm:text-3xl font-black mt-0.5">
                  {formatCurrency(calculations.monthlyPayment)}
                  <span className="text-sm font-normal text-blue-100"> / month</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-blue-100">Duration</span>
                <p className="text-base font-bold">{selectedMonths} Months</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-xs text-blue-100">
              <div>
                <span className="opacity-75 block text-[10px]">Advance Paid:</span>
                <strong className="text-white text-xs sm:text-sm">{formatCurrency(calculations.downPayment)}</strong>
              </div>
              <div>
                <span className="opacity-75 block text-[10px]">Total Financed:</span>
                <strong className="text-white text-xs sm:text-sm">{formatCurrency(calculations.remainingAmount)}</strong>
              </div>
              <div>
                <span className="opacity-75 block text-[10px]">Markup Rate:</span>
                <strong className="text-emerald-300 text-xs sm:text-sm">0% Markup</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Installment Options & Bank Partners */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Bank Credit Cards */}
          <div className="rounded-2xl border border-slate-200 p-4 text-xs dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <FaUniversity className="text-blue-600" /> Bank Credit Card EMI
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              Available instantly for credit card holders of:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Meezan Bank', 'Bank Alfalah', 'HBL', 'Faysal Bank', 'MCB', 'Silkbank'].map((bank) => (
                <span key={bank} className="rounded bg-white px-2 py-1 text-[11px] font-medium border border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                  {bank}
                </span>
              ))}
            </div>
          </div>

          {/* In-House Showroom Scheme */}
          <div className="rounded-2xl border border-slate-200 p-4 text-xs dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <FaIdCard className="text-emerald-600" /> Showroom Easy Scheme
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              No credit card? Get in-house installments with:
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400">
              <li>Original CNIC & Photocopies</li>
              <li>Utility Bill / Proof of Income</li>
              <li>1 Guarantor Verification</li>
            </ul>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition-colors"
          >
            <FaWhatsapp size={16} /> Apply for this Plan via WhatsApp
          </a>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}
