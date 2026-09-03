# Forma 3D — Architecture

## 1. Overview

Forma 3D is a full-stack 3D product catalog application where users can browse products, search and filter the catalog, and interact with 3D models directly in the browser.

The application is divided into:

* Next.js frontend
* NestJS backend
* PostgreSQL database
* Three.js / React Three Fiber for 3D rendering
* Docker for containerized deployment
* GitHub Actions for CI/CD

---

## 2. System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    │     Browser         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Next.js Frontend  │
                    │ React + TypeScript  │
                    │      Tailwind CSS   │
                    └──────────┬──────────┘
                               │
                         REST API calls
                               │
                               ▼
                    ┌─────────────────────┐
                    │    NestJS Backend   │
                    │   REST Controllers  │
                    │      Services       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Prisma ORM     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │      Database       │
                    └─────────────────────┘

       3D Assets
           │
           ▼
   public/models/*.glb
           │
           ▼
 React Three Fiber / Three.js
           │
           ▼
      3D Viewer
```

---

## 3. Frontend Architecture

The frontend is implemented using Next.js, React, TypeScript and Tailwind CSS.

### Main responsibilities

* Display product catalog
* Search and filter products
* Display product details
* Render interactive 3D models
* Provide CRUD administration interface
* Generate SEO metadata
* Provide responsive user interface

### Frontend structure

```text
frontend/
├── app/
│   ├── admin/
│   ├── products/
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ProductFilters.tsx
│   └── ProductViewer.tsx
│
├── lib/
│   └── api.ts
│
└── public/
    ├── images/
    └── models/
```

Next.js Server Components are used where possible, while client components are used for interactive functionality such as filters, forms and the Three.js viewer.

---

## 4. Backend Architecture

The backend uses NestJS with a modular architecture.

```text
backend/
├── src/
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   ├── products/
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   └── products.module.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
└── prisma/
    ├── schema.prisma
    └── migrations/
```

### Request flow

```text
HTTP Request
     │
     ▼
Controller
     │
     ▼
DTO Validation
     │
     ▼
Service
     │
     ▼
Prisma
     │
     ▼
PostgreSQL
     │
     ▼
HTTP Response
```

Controllers handle HTTP requests, DTOs validate incoming data, services contain business logic, and Prisma handles database access.

---

## 5. Database Architecture

PostgreSQL stores the product catalog.

The main entity is `Product`.

```text
Product
├── id
├── name
├── description
├── category
├── price
├── modelUrl
├── imageUrl
├── createdAt
└── updatedAt
```

Prisma is used as the ORM and provides type-safe database access.

---

## 6. Product API

The backend exposes RESTful CRUD endpoints.

| Method | Endpoint        | Purpose          |
| ------ | --------------- | ---------------- |
| GET    | `/products`     | Get all products |
| GET    | `/products/:id` | Get one product  |
| POST   | `/products`     | Create product   |
| PATCH  | `/products/:id` | Update product   |
| DELETE | `/products/:id` | Delete product   |

Search and category filtering are supported through query parameters.

Example:

```text
GET /products?search=bee
GET /products?category=Animals
```

---

## 7. 3D Rendering Architecture

3D models are rendered using:

* Three.js
* React Three Fiber
* @react-three/drei

The application loads `.glb` / `.gltf` assets and displays them inside a WebGL canvas.

The viewer supports:

* Orbit controls
* Camera adjustment
* Lighting/environment
* Model centering
* Loading states
* Error handling

The model URL is stored in the database and passed to the frontend.

```text
Database
   │
   │ modelUrl
   ▼
Product Detail Page
   │
   ▼
ProductViewer
   │
   ▼
useGLTF()
   │
   ▼
Three.js Scene
   │
   ▼
WebGL Canvas
```

---

## 8. 3D Asset Optimization

3D assets can significantly affect page performance.

The application therefore follows these principles:

* Prefer `.glb` over unnecessarily large formats
* Keep polygon counts reasonable
* Compress textures where appropriate
* Avoid unnecessarily large textures
* Load models only when required
* Use loading states for large assets
* Avoid rendering unnecessary models simultaneously

For larger production deployments, additional techniques such as Draco/Meshopt compression and CDN delivery can be introduced.

---

## 9. Search and Filtering

Product search is implemented through the backend API.

The backend searches product names and descriptions.

Filtering can be performed using the category query parameter.

Example:

```text
/products?search=animal
/products?category=Animals
/products?search=bee&category=Animals
```

This keeps filtering logic reusable and allows the API to support future clients.

---

## 10. Performance Considerations

The main performance considerations are:

### Frontend

* Next.js Server Components where appropriate
* Minimal client-side JavaScript
* Lazy loading of 3D models
* Optimized images
* Responsive layouts

### 3D

* Reasonable model complexity
* Efficient texture sizes
* Reuse of assets where possible
* Controlled camera and rendering settings

### Backend

* Prisma for efficient database access
* Query filtering at the database level
* Avoid unnecessary database queries

---

## 11. SEO Architecture

Next.js metadata APIs are used to provide SEO information.

The application includes:

* Page titles
* Meta descriptions
* Open Graph metadata
* Semantic headings
* Sitemap
* Robots configuration
* Server-side rendering where appropriate

Dynamic product pages generate metadata based on product information.

---

## 12. Docker Architecture

The application is containerized using Docker.

```text
Docker Compose
│
├── PostgreSQL
│
├── NestJS Backend
│
└── Next.js Frontend
```

The services communicate through the Docker Compose network.

The backend connects to PostgreSQL using the Docker service name instead of `localhost`.

---

## 13. CI/CD Architecture

GitHub Actions runs automated checks on pushes and pull requests.

The pipeline performs:

```text
Install
   ↓
Lint
   ↓
Typecheck
   ↓
Test
   ↓
Build
```

Separate jobs are used for the frontend and backend.

This prevents code with linting, type or build errors from being considered production-ready.

---

## 14. Deployment Architecture

The production deployment consists of:

```text
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │ Next.js Frontend│
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  NestJS Backend │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   PostgreSQL    │
              └─────────────────┘
```

The frontend communicates with the backend through REST APIs.

Environment variables are used for deployment-specific configuration such as database connection strings and API URLs.

---

## 15. Design Principles

The project follows these principles:

* Separation of frontend and backend responsibilities
* Modular NestJS architecture
* Reusable React components
* Type-safe TypeScript development
* Validation of API input
* Database abstraction using Prisma
* Responsive UI
* Performance-aware 3D rendering
* SEO-friendly Next.js architecture
* Containerized development and deployment
* Automated CI checks
