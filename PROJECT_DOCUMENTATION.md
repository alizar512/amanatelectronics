# Amanat Electronics Project Documentation

## Project Overview

`Amanat Electronics` is a premium modern eCommerce frontend built for electronics, appliances, wellness, and smart-home products.

The website is designed as an original experience with:

- premium UI/UX
- clean architecture
- reusable components
- responsive layouts
- fast page rendering
- SEO-ready structure
- accessibility-focused interactions

## Live Development URL

- Local URL: `http://localhost:5173/`

## Main Technologies Used

### Core

- React 19
- React DOM 19
- Vite 8

### Styling and UI

- Tailwind CSS 4
- Custom design system in `src/index.css`
- Framer Motion
- React Icons

### Routing and SEO

- React Router DOM
- React Helmet Async

### Data and Services

- Axios
- API-aware catalog service layer with local fallback
- Local utility helpers
- Express.js API server
- Shared catalog data between frontend and backend
- JWT-based admin authentication
- MySQL-ready configuration with in-memory fallback

### State Management

- Context API
- Theme context
- Store context
- Toast context

### Performance Techniques

- Route lazy loading with `React.lazy`
- `Suspense`
- memoized product cards
- `useMemo`
- `useCallback`
- debounced search
- image lazy loading
- skeleton loading states
- split route bundles from Vite

### Backend Tooling

- Express.js
- CORS
- Nodemon
- Concurrently
- `mysql2`
- `dotenv`
- `bcryptjs`
- `jsonwebtoken`

## Current Website Features

### Backend Foundation

- Express API server
- Health endpoint
- Home data endpoint
- Product listing endpoint
- Product details endpoint
- Search endpoint
- Frontend API fallback support
- Admin login endpoint
- Admin profile endpoint
- Protected admin product CRUD endpoints
- Admin dashboard summary endpoint
- Admin catalog metadata endpoint
- Role-based access control for `admin` and `manager`
- MySQL environment config and starter SQL schema

### Header

- Sticky navigation bar
- Brand/logo area
- Desktop nav links
- Responsive mobile menu
- Search trigger
- Wishlist icon
- Cart trigger
- Account icon

### Search

- Instant search modal
- Search suggestions
- Search history
- Debounced search behavior

### Home Page

- Premium hero section
- Popular products
- Best sellers
- Trust section
- Testimonials
- Blog section
- Location page link in navigation

### Shop Page

- Product grid
- Category filter
- Brand filter
- Availability filter
- Sorting
- Search result support from URL query
- Quick view modal

### Product Details

- Large product gallery
- Product information block
- Price and old price
- Color options
- Shipping and warranty info
- Specifications section
- Related products
- Sticky add-to-cart bar

### Cart and Checkout

- Slide cart drawer
- Full cart page
- Quantity update
- Remove item
- Coupon input UI
- Order summary
- Multi-step checkout UI
- Success page

### User Features

- Wishlist page
- Compare page
- Account dashboard
- Orders page
- Addresses page
- Settings page
- Login page
- Register page
- Forgot password page

### Extra Features

- Dark mode
- Toast notifications
- Skeleton loaders
- Error boundary
- Back to top button
- 404 page
- Maintenance page
- Empty states
- Recently viewed support in store state

## Project Structure

```text
src/
  assets/
    data/
  components/
    catalog/
    commerce/
    common/
    home/
    layout/
    product/
  context/
  hooks/
  layouts/
  pages/
  routes/
  services/
  utils/
server/
  app.js
  config/
  constants/
  controllers/
  data/
  database/
  middleware/
  routes/
  services/
  store/
  utils/
  index.js
```

## Important Files and Their Purpose

### App Entry

- `src/main.jsx`: application entry point
- `src/App.jsx`: wraps router with providers and error boundary
- `src/index.css`: global styles and design tokens

### Routing

- `src/routes/AppRouter.jsx`: all lazy-loaded routes
- `src/layouts/RootLayout.jsx`: shared page layout

### Contexts

- `src/context/ThemeContext.jsx`: dark/light mode handling
- `src/context/StoreContext.jsx`: cart, wishlist, compare, recently viewed, search history
- `src/context/ToastContext.jsx`: toast notifications

