import { Button } from '../common/Button'
import { formatCurrency } from '../../utils/format'

export const StickyAddToCartBar = ({ product, onAddToCart }) => (
  <div className="glass sticky bottom-4 z-30 mt-8 hidden items-center justify-between gap-4 rounded-[24px] p-4 lg:flex">
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400">Ready to order</p>
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{product.name}</h3>
    </div>
    <div className="flex items-center gap-4">
      <p className="text-xl font-bold text-slate-950 dark:text-white">{formatCurrency(product.price)}</p>
      <Button onClick={() => onAddToCart(product)}>Add to cart</Button>
    </div>
  </div>
)
