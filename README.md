# 🎬 AI Dub Studio — Frontend

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

React, Vite va TailwindCSS v4 asosida qurilgan AI dublyaj platformasining zamonaviy va interaktiv foydalanuvchi interfeysi.

---

## ✨ Asosiy Imkoniyatlar

- **📊 Premium Dashboard**: Loyihalarni markaziy boshqaruv paneli orqali boshqarish.
- **⚡ Jonli Progress**: `WebSockets` ishlatilgan holda videoga ishlov berish jarayonini (0% dan 100% gacha) real-vaqtda kuzatish.
- **🎨 Glassmorphism Dizayn**: Silliq animatsiyalar, "Glass" effektli komponentlar va ko'zni charchatmaydigan qorong'u rejim.
- **📽️ Dubling Editor**: AI tomonidan yaratilgan transkriptni qulay tahrirlash va tarjimani tasdiqlash uchun maxsus muharrir.
- **🔗 Smart Proxy**: Vite orqali API va WebSocket so'rovlarini avtomatik marshrutlash.

---

## 🛠 Texnologik Stack

- **Framework**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Dizayn**: [TailwindCSS v4](https://tailwindcss.com/) (Custom Design Tokens)
- **Bog'lanish**: 
  - `Axios` (Server-side API calls)
  - `Native WebSockets` (Live status sync)
- **Routing**: `React Router Dom v7`

---

## 🚀 Ishga tushirish

Lokal muhitda loyihani ishga tushirish uchun:

```bash
# Kutubxonalarni o'rnatish
npm install

# Ishchi serverni ishga tushirish
npm run dev
```
Odatda: **[http://localhost:5173](http://localhost:5173)** manzili orqali ochiladi.

---

## 📁 Loyiha Strukturasi

```text
src/
├── api/          # Axios klienti va API konfiguratsiyasi
├── assets/       # Rasm va statik resurslar
├── components/   # Qayta ishlatiluvchi UI komponentlar
├── pages/        # Dashboard, Login va Editor sahifalari
└── App.tsx       # Asosiy routing va ilova logikasi
```

---

## 👤 Muallif

**[Farhodoff](https://github.com/Farhodoff)**

---

## 📜 Litsenziya

MIT License. Foydalanish va o'zgartirish mutlaqo bepul.