### Services and Data

- `src/assets/data/catalog.js`: product, category, hero, testimonial, and blog mock data
- `src/services/catalogService.js`: frontend catalog methods with API + fallback behavior
- `src/services/apiClient.js`: Axios instance for future backend integration
- `server/app.js`: Express app setup and route mounting
- `server/index.js`: backend entry point
- `server/config/env.js`: environment configuration
- `server/config/db.js`: MySQL readiness and connection status helpers
- `server/database/schema.sql`: starter MySQL schema for admin users and products
- `server/controllers/*`: public and admin API controllers
- `server/routes/*`: public, auth, admin meta, and admin product routes
- `server/services/authService.js`: password verification and JWT token handling
- `server/store/productStore.js`: in-memory product persistence layer
- `.env.example`: backend environment variable template

### Shared Components

- `src/components/common/Button.jsx`
- `src/components/common/Input.jsx`
- `src/components/common/Modal.jsx`
- `src/components/common/Seo.jsx`
- `src/components/common/Skeleton.jsx`
- `src/components/common/ErrorBoundary.jsx`

### Layout Components

- `src/components/layout/Navbar.jsx`
- `src/components/layout/SearchPalette.jsx`
- `src/components/layout/Footer.jsx`

### Catalog and Product Components

- `src/components/catalog/ProductCard.jsx`
- `src/components/catalog/ProductGrid.jsx`
- `src/components/catalog/FiltersSidebar.jsx`
- `src/components/product/ProductGallery.jsx`
- `src/components/product/QuickViewModal.jsx`
- `src/components/product/StickyAddToCartBar.jsx`
- `src/components/commerce/CartDrawer.jsx`

## Files/Areas To Update Time By Time

These are the main places to update when the website grows:

### When Adding New Products

- update `src/assets/data/catalog.js`
- update search/filter logic if new fields are added
- connect `src/services/catalogService.js` to real backend data later

### When Changing Design

- update `src/index.css`
- update shared UI components inside `src/components/common/`
- update layout files in `src/components/layout/`

### When Adding New Pages

- create the new page in `src/pages/`
- register route in `src/routes/AppRouter.jsx`
- add nav links in `src/components/layout/Navbar.jsx` if needed

### When Adding Backend Integration

- use `src/services/apiClient.js`
- replace mock service methods in `src/services/catalogService.js`
- move hardcoded product/state flows to API-driven flows

### When Adding More Account Features

- extend pages inside `src/pages/`
- extend `src/context/StoreContext.jsx` if local UI state is needed

## Current Update Log

### Version 1

- created fresh Vite + React project
- added Tailwind CSS 4 integration
- added router-based architecture
- added reusable components and contexts
- added premium original eCommerce UI
- added shop, product, cart, checkout, auth, account, compare, wishlist pages
- added SEO component and metadata support
- added dark mode and toast system
- added skeletons, error boundary, empty states, and maintenance/404 pages
- verified working production build

### Version 2

- upgraded the product cards to a more advanced premium visual style
- improved category, testimonial, blog, and support cards
- upgraded navbar, hero section, and product details presentation
- added Express backend foundation
- added API endpoints for health, home, products, product detail, and search
- connected the frontend catalog service layer to backend endpoints with fallback support
- added new dev scripts for frontend and backend workflow

### Version 3

- refactored the backend into a modular Express structure
- added JWT-based login for `admin` and `manager`
- added protected admin product CRUD endpoints
- added admin dashboard summary and catalog metadata endpoints
- added MySQL-ready environment config and starter schema
- added seeded admin/manager credentials through environment variables
- verified backend health, admin login, and protected product access

### Version 4 (Full Backend & Integration Complete)

- implemented unified dual-mode storage engine (MySQL auto-init + persistent JSON fallback)
- built complete customer authentication system (registration, login, profile, password change, recovery)
- built checkout and order processing pipeline with unique order numbering (`AMANAT-YYYY-XXXX`) and inventory management
- built coupon code validation engine (percentage & fixed discounts with min-spend rules)
- built product reviews system with automatic product rating recalculation
- built customer address book management
- built contact inquiries and newsletter subscription handlers
- built admin orders management with live status transitions (Pending, Processing, In transit, Delivered, Cancelled)
- built admin product management with add/edit modals and inventory stock updates
- wired all frontend pages (`LoginPage`, `RegisterPage`, `CheckoutPage`, `OrdersPage`, `AddressesPage`, `AccountDashboardPage`, `LocationPage`, `Footer`, `AdminDashboard`, `AdminProducts`, `AdminOrders`) to real backend endpoints
- verified full REST API automated test suite (13/13 endpoints passed) and Vite build

