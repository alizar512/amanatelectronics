import { AnimatePresence, motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'

export const Modal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen ? (
      <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} className="surface max-h-[90vh] w-full max-w-3xl overflow-auto p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h3>
            <button type="button" aria-label="Close modal" onClick={onClose} className="focus-ring rounded-full p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white">
              <IoClose size={20} />
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
)
