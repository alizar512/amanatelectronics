import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { Seo } from '../components/common/Seo'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { EmptyState } from '../components/common/EmptyState'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { formatCurrency } from '../utils/format'

export default function CartPage() {
  const { cart, cartSubtotal, updateQuantity, removeFromCart } = useStore()
  const shipping = cart.length ? 2500 : 0
  const tax = Math.round(cartSubtotal * 0.05)

  return (
    <div className="section-gap">
      <Seo title="Cart" description="Review cart items, adjust quantities, and continue to checkout." />
      <div className="container-shell">
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cart.length ? cart.map((item) => (
              <div key={item.id} className="surface p-5">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <img src={item.images[0]} alt={item.name} className="h-32 w-32 rounded-[24px] object-cover" />
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-slate-950 dark:text-white">{item.name}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.shipping}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button type="button" className="focus-ring rounded-full border px-3 py-1" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button type="button" className="focus-ring rounded-full border px-3 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      <span className="ml-auto text-lg font-bold text-slate-950 dark:text-white">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                    <button type="button" onClick={() => removeFromCart(item.id)} className="mt-3 text-sm text-rose-500">Remove</button>
                  </div>
                </div>
              </div>
            )) : <EmptyState title="Your cart is empty" description="Save products or start exploring the catalog to prepare an order." actionLabel="Browse shop" onAction={() => window.location.assign('/shop')} />}
          </div>
          <aside className="surface h-fit p-6">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Order summary</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <Input placeholder="Coupon code" />
              <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(cartSubtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{formatCurrency(shipping)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
              <div className="flex justify-between border-t pt-4 text-lg font-semibold text-slate-950 dark:text-white"><span>Total</span><span>{formatCurrency(cartSubtotal + shipping + tax)}</span></div>
              <Link to="/checkout"><Button className="w-full">Proceed to checkout</Button></Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
