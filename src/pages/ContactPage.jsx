import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { SectionHeading } from '../components/common/SectionHeading'
import { useToast } from '../context/ToastContext'
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaWhatsapp, 
  FaBuilding, 
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa'

export default function ContactPage() {
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    showToast('Thank you for contacting Amanat Electronics! We will get back to you shortly.', 'success')
  }

  return (
    <div className="section-gap">
      <Seo
        title="Contact Us"
        description="Get in touch with Amanat Electronics for appliance orders, dealer inquiries, showroom visits, and support."
      />
      <div className="container-shell">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Amanat Electronics"
          description="Have questions about product availability, bulk ordering, or showroom visits? Contact our sales & support team today."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Details Card */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FaBuilding className="text-blue-600" /> Head Showroom
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Main Electronics Market</strong>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Amanat Electronics, Main Commercial Boulevard, Lahore, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Phone Support</strong>
                    <p className="text-xs text-slate-500 dark:text-slate-400">0300-1234567 / 042-37123456</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaWhatsapp className="h-4 w-4 shrink-0 text-emerald-500" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">WhatsApp Orders</strong>
                    <p className="text-xs text-slate-500 dark:text-slate-400">0300-1234567 (24/7)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaEnvelope className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Email Inquiries</strong>
                    <p className="text-xs text-slate-500 dark:text-slate-400">sales@amanatelectronics.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaClock className="mt-1 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Business Hours</strong>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Mon - Sat: 10:00 AM - 10:00 PM</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Sunday: 02:00 PM - 09:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                <Link
                  to="/location"
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  <FaMapMarkerAlt /> View Location & Showroom Map
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Send Us a Direct Message</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Our sales and corporate team will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 p-8 text-center dark:bg-emerald-950/30">
                <FaCheckCircle className="h-12 w-12 text-emerald-500 mb-3" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Thank you for reaching out, {name}. A representative will be in touch with you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setMessage('')
                  }}
                  className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ali Khan"
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

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
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Product inquiry, wholesale, etc."
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what product or service you're interested in..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-xl"
                >
                  <FaPaperPlane /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
