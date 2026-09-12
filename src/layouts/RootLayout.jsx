import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { CartDrawer } from '../components/commerce/CartDrawer'
import { BackToTop } from '../components/common/BackToTop'
import { PageLoader } from '../components/common/PageLoader'
import { QuickViewModal } from '../components/product/QuickViewModal'
import { useStore } from '../context/StoreContext'

export const RootLayout = () => {
  const location = useLocation()
  const { quickViewProduct, closeQuickView } = useStore()

  return (
    <div className="min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.24 }}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <BackToTop />
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={closeQuickView}
      />
    </div>
  )
}
