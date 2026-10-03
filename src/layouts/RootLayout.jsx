import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AnnouncementBar } from '../components/layout/AnnouncementBar'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { CartDrawer } from '../components/commerce/CartDrawer'
import { BackToTop } from '../components/common/BackToTop'
import { PageLoader } from '../components/common/PageLoader'
import { QuickViewModal } from '../components/product/QuickViewModal'
import { WhatsAppButton } from '../components/home/WhatsAppButton'
import { useStore } from '../context/StoreContext'

export const RootLayout = () => {
  const location = useLocation()
  const { quickViewProduct, closeQuickView } = useStore()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <AnnouncementBar />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <BackToTop />
      <WhatsAppButton />
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={closeQuickView}
      />
    </div>
  )
}
