import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IoClose, IoTimeOutline } from 'react-icons/io5'

export const SearchPalette = ({ isOpen, query, onChange, onClose, onSubmit, results, history }) => (
  <AnimatePresence>
    {isOpen ? (
      <motion.div className="fixed inset-0 z-[75] bg-slate-950/40 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} className="surface mx-auto mt-8 max-w-3xl p-5">
          <div className="mb-4 flex items-center gap-3">
            <input autoFocus value={query} onChange={(event) => onChange(event.target.value)} placeholder="Search products, brands, or categories" className="focus-ring h-14 flex-1 rounded-2xl border bg-white px-5 text-sm dark:bg-slate-950/50" />
            <button type="button" aria-label="Close search" onClick={onClose} className="focus-ring rounded-full p-3 text-slate-500 hover:text-slate-900 dark:hover:text-white"><IoClose size={20} /></button>
          </div>
          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Recent searches</p>
              <div className="space-y-2">
                {history.length ? history.map((term) => (
                  <button key={term} type="button" onClick={() => onSubmit(term)} className="focus-ring flex w-full items-center gap-2 rounded-2xl border px-4 py-3 text-left text-sm text-slate-600 hover:border-blue-400 hover:text-blue-600 dark:text-slate-300">
                    <IoTimeOutline /> {term}
                  </button>
                )) : <p className="text-sm text-slate-500">No recent searches yet.</p>}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Suggestions</p>
              <div className="space-y-3">
                {results.length ? results.map((product) => (
                  <Link key={product.id} to={`/product/${product.slug}`} onClick={onClose} className="flex items-center gap-3 rounded-2xl border p-3 transition hover:border-blue-400 hover:bg-blue-50/40 dark:hover:bg-slate-900/60">
                    <img src={product.images[0]} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">{product.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{product.category}  {product.brand}</p>
                    </div>
                  </Link>
                )) : <p className="text-sm text-slate-500">Start typing to get instant suggestions.</p>}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
)
