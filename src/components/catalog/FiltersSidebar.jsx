export const FiltersSidebar = ({ filters, options, onChange, onClear }) => (
  <aside
    className="space-y-5 p-5 h-fit"
    style={{
      border: '1px solid var(--color-border-light)',
      backgroundColor: 'var(--color-bg)',
    }}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-headings)' }}>
        Filters
      </h3>
      <button
        type="button"
        onClick={onClear}
        className="text-xs font-semibold uppercase tracking-wider transition-colors"
        style={{ color: 'var(--color-brand-dark)' }}
      >
        Clear All
      </button>
    </div>

    <div className="h-px" style={{ backgroundColor: 'var(--color-border-light)' }} />

    {['category', 'brand', 'availability', 'sort'].map((key) => (
      <label key={key} className="block">
        <span
          className="mb-2 block text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--color-alt-text)' }}
        >
          {key}
        </span>
        <select
          value={filters[key]}
          onChange={(event) => onChange(key, event.target.value)}
          className="w-full border py-2.5 px-3 text-sm outline-none transition-all focus:border-[color:var(--color-brand)]"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
          }}
        >
          {key === 'category' ? <option value="all">All Categories</option> : null}
          {key === 'brand' ? <option value="all">All Brands</option> : null}
          {key === 'availability' ? <option value="all">All Stock</option> : null}
          {key === 'availability' ? <option value="in-stock">In Stock</option> : null}
          {key === 'sort' ? <option value="featured">Featured</option> : null}
          {key === 'sort' ? <option value="price-asc">Price: Low to High</option> : null}
          {key === 'sort' ? <option value="price-desc">Price: High to Low</option> : null}
          {key === 'sort' ? <option value="rating">Top Rated</option> : null}
          {key === 'category' ? options.categories.map((item) => <option key={item} value={item}>{item}</option>) : null}
          {key === 'brand' ? options.brands.map((item) => <option key={item} value={item}>{item}</option>) : null}
        </select>
      </label>
    ))}

    <button
      type="button"
      onClick={onClear}
      className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
      style={{
        border: '1px solid var(--color-border)',
        color: 'var(--color-text)',
        backgroundColor: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-brand)'
        e.currentTarget.style.borderColor = 'var(--color-brand)'
        e.currentTarget.style.color = 'var(--color-brand-text)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.color = 'var(--color-text)'
      }}
    >
      Reset All Filters
    </button>
  </aside>
)
