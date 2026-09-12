// src/routes/AppRouter.jsx
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import AdminLayout from '../layouts/AdminLayout'
import { ProtectedRoute } from '../components/common/ProtectedRoute'

// Public & Customer pages
const HomePage = lazy(() => import('../pages/HomePage'))
const ShopPage = lazy(() => import('../pages/ShopPage'))
const DealsPage = lazy(() => import('../pages/DealsPage'))
const SupportPage = lazy(() => import('../pages/SupportPage'))
const LocationPage = lazy(() => import('../pages/LocationPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const ProductDetailsPage = lazy(() => import('../pages/ProductDetailsPage'))
const CartPage = lazy(() => import('../pages/CartPage'))
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'))
const SuccessPage = lazy(() => import('../pages/SuccessPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'))
const WishlistPage = lazy(() => import('../pages/WishlistPage'))
const ComparePage = lazy(() => import('../pages/ComparePage'))

// Fallback & Error pages
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

// Admin pages
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'))
const AdminProducts = lazy(() => import('../pages/admin/AdminProducts'))
const AdminProductForm = lazy(() => import('../pages/admin/AdminProductForm'))
const AdminCategories = lazy(() => import('../pages/admin/AdminCategories'))
const AdminOrders = lazy(() => import('../pages/admin/AdminOrders'))
const AdminTeam = lazy(() => import('../pages/admin/AdminTeam'))
const AdminPaymentSettings = lazy(() => import('../pages/admin/AdminPaymentSettings'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'deals', element: <DealsPage /> },
      { path: 'support', element: <SupportPage /> },
      { path: 'location', element: <LocationPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'contact-us', element: <ContactPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'product/:slug', element: <ProductDetailsPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'order/success', element: <SuccessPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'compare', element: <ComparePage /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'products/new', element: <AdminProductForm /> },
      { path: 'products/:id/edit', element: <AdminProductForm /> },
      { path: 'categories', element: <AdminCategories /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'team', element: <AdminTeam /> },
      { path: 'payment-settings', element: <AdminPaymentSettings /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])