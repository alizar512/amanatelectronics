// src/components/product/ProductDetailsSkeleton.jsx
import { Skeleton } from '../common/Skeleton'

export const ProductDetailsSkeleton = () => {
  return (
    <div className="section-gap animate-pulse">
      <div className="container-shell">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <Skeleton className="h-4 w-40 rounded-md" />
        </div>

        {/* Top Product View: Gallery + Details */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          {/* Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square w-full rounded-[32px] bg-slate-200/80 dark:bg-slate-800/80 p-6 flex items-center justify-center">
              <div className="h-3/4 w-3/4 rounded-2xl bg-slate-300/60 dark:bg-slate-700/60" />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-20 flex-shrink-0 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80"
                />
              ))}
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="rounded-[32px] border border-slate-200/80 bg-white/90 p-6 dark:border-white/10 dark:bg-slate-900/82 sm:p-8 space-y-5">
            {/* Category & Rating Badges */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-5/6 rounded-xl sm:h-10" />
              <Skeleton className="h-8 w-3/5 rounded-xl sm:h-10" />
            </div>

            {/* Description lines */}
            <div className="space-y-2 pt-1">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-11/12 rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>

            {/* Price Box */}
            <div className="rounded-[24px] border border-slate-200/80 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03] space-y-3">
              <div className="flex items-baseline gap-4">
                <Skeleton className="h-9 w-36 rounded-lg sm:h-11 sm:w-44" />
                <Skeleton className="h-5 w-24 rounded-md" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-4 w-36 rounded-md" />
              </div>
            </div>

            {/* Colors / Options */}
            <div className="flex gap-2 pt-1">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>

            {/* Action Buttons */}
            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>

            {/* Specifications Meta Table Box */}
            <div className="rounded-[24px] border border-slate-200/80 p-5 dark:border-white/10 space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-36 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-48 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section Skeleton */}
        <div className="pt-10 space-y-4">
          <Skeleton className="h-7 w-48 rounded-lg" />
          <Skeleton className="h-4 w-80 rounded-md" />
          <div className="grid gap-3 sm:grid-cols-2 pt-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03] flex items-center justify-between"
              >
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section Skeleton */}
        <div className="pt-10 space-y-4">
          <Skeleton className="h-7 w-44 rounded-lg" />
          <Skeleton className="h-4 w-72 rounded-md" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 space-y-3"
              >
                <div className="h-40 rounded-lg bg-slate-200/80 dark:bg-slate-800/80" />
                <div className="h-3 w-1/3 rounded bg-slate-200/80 dark:bg-slate-800/80" />
                <div className="h-4 w-3/4 rounded bg-slate-200/80 dark:bg-slate-800/80" />
                <div className="h-4 w-1/2 rounded bg-slate-200/80 dark:bg-slate-800/80" />
                <div className="h-8 w-full rounded-lg bg-slate-200/80 dark:bg-slate-800/80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
