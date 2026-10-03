import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from './routes/AppRouter'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { StoreProvider } from './context/StoreContext'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <StoreProvider>
              <Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
                    <div className="h-10 w-10 animate-spin rounded-full border-4" style={{ borderColor: 'var(--color-border-light)', borderTopColor: 'var(--color-brand)' }} />
                  </div>
                }
              >
                <RouterProvider router={router} />
              </Suspense>
            </StoreProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App