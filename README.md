# 🎬 Video Translate — AI Dubbing Frontend

React, Vite va TailwindCSS v4 asosida qurilgan AI dublyaj platformasining zamonaviy va interaktiv foydalanuvchi interfeysi.

---

## ✨ Imkoniyatlar

- **📊 Unreal Dashboard**: Loyihalarni boshqarish va real-vaqtda statuslarni kuzatish.
- **⚡ Real-time Updates**: `WebSockets` va `Polling` orqali videoga ishlov berish jarayonini jonli ko'rish (foizlarda).
- **🎨 Modern UI**: Glassmorphism dizayni, silliq animatsiyalar va qorong'u rejim (Dark Mode).
- **📽️ Dub Editor**: Tayyor transkriptni tahrirlash va tarjimani tasdiqlash uchun interaktiv muharrir.

---

## 🛠 Texnologiyalar

- **UI Framework**: React 18 + TypeScript
- **Styling**: TailwindCSS v4 (Custom Design System)
- **Build Tool**: Vite 7
- **Connectivity**: 
  - `Axios` (Bearer Authentication)
  - `WebSocket API` (Progress Sync)

---

## 🚀 Ishga tushirish

```bash
# Kutubxonalarni o'rnatish
npm install

# Dev serverni yoqish
npm run dev
```
Port: **[http://localhost:5173](http://localhost:5173)**

---

## 🔗 Backend bilan bog'lanish

Frontend `vite.config.ts` orqali `/api` va `/ws` so'rovlarini avtomatik ravishda backend (`localhost:8000`) portiga proksi qiladi. 

Production uchun `.env` faylida backend manzilini ko'rsating:
```env
VITE_API_URL=https://your-api-domain.com
```

---

## 👤 Muallif

[Farhodoff](https://github.com/Farhodoff)
