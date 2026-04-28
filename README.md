# Amass Bakery — Client Website

> A production website built for **Ama's Bakery**, a home-based custom cake and artisanal dessert shop based in **Al Khobar, Saudi Arabia**.

🌐 **Live Site:** [amassbakery.com](https://www.amassbakery.com)

---

## 🧩 Problem Statement

Ama's Bakery is a home-based bakery run by a single baker — meaning she physically cannot handle unlimited orders at once. The client needed more than just a website; she needed a **smart order management system** that matched her brand identity and controlled her workload automatically.

**Key challenges solved:**

- **Brand identity first** — The client wanted an advanced yet minimal design that felt attractive and simple, blending modern aesthetics with her existing logo and brand colors.
- **4 completely different order flows** — Each product category (Menu, Occasion Cakes, Wedding Cakes, Custom Cakes) had its own unique ordering logic, form steps, and business rules. A single generic cart system wouldn't work.
- **Capacity control via smart calendar** — Since she works alone from home, orders had to be limited per date automatically:
  - 🛒 **Menu orders** — Must be placed at least **1 day in advance**, max **2 orders per date**
  - 🎉 **Occasion cake orders** — Must be placed at least **3 days in advance**, max **1 order per date**
  - 💍 **Wedding cake orders** — Must be placed at least **1 week in advance**
  - 🎨 **Custom cake orders** — Personalized flow with design details and requirements
- **Full admin control** — The client needed to manage everything herself without any technical knowledge — products, orders, reviews, and wedding cake page content — all from a dedicated admin dashboard.

The result: a fully custom solution where every part of the ordering experience was designed around the real-world constraints of a solo home bakery. **The client was completely satisfied with the delivered product.**

---

## ✨ Features

### Customer-Facing
- **Bilingual support** — Full English and Arabic (EN/AR) language toggle via `next-intl`
- **4 distinct order systems**, each with its own multi-step flow and validation:
  - Menu orders (date picker enforcing 1-day advance & 2-order-per-date limit)
  - Occasion cake orders (3-day advance, 1-order-per-day limit)
  - Wedding cake inquiries (7-day advance booking)
  - Custom cake requests (step-by-step design specification form)
- **Smart calendar** — Dates that are fully booked or within restricted windows are automatically disabled
- **Per-product add-to-cart logic** — Every product type has its own step-by-step flow tailored for the best UX
- **Product collections** — Menu, Occasion Cakes, and Gifts browsable by category
- **Swiper-powered carousels** — Smooth product and gallery sliders
- **Animated UI** — Page transitions and scroll animations via Framer Motion & GSAP
- **Optimized media** — Next.js Image with WebP format
- **Review system** — Customers can submit reviews displayed on the site

### Admin Dashboard
- **Full CRUD** — Add, edit, and delete products across all categories
- **Order management** — View and manage all incoming orders by type (menu, occasion, wedding, custom)
- **Review moderation** — Approve or remove customer reviews
- **Wedding cake page management** — Edit wedding showcase content directly from the dashboard
- **Image uploads** — Handled via Cloudinary with browser-side compression before upload
- **Secure access** — JWT-based authentication with bcrypt password hashing
- **Handle Order Requirements** — Can update any order requirement per day

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework — App Router, SSR, SSG |
| **TypeScript** | Type safety across the entire codebase |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Page transitions and UI animations |
| **GSAP** | Text animations |
| **Swiper.js** | Touch-friendly product carousels |
| **MUI (Material UI) v7** | Admin dashboard UI components & Data Grid |
| **React Icons** | Icon library |
| **next-intl** | Bilingual EN/AR internationalization |

### Backend (Next.js API Routes)
| Technology | Purpose |
|---|---|
| **MongoDB + Mongoose** | Database — products, orders, reviews, users |
| **JWT (jsonwebtoken)** | Admin authentication & session management |
| **bcryptjs** | Secure password hashing |
| **Nodemailer** | Order confirmation emails |
| **Cloudinary** | Cloud image storage and delivery |
| **browser-image-compression** | Client-side image optimization before upload |
| **Axios** | HTTP client for API calls |
| **UUID** | Unique ID generation for orders |

---

## 🏗 Architecture Highlights

- **Monorepo** — Frontend, backend API routes, and admin dashboard all within a single Next.js project
- **Role-based access** — Admin routes are protected via JWT middleware
- **Per-category order logic** — Each order type has its own API endpoint, validation rules, and date availability checks
- **Calendar availability engine** — Server-side logic queries existing bookings per date before allowing a new order, automatically blocking unavailable slots
- **Cloudinary integration** — Images are compressed client-side before upload, then delivered via Cloudinary CDN

---

## 👨‍💻 Built By

Design & Developed by **[Mussadiq Khan](https://github.com/mussadiqkhan6886)** as a **[Scrupulous](https://scrupulous.vercel.app)** Agency project.

> *This repository is shared for portfolio purposes with client permission. Sensitive configuration and environment variables are excluded from this repository.*

---

## 📬 Client Info

- **Business:** Ama's Bakery
- **Location:** Al Khobar, Saudi Arabia
- **Specialty:** Custom cakes, handcrafted desserts, and event setups
