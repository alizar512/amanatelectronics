import { useState } from 'react'
import { Seo } from '../components/common/Seo'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { SectionHeading } from '../components/common/SectionHeading'
import { useToast } from '../context/ToastContext'
import { 
  FaHeadset, 
  FaShieldAlt, 
  FaQuestionCircle, 
  FaWrench, 
  FaPhoneAlt, 
  FaWhatsapp, 
  FaEnvelope, 
  FaCheckCircle,
  FaChevronDown
} from 'react-icons/fa'

const FAQS = [
  {
    q: 'How do I claim official warranty for PEL appliances?',
    a: 'All our PEL appliances come with official manufacturer warranty cards inside the box. You can either call our customer support helpline with your invoice number or contact PEL official toll-free service centers directly.',
  },
  {
    q: 'What is the delivery timeline for home appliances?',
    a: 'In major cities (Lahore, Karachi, Islamabad/Rawalpindi), same-day or next-day delivery is available with doorstep verification. Other regional locations typically take 2-4 business days.',
  },
  {
    q: 'Do you offer installation services for Air Conditioners & Appliances?',
    a: 'Yes, certified technician installation is available upon request during checkout or by calling our customer support helpline right after placing your order.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'We accept Cash on Delivery (COD), Direct Bank Transfer, Visa/MasterCard, and installment plans on supported commercial bank credit cards.',
  },
  {
    q: 'Can I inspect the appliance before making payment?',
    a: 'Absolutely! Doorstep box inspection is supported so you can confirm intact factory seals and original packaging before accepting delivery.',
  },
]

export default function SupportPage() {
  const { showToast } = useToast()
  const [openFaq, setOpenFaq] = useState(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState('Warranty Claim')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    showToast('Your support inquiry has been submitted! Our team will contact you shortly.', 'success')
  }

  return (
    <div className="section-gap">
      <Seo
        title="Customer Support & Warranty"
        description="Get help with orders, warranty claims, appliance installation, and service inquiries from Amanat Electronics."
      />
      <div className="container-shell">
        <Breadcrumbs items={[{ label: 'Support' }]} />

        <SectionHeading
          eyebrow="Help & Assistance"
          title="Customer Support & Warranty Services"
          description="We are here to assist you with order status, official warranty registration, technician bookings, and technical queries."
        />

        {/* Quick Contact Cards */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="tel:+923001234567"
            className="group flex flex-col items-center rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
              <FaPhoneAlt size={20} />
            </div>
            <h3 className="mt-4 font-bold text-slate-900 dark:text-white">Helpline</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">0300-1234567 / 042-37123456</p>
            <span className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400">Call Now →</span>
          </a>

          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col items-center rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-emerald-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:scale-110 dark:bg-emerald-900/30 dark:text-emerald-400">
              <FaWhatsapp size={22} />
            </div>
            <h3 className="mt-4 font-bold text-slate-900 dark:text-white">WhatsApp Chat</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Instant chat & order tracking</p>
            <span className="mt-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400">Message on WhatsApp →</span>
          </a>

          <div className="flex flex-col items-center rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <FaShieldAlt size={22} />
            </div>
            <h3 className="mt-4 font-bold text-slate-900 dark:text-white">Warranty Claim</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Official PEL warranty coverage</p>
            <span className="mt-3 text-xs font-semibold text-purple-600 dark:text-purple-400">10-Year Compressor Guarantee</span>
          </div>

          <div className="flex flex-col items-center rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <FaWrench size={22} />
            </div>
            <h3 className="mt-4 font-bold text-slate-900 dark:text-white">Technician Booking</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">AC installation & maintenance</p>
            <span className="mt-3 text-xs font-semibold text-amber-600 dark:text-amber-400">Verified Pros</span>
          </div>
        </div>

        {/* Form and FAQs Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* FAQ Accordion */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <FaQuestionCircle className="text-blue-600" /> Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-slate-800 dark:text-slate-200"
                    >
                      <span>{faq.q}</span>
                      <FaChevronDown
                        className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-slate-200/60 px-4 py-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Support Ticket / Inquiry Form */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <FaHeadset className="text-blue-600" /> Request Support or Installation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Fill out this form and our support representative will call you back within 2 business hours.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 p-8 text-center dark:bg-emerald-950/30">
                <FaCheckCircle className="h-12 w-12 text-emerald-500 mb-3" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Inquiry Received!</h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Thank you for reaching out. We have logged ticket reference #TK-{Math.floor(10000 + Math.random() * 90000)}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setMessage('')
                  }}
                  className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Muhammad Usman"
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Inquiry Type *
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Warranty Claim">Warranty Claim</option>
                      <option value="AC Installation Request">AC Installation Request</option>
                      <option value="Order Tracking">Order Tracking</option>
                      <option value="Appliance Repair">Appliance Repair</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Message / Appliance Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe model name, purchase invoice number, or issue..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Submit Support Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
