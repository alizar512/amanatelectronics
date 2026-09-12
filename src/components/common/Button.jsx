import { forwardRef } from 'react'
import { cn } from '../../utils/format'

export const Button = forwardRef(({ className, variant = 'primary', ...props }, ref) => {
  const variants = {
    primary: 'bg-slate-950 text-white shadow-lg shadow-slate-950/10 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100',
    secondary: 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500',
    ghost: 'border bg-white/70 text-slate-700 hover:bg-white dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-900',
  }

  return (
    <button
      ref={ref}
      className={cn('focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200', variants[variant], className)}
      {...props}
    />
  )
})

Button.displayName = 'Button'
