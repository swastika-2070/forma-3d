# Forma 3D

Forma 3D is a full-stack 3D product catalog application that allows users to browse products, search and filter the catalog, view product information and interact with 3D models directly in the browser.

## Features

* Product catalog
* Product search
* Category filtering
* Product detail pages
* Interactive 3D model viewer
* Product CRUD operations
* Admin product management
* Responsive UI
* SEO metadata
* Sitemap and robots configuration
* PostgreSQL database
* Docker support
* GitHub Actions CI/CD
* TypeScript throughout the application

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Three.js
* React Three Fiber
* @react-three/drei

### Backend

* NestJS
* Node.js
* TypeScript
* Prisma ORM
* PostgreSQL
* class-validator

### DevOps

* Docker
* Docker Compose
* Git
* GitHub Actions

---

## Architecture

```text
User
 │
 ▼
Next.js / React
 │
 │ REST API
 ▼
NestJS
 │
 ▼
Prisma
 │
 ▼
PostgreSQL

3D Assets
 │
 ▼
React Three Fiber
 │
 ▼
Three.js
 │
 ▼
WebGL Viewer
```

For a detailed architecture description, see:

`ARCHITECTURE.md`

---

## Project Structure

```text
Forma-3d/
│
├── backend/
│   ├── src/
│   │   ├── products/
│   │   ├── prisma/
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── admin/
│   │   ├── products/
│   │   ├── page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   ├── lib/
│   ├── public/
│   │   ├── images/
│   │   └── models/
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── ARCHITECTURE.md
├── docker-compose.yml
└── README.md
```

---

## Local Setup

### Prerequisites

Install:

* Node.js 22+
* Docker Desktop
* Git
* npm

---

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Forma-3d
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

Add:

```env
DATABASE_URL="postgresql://forma:forma@localhost:5432/forma"
```

Generate Prisma Client:

```bash
npx prisma generate
```

Apply the database schema:

```bash
npx prisma db push
```

Start the backend:

```bash
npm run start:dev
```

The backend runs on:

```text
http://localhost:3001
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

---

## Docker Setup

The project includes Docker Compose configuration for PostgreSQL, backend and frontend.

From the project root:

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker compose ps
```

Stop the services:

```bash
docker compose down
```

The services are exposed on:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:3001
Postgres: localhost:5432
```

---

## Environment Variables

### Backend

Create `backend/.env`:

```env
DATABASE_URL="postgresql://forma:forma@localhost:5432/forma"
```

For Docker, the backend uses:

```env
DATABASE_URL=postgresql://forma:forma@postgres:5432/forma
```

The Docker configuration supplies this value automatically.

---

## 3D Assets

3D models are stored in:

```text
frontend/public/models/
```

Example:

```text
frontend/public/models/Bee.glb
```

Images are stored in:

```text
frontend/public/images/
```

Example:

```text
frontend/public/images/Bee.jpg
```

The corresponding product record can use:

```text
Model URL: /models/Bee.glb
Image URL: /images/Bee.jpg
```

The application loads the `.glb` file using React Three Fiber and Three.js.

### Asset Licensing

All 3D assets used in the project should be sourced from royalty-free or appropriately licensed sources.

Before final submission, verify the license and attribution requirements for each asset used.

| Asset   | Source           | License     | Attribution Required |
| ------- | ---------------- | ----------- | -------------------- |
| Bee.glb | Add asset source | Add license | Add if required      |

---

## 3D Performance

3D assets can be expensive to load and render.

The application uses:

* GLB format
* Lazy model loading
* Loading indicators
* Controlled camera distance
* Efficient scene rendering
* Reasonable asset sizes

For production-scale applications, further optimizations such as Draco/Meshopt compression and CDN delivery can be added.

---

## API Endpoints

### Get Products

```http
GET /products
```

### Search Products

```http
GET /products?search=bee
```

### Filter Products

```http
GET /products?category=Animals
```

### Get Product

```http
GET /products/:id
```

### Create Product

```http
POST /products
```

### Update Product

```http
PATCH /products/:id
```

### Delete Product

```http
DELETE /products/:id
```

---

## Example Product

```json
{
  "name": "Bee",
  "description": "A 3D bee model",
  "category": "Animals",
  "price": 29.99,
  "modelUrl": "/models/Bee.glb",
  "imageUrl": "/images/Bee.jpg"
}
```

---

## Admin CRUD

The admin page provides product management functionality.

Available operations:

* Create product
* View products
* Edit product
* Delete product

The admin interface communicates with the NestJS REST API.

---

## Search and Filtering

Products can be searched by:

* Product name
* Product description

Products can also be filtered by category.

Examples:

```text
/products?search=bee
/products?category=Animals
```

---

## SEO

The application implements Next.js SEO features including:

* Page titles
* Meta descriptions
* Open Graph metadata
* Semantic headings
* Dynamic product metadata
* Sitemap
* Robots configuration
* Server-side rendering where appropriate

SEO files:

```text
frontend/app/sitemap.ts
frontend/app/robots.ts
```

---

## Testing

Backend unit tests are implemented using Vitest.

Run backend tests:

```bash
cd backend
npm test
```

Run backend type checking:

```bash
npm run typecheck
```

Run backend linting:

```bash
npm run lint
```

Build the backend:

```bash
npm run build
```

Frontend linting:

```bash
cd frontend
npm run lint
```

Frontend type checking:

```bash
npm run typecheck
```

Frontend production build:

```bash
npm run build
```

---

## CI/CD

GitHub Actions is configured in:

```text
.github/workflows/ci.yml
```

The CI pipeline performs automated checks including:

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

Both frontend and backend are checked independently.

---

## Docker

The project provides:

```text
backend/Dockerfile
frontend/Dockerfile
docker-compose.yml
```

Docker Compose runs:

```text
PostgreSQL
Backend
Frontend
```

Build and start all services:

```bash
docker compose up -d --build
```

---

## Deployment

The application is designed to be deployable using Docker or separate frontend/backend hosting.

Production deployment should provide:

* Public frontend URL
* Public backend API URL
* Managed PostgreSQL database
* Environment variables
* HTTPS

### Production URL

Add the final deployed application URL here:

```text
Production: <ADD_DEPLOYED_URL>
```

---

## Engineering Decisions

### Next.js

Next.js provides server rendering, routing, metadata APIs and a production-ready React architecture.

### NestJS

NestJS provides a modular backend architecture with controllers, services and validation.

### PostgreSQL

PostgreSQL provides reliable relational storage for product information.

### Prisma

Prisma provides type-safe database access and simplifies database operations.

### React Three Fiber

React Three Fiber integrates Three.js with React and allows 3D scenes to be built using reusable React components.

### Docker

Docker provides consistent development and deployment environments.

### GitHub Actions

GitHub Actions automatically validates code before changes are merged or deployed.

---

## Development Principles

The project follows:

* TypeScript-first development
* Modular architecture
* Separation of concerns
* Reusable components
* API validation
* Responsive design
* SEO best practices
* Performance-aware 3D rendering
* Automated CI checks

---

## License

This project is developed as part of a technical assignment.

Third-party assets remain subject to their respective licenses.
