# 📝 Blog App (Medium-like Platform)

A full-stack blogging platform, built with React, TypeScript, Tailwind CSS on the frontend and Hono + Prisma on the backend.

The application supports JWT authentication, protected routes, and blog CRUD operations with a clean, scalable architecture.

---

## 🚀 Features

- 🔐 User authentication (Signup / Signin) using JWT
- 📰 Create, read, and list blogs
- 🔒 Protected routes with middleware-based auth
- ⚡ Fast backend using Hono (Cloudflare Workers)
- 🧩 Shared types using a common package
- 🎨 Responsive UI with Tailwind CSS
- 🦴 Skeleton loaders for better UX
- 🧠 Strong TypeScript typing end-to-end

---

## 🏗️ Tech Stack

### Frontend
- React + Vite
- TypeScript
- Tailwind CSS
- React Router
- Axios

### Backend
- Hono (Cloudflare Workers)
- Prisma ORM (Accelerate)
- JWT Authentication
- Zod for validation

### Database
- PostgreSQL

### Shared
- Common package for shared types & schemas

---

## 📁 Project Structure
```
MEDIUM/
├── backend/              # Hono + Prisma backend
│   ├── routes/
│   │   ├── blog.ts
│   │   ├── user.ts
│   │   └── index.ts
│   ├── prisma/
│   ├── wrangler.jsonc
│   └── tsconfig.json
│
├── frontend/             # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── main.tsx
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── common/               # Shared types & schemas
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL=your_postgres_url
JWT_SECRET=your_jwt_secret
```

### Frontend (`frontend/src/config.ts`)
```typescript
export const BACKEND_URL = "https://backend.deployedapp01.workers.dev";
```

---

## 🧪 Local Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Aman01kumar/Blog-App.git
cd Blog-App
```

### 2️⃣ Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Common package
```bash
cd ../common
npm install
npm run build
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3️⃣ Run the project

#### Start backend (Cloudflare Workers)
```bash
cd backend
npm run dev
```

#### Start frontend
```bash
cd frontend
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

---

## 🔐 Authentication Flow

1. User signs up / signs in
2. Backend returns a JWT
3. Token is stored in `localStorage`
4. Token is sent via `Authorization: Bearer <token>`
5. Protected routes verify JWT middleware

---

## 🧠 Key Learning Outcomes

- Building scalable full-stack apps with TypeScript
- Using Prisma with Cloudflare Workers
- Designing reusable custom React hooks
- Implementing secure JWT-based authentication
- Sharing types between frontend & backend
- Writing clean, maintainable code

---


## 📌 Future Improvements

- ✍️ Blog editor with markdown support
- ❤️ Like & comment system
- 👤 User profiles
- 📄 Pagination / infinite scroll
- 🔍 Search & filtering
- 🌐 Deployment (Vercel + Cloudflare)

---




---

