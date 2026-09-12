import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IoCheckmarkCircleOutline, IoClose } from 'react-icons/io5'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message) => {
      const id = crypto.randomUUID()
      setToasts((currentToasts) => [...currentToasts, { id, message }])
      window.setTimeout(() => removeToast(id), 3200)
    },
    [removeToast],
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 bottom-4 z-[90] flex w-full max-w-sm flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="pointer-events-auto surface flex items-start gap-3 p-4"
            >
              <span className="mt-0.5 rounded-full bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-300">
                <IoCheckmarkCircleOutline size={18} />
              </span>
              <div className="flex-1 text-sm text-slate-600 dark:text-slate-300">{toast.message}</div>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => removeToast(toast.id)}
                className="focus-ring rounded-full p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <IoClose size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
