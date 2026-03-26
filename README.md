

---
# ElitCart E-Commerce API
Live: https://elitcart-ecommerce-server-nestjs-sz0t.onrender.com/api/docs

A scalable and production-ready **E-Commerce Backend API** built with **NestJS**, **Prisma ORM**, **PostgreSQL (Neon)**, **JWT Authentication**, **Stripe Payment Integration**, and **Swagger API Documentation**.

This project provides a complete backend foundation for an e-commerce platform including:

- User Authentication & Authorization
- Category Management
- Product Management
- Order Management
- Payment Integration
- Role-Based Access Control
- API Rate Limiting
- Interactive API Documentation

---

## 🚀 Tech Stack

### Backend
- **NestJS**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Neon Database**
- **JWT Authentication**
- **Passport.js**
- **Stripe**

### Validation & Security
- **class-validator**
- **class-transformer**
- **NestJS Throttler**
- **CORS**
- **Role-Based Access Control (RBAC)**

### Documentation & Testing
- **Swagger**
---

## 📁 Project Structure

```bash
api
├── prisma
│   ├── migrations
│   └── schema.prisma
├── src
│   ├── common
│   │   ├── decorators
│   │   ├── guards
│   │   └── interfaces
│   ├── modules
│   │   ├── auth
│   │   ├── category
│   │   ├── orders
│   │   ├── payments
│   │   ├── products
│   │   └── users
│   ├── prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── app.module.ts
│   └── main.ts
├── test
├── package.json
└── README.md
````

---

## ✨ Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT Access Token
* JWT Refresh Token
* Role-Based Access Control (`USER`, `ADMIN`)

### 👤 User Management

* Get user profile
* Update user profile
* Change password
* Delete user account
* Admin can manage users

### 🗂️ Category Management

* Create category
* Get all categories
* Get single category
* Update category
* Delete category

### 🛍️ Product Management

* Create product
* Get all products
* Get single product
* Update product
* Delete product
* Product filtering and querying

### 📦 Order Management

* Create order
* Get all orders
* Get user orders
* Get single order
* Update order status
* Cancel order

### 💳 Payment Management

* Create Stripe payment intent
* Confirm payment
* Payment status tracking
* Link payments with orders

### ⚡ Other Features

* Request validation
* Global error handling
* Rate limiting / throttling
* Swagger API documentation
* Production-ready deployment support

---

## 🧠 Database Schema Overview

This project includes the following main models:

* **User**
* **Category**
* **Product**
* **Cart**
* **CartItem**
* **Order**
* **OrderItem**
* **Payment**

### Enums

* `Role`
* `OrderStatus`
* `PaymentStatus`

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```env
PORT=3000

DATABASE_URL=postgresql://your_database_url

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600
JWT_REFRESH_SECRET=your_refresh_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

APP_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000
```

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/elitcart-ecommerce-server-nestjs.git
cd elitcart-ecommerce-server-nestjs
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Prisma

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

> If you already have migrations and want to apply them in production:

```bash
npx prisma migrate deploy
```

---

### 4. Run the Application

#### Development Mode

```bash
npm run start:dev
```

#### Production Mode

```bash
npm run build
npm run start:prod
```

---

## 🧪 Available Scripts

```bash
npm run build         # Build the NestJS app
npm run start         # Start app
npm run start:dev     # Start app in watch mode
npm run start:debug   # Start app in debug mode
npm run start:prod    # Run production build

npm run lint          # Lint and auto-fix code
npm run format        # Format files with Prettier

npm run test          # Run unit tests
npm run test:watch    # Run tests in watch mode
npm run test:cov      # Generate test coverage
npm run test:e2e      # Run e2e tests

npm run db:deploy     # Run Prisma migrations in production
```

---

## 📚 API Documentation

Swagger documentation is available after running the project:

### Local

```bash
http://localhost:3000/api/docs
```

### Production

```bash
https://your-deployed-api-domain.com/api/docs
```

---

## 🌐 API Base URL

All API routes are prefixed with:

```bash
/api/v1
```

Example:

```bash
http://localhost:3000/api/v1/auth/login
```

---

## 🔑 Authentication

This API uses **JWT Bearer Authentication**.

For protected routes:

1. Login/Register
2. Get access token
3. Use the token in the `Authorization` header:

```http
Authorization: Bearer your_access_token
```

---

## 📌 Example Main Endpoints

### Auth

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`
* `POST /api/v1/auth/refresh-token`

### Users

* `GET /api/v1/users/me`
* `PATCH /api/v1/users/me`
* `PATCH /api/v1/users/change-password`
* `DELETE /api/v1/users/me`

### Categories

* `POST /api/v1/categories`
* `GET /api/v1/categories`
* `GET /api/v1/categories/:id`
* `PATCH /api/v1/categories/:id`
* `DELETE /api/v1/categories/:id`

### Products

* `POST /api/v1/products`
* `GET /api/v1/products`
* `GET /api/v1/products/:id`
* `PATCH /api/v1/products/:id`
* `DELETE /api/v1/products/:id`

### Orders

* `POST /api/v1/orders`
* `GET /api/v1/orders`
* `GET /api/v1/orders/my-orders`
* `GET /api/v1/orders/:id`
* `PATCH /api/v1/orders/:id/status`
* `DELETE /api/v1/orders/:id`

### Payments

* `POST /api/v1/payments/create-payment-intent`
* `POST /api/v1/payments/confirm-payment`
* `GET /api/v1/payments`
* `GET /api/v1/payments/:id`

---

## 🛡️ Security Features

* JWT Authentication
* Refresh Token Strategy
* Role-Based Access Control
* Global Validation Pipe
* Request Payload Whitelisting
* CORS Configuration
* Rate Limiting with NestJS Throttler

---

## 🧱 Architecture Highlights

This project follows a modular and scalable NestJS architecture:

* **Feature-based module structure**
* **Prisma Service for database abstraction**
* **DTO-based validation**
* **Guard-based route protection**
* **Decorator-based role authorization**
* **Separation of concerns for services and controllers**

This makes the project suitable for:

* Real-world backend learning
* Portfolio projects
* Production-ready backend foundations
* Scalable SaaS or e-commerce systems

---

## 🚀 Deployment

This backend can be deployed on:

* **Render** ✅ Recommended

### Recommended Production Stack

* **Backend:** Render
* **Database:** Neon PostgreSQL
* **Payments:** Stripe

---

## 🛠️ Deployment Notes

### Required production scripts

Make sure your `package.json` contains:

```json
"postinstall": "prisma generate",
"db:deploy": "prisma migrate deploy"
```

### Recommended Render commands

#### Build Command

```bash
npm install && npm run build
```

#### Start Command

```bash
npm run start:prod
```

#### Pre-Deploy Command

```bash
npm run db:deploy
```

---

## 📈 Future Improvements

Some possible future enhancements for this project:

* Product reviews & ratings
* Wishlist functionality
* Coupon / discount system
* Inventory management
* Admin dashboard analytics
* File upload (Cloudinary / S3)
* Order tracking system
* Stripe Webhook integration
* Pagination metadata improvements
* Search and filtering enhancements

---

## 👨‍💻 Author

**Jakaria Ahmed**
* GitHub: [@jakaria2055](https://github.com/jakaria2055)
---

## 📄 License

This project is licensed under the **MIT License**.

---




