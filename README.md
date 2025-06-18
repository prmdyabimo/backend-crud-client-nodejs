# 🧩 Backend CRUD API with Node.js, Prisma & Clean Architecture

Sebuah backend sederhana untuk aplikasi CRUD (Create, Read, Update, Delete) yang dibangun menggunakan **Node.js**, **Express.js**, dan **Prisma ORM**. Arsitektur menggunakan pendekatan **Clean Architecture** untuk menjaga struktur yang scalable, testable, dan maintainable.

---

## 🚀 Fitur

- ✅ CRUD Client (Create, Read, Update, Delete)
- 🗂 Clean Architecture (dipisahkan antara domain, usecase, interface, dan infra)
- 🔐 Validasi input dan error handling
- 🧪 Siap untuk pengembangan testing
- 📦 Prisma ORM untuk akses database
- 🌐 RESTful API

---

## 📁 Struktur Direktori
src/
│
├── domain/ # Entity dan interface repository
│ └── client.js
│
├── usecases/ # Bisnis logic / application layer
│ └── clientUseCase.js
│
├── infrastructure/ # Prisma ORM dan implementasi repository
│ ├── database/
│ │ └── prismaClient.js
│ └── repositories/
│ └── clientRepository.js
│
├── interfaces/ # HTTP layer (Express controller dan router)
│ ├── controllers/
│ │ └── clientController.js
│ └── routes/
│ └── clientRoutes.js
│
├── config/ # Konfigurasi aplikasi
│ └── app.js
│
└── index.js # Entry point server

## 🧰 Teknologi

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL / MySQL / SQLite**
- **Clean Architecture Principles**

---

## 📦 Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/prmdyabimo/backend-crud-client-nodejs.git
cd nama-proyek

# 2. Install dependencies
npm install

# 3. Setup .env
cp .env.example .env
# Sesuaikan konfigurasi database

# 4. Inisialisasi database
npx prisma migrate dev --name init

# 5. Jalankan server
npm run dev
