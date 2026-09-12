import { forwardRef } from 'react'
import { cn } from '../../utils/format'

export const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn('focus-ring h-12 w-full rounded-2xl border bg-white/70 px-4 text-sm text-slate-900 placeholder:text-slate-400 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-500', className)}
    {...props}
  />
))

Input.displayName = 'Input'
