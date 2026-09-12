import { useState } from 'react'
import { IoLocationOutline, IoNavigateOutline, IoTimeOutline, IoMailOutline } from 'react-icons/io5'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { Seo } from '../components/common/Seo'
import { submitInquiry } from '../services/orderService'
import { useToast } from '../context/ToastContext'

const mapQuery = 'Amanat Electronics Faisalabad'
const embeddedMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`
const liveMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`

const storeHighlights = [
  {
    title: 'Live map access',
    description: 'Customers can open the shop location directly in Google Maps for fast navigation.',
    icon: IoLocationOutline,
  },
  {
    title: 'Quick directions',
    description: 'One tap opens turn-by-turn directions on mobile or desktop devices.',
    icon: IoNavigateOutline,
  },
  {
    title: 'Visit planning',
    description: 'Use the map page before pickup, exchange visits, or in-store product viewing.',
    icon: IoTimeOutline,
  },
]

export default function LocationPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !message) {
      showToast('Please fill in your name, email, and message', 'error')
      return
    }

    setSubmitting(true)
    try {
      const res = await submitInquiry({ name, email, phone, subject, message })
      showToast(res.message, 'success')
      setName('')
      setEmail('')
      setPhone('')
      setSubject('')
      setMessage('')
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to submit inquiry', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Seo
        title="Location & Contact"
        description="View the live shop location, open directions, or send an inquiry to Amanat Electronics."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Store',
          name: 'Amanat Electronics',
          hasMap: liveMapUrl,
        }}
      />
      <section className="section-gap">
        <div className="container-shell">
          <Breadcrumbs items={[{ label: 'Location & Contact' }]} />
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="surface p-8">
              <p className="chip">Visit the shop</p>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
                See the live store location before you visit.
              </h1>
              <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300">
                Open the shop on Google Maps, check the area visually, and launch directions in one step.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={liveMapUrl} target="_blank" rel="noreferrer">
                  <Button>Open live location</Button>
                </a>
                <a href={liveMapUrl} target="_blank" rel="noreferrer">
                  <Button variant="ghost">Get directions</Button>
                </a>
              </div>
              <div className="mt-8 space-y-4">
                {storeHighlights.map(({ title, description, icon: Icon }) => (
                  <article
                    key={title}
                    className="rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm dark:border-white/10 dark:from-slate-900 dark:to-slate-950"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-300">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-slate-950 dark:text-white">{title}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="surface overflow-hidden p-3">
              <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-100 dark:border-white/10 dark:bg-slate-900">
                <iframe
                  title="Amanat Electronics live location"
                  src={embeddedMapUrl}
                  className="h-[620px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Contact Inquiry Section */}
          <div className="surface mt-12 p-8 sm:p-12">
            <div className="max-w-2xl">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 mb-4">
                <IoMailOutline size={22} />
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Have a question? Send us a message.
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Our sales and customer support representatives usually respond within 2-4 business hours.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
              <Input placeholder="Your Full Name *" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input placeholder="Email Address *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input placeholder="Phone Number (Optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message, quotation request, or product inquiry here... *"
                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white md:col-span-2"
              />
              <div className="md:col-span-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Sending Message...' : 'Send Inquiry'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
