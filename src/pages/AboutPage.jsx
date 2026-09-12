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

const DEFAULT_TEAM = [
  {
    id: 1,
    name: 'Mian Amanat Ali',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&h=256&q=80',
    about: 'Our foundational philosophy has remained unchanged for over 15 years: transparency, genuine products, and uncompromising customer care. We ensure every Pakistani home receives 100% verified original PEL electronics backed by direct manufacturer warranty and honest pricing.',
    isExecutive: true,
  },
  {
    id: 2,
    name: 'Usman Amanat',
    role: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80',
    about: 'Overseeing nationwide logistics, showroom customer experience, and certified technician installation networks across Pakistan.',
    isExecutive: false,
  },
]

export default function AboutPage() {
  const [team, setTeam] = useState(DEFAULT_TEAM)

  useEffect(() => {
    let mounted = true
    getTeamMembers()
      .then((data) => {
        if (mounted && Array.isArray(data) && data.length > 0) {
          setTeam(data)
        }
      })
      .catch((err) => console.error('Error fetching team members:', err))
    return () => {
      mounted = false
    }
  }, [])

  const executiveMember = team.find((m) => m.isExecutive || m.role?.toLowerCase().includes('ceo')) || team[0]
  const otherMembers = team.filter((m) => m.id !== executiveMember?.id)

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

        {/* Team Section */}
        <div className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Team
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Featured Executive / CEO Card */}
            {executiveMember && (
              <div className="relative overflow-hidden rounded-3xl border-2 border-blue-500/30 bg-gradient-to-br from-white via-blue-50/40 to-slate-50 p-6 shadow-lg dark:border-blue-400/20 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 sm:p-8 lg:col-span-2">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="relative shrink-0 mx-auto sm:mx-0">
                    <div className="relative h-28 w-28 rounded-full p-1 ring-4 ring-blue-500/20 bg-white dark:bg-slate-800 shadow-lg">
                      <img
                        src={executiveMember.image || DEFAULT_TEAM[0].image}
                        alt={executiveMember.name}
                        className="h-full w-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = DEFAULT_TEAM[0].image
                        }}
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md ring-2 ring-white dark:ring-slate-900">
                      <FaUserTie size={13} />
                    </span>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{executiveMember.name}</h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        <FaUserTie className="h-3 w-3" /> {executiveMember.role}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                      {executiveMember.role} — Amanat Electronics
                    </p>

                    {executiveMember.about && (
                      <div className="relative mt-4 rounded-2xl bg-white/90 p-4 text-left border border-slate-200/70 shadow-sm dark:bg-slate-800/90 dark:border-slate-700/70">
                        <FaQuoteLeft className="absolute right-3 top-3 text-slate-200 dark:text-slate-700" size={24} />
                        <p className="relative text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                          "{executiveMember.about}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Other Team Members */}
            {otherMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <div className="relative h-16 w-16 rounded-full p-0.5 ring-2 ring-emerald-500/30 bg-white dark:bg-slate-800 shadow-md">
                        <img
                          src={member.image || DEFAULT_TEAM[1].image}
                          alt={member.name}
                          className="h-full w-full rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = DEFAULT_TEAM[1].image
                          }}
                        />
                      </div>
                      <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] shadow ring-2 ring-white dark:ring-slate-900">
                        <FaShieldAlt size={10} />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{member.name}</h4>
                      <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
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

                <div className="mt-6 border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-slate-800">
                  <span>Amanat Electronics Team</span>
                </div>
              </div>
            ))}
          </div>
        </div>

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
