import { memo } from 'react'

export const CategoryStrip = memo(({ categories }) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {categories.map((category) => (
      <article key={category.id} className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-slate-900/75 dark:shadow-[0_22px_60px_rgba(2,6,23,0.38)]">
        <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-r ${category.accent} opacity-80 blur-2xl transition duration-500 group-hover:opacity-100`} />
        <div className="relative">
          <div className="mb-5 flex items-center justify-between">
            <div className={`h-16 w-16 rounded-[22px] bg-gradient-to-br ${category.accent} shadow-lg`} />
            <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 backdrop-blur dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-300">
              Explore
            </span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">{category.name}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{category.description}</p>
          <div className="mt-5 h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-white/10" />
          <p className="mt-4 text-sm font-medium text-slate-500 transition group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-300">
            Curated category experience
          </p>
        </div>
      </article>
    ))}
  </div>
))

CategoryStrip.displayName = 'CategoryStrip'
