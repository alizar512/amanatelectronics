import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { SectionHeading } from '../components/common/SectionHeading'
import { 
  FaAward, 
  FaShieldAlt, 
  FaUsers, 
  FaUserTie,
  FaQuoteLeft
} from 'react-icons/fa'
import { getTeamMembers } from '../services/catalogService'

export default function AboutPage() {
  const [team, setTeam] = useState([])

  useEffect(() => {
    let mounted = true
    getTeamMembers()
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          setTeam(data)
        }
      })
      .catch((err) => console.error('Error fetching team members:', err))
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="section-gap">
      <Seo
        title="About Us - Amanat Electronics"
        description="Learn about Amanat Electronics, official partner and authorized dealer of PEL home appliances across Pakistan."
      />
      <div className="container-shell">
        <Breadcrumbs items={[{ label: 'About' }]} />

        {/* Hero Banner */}
        <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 text-white shadow-2xl sm:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2),transparent_35%)]" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block rounded-full bg-blue-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-300 backdrop-blur-sm">
              Official PEL Dealership
            </span>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">
              Powering Pakistani Homes with Premium Electronics
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Amanat Electronics is one of Pakistan's trusted authorized retail and wholesale partners for official PEL home appliances, bringing inverter technology, reliable cooling, and modern lifestyle appliances directly to your doorstep.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 sm:text-4xl">15+</p>
            <p className="mt-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Years in Business</p>
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 sm:text-4xl">50,000+</p>
            <p className="mt-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Happy Customers</p>
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 sm:text-4xl">100%</p>
            <p className="mt-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Original Certified</p>
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 sm:text-4xl">24/7</p>
            <p className="mt-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Customer Support</p>
          </div>
        </div>

        {/* Team Section (Displays only if admin has configured team members) */}
        {team.length > 0 && (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Team
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-7"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <div className="relative h-16 w-16 overflow-hidden rounded-full p-0.5 ring-2 ring-blue-500/30 bg-white dark:bg-slate-800 shadow-md">
                          <img
                            src={member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80'}
                            alt={member.name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          {member.name}
                        </h4>
                        <span className="inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    {member.about && (
                      <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {member.about}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Values */}
        <div className="mb-12">
          <SectionHeading
            eyebrow="Our Commitment"
            title="Why Pakistani Families Choose Amanat Electronics"
            description="We combine official factory pricing, complete warranty support, and reliable doorstep service."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-4">
                <FaAward size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Authorized PEL Partner</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Every unit we sell is sourced directly from certified manufacturing lines with original serial verification.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 mb-4">
                <FaShieldAlt size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Full Manufacturer Warranty</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                10-year compressor warranty, 1-year parts warranty, and official service center network access nationwide.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mb-4">
                <FaUsers size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Customer-Centric Care</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Dedicated WhatsApp order support, doorstep box inspection, and certified technician installation assistance.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-blue-600 p-8 text-white shadow-xl sm:flex-row sm:p-10">
          <div>
            <h3 className="text-xl font-bold sm:text-2xl">Ready to Upgrade Your Home Appliances?</h3>
            <p className="mt-1 text-xs text-blue-100 sm:text-sm">Explore our complete catalog or visit our showroom.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/shop"
              className="rounded-2xl bg-white px-6 py-3 text-xs font-semibold text-blue-600 shadow-md transition hover:bg-blue-50"
            >
              Browse Catalog
            </Link>
            <Link
              to="/location"
              className="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Showroom Map
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
