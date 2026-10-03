import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IoClose, IoTimeOutline, IoSearchOutline } from 'react-icons/io5'

export const SearchPalette = ({ isOpen, query, onChange, onClose, onSubmit, results, history }) => (
  <AnimatePresence>
    {isOpen ? (
      <motion.div
        className="fixed inset-0 z-[75] p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="mx-auto mt-12 max-w-2xl"
          style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Search Input */}
          <div className="flex items-center border-b" style={{ borderColor: 'var(--color-border-light)' }}>
            <IoSearchOutline size={20} className="ml-4 shrink-0" style={{ color: 'var(--color-alt-text)' }} />
            <input
              autoFocus
              value={query}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') onSubmit() }}
              placeholder="Search products, brands, or categories..."
              className="flex-1 border-0 bg-transparent px-4 py-4 text-sm outline-none"
              style={{ color: 'var(--color-text)' }}
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={onClose}
              className="mr-2 flex h-8 w-8 items-center justify-center transition-colors"
              style={{ color: 'var(--color-alt-text)' }}
            >
              <IoClose size={20} />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4">
            <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
              {/* Recent Searches */}
              <div>
                <p
                  className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--color-alt-text)' }}
                >
                  Recent Searches
                </p>
                <div className="space-y-1.5">
                  {history.length ? history.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => onSubmit(term)}
                      className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors"
                      style={{
                        color: 'var(--color-text)',
                        border: '1px solid var(--color-border-light)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-brand)'
                        e.currentTarget.style.backgroundColor = 'var(--color-drawer-bg)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border-light)'
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      <IoTimeOutline size={14} style={{ color: 'var(--color-alt-text)' }} />
                      {term}
                    </button>
                  )) : (
                    <p className="text-xs" style={{ color: 'var(--color-alt-text)' }}>
                      No recent searches yet.
                    </p>
                  )}
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <p
                  className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--color-alt-text)' }}
                >
                  Suggestions
                </p>
                <div className="space-y-2">
                  {results.length ? results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 transition-all"
                      style={{ border: '1px solid var(--color-border-light)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-brand)'
                        e.currentTarget.style.backgroundColor = 'var(--color-drawer-bg)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border-light)'
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      <div
                        className="h-14 w-14 shrink-0 overflow-hidden"
                        style={{ backgroundColor: 'var(--color-product-bg)' }}
                      >
                        <img
                          src={product.image || (product.images && product.images[0])}
                          alt={product.name}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold" style={{ color: 'var(--color-headings)' }}>
                          {product.name}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--color-alt-text)' }}>
                          {product.category} {product.brand ? `· ${product.brand}` : ''}
                        </p>
                        {product.price && (
                          <p className="mt-0.5 text-sm font-bold" style={{ color: 'var(--color-brand-dark)' }}>
                            Rs.{product.price.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </Link>
                  )) : (
                    <p className="text-xs" style={{ color: 'var(--color-alt-text)' }}>
                      Start typing to get instant suggestions.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          {query.trim() && (
            <div className="border-t p-3" style={{ borderColor: 'var(--color-border-light)' }}>
              <button
                type="button"
                onClick={() => onSubmit()}
                className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: 'var(--color-brand)',
                  color: 'var(--color-brand-text)',
                }}
              >
                Search for "{query}"
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
)
