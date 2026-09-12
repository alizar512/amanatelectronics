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
                  <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
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