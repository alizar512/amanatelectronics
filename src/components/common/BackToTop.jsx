import { useEffect, useState } from 'react'
import { IoArrowUp } from 'react-icons/io5'

export const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed left-5 bottom-5 z-40 flex h-10 w-10 items-center justify-center shadow-lg transition-all hover:scale-110"
      style={{
        backgroundColor: 'var(--color-btn)',
        color: '#ffffff',
      }}
    >
      <IoArrowUp size={18} />
    </button>
  )
}
