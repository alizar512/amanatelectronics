import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IoClose, IoTrashOutline } from 'react-icons/io5'
import { useStore } from '../../context/StoreContext'
import { Button } from '../common/Button'
import { formatCurrency } from '../../utils/format'

export const CartDrawer = () => {
  const { cart, cartSubtotal, isCartOpen, setCartOpen, updateQuantity, removeFromCart } = useStore()

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.button type="button" aria-label="Close cart" className="fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} />
          <motion.aside initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }} transition={{ type: 'spring', damping: 28, stiffness: 280 }} className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col border-l bg-[color:var(--color-card)] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Your cart</h2>
              <button type="button" className="focus-ring rounded-full p-2" onClick={() => setCartOpen(false)}>
                <IoClose size={20} />
              </button>
            </div>
            <div className="hide-scrollbar flex-1 space-y-4 overflow-auto pr-2">
              {cart.length ? cart.map((item) => (
                <div key={item.id} className="surface p-4">
                  <div className="flex gap-4">
                    <img src={item.images[0]} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-950 dark:text-white">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{formatCurrency(item.price)}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <button type="button" className="focus-ring rounded-full border px-3 py-1" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <button type="button" className="focus-ring rounded-full border px-3 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        <button type="button" className="ml-auto text-slate-400 hover:text-rose-500" onClick={() => removeFromCart(item.id)}><IoTrashOutline size={18} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              )) : <p className="text-sm text-slate-500 dark:text-slate-400">Your cart is empty.</p>}
            </div>
            <div className="mt-6 space-y-4 border-t pt-4">
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Subtotal</span>
                <span className="text-lg font-semibold text-slate-950 dark:text-white">{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="ghost" onClick={() => setCartOpen(false)}>Continue</Button>
                <Link to="/cart" onClick={() => setCartOpen(false)} className="focus-ring inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">View cart</Link>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
