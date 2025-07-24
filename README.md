# Docker Deployment Guide

This guide focuses on deploying the Full Stack Authentication App using Docker.
Note: This is a simple simulation for Authentication App, it is not recommended to use it in a production environment.
---

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed on your system
- Download Docker Desktop from: https://www.docker.com/products/docker-desktop

### 1. Clone the repository

```bash
git clone https://github.com/MohamedEhab2001/nestSimpleAuth.git
cd nestSimpleAuth
```

### 2. Create Environment Files

#### Backend Environment (`backend/.env`)

# .env
```env
MONGO_URI=mongodb://${username}:${password}@mongodb:27017/nest-auth?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

# .env.test
```env
MONGO_URI=mongodb://${username}:${password}@mongodb:27017/nest-auth-test?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

#### Frontend Environment (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:4100
VITE_API_HOME=/signin
```

### 3. Run the Application

```bash
# Start all services (MongoDB, Backend API, Frontend)
docker-compose up --build
```

### 4. Access the Application

- **Frontend (React App)**: http://localhost:5173
- **Backend API**: http://localhost:4100
- **API Documentation (Swagger)**: http://localhost:4100/api
- **MongoDB**: localhost:27017 (internal Docker network)

### 5. Stop the Application

```bash
docker-compose down
```

---

## 🔌 Service Ports

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 5173 | React development server |
| Backend API | 4100 | NestJS API server |
| MongoDB | 27017 | MongoDB database (internal) |

---

## 📁 API Endpoints

- `POST /auth/signup` – Register new user
- `POST /auth/signin` – Login and receive JWT token
- `GET /user/me` – Get current user profile (requires authentication)

---
