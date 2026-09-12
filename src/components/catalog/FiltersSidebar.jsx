import { Button } from '../common/Button'

export const FiltersSidebar = ({ filters, options, onChange, onClear }) => (
  <aside className="surface space-y-6 p-6">
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Filters</h3>
      <button type="button" onClick={onClear} className="text-sm text-slate-500 hover:text-blue-600">Clear</button>
    </div>
    {['category', 'brand', 'availability', 'sort'].map((key) => (
      <label key={key} className="block text-sm font-medium capitalize text-slate-700 dark:text-slate-300">
        {key}
        <select value={filters[key]} onChange={(event) => onChange(key, event.target.value)} className="focus-ring mt-2 h-12 w-full rounded-2xl border bg-white px-4 dark:bg-slate-950/50">
          {key === 'category' ? <option value="all">All categories</option> : null}
          {key === 'brand' ? <option value="all">All brands</option> : null}
          {key === 'availability' ? <option value="all">All stock</option> : null}
          {key === 'availability' ? <option value="in-stock">In stock</option> : null}
          {key === 'sort' ? <option value="featured">Featured</option> : null}
          {key === 'sort' ? <option value="price-asc">Price: low to high</option> : null}
          {key === 'sort' ? <option value="price-desc">Price: high to low</option> : null}
          {key === 'sort' ? <option value="rating">Top rated</option> : null}
          {key === 'category' ? options.categories.map((item) => <option key={item} value={item}>{item}</option>) : null}
          {key === 'brand' ? options.brands.map((item) => <option key={item} value={item}>{item}</option>) : null}
        </select>
      </label>
    ))}
    <Button variant="ghost" className="w-full" onClick={onClear}>Reset filters</Button>
  </aside>
)