## Backend API Summary

### Public & Catalog Routes
- `GET /api/health` - API health and database status check
- `GET /api/home` - Home page data (hero, featured, best sellers, categories, brands)
- `GET /api/products` - Filtered & paginated product catalog
- `GET /api/products/:slug` - Product details, reviews & related items
- `GET /api/products/id/:id` - Product details by ID
- `GET /api/categories` - Categories list with live counts
- `GET /api/brands` - Brands list with product counts
- `GET /api/search?q=term` - Search products with autocomplete suggestions
- `POST /api/contact` - Customer contact & inquiry submission
- `POST /api/newsletter` - Newsletter email subscription

### Customer Authentication & Profile Routes
- `POST /api/auth/register` - Register new customer account
- `POST /api/auth/login` - Authenticate customer & receive JWT
- `GET /api/auth/me` - Authenticated customer profile
- `PUT /api/auth/profile` - Update customer profile details
- `PUT /api/auth/change-password` - Update password securely
- `POST /api/auth/forgot-password` - Password recovery request

### Orders & Checkout Routes
- `POST /api/orders` - Place new order with cart snapshot, stock update & coupon
- `GET /api/orders/my-orders` - Fetch authenticated customer's order history
- `GET /api/orders/:orderNumber` - Track order details by order number
- `POST /api/orders/:orderNumber/cancel` - Cancel order if pending
- `POST /api/coupons/validate` - Validate promo code and calculate discount

### Customer Addresses & Reviews
- `GET /api/user/addresses` - Get customer's saved delivery addresses
- `POST /api/user/addresses` - Add new delivery address
- `PUT /api/user/addresses/:id` - Update saved address
- `DELETE /api/user/addresses/:id` - Remove saved address
- `GET /api/reviews/:productId` - Get reviews for a product
- `POST /api/reviews/:productId` - Submit a review (updates average rating)

### Admin Management Routes (Protected)
- `POST /api/admin/auth/login` - Admin & manager login
- `GET /api/admin/auth/me` - Authenticated admin profile
- `GET /api/admin/dashboard` - Dashboard metrics, revenue, active users & activities
- `GET /api/admin/meta` - Catalog metadata, badges, order statuses
- `GET /api/admin/products` - Admin product catalog with search & filter
- `GET /api/admin/products/:id` - Get product for editing
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `PATCH /api/admin/products/:id/stock` - Adjust product inventory stock
- `DELETE /api/admin/products/:id` - Delete product (Admin only)
- `GET /api/admin/orders` - List all orders with status filtering & search
- `GET /api/admin/orders/:id` - Get order details
- `PATCH /api/admin/orders/:id/status` - Update order delivery status
- `GET /api/admin/customers` - List customer accounts & total spent
- `GET /api/admin/messages` - View customer inquiries
- `PATCH /api/admin/messages/:id/read` - Mark inquiry as read
- `GET /api/admin/coupons` - List promotional coupons
- `POST /api/admin/coupons` - Create new coupon
- `DELETE /api/admin/coupons/:id` - Delete coupon

## How To Run The Project

### Run Frontend + Backend Concurrently
```bash
npm run dev:full
```

### Run Frontend Only
```bash
npm run dev
```

### Run Backend Only
```bash
npm run dev:server
```

### Production Build
```bash
npm run build
```

## Demo Credentials

- **Admin Account**: `admin@amanat.local` / `Admin123!`
- **Store Manager**: `manager@amanat.local` / `Manager123!`
- **Test Customer**: `customer@amanat.local` / `Customer123!`
- **Sample Coupons**: `AMANAT10` (10% off), `SAVE15` (15% off), `WELCOME20` (20% off), `FLAT2000` (Rs 2,000 off)

