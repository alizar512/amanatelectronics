import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const StoreContext = createContext(null)

const readStorage = (key, fallback) => {
  const savedValue = window.localStorage.getItem(key)
  return savedValue ? JSON.parse(savedValue) : fallback
}

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => readStorage('amanat-cart', []))
  const [wishlist, setWishlist] = useState(() => readStorage('amanat-wishlist', []))
  const [compare, setCompare] = useState(() => readStorage('amanat-compare', []))
  const [recentlyViewed, setRecentlyViewed] = useState(() => readStorage('amanat-recent', []))
  const [searchHistory, setSearchHistory] = useState(() => readStorage('amanat-search', []))
  const [isCartOpen, setCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  const openQuickView = useCallback((product) => {
    setQuickViewProduct(product)
  }, [])

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null)
  }, [])

  useEffect(() => window.localStorage.setItem('amanat-cart', JSON.stringify(cart)), [cart])
  useEffect(() => window.localStorage.setItem('amanat-wishlist', JSON.stringify(wishlist)), [wishlist])
  useEffect(() => window.localStorage.setItem('amanat-compare', JSON.stringify(compare)), [compare])
  useEffect(() => window.localStorage.setItem('amanat-recent', JSON.stringify(recentlyViewed)), [recentlyViewed])
  useEffect(() => window.localStorage.setItem('amanat-search', JSON.stringify(searchHistory)), [searchHistory])

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id)
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [...currentCart, { ...product, quantity }]
    })
    setCartOpen(true)
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return
    setCart((currentCart) =>
      currentCart.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    )
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
  }, [])

  const toggleWishlist = useCallback((product) => {
    setWishlist((currentWishlist) =>
      currentWishlist.some((item) => item.id === product.id)
        ? currentWishlist.filter((item) => item.id !== product.id)
        : [...currentWishlist, product],
    )
  }, [])

  const toggleCompare = useCallback((product) => {
    setCompare((currentCompare) => {
      const isActive = currentCompare.some((item) => item.id === product.id)
      if (isActive) return currentCompare.filter((item) => item.id !== product.id)
      return currentCompare.length >= 4 ? [...currentCompare.slice(1), product] : [...currentCompare, product]
    })
  }, [])

  const addRecentlyViewed = useCallback((product) => {
    setRecentlyViewed((currentViewed) => [product, ...currentViewed.filter((item) => item.id !== product.id)].slice(0, 8))
  }, [])

  const saveSearchTerm = useCallback((term) => {
    if (!term?.trim()) return
    setSearchHistory((currentHistory) => [term, ...currentHistory.filter((item) => item !== term)].slice(0, 6))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])
  const cartSubtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart])

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      compare,
      recentlyViewed,
      searchHistory,
      isCartOpen,
      setCartOpen,
      quickViewProduct,
      openQuickView,
      closeQuickView,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleWishlist,
      toggleCompare,
      addRecentlyViewed,
      saveSearchTerm,
      clearCart,
      cartCount,
      cartSubtotal,
    }),
    [
      addRecentlyViewed,
      addToCart,
      cart,
      cartCount,
      cartSubtotal,
      clearCart,
      closeQuickView,
      compare,
      isCartOpen,
      openQuickView,
      quickViewProduct,
      recentlyViewed,
      removeFromCart,
      saveSearchTerm,
      searchHistory,
      toggleCompare,
      toggleWishlist,
      updateQuantity,
      wishlist,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within StoreProvider')
  return context
}
