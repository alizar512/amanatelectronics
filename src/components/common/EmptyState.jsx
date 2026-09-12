import { Button } from './Button'

export const EmptyState = ({ title, description, actionLabel, onAction }) => (
  <div className="surface flex flex-col items-center gap-4 px-6 py-10 text-center">
    <div className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-300">Empty state</div>
    <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">{title}</h3>
    <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
    {actionLabel ? <Button onClick={onAction}>{actionLabel}</Button> : null}
  </div>
)
