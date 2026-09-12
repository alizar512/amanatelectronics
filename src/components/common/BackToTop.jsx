import { useEffect, useState } from 'react'
import { IoArrowUp } from 'react-icons/io5'

export const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="focus-ring fixed right-4 bottom-24 z-50 rounded-full bg-slate-950 p-3 text-white shadow-xl dark:bg-white dark:text-slate-950"
    >
      <IoArrowUp size={18} />
    </button>
  )
}
