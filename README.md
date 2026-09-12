# Amanat Electronics

Premium modern eCommerce frontend built with React, Vite, Tailwind CSS, Framer Motion, React Router, and Context API.

## Project URL

- Local development: `http://localhost:5173/`

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Main Stack

- React 19
- Vite 8
- React Router DOM
- Tailwind CSS 4
- Framer Motion
- React Icons
- Axios
- React Helmet Async
- Context API
- Express.js
- CORS
- Nodemon
- Concurrently

## Main Features

- Premium original storefront UI
- Sticky header and responsive navigation
- Instant search with suggestions and history
- Product listing with filters and sorting
- Product details with gallery and sticky CTA
- Cart drawer and cart page
- Wishlist and compare flows
- Multi-step checkout
- Account, auth, maintenance, and 404 pages
- Dark mode, toasts, skeletons, and error boundary
- Route lazy loading and SEO metadata

## Documentation

- Full project documentation: `PROJECT_DOCUMENTATION.md`

## Backend

- API server URL: `http://localhost:8787/`
- Health endpoint: `http://localhost:8787/api/health`
- Admin login endpoint: `POST http://localhost:8787/api/admin/auth/login`
- Admin product endpoint: `http://localhost:8787/api/admin/products`
- Admin dashboard endpoint: `http://localhost:8787/api/admin/dashboard`
- Main dev commands:
- `npm run dev`
- `npm run dev:server`
- `npm run dev:full`

## Backend Auth

- Access is limited to `admin` and `manager` roles
- Default seeded admin credentials come from `.env` values
- Copy `.env.example` to `.env` before backend setup

## MySQL Prep

- Example environment variables are included in `.env.example`
- Starter schema is included in `server/database/schema.sql`
- The API currently falls back to in-memory/mock persistence until MySQL credentials are configured

## Notes

- Current product/catalog content is mock frontend data.
- The UI is designed from scratch and does not clone the reference website.
