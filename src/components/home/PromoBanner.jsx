import { Link } from 'react-router-dom'

const banners = [
  {
    id: 1,
    title: 'Wedding Season Packages',
    subtitle: 'Save up to 30%',
    description: 'Complete home appliance bundles for newlyweds. AC + Fridge + Washing Machine packages available.',
    cta: 'View Packages',
    ctaLink: '/deals',
    bgColor: '#1a1a2e',
    accentColor: '#fad018',
    alignment: 'left',
  },
  {
    id: 2,
    title: 'Easy Installments',
    subtitle: '0% Markup Available',
    description: 'Buy now and pay in easy monthly installments on all major bank credit cards.',
    cta: 'Learn More',
    ctaLink: '/support',
    bgColor: '#0f3460',
    accentColor: '#fad018',
    alignment: 'right',
  },
]

export const PromoBanner = () => {
  return (
    <section className="section-gap">
      <div className="container-shell">
        <div className="grid gap-5 md:grid-cols-2">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative overflow-hidden p-8 sm:p-10 transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: banner.bgColor, minHeight: '200px' }}
            >
              {/* Decorative circle */}
              <div
                className="absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-10"
                style={{ backgroundColor: banner.accentColor }}
              />
              <div
                className="absolute -left-4 -bottom-4 h-24 w-24 rounded-full opacity-5"
                style={{ backgroundColor: banner.accentColor }}
              />

              <div className="relative z-10">
                <span
                  className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-2"
                  style={{ color: banner.accentColor }}
                >
                  {banner.subtitle}
                </span>
                <h3 className="text-xl font-bold uppercase tracking-wider text-white sm:text-2xl">
                  {banner.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-white/60 leading-6">
                  {banner.description}
                </p>
                <Link
                  to={banner.ctaLink}
                  className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all"
                  style={{
                    backgroundColor: banner.accentColor,
                    color: '#111111',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = banner.accentColor
                  }}
                >
                  {banner.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
