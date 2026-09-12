export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl bg-white shadow-sm dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
      {/* Image Skeleton */}
      <div className="h-40 rounded-t-xl bg-slate-200 dark:bg-slate-800" />
      
      {/* Content Skeleton */}
      <div className="p-3 space-y-2">
        <div className="h-3 w-1/4 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-8 w-full rounded bg-slate-200 dark:bg-slate-800 mt-2" />
      </div>
    </div>
  )
}